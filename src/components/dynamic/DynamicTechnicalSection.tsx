import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Code, ArrowRight } from 'lucide-react';
import { AssessmentSection } from '@/lib/api';
import DynamicQuestion from './DynamicQuestion';

interface DynamicTechnicalSectionProps {
  section?: AssessmentSection;
  onComplete: (data: any) => void;
}

const DynamicTechnicalSection: React.FC<DynamicTechnicalSectionProps> = ({
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
              <p className="text-gray-600">No technical questions available for this assessment.</p>
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
      'logical-reasoning': 'Logical Reasoning',
      'numerical-ability': 'Numerical Ability',
      'basic-it-knowledge': 'Basic IT Knowledge',
      'scripting-foundations': 'Scripting Foundations',
      'domain-awareness': 'Domain Awareness',
      'general-aptitude': 'General Aptitude',
      'foundational-knowledge': 'Foundational Knowledge'
    };
    return categoryMap[category] || 'Technical Knowledge';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Code className="h-6 w-6 text-green-600" />
          <h1 className="text-2xl font-bold text-gray-900">Technical Aptitude Assessment</h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">Question {currentQuestionIndex + 1} of {questions.length}</span>
          <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
        </div>
      </div>

      {/* Progress Bar */}
      <Progress value={progress} className="h-2" />

      {/* Question Card */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
        <CardContent className="p-8">
          {/* Category Badge */}
          <div className="mb-6">
            <span className="inline-block px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
              {getCategoryDisplayName(currentQuestion?.category || 'technical')}
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
          Evaluating: {getCategoryDisplayName(currentQuestion?.category || 'technical')}
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
            className="bg-green-600 hover:bg-green-700 text-white px-6"
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

export default DynamicTechnicalSection;
