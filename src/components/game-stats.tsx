import { Trophy, Clock, Hash } from "lucide-react";
import type { GameSession } from "@shared/schema";

interface GameStatsProps {
  session: GameSession;
}

export default function GameStats({ session }: GameStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="senior-card">
        <div className="text-center">
          <Trophy className="text-4xl h-12 w-12 mx-auto mb-4" style={{ color: 'hsl(var(--secondary))' }} />
          <p className="text-xl text-gray-600 mb-2">Score</p>
          <p className="text-4xl font-bold text-primary">{session.score}</p>
        </div>
      </div>
      
      <div className="senior-card">
        <div className="text-center">
          <Clock className="text-4xl h-12 w-12 mx-auto mb-4 text-warning" />
          <p className="text-xl text-gray-600 mb-2">Time Left</p>
          <p className="text-4xl font-bold text-warning">
            {Math.floor(session.timeLeft / 60)}:{(session.timeLeft % 60).toString().padStart(2, '0')}
          </p>
        </div>
      </div>
      
      <div className="senior-card">
        <div className="text-center">
          <Hash className="text-4xl h-12 w-12 mx-auto mb-4 text-success" />
          <p className="text-xl text-gray-600 mb-2">Round</p>
          <p className="text-4xl font-bold text-success">
            {session.currentRound} of {session.totalRounds}
          </p>
        </div>
      </div>
    </div>
  );
}
