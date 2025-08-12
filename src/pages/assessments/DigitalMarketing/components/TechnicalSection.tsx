import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Code, ArrowRight } from "lucide-react";

interface TechnicalSectionProps {
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

const TechnicalSection = ({ onComplete }: TechnicalSectionProps) => {
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
              Technical Skills
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
              Category: Technical Skills
            </div>
            <Button 
              onClick={handleNext}
              disabled={!isAnswered}
              className="bg-green-600 hover:bg-green-700"
            >
              {currentQuestion === questions.length - 1 ? 'Complete Section' : 'Next Question'}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TechnicalSection; 