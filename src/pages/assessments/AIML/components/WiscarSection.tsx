import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Target, ArrowRight } from 'lucide-react';

interface WiscarSectionProps {
  onComplete: (data: any) => void;
}

const questions = [
  {
    category: 'Will (Perseverance)',
    question: 'When I start learning something new, I stick with it even when it gets difficult.',
    options: [
      { value: '5', label: 'Always true' },
      { value: '4', label: 'Usually true' },
      { value: '3', label: 'Sometimes true' },
      { value: '2', label: 'Rarely true' },
      { value: '1', label: 'Never true' }
    ]
  },
  {
    category: 'Interest (Long-term)',
    question: 'I actively seek out information about AI/ML and related tools.',
    options: [
      { value: '5', label: 'Very frequently' },
      { value: '4', label: 'Often' },
      { value: '3', label: 'Sometimes' },
      { value: '2', label: 'Rarely' },
      { value: '1', label: 'Never' }
    ]
  },
  {
    category: 'Skill (Current Level)',
    question: 'How would you rate your current technical skills for AI/ML?',
    options: [
      { value: '5', label: 'Advanced (Programming, ML, etc.)' },
      { value: '4', label: 'Intermediate (Some coding/ML)' },
      { value: '3', label: 'Basic (Some tools)' },
      { value: '2', label: 'Beginner' },
      { value: '1', label: 'No technical background' }
    ]
  },
  {
    category: 'Cognitive Readiness',
    question: 'I can understand complex relationships between different data sources.',
    options: [
      { value: '5', label: 'Very easily' },
      { value: '4', label: 'Usually' },
      { value: '3', label: 'Sometimes' },
      { value: '2', label: 'With difficulty' },
      { value: '1', label: 'Very difficult' }
    ]
  },
  {
    category: 'Ability to Learn',
    question: 'I believe I can master new technical skills with dedicated effort.',
    options: [
      { value: '5', label: 'Completely confident' },
      { value: '4', label: 'Very confident' },
      { value: '3', label: 'Somewhat confident' },
      { value: '2', label: 'Not very confident' },
      { value: '1', label: 'Not confident at all' }
    ]
  },
  {
    category: 'Real-World Alignment',
    question: 'I would enjoy helping organizations use AI/ML to solve real problems.',
    options: [
      { value: '5', label: 'Very much' },
      { value: '4', label: 'Quite a bit' },
      { value: '3', label: 'Somewhat' },
      { value: '2', label: 'A little' },
      { value: '1', label: 'Not at all' }
    ]
  }
];

const WiscarSection = ({ onComplete }: WiscarSectionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      const scores = calculateWiscarScores();
      onComplete(scores);
    }
  };

  const calculateWiscarScores = () => {
    const dimensions = ['Will (Perseverance)', 'Interest (Long-term)', 'Skill (Current Level)', 'Cognitive Readiness', 'Ability to Learn', 'Real-World Alignment'];
    const scores: Record<string, number> = {};

    dimensions.forEach(dimension => {
      const dimensionQuestions = questions
        .map((q, index) => ({ ...q, index }))
        .filter(q => q.category === dimension);
      
      const dimensionTotal = dimensionQuestions.reduce((sum, q) => {
        return sum + parseInt(answers[q.index] || '3');
      }, 0);
      
      const maxPossible = dimensionQuestions.length * 5;
      scores[dimension] = Math.round((dimensionTotal / maxPossible) * 100);
    });

    const overallScore = Math.round(
      Object.values(scores).reduce((sum, score) => sum + score, 0) / Object.keys(scores).length
    );

    // Determine readiness quadrant
    const interest = scores['Interest (Long-term)'];
    const skill = scores['Skill (Current Level)'];
    let quadrant = '';
    if (interest >= 70 && skill >= 70) {
      quadrant = 'Ready to Start';
    } else if (interest >= 70 && skill < 70) {
      quadrant = 'High Interest - Build Skills';
    } else if (interest < 70 && skill >= 70) {
      quadrant = 'Technical Ready - Explore Interest';
    } else {
      quadrant = 'Foundation Building Needed';
    }

    return {
      dimensions: scores,
      overall: overallScore,
      quadrant,
      answers
    };
  };

  const canProceed = answers[currentQuestion] !== undefined;
  const isLastQuestion = currentQuestion === questions.length - 1;

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
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-orange-700 mb-2">
              {questions[currentQuestion].category}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {questions[currentQuestion].question}
            </h3>
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={`option-${index}`}
                    name={`question-${currentQuestion}`}
                    value={option.value}
                    checked={answers[currentQuestion] === option.value}
                    onChange={() => handleAnswerChange(option.value)}
                    className="form-radio text-orange-600 focus:ring-orange-500"
                  />
                  <label htmlFor={`option-${index}`} className="text-sm cursor-pointer flex-1 py-2 px-3 rounded hover:bg-white/50 transition-colors">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Evaluating: {questions[currentQuestion].category}
            </div>
            <Button 
              onClick={handleNext}
              disabled={!canProceed}
              className="bg-orange-600 hover:bg-orange-700"
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

export default WiscarSection; 