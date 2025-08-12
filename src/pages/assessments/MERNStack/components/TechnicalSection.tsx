
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Code, ArrowRight, CheckCircle, XCircle } from 'lucide-react';

interface TechnicalSectionProps {
  onComplete: (data: any) => void;
}

const TechnicalSection = ({ onComplete }: TechnicalSectionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showExplanation, setShowExplanation] = useState(false);

  const questions = [
    {
      category: 'Logical Reasoning',
      question: 'What comes next in this sequence: 2, 4, 8, 16, ?',
      options: [
        { value: 'A', label: '24' },
        { value: 'B', label: '32' },
        { value: 'C', label: '30' },
        { value: 'D', label: '28' }
      ],
      correct: 'B',
      explanation: 'Each number is multiplied by 2: 2×2=4, 4×2=8, 8×2=16, 16×2=32'
    },
    {
      category: 'Logical Reasoning',
      question: 'If all React components are JavaScript functions, and some JavaScript functions can be asynchronous, which statement must be true?',
      options: [
        { value: 'A', label: 'All React components can be asynchronous' },
        { value: 'B', label: 'Some React components may be asynchronous' },
        { value: 'C', label: 'No React components can be asynchronous' },
        { value: 'D', label: 'Only JavaScript functions can be asynchronous' }
      ],
      correct: 'B',
      explanation: 'Since React components are JavaScript functions and some JavaScript functions can be async, some React components may be asynchronous.'
    },
    {
      category: 'Numerical Ability',
      question: 'A web application processes 2,400 API requests per hour. If 25% are GET requests, how many GET requests are processed per hour?',
      options: [
        { value: 'A', label: '400' },
        { value: 'B', label: '600' },
        { value: 'C', label: '800' },
        { value: 'D', label: '1000' }
      ],
      correct: 'B',
      explanation: '2,400 × 0.25 = 600 GET requests per hour'
    },
    {
      category: 'Basic IT Knowledge',
      question: 'What is the primary purpose of a database in a web application?',
      options: [
        { value: 'A', label: 'To store and organize data' },
        { value: 'B', label: 'To create user interfaces' },
        { value: 'C', label: 'To manage network connections' },
        { value: 'D', label: 'To process graphics' }
      ],
      correct: 'A',
      explanation: 'Databases are designed to store, organize, and retrieve data efficiently for web applications.'
    },
    {
      category: 'Basic IT Knowledge',
      question: 'In web development, what does "API" stand for?',
      options: [
        { value: 'A', label: 'Application Programming Interface' },
        { value: 'B', label: 'Advanced Programming Integration' },
        { value: 'C', label: 'Automated Process Interface' },
        { value: 'D', label: 'Application Process Integration' }
      ],
      correct: 'A',
      explanation: 'API (Application Programming Interface) allows different software applications to communicate with each other.'
    },
    {
      category: 'JavaScript Foundations',
      question: 'In JavaScript, what will this code output: console.log(3 + "2")?',
      options: [
        { value: 'A', label: '5' },
        { value: 'B', label: '32' },
        { value: 'C', label: 'Error' },
        { value: 'D', label: 'undefined' }
      ],
      correct: 'B',
      explanation: 'JavaScript concatenates the number 3 with string "2", resulting in "32"'
    },
    {
      category: 'MERN Domain Knowledge',
      question: 'What does MongoDB primarily store?',
      options: [
        { value: 'A', label: 'Relational data in tables' },
        { value: 'B', label: 'JSON-like documents' },
        { value: 'C', label: 'Binary files only' },
        { value: 'D', label: 'Text files' }
      ],
      correct: 'B',
      explanation: 'MongoDB is a NoSQL database that stores data in flexible, JSON-like documents.'
    },
    {
      category: 'Problem-Solving',
      question: 'A company wants to build a web application. What would be the FIRST step?',
      options: [
        { value: 'A', label: 'Start coding the application immediately' },
        { value: 'B', label: 'Define requirements and plan the architecture' },
        { value: 'C', label: 'Buy hosting and domain' },
        { value: 'D', label: 'Hire developers' }
      ],
      correct: 'B',
      explanation: 'Understanding requirements and planning the architecture is essential before starting development.'
    }
  ];

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: value
    }));
    setShowExplanation(false);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setShowExplanation(false);
    } else {
      const scores = calculateScores();
      onComplete(scores);
    }
  };

  const calculateScores = () => {
    const categories = ['Logical Reasoning', 'Numerical Ability', 'Basic IT Knowledge', 'JavaScript Foundations', 'MERN Domain Knowledge', 'Problem-Solving'];
    const scores: Record<string, number> = {};
    let totalCorrect = 0;

    categories.forEach(category => {
      const categoryQuestions = questions
        .map((q, index) => ({ ...q, index }))
        .filter(q => q.category === category);
      
      const correctAnswers = categoryQuestions.filter(q => answers[q.index] === q.correct).length;
      const categoryScore = Math.round((correctAnswers / categoryQuestions.length) * 100);
      scores[category] = categoryScore;
      totalCorrect += correctAnswers;
    });

    const overallScore = Math.round((totalCorrect / questions.length) * 100);

    return {
      categories: scores,
      overall: overallScore,
      correctAnswers: totalCorrect,
      totalQuestions: questions.length,
      answers
    };
  };

  const showAnswer = () => {
    setShowExplanation(true);
  };

  const currentAnswer = answers[currentQuestion];
  const isCorrect = currentAnswer === questions[currentQuestion].correct;
  const canProceed = currentAnswer !== undefined;
  const isLastQuestion = currentQuestion === questions.length - 1;

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
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-green-700 mb-2">
              {questions[currentQuestion].category}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {questions[currentQuestion].question}
            </h3>
            
            <RadioGroup
              value={currentAnswer || ''}
              onValueChange={handleAnswerChange}
              className="space-y-3"
            >
              {questions[currentQuestion].options.map((option) => (
                <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-green-100">
                  <RadioGroupItem value={option.value} id={`q${currentQuestion}_${option.value}`} />
                  <Label htmlFor={`q${currentQuestion}_${option.value}`} className="flex-1 cursor-pointer">
                    <span className="font-medium">{option.value}.</span> {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {currentAnswer && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                {isCorrect ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
                <span className={`font-medium ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </span>
              </div>
              
              {!showExplanation && (
                <Button
                  variant="outline"
                  onClick={showAnswer}
                  className="text-sm"
                >
                  Show Explanation
                </Button>
              )}
              
              {showExplanation && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Explanation:</h4>
                  <p className="text-blue-800 text-sm">
                    {questions[currentQuestion].explanation}
                  </p>
                </div>
              )}
            </div>
          )}
          
          <div className="flex justify-end">
            <Button
              onClick={handleNext}
              disabled={!canProceed}
              className="bg-green-600 hover:bg-green-700 text-white"
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

export default TechnicalSection;
