import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Assessment as AssessmentType, AssessmentAnswer, AssessmentResult } from '../types/assessment';
import { AssessmentProgress } from './AssessmentProgress';
import AssessmentIntroduction from './AssessmentIntroduction';
import { QuestionCard } from './QuestionCard';
import AssessmentLayout from '../../../../components/AssessmentLayout';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AssessmentProps {
  assessment: AssessmentType;
  onBack: () => void;
  onComplete?: (result: AssessmentResult) => void;
}

type CurrentSection = 'introduction' | 'psychological-fit' | 'technical-aptitude' | 'wiscar-analysis';

const Assessment = ({ assessment, onBack, onComplete }: AssessmentProps) => {
  const [currentSection, setCurrentSection] = useState<CurrentSection>('introduction');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswer[]>([]);

  const allQuestions = assessment.sections.flatMap(section => 
    section.questions.map(q => ({ ...q, sectionId: section.id }))
  );

  const getCurrentQuestions = () => {
    return assessment.sections.find(s => s.id === currentSection)?.questions || [];
  };

  const calculateProgress = () => {
    const sections = ['introduction', 'psychological-fit', 'technical-aptitude', 'wiscar-analysis'];
    const currentIndex = sections.indexOf(currentSection);
    if (currentSection === 'introduction') return 0;
    const totalSections = sections.length - 1; // Exclude intro
    const completedSections = Math.max(0, currentIndex - 1);
    const currentSectionQuestions = getCurrentQuestions();
    const currentSectionProgress = currentSectionQuestions.length > 0 
      ? (currentQuestionIndex / currentSectionQuestions.length) 
      : 0;
    return ((completedSections + currentSectionProgress) / totalSections) * 100;
  };

  const handleAnswerChange = useCallback((answer: AssessmentAnswer) => {
    setAnswers(prev => {
      const newAnswers = prev.filter(a => a.questionId !== answer.questionId);
      return [...newAnswers, answer];
    });
  }, []);

  const handleNextQuestion = () => {
    const currentQuestions = getCurrentQuestions();
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Move to next section
      const sections: CurrentSection[] = ['psychological-fit', 'technical-aptitude', 'wiscar-analysis'];
      const currentIndex = sections.indexOf(currentSection);
      if (currentIndex < sections.length - 1) {
        setCurrentSection(sections[currentIndex + 1]);
        setCurrentQuestionIndex(0);
      } else {
        // Calculate and show results
        calculateResults();
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      // Move to previous section
      const sections: CurrentSection[] = ['psychological-fit', 'technical-aptitude', 'wiscar-analysis'];
      const currentIndex = sections.indexOf(currentSection);
      if (currentIndex > 0) {
        const prevSection = sections[currentIndex - 1];
        const prevQuestions = assessment.sections.find(s => s.id === prevSection)?.questions || [];
        setCurrentSection(prevSection);
        setCurrentQuestionIndex(prevQuestions.length - 1);
      } else {
        setCurrentSection('introduction');
      }
    }
  };

  const calculateResults = () => {
    // Simple scoring algorithm based on the blueprint
    const psychologicalAnswers = answers.filter(a => 
      allQuestions.find(q => q.id === a.questionId)?.sectionId === 'psychological-fit'
    );
    const technicalAnswers = answers.filter(a => 
      allQuestions.find(q => q.id === a.questionId)?.sectionId === 'technical-aptitude'
    );
    const wiscarAnswers = answers.filter(a => 
      allQuestions.find(q => q.id === a.questionId)?.sectionId === 'wiscar-analysis'
    );
    // Calculate scores (simplified)
    const psychScore = Math.round((psychologicalAnswers.reduce((sum, a) => sum + Number(a.value), 0) / (psychologicalAnswers.length * 5)) * 100);
    const techScore = Math.round((technicalAnswers.reduce((sum, a) => sum + Number(a.value), 0) / (technicalAnswers.length * 5)) * 100);
    // WISCAR breakdown
    const wiscarScores = {
      W: Math.round(Math.random() * 30 + 70), // Will
      I: Math.round(Math.random() * 30 + 70), // Interest  
      S: techScore,
      C: Math.round(Math.random() * 30 + 70), // Cognitive
      A: Math.round(Math.random() * 30 + 70), // Ability
      R: Math.round(Math.random() * 30 + 70), // Real-world fit
      overall_confidence_score: Math.round((psychScore + techScore) / 2)
    };
    const overallScore = wiscarScores.overall_confidence_score;
    let recommendation: 'yes' | 'maybe' | 'no' = 'maybe';
    let reason = '';
    let nextSteps: string[] = [];
    if (overallScore >= 75) {
      recommendation = 'yes';
      reason = 'Strong motivation and cognitive fit. You show excellent potential for data science with good foundation skills.';
      nextSteps = [
        'Start Python basics course',
        'Take a beginner statistics module', 
        'Explore a public dataset with Jupyter Notebook',
        'Join data science communities and forums'
      ];
    } else if (overallScore >= 50) {
      recommendation = 'maybe';
      reason = 'Good potential with some skill gaps. Consider strengthening foundations before diving deep into data science.';
      nextSteps = [
        'Try short-form MOOCs (Coursera, DataCamp)',
        'Learn Python for Excel users or SQL basics',
        'Run a "data diary" for 1 week',
        'Take online statistics refresher course'
      ];
    } else {
      recommendation = 'no';
      reason = 'Current skills and interests may be better suited for alternative data-related paths.';
      nextSteps = [
        'Consider Data Analytics with Excel/BI tools',
        'Explore UX Research with data focus',
        'Look into Product Analyst roles (low code)',
        'Build foundational math and logic skills'
      ];
    }
    const mockResult: AssessmentResult = {
      recommendation,
      confidence_score: overallScore,
      reason,
      next_steps: nextSteps,
      psychological_fit: psychScore,
      technical_readiness: techScore,
      wiscar_scores: wiscarScores,
      section_scores: [
        { sectionId: 'psychological-fit', score: psychScore, maxScore: 100, percentage: psychScore },
        { sectionId: 'technical-aptitude', score: techScore, maxScore: 100, percentage: techScore },
        { sectionId: 'wiscar-analysis', score: overallScore, maxScore: 100, percentage: overallScore }
      ],
      career_recommendations: [
        {
          role: 'Data Analyst',
          description: 'Clean and analyze data to generate business insights',
          skill_level: 'Intermediate',
          alignment_score: Math.max(60, overallScore - 10)
        },
        {
          role: 'Business Intelligence Analyst', 
          description: 'Build dashboards and KPIs for decision making',
          skill_level: 'Beginner-Mid',
          alignment_score: Math.max(65, overallScore - 5)
        },
        {
          role: 'Data Scientist',
          description: 'Model data and generate predictive insights',
          skill_level: 'Advanced', 
          alignment_score: Math.max(40, overallScore - 20)
        }
      ]
    };
    if (onComplete) {
      onComplete(mockResult);
    }
  };

  const currentQuestions = getCurrentQuestions();
  const currentQuestion = currentQuestions[currentQuestionIndex];
  const currentAnswer = answers.find(a => a.questionId === currentQuestion?.id);
  const canProceed = currentAnswer !== undefined;

  const handleContinueFromIntro = () => {
    setCurrentSection('psychological-fit');
    setCurrentQuestionIndex(0);
  };

  return (
    <AssessmentLayout>
      <AssessmentProgress 
        currentSection={currentSection}
        progress={calculateProgress()}
      />
      <div className="container mx-auto px-4 py-8">
        {currentSection === 'introduction' && (
          <AssessmentIntroduction 
            assessment={assessment}
            onContinue={handleContinueFromIntro}
          />
        )}
        {['psychological-fit', 'technical-aptitude', 'wiscar-analysis'].includes(currentSection) && currentQuestion && (
          <div className="max-w-3xl mx-auto">
            <Card className={
              currentSection === 'psychological-fit' ? 'border-2 border-purple-200' :
              currentSection === 'technical-aptitude' ? 'border-2 border-green-200' :
              currentSection === 'wiscar-analysis' ? 'border-2 border-orange-200' :
              ''
            }>
              <CardHeader>
                <div className="flex items-center justify-between mb-1">
                  <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                    {currentSection === 'psychological-fit' && <span className="text-purple-600">Psychological Fit Assessment</span>}
                    {currentSection === 'technical-aptitude' && <span className="text-green-600">Technical Aptitude Assessment</span>}
                    {currentSection === 'wiscar-analysis' && <span className="text-orange-600">WISCAR Framework Analysis</span>}
                  </CardTitle>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                  <div 
                    className={
                      currentSection === 'psychological-fit' ? 'bg-purple-500 h-2 rounded-full transition-all duration-300 ease-out' :
                      currentSection === 'technical-aptitude' ? 'bg-green-500 h-2 rounded-full transition-all duration-300 ease-out' :
                      currentSection === 'wiscar-analysis' ? 'bg-orange-500 h-2 rounded-full transition-all duration-300 ease-out' :
                      'bg-blue-500 h-2 rounded-full transition-all duration-300 ease-out'
                    }
                    style={{ width: `${((currentQuestionIndex + 1) / currentQuestions.length) * 100}%` }}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <QuestionCard
                  question={currentQuestion}
                  answer={currentAnswer}
                  onAnswerChange={handleAnswerChange}
                  questionNumber={currentQuestionIndex + 1}
                  totalQuestions={currentQuestions.length}
                />
                <div className="flex justify-between items-center mt-8">
                  <span className="text-sm text-gray-600">Question {currentQuestionIndex + 1} of {currentQuestions.length}</span>
                  <Button
                    onClick={handleNextQuestion}
                    disabled={!canProceed}
                    className={
                      currentSection === 'psychological-fit' ? 'flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3' :
                      currentSection === 'technical-aptitude' ? 'flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3' :
                      currentSection === 'wiscar-analysis' ? 'flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-3' :
                      'flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3'
                    }
                  >
                    {currentQuestionIndex === currentQuestions.length - 1 && currentSection === 'wiscar-analysis'
                      ? 'View Results'
                      : 'Next Question'
                    }
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AssessmentLayout>
  );
};

export { Assessment };