import React from 'react';
import { useAssessment } from '../../contexts/AssessmentContext';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Brain, 
  Code, 
  Target, 
  ChartBar,
  CheckCircle,
  Clock,
  Users,
  TrendingUp
} from 'lucide-react';

interface AssessmentLayoutProps {
  children: React.ReactNode;
}

const AssessmentLayout: React.FC<AssessmentLayoutProps> = ({ children }) => {
  const { state, dispatch } = useAssessment();

  const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
      icon: BookOpen,
      color: 'bg-blue-500',
      completed: state.currentSection !== 'introduction' || state.progress > 0,
    },
    {
      id: 'psychological',
      title: 'Psychological Fit',
      icon: Brain,
      color: 'bg-purple-500',
      completed: state.currentSection === 'technical' || state.currentSection === 'wiscar' || state.currentSection === 'results',
    },
    {
      id: 'technical',
      title: 'Technical Aptitude',
      icon: Code,
      color: 'bg-green-500',
      completed: state.currentSection === 'wiscar' || state.currentSection === 'results',
    },
    {
      id: 'wiscar',
      title: 'WISCAR Analysis',
      icon: Target,
      color: 'bg-orange-500',
      completed: state.currentSection === 'results',
    },
    {
      id: 'results',
      title: 'Your Results',
      icon: ChartBar,
      color: 'bg-red-500',
      completed: false,
    },
  ];

  const getCurrentSectionIndex = () => {
    return sections.findIndex(section => section.id === state.currentSection);
  };

  const progress = ((getCurrentSectionIndex() + 1) / sections.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Is Multi-Cloud Engineering Right for You?
              </h1>
              <p className="text-gray-600 text-sm">
                Comprehensive Career Assessment & Guidance
              </p>
            </div>
            <Badge variant="outline" className="text-sm">
              {Math.round(progress)}% Complete
            </Badge>
          </div>
          {/* Progress Bar */}
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
          </div>
          {/* Section Navigation */}
          <div className="flex mt-4 space-x-4 overflow-x-auto">
            {sections.map((section, index) => {
              const Icon = section.icon;
              const isActive = section.id === state.currentSection;
              const isCompleted = getCurrentSectionIndex() > index;
              return (
                <div
                  key={section.id}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg min-w-fit ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                      : isCompleted
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => dispatch({ type: 'SET_SECTION', payload: section.id as any })}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                  <span className="text-sm font-medium">{section.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
};

export default AssessmentLayout;