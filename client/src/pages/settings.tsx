import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Settings as SettingsIcon, Save, Volume2, Eye, Clock } from "lucide-react";

export default function Settings() {
  const { toast } = useToast();
  const [fontSize, setFontSize] = useState([18]);
  const [highContrast, setHighContrast] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [gameTimer, setGameTimer] = useState("180");
  const [difficulty, setDifficulty] = useState("normal");

  const handleSaveSettings = () => {
    // Apply font size
    document.documentElement.style.fontSize = `${fontSize[0]}px`;
    
    // Apply high contrast
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }

    // Save to localStorage
    localStorage.setItem('lingoquest-settings', JSON.stringify({
      fontSize: fontSize[0],
      highContrast,
      soundEnabled,
      gameTimer,
      difficulty
    }));

    toast({
      title: "Settings Saved",
      description: "Your preferences have been saved successfully.",
    });
  };

  const loadSettings = () => {
    const saved = localStorage.getItem('lingoquest-settings');
    if (saved) {
      const settings = JSON.parse(saved);
      setFontSize([settings.fontSize || 18]);
      setHighContrast(settings.highContrast || false);
      setSoundEnabled(settings.soundEnabled !== false);
      setGameTimer(settings.gameTimer || "180");
      setDifficulty(settings.difficulty || "normal");
    }
  };

  useState(() => {
    loadSettings();
  });

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="bg-white shadow-md border-b-4 border-primary rounded-2xl mb-8">
        <div className="px-6 py-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
              <SettingsIcon className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-primary">Settings</h1>
              <p className="text-xl text-gray-600">Customize your game experience</p>
            </div>
          </div>
        </div>
      </header>

      <div className="space-y-8">
        {/* Display Settings */}
        <Card className="senior-card">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Eye className="mr-3 h-6 w-6 text-primary" />
              Display Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label className="text-xl font-semibold">Font Size</Label>
              <div className="space-y-2">
                <Slider
                  value={fontSize}
                  onValueChange={setFontSize}
                  max={24}
                  min={14}
                  step={2}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Small (14px)</span>
                  <span className="font-medium">Current: {fontSize[0]}px</span>
                  <span>Large (24px)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-xl font-semibold">High Contrast Mode</Label>
                <p className="text-gray-600">Improves visibility for better readability</p>
              </div>
              <Switch 
                checked={highContrast}
                onCheckedChange={setHighContrast}
                className="scale-125"
              />
            </div>
          </CardContent>
        </Card>

        {/* Game Settings */}
        <Card className="senior-card">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Clock className="mr-3 h-6 w-6 text-primary" />
              Game Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label className="text-xl font-semibold">Round Timer</Label>
              <Select value={gameTimer} onValueChange={setGameTimer}>
                <SelectTrigger className="senior-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="120">2 minutes</SelectItem>
                  <SelectItem value="180">3 minutes</SelectItem>
                  <SelectItem value="240">4 minutes</SelectItem>
                  <SelectItem value="300">5 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label className="text-xl font-semibold">Difficulty Level</Label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger className="senior-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy (More time hints)</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="hard">Hard (Less time)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Audio Settings */}
        <Card className="senior-card">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Volume2 className="mr-3 h-6 w-6 text-primary" />
              Audio Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-xl font-semibold">Sound Effects</Label>
                <p className="text-gray-600">Play sounds for game events</p>
              </div>
              <Switch 
                checked={soundEnabled}
                onCheckedChange={setSoundEnabled}
                className="scale-125"
              />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-center">
          <Button 
            onClick={handleSaveSettings}
            className="senior-button bg-success hover:bg-green-600 text-white px-12"
            size="lg"
          >
            <Save className="mr-3 h-6 w-6" />
            Save Settings
          </Button>
        </div>
      </div>
    </main>
  );
}
