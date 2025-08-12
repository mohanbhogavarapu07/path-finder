import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

export interface Question {
  id: string;
  text: string;
  type: "scale" | "choice" | "scenario";
  options?: string[];
  scaleRange?: [number, number];
  scaleLabels?: [string, string];
  category?: string;
}

interface QuestionCardProps {
  question: Question;
  currentAnswer?: string | number;
  onAnswer: (answer: string | number) => void;
  questionNumber: number;
  totalQuestions: number;
}

export const QuestionCard = ({
  question,
  currentAnswer,
  onAnswer,
  questionNumber,
  totalQuestions
}: QuestionCardProps) => {
  const progress = (questionNumber / totalQuestions) * 100;

  // Color logic based on category
  let borderColor = "border-gray-200";
  let bgColor = "";
  let iconColor = "";
  if ((question.category || "").toLowerCase().includes("psychological")) {
    borderColor = "border-purple-200";
    bgColor = "bg-purple-50";
    iconColor = "text-purple-600";
  } else if ((question.category || "").toLowerCase().includes("technical")) {
    borderColor = "border-green-200";
    bgColor = "bg-green-50";
    iconColor = "text-green-600";
  } else if ((question.category || "").toLowerCase().includes("wiscar")) {
    borderColor = "border-orange-200";
    bgColor = "bg-orange-50";
    iconColor = "text-orange-600";
  }

  const renderScaleQuestion = () => {
    const [min, max] = question.scaleRange || [1, 5];
    const [minLabel, maxLabel] = question.scaleLabels || ["Strongly Disagree", "Strongly Agree"];
    return (
      <div className="space-y-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>{minLabel}</span>
          <span>{maxLabel}</span>
        </div>
        <RadioGroup
          value={currentAnswer?.toString()}
          onValueChange={(value) => onAnswer(parseInt(value))}
          className="space-y-3"
        >
          {Array.from({ length: max - min + 1 }, (_, i) => min + i).map((value) => (
            <div key={value} className="flex items-center space-x-2">
              <RadioGroupItem
                value={value.toString()}
                id={`scale-${value}`}
                className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
              />
              <Label
                htmlFor={`scale-${value}`}
                className="text-sm cursor-pointer hover:text-purple-600 transition-colors flex-1"
              >
                {value === 1 && minLabel}
                {value === 2 && 'Disagree'}
                {value === 3 && 'Neutral'}
                {value === 4 && 'Agree'}
                {value === 5 && maxLabel}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    );
  };

  const renderChoiceQuestion = () => {
    return (
      <RadioGroup
        value={currentAnswer?.toString()}
        onValueChange={(value) => onAnswer(value)}
        className="space-y-3"
      >
        {question.options?.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem
              value={option}
              id={`choice-${index}`}
              className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
            />
            <Label
              htmlFor={`choice-${index}`}
              className="text-sm cursor-pointer hover:text-purple-600 transition-colors flex-1"
            >
              {option}
            </Label>
          </div>
        ))}
      </RadioGroup>
    );
  };

  return (
    <Card className={`border-2 ${borderColor} ${bgColor}`}>
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-600">
            Question {questionNumber} of {totalQuestions}
          </div>
          <div className={`text-sm font-medium ${iconColor}`}>
            {Math.round(progress)}% Complete
          </div>
        </div>
        <Progress value={progress} className="h-2 mb-4" />
        <CardTitle className="text-lg leading-relaxed">
          {question.text}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {question.type === "scale" && renderScaleQuestion()}
        {question.type === "choice" && renderChoiceQuestion()}
        {question.type === "scenario" && renderChoiceQuestion()}
      </CardContent>
    </Card>
  );
};