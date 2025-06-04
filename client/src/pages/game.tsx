import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Gamepad2, Play, Pause, RotateCcw, Trophy, HelpCircle } from "lucide-react";
import GameStats from "@/components/game-stats";
import GameTimer from "@/components/game-timer";
import GameModeSelector from "@/components/game-mode-selector";
import MCQQuestion from "@/components/mcq-question";
import HollyBollyReward from "@/components/hollybolly-reward";
import { useGame } from "@/hooks/use-game";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function Game() {
  const { toast } = useToast();
  const {
    gameSession,
    createNewGame,
    submitAnswer,
    skipRound,
    isLoading,
    gameState,
    timeLeft,
    currentQuestion,
    questionLoading,
    startTimer,
    stopTimer,
    resetTimer
  } = useGame();

  const [showInstructions, setShowInstructions] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [currentReward, setCurrentReward] = useState<any>(null);

  const handleStartGame = async (config: any) => {
    try {
      await createNewGame(config);
      setGameStarted(true);
      startTimer();
      toast({
        title: "Game Started!",
        description: `${config.gameMode === 'hollybolly' ? 'HollyBolly' : 'General Knowledge'} game started!`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start the game. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSubmitAnswer = async (selectedAnswer: string) => {
    try {
      stopTimer();
      
      const answerData = {
        selectedAnswer,
        questionId: currentQuestion?.id,
        correctAnswer: currentQuestion?.correctAnswer,
        questionText: currentQuestion?.question,
        choices: currentQuestion?.choices,
        movieData: currentQuestion?.movieData
      };
      
      const result = await submitAnswer(answerData);
      
      toast({
        title: result.isCorrect ? "Correct!" : "Incorrect",
        description: result.isCorrect 
          ? `You earned ${result.roundScore} points!` 
          : `The correct answer was: ${currentQuestion?.correctAnswer}`,
        variant: result.isCorrect ? "default" : "destructive",
      });

      // Show reward for HollyBolly mode
      if (result.reward && gameSession?.gameMode === "hollybolly") {
        setCurrentReward(result.reward);
        setShowReward(true);
      }

      if (result.isGameComplete) {
        toast({
          title: "Game Complete!",
          description: `Final score: ${result.totalScore} points!`,
        });
        setGameStarted(false);
      } else {
        resetTimer();
        startTimer();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit answer. Please try again.",
        variant: "destructive",
      });
      startTimer();
    }
  };

  const handleSkipRound = async () => {
    try {
      stopTimer();
      const result = await skipRound();
      
      toast({
        title: "Round Skipped",
        description: "Moving to the next round.",
      });

      if (result.isGameComplete) {
        toast({
          title: "Game Complete!",
          description: `Final score: ${gameSession?.score || 0} points!`,
        });
        setGameStarted(false);
      } else {
        resetTimer();
        startTimer();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to skip round. Please try again.",
        variant: "destructive",
      });
      startTimer(); // Resume timer on error
    }
  };

  const handleTimeUp = () => {
    toast({
      title: "Time's Up!",
      description: "Automatically moving to the next round.",
    });
    handleSkipRound();
  };

  const handlePauseGame = () => {
    if (gameState === 'playing') {
      stopTimer();
    } else if (gameState === 'paused') {
      startTimer();
    }
  };

  const handleNewGame = () => {
    stopTimer();
    setGameStarted(false);
    toast({
      title: "Ready for a new game!",
      description: "Click Start Game when you're ready.",
    });
  };

  if (!gameStarted || !gameSession) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="bg-white shadow-md border-b-4 border-primary rounded-2xl mb-8">
          <div className="px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
                  <Gamepad2 className="text-white text-2xl" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-primary">LingoQuest</h1>
                  <p className="text-xl text-gray-600">MCQ Word Game</p>
                </div>
              </div>
              <Dialog open={showInstructions} onOpenChange={setShowInstructions}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="lg" className="senior-button">
                    <HelpCircle className="mr-2 h-6 w-6" />
                    Help
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">How to Play LingoQuest</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 text-lg">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                      <p>Choose between General Knowledge or HollyBolly mode</p>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                      <p>Read the question and select the correct answer</p>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                      <p>HollyBolly mode shows movie rewards for consecutive correct answers</p>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                      <p>Complete all rounds to see your final score</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </header>

        <GameModeSelector onStartGame={handleStartGame} isLoading={isLoading} />
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="bg-white shadow-md border-b-4 border-primary rounded-2xl mb-8">
        <div className="px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
                <Gamepad2 className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-primary">LingoQuest</h1>
                <p className="text-xl text-gray-600">Word Game Adventure</p>
              </div>
            </div>
            <GameTimer timeLeft={timeLeft} onTimeUp={handleTimeUp} />
          </div>
        </div>
      </header>

      {/* Game Stats */}
      {gameSession && <GameStats session={gameSession} />}

      {/* MCQ Question */}
      {questionLoading ? (
        <Card className="senior-card">
          <CardContent className="p-8 text-center">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
              <div className="space-y-3">
                <div className="h-6 bg-gray-200 rounded"></div>
                <div className="h-6 bg-gray-200 rounded"></div>
                <div className="h-6 bg-gray-200 rounded"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : currentQuestion ? (
        <MCQQuestion 
          question={currentQuestion}
          onSubmit={handleSubmitAnswer}
          onSkip={handleSkipRound}
          disabled={isLoading || gameState !== 'playing'}
          gameMode={gameSession?.gameMode}
        />
      ) : (
        <Card className="senior-card">
          <CardContent className="p-8 text-center">
            <p className="text-xl text-gray-600">Loading next question...</p>
          </CardContent>
        </Card>
      )}

      {/* HollyBolly Reward Modal */}
      <HollyBollyReward 
        reward={currentReward}
        isOpen={showReward}
        onClose={() => setShowReward(false)}
        consecutiveCorrect={gameSession?.consecutiveCorrect || 0}
      />

      {/* Game Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Button 
          onClick={handleNewGame}
          className="senior-button bg-primary hover:bg-blue-700 text-white"
        >
          <RotateCcw className="mr-2 h-6 w-6" />
          New Game
        </Button>
        <Button 
          onClick={handlePauseGame}
          variant="outline"
          className="senior-button"
        >
          {gameState === 'playing' ? (
            <>
              <Pause className="mr-2 h-6 w-6" />
              Pause Game
            </>
          ) : (
            <>
              <Play className="mr-2 h-6 w-6" />
              Resume Game
            </>
          )}
        </Button>
        <Dialog open={showInstructions} onOpenChange={setShowInstructions}>
          <DialogTrigger asChild>
            <Button variant="outline" className="senior-button">
              <HelpCircle className="mr-2 h-6 w-6" />
              Instructions
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">How to Play LingoQuest</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 text-lg">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                <p>Look at the current letter displayed</p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                <p>Fill in words for each category starting with that letter</p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                <p>Submit before time runs out to earn points</p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                <p>Complete all rounds to see your final score</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
