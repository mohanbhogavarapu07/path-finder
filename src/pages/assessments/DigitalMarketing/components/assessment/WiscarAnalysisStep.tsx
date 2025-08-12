
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { BarChart3, ArrowRight } from "lucide-react";

interface WiscarAnalysisStepProps {
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

const WiscarAnalysisStep = ({ onComplete }: WiscarAnalysisStepProps) => {
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
    <Card className="max-w-3xl mx-auto">
      <CardContent className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-8 h-8 text-primary" />
          <div>
            <h2 className="text-2xl font-bold">WISCAR Framework Analysis</h2>
            <p className="text-muted-foreground">
              {questions[currentQuestion].category} • Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>
        </div>

        <Progress value={progress} className="mb-8" />

        <div className="mb-8">
          <div className="text-sm font-medium text-primary mb-2">
            {questions[currentQuestion].category}
          </div>
          <h3 className="text-xl font-semibold mb-6">
            {questions[currentQuestion].question}
          </h3>

          <RadioGroup
            value={answers[questions[currentQuestion].id] || ""}
            onValueChange={handleAnswerChange}
          >
            {questions[currentQuestion].options.map((option) => (
              <div key={option.value} className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-accent transition-colors">
                <RadioGroupItem value={option.value} id={option.value} className="mt-0.5" />
                <Label 
                  htmlFor={option.value} 
                  className="cursor-pointer text-sm leading-relaxed flex-1"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!isAnswered}
            className="min-w-[120px]"
          >
            {currentQuestion === questions.length - 1 ? "Complete" : "Next"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WiscarAnalysisStep;
