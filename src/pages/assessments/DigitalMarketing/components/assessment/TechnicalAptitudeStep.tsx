
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Code, ArrowRight } from "lucide-react";

interface TechnicalAptitudeStepProps {
  onComplete: (answers: Record<string, string>) => void;
}

const questions = [
  {
    id: "tech_comfort",
    question: "How comfortable are you with learning new software and digital tools?",
    options: [
      { value: "very_comfortable", label: "I'm very tech-savvy and learn new tools quickly" },
      { value: "comfortable", label: "I'm comfortable with technology and can figure things out" },
      { value: "moderate", label: "I can learn with some guidance and practice" },
      { value: "challenging", label: "I find new technology challenging and prefer simple tools" }
    ]
  },
  {
    id: "html_css",
    question: "Do you have any experience with HTML, CSS, or basic web technologies?",
    options: [
      { value: "experienced", label: "Yes, I'm comfortable with web technologies" },
      { value: "basic", label: "I have some basic knowledge" },
      { value: "interested", label: "No experience but very interested to learn" },
      { value: "no_interest", label: "No experience and not particularly interested" }
    ]
  },
  {
    id: "analytics_tools",
    question: "How familiar are you with analytics and tracking tools?",
    options: [
      { value: "familiar", label: "I've used Google Analytics, Facebook Pixel, or similar tools" },
      { value: "heard", label: "I've heard of them but haven't used them" },
      { value: "willing", label: "No experience but willing to learn" },
      { value: "overwhelmed", label: "These tools seem overwhelming to me" }
    ]
  },
  {
    id: "automation",
    question: "How do you feel about marketing automation and email sequences?",
    options: [
      { value: "excited", label: "I'm excited about automating repetitive tasks" },
      { value: "interested", label: "It sounds useful and I'd like to learn" },
      { value: "neutral", label: "I'm neutral - it's just another tool" },
      { value: "prefer_manual", label: "I prefer doing things manually and personally" }
    ]
  },
  {
    id: "social_platforms",
    question: "How comfortable are you with managing multiple social media platforms?",
    options: [
      { value: "very_comfortable", label: "I'm active on multiple platforms and understand their differences" },
      { value: "comfortable", label: "I use a few platforms regularly" },
      { value: "basic", label: "I use social media personally but not for business" },
      { value: "minimal", label: "I have minimal social media experience" }
    ]
  },
  {
    id: "troubleshooting",
    question: "When technology doesn't work as expected, how do you typically respond?",
    options: [
      { value: "debug", label: "I enjoy troubleshooting and finding solutions" },
      { value: "research", label: "I research online and try different approaches" },
      { value: "ask_help", label: "I ask for help from more technical people" },
      { value: "frustrated", label: "I get frustrated and prefer to avoid the issue" }
    ]
  }
];

const TechnicalAptitudeStep = ({ onComplete }: TechnicalAptitudeStepProps) => {
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
          <Code className="w-8 h-8 text-primary" />
          <div>
            <h2 className="text-2xl font-bold">Technical Aptitude Assessment</h2>
            <p className="text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>
        </div>

        <Progress value={progress} className="mb-8" />

        <div className="mb-8">
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

export default TechnicalAptitudeStep;
