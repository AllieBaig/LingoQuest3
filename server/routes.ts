import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertGameSessionSchema, 
  insertGameRoundSchema, 
  insertHighScoreSchema,
  mcqAnswerSchema,
  gameConfigSchema 
} from "@shared/schema";
import { z } from "zod";
import { getRandomQuestions, generateChoices } from "./question-bank";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Create new game session
  app.post("/api/game/session", async (req, res) => {
    try {
      const data = gameConfigSchema.parse(req.body);
      const session = await storage.createGameSession({
        currentRound: 1,
        totalRounds: data.totalRounds,
        difficulty: data.difficulty,
        gameMode: data.gameMode,
        language: data.language,
        score: 0,
        consecutiveCorrect: 0,
        timeLeft: 180,
        isActive: true
      });
      res.json(session);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create game session" });
    }
  });

  // Get next question for current round
  app.get("/api/game/session/:id/question", async (req, res) => {
    try {
      const sessionId = parseInt(req.params.id);
      const session = await storage.getGameSession(sessionId);
      
      if (!session) {
        return res.status(404).json({ message: "Game session not found" });
      }

      let question;
      
      if (session.gameMode === "hollybolly") {
        const { getRandomHollyBollyMovies, generateHollyBollyQuestion } = await import("./hollybolly-data");
        const movies = getRandomHollyBollyMovies(1);
        if (movies.length === 0) {
          return res.status(500).json({ message: "No questions available" });
        }
        question = generateHollyBollyQuestion(movies[0], session.difficulty);
      } else {
        const { getRandomQuestions, generateChoices } = await import("./question-bank");
        const questions = getRandomQuestions(1);
        if (questions.length === 0) {
          return res.status(500).json({ message: "No questions available" });
        }
        const selectedQuestion = questions[0];
        const choices = generateChoices(selectedQuestion, session.language, session.difficulty);
        question = {
          id: selectedQuestion.id,
          question: selectedQuestion.question,
          choices,
          correctAnswer: selectedQuestion.correctAnswer[session.language as keyof typeof selectedQuestion.correctAnswer]
        };
      }
      
      res.json(question);
    } catch (error) {
      res.status(500).json({ message: "Failed to get question" });
    }
  });

  // Get game session
  app.get("/api/game/session/:id", async (req, res) => {
    try {
      const sessionId = parseInt(req.params.id);
      const session = await storage.getGameSession(sessionId);
      
      if (!session) {
        return res.status(404).json({ message: "Game session not found" });
      }
      
      res.json(session);
    } catch (error) {
      res.status(500).json({ message: "Failed to get game session" });
    }
  });

  // Update game session
  app.patch("/api/game/session/:id", async (req, res) => {
    try {
      const sessionId = parseInt(req.params.id);
      const updates = req.body;
      
      const session = await storage.updateGameSession(sessionId, updates);
      
      if (!session) {
        return res.status(404).json({ message: "Game session not found" });
      }
      
      res.json(session);
    } catch (error) {
      res.status(500).json({ message: "Failed to update game session" });
    }
  });

  // Submit MCQ answer
  app.post("/api/game/session/:id/submit", async (req, res) => {
    try {
      const sessionId = parseInt(req.params.id);
      const { selectedAnswer, questionId, correctAnswer } = req.body;
      
      const session = await storage.getGameSession(sessionId);
      if (!session) {
        return res.status(404).json({ message: "Game session not found" });
      }

      const isCorrect = selectedAnswer === correctAnswer;
      const roundScore = isCorrect ? 10 : 0;
      const newConsecutiveCorrect = isCorrect ? session.consecutiveCorrect + 1 : 0;

      // Create game round
      const round = await storage.createGameRound({
        sessionId,
        roundNumber: session.currentRound,
        questionText: req.body.questionText || "",
        correctAnswer,
        selectedAnswer,
        choices: req.body.choices || [],
        isCorrect,
        score: roundScore,
      });

      // Update round completion
      await storage.updateGameRound(round.id, {
        completedAt: new Date()
      });

      // Calculate rewards for HollyBolly mode
      let reward = null;
      if (session.gameMode === "hollybolly" && isCorrect && req.body.movieData) {
        const movieData = req.body.movieData;
        
        if (newConsecutiveCorrect === 1) {
          reward = {
            type: "boxOffice",
            data: movieData.boxOffice
          };
        } else if (newConsecutiveCorrect === 2) {
          reward = {
            type: "directors",
            data: movieData.directors
          };
        } else if (newConsecutiveCorrect >= 3) {
          reward = {
            type: "heroes",
            data: movieData.heroes
          };
        }
      }

      // Update session
      const newRound = session.currentRound + 1;
      const newScore = session.score + roundScore;
      const isGameComplete = newRound > session.totalRounds;

      if (isGameComplete) {
        await storage.updateGameSession(sessionId, {
          score: newScore,
          consecutiveCorrect: newConsecutiveCorrect,
          isActive: false
        });
      } else {
        await storage.updateGameSession(sessionId, {
          currentRound: newRound,
          score: newScore,
          consecutiveCorrect: newConsecutiveCorrect,
          timeLeft: 180 // Reset timer
        });
      }

      res.json({
        round,
        isCorrect,
        roundScore,
        totalScore: newScore,
        consecutiveCorrect: newConsecutiveCorrect,
        isGameComplete,
        nextRound: isGameComplete ? null : newRound,
        reward
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to submit answer" });
    }
  });

  // Skip round
  app.post("/api/game/session/:id/skip", async (req, res) => {
    try {
      const sessionId = parseInt(req.params.id);
      
      const session = await storage.getGameSession(sessionId);
      if (!session) {
        return res.status(404).json({ message: "Game session not found" });
      }

      // Create skipped round
      const round = await storage.createGameRound({
        sessionId,
        roundNumber: session.currentRound,
        questionText: "Skipped",
        correctAnswer: "",
        selectedAnswer: null,
        choices: [],
        isCorrect: false,
        score: 0,
      });

      await storage.updateGameRound(round.id, {
        completedAt: new Date()
      });

      // Update session
      const newRound = session.currentRound + 1;
      const isGameComplete = newRound > session.totalRounds;

      if (isGameComplete) {
        await storage.updateGameSession(sessionId, {
          isActive: false,
          consecutiveCorrect: 0
        });
      } else {
        await storage.updateGameSession(sessionId, {
          currentRound: newRound,
          consecutiveCorrect: 0,
          timeLeft: 180 // Reset timer
        });
      }

      res.json({
        round,
        isGameComplete,
        nextRound: isGameComplete ? null : newRound
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to skip round" });
    }
  });

  // Get game rounds
  app.get("/api/game/session/:id/rounds", async (req, res) => {
    try {
      const sessionId = parseInt(req.params.id);
      const rounds = await storage.getGameRounds(sessionId);
      res.json(rounds);
    } catch (error) {
      res.status(500).json({ message: "Failed to get game rounds" });
    }
  });

  // Create high score
  app.post("/api/scores", async (req, res) => {
    try {
      const data = insertHighScoreSchema.parse(req.body);
      const score = await storage.createHighScore(data);
      res.json(score);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create high score" });
    }
  });

  // Get high scores
  app.get("/api/scores", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const scores = await storage.getHighScores(limit);
      res.json(scores);
    } catch (error) {
      res.status(500).json({ message: "Failed to get high scores" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
