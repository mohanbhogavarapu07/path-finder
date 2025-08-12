import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Brain, Code, Target, TrendingUp, CheckCircle } from 'lucide-react';
import AssessmentContainer from '../components/assessment/AssessmentContainer';
import { sectionConfigs, calculatePsychometricScore, calculateTechnicalScore, calculateWiscarScores, generateRecommendation, generateSkillGaps } from '../data/assessmentData';
import AssessmentLayout from '../../../../components/AssessmentLayout';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'overview' | 'assessment' | 'results'>('overview');
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [results, setResults] = useState<any>(null);

  const allQuestions = sectionConfigs.flatMap(section => 
    section.questions.map(q => ({ ...q, sectionName: section.name, sectionColor: section.color }))
  );

  const currentQuestion = allQuestions[currentQuestionIndex];
  const currentSection = sectionConfigs[currentSectionIndex];

  // Section navigation for UI
  const sections = [
    { id: 'overview', title: 'Introduction', icon: BookOpen, color: 'bg-blue-500' },
    { id: 'psychometric', title: 'Psychological Fit', icon: Brain, color: 'bg-purple-500' },
    { id: 'technical', title: 'Technical Aptitude', icon: Code, color: 'bg-green-500' },
    { id: 'wiscar', title: 'WISCAR Analysis', icon: Target, color: 'bg-orange-500' },
    { id: 'results', title: 'Your Results', icon: TrendingUp, color: 'bg-red-500' }
  ];

  const getCurrentSectionIndex = () => {
    if (currentStep === 'overview') return 0;
    if (currentStep === 'results') return sections.length - 1;
    return currentSectionIndex + 1;
  };

  const progress = ((getCurrentSectionIndex() + 1) / sections.length) * 100;

  // Navigation logic
  const goToNextSection = () => {
    if (currentStep === 'overview') {
      setCurrentStep('assessment');
      setCurrentSectionIndex(0);
      setCurrentQuestionIndex(0);
      setAnswers({});
      setResults(null);
      return;
    }
    if (currentStep === 'assessment') {
      // Move to next section or results
      if (currentSectionIndex < sectionConfigs.length - 1) {
        setCurrentSectionIndex(currentSectionIndex + 1);
        // Move to first question of next section
        const questionsBefore = sectionConfigs.slice(0, currentSectionIndex + 1).reduce((sum, s) => sum + s.questions.length, 0);
        setCurrentQuestionIndex(questionsBefore);
      } else {
        calculateAndShowResults();
      }
    }
  };

  const calculateAndShowResults = () => {
    const psychometricScore = calculatePsychometricScore(answers);
    const technicalScore = calculateTechnicalScore(answers);
    const wiscarData = calculateWiscarScores(answers);
    const overallConfidence = Math.round(
      (psychometricScore * 0.3) + 
      (technicalScore * 0.3) + 
      (Object.values(wiscarData).reduce((sum: number, score: number) => sum + score, 0) / 6 * 0.4)
    );
    const recommendation = generateRecommendation(psychometricScore, technicalScore, wiscarData, overallConfidence);
    const skillGaps = generateSkillGaps(technicalScore, wiscarData);
    const assessmentResults = {
      psychometricScore,
      technicalScore,
      wiscarData,
      overallConfidence,
      recommendation,
      skillGaps
    };
    setResults(assessmentResults);
    setCurrentStep('results');
  };

  const handleAnswerChange = (answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      // Section index is updated if needed by the question index
      const questionsBeforeNextSection = sectionConfigs.slice(0, currentSectionIndex + 1).reduce((sum, s) => sum + s.questions.length, 0);
      if (currentQuestionIndex + 1 >= questionsBeforeNextSection) {
        setCurrentSectionIndex(currentSectionIndex + 1);
      }
    } else {
      calculateAndShowResults();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      // Section index is updated if needed by the question index
      const questionsBeforeCurrentSection = sectionConfigs.slice(0, currentSectionIndex).reduce((sum, s) => sum + s.questions.length, 0);
      if (currentQuestionIndex - 1 < questionsBeforeCurrentSection) {
        setCurrentSectionIndex(currentSectionIndex - 1);
      }
    }
  };

  const handleRestart = () => {
    setCurrentStep('overview');
    setCurrentSectionIndex(0);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResults(null);
  };

  const canGoNext = () => {
    const answer = answers[currentQuestion?.id];
    return answer !== undefined && answer !== null && answer !== '';
  };

  // Section progress for current section
  const questionsInCurrentSection = currentSection?.questions.length || 0;
  const currentQuestionInSection = currentQuestionIndex - sectionConfigs.slice(0, currentSectionIndex).reduce((sum, section) => sum + section.questions.length, 0);
  const sectionProgress = questionsInCurrentSection > 0 
    ? Math.round((currentQuestionInSection / questionsInCurrentSection) * 100) 
    : 0;

  // Render
  return (
    <AssessmentLayout>
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Is Data Analytics Right for You?
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
              const isActive = getCurrentSectionIndex() === index;
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
        <AssessmentContainer
          currentStep={currentStep}
          currentSectionIndex={currentSectionIndex}
          currentQuestionIndex={currentQuestionIndex}
          allQuestions={allQuestions}
          currentQuestion={currentQuestion}
          currentSection={currentSection}
          answers={answers}
          results={results}
          onStartAssessment={() => setCurrentStep('assessment')}
          onAnswerChange={handleAnswerChange}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onRestart={handleRestart}
          canGoNext={canGoNext()}
          isFirstQuestion={currentQuestionIndex === 0}
          sectionProgress={sectionProgress}
        />
      </div>
    </AssessmentLayout>
  );
};

export default Index;
