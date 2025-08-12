import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Target, ArrowRight } from 'lucide-react';
import { AssessmentSection } from '@/lib/api';
import DynamicQuestion from './DynamicQuestion';

interface DynamicWiscarSectionProps {
  section?: AssessmentSection;
  onComplete: (data: any) => void;
}

const DynamicWiscarSection: React.FC<DynamicWiscarSectionProps> = ({
  section,
  onComplete
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  if (!section) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-gray-600">No WISCAR questions available for this assessment.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const questions = section.questions || [];
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswer = (answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Section complete
      onComplete(answers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const canProceed = () => {
    if (!currentQuestion) return false;
    
    if (currentQuestion.required) {
      const answer = answers[currentQuestion.id];
      if (currentQuestion.type === 'text') {
        return answer && answer.trim().length > 0;
      }
      return answer !== undefined && answer !== null;
    }
    
    return true;
  };

  // Get category display name
  const getCategoryDisplayName = (category: string) => {
    const categoryMap: Record<string, string> = {
      'will': 'Will & Perseverance',
      'interest': 'Interest & Motivation',
      'skill': 'Skill & Experience',
      'cognitive': 'Cognitive Readiness',
      'ability': 'Learning Ability',
      'realWorld': 'Real-world Fit'
    };
    return categoryMap[category] || 'WISCAR Analysis';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Target className="h-6 w-6 text-orange-600" />
          <h1 className="text-2xl font-bold text-gray-900">WISCAR Analysis</h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">Question {currentQuestionIndex + 1} of {questions.length}</span>
          <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
        </div>
      </div>

      {/* Progress Bar */}
      <Progress value={progress} className="h-2" />

      {/* Question Card */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-amber-50">
        <CardContent className="p-8">
          {/* Category Badge */}
          <div className="mb-6">
            <span className="inline-block px-3 py-1 text-sm font-medium text-orange-700 bg-orange-100 rounded-full">
              {getCategoryDisplayName(currentQuestion?.category || 'wiscar')}
            </span>
          </div>

          {/* Question */}
          {currentQuestion && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 leading-relaxed">
                {currentQuestion.text}
              </h2>

              <DynamicQuestion
                question={currentQuestion}
                onAnswer={handleAnswer}
                currentAnswer={answers[currentQuestion.id]}
                isRequired={currentQuestion.required}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4">
        <div className="text-sm text-gray-600">
          Evaluating: {getCategoryDisplayName(currentQuestion?.category || 'wiscar')}
        </div>
        
        <div className="flex space-x-3">
          {currentQuestionIndex > 0 && (
            <Button
              variant="outline"
              onClick={handlePrevious}
              className="px-6"
            >
              Previous
            </Button>
          )}
          
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6"
          >
            {currentQuestionIndex < questions.length - 1 ? (
              <>
                Next Question
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              'Complete Section'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DynamicWiscarSection;
