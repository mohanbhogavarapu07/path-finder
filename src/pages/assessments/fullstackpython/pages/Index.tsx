
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Brain, Code, Target, Users, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';
import AssessmentIntro from '../components/AssessmentIntro';
import PsychometricSection from '../components/PsychometricSection';
import TechnicalSection from '../components/TechnicalSection';
import WiscarSection from '../components/WiscarSection';
import ResultsSection from '../components/ResultsSection';
import { AssessmentData } from '@/components/AssessmentFlow';
import AssessmentLayout from "../../../../components/AssessmentLayout";

const Index = () => {
  const [currentSection, setCurrentSection] = useState('intro');
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    psychometric: {},
    technical: {},
    wiscar: {}
  });

  const sections = [
    { id: 'intro', title: 'Introduction', icon: BookOpen, color: 'bg-blue-500' },
    { id: 'psychometric', title: 'Psychological Fit', icon: Brain, color: 'bg-purple-500' },
    { id: 'technical', title: 'Technical Aptitude', icon: Code, color: 'bg-green-500' },
    { id: 'wiscar', title: 'WISCAR Analysis', icon: Target, color: 'bg-orange-500' },
    { id: 'results', title: 'Your Results', icon: TrendingUp, color: 'bg-red-500' }
  ];

  const getCurrentSectionIndex = () => {
    return sections.findIndex(section => section.id === currentSection);
  };

  const progress = ((getCurrentSectionIndex() + 1) / sections.length) * 100;

  const updateAssessmentData = (section, data) => {
    setAssessmentData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const goToNextSection = () => {
    const currentIndex = getCurrentSectionIndex();
    if (currentIndex < sections.length - 1) {
      setCurrentSection(sections[currentIndex + 1].id);
    }
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'intro':
        return <AssessmentIntro onNext={goToNextSection} />;
      case 'psychometric':
        return (
          <PsychometricSection
            onNext={(data) => {
              updateAssessmentData('psychometric', data);
              goToNextSection();
            }}
            canGoBack={true}
          />
        );
      case 'technical':
        return (
          <TechnicalSection
            onNext={(data) => {
              updateAssessmentData('technical', data);
              goToNextSection();
            }}
            canGoBack={true}
          />
        );
      case 'wiscar':
        return (
          <WiscarSection
            onNext={(data) => {
              updateAssessmentData('wiscar', data);
              goToNextSection();
            }}
            canGoBack={true}
          />
        );
      case 'results':
        return <ResultsSection assessmentData={assessmentData} canGoBack={true} />;
      default:
        return <AssessmentIntro onNext={goToNextSection} />;
    }
  };

  return (
    <AssessmentLayout>
      {/* Top Assessment Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Should You Learn Full Stack Python?
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
              const isActive = section.id === currentSection;
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
      <div className="container mx-auto px-4 py-8 flex-1">
        {renderCurrentSection()}
      </div>
    </AssessmentLayout>
  );
};

export default Index;
