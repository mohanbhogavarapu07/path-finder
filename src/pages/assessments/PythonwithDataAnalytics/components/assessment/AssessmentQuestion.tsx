import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, Brain, Code, Target, Check } from 'lucide-react';
import { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import React from 'react'; // Added missing import for React

export interface Question {
  id: string;
  type: 'radio' | 'scale' | 'scenario';
  question: string;
  description?: string;
  options?: string[];
  scaleLabels?: { min: string; max: string };
  scenario?: {
    situation: string;
    options: Array<{ text: string; value: string }>;
  };
  correct?: string;
  explanation?: string;
}

interface AssessmentQuestionProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  answer: any;
  onAnswerChange: (answer: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  isFirstQuestion: boolean;
  sectionInfo: {
    name: string;
    color: string;
    description: string;
  };
}

const AssessmentQuestion = ({
  question,
  questionIndex,
  totalQuestions,
  answer,
  onAnswerChange,
  onNext,
  onPrevious,
  canGoNext,
  isFirstQuestion,
  sectionInfo
}: AssessmentQuestionProps) => {
  // Section-specific color and icon
  let sectionColor = '';
  let sectionBg = '';
  let sectionIcon = null;
  let sectionBorder = '';
  if (sectionInfo.name.toLowerCase().includes('psychometric')) {
    sectionColor = 'purple';
    sectionBg = 'bg-purple-50';
    sectionIcon = <Brain className="w-6 h-6 text-purple-600" />;
    sectionBorder = 'border border-purple-200';
  } else if (sectionInfo.name.toLowerCase().includes('technical')) {
    sectionColor = 'green';
    sectionBg = 'bg-green-50';
    sectionIcon = <Code className="w-6 h-6 text-green-600" />;
    sectionBorder = 'border border-green-200';
  } else if (sectionInfo.name.toLowerCase().includes('wiscar')) {
    sectionColor = 'orange';
    sectionBg = 'bg-orange-50';
    sectionIcon = <Target className="w-6 h-6 text-orange-600" />;
    sectionBorder = 'border border-orange-200';
  }

  // Technical section: show answer feedback
  const [showExplanation, setShowExplanation] = useState(false);
  const isTechnical = sectionInfo.name.toLowerCase().includes('technical');
  const isWiscar = sectionInfo.name.toLowerCase().includes('wiscar');
  const isPsychometric = sectionInfo.name.toLowerCase().includes('psychometric');
  const currentAnswer = answer;
  const isCorrect = question.correct && currentAnswer === question.correct;

  // Section-specific label for category
  const categoryLabel = String((typeof question === 'object' && 'category' in question && question.category) ? question.category : sectionInfo.name ?? '');

  // Section-specific next button label
  const isLastQuestion = questionIndex === totalQuestions - 1;
  let nextLabel = 'Next Question';
  if (isLastQuestion) nextLabel = 'Complete Section';

  // Progress calculation for this question
  const progress = Math.round(((questionIndex + 1) / totalQuestions) * 100);

  // Section-specific WISCAR explanation
  const wiscarExplanation = isWiscar ? (
    <div className="bg-gray-50 p-4 rounded-lg mt-6">
      <h4 className="font-semibold text-gray-900 mb-2">WISCAR Framework</h4>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
        <div><strong>W</strong>ill - Perseverance</div>
        <div><strong>I</strong>nterest - Long-term curiosity</div>
        <div><strong>S</strong>kill - Current abilities</div>
        <div><strong>C</strong>ognitive - Problem-solving</div>
        <div><strong>A</strong>bility - Learning capacity</div>
        <div><strong>R</strong>eal-world - Job alignment</div>
      </div>
    </div>
  ) : null;

  // Section-specific feedback for technical questions
  const technicalFeedback = isTechnical && question.correct && showExplanation ? (
    <div className={`mt-4 p-3 rounded-lg ${isCorrect ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'}`}>
      <div className="flex items-start space-x-2">
        {isCorrect ? (
          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
        ) : (
          <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
        )}
        <div>
          <div className={`font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
            {isCorrect ? 'Correct!' : 'Incorrect'}
          </div>
          <div className="text-sm text-gray-700 mt-1">
            {question.explanation}
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className={`rounded-xl shadow-sm ${sectionBorder} p-0 min-h-[650px] max-w-3xl`}>
          {/* Card Header: Section Title, Progress Bar, Question Number */}
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between mb-1">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                {sectionIcon}
                <span>{sectionInfo.name} Assessment</span>
              </CardTitle>
              <span className="text-sm text-gray-500 font-medium">{progress}% Complete</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-600 font-medium">Question {questionIndex + 1} of {totalQuestions}</span>
            </div>
          </CardHeader>
          {/* Section Progress Bar (individual) */}
          <div className="px-6 pt-2 pb-2">
            <Progress value={progress} className="h-2 bg-gray-200" />
          </div>
          {/* Card Content: Question Area */}
          <CardContent className="pt-4 pb-8 min-h-[420px]">
            <div className={`rounded-lg ${sectionBg} p-6`}> {/* Section-specific background */}
              <div className="mb-3">
                <span className="font-bold text-sm text-purple-700">{categoryLabel}</span>
              </div>
              <div className="mb-6">
                <span className="block text-lg font-bold text-gray-900">{question.question}</span>
                {question.description && (
                  <span className="block text-gray-600 text-sm mt-1">{question.description}</span>
                )}
              </div>
              {/* Render answer options */}
              {React.createElement(() => {
                if (question.type === 'radio' && Array.isArray(question.options)) {
                  return (
                    <RadioGroup
                      value={answer || ''}
                      onValueChange={onAnswerChange}
                      className="space-y-3"
                    >
                      {(question.options as (string | { value: string; label: string })[]).map((option, index) => {
                        const value = typeof option === 'string' ? option : option.value;
                        const label = typeof option === 'string' ? option : option.label;
                        return (
                          <div key={index} className="flex items-center space-x-2">
                            <RadioGroupItem value={value} id={`option-${index}`} />
                            <Label
                              htmlFor={`option-${index}`}
                              className="text-sm cursor-pointer flex-1 py-2 px-3 rounded hover:bg-white/50 transition-colors"
                            >
                              {label}
                            </Label>
                          </div>
                        );
                      })}
                    </RadioGroup>
                  );
                } else if (question.type === 'scale') {
                  return (
                    <RadioGroup
                      value={answer || ''}
                      onValueChange={onAnswerChange}
                      className="space-y-3"
                    >
                      {[
                        { value: '5', label: 'Strongly Agree' },
                        { value: '4', label: 'Agree' },
                        { value: '3', label: 'Neutral' },
                        { value: '2', label: 'Disagree' },
                        { value: '1', label: 'Strongly Disagree' },
                      ].map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.value} id={`scale-option-${index}`} />
                          <Label
                            htmlFor={`scale-option-${index}`}
                            className="text-sm cursor-pointer flex-1 py-2 px-3 rounded hover:bg-white/50 transition-colors"
                          >
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  );
                } else if (question.type === 'scenario' && Array.isArray(question.scenario?.options)) {
                  return (
                    <>
                      <div className="bg-muted/30 p-4 rounded-lg border-l-4 border-accent mb-4">
                        <h4 className="font-medium mb-2">Scenario:</h4>
                        <p className="text-muted-foreground">{question.scenario?.situation}</p>
                      </div>
                      <RadioGroup value={answer || ''} onValueChange={onAnswerChange} className="space-y-3">
                        {(question.scenario?.options as { value: string; text: string }[]).map((option, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <RadioGroupItem value={option.value} id={`scenario-option-${index}`} />
                            <Label
                              htmlFor={`scenario-option-${index}`}
                              className="text-sm cursor-pointer flex-1 py-2 px-3 rounded hover:bg-white/50 transition-colors"
                            >
                              {option.text}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </>
                  );
                }
                return null;
              })}
              {/* Technical feedback */}
              {technicalFeedback}
            </div>
            {/* WISCAR explanation */}
            {wiscarExplanation}
            {/* Footer: Category being evaluated and Next button */}
            <div className="flex items-center justify-between mt-6">
              <span className="text-sm text-gray-500">Evaluating: {categoryLabel}</span>
              <div className="flex items-center gap-2">
                {/* Show Answer button for technical questions */}
                {isTechnical && question.correct && !showExplanation && (
                  <Button 
                    onClick={() => setShowExplanation(true)}
                    variant="outline"
                    className="text-gray-600"
                  >
                    Show Answer
                  </Button>
                )}
                <Button 
                  onClick={onNext}
                  disabled={!canGoNext}
                  className={`rounded-lg px-6 py-2 text-white font-semibold bg-purple-500 hover:bg-purple-600 transition-colors ${!canGoNext ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  {nextLabel}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AssessmentQuestion;