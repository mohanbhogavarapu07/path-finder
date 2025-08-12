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
      category: 'Oracle Cloud Fundamentals',
      question: 'Which Oracle Cloud service provides managed Kubernetes?',
      options: [
        { value: 'A', label: 'Oracle Container Engine for Kubernetes (OKE)' },
        { value: 'B', label: 'Oracle Compute Cloud Service' },
        { value: 'C', label: 'Oracle Functions' },
        { value: 'D', label: 'Oracle API Gateway' }
      ],
      correct: 'A',
      explanation: 'Oracle Container Engine for Kubernetes (OKE) is Oracle\'s managed Kubernetes service that handles the orchestration of containerized applications.'
    },
    {
      category: 'Database Management',
      question: 'What is Oracle Autonomous Database primarily designed for?',
      options: [
        { value: 'A', label: 'Self-managing, self-securing, and self-repairing database operations' },
        { value: 'B', label: 'Manual database administration tasks' },
        { value: 'C', label: 'Only data warehousing workloads' },
        { value: 'D', label: 'Small-scale development projects' }
      ],
      correct: 'A',
      explanation: 'Oracle Autonomous Database is designed to be self-managing, self-securing, and self-repairing, reducing manual administration tasks.'
    },
    {
      category: 'Cloud Infrastructure',
      question: 'In Oracle Cloud Infrastructure, what is a compartment?',
      options: [
        { value: 'A', label: 'A logical container for organizing cloud resources' },
        { value: 'B', label: 'A physical data center location' },
        { value: 'C', label: 'A type of virtual machine' },
        { value: 'D', label: 'A network security group' }
      ],
      correct: 'A',
      explanation: 'Compartments are logical containers used to organize and isolate cloud resources in Oracle Cloud Infrastructure.'
    },
    {
      category: 'Serverless Computing',
      question: 'Which Oracle Cloud service is used for serverless computing?',
      options: [
        { value: 'A', label: 'Oracle Functions' },
        { value: 'B', label: 'Oracle Compute' },
        { value: 'C', label: 'Oracle Container Engine' },
        { value: 'D', label: 'Oracle Load Balancer' }
      ],
      correct: 'A',
      explanation: 'Oracle Functions is Oracle\'s serverless computing service that allows you to run code without managing servers.'
    },
    {
      category: 'Infrastructure as Code',
      question: 'What is the primary purpose of Terraform?',
      options: [
        { value: 'A', label: 'Infrastructure as Code - defining and provisioning infrastructure' },
        { value: 'B', label: 'Application deployment and monitoring' },
        { value: 'C', label: 'Database administration' },
        { value: 'D', label: 'Network security management' }
      ],
      correct: 'A',
      explanation: 'Terraform is an Infrastructure as Code tool that allows you to define and provision infrastructure using declarative configuration files.'
    },
    {
      category: 'DevOps Practices',
      question: 'In a CI/CD pipeline, what does "CI" stand for?',
      options: [
        { value: 'A', label: 'Continuous Integration' },
        { value: 'B', label: 'Code Implementation' },
        { value: 'C', label: 'Container Infrastructure' },
        { value: 'D', label: 'Cloud Integration' }
      ],
      correct: 'A',
      explanation: 'CI stands for Continuous Integration, which involves automatically building and testing code changes as they are committed.'
    },
    {
      category: 'System Architecture',
      question: 'If System A depends on System B, and System B is temporarily unavailable, what\'s the best approach?',
      options: [
        { value: 'A', label: 'Implement a fallback mechanism or queue' },
        { value: 'B', label: 'Restart System A immediately' },
        { value: 'C', label: 'Wait for System B to come back online' },
        { value: 'D', label: 'Bypass the dependency completely' }
      ],
      correct: 'A',
      explanation: 'Implementing a fallback mechanism or queue ensures system resilience and prevents cascading failures when dependencies are unavailable.'
    },
    {
      category: 'Performance Optimization',
      question: 'You need to process 1 million records daily. The current system handles 100,000. What\'s your approach?',
      options: [
        { value: 'A', label: 'Scale horizontally by adding more processing nodes' },
        { value: 'B', label: 'Upgrade to a single more powerful machine' },
        { value: 'C', label: 'Process records in smaller batches throughout the day' },
        { value: 'D', label: 'Reduce the number of records processed' }
      ],
      correct: 'A',
      explanation: 'Horizontal scaling by adding more processing nodes is the most scalable approach for handling increased data processing requirements.'
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
    const categories = ['Oracle Cloud Fundamentals', 'Database Management', 'Cloud Infrastructure', 'Serverless Computing', 'Infrastructure as Code', 'DevOps Practices', 'System Architecture', 'Performance Optimization'];
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
              {questions[currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`option-${index}`} />
                  <Label 
                    htmlFor={`option-${index}`} 
                    className={`text-sm cursor-pointer flex-1 py-2 px-3 rounded transition-colors ${
                      showExplanation && option.value === questions[currentQuestion].correct
                        ? 'bg-green-200 border-green-400 border'
                        : showExplanation && currentAnswer === option.value && !isCorrect
                        ? 'bg-red-200 border-red-400 border'
                        : 'hover:bg-white/50'
                    }`}
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {showExplanation && (
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
                      {questions[currentQuestion].explanation}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Category: {questions[currentQuestion].category}
            </div>
            <div className="space-x-3">
              {canProceed && !showExplanation && (
                <Button 
                  onClick={showAnswer}
                  variant="outline"
                  className="text-gray-600"
                >
                  Show Answer
                </Button>
              )}
              <Button 
                onClick={handleNext}
                disabled={!canProceed}
                className="bg-green-600 hover:bg-green-700"
              >
                {isLastQuestion ? 'Complete Section' : 'Next Question'}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TechnicalSection; 