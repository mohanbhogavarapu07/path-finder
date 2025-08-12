import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { QuestionCard } from "./QuestionCard";
import { wiscarQuestions } from "../data/questions";
import { AssessmentResponse } from "../types/assessment";
import { Target, ArrowRight } from "lucide-react";

interface WISCARAnalysisProps {
  responses: AssessmentResponse[];
  onUpdateResponse: (questionId: string, value: string | number) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const WISCARAnalysis = ({
  responses,
  onUpdateResponse,
  onNext,
  onPrevious
}: WISCARAnalysisProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = wiscarQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / wiscarQuestions.length) * 100;
  
  const currentResponse = responses.find(r => r.questionId === currentQuestion.id);
  const allAnswered = wiscarQuestions.every(q => 
    responses.some(r => r.questionId === q.id && r.value !== undefined)
  );

  const handleNext = () => {
    if (currentQuestionIndex < wiscarQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="border-2 border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-6 h-6 text-orange-600" />
            <span>WISCAR Framework Analysis</span>
          </CardTitle>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Question {currentQuestionIndex + 1} of {wiscarQuestions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-orange-700 mb-2">
              {currentQuestion.category}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {currentQuestion.question}
            </h3>
            
            <QuestionCard
              question={currentQuestion}
              value={currentResponse?.value}
              onAnswer={onUpdateResponse}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={wiscarQuestions.length}
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Evaluating: {currentQuestion.category}
            </div>
            <div className="flex gap-2">
              {currentQuestionIndex < wiscarQuestions.length - 1 ? (
                <Button
                  onClick={handleNext}
                  disabled={!currentResponse?.value}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  Next Question
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={onNext}
                  disabled={!allAnswered}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  View Your Results
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};