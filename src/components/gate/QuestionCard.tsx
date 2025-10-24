import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface GateQuestion {
  id: string;
  text: string;
  type: 'multiple-choice' | 'numerical' | 'text';
  options?: Array<{
    id: string;
    text: string;
    value: string | number;
  }>;
  correctAnswer?: string | number;
  marks: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  explanation?: string;
}

interface QuestionCardProps {
  question: GateQuestion;
  selectedAnswer?: string;
  onAnswerSelect: (answer: string) => void;
  questionNumber?: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  questionNumber
}) => {
  if (!question) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="text-center text-gray-500">
            No question available
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Question {questionNumber || 1}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge 
              variant={question.difficulty === 'Hard' ? 'destructive' : question.difficulty === 'Medium' ? 'secondary' : 'outline'}
              className="text-xs"
            >
              {question.difficulty}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Question Text */}
        <div className="text-gray-700 leading-relaxed">
          {question.text}
        </div>

        {/* Answer Options */}
        {question.type === 'multiple-choice' && question.options && (
          <div className="space-y-3">
            <RadioGroup
              value={selectedAnswer || ''}
              onValueChange={onAnswerSelect}
              className="space-y-3"
            >
              {question.options.map((option) => (
                <div key={option.id} className="flex items-center space-x-3">
                  <RadioGroupItem value={option.value.toString()} id={option.id} />
                  <Label 
                    htmlFor={option.id} 
                    className="flex-1 cursor-pointer text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    <span className="font-medium mr-2">{option.id}.</span>
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        {/* Numerical Input */}
        {question.type === 'numerical' && (
          <div className="space-y-2">
            <Label htmlFor="numerical-answer" className="text-sm font-medium text-gray-700">
              Enter your answer:
            </Label>
            <input
              id="numerical-answer"
              type="number"
              value={selectedAnswer || ''}
              onChange={(e) => onAnswerSelect(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter numerical value"
            />
          </div>
        )}

        {/* Text Input */}
        {question.type === 'text' && (
          <div className="space-y-2">
            <Label htmlFor="text-answer" className="text-sm font-medium text-gray-700">
              Enter your answer:
            </Label>
            <textarea
              id="text-answer"
              value={selectedAnswer || ''}
              onChange={(e) => onAnswerSelect(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your answer"
              rows={3}
            />
          </div>
        )}

      </CardContent>
    </Card>
  );
};

export default QuestionCard;