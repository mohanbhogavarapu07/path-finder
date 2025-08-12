import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

interface AssessmentProgressProps {
  currentStep: number;
  totalSteps: number;
  currentSectionProgress: number;
  sectionName: string;
}

const AssessmentProgress = ({ 
  currentStep, 
  totalSteps, 
  currentSectionProgress, 
  sectionName 
}: AssessmentProgressProps) => {
  const overallProgress = ((currentStep - 1) / totalSteps) * 100 + (currentSectionProgress / totalSteps);
  
  const steps = [
    { id: 1, name: "Psychometric", shortName: "Psych" },
    { id: 2, name: "Technical", shortName: "Tech" },
    { id: 3, name: "WISCAR", shortName: "WISCAR" },
    { id: 4, name: "Results", shortName: "Results" }
  ];

  return (
    <div className="bg-white shadow-sm border-b p-4 md:p-6 mb-8">
      <div className="container mx-auto max-w-4xl">
        {/* Overall Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-medium text-gray-700">Assessment Progress</h2>
            <span className="text-sm font-medium text-gray-700">
              {Math.round(overallProgress)}% Complete
            </span>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>
        {/* Step Indicators */}
        <div className="flex mt-4 space-x-4 overflow-x-auto mb-4">
          {steps.map((step) => {
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;
            return (
              <div key={step.id} className={`flex items-center space-x-2 px-3 py-2 rounded-lg min-w-fit ${
                isActive
                  ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                  : isCompleted
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-500'
              }`}>
                {isCompleted ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  step.id
                )}
                <span className="text-sm font-medium">{step.name}</span>
              </div>
            );
          })}
        </div>
        {/* Current Section */}
        <div className="flex items-center justify-center gap-2">
          <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
            Current: {sectionName}
          </Badge>
          <span className="text-sm text-gray-700">
            Section Progress: {currentSectionProgress}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default AssessmentProgress;