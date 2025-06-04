import { 
  users, 
  gameSession, 
  gameRound, 
  highScore,
  type User, 
  type InsertUser,
  type GameSession,
  type InsertGameSession,
  type GameRound,
  type InsertGameRound,
  type HighScore,
  type InsertHighScore
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Game session methods
  createGameSession(session: InsertGameSession): Promise<GameSession>;
  getGameSession(id: number): Promise<GameSession | undefined>;
  updateGameSession(id: number, updates: Partial<GameSession>): Promise<GameSession | undefined>;
  deleteGameSession(id: number): Promise<boolean>;

  // Game round methods
  createGameRound(round: InsertGameRound): Promise<GameRound>;
  getGameRounds(sessionId: number): Promise<GameRound[]>;
  updateGameRound(id: number, updates: Partial<GameRound>): Promise<GameRound | undefined>;

  // High score methods
  createHighScore(score: InsertHighScore): Promise<HighScore>;
  getHighScores(limit?: number): Promise<HighScore[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private gameSessions: Map<number, GameSession>;
  private gameRounds: Map<number, GameRound>;
  private highScores: Map<number, HighScore>;
  private currentUserId: number;
  private currentSessionId: number;
  private currentRoundId: number;
  private currentScoreId: number;

  constructor() {
    this.users = new Map();
    this.gameSessions = new Map();
    this.gameRounds = new Map();
    this.highScores = new Map();
    this.currentUserId = 1;
    this.currentSessionId = 1;
    this.currentRoundId = 1;
    this.currentScoreId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Game session methods
  async createGameSession(insertSession: InsertGameSession): Promise<GameSession> {
    const id = this.currentSessionId++;
    const session: GameSession = { 
      userId: insertSession.userId || null,
      currentRound: insertSession.currentRound || 1,
      totalRounds: insertSession.totalRounds || 10,
      difficulty: insertSession.difficulty || "medium",
      gameMode: insertSession.gameMode || "general",
      language: insertSession.language || "english",
      score: insertSession.score || 0,
      consecutiveCorrect: insertSession.consecutiveCorrect || 0,
      timeLeft: insertSession.timeLeft || 180,
      isActive: insertSession.isActive !== undefined ? insertSession.isActive : true,
      id,
      createdAt: new Date()
    };
    this.gameSessions.set(id, session);
    return session;
  }

  async getGameSession(id: number): Promise<GameSession | undefined> {
    return this.gameSessions.get(id);
  }

  async updateGameSession(id: number, updates: Partial<GameSession>): Promise<GameSession | undefined> {
    const session = this.gameSessions.get(id);
    if (!session) return undefined;
    
    const updatedSession = { ...session, ...updates };
    this.gameSessions.set(id, updatedSession);
    return updatedSession;
  }

  async deleteGameSession(id: number): Promise<boolean> {
    return this.gameSessions.delete(id);
  }

  // Game round methods
  async createGameRound(insertRound: InsertGameRound): Promise<GameRound> {
    const id = this.currentRoundId++;
    const round: GameRound = { 
      sessionId: insertRound.sessionId,
      roundNumber: insertRound.roundNumber,
      questionText: insertRound.questionText,
      correctAnswer: insertRound.correctAnswer,
      selectedAnswer: insertRound.selectedAnswer || null,
      choices: insertRound.choices,
      isCorrect: insertRound.isCorrect || null,
      score: insertRound.score || 0,
      id,
      completedAt: null
    };
    this.gameRounds.set(id, round);
    return round;
  }

  async getGameRounds(sessionId: number): Promise<GameRound[]> {
    return Array.from(this.gameRounds.values()).filter(
      (round) => round.sessionId === sessionId
    );
  }

  async updateGameRound(id: number, updates: Partial<GameRound>): Promise<GameRound | undefined> {
    const round = this.gameRounds.get(id);
    if (!round) return undefined;
    
    const updatedRound = { ...round, ...updates };
    this.gameRounds.set(id, updatedRound);
    return updatedRound;
  }

  // High score methods
  async createHighScore(insertScore: InsertHighScore): Promise<HighScore> {
    const id = this.currentScoreId++;
    const score: HighScore = { 
      ...insertScore, 
      id,
      createdAt: new Date()
    };
    this.highScores.set(id, score);
    return score;
  }

  async getHighScores(limit: number = 10): Promise<HighScore[]> {
    return Array.from(this.highScores.values())
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }
}

export const storage = new MemStorage();
