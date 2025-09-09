import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Brain, Code, Target, TrendingUp, CheckCircle, ArrowLeft } from 'lucide-react';
import AssessmentLayout from '@/components/AssessmentLayout';
import { useAssessment } from '@/hooks/useAssessments';
import { AssessmentSection, Question, API_BASE_URL } from '@/lib/api';
import DynamicAssessmentIntro from '@/components/dynamic/DynamicAssessmentIntro';
import DynamicPsychometricSection from '@/components/dynamic/DynamicPsychometricSection';
import DynamicTechnicalSection from '@/components/dynamic/DynamicTechnicalSection';
import DynamicWiscarSection from '@/components/dynamic/DynamicWiscarSection';
import DynamicResultsSection from '@/components/dynamic/DynamicResultsSection';

const DynamicAssessment = () => {
  const { assessmentId } = useParams<{ assessmentId: string }>();
  const navigate = useNavigate();
  
  const [currentSection, setCurrentSection] = useState('intro');
  const [assessmentData, setAssessmentData] = useState({
    psychometric: {},
    technical: {},
    wiscar: {},
    completed: false
  });

  // Fetch assessment data
  const { data: assessmentDataResponse, isLoading: isLoadingAssessment } = useAssessment(assessmentId!);

  // Get user data from localStorage
  const getUserData = () => {
    try {
      const userData = localStorage.getItem('assessmentUserData');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error reading user data from localStorage:', error);
      return null;
    }
  };





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
                         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#4CAF50] mx-auto"></div>
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
              onClick={() => navigate('/assessments')}
              className="mt-4 px-4 py-2 bg-[#4CAF50] text-white rounded-lg hover:bg-[#43A047]"
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
    { id: 'intro', title: 'Introduction', icon: BookOpen, color: 'bg-[#4CAF50]' },
    ...(sections.length > 0 ? sections.map((section, index) => ({
      id: section.type,
      title: section.title,
      icon: section.type === 'psychometric' ? Brain : 
            section.type === 'technical' ? Code : 
            section.type === 'wiscar' ? Target : BookOpen,
      color: section.type === 'psychometric' ? 'bg-[#4CAF50]' :
             section.type === 'technical' ? 'bg-[#4CAF50]' :
             section.type === 'wiscar' ? 'bg-[#4CAF50]' : 'bg-[#4CAF50]'
    })) : [
      { id: 'psychometric', title: 'Psychological Fit', icon: Brain, color: 'bg-[#4CAF50]' },
      { id: 'technical', title: 'Technical Aptitude', icon: Code, color: 'bg-[#4CAF50]' },
      { id: 'wiscar', title: 'FB6 Index Analysis', icon: Target, color: 'bg-[#4CAF50]' }
    ]),
    { id: 'results', title: 'Your Results', icon: TrendingUp, color: 'bg-[#4CAF50]' }
  ];

  const getCurrentSectionIndex = () => {
    return sectionConfig.findIndex(section => section.id === currentSection);
  };

  const progress = ((getCurrentSectionIndex() + 1) / sectionConfig.length) * 100;

  const updateAssessmentData = (section: string, data: any) => {
    setAssessmentData(prev => {
      const currentSectionData = prev[section as keyof typeof prev] || {};
      return {
        ...prev,
        [section]: { ...currentSectionData, ...data }
      };
    });
  };

  const goToNextSection = () => {
    const currentIndex = getCurrentSectionIndex();
    if (currentIndex < sectionConfig.length - 1) {
      setCurrentSection(sectionConfig[currentIndex + 1].id);
    }
  };

  const handleCompleteAssessment = async (finalData: Record<string, any>) => {
    if (!assessmentId) return;

    try {
      // Get user data from localStorage
      const userData = getUserData();
      if (userData && userData.userId) {
        // Get feedback from localStorage if available
        const feedbackData = localStorage.getItem('assessmentFeedback');
        let feedback = { rating: 5, comments: 'Great assessment!' }; // Default feedback
        
        if (feedbackData) {
          try {
            feedback = JSON.parse(feedbackData);
          } catch (e) {
            console.warn('Could not parse feedback data');
          }
        }

        // Complete the assessment with feedback
        const response = await fetch(`${API_BASE_URL}/users/${userData.userId}/complete-assessment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            assessmentId: assessmentId,
            feedback: feedback
          }),
        });

        if (response.ok) {
          console.log('Assessment completed successfully with feedback');
        } else {
          console.warn('Failed to complete assessment');
        }
      }

      setAssessmentData(prev => ({ ...prev, completed: true }));
      goToNextSection();
    } catch (error) {
      console.error('Failed to complete assessment:', error);
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
              <button onClick={goToNextSection} className="mt-4 px-4 py-2 bg-factorbeam-primary text-white rounded-lg">
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
              <button onClick={goToNextSection} className="mt-4 px-4 py-2 bg-factorbeam-primary text-white rounded-lg">
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
              <p className="text-gray-600">FB6 Index section not available</p>
              <button onClick={goToNextSection} className="mt-4 px-4 py-2 bg-factorbeam-primary text-white rounded-lg">
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
            onComplete={handleCompleteAssessment}
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
              onClick={() => navigate('/assessments')}
              className="mt-4 px-4 py-2 bg-[#4CAF50] text-white rounded-lg hover:bg-[#43A047]"
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
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => navigate('/assessments')}
                className="p-1 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                  {assessment?.title || 'Assessment'}
                </h1>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Illuminate your potential
                </p>
              </div>
            </div>
            <Badge variant="outline" className="text-xs sm:text-sm px-2 sm:px-3 py-1">
              {Math.round(progress)}% Complete
            </Badge>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-2 sm:mt-4">
            <Progress value={progress} className="h-1.5 sm:h-2" />
          </div>
          
          {/* Section Navigation */}
          <div className="flex mt-3 sm:mt-4 space-x-2 sm:space-x-4 overflow-x-auto">
            {sectionConfig.map((section, index) => {
              const Icon = section.icon;
              const isActive = section.id === currentSection;
              const isCompleted = getCurrentSectionIndex() > index;
              
              return (
                <div
                  key={section.id}
                  className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg min-w-fit ${
                    isActive
                      ? 'bg-[#4CAF50]/10 text-[#4CAF50] border-2 border-[#4CAF50]/30'
                      : isCompleted
                      ? 'bg-[#4CAF50]/10 text-[#4CAF50]'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                  ) : (
                    <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                  )}
                  <span className="text-xs sm:text-sm font-medium">{section.title}</span>
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
