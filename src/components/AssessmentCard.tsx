
import React, { useState } from 'react';
import { ArrowRight, Clock, Bookmark, Share2 } from "lucide-react";
import { DynamicAssessment } from '@/lib/api';
import { Badge } from "@/components/ui/badge";
import AssessmentStartDialog from './AssessmentStartDialog';

export interface AssessmentCardProps extends Partial<DynamicAssessment> {
  id: string;
  title: string;
  description?: string;
  duration?: string;
  category?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  tags?: string[];
  comingSoon?: boolean;
  isActive?: boolean;
}

const AssessmentCard: React.FC<AssessmentCardProps> = ({
  id,
  title,
  description = "Discover if this assessment aligns with your learning style and career goals",
  duration = "15-20 mins",
  category = "Technology",
  difficulty = "Beginner",
  tags = ["#assessment", "#career"],
  comingSoon = false,
  isActive = true,
  ...assessment
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Beginner': return 'bg-factorbeam-green text-white';
      case 'Intermediate': return 'bg-factorbeam-yellow text-factorbeam-heading';
      case 'Advanced': return 'bg-factorbeam-primary text-white';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 p-6 h-full flex flex-col">
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
      <h3 className="text-xl font-bold text-factorbeam-heading mb-3 leading-tight">
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
        <Badge className={`text-xs px-2 py-1 ${getDifficultyColor(difficulty)}`}>
          {difficulty}
        </Badge>
      </div>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.slice(0, 2).map((tag, index) => (
          <Badge key={index} variant="outline" className="text-xs border-gray-200 text-factorbeam-text-alt">
            {tag}
          </Badge>
        ))}
        {tags.length > 2 && (
          <span className="text-xs text-factorbeam-text-alt">+{tags.length - 2} more</span>
        )}
      </div>
      
      {/* Button */}
      <div className="mt-auto">
        {!comingSoon && isActive ? (
          <button 
            onClick={() => setIsDialogOpen(true)}
            className="w-full bg-factorbeam-primary hover:bg-factorbeam-primary-alt text-white font-semibold py-3 px-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2"
          >
            Start Assessment
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button className="w-full bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg shadow-sm cursor-not-allowed">
            {!isActive ? 'Inactive' : 'Coming Soon'}
          </button>
        )}
      </div>
      
      {/* Assessment Start Dialog */}
      <AssessmentStartDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        assessmentId={id}
        assessmentTitle={title}
      />
    </div>
  );
};

export default AssessmentCard;
