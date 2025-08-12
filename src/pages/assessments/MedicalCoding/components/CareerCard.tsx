import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CareerCardProps {
  title: string;
  description: string;
  className?: string;
}

export const CareerCard = ({ title, description, className }: CareerCardProps) => {
  return (
    <Card className={cn("h-full transition-all duration-200 hover:shadow-md hover:border-primary/50", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};