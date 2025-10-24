import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, Users, ArrowRight, ArrowLeft, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AssessmentStatusBar from '@/components/AssessmentStatusBar';
import QuestionNavigator from './QuestionNavigator';
import QuestionCard from './QuestionCard';
import { useToast } from '@/hooks/use-toast';

interface GateQuestion {
  id: string;
  text: string;
  type: 'multiple-choice' | 'numerical' | 'text';
  options?: Array<{
    id: string;
    text: string;
    value: string | number;
  }>;
  correctAnswer?: string | number;
  marks: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  explanation?: string;
}

interface Assessment {
  id: string;
  title: string;
  description: string;
  duration: number;
  gateSections: {
    aptitude: {
      title: string;
      description: string;
      type: string;
  questions: GateQuestion[];
      timeLimit?: number;
    };
    core: {
    title: string;
    description: string;
      type: string;
      questions: GateQuestion[];
      timeLimit?: number;
    };
  };
}

interface GateAssessmentProps {
  assessment: Assessment;
  onComplete: (results: any) => void;
}

const GateAssessment: React.FC<GateAssessmentProps> = ({ assessment, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [questionStatuses, setQuestionStatuses] = useState<Record<number, any>>({});
  const { toast } = useToast();

  // Combine all questions into one array
  const aptitudeQuestions = assessment?.gateSections?.aptitude?.questions || [];
  const coreQuestions = assessment?.gateSections?.core?.questions || [];
  const allQuestions = [...aptitudeQuestions, ...coreQuestions];
  const currentQuestion = allQuestions[currentQuestionIndex];

  // Debug: Log question structure
  if (allQuestions.length > 0) {
    console.log('Sample question structure:', allQuestions[0]);
    console.log('Has correctAnswer?', !!allQuestions[0].correctAnswer);
  }


  // Calculate progress
  const totalQuestions = allQuestions.length;
  const answeredQuestions = Object.keys(answers).length;
  const progress = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;

  // Timer effect
  useEffect(() => {
    const timeLimit = 180; // 3 hours for full assessment
    setTimeRemaining(timeLimit * 60);

      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
  }, []);

  const handleTimeUp = () => {
    toast({
      title: "Time's Up!",
      description: "Assessment will be submitted automatically",
      variant: "destructive",
    });
    
    handleCompleteAssessment();
  };

  const handleAnswerChange = (questionId: string, answer: any) => {
    console.log('Answer changed:', { questionId, answer, currentQuestionIndex });
    setAnswers(prev => {
      const newAnswers = {
        ...prev,
        [questionId]: answer
      };
      console.log('Updated answers:', newAnswers);
      return newAnswers;
    });
    
    updateQuestionStatus(currentQuestionIndex + 1, { answered: true, markedForReview: false, notAnswered: false });
  };

  const handleMarkForReview = (questionId: string) => {
    const currentStatus = questionStatuses[currentQuestionIndex + 1];
    const newStatus = {
      ...currentStatus,
      markedForReview: !currentStatus?.markedForReview
    };
    
    updateQuestionStatus(currentQuestionIndex + 1, newStatus);
    
    toast({
      title: newStatus.markedForReview ? "Marked for review" : "Unmarked for review",
      variant: "default",
    });
  };

  const updateQuestionStatus = (questionNum: number, status: any) => {
    setQuestionStatuses(prev => ({
      ...prev,
      [questionNum]: status
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleCompleteAssessment();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleQuestionNavigation = (questionNum: number) => {
    setCurrentQuestionIndex(questionNum);
  };

  const handleCompleteAssessment = () => {
    console.log('Submitting assessment...', { answers, totalQuestions });
    console.log('All questions data:', allQuestions);
    console.log('Sample question with correctAnswer:', allQuestions[0]);
    console.log('User answers:', answers);
    
    const basicStats = calculateBasicStats();
    const results = {
      aptitudeScore: calculateSectionScore('aptitude'),
      coreScore: calculateSectionScore('core'),
      totalScore: calculateTotalScore(),
      correctAnswers: basicStats.correct,
      incorrectAnswers: basicStats.incorrect,
      unattemptedQuestions: basicStats.unattempted,
      answers: answers,
      questions: allQuestions, // Include question data for solutions
      timestamp: new Date().toISOString()
    };

    console.log('Assessment results:', results);
    console.log('Questions being saved:', results.questions?.length);

    // Save results to localStorage
    localStorage.setItem('gateExamResults', JSON.stringify(results));
    localStorage.setItem('gateExamAnswers', JSON.stringify(answers));

    onComplete(results);
  };

  const calculateSectionScore = (sectionId: string) => {
    const section = sectionId === 'aptitude' ? assessment.gateSections.aptitude : assessment.gateSections.core;
    if (!section) return 0;

    let totalMarks = 0;
    let earnedMarks = 0;
    let correctCount = 0;
    let wrongCount = 0;

    section.questions.forEach(question => {
      const userAnswer = answers[question.id];
      const questionMarks = 1.5; // GATE questions are always 1.5 marks each (override database value)
      
      if (userAnswer && question.correctAnswer) {
        if (userAnswer.toString() === question.correctAnswer.toString()) {
          // Correct answer: full marks
          earnedMarks += questionMarks;
          correctCount++;
        } else {
          // Wrong answer: negative marking
          const negativeMark = questionMarks * (1/3); // 1/3 negative marking for all question types
          earnedMarks -= negativeMark;
          wrongCount++;
        }
      }
      
      totalMarks += questionMarks;
    });

    console.log(`${sectionId} section:`, { correctCount, wrongCount, earnedMarks, totalMarks });
    
    // Return raw marks (not percentage)
    return Math.max(0, earnedMarks); // Ensure score doesn't go below 0
  };

  const calculateTotalScore = () => {
    const aptitudeScore = calculateSectionScore('aptitude');
    const coreScore = calculateSectionScore('core');
    
    // GATE total is out of 100 marks (15 + 85)
    const totalScore = aptitudeScore + coreScore;
    console.log('Total score calculation:', { aptitudeScore, coreScore, totalScore });
    return Math.max(0, totalScore); // Ensure score doesn't go below 0
  };

  const calculateBasicStats = () => {
    const answeredCount = Object.keys(answers).length;
    const totalCount = allQuestions.length;
    const unattemptedCount = totalCount - answeredCount;
    
    let correctCount = 0;
    let incorrectCount = 0;

    allQuestions.forEach(question => {
      const userAnswer = answers[question.id];
      if (userAnswer && question.correctAnswer) {
        if (userAnswer === question.correctAnswer) {
          correctCount++;
        } else {
          incorrectCount++;
        }
      }
    });
    
    return {
      correct: correctCount,
      incorrect: incorrectCount,
      unattempted: unattemptedCount,
      total: totalCount
    };
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Check if assessment is loaded
  if (!assessment) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Loading Assessment...</h1>
            <p className="text-lg text-gray-600 mb-6">
              Please wait while we load the assessment data.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Check if there are no questions
  if (totalQuestions === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">No Questions Available</h1>
            <p className="text-lg text-gray-600 mb-6">
              This assessment doesn't have any questions loaded yet.
            </p>
            <p className="text-sm text-gray-500">
              Total questions: {totalQuestions}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
        <AssessmentStatusBar
        title={assessment.title}
        progress={progress}
        currentSection="assessment"
        sections={[]}
          onBackClick={() => window.history.back()}
          showQuestionProgress={true}
          questionProgress={{
            current: currentQuestionIndex + 1,
            total: totalQuestions,
            timeRemaining: formatTime(timeRemaining),
          difficulty: currentQuestion?.difficulty
        }}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Question Area */}
          <div className="lg:col-span-3">
            {currentQuestion ? (
              <QuestionCard
                question={currentQuestion}
                selectedAnswer={answers[currentQuestion.id]}
                onAnswerSelect={(answer) => handleAnswerChange(currentQuestion.id, answer)}
                questionNumber={currentQuestionIndex + 1}
              />
            ) : (
              <Card className="w-full">
                <CardContent className="p-6">
                  <div className="text-center text-gray-500">
                    <h3 className="text-lg font-semibold mb-2">Loading Question...</h3>
                    <p>Question {currentQuestionIndex + 1} of {totalQuestions}</p>
            </div>
          </CardContent>
        </Card>
            )}

            {/* Navigation Controls - Right below question card */}
            <div className="flex items-center justify-between mt-6">
              <Button
                variant="outline"
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              <Button
                variant="outline"
                onClick={() => handleMarkForReview(currentQuestion?.id || '')}
                className={
                  questionStatuses[currentQuestionIndex + 1]?.markedForReview
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : ""
                }
              >
                Mark for Review
              </Button>
            
            <Button
                onClick={currentQuestionIndex === allQuestions.length - 1 ? handleCompleteAssessment : handleNextQuestion}
                disabled={false}
                className={currentQuestionIndex === allQuestions.length - 1 ? 'bg-green-600 hover:bg-green-700' : ''}
              >
                {currentQuestionIndex === allQuestions.length - 1 ? 'Submit Assessment' : 'Next'}
                <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

          {/* Navigator Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <QuestionNavigator
                totalQuestions={totalQuestions}
                currentQuestion={currentQuestionIndex}
                answers={answers}
                markedForReview={new Set(Object.keys(questionStatuses).filter(key => questionStatuses[key]?.markedForReview))}
                onQuestionSelect={handleQuestionNavigation}
                questions={allQuestions}
              />

              <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span>Answered:</span>
                    <span className="font-semibold">{answeredQuestions}</span>
        </div>
                  <div className="flex justify-between">
                    <span>Not Answered:</span>
                    <span className="font-semibold">
                      {totalQuestions - answeredQuestions}
                </span>
              </div>
                  <div className="flex justify-between">
                    <span>Marked:</span>
                    <span className="font-semibold">
                      {Object.keys(questionStatuses).filter(key => questionStatuses[key]?.markedForReview).length}
                </span>
              </div>
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-green-600 to-green-700"
                  onClick={handleCompleteAssessment}
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Submit Assessment ({answeredQuestions}/{totalQuestions} answered)
                </Button>
              </div>
            </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default GateAssessment;