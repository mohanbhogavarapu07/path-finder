import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, BookOpen, Brain, Code, Target, TrendingUp } from "lucide-react";
import { Introduction } from "../components/Introduction";
import { AssessmentSection } from "../components/AssessmentSection";
import TechnicalSection from "../components/TechnicalSection";
import { Results } from "../components/Results";
import { psychologicalQuestions, wiscarQuestions } from "../data/questions";
import { 
  calculatePsychologicalScore, 
  calculateTechnicalScore, 
  calculateWISCARScore, 
  generateRecommendation,
  WISCARScore 
} from "../utils/scoring";
import AssessmentLayout from "../../../../components/AssessmentLayout";

// Section definitions for navigation and color
const sections = [
  { id: "introduction", title: "Introduction", icon: BookOpen, color: "bg-blue-500" },
  { id: "psychological", title: "Psychological Fit", icon: Brain, color: "bg-purple-500" },
  { id: "technical", title: "Technical Aptitude", icon: Code, color: "bg-green-500" },
  { id: "wiscar", title: "WISCAR Analysis", icon: Target, color: "bg-orange-500" },
  { id: "results", title: "Your Results", icon: TrendingUp, color: "bg-red-500" }
];

type AssessmentPhase = "introduction" | "psychological" | "technical" | "wiscar" | "results";

const Index = () => {
  const [currentPhase, setCurrentPhase] = useState<AssessmentPhase>("introduction");
  const [answers, setAnswers] = useState<{
    psychological: Record<string, string | number>;
    technical: Record<string, string | number>;
    wiscar: Record<string, string | number>;
  }>({
    psychological: {},
    technical: {},
    wiscar: {}
  });
  const [scores, setScores] = useState<{
    psychological: number;
    technical: number;
    wiscar: WISCARScore;
  } | null>(null);

  const getCurrentSectionIndex = () => {
    return sections.findIndex(section => section.id === currentPhase);
  };
  const progress = ((getCurrentSectionIndex() + 1) / sections.length) * 100;

  const handleSectionComplete = (section: "psychological" | "technical" | "wiscar", sectionAnswers: Record<string, string | number>) => {
    setAnswers(prev => ({
      ...prev,
      [section]: sectionAnswers
    }));
    if (section === "psychological") {
      setCurrentPhase("technical");
    } else if (section === "technical") {
      setCurrentPhase("wiscar");
    } else if (section === "wiscar") {
      const psychScore = calculatePsychologicalScore(answers.psychological);
      const techScore = calculateTechnicalScore(answers.technical);
      const wiscarScore = calculateWISCARScore(sectionAnswers);
      setScores({
        psychological: psychScore,
        technical: techScore,
        wiscar: wiscarScore
      });
      setCurrentPhase("results");
    }
  };

  const handleRestart = () => {
    setCurrentPhase("introduction");
    setAnswers({ psychological: {}, technical: {}, wiscar: {} });
    setScores(null);
  };

  // Section navigation UI
  const renderSectionNavigation = () => (
    <div className="flex mt-4 space-x-4 overflow-x-auto">
      {sections.map((section, index) => {
        const Icon = section.icon;
        const isActive = section.id === currentPhase;
        const isCompleted = getCurrentSectionIndex() > index;
        return (
          <div
            key={section.id}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg min-w-fit ${
              isActive
                ? "bg-blue-100 text-blue-700 border-2 border-blue-300"
                : isCompleted
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-500"
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
  );

  // Main content rendering
  const renderCurrentSection = () => {
    switch (currentPhase) {
      case "introduction":
        return <Introduction onStartAssessment={() => setCurrentPhase("psychological")} />;
      case "psychological":
        return (
          <AssessmentSection
            title="Psychological Fit Assessment"
            description="Evaluate your personality traits, interests, and motivations for Oracle Cloud roles"
            questions={psychologicalQuestions}
            onComplete={(answers) => handleSectionComplete("psychological", answers)}
            onBack={handleRestart}
          />
        );
      case "technical":
        return (
          <TechnicalSection
            onComplete={(data) => {
              setAnswers(prev => ({
                ...prev,
                technical: data.answers
              }));
              setCurrentPhase("wiscar");
            }}
          />
        );
      case "wiscar":
        return (
          <AssessmentSection
            title="WISCAR Framework Analysis"
            description="Comprehensive evaluation using the Will, Interest, Skill, Cognitive, Ability, and Real-world fit model"
            questions={wiscarQuestions}
            onComplete={(answers) => handleSectionComplete("wiscar", answers)}
            onBack={() => setCurrentPhase("technical")}
          />
        );
      case "results":
        return scores && (
          <Results
            psychologicalScore={scores.psychological}
            technicalScore={scores.technical}
            wiscarScore={scores.wiscar}
            recommendation={generateRecommendation(scores.psychological, scores.technical, scores.wiscar)}
            onRestart={handleRestart}
          />
        );
      default:
        return null;
    }
  };

  return (
    <AssessmentLayout>
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Should I Learn Oracle Cloud?
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
          {renderSectionNavigation()}
        </div>
      </div>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 flex-1">
        {renderCurrentSection()}
      </div>
    </AssessmentLayout>
  );
};

export default Index;
