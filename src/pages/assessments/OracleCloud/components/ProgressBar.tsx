import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
}

export const ProgressBar = ({ value, max = 100, label }: ProgressBarProps) => {
  const percentage = (value / max) * 100;
  
  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground">{label || "Progress"}</span>
        <span className="text-sm text-muted-foreground">{Math.round(percentage)}% Complete</span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
};