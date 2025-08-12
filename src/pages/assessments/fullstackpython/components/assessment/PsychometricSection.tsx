
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Brain, ArrowRight } from 'lucide-react';

interface PsychometricSectionProps {
  onNext: (data: Record<string, number>) => void;
  canGoBack: boolean;
}

const questions = [
  {
    id: "problem_solving",
    text: "I enjoy solving abstract problems using code and logic.",
    category: "Problem Solving"
  },
  {
    id: "flexibility",
    text: "I prefer tools that offer flexibility and creativity over rigid structures.",
    category: "Flexibility"
  },
  {
    id: "automation",
    text: "I often experiment with automating repetitive tasks in my daily life.",
    category: "Automation Interest"
  },
  {
    id: "learning_persistence",
    text: "When learning something new, I persist even when it becomes challenging.",
    category: "Grit"
  },
  {
    id: "curiosity",
    text: "I'm naturally curious about how websites and applications work behind the scenes.",
    category: "Technical Curiosity"
  },
  {
    id: "collaboration",
    text: "I enjoy collaborating with others to build something meaningful.",
    category: "Collaboration"
  },
  {
    id: "detail_oriented",
    text: "I pay attention to small details and catch errors that others might miss.",
    category: "Attention to Detail"
  },
  {
    id: "continuous_learning",
    text: "I actively seek out new technologies and programming concepts to learn.",
    category: "Growth Mindset"
  },
  {
    id: "user_focused",
    text: "I think about user experience when building or designing anything.",
    category: "User Focus"
  },
  {
    id: "systematic_thinking",
    text: "I like to break down complex problems into smaller, manageable parts.",
    category: "Systematic Thinking"
  }
];

const scaleOptions = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" }
];

export const PsychometricSection = ({ onNext }: PsychometricSectionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: parseInt(value)
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Pass all answers at once on completion
      onNext(answers);
    }
  };
  
  const canProceed = answers[questions[currentQuestion].id] !== undefined;
  const isLastQuestion = currentQuestion === questions.length - 1;

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="border-2 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-6 h-6 text-purple-600" />
            <span>Psychological Fit Assessment</span>
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
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-purple-700 mb-2">
              {questions[currentQuestion].category}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {questions[currentQuestion].text}
            </h3>
            
            <RadioGroup
              value={answers[questions[currentQuestion].id]?.toString() || ''}
              onValueChange={handleAnswerChange}
              className="space-y-3"
            >
              {scaleOptions.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value.toString()} id={`option-${index}`} />
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

          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Evaluating: {questions[currentQuestion].category}
            </div>
            <Button 
              onClick={handleNext}
              disabled={!canProceed}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isLastQuestion ? 'Complete Section' : 'Next Question'}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
