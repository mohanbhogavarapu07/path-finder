import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { QuestionCard } from "./QuestionCard";
import { assessmentSections } from "@/data/assessmentData";
import { AssessmentResponse, AssessmentResult, AssessmentScores } from "@/types/assessment";
import { AssessmentResults } from "./AssessmentResults";

interface AssessmentEngineProps {
  currentSection: number;
  onSectionComplete: () => void;
  onBack: () => void;
}

export const AssessmentEngine = ({ currentSection, onSectionComplete, onBack }: AssessmentEngineProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<AssessmentResponse[]>([]);
  const [sectionResponses, setSectionResponses] = useState<AssessmentResponse[]>([]);
  const [showResults, setShowResults] = useState(false);

  const section = assessmentSections[currentSection - 1];
  const currentQuestion = section?.questions[currentQuestionIndex];
  const totalQuestions = section?.questions.length || 0;

  useEffect(() => {
    setSectionResponses([]);
    setCurrentQuestionIndex(0);
  }, [currentSection]);

  const handleAnswer = (answer: string | number) => {
    if (!currentQuestion) return;

    const newResponse: AssessmentResponse = {
      questionId: currentQuestion.id,
      answer
    };

    const updatedSectionResponses = sectionResponses.filter(r => r.questionId !== currentQuestion.id);
    updatedSectionResponses.push(newResponse);
    setSectionResponses(updatedSectionResponses);
  };

  const getCurrentAnswer = () => {
    if (!currentQuestion) return undefined;
    return sectionResponses.find(r => r.questionId === currentQuestion.id)?.answer;
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Section complete
      const updatedResponses = [...responses, ...sectionResponses];
      setResponses(updatedResponses);
      
      if (currentSection === 3) {
        // All sections complete, show results
        setShowResults(true);
      } else {
        onSectionComplete();
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      onBack();
    }
  };

  const calculateScores = (): AssessmentScores => {
    // Simple scoring algorithm - in a real app, this would be more sophisticated
    const psychometricResponses = responses.filter(r => r.questionId.startsWith('psych'));
    const technicalResponses = responses.filter(r => r.questionId.startsWith('tech'));
    const wiscarResponses = responses.filter(r => r.questionId.startsWith('will') || 
      r.questionId.startsWith('interest') || r.questionId.startsWith('skill') || 
      r.questionId.startsWith('cognitive') || r.questionId.startsWith('ability') || 
      r.questionId.startsWith('realworld'));

    const avgScore = (responses: AssessmentResponse[]) => {
      const numericScores = responses
        .map(r => typeof r.answer === 'number' ? r.answer : 3)
        .filter(score => score > 0);
      return numericScores.length > 0 ? 
        (numericScores.reduce((sum, score) => sum + score, 0) / numericScores.length) * 20 : 60;
    };

    const psychometric = Math.min(100, Math.max(0, avgScore(psychometricResponses)));
    const technical = Math.min(100, Math.max(0, avgScore(technicalResponses)));
    
    // WISCAR individual scores
    const w = Math.min(100, Math.max(0, avgScore(responses.filter(r => r.questionId.startsWith('will')))));
    const i = Math.min(100, Math.max(0, avgScore(responses.filter(r => r.questionId.startsWith('interest')))));
    const s = Math.min(100, Math.max(0, avgScore(responses.filter(r => r.questionId.startsWith('skill')))));
    const c = Math.min(100, Math.max(0, avgScore(responses.filter(r => r.questionId.startsWith('cognitive')))));
    const a = Math.min(100, Math.max(0, avgScore(responses.filter(r => r.questionId.startsWith('ability')))));
    const r = Math.min(100, Math.max(0, avgScore(responses.filter(r => r.questionId.startsWith('realworld')))));

    const overall = Math.round((psychometric + technical + w + i + s + c + a + r) / 8);

    return { psychometric, technical, w, i, s, c, a, r, overall };
  };

  const generateResults = (): AssessmentResult => {
    const scores = calculateScores();
    const recommendation = scores.overall >= 75 ? 'Yes' : scores.overall >= 50 ? 'Maybe' : 'No';
    const confidence = Math.round((scores.psychometric + scores.technical) / 2);

    return {
      scores,
      recommendation,
      confidence,
      strengths: [
        scores.psychometric >= 70 ? "Strong psychological fit for cloud engineering" : null,
        scores.technical >= 70 ? "Good technical foundation" : null,
        scores.w >= 70 ? "High motivation and drive" : null,
        scores.i >= 70 ? "Strong interest in technology" : null,
      ].filter(Boolean) as string[],
      improvements: [
        scores.technical < 50 ? "Strengthen technical fundamentals" : null,
        scores.s < 50 ? "Gain more hands-on experience" : null,
        scores.c < 50 ? "Develop analytical thinking skills" : null,
      ].filter(Boolean) as string[],
      nextSteps: [
        "Start with AWS Cloud Practitioner certification",
        "Set up an AWS free tier account",
        "Complete hands-on labs with EC2 and S3",
        "Practice with AWS CLI and basic scripting"
      ],
      careerPaths: [
        "AWS Cloud Engineer",
        "Solutions Architect",
        "DevOps Engineer",
        "Cloud Security Specialist"
      ],
      alternativeSuggestions: scores.overall < 50 ? [
        "Consider starting with general IT fundamentals",
        "Explore Docker and containerization first",
        "Focus on Linux system administration"
      ] : undefined
    };
  };

  if (showResults) {
    const results = generateResults();
    return <AssessmentResults results={results} />;
  }

  if (!section || !currentQuestion) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Assessment Complete</h2>
          <p className="text-muted-foreground">Thank you for completing the assessment!</p>
        </CardContent>
      </Card>
    );
  }

  const currentAnswer = getCurrentAnswer();
  const canProceed = currentAnswer !== undefined;

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold">{section.title}</h2>
            <span className="text-sm text-muted-foreground">{section.duration}</span>
          </div>
          <p className="text-muted-foreground">{section.description}</p>
        </CardContent>
      </Card>

      {/* Question */}
      <QuestionCard
        question={currentQuestion}
        answer={currentAnswer}
        onAnswer={handleAnswer}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={totalQuestions}
      />

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={handlePrevious}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <div className="text-sm text-muted-foreground">
          {currentQuestionIndex + 1} of {totalQuestions}
        </div>

        <Button 
          onClick={handleNext} 
          disabled={!canProceed}
          className="px-6"
        >
          {currentQuestionIndex === totalQuestions - 1 ? (
            currentSection === 3 ? 'View Results' : 'Complete Section'
          ) : 'Next'}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};