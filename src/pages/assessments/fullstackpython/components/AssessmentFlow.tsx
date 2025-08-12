
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PsychometricSection } from "./assessment/PsychometricSection";
import { TechnicalSection } from "./assessment/TechnicalSection";
import { WiscarSection } from "./assessment/WiscarSection";
import { ResultsSection } from "./assessment/ResultsSection";
import { IntroSection } from "./assessment/IntroSection";

interface AssessmentFlowProps {
  onBack: () => void;
}

export interface AssessmentData {
  psychometric: Record<string, number>;
  technical: Record<string, any>;
  wiscar: Record<string, any>;
}

export const AssessmentFlow = ({ onBack }: AssessmentFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    psychometric: {},
    technical: {},
    wiscar: {}
  });

  const steps = [
    { title: "Introduction", component: IntroSection },
    { title: "Psychometric Assessment", component: PsychometricSection },
    { title: "Technical Aptitude", component: TechnicalSection },
    { title: "WISCAR Framework", component: WiscarSection },
    { title: "Results & Recommendations", component: ResultsSection }
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = (data?: any) => {
    if (data) {
      const stepKey = ['intro', 'psychometric', 'technical', 'wiscar', 'results'][currentStep];
      if (stepKey === 'psychometric') {
        setAssessmentData(prev => ({ ...prev, psychometric: data }));
      } else if (stepKey === 'technical') {
        setAssessmentData(prev => ({ ...prev, technical: data }));
      } else if (stepKey === 'wiscar') {
        setAssessmentData(prev => ({ ...prev, wiscar: data }));
      }
    }
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const CurrentComponent = steps[currentStep].component;

  const getComponentProps = () => {
    const baseProps = {
      onNext: handleNext,
      assessmentData,
      canGoBack: currentStep > 0
    };

    // Only add onPrevious for components that need it
    if (currentStep > 0 && currentStep < steps.length - 1) {
      return { ...baseProps, onPrevious: handlePrevious };
    }

    return baseProps;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={currentStep === 0 ? onBack : handlePrevious}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {currentStep === 0 ? 'Back to Home' : 'Previous'}
            </Button>
            
            <div className="flex-1 mx-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Step {currentStep + 1} of {steps.length}
                </span>
                <span className="text-sm font-medium text-gray-600">
                  {Math.round(progress)}% Complete
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="w-24 text-right">
              <p className="text-sm text-gray-600">{steps[currentStep].title}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              {steps[currentStep].title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CurrentComponent {...getComponentProps()} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
