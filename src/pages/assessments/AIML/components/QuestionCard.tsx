import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

type Question = {
  id: string;
  question: string;
  type: 'scale' | 'multiple' | 'boolean';
  options?: string[];
  scale?: { min: number; max: number; labels: string[] };
};

type QuestionCardProps = {
  question: Question;
  answer: any;
  onAnswer: (questionId: string, answer: any) => void;
};

export const QuestionCard = ({ question, answer, onAnswer }: QuestionCardProps) => {
  const [localAnswer, setLocalAnswer] = useState(answer);

  const handleScaleChange = (value: number[]) => {
    const newValue = value[0];
    setLocalAnswer(newValue);
    onAnswer(question.id, newValue);
  };

  const handleMultipleChoice = (value: string) => {
    setLocalAnswer(value);
    onAnswer(question.id, value);
  };

  const handleBooleanChoice = (value: boolean) => {
    setLocalAnswer(value);
    onAnswer(question.id, value);
  };

  return (
    <Card className="assessment-card">
      <CardHeader>
        <CardTitle className="text-lg leading-relaxed">
          {question.question}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {question.type === 'scale' && question.scale && (
          <div className="space-y-6">
            <div className="px-4">
              <Slider
                value={[localAnswer || question.scale.min]}
                onValueChange={handleScaleChange}
                max={question.scale.max}
                min={question.scale.min}
                step={1}
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground px-2">
              {question.scale.labels.map((label, index) => (
                <span key={index} className="text-center max-w-[100px]">
                  {label}
                </span>
              ))}
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full">
                <span className="text-lg font-semibold text-primary">
                  {localAnswer || question.scale.min}
                </span>
              </div>
            </div>
          </div>
        )}

        {question.type === 'multiple' && question.options && (
          <RadioGroup value={localAnswer || ''} onValueChange={handleMultipleChoice}>
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <RadioGroupItem value={option} id={`${question.id}-${index}`} />
                  <Label 
                    htmlFor={`${question.id}-${index}`} 
                    className="flex-1 cursor-pointer py-3 px-4 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        )}

        {question.type === 'boolean' && (
          <div className="flex gap-4">
            <Button
              variant={localAnswer === true ? 'default' : 'outline'}
              size="lg"
              onClick={() => handleBooleanChoice(true)}
              className={`flex-1 ${localAnswer === true ? 'primary-gradient' : ''}`}
            >
              Yes
            </Button>
            <Button
              variant={localAnswer === false ? 'default' : 'outline'}
              size="lg"
              onClick={() => handleBooleanChoice(false)}
              className={`flex-1 ${localAnswer === false ? 'primary-gradient' : ''}`}
            >
              No
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};