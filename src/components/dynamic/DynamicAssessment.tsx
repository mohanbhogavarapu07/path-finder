import React, { useState } from 'react';
import { DynamicAssessment as AssessmentType } from '@/lib/api';
import DynamicAssessmentIntro from './DynamicAssessmentIntro';
import DynamicPsychometricSection from './DynamicPsychometricSection';
import DynamicTechnicalSection from './DynamicTechnicalSection';
import DynamicWiscarSection from './DynamicWiscarSection';
import DynamicResultsSection from './DynamicResultsSection';

interface DynamicAssessmentProps {
  assessment: AssessmentType;
  onComplete?: (results: any) => void;
}

type AssessmentStep = 'intro' | 'psychometric' | 'technical' | 'wiscar' | 'results';

const DynamicAssessment: React.FC<DynamicAssessmentProps> = ({
  assessment,
  onComplete
}) => {
  const [currentStep, setCurrentStep] = useState<AssessmentStep>('intro');
  const [sectionAnswers, setSectionAnswers] = useState<Record<string, any>>({});

  const handleIntroComplete = () => {
    setCurrentStep('psychometric');
  };

  const handlePsychometricComplete = (answers: any) => {
    setSectionAnswers(prev => ({ ...prev, psychometric: answers }));
    setCurrentStep('technical');
  };

  const handleTechnicalComplete = (answers: any) => {
    setSectionAnswers(prev => ({ ...prev, technical: answers }));
    setCurrentStep('wiscar');
  };

  const handleWiscarComplete = (answers: any) => {
    setSectionAnswers(prev => ({ ...prev, wiscar: answers }));
    setCurrentStep('results');
  };

  const handleResultsComplete = (results: any) => {
    if (onComplete) {
      onComplete({
        assessment: assessment,
        sectionAnswers: sectionAnswers,
        results: results
      });
    }
  };

  const handleStepBack = (step: AssessmentStep) => {
    setCurrentStep(step);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'intro':
        return (
          <DynamicAssessmentIntro
            assessment={assessment}
            onNext={handleIntroComplete}
          />
        );

      case 'psychometric':
        return (
          <DynamicPsychometricSection
            section={assessment.sections?.psychometric}
            onComplete={handlePsychometricComplete}
          />
        );

      case 'technical':
        return (
          <DynamicTechnicalSection
            section={assessment.sections?.technical}
            onComplete={handleTechnicalComplete}
          />
        );

      case 'wiscar':
        return (
          <DynamicWiscarSection
            section={assessment.sections?.wiscar}
            onComplete={handleWiscarComplete}
          />
        );

      case 'results':
        return (
          <DynamicResultsSection
            assessment={assessment}
            sectionAnswers={sectionAnswers}
            onComplete={handleResultsComplete}
          />
        );

      default:
        return (
          <div className="max-w-4xl mx-auto text-center py-8">
            <p className="text-gray-600">Invalid assessment step</p>
          </div>
        );
    }
  };

  // Progress indicator for multi-step assessment
  const renderProgressIndicator = () => {
    if (currentStep === 'intro' || currentStep === 'results') {
      return null;
    }

    const steps = [
      { key: 'psychometric', label: 'Psychological Fit', icon: '🧠' },
      { key: 'technical', label: 'Technical Aptitude', icon: '💻' },
      { key: 'wiscar', label: 'WISCAR Analysis', icon: '🎯' }
    ];

    const currentIndex = steps.findIndex(step => step.key === currentStep);

    return (
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.key} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                index < currentIndex 
                  ? 'bg-green-500 border-green-500 text-white' 
                  : index === currentIndex 
                  ? 'bg-blue-500 border-blue-500 text-white' 
                  : 'bg-gray-100 border-gray-300 text-gray-500'
              }`}>
                {index < currentIndex ? '✓' : step.icon}
              </div>
              <span className={`ml-2 text-sm font-medium ${
                index <= currentIndex ? 'text-gray-900' : 'text-gray-500'
              }`}>
                {step.label}
              </span>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-4 ${
                  index < currentIndex ? 'bg-green-500' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {renderProgressIndicator()}
        {renderCurrentStep()}
      </div>
    </div>
  );
};

export default DynamicAssessment;
