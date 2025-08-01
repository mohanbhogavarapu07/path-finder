
import React from 'react';
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export interface AssessmentCardProps {
  id: string;
  title: string;
  comingSoon?: boolean;
}

const AssessmentCard: React.FC<AssessmentCardProps> = ({
  id,
  title,
  comingSoon = false,
}) => {
  return (
    <div className="mb-4">
      {!comingSoon ? (
        <Link 
          to={`/assessments/${id}`}
          className="block w-full"
        >
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-gray-700 px-6 py-4 rounded-xl border border-blue-100 hover:border-blue-200 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between group">
            <span className="font-medium text-lg">{title}</span>
            <ArrowRight className="h-5 w-5 text-blue-500 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200" />
          </div>
        </Link>
      ) : (
        <div className="bg-gray-50 text-gray-400 px-6 py-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <span className="font-medium text-lg">{title} (Coming Soon)</span>
        </div>
      )}
    </div>
  );
};

export default AssessmentCard;
