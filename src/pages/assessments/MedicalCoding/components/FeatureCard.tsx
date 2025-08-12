import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
  variant?: "default" | "primary" | "secondary" | "accent";
  className?: string;
}

export const FeatureCard = ({ 
  title, 
  description, 
  icon: Icon,
  variant = "default",
  className 
}: FeatureCardProps) => {
  const variants = {
    default: "border-border",
    primary: "border-medical-primary bg-medical-primary/5",
    secondary: "border-medical-secondary bg-medical-secondary/5", 
    accent: "border-medical-accent bg-medical-accent/5"
  };

  const iconColors = {
    default: "text-foreground",
    primary: "text-medical-primary",
    secondary: "text-medical-secondary",
    accent: "text-medical-accent"
  };

  return (
    <Card className={cn("border-2 transition-all duration-200 hover:shadow-md", variants[variant], className)}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {Icon && (
            <div className="flex-shrink-0">
              <Icon className={cn("h-6 w-6", iconColors[variant])} />
            </div>
          )}
          <div>
            <h3 className="font-semibold text-card-foreground mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};