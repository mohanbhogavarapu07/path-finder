import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Step {
  id: string;
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: string;
  completedSteps: string[];
  className?: string;
}

export const StepIndicator = ({ 
  steps, 
  currentStep, 
  completedSteps, 
  className 
}: StepIndicatorProps) => {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {steps.map((step, index) => {
        const isCompleted = completedSteps.includes(step.id);
        const isCurrent = currentStep === step.id;
        const IconComponent = step.icon;
        return (
          <div
            key={step.id}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg min-w-fit text-sm font-medium transition-colors border-2",
              {
                "bg-blue-100 text-blue-700 border-blue-300": isCurrent,
                "bg-green-100 text-green-700 border-green-300": isCompleted,
                "bg-gray-100 text-gray-500 border-gray-200": !isCurrent && !isCompleted,
              }
            )}
          >
            {isCompleted ? (
              <Check className="h-4 w-4" />
            ) : IconComponent ? (
              <IconComponent className="h-4 w-4" />
            ) : null}
            <span>{step.title}</span>
          </div>
        );
      })}
    </div>
  );
};