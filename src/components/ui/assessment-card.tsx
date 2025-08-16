import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, ArrowRight, Star, Bookmark, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { DynamicAssessment } from "@/lib/api";

interface AssessmentCardProps extends Partial<DynamicAssessment> {
  id?: string;
  title: string;
  description: string;
  duration: string;
  participants?: string;
  rating?: number;
  reviewCount?: number;
  icon?: React.ReactNode;
  category?: string;
  className?: string;
  onClick?: () => void;
  tags?: string[];
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  isActive?: boolean;
  metadata?: {
    icon: string;
    gradient: string;
    userCount: string;
    tags: string[];
  };
}

export function AssessmentCard({
  id,
  title,
  description,
  duration,
  participants,
  rating = 4.6,
  reviewCount = 1234,
  icon,
  category = "Technology",
  className,
  onClick,
  tags = [],
  difficulty = "Beginner",
  isActive = true,
  metadata,
  ...assessment
}: AssessmentCardProps) {
  // Use metadata if available, otherwise fall back to props
  const userCount = metadata?.userCount || participants || "1K+";
  const assessmentTags = metadata?.tags || tags;

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Beginner': return 'bg-factorbeam-green text-white';
      case 'Intermediate': return 'bg-factorbeam-yellow text-factorbeam-heading';
      case 'Advanced': return 'bg-factorbeam-primary text-white';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card 
      className={cn(
        "group hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 shadow-sm bg-white relative overflow-hidden h-full flex flex-col",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-6 relative flex flex-col h-full z-10">
        {/* Header with Category Badge and Action Icons */}
        <div className="flex items-start justify-between mb-4">
          <Badge className="bg-factorbeam-primary text-white text-xs px-3 py-1">
            {category}
          </Badge>
          <div className="flex items-center gap-2">
            <button className="p-1 hover:bg-gray-100 rounded transition-colors">
              <Bookmark className="h-4 w-4 text-gray-600" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded transition-colors">
              <Share2 className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-factorbeam-heading mb-3 leading-tight group-hover:text-factorbeam-primary transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-factorbeam-text mb-4 leading-relaxed flex-1">
          {description.length > 80 ? `${description.substring(0, 80)}...` : description}
        </p>
        
        {/* Metadata */}
        <div className="flex items-center gap-4 text-sm text-factorbeam-text-alt mb-4">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{userCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-factorbeam-yellow fill-current" />
            <span>{rating} ({reviewCount})</span>
          </div>
        </div>
        
        {/* Tags/Badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Badge className={`text-xs px-2 py-1 ${getDifficultyColor(difficulty)}`}>
            {difficulty}
          </Badge>
          {assessmentTags.slice(0, 2).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs border-gray-200 text-factorbeam-text-alt">
              {tag}
            </Badge>
          ))}
          {assessmentTags.length > 2 && (
            <span className="text-xs text-factorbeam-text-alt">+{assessmentTags.length - 2} more</span>
          )}
        </div>

        {/* Button */}
        <div className="mt-auto">
          {id && isActive ? (
            <Link to={`/assessments/${id}`}>
              <Button 
                className="w-full bg-factorbeam-primary hover:bg-factorbeam-primary-alt text-white shadow-sm hover:shadow-md transition-all border-0 font-semibold"
              >
                Start Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <Button 
              className="w-full bg-gray-400 text-white shadow-sm transition-all border-0 font-semibold cursor-not-allowed"
              disabled
            >
              {!isActive ? 'Inactive' : 'Coming Soon'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}