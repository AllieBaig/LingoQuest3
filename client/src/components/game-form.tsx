import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { User, MapPin, Rabbit, Package, Check, FastForward } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GameFormProps {
  currentLetter: string;
  onSubmit: (answers: any) => void;
  onSkip: () => void;
  disabled?: boolean;
}

export default function GameForm({ currentLetter, onSubmit, onSkip, disabled }: GameFormProps) {
  const { toast } = useToast();
  const [answers, setAnswers] = useState({
    name: "",
    place: "",
    animal: "",
    thing: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that at least one field is filled
    const filledFields = Object.values(answers).filter(answer => answer.trim().length > 0);
    
    if (filledFields.length === 0) {
      toast({
        title: "Please fill at least one field",
        description: "You need to provide at least one answer to submit.",
        variant: "destructive",
      });
      return;
    }

    // Check if answers start with correct letter
    const letter = currentLetter.toLowerCase();
    const warnings = [];
    
    if (answers.name && !answers.name.toLowerCase().startsWith(letter)) {
      warnings.push("Name doesn't start with " + currentLetter);
    }
    if (answers.place && !answers.place.toLowerCase().startsWith(letter)) {
      warnings.push("Place doesn't start with " + currentLetter);
    }
    if (answers.animal && !answers.animal.toLowerCase().startsWith(letter)) {
      warnings.push("Animal doesn't start with " + currentLetter);
    }
    if (answers.thing && !answers.thing.toLowerCase().startsWith(letter)) {
      warnings.push("Thing doesn't start with " + currentLetter);
    }

    if (warnings.length > 0) {
      toast({
        title: "Some answers may not match",
        description: warnings.join(", ") + ". You'll get 0 points for these answers.",
      });
    }

    onSubmit(answers);
    
    // Clear form for next round
    setAnswers({
      name: "",
      place: "",
      animal: "",
      thing: ""
    });
  };

  const handleSkip = () => {
    onSkip();
    
    // Clear form
    setAnswers({
      name: "",
      place: "",
      animal: "",
      thing: ""
    });
  };

  const categories = [
    {
      key: "name",
      label: "Name",
      icon: User,
      placeholder: `Enter a name starting with ${currentLetter}...`,
      value: answers.name
    },
    {
      key: "place",
      label: "Place",
      icon: MapPin,
      placeholder: `Enter a place starting with ${currentLetter}...`,
      value: answers.place
    },
    {
      key: "animal",
      label: "Animal",
      icon: Rabbit,
      placeholder: `Enter an animal starting with ${currentLetter}...`,
      value: answers.animal
    },
    {
      key: "thing",
      label: "Thing",
      icon: Package,
      placeholder: `Enter a thing starting with ${currentLetter}...`,
      value: answers.thing
    }
  ];

  return (
    <Card className="senior-card mb-8">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {categories.map(({ key, label, icon: Icon, placeholder, value }) => (
            <div key={key}>
              <Label className="block text-2xl font-semibold text-gray-700 mb-4">
                <Icon className="inline mr-3 h-6 w-6 text-primary" />
                {label}
              </Label>
              <Input
                type="text"
                value={value}
                onChange={(e) => handleInputChange(key, e.target.value)}
                className="senior-input"
                placeholder={placeholder}
                disabled={disabled}
                maxLength={100}
              />
            </div>
          ))}

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button
              type="submit"
              disabled={disabled}
              className="flex-1 senior-button bg-success hover:bg-green-600 text-white"
            >
              <Check className="mr-3 h-6 w-6" />
              Submit Answers
            </Button>
            <Button
              type="button"
              onClick={handleSkip}
              disabled={disabled}
              className="flex-1 senior-button"
              variant="outline"
              style={{ 
                backgroundColor: 'hsl(var(--secondary))', 
                color: 'white',
                borderColor: 'hsl(var(--secondary))'
              }}
            >
              <FastForward className="mr-3 h-6 w-6" />
              Skip Round
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
