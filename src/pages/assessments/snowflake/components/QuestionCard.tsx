import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { AssessmentQuestion } from "@/types/assessment";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: AssessmentQuestion;
  onAnswer: (value: number | string) => void;
  currentAnswer?: number | string;
}

export const QuestionCard = ({ question, onAnswer, currentAnswer }: QuestionCardProps) => {
  const [answer, setAnswer] = useState<number | string>(currentAnswer || '');

  // Reset answer when question changes
  useEffect(() => {
    setAnswer(currentAnswer || '');
  }, [question.id, currentAnswer]);

  const handleSubmit = () => {
    if (answer !== '') {
      onAnswer(answer);
    }
  };

  const isAnswered = answer !== '';

  return (
    <div className="space-y-6">
      {question.type === 'likert' && (
        <div className="space-y-4">
          <RadioGroup value={answer?.toString() || ''} onValueChange={(value) => setAnswer(parseInt(value))}>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((value) => {
                let label = '';
                if (value === 1) label = question.minLabel || 'Strongly Disagree';
                else if (value === 2) label = 'Disagree';
                else if (value === 3) label = 'Neutral';
                else if (value === 4) label = 'Agree';
                else if (value === 5) label = question.maxLabel || 'Strongly Agree';
                return (
                  <div key={value} className="flex items-center space-x-3">
                    <RadioGroupItem
                      value={value.toString()}
                      id={`option-${value}`}
                      className="cursor-pointer self-center"
                    />
                    <Label 
                      htmlFor={`option-${value}`}
                      className="cursor-pointer flex-1 py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors flex items-center"
                    >
                      <span>{label}</span>
                    </Label>
                  </div>
                );
              })}
            </div>
          </RadioGroup>
        </div>
      )}

      {question.type === 'slider' && (
        <div className="space-y-4">
          <div className="px-3">
            <Slider
              value={[typeof answer === 'number' ? answer : 50]}
              onValueChange={(value) => setAnswer(value[0])}
              min={question.minValue || 0}
              max={question.maxValue || 100}
              step={1}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground px-3">
            <span>{question.minLabel}</span>
            <span className="font-medium text-blue-700">
              {typeof answer === 'number' ? answer : 50}
            </span>
            <span>{question.maxLabel}</span>
          </div>
        </div>
      )}

      {(question.type === 'multiple-choice' || question.type === 'scenario') && (
        <RadioGroup value={answer as string} onValueChange={setAnswer}>
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-3">
                <RadioGroupItem
                  value={option}
                  id={`option-${index}`}
                  className="cursor-pointer self-center"
                />
                <Label 
                  htmlFor={`option-${index}`}
                  className="cursor-pointer flex-1 py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-200 flex items-center"
                >
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      )}

      <div className="flex justify-end pt-4">
        <Button 
          onClick={handleSubmit}
          disabled={!isAnswered}
          variant={isAnswered ? "default" : "outline"}
          className={cn(
            "transition-all duration-200 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md",
            !isAnswered && "bg-white text-blue-600 border-blue-200 hover:bg-blue-50"
          )}
        >
          Next Question
        </Button>
      </div>
    </div>
  );
};