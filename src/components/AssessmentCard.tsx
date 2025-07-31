
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export interface AssessmentCardProps {
  id: string;
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  userCount: string;
  tags: string[];
  category?: string;
  comingSoon?: boolean;
  gradient?: string;
  rating?: number;
}

const AssessmentCard: React.FC<AssessmentCardProps> = ({
  id,
  title,
  description,
  icon: Icon,
  duration,
  difficulty,
  userCount,
  tags,
  category,
  comingSoon = false,
  gradient,
  rating = 4.5
}) => {
  return (
    <Card className={`group hover:shadow-2xl hover:scale-105 transition-all duration-300 border-0 relative overflow-hidden bg-white ${comingSoon ? 'opacity-75' : ''} flex flex-col h-full shadow-lg hover:border-thinkera-purple/20 hover:border cursor-pointer`}>
      {/* Hover overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-thinkera-purple/5 to-thinkera-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardContent className="p-6 relative flex flex-col h-full z-10">
        {/* Header with Title, Duration, and Participants */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-foreground mb-2 leading-tight group-hover:text-thinkera-purple transition-colors duration-300">
              {title}
            </h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1 group-hover:text-thinkera-purple transition-colors duration-300">
                <Clock className="h-4 w-4" />
                <span>{duration}</span>
              </div>
              <div className="flex items-center gap-1 group-hover:text-thinkera-blue transition-colors duration-300">
                <Users className="h-4 w-4" />
                <span>{userCount}</span>
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
            <Badge key={index} variant="outline" className="text-xs border-thinkera-purple/20 text-thinkera-purple hover:bg-thinkera-purple/5 group-hover:border-thinkera-purple group-hover:bg-thinkera-purple/10 transition-all duration-300">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Button */}
        <div className="mt-auto">
          {!comingSoon ? (
            <Link to={`/assessments/${id}`}>
              <Button className="w-full bg-gradient-to-r from-thinkera-purple to-thinkera-blue hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all border-0 group-hover:shadow-2xl group-hover:scale-105 duration-300">
                Start Assessment
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          ) : (
            <Button disabled className="w-full bg-muted text-muted-foreground">
              Coming Soon
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AssessmentCard;
