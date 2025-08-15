import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface AssessmentCardProps {
  id?: string;
  title: string;
  description: string;
  duration: string;
  participants: string;
  rating?: number;
  icon?: React.ReactNode;
  category?: string;
  className?: string;
  onClick?: () => void;
  tags?: string[];
  difficulty?: string;
}

export function AssessmentCard({
  id,
  title,
  description,
  duration,
  participants,
  rating,
  icon,
  category,
  className,
  onClick,
  tags = [],
  difficulty
}: AssessmentCardProps) {
  return (
    <Card 
      className={cn(
        "group hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer border-0 shadow-lg bg-white relative overflow-hidden h-full flex flex-col hover:border-primary/20 hover:border",
        className
      )}
      onClick={onClick}
    >
      {/* Hover overlay effect */}
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardContent className="p-6 relative flex flex-col h-full z-10">
        {/* Header with Title, Duration, and Participants */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-foreground mb-2 leading-tight group-hover:text-primary transition-colors duration-300">
              {title}
            </h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1 group-hover:text-primary transition-colors duration-300">
                <Clock className="h-4 w-4" />
                <span>{duration}</span>
              </div>
              <div className="flex items-center gap-1 group-hover:text-secondary transition-colors duration-300">
                <Users className="h-4 w-4" />
                <span>{participants}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed group-hover:text-foreground transition-colors duration-300">
          {description}
        </p>
        
        {/* Tags/Badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs border-primary/20 text-primary hover:bg-primary/5 group-hover:border-primary group-hover:bg-primary/10 transition-all duration-300">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Button */}
        <div className="mt-auto">
          {id ? (
                            <Link to={`/assessments/${id}`}>
                  <Button 
                    variant="accent"
                    className="w-full shadow-lg hover:shadow-xl transition-all border-0 group-hover:shadow-2xl group-hover:scale-105 duration-300 font-semibold"
                  >
                    Start Assessment
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
          ) : (
            <Button 
              variant="default"
              className="w-full shadow-lg hover:shadow-xl transition-all border-0 group-hover:shadow-2xl group-hover:scale-105 duration-300 font-semibold"
            >
              Start Assessment
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}