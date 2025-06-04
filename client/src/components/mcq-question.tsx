import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, FastForward, Film } from "lucide-react";

interface MCQQuestionProps {
  question: {
    id: string;
    question: string;
    choices: string[];
    correctAnswer: string;
    movieData?: any;
  };
  onSubmit: (selectedAnswer: string) => void;
  onSkip: () => void;
  disabled?: boolean;
  gameMode?: string;
}

export default function MCQQuestion({ question, onSubmit, onSkip, disabled, gameMode }: MCQQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAnswer) {
      onSubmit(selectedAnswer);
      setSelectedAnswer("");
    }
  };

  const handleSkip = () => {
    onSkip();
    setSelectedAnswer("");
  };

  return (
    <Card className="senior-card mb-8">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center">
          {gameMode === "hollybolly" && (
            <Film className="mr-3 h-6 w-6 text-secondary" />
          )}
          Question
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Question Text */}
          <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
            <p className="text-xl font-medium text-gray-800">
              {question.question}
            </p>
          </div>

          {/* Answer Choices */}
          <RadioGroup 
            value={selectedAnswer} 
            onValueChange={setSelectedAnswer}
            className="space-y-4"
          >
            {question.choices.map((choice, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 rounded-xl border-2 border-gray-200 hover:border-primary hover:bg-blue-50 transition-all">
                <RadioGroupItem 
                  value={choice} 
                  id={`choice-${index}`}
                  className="scale-150"
                  disabled={disabled}
                />
                <Label 
                  htmlFor={`choice-${index}`} 
                  className="text-xl font-medium cursor-pointer flex-1 py-2"
                >
                  {choice}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button
              type="submit"
              disabled={disabled || !selectedAnswer}
              className="flex-1 senior-button bg-success hover:bg-green-600 text-white"
            >
              <Check className="mr-3 h-6 w-6" />
              Submit Answer
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
              Skip Question
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}