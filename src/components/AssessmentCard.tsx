
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
            <div className="bg-[hsl(var(--cta))] hover:bg-[hsl(var(--cta-hover))] text-white px-6 py-4 rounded-xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-between group font-semibold">
              <span className="font-semibold text-lg drop-shadow">{title}</span>
                <ArrowRight className="h-5 w-5 text-white group-hover:text-white/80 group-hover:translate-x-1 transition-all duration-200 drop-shadow" />
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
