import AssessmentOverview from "./AssessmentOverview";
import AssessmentProgress from "./AssessmentProgress";
import AssessmentQuestion from "./AssessmentQuestion";
import AssessmentResults from "./AssessmentResults";

interface AssessmentContainerProps {
  currentStep: 'overview' | 'assessment' | 'results';
  currentSectionIndex: number;
  currentQuestionIndex: number;
  allQuestions: any[];
  currentQuestion: any;
  currentSection: any;
  answers: Record<string, any>;
  results: any;
  onStartAssessment: () => void;
  onAnswerChange: (answer: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  onRestart: () => void;
  canGoNext: boolean;
  isFirstQuestion: boolean;
  sectionProgress: number;
}

const AssessmentContainer = ({
  currentStep,
  currentSectionIndex,
  currentQuestionIndex,
  allQuestions,
  currentQuestion,
  currentSection,
  answers,
  results,
  onStartAssessment,
  onAnswerChange,
  onNext,
  onPrevious,
  onRestart,
  canGoNext,
  isFirstQuestion,
  sectionProgress
}: AssessmentContainerProps) => {
  if (currentStep === 'overview') {
    return <AssessmentOverview onStartAssessment={onStartAssessment} />;
  }

  if (currentStep === 'results' && results) {
    return <AssessmentResults results={results} onRestart={onRestart} />;
  }

  if (currentStep === 'assessment' && currentQuestion) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mt-8">
          <AssessmentQuestion
            question={currentQuestion}
            questionIndex={currentQuestionIndex}
            totalQuestions={allQuestions.length}
            answer={answers[currentQuestion.id]}
            onAnswerChange={onAnswerChange}
            onNext={onNext}
            onPrevious={onPrevious}
            canGoNext={canGoNext}
            isFirstQuestion={isFirstQuestion}
            sectionInfo={{
              name: currentSection.name,
              color: currentSection.color,
              description: currentSection.description
            }}
          />
        </div>
      </div>
    );
  }

  return null;
};

export default AssessmentContainer;