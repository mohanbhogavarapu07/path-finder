
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Target, ArrowRight } from 'lucide-react';

interface WiscarSectionProps {
  onComplete: (data: any) => void;
}

const WiscarSection = ({ onComplete }: WiscarSectionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const questions = [
    {
      category: 'Will (Perseverance)',
      question: 'When I start learning something new, I stick with it even when it gets difficult',
      options: [
        { value: '5', label: 'Always true' },
        { value: '4', label: 'Usually true' },
        { value: '3', label: 'Sometimes true' },
        { value: '2', label: 'Rarely true' },
        { value: '1', label: 'Never true' }
      ]
    },
    {
      category: 'Will (Perseverance)',
      question: 'I have completed online courses or certifications in programming before',
      options: [
        { value: '5', label: 'Multiple certifications' },
        { value: '4', label: 'Several courses' },
        { value: '3', label: 'A few courses' },
        { value: '2', label: 'One or two' },
        { value: '1', label: 'None completed' }
      ]
    },
    {
      category: 'Interest (Long-term)',
      question: 'I actively seek out information about web development and programming',
      options: [
        { value: '5', label: 'Very frequently' },
        { value: '4', label: 'Often' },
        { value: '3', label: 'Sometimes' },
        { value: '2', label: 'Rarely' },
        { value: '1', label: 'Never' }
      ]
    },
    {
      category: 'Interest (Long-term)',
      question: 'I would enjoy learning MERN stack even if it wasn\'t for career reasons',
      options: [
        { value: '5', label: 'Strongly agree' },
        { value: '4', label: 'Agree' },
        { value: '3', label: 'Neutral' },
        { value: '2', label: 'Disagree' },
        { value: '1', label: 'Strongly disagree' }
      ]
    },
    {
      category: 'Skill (Current Level)',
      question: 'How would you rate your current programming skills?',
      options: [
        { value: '5', label: 'Advanced (Multiple languages, frameworks)' },
        { value: '4', label: 'Intermediate (Some programming experience)' },
        { value: '3', label: 'Basic (HTML/CSS, some JavaScript)' },
        { value: '2', label: 'Beginner (Limited programming experience)' },
        { value: '1', label: 'No programming background' }
      ]
    },
    {
      category: 'Skill (Current Level)',
      question: 'Have you worked with web development or programming projects before?',
      options: [
        { value: '5', label: 'Extensively (Led projects)' },
        { value: '4', label: 'Moderately (Participated in projects)' },
        { value: '3', label: 'Some exposure' },
        { value: '2', label: 'Very limited' },
        { value: '1', label: 'No experience' }
      ]
    },
    {
      category: 'Cognitive Readiness',
      question: 'I can understand complex relationships between different parts of a web application',
      options: [
        { value: '5', label: 'Very easily' },
        { value: '4', label: 'Usually' },
        { value: '3', label: 'Sometimes' },
        { value: '2', label: 'With difficulty' },
        { value: '1', label: 'Very difficult' }
      ]
    },
    {
      category: 'Cognitive Readiness',
      question: 'When faced with a complex programming problem, I can break it down into smaller parts',
      options: [
        { value: '5', label: 'Always' },
        { value: '4', label: 'Usually' },
        { value: '3', label: 'Sometimes' },
        { value: '2', label: 'Rarely' },
        { value: '1', label: 'Never' }
      ]
    },
    {
      category: 'Ability to Learn',
      question: 'I believe I can master new programming skills with dedicated effort',
      options: [
        { value: '5', label: 'Completely confident' },
        { value: '4', label: 'Very confident' },
        { value: '3', label: 'Somewhat confident' },
        { value: '2', label: 'Not very confident' },
        { value: '1', label: 'Not confident at all' }
      ]
    },
    {
      category: 'Ability to Learn',
      question: 'I actively seek feedback and use it to improve my programming skills',
      options: [
        { value: '5', label: 'Always' },
        { value: '4', label: 'Usually' },
        { value: '3', label: 'Sometimes' },
        { value: '2', label: 'Rarely' },
        { value: '1', label: 'Never' }
      ]
    },
    {
      category: 'Real-World Alignment',
      question: 'I would enjoy building web applications and helping businesses with their digital needs',
      options: [
        { value: '5', label: 'Very much' },
        { value: '4', label: 'Quite a bit' },
        { value: '3', label: 'Somewhat' },
        { value: '2', label: 'A little' },
        { value: '1', label: 'Not at all' }
      ]
    },
    {
      category: 'Real-World Alignment',
      question: 'I can see myself working as a web developer or full-stack engineer',
      options: [
        { value: '5', label: 'Definitely' },
        { value: '4', label: 'Probably' },
        { value: '3', label: 'Maybe' },
        { value: '2', label: 'Probably not' },
        { value: '1', label: 'Definitely not' }
      ]
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
    const will = scores['Will (Perseverance)'];
    const interest = scores['Interest (Long-term)'];
    const skill = scores['Skill (Current Level)'];
    const cognitive = scores['Cognitive Readiness'];
    
    let quadrant = '';
    if (interest >= 70 && skill >= 70) {
      quadrant = 'Ready to Start';
    } else if (interest >= 70 && skill < 70) {
      quadrant = 'High Interest, Needs Skills';
    } else if (interest < 70 && skill >= 70) {
      quadrant = 'High Skills, Low Interest';
    } else {
      quadrant = 'Needs Development';
    }

    return {
      dimensions: scores,
      overall: overallScore,
      quadrant,
      readiness: {
        will,
        interest,
        skill,
        cognitive,
        ability: scores['Ability to Learn'],
        alignment: scores['Real-World Alignment']
      },
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
            
            <RadioGroup
              value={answers[currentQuestion] || ''}
              onValueChange={handleAnswerChange}
              className="space-y-3"
            >
              {questions[currentQuestion].options.map((option) => (
                <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-orange-100">
                  <RadioGroupItem value={option.value} id={`q${currentQuestion}_${option.value}`} />
                  <Label htmlFor={`q${currentQuestion}_${option.value}`} className="flex-1 cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <div className="flex justify-end">
            <Button
              onClick={handleNext}
              disabled={!canProceed}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              {isLastQuestion ? 'Complete Assessment' : 'Next Question'}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WiscarSection;
