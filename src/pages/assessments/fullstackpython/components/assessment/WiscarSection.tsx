import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Target, Star, Brain, Lightbulb, Users, Compass } from "lucide-react";

interface WiscarSectionProps {
  onNext: (data: Record<string, any>) => void;
  canGoBack: boolean;
}

interface Question {
  id: string;
  text: string;
  type: string;
  options?: string[];
}

const wiscarDimensions = [
  {
    code: "W",
    title: "Will",
    subtitle: "Consistency of interest & perseverance",
    icon: Target,
    questions: [
      { id: "will_1", text: "I keep learning programming even when concepts become difficult to understand.", type: "likert" },
      { id: "will_2", text: "When I start a coding project, I usually finish it even if it takes longer than expected.", type: "likert" }
    ] as Question[]
  },
  {
    code: "I",
    title: "Interest",
    subtitle: "Curiosity about Python-based roles",
    icon: Star,
    questions: [
      { id: "interest_1", text: "I enjoy building websites or applications from scratch.", type: "likert" },
      { id: "interest_2", text: "I find myself reading about web development trends in my free time.", type: "likert" }
    ] as Question[]
  },
  {
    code: "S",
    title: "Skill",
    subtitle: "Current capability assessment",
    icon: Brain,
    questions: [
      { id: "skill_1", text: "Rate your confidence with Python basics (variables, loops, functions):", type: "confidence", options: ["No experience", "Beginner", "Some experience", "Comfortable", "Advanced"] },
      { id: "skill_2", text: "Rate your experience with web technologies (HTML, CSS, JavaScript):", type: "confidence", options: ["No experience", "Beginner", "Some experience", "Comfortable", "Advanced"] }
    ] as Question[]
  },
  {
    code: "C",
    title: "Cognitive Readiness",
    subtitle: "Analytical thinking & pattern recognition",
    icon: Lightbulb,
    questions: [
      { id: "cognitive_1", text: "I can easily break down complex problems into smaller, manageable steps.", type: "likert" },
      { id: "cognitive_2", text: "I enjoy figuring out why something isn't working and finding the solution.", type: "likert" }
    ] as Question[]
  },
  {
    code: "A",
    title: "Ability to Learn",
    subtitle: "Self-reflection & metacognition",
    icon: Users,
    questions: [
      { id: "ability_1", text: "When I don't understand something, I actively try new ways to learn it.", type: "likert" },
      { id: "ability_2", text: "I can identify my own learning strengths and weaknesses.", type: "likert" }
    ] as Question[]
  },
  {
    code: "R",
    title: "Real-World Alignment",
    subtitle: "Understanding of Python career paths",
    icon: Compass,
    questions: [
      { id: "real_world_1", text: "How interested are you in building full-stack web applications for businesses?", type: "scenario", options: ["Not interested", "Slightly interested", "Moderately interested", "Very interested", "Extremely interested"] },
      { id: "real_world_2", text: "How appealing is working on both frontend user interfaces and backend server logic?", type: "scenario", options: ["Not appealing", "Slightly appealing", "Moderately appealing", "Very appealing", "Extremely appealing"] }
    ] as Question[]
  }
];

const likertOptions = [
  { value: '1', label: "Strongly Disagree" },
  { value: '2', label: "Disagree" },
  { value: '3', label: "Neutral" },
  { value: '4', label: "Agree" },
  { value: '5', label: "Strongly Agree" }
];

export const WiscarSection = ({ onNext }: WiscarSectionProps) => {
  const allQuestions = wiscarDimensions.flatMap(dim => dim.questions.map(q => ({ ...q, category: dim.title })));
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentQuestion = allQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / allQuestions.length) * 100;

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      const scores: Record<string, any> = {};
      const overallScore = 0; // Simplified
      onNext({ scores, overallScore, answers });
    }
  };

  const getOptions = () => {
    if (currentQuestion.type === "likert") {
      return likertOptions;
    } else if (currentQuestion.options) {
      return currentQuestion.options.map((option, index) => ({ value: (index + 1).toString(), label: option }));
    }
    return [];
  };

  const canProceed = answers[currentQuestion.id] !== undefined;
  const isLastQuestion = currentQuestionIndex === allQuestions.length - 1;
  
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
              <span>Question {currentQuestionIndex + 1} of {allQuestions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-orange-700 mb-2">
              {currentQuestion.category}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {currentQuestion.text}
            </h3>
            
            <RadioGroup
              value={answers[currentQuestion.id] || ''}
              onValueChange={handleAnswerChange}
              className="space-y-3"
            >
              {getOptions().map((option, index) => (
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
              Evaluating: {currentQuestion.category}
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
