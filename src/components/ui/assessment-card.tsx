import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface AssessmentCardProps {
  id?: string;
  title: string;
  description: string;
  duration: string;
  participants: string;
  rating: number;
  icon: React.ReactNode;
  category: string;
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
        "group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg bg-white relative overflow-hidden h-full flex flex-col",
        className
      )}
      onClick={onClick}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-thinkera-purple/5 to-thinkera-blue/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <CardContent className="p-6 relative flex flex-col h-full">
        {/* Header with Icon and Rating */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-thinkera-purple/10 text-thinkera-purple group-hover:bg-thinkera-purple group-hover:text-white transition-colors">
              {icon}
            </div>
            <div className="flex flex-col">
              <Badge variant="secondary" className="mb-1 text-xs bg-thinkera-blue/10 text-thinkera-blue border-thinkera-blue/20">
                {category}
              </Badge>
              {difficulty && (
                <Badge variant="outline" className="text-xs border-thinkera-purple/20 text-thinkera-purple">
                  {difficulty}
                </Badge>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{rating}</span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3 flex-grow">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-thinkera-purple transition-colors leading-tight">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {description}
          </p>
          
          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-2">
              {tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs border-thinkera-purple/20 text-thinkera-purple hover:bg-thinkera-purple/5">
                  {tag}
                </Badge>
              ))}
              {tags.length > 3 && (
                <Badge variant="outline" className="text-xs border-thinkera-purple/20 text-thinkera-purple hover:bg-thinkera-purple/5">
                  +{tags.length - 3} more
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Stats and Button */}
        <div className="mt-6 pt-4 border-t border-border/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <div className="p-1 bg-thinkera-purple/10 rounded-full">
                  <Clock className="h-3 w-3 text-thinkera-purple" />
                </div>
                <span className="font-medium">{duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="p-1 bg-thinkera-blue/10 rounded-full">
                  <Users className="h-3 w-3 text-thinkera-blue" />
                </div>
                <span className="font-medium">{participants}</span>
              </div>
            </div>
          </div>
          
          {id ? (
            <Link to={`/assessments/${id}`}>
              <Button 
                size="sm" 
                className="w-full bg-gradient-to-r from-thinkera-purple to-thinkera-blue hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all border-0"
              >
                Start Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <Button 
              size="sm" 
              className="w-full bg-gradient-to-r from-thinkera-purple to-thinkera-blue hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all border-0"
            >
              Start Assessment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}