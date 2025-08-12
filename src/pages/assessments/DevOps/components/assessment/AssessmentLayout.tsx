import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AssessmentLayoutProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
  steps: { id: string; title: string; icon: ReactNode; }[];
  className?: string;
}

export function AssessmentLayout({ 
  children, 
  currentStep, 
  totalSteps, 
  steps, 
  className 
}: AssessmentLayoutProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className={cn("min-h-screen bg-background", className)}>
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Should I Learn DevOps?
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Comprehensive Career Assessment & Guidance
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-sm">
                {Math.round(progress)}% Complete
              </Badge>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </header>

      {/* Navigation Steps */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex gap-2 overflow-x-auto">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap",
                  index + 1 === currentStep
                    ? "bg-primary text-primary-foreground"
                    : index + 1 < currentStep
                    ? "bg-success/10 text-success"
                    : "bg-muted text-muted-foreground"
                )}
              >
                <div className="flex-shrink-0">{step.icon}</div>
                <span className="text-sm font-medium">{step.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto max-w-6xl px-6 py-8">
        {children}
      </main>
    </div>
  );
}