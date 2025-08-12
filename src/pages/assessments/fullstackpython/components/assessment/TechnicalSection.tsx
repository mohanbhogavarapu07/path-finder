
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Code } from "lucide-react";

interface TechnicalSectionProps {
  onNext: (data: Record<string, any>) => void;
  canGoBack: boolean;
}

const sections = [
  {
    id: "logical_reasoning",
    title: "A. Logical Reasoning",
    description: "Pattern recognition and problem-solving",
    questions: [
      {
        id: "pattern_1",
        text: "What comes next in this sequence: 2, 6, 18, 54, ?",
        type: "multiple_choice",
        options: ["162", "108", "72", "216"],
        correct: 0
      },
      {
        id: "logic_1",
        text: "If all Pythons are snakes, and some snakes are venomous, which statement is definitely true?",
        type: "multiple_choice",
        options: [
          "All Pythons are venomous",
          "Some Pythons might be venomous",
          "No Pythons are venomous",
          "All snakes are Pythons"
        ],
        correct: 1
      }
    ]
  },
  {
    id: "programming_concepts",
    title: "B. Programming Fundamentals",
    description: "Basic programming knowledge and concepts",
    questions: [
      {
        id: "variables_1",
        text: "Which of these is the best variable name for storing a user's age?",
        type: "multiple_choice",
        options: ["a", "user_age", "x1", "data"],
        correct: 1
      },
      {
        id: "loops_1",
        text: "What would this pseudocode output? \n\nfor i from 1 to 3:\n    print i * 2",
        type: "multiple_choice",
        options: ["2, 4, 6", "1, 2, 3", "2, 4, 6, 8", "1, 4, 9"],
        correct: 0
      }
    ]
  },
  {
    id: "python_specific",
    title: "C. Python & Web Development",
    description: "Python syntax and web development concepts",
    questions: [
      {
        id: "python_syntax_1",
        text: "Which Python code correctly creates a list of even numbers from 0 to 10?",
        type: "multiple_choice",
        options: [
          "[x for x in range(11) if x % 2 == 0]",
          "[x for x in range(10) if x % 2 == 1]",
          "[x*2 for x in range(5)]",
          "Both A and C are correct"
        ],
        correct: 3
      },
      {
        id: "web_concepts_1",
        text: "What does REST stand for in web development?",
        type: "multiple_choice",
        options: [
          "Really Easy Server Technology",
          "Representational State Transfer",
          "Remote Execution Service Tool",
          "Rapid Enterprise Software Testing"
        ],
        correct: 1
      }
    ]
  }
];

export const TechnicalSection = ({ onNext }: TechnicalSectionProps) => {
  const allQuestions = sections.flatMap((sec, secIdx) => 
    sec.questions.map((q, qIdx) => ({ ...q, qIndex: qIdx, secIndex: secIdx }))
  );
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  
  const currentQuestion = allQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / allQuestions.length) * 100;

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: parseInt(value)
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      let correct = 0;
      allQuestions.forEach(q => {
        if (answers[q.id] === q.correct) {
          correct++;
        }
      });
      const score = Math.round((correct / allQuestions.length) * 100);
      onNext({ answers, score });
    }
  };

  const canProceed = answers[currentQuestion.id] !== undefined;
  const isLastQuestion = currentQuestionIndex === allQuestions.length - 1;

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
              <span>Question {currentQuestionIndex + 1} of {allQuestions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-green-700 mb-2">
              {sections[currentQuestion.secIndex].title}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 whitespace-pre-line">
              {currentQuestion.text}
            </h3>
            
            <RadioGroup
              value={answers[currentQuestion.id]?.toString() || ''}
              onValueChange={handleAnswerChange}
              className="space-y-3"
            >
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label 
                    htmlFor={`option-${index}`} 
                    className="text-sm cursor-pointer flex-1 py-2 px-3 rounded hover:bg-white/50 transition-colors"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Category: {sections[currentQuestion.secIndex].title}
            </div>
            <Button 
              onClick={handleNext}
              disabled={!canProceed}
              className="bg-green-600 hover:bg-green-700"
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
