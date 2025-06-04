import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Trophy, Medal, Award, Star, Save } from "lucide-react";
import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";

export default function Scores() {
  const { toast } = useToast();
  const [playerName, setPlayerName] = useState("");
  const [showSaveScore, setShowSaveScore] = useState(false);

  const { data: highScores, isLoading } = useQuery({
    queryKey: ["/api/scores"],
  });

  const saveScoreMutation = useMutation({
    mutationFn: async (data: { playerName: string; score: number; rounds: number }) => {
      const response = await apiRequest("POST", "/api/scores", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/scores"] });
      toast({
        title: "Score Saved!",
        description: "Your high score has been recorded.",
      });
      setPlayerName("");
      setShowSaveScore(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save score. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSaveScore = () => {
    if (!playerName.trim()) {
      toast({
        title: "Please enter your name",
        description: "A name is required to save your score.",
        variant: "destructive",
      });
      return;
    }

    // Get the last completed game score from session storage or similar
    const lastGameScore = parseInt(sessionStorage.getItem('lastGameScore') || '0');
    const lastGameRounds = parseInt(sessionStorage.getItem('lastGameRounds') || '5');

    if (lastGameScore > 0) {
      saveScoreMutation.mutate({
        playerName: playerName.trim(),
        score: lastGameScore,
        rounds: lastGameRounds
      });
    } else {
      toast({
        title: "No recent game found",
        description: "Complete a game first to save your score.",
        variant: "destructive",
      });
    }
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-8 w-8 text-yellow-500" />;
      case 1:
        return <Medal className="h-8 w-8 text-gray-400" />;
      case 2:
        return <Award className="h-8 w-8 text-yellow-600" />;
      default:
        return <Star className="h-8 w-8 text-blue-500" />;
    }
  };

  const getRankColor = (index: number) => {
    switch (index) {
      case 0:
        return "bg-gradient-to-r from-yellow-100 to-yellow-200 border-yellow-300";
      case 1:
        return "bg-gradient-to-r from-gray-100 to-gray-200 border-gray-300";
      case 2:
        return "bg-gradient-to-r from-orange-100 to-orange-200 border-orange-300";
      default:
        return "bg-white border-gray-200";
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="bg-white shadow-md border-b-4 border-primary rounded-2xl mb-8">
        <div className="px-6 py-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
              <Trophy className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-primary">High Scores</h1>
              <p className="text-xl text-gray-600">Hall of Fame</p>
            </div>
          </div>
        </div>
      </header>

      <div className="space-y-8">
        {/* Save Score Section */}
        {sessionStorage.getItem('lastGameScore') && (
          <Card className="senior-card border-2 border-success">
            <CardHeader>
              <CardTitle className="text-2xl text-success">Save Your Score</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg">
                Great game! Your score: {sessionStorage.getItem('lastGameScore')} points
              </p>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="playerName" className="text-xl font-semibold">Your Name</Label>
                  <Input
                    id="playerName"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="Enter your name"
                    className="senior-input mt-2"
                    maxLength={50}
                  />
                </div>
                <Button 
                  onClick={handleSaveScore}
                  disabled={saveScoreMutation.isPending}
                  className="senior-button bg-success hover:bg-green-600 text-white"
                >
                  <Save className="mr-2 h-6 w-6" />
                  {saveScoreMutation.isPending ? "Saving..." : "Save Score"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* High Scores List */}
        <Card className="senior-card">
          <CardHeader>
            <CardTitle className="text-2xl">Top Players</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-20 bg-gray-200 rounded-xl"></div>
                  </div>
                ))}
              </div>
            ) : !highScores || highScores.length === 0 ? (
              <div className="text-center py-12">
                <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-xl text-gray-600">No high scores yet!</p>
                <p className="text-lg text-gray-500">Be the first to set a record.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {highScores.map((score: any, index: number) => (
                  <div
                    key={score.id}
                    className={`flex items-center justify-between p-6 rounded-xl border-2 ${getRankColor(index)}`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12 h-12">
                        {getRankIcon(index)}
                      </div>
                      <div>
                        <p className="text-xl font-bold">{score.playerName}</p>
                        <p className="text-gray-600">
                          {score.rounds} {score.rounds === 1 ? 'round' : 'rounds'} completed
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-primary">{score.score}</p>
                      <p className="text-gray-600">points</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Statistics */}
        {highScores && highScores.length > 0 && (
          <Card className="senior-card">
            <CardHeader>
              <CardTitle className="text-2xl">Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <p className="text-3xl font-bold text-primary">
                    {Math.max(...highScores.map((s: any) => s.score))}
                  </p>
                  <p className="text-lg text-gray-600">Highest Score</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <p className="text-3xl font-bold text-success">
                    {Math.round(highScores.reduce((sum: number, s: any) => sum + s.score, 0) / highScores.length)}
                  </p>
                  <p className="text-lg text-gray-600">Average Score</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-xl">
                  <p className="text-3xl font-bold" style={{ color: 'hsl(var(--secondary))' }}>
                    {highScores.length}
                  </p>
                  <p className="text-lg text-gray-600">Total Games</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
