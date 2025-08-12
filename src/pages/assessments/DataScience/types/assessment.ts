export interface Question {
  id: string;
  type: 'multiple-choice' | 'scale' | 'scenario' | 'matrix';
  question: string;
  options?: string[];
  min?: number;
  max?: number;
  category: string;
  weight?: number;
}

export interface AssessmentSection {
  id: string;
  title: string;
  description: string;
  icon: string;
  questions: Question[];
  scoreWeight: number;
}

export interface AssessmentAnswer {
  questionId: string;
  value: number | string;
}

export interface SectionScore {
  sectionId: string;
  score: number;
  maxScore: number;
  percentage: number;
}

export interface WISCARScore {
  W: number; // Will
  I: number; // Interest
  S: number; // Skill
  C: number; // Cognitive Readiness
  A: number; // Ability to Learn
  R: number; // Real-World Fit
  overall_confidence_score: number;
}

export interface AssessmentResult {
  recommendation: 'yes' | 'maybe' | 'no';
  confidence_score: number;
  reason: string;
  next_steps: string[];
  psychological_fit: number;
  technical_readiness: number;
  wiscar_scores: WISCARScore;
  section_scores: SectionScore[];
  career_recommendations: {
    role: string;
    description: string;
    skill_level: string;
    alignment_score: number;
  }[];
}

export interface Assessment {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  sections: AssessmentSection[];
  what_is_description: string;
  typical_careers: string[];
  who_should_consider: string[];
}