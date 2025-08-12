import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Brain, ArrowRight } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface Question {
  id: string;
  text: string;
  type: 'likert' | 'mcq';
  options?: string[];
  category: 'interest' | 'personality' | 'cognitive' | 'motivation';
}

interface PsychometricSectionProps {
  onComplete: (scores: {
    interest: number;
    personality: number;
    cognitive: number;
    motivation: number;
    overall: number;
  }) => void;
  onBack: () => void;
}

const PsychometricSection: React.FC<PsychometricSectionProps> = ({ onComplete, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const questions: Question[] = [
    // Interest Scale (5 questions)
    {
      id: 'interest_1',
      text: 'I actively follow cryptocurrency and Web3 trends in the news and social media.',
      type: 'likert',
      category: 'interest'
    },
    {
      id: 'interest_2',
      text: 'I enjoy understanding how decentralized systems work at a technical level.',
      type: 'likert',
      category: 'interest'
    },
    {
      id: 'interest_3',
      text: 'I find the concept of digital ownership (NFTs, tokens) fascinating.',
      type: 'likert',
      category: 'interest'
    },
    {
      id: 'interest_4',
      text: 'I am curious about how blockchain could revolutionize traditional industries.',
      type: 'likert',
      category: 'interest'
    },
    {
      id: 'interest_5',
      text: 'I regularly explore new blockchain projects and DeFi protocols.',
      type: 'likert',
      category: 'interest'
    },
    // Personality Compatibility (8 questions)
    {
      id: 'personality_1',
      text: 'I am comfortable working in ambiguous, rapidly changing environments.',
      type: 'likert',
      category: 'personality'
    },
    {
      id: 'personality_2',
      text: 'I enjoy taking calculated risks when the potential rewards are high.',
      type: 'likert',
      category: 'personality'
    },
    {
      id: 'personality_3',
      text: 'I prefer to dive deep into complex systems rather than work on surface-level tasks.',
      type: 'likert',
      category: 'personality'
    },
    {
      id: 'personality_4',
      text: 'I am highly detail-oriented and thorough in my work.',
      type: 'likert',
      category: 'personality'
    },
    {
      id: 'personality_5',
      text: 'I tend to be an early adopter of new technologies.',
      type: 'likert',
      category: 'personality'
    },
    {
      id: 'personality_6',
      text: 'I am comfortable with the idea of working in unregulated or minimally regulated spaces.',
      type: 'likert',
      category: 'personality'
    },
    {
      id: 'personality_7',
      text: 'I believe in the importance of financial privacy and decentralization.',
      type: 'likert',
      category: 'personality'
    },
    {
      id: 'personality_8',
      text: 'I am resilient and bounce back quickly from setbacks.',
      type: 'likert',
      category: 'personality'
    },
    // Cognitive Style (6 questions)
    {
      id: 'cognitive_1',
      text: 'I prefer learning through hands-on experimentation rather than structured courses.',
      type: 'likert',
      category: 'cognitive'
    },
    {
      id: 'cognitive_2',
      text: 'I enjoy solving abstract problems that require creative thinking.',
      type: 'likert',
      category: 'cognitive'
    },
    {
      id: 'cognitive_3',
      text: 'I am comfortable working with incomplete information and making decisions.',
      type: 'likert',
      category: 'cognitive'
    },
    {
      id: 'cognitive_4',
      text: 'I think in terms of systems and how different components interact.',
      type: 'likert',
      category: 'cognitive'
    },
    {
      id: 'cognitive_5',
      text: 'I enjoy analyzing patterns and finding underlying structures in complex data.',
      type: 'likert',
      category: 'cognitive'
    },
    {
      id: 'cognitive_6',
      text: 'I prefer working on projects that have multiple possible solutions.',
      type: 'likert',
      category: 'cognitive'
    },
    // Motivation Style (5 questions)
    {
      id: 'motivation_1',
      text: 'I am more motivated by the potential to build something revolutionary than by high salaries.',
      type: 'likert',
      category: 'motivation'
    },
    {
      id: 'motivation_2',
      text: 'I am driven by the desire to be part of the future of technology.',
      type: 'likert',
      category: 'motivation'
    },
    {
      id: 'motivation_3',
      text: 'I am motivated by the challenge of solving problems that haven\'t been solved before.',
      type: 'likert',
      category: 'motivation'
    },
    {
      id: 'motivation_4',
      text: 'I am excited by the potential for entrepreneurial opportunities in blockchain.',
      type: 'likert',
      category: 'motivation'
    },
    {
      id: 'motivation_5',
      text: 'I am motivated by the idea of contributing to a more decentralized world.',
      type: 'likert',
      category: 'motivation'
    }
  ];

  const likertOptions = [
    { value: 1, label: 'Strongly Disagree' },
    { value: 2, label: 'Disagree' },
    { value: 3, label: 'Neutral' },
    { value: 4, label: 'Agree' },
    { value: 5, label: 'Strongly Agree' }
  ];

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: parseInt(value)
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScores();
    }
  };

  const calculateScores = () => {
    const categoryScores = {
      interest: 0,
      personality: 0,
      cognitive: 0,
      motivation: 0
    };
    const categoryCounts = {
      interest: 0,
      personality: 0,
      cognitive: 0,
      motivation: 0
    };
    questions.forEach(question => {
      const answer = answers[question.id];
      if (answer) {
        categoryScores[question.category] += answer;
        categoryCounts[question.category]++;
      }
    });
    // Convert to 0-100 scale
    const normalizedScores = {
      interest: Math.round((categoryScores.interest / (categoryCounts.interest * 5)) * 100),
      personality: Math.round((categoryScores.personality / (categoryCounts.personality * 5)) * 100),
      cognitive: Math.round((categoryScores.cognitive / (categoryCounts.cognitive * 5)) * 100),
      motivation: Math.round((categoryScores.motivation / (categoryCounts.motivation * 5)) * 100)
    };
    const overall = Math.round(
      (normalizedScores.interest + normalizedScores.personality + normalizedScores.cognitive + normalizedScores.motivation) / 4
    );
    onComplete({
      ...normalizedScores,
      overall
    });
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
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
              {questions[currentQuestion].category.charAt(0).toUpperCase() + questions[currentQuestion].category.slice(1)}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {questions[currentQuestion].text}
            </h3>
            <RadioGroup
              value={answers[questions[currentQuestion].id]?.toString() || ''}
              onValueChange={handleAnswerChange}
              className="space-y-3"
            >
              {likertOptions.map((option, index) => (
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
              Evaluating: {questions[currentQuestion].category.charAt(0).toUpperCase() + questions[currentQuestion].category.slice(1)}
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

export default PsychometricSection;