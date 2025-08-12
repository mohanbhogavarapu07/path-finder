
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, CheckCircle, Brain, Code, Target, Trophy } from 'lucide-react';
import PsychometricSection from '@/components/PsychometricSection';
import TechnicalSection from '@/components/TechnicalSection';
import WiscarSection from '@/components/WiscarSection';
import AssessmentResults from '@/components/AssessmentResults';

interface AssessmentFlowProps {
  onBack: () => void;
}

const AssessmentFlow = ({ onBack }: AssessmentFlowProps) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [assessmentData, setAssessmentData] = useState({
    psychometric: {},
    technical: {},
    wiscar: {}
  });

  const sections = [
    {
      id: 'psychometric',
      title: '🧪 Psychometric Assessment',
      description: 'Personality, motivation, and cognitive style evaluation',
      icon: Brain,
      component: PsychometricSection
    },
    {
      id: 'technical',
      title: '🧠 Technical & Aptitude',
      description: 'Programming logic and MERN stack knowledge',
      icon: Code,
      component: TechnicalSection
    },
    {
      id: 'wiscar',
      title: '🔍 WISCAR Framework',
      description: 'Comprehensive readiness analysis',
      icon: Target,
      component: WiscarSection
    },
    {
      id: 'results',
      title: '🎯 Your Results',
      description: 'Personalized recommendations and insights',
      icon: Trophy,
      component: AssessmentResults
    }
  ];

  const handleSectionComplete = (sectionId: string, data: any) => {
    setAssessmentData(prev => ({
      ...prev,
      [sectionId]: data
    }));
    
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const progress = ((currentSection + 1) / sections.length) * 100;
  const CurrentComponent = sections[currentSection].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Overview</span>
            </Button>
            
            <div className="flex-1 max-w-md mx-8">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Progress</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              Section {currentSection + 1} of {sections.length}
            </Badge>
          </div>
        </div>
      </header>

      {/* Section Navigation */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-8">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            const isActive = idx === currentSection;
            const isCompleted = idx < currentSection;
            
            return (
              <div key={section.id} className="flex items-center">
                <div className={`flex items-center space-x-3 ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isActive ? 'bg-blue-100' : isCompleted ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </div>
                  <div className="hidden md:block">
                    <h3 className="font-medium">{section.title}</h3>
                    <p className="text-sm opacity-70">{section.description}</p>
                  </div>
                </div>
                {idx < sections.length - 1 && (
                  <div className={`w-8 h-px mx-4 ${isCompleted ? 'bg-green-300' : 'bg-gray-300'}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Current Section */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl">{sections[currentSection].title}</CardTitle>
            <CardDescription className="text-lg">
              {sections[currentSection].description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CurrentComponent
              onComplete={(data: any) => handleSectionComplete(sections[currentSection].id, data)}
              data={assessmentData[sections[currentSection].id as keyof typeof assessmentData]}
              allData={assessmentData}
            />
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentSection === 0}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          <div className="text-center text-sm text-gray-600">
            <p>Section {currentSection + 1} of {sections.length}</p>
            <p className="text-xs">Estimated time: 5-7 minutes</p>
          </div>

          <div className="w-24" /> {/* Spacer for alignment */}
        </div>
      </div>
    </div>
  );
};

export default AssessmentFlow;
