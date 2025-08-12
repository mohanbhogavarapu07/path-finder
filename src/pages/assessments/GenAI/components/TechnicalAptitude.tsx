import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { QuestionCard } from "./QuestionCard";
import { technicalQuestions } from "../data/questions";
import { AssessmentResponse } from "../types/assessment";
import { Code, ArrowRight } from "lucide-react";

interface TechnicalAptitudeProps {
  responses: AssessmentResponse[];
  onUpdateResponse: (questionId: string, value: string | number) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const TechnicalAptitude = ({
  responses,
  onUpdateResponse,
  onNext,
  onPrevious
}: TechnicalAptitudeProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = technicalQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / technicalQuestions.length) * 100;
  
  const currentResponse = responses.find(r => r.questionId === currentQuestion.id);
  const allAnswered = technicalQuestions.every(q => 
    responses.some(r => r.questionId === q.id && r.value !== undefined)
  );

  const handleNext = () => {
    if (currentQuestionIndex < technicalQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="border-2 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Code className="w-6 h-6 text-green-600" />
            <span>Technical Aptitude Assessment</span>
          </CardTitle>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Question {currentQuestionIndex + 1} of {technicalQuestions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-green-700 mb-2">
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
              totalQuestions={technicalQuestions.length}
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Evaluating: {currentQuestion.category}
            </div>
            <div className="flex gap-2">
              {currentQuestionIndex < technicalQuestions.length - 1 ? (
                <Button
                  onClick={handleNext}
                  disabled={!currentResponse?.value}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Next Question
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={onNext}
                  disabled={!allAnswered}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Complete Section
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