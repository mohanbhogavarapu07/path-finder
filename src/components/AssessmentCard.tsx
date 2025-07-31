
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

export interface AssessmentCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  userCount: string;
  tags: string[];
  category: string;
  comingSoon?: boolean;
  gradient: string;
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
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-thinkera-blue/10 text-thinkera-blue border-thinkera-blue/20';
      case 'Intermediate': return 'bg-thinkera-purple/10 text-thinkera-purple border-thinkera-purple/20';
      case 'Advanced': return 'bg-thinkera-dark/10 text-thinkera-dark border-thinkera-dark/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getGradientClasses = (gradient: string) => {
    const gradientMap: { [key: string]: string } = {
      'bg-gradient-to-br from-blue-600 to-green-600': 'from-thinkera-blue to-thinkera-purple',
      'bg-gradient-to-br from-purple-600 to-pink-600': 'from-thinkera-purple to-thinkera-blue',
      'bg-gradient-to-br from-green-600 to-blue-600': 'from-thinkera-blue to-thinkera-purple',
      'bg-gradient-to-br from-orange-600 to-red-600': 'from-thinkera-purple to-thinkera-dark',
      'bg-gradient-to-br from-teal-600 to-blue-600': 'from-thinkera-blue to-thinkera-purple',
      'bg-gradient-to-br from-indigo-600 to-purple-600': 'from-thinkera-purple to-thinkera-blue'
    };
    return gradientMap[gradient] || 'from-thinkera-purple to-thinkera-blue';
  };

  return (
    <Card className={`group hover:shadow-xl transition-all duration-300 border-0 relative overflow-hidden bg-white ${comingSoon ? 'opacity-75' : ''} flex flex-col h-full shadow-lg`}>
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-thinkera-purple/5 to-thinkera-blue/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <CardContent className="p-6 relative flex flex-col h-full">
        {/* Header with Icon and Rating */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-thinkera-purple/10 text-thinkera-purple group-hover:bg-thinkera-purple group-hover:text-white transition-colors">
              <Icon className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <Badge variant="secondary" className="mb-1 text-xs bg-thinkera-blue/10 text-thinkera-blue border-thinkera-blue/20">
                {category}
              </Badge>
              {comingSoon && (
                <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground">
                  Coming Soon
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
          <div className="flex items-center gap-2 flex-wrap pt-2">
            <Badge className={getDifficultyColor(difficulty) + ' text-black'} variant="outline">
              {difficulty}
            </Badge>
            <span className="text-thinkera-purple/60">|</span>
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
                <span className="font-medium">{userCount}</span>
              </div>
            </div>
          </div>
          
          {!comingSoon ? (
            <Link to={`/assessments/${id}`}>
              <Button className={`w-full bg-gradient-to-r ${getGradientClasses(gradient)} hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all border-0`}>
                Start Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
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
