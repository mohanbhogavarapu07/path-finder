import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Flag } from 'lucide-react';

interface QuestionNavigatorProps {
  totalQuestions: number;
  currentQuestion: number;
  answers: Record<string, string>;
  markedForReview: Set<string>;
  onQuestionSelect: (index: number) => void;
  questions?: Array<{ id: string }>;
}

const QuestionNavigator: React.FC<QuestionNavigatorProps> = ({
  totalQuestions,
  currentQuestion,
  answers,
  markedForReview,
  onQuestionSelect,
  questions
}) => {
  const getQuestionStatus = (index: number) => {
    // Use actual question ID if available, otherwise fallback to Q format
    const questionId = questions?.[index]?.id || `Q${index + 1}`;
    const isAnswered = !!answers[questionId];
    const isMarked = markedForReview.has(questionId);

    if (isAnswered && isMarked) return "answered-marked";
    if (isAnswered) return "answered";
    if (isMarked) return "marked";
    return "not-answered";
  };

  return (
    <Card className="w-80 h-fit">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-800">
          Question Navigator
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Legend */}
        <div className="flex flex-col gap-2 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-green-500" />
            <span>Answered</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-orange-500" />
            <span>Marked for Review</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gray-300" />
            <span>Not Answered</span>
          </div>
        </div>

        {/* Question Grid */}
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: totalQuestions }).map((_, index) => {
            const status = getQuestionStatus(index);
            return (
              <Button
                key={index}
                variant={index === currentQuestion ? "default" : "outline"}
                size="sm"
                onClick={() => onQuestionSelect(index)}
                className={`relative h-10 ${
                  status === "answered"
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : status === "marked"
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : status === "answered-marked"
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-gray-300 hover:bg-gray-400 text-gray-700"
                }`}
              >
                {index + 1}
                {status === "answered-marked" && (
                  <Flag className="w-3 h-3 absolute top-1 right-1" />
                )}
              </Button>
            );
          })}
        </div>

      </CardContent>
    </Card>
  );
};

export default QuestionNavigator;
