import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Zap, 
  Brain, 
  Code, 
  BarChart3, 
  TrendingUp,
  Users,
  Search,
  Mail,
  Target,
  PieChart,
  CheckCircle,
  Clock,
  Award,
  ArrowRight
} from "lucide-react";

import PsychometricSection from "../components/PsychometricSection";
import TechnicalSection from "../components/TechnicalSection";
import WiscarSection from "../components/WiscarSection";
import ResultsSection from "../components/ResultsSection";

interface StepperProps {
  currentStep: number;
  steps: string[];
  completedSteps: number[];
}

const Stepper = ({ currentStep, steps, completedSteps }: StepperProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${completedSteps.includes(index)
                  ? "bg-step-complete text-white"
                  : index === currentStep
                  ? "bg-step-active text-white"
                  : "bg-step-inactive text-muted-foreground"
                }
              `}
            >
              {completedSteps.includes(index) ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                index + 1
              )}
            </div>
            <span className={`
              text-xs mt-1 font-medium
              ${index === currentStep ? "text-foreground" : "text-muted-foreground"}
            `}>
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className={`
              w-16 h-0.5 mx-2 mt-[-16px]
              ${completedSteps.includes(index) || completedSteps.includes(index + 1)
                ? "bg-step-complete"
                : "bg-step-inactive"
              }
            `} />
          )}
        </div>
      ))}
    </div>
  );
};

const DigitalMarketingAssessment = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [psychologicalAnswers, setPsychologicalAnswers] = useState<Record<string, string>>({});
  const [technicalAnswers, setTechnicalAnswers] = useState<Record<string, string>>({});
  const [wiscarAnswers, setWiscarAnswers] = useState<Record<string, string>>({});

  const steps = ["Introduction", "Psychological Fit", "Technical Aptitude", "FB6 Index Analysis", "Your Results"];
  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  const handleStartAssessment = () => {
    setCurrentStep(1);
    setCompletedSteps([0]);
  };

  const handleStepComplete = (stepNumber: number, answers: Record<string, string>) => {
    // Save answers based on step
    switch (stepNumber) {
      case 1:
        setPsychologicalAnswers(answers);
        break;
      case 2:
        setTechnicalAnswers(answers);
        break;
      case 3:
        setWiscarAnswers(answers);
        break;
    }

    // Move to next step
    const nextStep = stepNumber + 1;
    setCompletedSteps([...completedSteps, stepNumber]);
    setCurrentStep(nextStep);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Should I Learn Digital Marketing?
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            Comprehensive Career Assessment & Guidance
          </p>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-2xl font-bold text-primary">
              {Math.round(progressPercentage)}% Complete
            </span>
            <Progress value={progressPercentage} className="w-48 h-2" />
          </div>
        </div>

        {/* Progress Stepper */}
        <Stepper 
          currentStep={currentStep} 
          steps={steps} 
          completedSteps={completedSteps} 
        />

        {/* Main Content */}
        {currentStep === 0 && (
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <Card className="bg-gradient-primary text-white mb-8 border-0">
              <CardContent className="p-8 text-center">
                <Target className="w-16 h-16 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-4">
                  Discover Your Digital Marketing Career Potential
                </h2>
                <p className="text-lg mb-6 opacity-90">
                  Take our comprehensive assessment to evaluate your psychological fit, 
                  technical readiness, and career alignment for a future in Digital Marketing.
                </p>
                <div className="flex items-center justify-center gap-8 mb-6">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>25-30 minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    <span>Personalized Results</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>Career Guidance</span>
                  </div>
                </div>
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={handleStartAssessment}
                  className="font-semibold"
                >
                  Start Assessment
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* What is Digital Marketing */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Zap className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-bold">What is Digital Marketing?</h3>
                </div>
                <p className="text-lg mb-6 text-muted-foreground">
                  Digital Marketing is the strategic use of <strong>digital platforms, tools, and channels</strong> like SEO, social media, email, paid ads, content, and analytics to promote brands, products, and services online.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Search className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="font-semibold text-primary mb-2">SEO & SEM</h4>
                    <p className="text-sm text-muted-foreground">
                      Optimize for search engines and manage paid search campaigns
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Users className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-green-700 mb-2">Social Media</h4>
                    <p className="text-sm text-muted-foreground">
                      Build communities and engage audiences across platforms
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Mail className="w-8 h-8 text-purple-600" />
                    </div>
                    <h4 className="font-semibold text-purple-700 mb-2">Email & Content</h4>
                    <p className="text-sm text-muted-foreground">
                      Create compelling content and automated campaigns
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Career Opportunities */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-bold">Career Opportunities</h3>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { 
                      title: "Digital Marketing Specialist", 
                      desc: "SEO, SEM, and campaign management",
                      icon: Target 
                    },
                    { 
                      title: "Social Media Manager", 
                      desc: "Community building and engagement",
                      icon: Users 
                    },
                    { 
                      title: "Performance Marketing Manager", 
                      desc: "Paid advertising and optimization",
                      icon: TrendingUp 
                    },
                    { 
                      title: "Content Strategist", 
                      desc: "Content planning and brand messaging",
                      icon: PieChart 
                    },
                    { 
                      title: "Marketing Analyst", 
                      desc: "Data analysis and insights",
                      icon: BarChart3 
                    },
                    { 
                      title: "Email Marketing Manager", 
                      desc: "Campaign automation and funnels",
                      icon: Mail 
                    }
                  ].map((role, index) => (
                    <Card key={index} className="border-2 hover:border-primary/30 transition-colors">
                      <CardContent className="p-6 text-center">
                        <role.icon className="w-10 h-10 text-primary mx-auto mb-3" />
                        <h4 className="font-semibold mb-2">{role.title}</h4>
                        <p className="text-sm text-muted-foreground">{role.desc}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Ideal Traits */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Brain className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-bold">Who Thrives in Digital Marketing?</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Creative + data-savvy minds",
                    "Agile thinkers who can test/iterate fast", 
                    "Curious and adaptive learners",
                    "Strategic communicators",
                    "Analytical decision-makers",
                    "Comfortable with ambiguity and multitasking"
                  ].map((trait, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-step-complete flex-shrink-0" />
                      <span>{trait}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Assessment Preview */}
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">What You'll Discover</h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-lg mb-4">Assessment Modules:</h4>
                    <div className="space-y-3">
                      {[
                        { number: "1", title: "Psychological Fit Evaluation", icon: Brain },
                        { number: "2", title: "Technical Aptitude Testing", icon: Code }, 
                        { number: "3", title: "WISCAR Framework Analysis", icon: BarChart3 }
                      ].map((module, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <Badge variant="outline" className="w-8 h-8 flex items-center justify-center p-0">
                            {module.number}
                          </Badge>
                          <module.icon className="w-5 h-5 text-primary" />
                          <span className="font-medium">{module.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-lg mb-4">Your Results Include:</h4>
                    <div className="space-y-2">
                      {[
                        "Personalized fit score (0-100)",
                        "Detailed trait analysis", 
                        "Technical readiness assessment",
                        "Career pathway recommendations",
                        "Next steps and learning resources"
                      ].map((result, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span>{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Assessment Steps */}
        {currentStep === 1 && (
          <PsychometricSection onComplete={(answers) => handleStepComplete(1, answers)} />
        )}

        {currentStep === 2 && (
          <TechnicalSection onComplete={(answers) => handleStepComplete(2, answers)} />
        )}

        {currentStep === 3 && (
          <WiscarSection onComplete={(answers) => handleStepComplete(3, answers)} />
        )}

        {currentStep === 4 && (
                    <ResultsSection
            assessmentData={{
              psychometric: psychologicalAnswers,
              technical: technicalAnswers,
              wiscar: wiscarAnswers,
              completed: true
            }}
          />
        )}
      </div>
    </div>
  );
};

export default DigitalMarketingAssessment;
