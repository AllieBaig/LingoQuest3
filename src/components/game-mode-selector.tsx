import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Film, BookOpen, Play, Settings } from "lucide-react";

interface GameModeConfig {
  difficulty: "easy" | "medium" | "hard";
  gameMode: "general" | "hollybolly";
  language: "english" | "spanish" | "french" | "german" | "italian" | "portuguese";
  totalRounds: number;
}

interface GameModeSelectorProps {
  onStartGame: (config: GameModeConfig) => void;
  isLoading?: boolean;
}

export default function GameModeSelector({ onStartGame, isLoading }: GameModeSelectorProps) {
  const [config, setConfig] = useState<GameModeConfig>({
    difficulty: "medium",
    gameMode: "general",
    language: "english",
    totalRounds: 10
  });

  const handleStartGame = () => {
    onStartGame(config);
  };

  const languages = [
    { value: "english", label: "English" },
    { value: "spanish", label: "Español" },
    { value: "french", label: "Français" },
    { value: "german", label: "Deutsch" },
    { value: "italian", label: "Italiano" },
    { value: "portuguese", label: "Português" }
  ];

  const difficultyInfo = {
    easy: "2 answer choices",
    medium: "3 answer choices", 
    hard: "4 answer choices"
  };

  return (
    <div className="space-y-8">
      {/* Game Mode Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card 
          className={`senior-card cursor-pointer transition-all border-2 ${
            config.gameMode === "general" 
              ? "border-primary bg-blue-50" 
              : "border-gray-200 hover:border-gray-300"
          }`}
          onClick={() => setConfig(prev => ({ ...prev, gameMode: "general" }))}
        >
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
              <BookOpen className="text-white text-2xl" />
            </div>
            <CardTitle className="text-2xl">General Knowledge</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-lg text-gray-600">
              Questions about colors, animals, food, nature, and everyday topics in multiple languages.
            </p>
          </CardContent>
        </Card>

        <Card 
          className={`senior-card cursor-pointer transition-all border-2 ${
            config.gameMode === "hollybolly" 
              ? "border-primary bg-blue-50" 
              : "border-gray-200 hover:border-gray-300"
          }`}
          onClick={() => setConfig(prev => ({ ...prev, gameMode: "hollybolly" }))}
        >
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
              <Film className="text-white text-2xl" />
            </div>
            <CardTitle className="text-2xl">HollyBolly Movies</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-lg text-gray-600">
              Hollywood-inspired Bollywood movies with rewards: box office earnings, director & actor net worth.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Game Configuration */}
      <Card className="senior-card">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <Settings className="mr-3 h-6 w-6 text-primary" />
            Game Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Difficulty */}
            <div className="space-y-4">
              <Label className="text-xl font-semibold">Difficulty</Label>
              <Select 
                value={config.difficulty} 
                onValueChange={(value: "easy" | "medium" | "hard") => 
                  setConfig(prev => ({ ...prev, difficulty: value }))
                }
              >
                <SelectTrigger className="senior-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy - {difficultyInfo.easy}</SelectItem>
                  <SelectItem value="medium">Medium - {difficultyInfo.medium}</SelectItem>
                  <SelectItem value="hard">Hard - {difficultyInfo.hard}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Language (only for General mode) */}
            {config.gameMode === "general" && (
              <div className="space-y-4">
                <Label className="text-xl font-semibold">Answer Language</Label>
                <Select 
                  value={config.language} 
                  onValueChange={(value: any) => 
                    setConfig(prev => ({ ...prev, language: value }))
                  }
                >
                  <SelectTrigger className="senior-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map(lang => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Number of Rounds */}
          <div className="space-y-4">
            <Label className="text-xl font-semibold">Number of Rounds</Label>
            <div className="space-y-2">
              <Slider
                value={[config.totalRounds]}
                onValueChange={([value]) => setConfig(prev => ({ ...prev, totalRounds: value }))}
                max={20}
                min={5}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>5 rounds</span>
                <span className="font-medium">Selected: {config.totalRounds} rounds</span>
                <span>20 rounds</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Start Game Button */}
      <div className="text-center">
        <Button 
          onClick={handleStartGame}
          disabled={isLoading}
          className="senior-button bg-success hover:bg-green-600 text-white px-12"
          size="lg"
        >
          <Play className="mr-3 h-6 w-6" />
          {isLoading ? "Starting Game..." : "Start Game"}
        </Button>
      </div>
    </div>
  );
}