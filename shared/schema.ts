import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const gameSession = pgTable("game_session", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  currentRound: integer("current_round").notNull().default(1),
  totalRounds: integer("total_rounds").notNull().default(10),
  difficulty: text("difficulty").notNull().default("medium"), // easy, medium, hard
  gameMode: text("game_mode").notNull().default("general"), // general, hollybolly
  language: text("language").notNull().default("english"), // language for answers
  score: integer("score").notNull().default(0),
  consecutiveCorrect: integer("consecutive_correct").notNull().default(0),
  timeLeft: integer("time_left").notNull().default(180), // 3 minutes in seconds
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const gameRound = pgTable("game_round", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id").notNull(),
  roundNumber: integer("round_number").notNull(),
  questionText: text("question_text").notNull(),
  correctAnswer: text("correct_answer").notNull(),
  selectedAnswer: text("selected_answer"),
  choices: text("choices").array().notNull(), // Array of answer choices
  isCorrect: boolean("is_correct").default(false),
  score: integer("score").notNull().default(0),
  completedAt: timestamp("completed_at"),
});

export const highScore = pgTable("high_score", {
  id: serial("id").primaryKey(),
  playerName: text("player_name").notNull(),
  score: integer("score").notNull(),
  rounds: integer("rounds").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertGameSessionSchema = createInsertSchema(gameSession).omit({
  id: true,
  createdAt: true,
});

export const insertGameRoundSchema = createInsertSchema(gameRound).omit({
  id: true,
  completedAt: true,
});

export const insertHighScoreSchema = createInsertSchema(highScore).omit({
  id: true,
  createdAt: true,
});

export const mcqAnswerSchema = z.object({
  selectedAnswer: z.string().min(1, "Please select an answer"),
});

export const gameConfigSchema = z.object({
  difficulty: z.enum(["easy", "medium", "hard"]),
  gameMode: z.enum(["general", "hollybolly"]),
  language: z.enum(["english", "spanish", "french", "german", "italian", "portuguese"]),
  totalRounds: z.number().min(5).max(20).default(10),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type GameSession = typeof gameSession.$inferSelect;
export type InsertGameSession = z.infer<typeof insertGameSessionSchema>;
export type GameRound = typeof gameRound.$inferSelect;
export type InsertGameRound = z.infer<typeof insertGameRoundSchema>;
export type HighScore = typeof highScore.$inferSelect;
export type InsertHighScore = z.infer<typeof insertHighScoreSchema>;
export type McqAnswer = z.infer<typeof mcqAnswerSchema>;
export type GameConfig = z.infer<typeof gameConfigSchema>;
