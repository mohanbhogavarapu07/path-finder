import { useState } from "react";
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Brain, Code, Target, TrendingUp, CheckCircle } from 'lucide-react';
import { AssessmentIntro } from "../components/assessment/AssessmentIntro";
import PsychometricSection from "../components/assessment/PsychometricSection";
import TechnicalSection from "../components/assessment/TechnicalSection";
import AssessmentLayout from "../../../../components/AssessmentLayout";

const sections = [
  { id: 'intro', title: 'Introduction', icon: BookOpen, color: 'bg-blue-100 text-blue-700 border-blue-300' },
  { id: 'psychometric', title: 'Psychological Fit', icon: Brain, color: 'bg-purple-100 text-purple-700 border-purple-300' },
  { id: 'technical', title: 'Technical Aptitude', icon: Code, color: 'bg-green-100 text-green-700 border-green-300' },
  { id: 'wiscar', title: 'WISCAR Analysis', icon: Target, color: 'bg-orange-100 text-orange-700 border-orange-300' },
  { id: 'results', title: 'Your Results', icon: TrendingUp, color: 'bg-red-100 text-red-700 border-red-300' }
];

const Index = () => {
  const [currentSection, setCurrentSection] = useState('intro');

  const getCurrentSectionIndex = () => {
    return sections.findIndex(section => section.id === currentSection);
  };

  const progress = ((getCurrentSectionIndex() + 1) / sections.length) * 100;

  let mainContent;
  if (currentSection === 'intro') {
    mainContent = <AssessmentIntro onStartAssessment={() => setCurrentSection('psychometric')} />;
  } else if (currentSection === 'psychometric') {
    mainContent = <PsychometricSection onComplete={() => setCurrentSection('technical')} />;
  } else if (currentSection === 'technical') {
    mainContent = <TechnicalSection onComplete={() => setCurrentSection('wiscar')} />;
  } else if (currentSection === 'wiscar') {
    mainContent = <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-8 text-center">WISCAR Analysis Section Placeholder</div>;
  } else if (currentSection === 'results') {
    mainContent = <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-8 text-center">Results Section Placeholder</div>;
  }

  return (
    <AssessmentLayout>
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-blue-900">
                Is DevOps Right for You?
              </h1>
              <p className="text-gray-700 text-sm">
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
              const isActive = getCurrentSectionIndex() === index;
              const isCompleted = getCurrentSectionIndex() > index;
              return (
                <div
                  key={section.id}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg min-w-fit border ${
                    isActive
                      ? section.color
                      : isCompleted
                      ? 'bg-green-100 text-green-700 border-green-300'
                      : 'bg-gray-100 text-gray-500 border-gray-200'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-4 h-4 text-gray-500" />
                  ) : (
                    <Icon className="w-4 h-4 text-gray-500" />
                  )}
                  <span className="text-sm font-medium">{section.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 flex-1">
        {mainContent}
      </div>
    </AssessmentLayout>
  );
};

export default Index;
