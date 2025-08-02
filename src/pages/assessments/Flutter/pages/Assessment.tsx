import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { QuestionCard } from "../components/QuestionCard";
import { assessmentSections } from "../data/assessmentData";
import { AssessmentResponse, AssessmentScores } from "../types/assessment";
import { Brain, Code, Target, Award, BookOpen, TrendingUp, ArrowRight, CheckCircle } from "lucide-react";
import { RadioGroup } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import AssessmentLayout from '../../../../components/AssessmentLayout';

export default function Assessment() {
  const navigate = useNavigate();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<AssessmentResponse[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const currentSection = assessmentSections[currentSectionIndex];
  const currentQuestion = currentSection?.questions[currentQuestionIndex];
  const totalQuestions = assessmentSections.reduce((sum, section) => sum + section.questions.length, 0);
  const answeredQuestions = responses.length;
  const progress = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;

  const sections = [
    { id: 'intro', title: 'Introduction', icon: BookOpen, color: 'bg-blue-500' },
    { id: 'psychometric', title: 'Psychological Fit', icon: Brain, color: 'bg-purple-500' },
    { id: 'technical', title: 'Technical Aptitude', icon: Code, color: 'bg-green-500' },
    { id: 'wiscar', title: 'WISCAR Analysis', icon: Target, color: 'bg-orange-500' },
    { id: 'results', title: 'Your Results', icon: TrendingUp, color: 'bg-red-500' }
  ];

  const getCurrentSectionIndex = () => {
    return currentSectionIndex;
  };

  const handleOptionSelect = (optionId: string, value: number) => {
    if (!currentQuestion) return;

    const newResponse: AssessmentResponse = {
      questionId: currentQuestion.id,
      optionId,
      value
    };

    setResponses(prev => {
      const filtered = prev.filter(r => r.questionId !== currentQuestion.id);
      return [...filtered, newResponse];
    });
  };

  const handleNext = () => {
    if (!currentSection) return;

    if (currentQuestionIndex < currentSection.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else if (currentSectionIndex < assessmentSections.length - 1) {
      setCurrentSectionIndex(prev => prev + 1);
      setCurrentQuestionIndex(0);
    } else {
      setIsComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1);
      const prevSection = assessmentSections[currentSectionIndex - 1];
      setCurrentQuestionIndex(prevSection.questions.length - 1);
    }
  };

  const getCurrentResponse = () => {
    return responses.find(r => r.questionId === currentQuestion?.id);
  };

  const canGoNext = () => {
    if (!currentQuestion) return true;
    return !!getCurrentResponse();
  };

  const canGoPrevious = () => {
    return currentSectionIndex > 0 || currentQuestionIndex > 0;
  };

  const calculateScores = (): AssessmentScores => {
    const psychometricQuestions = responses.filter(r => 
      assessmentSections[1]?.questions.some(q => q.id === r.questionId)
    );
    const technicalQuestions = responses.filter(r => 
      assessmentSections[2]?.questions.some(q => q.id === r.questionId)
    );
    const wiscarQuestions = responses.filter(r => 
      assessmentSections[3]?.questions.some(q => q.id === r.questionId)
    );

    const psychometric = psychometricQuestions.length > 0 
      ? psychometricQuestions.reduce((sum, r) => sum + r.value, 0) / psychometricQuestions.length 
      : 0;

    const technical = technicalQuestions.length > 0 
      ? technicalQuestions.reduce((sum, r) => sum + r.value, 0) / technicalQuestions.length 
      : 0;

    const wiscarByCategory = {
      will: 0,
      interest: 0,
      skill: 0,
      cognitive: 0,
      ability: 0,
      realWorld: 0
    };

    wiscarQuestions.forEach(response => {
      const question = assessmentSections[3]?.questions.find(q => q.id === response.questionId);
      if (question) {
        const category = question.category as keyof typeof wiscarByCategory;
        if (wiscarByCategory.hasOwnProperty(category)) {
          wiscarByCategory[category] = response.value;
        }
      }
    });

    const overall = (psychometric + technical + Object.values(wiscarByCategory).reduce((a, b) => a + b, 0) / 6) / 3;

    return {
      psychometric,
      technical,
      wiscar: wiscarByCategory,
      overall
    };
  };



  if (!currentSection) {
    return <div>Loading...</div>;
  }

  if (isComplete) {
    // Navigate directly to results page instead of showing completion cards
    const scores = calculateScores();
    navigate('/results', { state: { scores, responses } });
    return null; // Return null while navigating
  }

  if (currentSection.questions.length === 0) {
    // Introduction section
    return (
      <AssessmentLayout>
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {currentSection.title}
                </h1>
                <p className="text-gray-600 text-sm">
                  {currentSection.description}
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
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  🚀 Should I Learn Flutter?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <div>
                  <h3 className="text-lg font-semibold mb-2">🔍 Purpose</h3>
                  <p>To assess whether Flutter, a cross-platform UI toolkit, aligns with your interests, mindset, current skills, and career goals.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">💡 What is Flutter?</h3>
                  <p>Flutter is an open-source UI toolkit from Google for building natively compiled applications for mobile, web, and desktop from a single codebase using the Dart language.</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">🧑‍💻 Careers Associated with Flutter:</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Flutter Developer</li>
                    <li>Mobile App Developer</li>
                    <li>Cross-platform Engineer</li>
                    <li>Frontend Developer</li>
                    <li>UI/UX Developer</li>
                    <li>App Architect</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">✅ Who Thrives with Flutter?</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Problem-solvers with design & logic balance</li>
                    <li>Creatives who enjoy building interfaces</li>
                    <li>Developers who want efficient, scalable codebases</li>
                    <li>People who value fast results and tangible output</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-8 text-center">
              <Button 
                onClick={handleNext} 
                size="lg" 
                className="bg-blue-600/60 hover:bg-blue-700/70 text-white px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
              >
                Start Assessment
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </AssessmentLayout>
    );
  }

  return (
    <AssessmentLayout>
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {currentSection.title}
              </h1>
              <p className="text-gray-600 text-sm">
                {currentSection.description}
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
              const isActive = index === currentSectionIndex;
              const isCompleted = currentSectionIndex > index;
              
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
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {(() => {
            let cardBorder = "border-blue-200";
            let bgColor = "bg-blue-50";
            let textColor = "text-blue-700";
            let icon = <Brain className="w-6 h-6 text-blue-600" />;
            let sectionLabel = "Assessment";
            if (currentSectionIndex === 1) {
              cardBorder = "border-purple-200";
              bgColor = "bg-purple-50";
              textColor = "text-purple-700";
              icon = <Brain className="w-6 h-6 text-purple-600" />;
              sectionLabel = "Psychological Fit Assessment";
            } else if (currentSectionIndex === 2) {
              cardBorder = "border-green-200";
              bgColor = "bg-green-50";
              textColor = "text-green-700";
              icon = <Code className="w-6 h-6 text-green-600" />;
              sectionLabel = "Technical Aptitude Assessment";
            } else if (currentSectionIndex === 3) {
              cardBorder = "border-orange-200";
              bgColor = "bg-orange-50";
              textColor = "text-orange-700";
              icon = <Target className="w-6 h-6 text-orange-600" />;
              sectionLabel = "WISCAR Analysis";
            }
            return (
              <Card className={`border-2 ${cardBorder}`}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    {icon}
                    <span>{sectionLabel}</span>
                  </CardTitle>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Question {answeredQuestions + 1} of {totalQuestions}</span>
                      <span>{Math.round(progress)}% Complete</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className={`${bgColor} p-4 rounded-lg`}>
                    <div className={`text-sm font-medium mb-2 ${textColor}`}>
                      {currentQuestion.category || currentSection.title}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {currentQuestion.question}
                    </h3>
                    <RadioGroup
                      value={getCurrentResponse()?.optionId || ''}
                      onValueChange={optionId => {
                        const option = currentQuestion.options.find(o => o.id === optionId);
                        if (option) handleOptionSelect(option.id, option.value);
                      }}
                      className="space-y-3"
                    >
                      {currentQuestion.options.map((option, index) => (
                        <div key={option.id || index} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id={`option-${option.id || index}`}
                            name="assessment-option"
                            value={option.id}
                            checked={getCurrentResponse()?.optionId === option.id}
                            onChange={() => handleOptionSelect(option.id, option.value)}
                            className="accent-current h-4 w-4"
                          />
                          <Label
                            htmlFor={`option-${option.id || index}`}
                            className="text-sm cursor-pointer flex-1 py-2 px-3 rounded hover:bg-white/50 transition-colors"
                          >
                            {option.text}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      Evaluating: {currentSection.title}
                    </div>
                    <div className="flex gap-2">
                      {currentSectionIndex === 0 && (
                        <Button
                          variant="outline"
                          onClick={handlePrevious}
                          disabled={!canGoPrevious()}
                          className="flex items-center gap-2"
                        >
                          Previous
                        </Button>
                      )}
                      <Button
                        onClick={handleNext}
                        disabled={!canGoNext()}
                        className={`${
                          currentSectionIndex === 1 
                            ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                            : `${bgColor.replace('50','600')} hover:${bgColor.replace('50','700')} text-white`
                        } flex items-center gap-2 px-6 py-2`}
                      >
                        {currentSectionIndex === 1 ? 'Next' : 'Next'}
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })()}
        </div>
      </div>
    </AssessmentLayout>
  );
}