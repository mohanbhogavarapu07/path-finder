
import React from 'react';
import { Link } from "react-router-dom";

export interface AssessmentCardProps {
  id: string;
  title: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  duration?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  userCount?: string;
  tags?: string[];
  category?: string;
  comingSoon?: boolean;
  gradient?: string;
  rating?: number;
}

const AssessmentCard: React.FC<AssessmentCardProps> = ({
  id,
  title,
  comingSoon = false,
}) => {
  return (
    <div className="flex items-center mb-3">
      {/* Bullet point */}
      <div className="w-2 h-2 bg-black rounded-full mr-3 flex-shrink-0"></div>
      
      {/* Link */}
      {!comingSoon ? (
        <Link 
          to={`/assessments/${id}`}
          className="text-blue-600 underline hover:text-blue-800 transition-colors duration-200 text-base"
        >
          {title}
        </Link>
      ) : (
        <span className="text-gray-500 text-base">
          {title} (Coming Soon)
        </span>
      )}
    </div>
  );
};

export default AssessmentCard;
