import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

export interface Question {
  id: string;
  type: 'multiple-choice' | 'scale' | 'scenario';
  category: 'interest' | 'personality' | 'cognitive' | 'motivation' | 'technical' | 'aptitude';
  question: string;
  description?: string;
  options?: { value: string; label: string; }[];
  scaleMin?: number;
  scaleMax?: number;
  scaleLabels?: { min: string; max: string; };
  scenario?: string;
  weight?: number;
}

interface AssessmentQuestionProps {
  question: Question;
  answer: string | number | undefined;
  onAnswer: (answer: string | number) => void;
  onNext: () => void;
  onPrevious: () => void;
  currentIndex: number;
  totalQuestions: number;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export function AssessmentQuestion({
  question,
  answer,
  onAnswer,
  onNext,
  onPrevious,
  currentIndex,
  totalQuestions,
  canGoNext,
  canGoPrevious
}: AssessmentQuestionProps) {
  const renderQuestion = () => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <RadioGroup 
            value={answer as string} 
            onValueChange={onAnswer}
            className="space-y-3"
          >
            {question.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label 
                  htmlFor={option.value} 
                  className="text-sm cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );
      
      case 'scale':
        return (
          <div className="space-y-4">
            <div className="px-4">
              <Slider
                value={[answer as number || question.scaleMin || 1]}
                onValueChange={(values) => onAnswer(values[0])}
                max={question.scaleMax || 5}
                min={question.scaleMin || 1}
                step={1}
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{question.scaleLabels?.min || 'Strongly Disagree'}</span>
              <span className="font-medium text-foreground">
                {answer || question.scaleMin || 1}
              </span>
              <span>{question.scaleLabels?.max || 'Strongly Agree'}</span>
            </div>
          </div>
        );
      
      case 'scenario':
        return (
          <div className="space-y-4">
            {question.scenario && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground italic">
                  {question.scenario}
                </p>
              </div>
            )}
            <RadioGroup 
              value={answer as string} 
              onValueChange={onAnswer}
              className="space-y-3"
            >
              {question.options?.map((option) => (
                <div key={option.value} className="flex items-start space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} className="mt-0.5" />
                  <Label 
                    htmlFor={option.value} 
                    className="text-sm cursor-pointer leading-relaxed"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl leading-relaxed">
              {question.question}
            </CardTitle>
            <div className="text-sm text-muted-foreground">
              {currentIndex + 1} of {totalQuestions}
            </div>
          </div>
          {question.description && (
            <p className="text-sm text-muted-foreground">
              {question.description}
            </p>
          )}
        </CardHeader>
        <CardContent>
          {renderQuestion()}
        </CardContent>
      </Card>
      
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={!canGoPrevious}
        >
          Previous
        </Button>
        
        <Button
          onClick={onNext}
          disabled={!canGoNext}
        >
          {currentIndex + 1 === totalQuestions ? 'Finish' : 'Next'}
        </Button>
      </div>
    </div>
  );
}