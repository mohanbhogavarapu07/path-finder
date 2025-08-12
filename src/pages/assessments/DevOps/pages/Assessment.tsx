import { useState } from "react";
import { AssessmentLayout } from "@/components/assessment/AssessmentLayout";
import { AssessmentIntro } from "@/components/assessment/AssessmentIntro";
import { AssessmentQuestion } from "@/components/assessment/AssessmentQuestion";
import { AssessmentResults, AssessmentResult } from "@/components/assessment/AssessmentResults";
import { assessmentQuestions, sectionInfo } from "@/data/assessmentQuestions";
import { BookOpen, Brain, Code, BarChart3, Trophy } from "lucide-react";

type AssessmentStep = 'intro' | 'psychological' | 'technical' | 'wiscar' | 'results';

interface AssessmentState {
  currentStep: AssessmentStep;
  currentQuestionIndex: number;
  answers: Record<string, string | number>;
  results: AssessmentResult | null;
}

export default function Assessment() {
  const [state, setState] = useState<AssessmentState>({
    currentStep: 'intro',
    currentQuestionIndex: 0,
    answers: {},
    results: null
  });

  const steps = [
    { id: 'intro', title: 'Introduction', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'psychological', title: 'Psychological Fit', icon: <Brain className="h-4 w-4" /> },
    { id: 'technical', title: 'Technical Aptitude', icon: <Code className="h-4 w-4" /> },
    { id: 'wiscar', title: 'WISCAR Analysis', icon: <BarChart3 className="h-4 w-4" /> },
    { id: 'results', title: 'Your Results', icon: <Trophy className="h-4 w-4" /> }
  ];

  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.id === state.currentStep);
  };

  const getCurrentQuestions = () => {
    switch (state.currentStep) {
      case 'psychological':
        return sectionInfo.psychological.questions;
      case 'technical':
        return sectionInfo.technical.questions;
      default:
        return [];
    }
  };

  const startAssessment = () => {
    setState(prev => ({
      ...prev,
      currentStep: 'psychological',
      currentQuestionIndex: 0
    }));
  };

  const handleAnswer = (answer: string | number) => {
    const currentQuestions = getCurrentQuestions();
    const currentQuestion = currentQuestions[state.currentQuestionIndex];
    
    setState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [currentQuestion.id]: answer
      }
    }));
  };

  const nextQuestion = () => {
    const currentQuestions = getCurrentQuestions();
    
    if (state.currentQuestionIndex < currentQuestions.length - 1) {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    } else {
      // Move to next section
      if (state.currentStep === 'psychological') {
        setState(prev => ({
          ...prev,
          currentStep: 'technical',
          currentQuestionIndex: 0
        }));
      } else if (state.currentStep === 'technical') {
        // Calculate results and show them
        const results = calculateResults(state.answers);
        setState(prev => ({
          ...prev,
          currentStep: 'results',
          results
        }));
      }
    }
  };

  const previousQuestion = () => {
    if (state.currentQuestionIndex > 0) {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1
      }));
    } else {
      // Move to previous section
      if (state.currentStep === 'technical') {
        const psychQuestions = sectionInfo.psychological.questions;
        setState(prev => ({
          ...prev,
          currentStep: 'psychological',
          currentQuestionIndex: psychQuestions.length - 1
        }));
      } else if (state.currentStep === 'psychological') {
        setState(prev => ({
          ...prev,
          currentStep: 'intro',
          currentQuestionIndex: 0
        }));
      }
    }
  };

  const calculateResults = (answers: Record<string, string | number>): AssessmentResult => {
    // Calculate psychological fit score
    const psychQuestions = sectionInfo.psychological.questions;
    const psychAnswers = psychQuestions.map(q => answers[q.id]);
    const psychScore = calculateSectionScore(psychAnswers, psychQuestions);

    // Calculate technical readiness score
    const techQuestions = sectionInfo.technical.questions;
    const techAnswers = techQuestions.map(q => answers[q.id]);
    const techScore = calculateSectionScore(techAnswers, techQuestions);

    // Calculate WISCAR scores (simplified)
    const wiscarScores = {
      will: calculateWiscarScore(answers, 'will'),
      interest: calculateWiscarScore(answers, 'interest'),
      skill: calculateWiscarScore(answers, 'skill'),
      cognitive: calculateWiscarScore(answers, 'cognitive'),
      ability: calculateWiscarScore(answers, 'ability'),
      realWorld: calculateWiscarScore(answers, 'realWorld')
    };

    const overallScore = (psychScore + techScore) / 2;
    
    let recommendation: 'yes' | 'maybe' | 'no' = 'no';
    if (overallScore >= 75) recommendation = 'yes';
    else if (overallScore >= 50) recommendation = 'maybe';

    return {
      psychologicalFit: psychScore,
      technicalReadiness: techScore,
      wiscarScores,
      overallScore,
      recommendation,
      strengths: generateStrengths(answers, psychScore, techScore),
      improvements: generateImprovements(answers, psychScore, techScore),
      careerPaths: generateCareerPaths(recommendation, psychScore, techScore),
      nextSteps: generateNextSteps(recommendation, psychScore, techScore)
    };
  };

  const calculateSectionScore = (answers: (string | number | undefined)[], questions: any[]) => {
    let totalScore = 0;
    let totalWeight = 0;

    answers.forEach((answer, index) => {
      if (answer !== undefined) {
        const question = questions[index];
        const weight = question.weight || 1;
        let score = 0;

        if (question.type === 'scale') {
          score = ((answer as number) / (question.scaleMax || 5)) * 100;
        } else if (question.type === 'multiple-choice') {
          // Assign scores based on answer quality (simplified)
          const goodAnswers = ['systematic', 'automate', 'containerization', 'code-defined', 'rollback', 'comprehensive'];
          score = goodAnswers.includes(answer as string) ? 80 : 60;
        }

        totalScore += score * weight;
        totalWeight += weight;
      }
    });

    return totalWeight > 0 ? totalScore / totalWeight : 0;
  };

  const calculateWiscarScore = (answers: Record<string, string | number>, dimension: string) => {
    // Simplified WISCAR calculation
    const relevantQuestions = assessmentQuestions.filter(q => 
      (dimension === 'interest' && q.category === 'interest') ||
      (dimension === 'skill' && q.category === 'technical') ||
      (dimension === 'cognitive' && q.category === 'aptitude') ||
      (dimension === 'will' && q.category === 'motivation')
    );

    const scores = relevantQuestions.map(q => {
      const answer = answers[q.id];
      if (answer === undefined) return 50;
      
      if (q.type === 'scale') {
        return ((answer as number) / (q.scaleMax || 5)) * 100;
      }
      return 70; // Default for multiple choice
    });

    return scores.reduce((sum, score) => sum + score, 0) / scores.length;
  };

  const generateStrengths = (answers: Record<string, string | number>, psychScore: number, techScore: number) => {
    const strengths = [];
    if (psychScore > 70) strengths.push("Strong psychological fit for DevOps culture");
    if (techScore > 70) strengths.push("Good technical foundation for DevOps tools");
    if (answers.interest_1 && (answers.interest_1 as number) >= 4) strengths.push("High interest in automation");
    if (answers.personality_3 && (answers.personality_3 as number) >= 4) strengths.push("Good stress management skills");
    if (answers.technical_2 === 'automate') strengths.push("Understanding of CI/CD concepts");
    return strengths.length > 0 ? strengths : ["Willingness to learn new technologies"];
  };

  const generateImprovements = (answers: Record<string, string | number>, psychScore: number, techScore: number) => {
    const improvements = [];
    if (techScore < 60) improvements.push("Strengthen technical fundamentals (Linux, Git, scripting)");
    if (psychScore < 60) improvements.push("Develop systems thinking and process orientation");
    if (answers.technical_1 !== 'ps') improvements.push("Learn basic Linux commands and system administration");
    if (answers.technical_3 !== 'containerization') improvements.push("Study containerization concepts and Docker");
    if (answers.technical_4 !== 'code-defined') improvements.push("Learn Infrastructure as Code principles");
    return improvements.length > 0 ? improvements : ["Continue building on your existing strengths"];
  };

  const generateCareerPaths = (recommendation: string, psychScore: number, techScore: number) => {
    const paths = [];
    if (recommendation === 'yes') {
      paths.push("DevOps Engineer", "Site Reliability Engineer (SRE)", "Cloud Automation Engineer");
    } else if (recommendation === 'maybe') {
      paths.push("QA Automation Engineer", "Cloud Administrator", "Platform Engineer");
    } else {
      paths.push("Technical Support Analyst", "System Administrator", "Software Developer");
    }
    return paths;
  };

  const generateNextSteps = (recommendation: string, psychScore: number, techScore: number) => {
    const steps = [];
    if (recommendation === 'yes') {
      steps.push("Start with Linux, Git, and Docker basics");
      steps.push("Practice with hands-on labs (Katacoda, GitHub Actions)");
      steps.push("Follow FreeCodeCamp DevOps roadmap");
    } else if (recommendation === 'maybe') {
      steps.push("Explore short courses on CI/CD and automation");
      steps.push("Join DevOps communities for learning support");
      steps.push("Practice scripting with Python or Bash");
    } else {
      steps.push("Consider QA Automation or Backend Engineering instead");
      steps.push("Build foundational programming skills first");
      steps.push("Explore related fields that match your interests");
    }
    return steps;
  };

  const restartAssessment = () => {
    setState({
      currentStep: 'intro',
      currentQuestionIndex: 0,
      answers: {},
      results: null
    });
  };

  const renderCurrentStep = () => {
    switch (state.currentStep) {
      case 'intro':
        return <AssessmentIntro onStartAssessment={startAssessment} />;
      
      case 'psychological':
      case 'technical':
        const questions = getCurrentQuestions();
        const currentQuestion = questions[state.currentQuestionIndex];
        return (
          <AssessmentQuestion
            question={currentQuestion}
            answer={state.answers[currentQuestion.id]}
            onAnswer={handleAnswer}
            onNext={nextQuestion}
            onPrevious={previousQuestion}
            currentIndex={state.currentQuestionIndex}
            totalQuestions={questions.length}
            canGoNext={state.answers[currentQuestion.id] !== undefined}
            canGoPrevious={state.currentQuestionIndex > 0 || state.currentStep !== 'psychological'}
          />
        );
      
      case 'results':
        return state.results ? (
          <AssessmentResults 
            result={state.results}
            onRestart={restartAssessment}
          />
        ) : null;
      
      default:
        return null;
    }
  };

  return (
    <AssessmentLayout
      currentStep={getCurrentStepIndex() + 1}
      totalSteps={steps.length}
      steps={steps}
    >
      {renderCurrentStep()}
    </AssessmentLayout>
  );
}