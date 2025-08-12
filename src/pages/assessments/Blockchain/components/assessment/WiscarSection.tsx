import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Target, ArrowRight } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  dimension: 'will' | 'interest' | 'skill' | 'cognitive' | 'ability' | 'realWorld';
}

interface WiscarSectionProps {
  onComplete: (scores: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    realWorld: number;
    overall: number;
  }) => void;
  onBack: () => void;
}

const WiscarSection: React.FC<WiscarSectionProps> = ({ onComplete, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const questions: Question[] = [
    // Will - Grit, consistency, drive (6 questions)
    {
      id: 'will_1',
      text: 'I complete what I start, even when it becomes difficult or tedious.',
      dimension: 'will'
    },
    {
      id: 'will_2',
      text: 'I maintain effort and interest despite failures, adversity, and plateaus in progress.',
      dimension: 'will'
    },
    {
      id: 'will_3',
      text: 'I am a hard worker who never gives up on long-term goals.',
      dimension: 'will'
    },
    {
      id: 'will_4',
      text: 'I am willing to put in months or years to master complex blockchain concepts.',
      dimension: 'will'
    },
    {
      id: 'will_5',
      text: 'I have a track record of sticking with challenging projects until completion.',
      dimension: 'will'
    },
    {
      id: 'will_6',
      text: 'I am motivated by long-term goals rather than immediate gratification.',
      dimension: 'will'
    },

    // Interest - Passion, curiosity (6 questions)
    {
      id: 'interest_1',
      text: 'I actively follow technology that isn\'t yet mainstream.',
      dimension: 'interest'
    },
    {
      id: 'interest_2',
      text: 'I find myself naturally drawn to understanding how complex systems work.',
      dimension: 'interest'
    },
    {
      id: 'interest_3',
      text: 'I spend my free time learning about blockchain, even without external motivation.',
      dimension: 'interest'
    },
    {
      id: 'interest_4',
      text: 'I am genuinely excited about the potential of decentralized technologies.',
      dimension: 'interest'
    },
    {
      id: 'interest_5',
      text: 'I enjoy discussing blockchain concepts and applications with others.',
      dimension: 'interest'
    },
    {
      id: 'interest_6',
      text: 'I believe blockchain technology will significantly impact the future.',
      dimension: 'interest'
    },

    // Skill - Actual vs required capabilities (6 questions)
    {
      id: 'skill_1',
      text: 'I have strong programming skills in at least one language.',
      dimension: 'skill'
    },
    {
      id: 'skill_2',
      text: 'I understand basic cryptographic concepts like hashing and digital signatures.',
      dimension: 'skill'
    },
    {
      id: 'skill_3',
      text: 'I am comfortable working with APIs and web technologies.',
      dimension: 'skill'
    },
    {
      id: 'skill_4',
      text: 'I have experience with version control systems like Git.',
      dimension: 'skill'
    },
    {
      id: 'skill_5',
      text: 'I understand database concepts and data structures.',
      dimension: 'skill'
    },
    {
      id: 'skill_6',
      text: 'I am comfortable with command-line interfaces and development tools.',
      dimension: 'skill'
    },

    // Cognitive - Abstract thinking, problem-solving (6 questions)
    {
      id: 'cognitive_1',
      text: 'I enjoy figuring out how complex systems work.',
      dimension: 'cognitive'
    },
    {
      id: 'cognitive_2',
      text: 'I am comfortable working with abstract mathematical concepts.',
      dimension: 'cognitive'
    },
    {
      id: 'cognitive_3',
      text: 'I can break down complex problems into smaller, manageable parts.',
      dimension: 'cognitive'
    },
    {
      id: 'cognitive_4',
      text: 'I think systematically about cause and effect relationships.',
      dimension: 'cognitive'
    },
    {
      id: 'cognitive_5',
      text: 'I am good at identifying patterns and connections between different concepts.',
      dimension: 'cognitive'
    },
    {
      id: 'cognitive_6',
      text: 'I can understand and work with multiple levels of abstraction simultaneously.',
      dimension: 'cognitive'
    },

    // Ability to Learn - Growth mindset, metacognition (6 questions)
    {
      id: 'ability_1',
      text: 'I learn from feedback and use it to improve my performance.',
      dimension: 'ability'
    },
    {
      id: 'ability_2',
      text: 'I actively seek out learning opportunities and challenges.',
      dimension: 'ability'
    },
    {
      id: 'ability_3',
      text: 'I am comfortable admitting when I don\'t know something.',
      dimension: 'ability'
    },
    {
      id: 'ability_4',
      text: 'I enjoy learning new programming languages and technologies.',
      dimension: 'ability'
    },
    {
      id: 'ability_5',
      text: 'I can learn effectively from online resources, documentation, and tutorials.',
      dimension: 'ability'
    },
    {
      id: 'ability_6',
      text: 'I view challenges as opportunities to grow rather than threats.',
      dimension: 'ability'
    },

    // Real-World Alignment - Job fit, role expectations (6 questions)
    {
      id: 'realWorld_1',
      text: 'I enjoy working in fast-moving, high-uncertainty industries.',
      dimension: 'realWorld'
    },
    {
      id: 'realWorld_2',
      text: 'I am comfortable working remotely and with distributed teams.',
      dimension: 'realWorld'
    },
    {
      id: 'realWorld_3',
      text: 'I am willing to work in an industry that is still evolving and may face regulatory challenges.',
      dimension: 'realWorld'
    },
    {
      id: 'realWorld_4',
      text: 'I am comfortable with the responsibility that comes with handling financial transactions and assets.',
      dimension: 'realWorld'
    },
    {
      id: 'realWorld_5',
      text: 'I am excited about the potential for career growth in emerging technologies.',
      dimension: 'realWorld'
    },
    {
      id: 'realWorld_6',
      text: 'I am comfortable working in an environment where continuous learning is essential.',
      dimension: 'realWorld'
    }
  ];

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
      calculateScores();
    }
  };

  const calculateScores = () => {
    const dimensions = ['will', 'interest', 'skill', 'cognitive', 'ability', 'realWorld'];
    const scores: Record<string, number> = {};
    dimensions.forEach(dimension => {
      const dimensionQuestions = questions
        .map((q, index) => ({ ...q, index }))
        .filter(q => q.dimension === dimension);
      const dimensionTotal = dimensionQuestions.reduce((sum, q) => {
        return sum + parseInt(answers[q.index] || '3');
      }, 0);
      const maxPossible = dimensionQuestions.length * 5;
      scores[dimension] = Math.round((dimensionTotal / maxPossible) * 100);
    });
    const overallScore = Math.round(
      Object.values(scores).reduce((sum, score) => sum + score, 0) / Object.keys(scores).length
    );
    onComplete({
      ...scores,
      overall: overallScore
    });
  };

  const canProceed = answers[currentQuestion] !== undefined;
  const isLastQuestion = currentQuestion === questions.length - 1;

  const likertOptions = [
    { value: '1', label: 'Strongly Disagree' },
    { value: '2', label: 'Disagree' },
    { value: '3', label: 'Neutral' },
    { value: '4', label: 'Agree' },
    { value: '5', label: 'Strongly Agree' }
  ];

  const dimensionLabels: Record<string, string> = {
    will: 'Will (Perseverance)',
    interest: 'Interest (Long-term)',
    skill: 'Skill (Current Level)',
    cognitive: 'Cognitive Readiness',
    ability: 'Ability to Learn',
    realWorld: 'Real-World Alignment'
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
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-orange-700 mb-2">
              {dimensionLabels[questions[currentQuestion].dimension]}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {questions[currentQuestion].text}
            </h3>
            <RadioGroup
              value={answers[currentQuestion] || ''}
              onValueChange={handleAnswerChange}
              className="space-y-3"
            >
              {likertOptions.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`option-${index}`} />
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
              Evaluating: {dimensionLabels[questions[currentQuestion].dimension]}
            </div>
            <Button
              onClick={handleNext}
              disabled={!canProceed}
              className="bg-orange-600 hover:bg-orange-700"
            >
              {isLastQuestion ? 'Complete Assessment' : 'Next Question'}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
          {/* WISCAR Explanation */}
          <div className="bg-gray-50 p-4 rounded-lg">
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
        </CardContent>
      </Card>
    </div>
  );
};

export default WiscarSection;