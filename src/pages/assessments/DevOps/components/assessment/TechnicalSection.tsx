import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Code, ArrowRight } from 'lucide-react';
import { AssessmentQuestion, Question } from './AssessmentQuestion';

interface TechnicalSectionProps {
  onComplete: (data: any) => void;
  questions?: Question[];
}

const defaultQuestions: Question[] = [
  {
    id: 'logic_1',
    type: 'multiple-choice',
    category: 'cognitive',
    question: 'What comes next in this sequence: 2, 4, 8, 16, ?',
    options: [
      { value: '20', label: '20' },
      { value: '24', label: '24' },
      { value: '32', label: '32' },
      { value: '36', label: '36' }
    ]
  },
  {
    id: 'devops_1',
    type: 'multiple-choice',
    category: 'technical',
    question: 'Which tool is commonly used for continuous integration in DevOps?',
    options: [
      { value: 'Jenkins', label: 'Jenkins' },
      { value: 'Photoshop', label: 'Photoshop' },
      { value: 'Excel', label: 'Excel' },
      { value: 'WordPress', label: 'WordPress' }
    ]
  },
  {
    id: 'cloud_1',
    type: 'multiple-choice',
    category: 'technical',
    question: 'What does "Infrastructure as Code" (IaC) mean?',
    options: [
      { value: 'Managing infrastructure using code/scripts', label: 'Managing infrastructure using code/scripts' },
      { value: 'Writing code in the cloud', label: 'Writing code in the cloud' },
      { value: 'Coding without infrastructure', label: 'Coding without infrastructure' },
      { value: 'Manual server configuration', label: 'Manual server configuration' }
    ]
  },
  {
    id: 'scripting_1',
    type: 'multiple-choice',
    category: 'technical',
    question: 'Which of the following is a scripting language commonly used for automation?',
    options: [
      { value: 'Python', label: 'Python' },
      { value: 'HTML', label: 'HTML' },
      { value: 'CSS', label: 'CSS' },
      { value: 'SQL', label: 'SQL' }
    ]
  },
  {
    id: 'problem_1',
    type: 'multiple-choice',
    category: 'aptitude',
    question: 'A server is down. What is the FIRST step you should take?',
    options: [
      { value: 'Check server logs and status', label: 'Check server logs and status' },
      { value: 'Restart all services', label: 'Restart all services' },
      { value: 'Call the CEO', label: 'Call the CEO' },
      { value: 'Replace the hardware', label: 'Replace the hardware' }
    ]
  }
];

const TechnicalSection = ({ onComplete, questions }: TechnicalSectionProps) => {
  const questionsToUse = questions && questions.length > 0 ? questions : defaultQuestions;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | number>>({});

  const totalQuestions = questionsToUse.length;
  const progress = totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;

  const handleAnswer = (answer: string | number) => {
    setAnswers((prev) => ({ ...prev, [currentIndex]: answer }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onComplete(answers);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  if (totalQuestions === 0) {
    return <div className="text-center text-red-500">No technical questions available.</div>;
  }

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
              <span>Question {currentIndex + 1} of {totalQuestions}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
        <CardContent>
          <AssessmentQuestion
            question={questionsToUse[currentIndex]}
            answer={answers[currentIndex]}
            onAnswer={handleAnswer}
            onNext={handleNext}
            onPrevious={handlePrevious}
            currentIndex={currentIndex}
            totalQuestions={totalQuestions}
            canGoNext={answers[currentIndex] !== undefined}
            canGoPrevious={currentIndex > 0}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TechnicalSection; 