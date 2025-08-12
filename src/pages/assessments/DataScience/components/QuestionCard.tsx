import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Question, AssessmentAnswer } from '@/types/assessment';

interface QuestionCardProps {
  question: Question;
  answer?: AssessmentAnswer;
  onAnswerChange: (answer: AssessmentAnswer) => void;
  questionNumber: number;
  totalQuestions: number;
}

const scaleLabels: Record<number, string> = {
  1: 'Strongly Disagree',
  2: 'Disagree',
  3: 'Neutral',
  4: 'Agree',
  5: 'Strongly Agree',
};

export const QuestionCard = ({ 
  question, 
  answer, 
  onAnswerChange,
  questionNumber,
  totalQuestions 
}: QuestionCardProps) => {
  // Generate options for scale questions if not provided
  let options: any[] = [];
  if (question.type === 'scale') {
    const min = question.min ?? 1;
    const max = question.max ?? 5;
    options = Array.from({ length: max - min + 1 }, (_, i) => {
      const value = String(min + i);
      return {
        value,
        label: scaleLabels[min + i] || value,
      };
    });
  } else if (question.options && Array.isArray(question.options)) {
    // If options are string[]
    options = question.options.map((opt: any, i: number) =>
      typeof opt === 'object' ? opt : { value: String(i + 1), label: opt }
    );
  } else if (question.options && typeof question.options[0] === 'object') {
    // If options are {value, label}[]
    options = question.options;
  }

  const getRadioValue = () => {
    return answer?.value ? String(answer.value) : '';
  };
  const handleRadioChange = (value: string) => {
    onAnswerChange({
      questionId: question.id,
      value: value,
    });
  };

  // Determine section color classes based on category/section
  const sectionBg = 'bg-blue-50';
  const sectionText = 'text-blue-700';

  return (
    <div className="space-y-6">
      <div className={`${sectionBg} p-4 rounded-lg`}>
        <div className={`text-sm font-medium mb-2 ${sectionText}`}>
          {question.category}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {question.question}
        </h3>
        {/* Always render radio buttons for options, matching the reference UI */}
        {options.length > 0 && (
          <RadioGroup 
            value={getRadioValue()}
            onValueChange={handleRadioChange}
            className="space-y-3"
          >
            {options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem 
                  value={option.value} 
                  id={`option-${index}`}
                />
                <Label 
                  htmlFor={`option-${index}`}
                  className="text-sm cursor-pointer flex-1 py-2 px-3 rounded hover:bg-white/50 transition-colors"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}
        {/* Show selected answer below the options */}
      </div>
      {/* Removed duplicate question number content */}
    </div>
  );
};