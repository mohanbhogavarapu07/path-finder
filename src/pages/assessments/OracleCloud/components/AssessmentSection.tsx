import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface AssessmentSectionProps {
  title: string;
  description: string;
  questions: any[];
  onComplete: (answers: Record<string, string | number>) => void;
  onBack: () => void;
}

// Helper to convert scale questions to options array
function getOptions(question: any) {
  if (!question) return [];
  if (question.options && Array.isArray(question.options)) {
    // Already in correct format
    if (typeof question.options[0] === 'object') return question.options;
    // If options are just strings, convert to { value, label }
    return question.options.map((opt: any) => ({ value: opt, label: opt }));
  }
  if (question.type === "scale" && question.scaleRange) {
    const [min, max] = question.scaleRange;
    // Use a standard mapping for 1-5 scales
    const scaleLabelsMap: Record<string, string[]> = {
      '1-5': [
        'Strongly Disagree',
        'Disagree',
        'Neutral',
        'Agree',
        'Strongly Agree'
      ]
    };
    let labels: string[] = [];
    if (min === 1 && max === 5) {
      labels = scaleLabelsMap['1-5'];
    } else {
      // fallback: just use numbers as labels
      labels = Array.from({ length: max - min + 1 }, (_, i) => (max - i).toString());
    }
    // Generate options from max to min (to match reference order)
    return Array.from({ length: max - min + 1 }, (_, i) => {
      const value = (max - i).toString();
      const label = labels[i] || value;
      return { value, label };
    });
  }
  return [];
}

export const AssessmentSection = ({
  title,
  description,
  questions,
  onComplete,
  onBack
}: AssessmentSectionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | number>>({});

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const canProceed = answers[currentQuestion] !== undefined;
  const isLastQuestion = currentQuestion === questions.length - 1;
  const isFirstQuestion = currentQuestion === 0;

  const handleAnswerChange = (value: string | number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: value
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Map answers to question ids
      const mappedAnswers: Record<string, string | number> = {};
      questions.forEach((q, idx) => {
        mappedAnswers[q.id] = answers[idx];
      });
      onComplete(mappedAnswers);
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (isFirstQuestion) {
      onBack();
    } else {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  // Color logic based on section title
  let borderColor = "border-gray-200";
  let bgColor = "";
  let iconColor = "";
  if (title.toLowerCase().includes("psychological")) {
    borderColor = "border-purple-200";
    bgColor = "bg-purple-50";
    iconColor = "text-purple-600";
  } else if (title.toLowerCase().includes("technical")) {
    borderColor = "border-green-200";
    bgColor = "bg-green-50";
    iconColor = "text-green-600";
  } else if (title.toLowerCase().includes("wiscar")) {
    borderColor = "border-orange-200";
    bgColor = "bg-orange-50";
    iconColor = "text-orange-600";
  }

  // Always render options as a list, matching the reference
  const currentQuestionData = questions[currentQuestion];
  const options = getOptions(currentQuestionData);

  // Early return if no question data
  if (!currentQuestionData) {
    return (
      <div className="max-w-3xl mx-auto">
        <Card className={`border-2 ${borderColor}`}>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">Loading question...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card className={`border-2 ${borderColor}`}>
        <CardHeader>
          <CardTitle className={`flex items-center space-x-2 ${iconColor}`}>
            <span>{title}</span>
          </CardTitle>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className={`${bgColor} p-4 rounded-lg`}>
            <div className={`text-sm font-medium mb-2 ${iconColor}`}>
              {currentQuestionData.category || ''}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {currentQuestionData.question || currentQuestionData.text || 'Question text not available'}
            </h3>
            <RadioGroup
              value={answers[currentQuestion]?.toString() || ''}
              onValueChange={handleAnswerChange}
              className="space-y-3"
            >
              {options.map((option: any, index: number) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`option-${index}`} />
                  <Label
                    htmlFor={`option-${index}`}
                    className="text-sm cursor-pointer flex-1 py-2 px-3 rounded hover:bg-white/50 transition-colors"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          {/* Always visible button bar, static styling */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <Button
              onClick={handlePrevious}
              variant="outline"
              className="flex items-center gap-2 hover:bg-gray-50"
            >
              <ArrowLeft className="w-4 h-4" />
              {isFirstQuestion ? "Back to Introduction" : "Previous"}
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canProceed}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              {isLastQuestion ? 'Complete Section' : 'Next Question'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};