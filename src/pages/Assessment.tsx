
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, ArrowRight, Brain, CheckCircle, Clock, Users } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Assessment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  // Sample assessment data - would come from API/database in real app
  const assessmentData = {
    "skills-software": {
      title: "Python Programming Fit Assessment",
      description: "Discover if Python programming aligns with your learning style and career goals",
      duration: "8-10 minutes",
      totalQuestions: 12,
      questions: [
        {
          id: 1,
          type: "multiple-choice",
          question: "How do you prefer to learn new concepts?",
          options: [
            "By reading documentation and tutorials",
            "Through hands-on practice and experimentation",
            "By watching video explanations",
            "In structured classroom settings"
          ]
        },
        {
          id: 2,
          type: "slider",
          question: "How comfortable are you with problem-solving and logical thinking?",
          min: 1,
          max: 10,
          labels: ["Not comfortable", "Very comfortable"]
        },
        {
          id: 3,
          type: "multiple-choice",
          question: "What motivates you most about programming?",
          options: [
            "Building applications that solve real problems",
            "The logical challenge of coding",
            "Career opportunities and salary potential",
            "Being part of the tech community"
          ]
        },
        {
          id: 4,
          type: "multiple-choice",
          question: "How do you handle getting stuck on a problem?",
          options: [
            "I research online and try different approaches",
            "I ask for help from others",
            "I take a break and come back later",
            "I get frustrated and might give up"
          ]
        },
        {
          id: 5,
          type: "slider",
          question: "How interested are you in data analysis and automation?",
          min: 1,
          max: 10,
          labels: ["Not interested", "Very interested"]
        },
        {
          id: 6,
          type: "multiple-choice",
          question: "Which work environment appeals to you most?",
          options: [
            "Fast-paced startup with lots of variety",
            "Established company with structured processes",
            "Remote work with flexible hours",
            "Collaborative team environment"
          ]
        }
      ]
    }
  };

  const currentAssessment = assessmentData[id as keyof typeof assessmentData];
  const currentQuestionData = currentAssessment?.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / (currentAssessment?.totalQuestions || 1)) * 100;

  if (!currentAssessment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Assessment not found</h1>
          <Link to="/assessments">
            <Button className="mt-4">Back to Assessments</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAnswer = (answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestion < currentAssessment.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setIsCompleted(true);
      // Navigate to results page
      navigate(`/results/${id}`, { state: { answers } });
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const canProceed = answers[currentQuestion] !== undefined;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-white to-green-100">
      <Header logoType="brain" navLinks={[
        { to: "/", label: "Home" },
        { to: "/assessments", label: "Assessments" },
        { to: "/about", label: "About" },
        { to: "/blog", label: "Blog" },
      ]} rightContent={<></>} />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Assessment Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {currentAssessment.title}
          </h1>
          <p className="text-muted-foreground mb-6">
            {currentAssessment.description}
          </p>
          
          {/* Progress Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-3 bg-muted" />
          </div>
        </div>

        {/* Question Card */}
        <Card className="max-w-3xl mx-auto shadow-lg border-thinkera-blue/20">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-foreground leading-relaxed">
              {currentQuestionData?.question}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {currentQuestionData?.type === "multiple-choice" && (
              <RadioGroup
                value={answers[currentQuestion]}
                onValueChange={handleAnswer}
                className="space-y-4"
              >
                {currentQuestionData.options.map((option: string, idx: number) => (
                                <div key={idx} className="flex items-center space-x-3 p-4 rounded-lg hover:bg-thinkera-blue/5 transition-colors border border-border hover:border-thinkera-blue/30">
                <RadioGroupItem value={option} id={`option-${idx}`} />
                <Label htmlFor={`option-${idx}`} className="flex-1 cursor-pointer text-foreground font-medium">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {currentQuestionData?.type === "slider" && (
              <div className="space-y-6">
                <div className="px-4">
                  <Slider
                    value={[answers[currentQuestion] || 5]}
                    onValueChange={(value) => handleAnswer(value[0])}
                    max={currentQuestionData.max}
                    min={currentQuestionData.min}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>{currentQuestionData.labels[0]}</span>
                    <span className="font-semibold text-thinkera-blue">
                      {answers[currentQuestion] || 5}
                    </span>
                    <span>{currentQuestionData.labels[1]}</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 max-w-3xl mx-auto">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>

          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              There are no right or wrong answers — just insights.
            </p>
          </div>

          <Button 
            onClick={handleNext}
            disabled={!canProceed}
                            className="bg-thinkera-blue hover:bg-thinkera-blue/90 flex items-center space-x-2"
          >
            <span>{currentQuestion === currentAssessment.questions.length - 1 ? "Complete" : "Next"}</span>
            {currentQuestion === currentAssessment.questions.length - 1 ? 
              <CheckCircle className="h-4 w-4" /> : 
              <ArrowRight className="h-4 w-4" />
            }
          </Button>
        </div>

        {/* Encouragement Message */}
        <div className="text-center mt-8 max-w-2xl mx-auto">
          <Card className="bg-gradient-to-r from-thinkera-blue/20 to-thinkera-purple/20 border-thinkera-blue/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-center space-x-2 mb-3">
                <Users className="h-5 w-5 text-thinkera-blue" />
                <span className="font-semibold text-foreground">You're doing great!</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Over 10,000 students have found clarity through our assessments. 
                Your personalized insights are just a few questions away.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Assessment;
