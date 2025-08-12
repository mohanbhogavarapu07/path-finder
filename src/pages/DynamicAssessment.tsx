import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Brain, Code, Target, TrendingUp, CheckCircle, ArrowLeft } from 'lucide-react';
import AssessmentLayout from '@/components/AssessmentLayout';
import { useAssessment, useStartAssessmentSession, useSubmitAssessment } from '@/hooks/useAssessments';
import { AssessmentSection, Question } from '@/lib/api';
import DynamicAssessmentIntro from '@/components/dynamic/DynamicAssessmentIntro';
import DynamicPsychometricSection from '@/components/dynamic/DynamicPsychometricSection';
import DynamicTechnicalSection from '@/components/dynamic/DynamicTechnicalSection';
import DynamicWiscarSection from '@/components/dynamic/DynamicWiscarSection';
import DynamicResultsSection from '@/components/dynamic/DynamicResultsSection';

const DynamicAssessment = () => {
  const { assessmentId } = useParams<{ assessmentId: string }>();
  const navigate = useNavigate();
  
  const [currentSection, setCurrentSection] = useState('intro');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [assessmentData, setAssessmentData] = useState({
    psychometric: {},
    technical: {},
    wiscar: {},
    completed: false
  });

  // Fetch assessment data
  const { data: assessmentDataResponse, isLoading: isLoadingAssessment } = useAssessment(assessmentId!);
  
  // Start session mutation
  const startSessionMutation = useStartAssessmentSession();
  
  // Submit assessment mutation
  const submitAssessmentMutation = useSubmitAssessment();

  // Initialize session when assessment data is loaded
  useEffect(() => {
    if (assessmentDataResponse && !sessionId) {
      startSessionMutation.mutate(
        { assessmentId: assessmentId! },
        {
          onSuccess: (data) => {
            setSessionId(data.sessionId);
          },
          onError: (error) => {
            console.error('Failed to start assessment session:', error);
          }
        }
      );
    }
  }, [assessmentDataResponse, sessionId, assessmentId]);

  if (!assessmentId) {
    return (
      <AssessmentLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-lg text-gray-600">Assessment ID not found</p>
          </div>
        </div>
      </AssessmentLayout>
    );
  }

  if (isLoadingAssessment) {
    return (
      <AssessmentLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Loading assessment...</p>
          </div>
        </div>
      </AssessmentLayout>
    );
  }

  if (!assessmentDataResponse) {
    return (
      <AssessmentLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-lg text-gray-600">Assessment not found</p>
            <button
              onClick={() => navigate('/dynamic-assessments')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Back to Assessments
            </button>
          </div>
        </div>
      </AssessmentLayout>
    );
  }

  const assessment = assessmentDataResponse;
  const sections = assessmentDataResponse?.sections || [];

  // Define sections based on dynamic data
  const sectionConfig = [
    { id: 'intro', title: 'Introduction', icon: BookOpen, color: 'bg-blue-500' },
    ...(sections.length > 0 ? sections.map((section, index) => ({
      id: section.type,
      title: section.title,
      icon: section.type === 'psychometric' ? Brain : 
            section.type === 'technical' ? Code : 
            section.type === 'wiscar' ? Target : BookOpen,
      color: section.type === 'psychometric' ? 'bg-purple-500' :
             section.type === 'technical' ? 'bg-green-500' :
             section.type === 'wiscar' ? 'bg-orange-500' : 'bg-blue-500'
    })) : [
      { id: 'psychometric', title: 'Psychological Fit', icon: Brain, color: 'bg-purple-500' },
      { id: 'technical', title: 'Technical Aptitude', icon: Code, color: 'bg-green-500' },
      { id: 'wiscar', title: 'WISCAR Analysis', icon: Target, color: 'bg-orange-500' }
    ]),
    { id: 'results', title: 'Your Results', icon: TrendingUp, color: 'bg-red-500' }
  ];

  const getCurrentSectionIndex = () => {
    return sectionConfig.findIndex(section => section.id === currentSection);
  };

  const progress = ((getCurrentSectionIndex() + 1) / sectionConfig.length) * 100;

  const updateAssessmentData = (section: string, data: any) => {
    setAssessmentData(prev => ({
      ...prev,
      [section]: { ...prev[section as keyof typeof prev], ...data }
    }));
  };

  const goToNextSection = () => {
    const currentIndex = getCurrentSectionIndex();
    if (currentIndex < sectionConfig.length - 1) {
      setCurrentSection(sectionConfig[currentIndex + 1].id);
    }
  };

  const handleCompleteAssessment = async (finalData: Record<string, any>) => {
    if (!sessionId || !assessmentId) return;

    // Flatten and transform answers to expected array shape
    const sectionsArray = assessmentDataResponse?.sections || [];
    const answerEntries: Array<{ questionId: string; sectionId: string; value: any }> = [];

    const pushSectionAnswers = (sectionKey: 'psychometric' | 'technical' | 'wiscar', data: Record<string, any>) => {
      const sec = sectionsArray.find(s => s.type === sectionKey);
      if (!sec) return;
      Object.entries(data || {}).forEach(([qId, val]) => {
        // Only include if the question exists in the section
        if (sec.questions?.some(q => q.id === qId)) {
          answerEntries.push({ questionId: qId, sectionId: sectionKey, value: val });
        }
      });
    };

    pushSectionAnswers('psychometric', assessmentData.psychometric as any);
    pushSectionAnswers('technical', assessmentData.technical as any);
    // Merge wiscar answers with finalData safely
    const mergedWiscar: Record<string, any> = {
      ...(typeof assessmentData.wiscar === 'object' && assessmentData.wiscar !== null ? (assessmentData.wiscar as Record<string, any>) : {}),
      ...(typeof finalData === 'object' && finalData !== null ? finalData : {})
    };
    pushSectionAnswers('wiscar', mergedWiscar);

    try {
      await submitAssessmentMutation.mutateAsync({
        assessmentId,
        sessionId,
        answers: answerEntries
      });
      
      setAssessmentData(prev => ({ ...prev, completed: true }));
      goToNextSection();
    } catch (error) {
      console.error('Failed to submit assessment:', error);
    }
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'intro':
        return (
          <DynamicAssessmentIntro
            assessment={assessment}
            onNext={goToNextSection}
          />
        );
      case 'psychometric':
        const psychometricSection = sections.find(s => s.type === 'psychometric');
        if (!psychometricSection) {
          return (
            <div className="text-center py-8">
              <p className="text-gray-600">Psychometric section not available</p>
              <button onClick={goToNextSection} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
                Continue
              </button>
            </div>
          );
        }
        return (
          <DynamicPsychometricSection
            section={psychometricSection}
            onComplete={(data) => {
              updateAssessmentData('psychometric', data);
              goToNextSection();
            }}
          />
        );
      case 'technical':
        const technicalSection = sections.find(s => s.type === 'technical');
        if (!technicalSection) {
          return (
            <div className="text-center py-8">
              <p className="text-gray-600">Technical section not available</p>
              <button onClick={goToNextSection} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
                Continue
              </button>
            </div>
          );
        }
        return (
          <DynamicTechnicalSection
            section={technicalSection}
            onComplete={(data) => {
              updateAssessmentData('technical', data);
              goToNextSection();
            }}
          />
        );
      case 'wiscar':
        const wiscarSection = sections.find(s => s.type === 'wiscar');
        if (!wiscarSection) {
          return (
            <div className="text-center py-8">
              <p className="text-gray-600">WISCAR section not available</p>
              <button onClick={goToNextSection} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
                Continue
              </button>
            </div>
          );
        }
        return (
          <DynamicWiscarSection
            section={wiscarSection}
            onComplete={(data) => {
              updateAssessmentData('wiscar', data);
              handleCompleteAssessment(data);
            }}
          />
        );
      case 'results':
        return (
          <DynamicResultsSection
            assessment={assessment}
            assessmentData={assessmentData}
            sessionId={sessionId}
          />
        );
      default:
        return (
          <DynamicAssessmentIntro
            assessment={assessment}
            onNext={goToNextSection}
          />
        );
    }
  };

  // Safety check to ensure assessment exists
  if (!assessment) {
    return (
      <AssessmentLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-lg text-gray-600">Assessment data not available</p>
            <button
              onClick={() => navigate('/dynamic-assessments')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Back to Assessments
            </button>
          </div>
        </div>
      </AssessmentLayout>
    );
  }

  return (
    <AssessmentLayout>
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dynamic-assessments')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {assessment?.title || 'Assessment'}
                </h1>
                <p className="text-gray-600 text-sm">
                  Comprehensive Career Assessment & Guidance
                </p>
              </div>
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
            {sectionConfig.map((section, index) => {
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

export default DynamicAssessment;
