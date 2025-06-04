import { useEffect, useState } from "react";
import { Clock, AlertTriangle } from "lucide-react";

interface GameTimerProps {
  timeLeft: number;
  onTimeUp: () => void;
}

export default function GameTimer({ timeLeft, onTimeUp }: GameTimerProps) {
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    setIsWarning(timeLeft <= 30 && timeLeft > 0);
    
    if (timeLeft === 0) {
      onTimeUp();
    }
  }, [timeLeft, onTimeUp]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (timeLeft <= 10) return "text-red-600";
    if (timeLeft <= 30) return "text-orange-500";
    return "text-warning";
  };

  return (
    <div className={`flex items-center space-x-2 ${isWarning ? 'animate-pulse' : ''}`}>
      {isWarning ? (
        <AlertTriangle className="h-8 w-8 text-orange-500" />
      ) : (
        <Clock className="h-8 w-8 text-warning" />
      )}
      <div className="text-center">
        <p className="text-lg text-gray-600">Time Left</p>
        <p className={`text-3xl font-bold ${getTimerColor()}`}>
          {formatTime(timeLeft)}
        </p>
      </div>
    </div>
  );
}
