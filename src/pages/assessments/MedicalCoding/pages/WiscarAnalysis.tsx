import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ProgressBar } from "../components/ProgressBar";
import { StepIndicator } from "../components/StepIndicator";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, 
  Brain, 
  Code, 
  Target, 
  TrendingUp,
  ArrowLeft,
  ArrowRight,
  CheckCircle
} from "lucide-react";

const WiscarAnalysis = ({ onComplete }) => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const steps = [
    { id: "introduction", title: "Introduction", icon: BookOpen },
    { id: "psychological", title: "Psychological Fit", icon: Brain },
    { id: "technical", title: "Technical Aptitude", icon: Code },
    { id: "wiscar", title: "WISCAR Analysis", icon: Target },
    { id: "results", title: "Your Results", icon: TrendingUp }
  ];

  const wiscarSections = [
    {
      title: "Will (Perseverance & Discipline)",
      questions: [
        {
          id: "will1",
          question: "When faced with a challenging coding problem, I tend to stick with it until I find the solution"
        },
        {
          id: "will2", 
          question: "I can maintain focus on detailed work for several hours without getting frustrated"
        }
      ]
    },
    {
      title: "Interest (Fit with Medical Coding Role)",
      questions: [
        {
          id: "interest1",
          question: "I find healthcare terminology and medical concepts genuinely interesting"
        },
        {
          id: "interest2",
          question: "I would enjoy working behind the scenes to support healthcare operations"
        }
      ]
    },
    {
      title: "Skill (Current Abilities)",
      questions: [
        {
          id: "skill1",
          question: "I am comfortable using Excel or similar spreadsheet software"
        },
        {
          id: "skill2",
          question: "I have experience with data entry or similar detail-oriented work"
        }
      ]
    },
    {
      title: "Cognitive Readiness (Mental Processing)",
      questions: [
        {
          id: "cognitive1",
          question: "I can quickly identify patterns and follow logical sequences"
        },
        {
          id: "cognitive2",
          question: "I excel at tasks requiring sustained attention to detail"
        }
      ]
    }
  ];

  const likertOptions = [
    { value: "1", label: "Strongly Disagree" },
    { value: "2", label: "Disagree" },
    { value: "3", label: "Neutral" },
    { value: "4", label: "Agree" },
    { value: "5", label: "Strongly Agree" }
  ];

  const allQuestions = wiscarSections.flatMap(section => section.questions);

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Complete section
      onComplete(answers);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const currentQuestion = allQuestions[currentQuestionIndex];
  const currentSection = wiscarSections.find(section => 
    section.questions.some(q => q.id === currentQuestion?.id)
  );
  const isComplete = allQuestions.every(q => answers[q.id]);
  const progress = (Object.keys(answers).length / allQuestions.length) * 100;
  const hasAnsweredCurrent = answers[currentQuestion?.id];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Card className="border-2 border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-6 h-6 text-orange-600" />
                <span>WISCAR Framework Analysis</span>
              </CardTitle>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Question {currentQuestionIndex + 1} of {allQuestions.length}</span>
                  <span>{Math.round(progress)}% Complete</span>
                </div>
                <ProgressBar value={progress} className="h-2" />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-orange-700 mb-2">
                  {currentSection?.title}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {currentQuestion?.question}
                </h3>
                <RadioGroup
                  value={answers[currentQuestion?.id] || ''}
                  onValueChange={(value) => handleAnswerChange(currentQuestion?.id, value)}
                  className="space-y-3"
                >
                  {likertOptions.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem 
                        value={option.value} 
                        id={`${currentQuestion?.id}-option-${index}`} 
                      />
                      <Label 
                        htmlFor={`${currentQuestion?.id}-option-${index}`} 
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
                  Evaluating: {currentSection?.title}
                </div>
                <div className="flex space-x-2">
                  {/* {currentQuestionIndex > 0 && (
                    <Button 
                      onClick={handlePreviousQuestion}
                      variant="outline"
                      className="border-orange-200 text-orange-600 hover:bg-orange-50"
                    >
                      <ArrowLeft className="mr-2 w-4 h-4" />
                      Previous
                    </Button>
                  )} */}
                  <Button 
                    onClick={handleNextQuestion}
                    disabled={!hasAnsweredCurrent}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    {currentQuestionIndex === allQuestions.length - 1 ? 'Complete Assessment' : 'Next Question'}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WiscarAnalysis;