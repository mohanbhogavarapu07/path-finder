export interface QuestionOption {
  id: string;
  text: string;
  value: any;
  score: number;
}

export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'slider' | 'boolean' | 'scenario' | 'text' | 'likert';
  category: string;
  subcategory?: string;
  options: QuestionOption[];
  scale?: {
    min: number;
    max: number;
    labels: {
      min: string;
      max: string;
    };
  };
  required: boolean;
  weight: number;
  orderIndex: number;
}

export interface AssessmentSection {
  id: 'introduction' | 'psychometric' | 'technical' | 'wiscar' | 'results';
  title: string;
  description: string;
  type: 'introduction' | 'psychometric' | 'technical' | 'wiscar' | 'results';
  weight: number;
  orderIndex: number;
  questions: Question[];
  scoringConfig: {
    algorithm: 'sum' | 'average' | 'weighted' | 'custom';
    thresholds: {
      excellent: number;
      good: number;
      needsImprovement: number;
    };
    customScoring?: any;
  };
}

export interface UnifiedAssessment {
  assessmentId: string;
  title: string;
  description: string;
  category: 'Cloud' | 'Data' | 'Technology' | 'Programming' | 'Management' | 'Business' | 'Medical' | 'Platform';
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  isActive: boolean;
  featured: boolean;
  metadata: {
    icon: string;
    gradient: string;
    userCount: string;
    tags: string[];
  };
  whatIsDescription: string;
  typicalCareers: Array<{
    title: string;
    description: string;
  }>;
  whoShouldConsider: string[];
  idealTraits: string[];
  assessmentOverview: {
    modules: string[];
    resultsInclude: string[];
  };
  sections: AssessmentSection[];
  createdAt: string;
  updatedAt: string;
}

export interface SectionProgress {
  sectionId: 'introduction' | 'psychometric' | 'technical' | 'wiscar' | 'results';
  status: 'not-started' | 'in-progress' | 'completed';
  questionsAnswered: number;
  totalQuestions: number;
  startedAt?: string;
  completedAt?: string;
}

export interface AssessmentSession {
  sessionId: string;
  assessmentId: string;
  userId?: string;
  status: 'in-progress' | 'completed' | 'abandoned';
  sectionProgress: {
    introduction: SectionProgress;
    psychometric: SectionProgress;
    technical: SectionProgress;
    wiscar: SectionProgress;
    results: SectionProgress;
  };
  answers: Array<{
    questionId: string;
    sectionId: 'introduction' | 'psychometric' | 'technical' | 'wiscar' | 'results';
    value: any;
    answeredAt: string;
  }>;
  results?: {
    overallScore?: number;
    recommendation?: 'yes' | 'maybe' | 'no';
    confidence?: number;
    reason?: string;
    sectionScores?: Array<{
      sectionId: 'introduction' | 'psychometric' | 'technical' | 'wiscar' | 'results';
      score: number;
      maxScore: number;
      percentage: number;
      performance: 'excellent' | 'good' | 'needsImprovement';
    }>;
    wiscarScores?: {
      will: number;
      interest: number;
      skill: number;
      cognitive: number;
      ability: number;
      realWorld: number;
      overall: number;
    };
    careerPaths?: Array<{
      title: string;
      description: string;
      alignmentScore: number;
      matchLevel: 'excellent' | 'good' | 'moderate' | 'poor';
      requirements: string[];
      recommendations: string[];
    }>;
    recommendations?: Array<{
      type: 'overall' | 'section' | 'career' | 'learning';
      title: string;
      description: string;
      confidence: number;
      nextSteps: string[];
    }>;
    strengths?: string[];
    improvements?: string[];
    nextSteps?: string[];
  };
  metadata?: {
    userAgent?: string;
    ipAddress?: string;
    referrer?: string;
    deviceType?: string;
  };
  startedAt: string;
  completedAt?: string;
  duration: number;
  createdAt: string;
  updatedAt: string;
}

// Constants for section types
export const SECTION_TYPES = {
  INTRODUCTION: 'introduction',
  PSYCHOMETRIC: 'psychometric',
  TECHNICAL: 'technical',
  WISCAR: 'wiscar',
  RESULTS: 'results'
} as const;

export const SECTION_ORDER = [
  SECTION_TYPES.INTRODUCTION,
  SECTION_TYPES.PSYCHOMETRIC,
  SECTION_TYPES.TECHNICAL,
  SECTION_TYPES.WISCAR,
  SECTION_TYPES.RESULTS
] as const;

// Helper function to get section by type
export const getSectionByType = (assessment: UnifiedAssessment, sectionType: keyof typeof SECTION_TYPES) => {
  return assessment.sections.find(section => section.id === SECTION_TYPES[sectionType]);
};

// Helper function to get next section
export const getNextSection = (assessment: UnifiedAssessment, currentSectionId: string) => {
  const currentIndex = SECTION_ORDER.indexOf(currentSectionId as any);
  if (currentIndex === -1 || currentIndex === SECTION_ORDER.length - 1) {
    return null;
  }
  const nextSectionId = SECTION_ORDER[currentIndex + 1];
  return assessment.sections.find(section => section.id === nextSectionId);
};

// Helper function to get previous section
export const getPreviousSection = (assessment: UnifiedAssessment, currentSectionId: string) => {
  const currentIndex = SECTION_ORDER.indexOf(currentSectionId as any);
  if (currentIndex <= 0) {
    return null;
  }
  const previousSectionId = SECTION_ORDER[currentIndex - 1];
  return assessment.sections.find(section => section.id === previousSectionId);
};
