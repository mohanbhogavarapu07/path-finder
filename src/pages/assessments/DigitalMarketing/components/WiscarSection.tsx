import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Target, ArrowRight } from "lucide-react";

interface WiscarSectionProps {
  onComplete: (answers: Record<string, string>) => void;
}

const questions = [
  {
    id: "work_style",
    category: "Work Style",
    question: "Which work environment energizes you most?",
    options: [
      { value: "fast_paced", label: "Fast-paced, dynamic environments with constant change" },
      { value: "collaborative", label: "Collaborative spaces with lots of team interaction" },
      { value: "structured", label: "Structured environments with clear processes" },
      { value: "independent", label: "Independent work with minimal supervision" }
    ]
  },
  {
    id: "interests",
    category: "Interests",
    question: "What type of content and activities naturally interest you?",
    options: [
      { value: "creative", label: "Creating visual content, writing, and storytelling" },
      { value: "analytical", label: "Analyzing trends, data, and performance metrics" },
      { value: "strategic", label: "Planning campaigns and long-term strategy" },
      { value: "technical", label: "Understanding how platforms and tools work" }
    ]
  },
  {
    id: "strengths",
    category: "Strengths",
    question: "Which of these best describes your natural strengths?",
    options: [
      { value: "communication", label: "Communication and building relationships" },
      { value: "creativity", label: "Creative thinking and content creation" },
      { value: "analysis", label: "Data analysis and problem-solving" },
      { value: "organization", label: "Organization and project management" }
    ]
  },
  {
    id: "challenges",
    category: "Challenges",
    question: "Which challenge would you find most manageable to overcome?",
    options: [
      { value: "tech_learning", label: "Learning new technologies and platforms" },
      { value: "creative_block", label: "Overcoming creative blocks and generating ideas" },
      { value: "data_interpretation", label: "Interpreting complex data and metrics" },
      { value: "time_management", label: "Managing multiple campaigns and deadlines" }
    ]
  },
  {
    id: "aspirations",
    category: "Aspirations",
    question: "What type of career growth excites you most?",
    options: [
      { value: "specialist", label: "Becoming a deep specialist in one area (SEO, PPC, etc.)" },
      { value: "generalist", label: "Being a well-rounded marketing generalist" },
      { value: "leadership", label: "Moving into marketing leadership and strategy" },
      { value: "entrepreneurial", label: "Using skills for freelancing or starting a business" }
    ]
  },
  {
    id: "rewards",
    category: "Rewards",
    question: "What type of results would give you the most satisfaction?",
    options: [
      { value: "creative_recognition", label: "Recognition for creative campaigns and content" },
      { value: "performance_metrics", label: "Hitting performance targets and KPIs" },
      { value: "business_growth", label: "Contributing to overall business growth" },
      { value: "audience_engagement", label: "Building engaged communities and audiences" }
    ]
  }
];

const WiscarSection = ({ onComplete }: WiscarSectionProps) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isAnswered = answers[questions[currentQuestion].id];

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(answers);
    }
  };

  const handleAnswerChange = (value: string) => {
    setAnswers({
      ...answers,
      [questions[currentQuestion].id]: value
    });
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
              {questions[currentQuestion].category}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {questions[currentQuestion].question}
            </h3>
            
            <RadioGroup
              value={answers[questions[currentQuestion].id] || ''}
              onValueChange={handleAnswerChange}
              className="space-y-3"
            >
              {questions[currentQuestion].options.map((option, index) => (
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
              Evaluating: {questions[currentQuestion].category}
            </div>
            <Button 
              onClick={handleNext}
              disabled={!isAnswered}
              className="bg-orange-600 hover:bg-orange-700"
            >
              {currentQuestion === questions.length - 1 ? 'Complete Assessment' : 'Next Question'}
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