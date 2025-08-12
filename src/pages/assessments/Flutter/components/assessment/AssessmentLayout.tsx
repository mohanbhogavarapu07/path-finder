import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "./ProgressBar";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface AssessmentLayoutProps {
  title: string;
  subtitle?: string;
  progress: number;
  children: ReactNode;
  onNext?: () => void;
  onPrevious?: () => void;
  nextLabel?: string;
  previousLabel?: string;
  canGoNext?: boolean;
  canGoPrevious?: boolean;
}

export function AssessmentLayout({
  title,
  subtitle,
  progress,
  children,
  onNext,
  onPrevious,
  nextLabel = "Next",
  previousLabel = "Previous",
  canGoNext = true,
  canGoPrevious = true,
}: AssessmentLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-card-foreground mb-2">
                {title}
              </h1>
              {subtitle && (
                <p className="text-muted-foreground">{subtitle}</p>
              )}
            </div>
            <ProgressBar progress={progress} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-fade-in">
            {children}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-4xl mx-auto flex justify-between">
            <Button
              variant="outline"
              onClick={onPrevious}
              disabled={!canGoPrevious}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {previousLabel}
            </Button>
            
            <Button
              variant="primary"
              onClick={onNext}
              disabled={!canGoNext}
              className="flex items-center gap-2"
            >
              {nextLabel}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}