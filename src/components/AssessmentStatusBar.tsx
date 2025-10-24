import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowLeft, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SectionConfig {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface AssessmentStatusBarProps {
  title: string;
  subtitle?: string;
  progress: number;
  currentSection: string;
  sections: SectionConfig[];
  onBackClick?: () => void;
  showQuestionProgress?: boolean;
  questionProgress?: {
    current: number;
    total: number;
    timeRemaining?: string;
    difficulty?: string;
  };
}

const AssessmentStatusBar: React.FC<AssessmentStatusBarProps> = ({
  title,
  subtitle,
  progress,
  currentSection,
  sections,
  onBackClick,
  showQuestionProgress = false,
  questionProgress
}) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate('/assessments');
    }
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-6 py-3">
        {/* Main Header Row */}
        <div className="flex items-center justify-between mb-3">
          {/* Left Side - Title and Back Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleBackClick}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">
                {title}
              </h1>
              {subtitle && (
                <p className="text-gray-600 text-sm">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          
          {/* Right Side - Progress and Timer */}
          <div className="flex items-center gap-4">
            {/* Timer */}
            {showQuestionProgress && (
              <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-md">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">
                  {questionProgress?.timeRemaining || '30:00'}
                </span>
              </div>
            )}
            
            {/* Progress Badge */}
            <div className="bg-gray-100 px-3 py-1.5 rounded-md">
              <span className="text-sm font-medium text-gray-700">
                {Math.round(progress)}% Complete
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full flex">
              {/* Completed portion */}
              <div 
                className="bg-yellow-400 transition-all duration-300"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
              {/* Remaining portion */}
              <div 
                className="bg-green-500 transition-all duration-300"
                style={{ width: `${Math.max(100 - progress, 0)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Section Navigation */}
        <div className="flex items-center gap-2">
          {sections.map((section, index) => {
            const Icon = section.icon;
            const isActive = section.id === currentSection;
            const isCompleted = index < sections.findIndex(s => s.id === currentSection);
            
            return (
              <div
                key={section.id}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 ${
                  isActive
                    ? 'bg-green-50 text-green-700 border border-green-300'
                    : isCompleted
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-gray-50 text-gray-500 border border-gray-200'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
                <span className="text-sm font-medium whitespace-nowrap">{section.title}</span>
              </div>
            );
          })}
        </div>

        {/* Question Progress (Compact) */}
        {showQuestionProgress && questionProgress && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">
                  Question {questionProgress.current} of {questionProgress.total}
                </span>
                {questionProgress.difficulty && (
                  <Badge 
                    variant={questionProgress.difficulty === 'Hard' ? 'destructive' : questionProgress.difficulty === 'Medium' ? 'secondary' : 'outline'}
                    className="text-xs"
                  >
                    {questionProgress.difficulty}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssessmentStatusBar;
