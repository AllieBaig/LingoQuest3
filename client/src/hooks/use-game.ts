import { useState, useCallback, useRef } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import type { GameSession, GameConfig } from "@shared/schema";

type GameState = 'idle' | 'playing' | 'paused' | 'completed';

export function useGame() {
  const [currentSessionId, setCurrentSessionId] = useState<number | null>(null);
  const [gameState, setGameState] = useState<GameState>('idle');
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Get current game session
  const { data: gameSession, isLoading } = useQuery({
    queryKey: ["/api/game/session", currentSessionId],
    enabled: !!currentSessionId,
  });

  // Get current question
  const { data: questionData, isLoading: questionLoading } = useQuery({
    queryKey: ["/api/game/session", currentSessionId, "question"],
    enabled: !!currentSessionId && gameState === 'playing',
    refetchOnWindowFocus: false,
  });

  // Create new game mutation
  const createGameMutation = useMutation({
    mutationFn: async (config: GameConfig) => {
      const sessionResponse = await apiRequest("POST", "/api/game/session", config);
      return sessionResponse.json();
    },
    onSuccess: (session: GameSession) => {
      setCurrentSessionId(session.id);
      setGameState('playing');
      setTimeLeft(180);
      queryClient.invalidateQueries({ queryKey: ["/api/game/session"] });
    },
  });

  // Submit MCQ answer mutation
  const submitAnswerMutation = useMutation({
    mutationFn: async (answerData: any) => {
      if (!currentSessionId) throw new Error("No active session");
      const response = await apiRequest("POST", `/api/game/session/${currentSessionId}/submit`, answerData);
      return response.json();
    },
    onSuccess: (result) => {
      if (result.isGameComplete) {
        setGameState('completed');
        sessionStorage.setItem('lastGameScore', result.totalScore.toString());
        sessionStorage.setItem('lastGameRounds', gameSession?.totalRounds?.toString() || '10');
      }
      queryClient.invalidateQueries({ queryKey: ["/api/game/session"] });
      queryClient.invalidateQueries({ queryKey: ["/api/game/session", currentSessionId, "question"] });
    },
  });

  // Skip round mutation
  const skipRoundMutation = useMutation({
    mutationFn: async () => {
      if (!currentSessionId) throw new Error("No active session");
      const response = await apiRequest("POST", `/api/game/session/${currentSessionId}/skip`);
      return response.json();
    },
    onSuccess: (result) => {
      if (result.isGameComplete) {
        setGameState('completed');
        sessionStorage.setItem('lastGameScore', gameSession?.score?.toString() || '0');
        sessionStorage.setItem('lastGameRounds', gameSession?.totalRounds?.toString() || '10');
      }
      queryClient.invalidateQueries({ queryKey: ["/api/game/session"] });
      queryClient.invalidateQueries({ queryKey: ["/api/game/session", currentSessionId, "question"] });
    },
  });

  // Timer functions
  const startTimer = useCallback(() => {
    if (gameState !== 'playing') setGameState('playing');
    
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [gameState]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setGameState('paused');
  }, []);

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setTimeLeft(180);
  }, []);

  // Game actions
  const createNewGame = useCallback((config: GameConfig) => {
    return createGameMutation.mutateAsync(config);
  }, [createGameMutation]);

  const submitAnswer = useCallback((answerData: any) => {
    return submitAnswerMutation.mutateAsync(answerData);
  }, [submitAnswerMutation]);

  const skipRound = useCallback(() => {
    return skipRoundMutation.mutateAsync();
  }, [skipRoundMutation]);

  return {
    gameSession,
    gameState,
    timeLeft,
    currentQuestion: questionData,
    isLoading: isLoading || createGameMutation.isPending || submitAnswerMutation.isPending || skipRoundMutation.isPending,
    questionLoading,
    createNewGame,
    submitAnswer,
    skipRound,
    startTimer,
    stopTimer,
    resetTimer,
  };
}
