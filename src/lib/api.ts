// API base URL - should match your backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://pf-backend-6p4g.onrender.com/api';

// Types for the blog system
export interface BlogPost {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  featured: boolean;
  publishedAt: string;
  updatedAt: string;
  slug: string;
  imageUrl?: string;
  readTime?: number;
  sections?: Array<{
    type: 'heading' | 'subheading' | 'paragraph' | 'list' | 'image' | 'quote';
    content: string;
    imageUrl?: string;
    imageAlt?: string;
  }>;
}

export interface BlogPostList {
  posts: BlogPost[];
  total: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

export interface BlogCategory {
  _id: string;
  name: string;
  count: number;
}

// Assessment category types
export type AssessmentCategory = 
  | 'Technology'
  | 'Business & Strategy'
  | 'Design & Experience'
  | 'Healthcare & Life Sciences'
  | 'Engineering & Manufacturing'
  | 'Security & Risk'
  | 'Data & Analytics'
  | 'Digital Marketing & Content'
  | 'Product & Innovation'
  | 'Cloud & Infrastructure'
  | 'Emerging Technologies'
  | 'Customer Success & Support'
  | 'Education & Training'
  | 'Green & Sustainability'
  | 'Legal, Compliance & Governance';

// Types for the dynamic assessment system
export interface DynamicAssessment {
  id: string;
  title: string;
  description: string;
  category: AssessmentCategory;
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
  whatIsDescription?: string;
  typicalCareers?: Array<{ title: string; description: string }>;
  whoShouldConsider?: string[];
  idealTraits?: string[];
  assessmentOverview?: {
    modules?: string[];
    resultsInclude?: string[];
  };
  sections?: AssessmentSection[];
}

export interface AssessmentSection {
  id: string;
  title: string;
  description: string;
  type: 'introduction' | 'psychometric' | 'technical' | 'wiscar';
  weight: number;
  orderIndex: number;
  questions: Question[];
  scoringConfig?: any;
  assessmentId?: string;
}

export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'slider' | 'text' | 'boolean' | 'likert' | 'scenario';
  options?: QuestionOption[];
  scale?: {
    min: number;
    max: number;
    labels?: { min: string; max: string };
    scaleOptions?: Array<{
      value: number;
      label: string;
      description?: string;
    }>;
  };
  required: boolean;
  weight?: number;
  category?: string;
  subcategory?: string;
  orderIndex?: number;
}

export interface QuestionOption {
  id: string;
  text: string;
  value: string | number;
  score?: number;
}

export interface AssessmentSession {
  sessionId: string;
  assessmentId: string;
  userId?: string;
  status: 'in-progress' | 'completed';
  answers: Record<string, any>;
  results?: AssessmentResults;
  startedAt: string;
  completedAt?: string;
  duration?: number;
}

export interface SectionScore {
  sectionId: 'introduction' | 'psychometric' | 'technical' | 'wiscar' | 'results';
  score: number;
  maxScore: number;
  percentage: number;
  performance: 'excellent' | 'good' | 'needsImprovement';
}

export interface WISCARScores {
  will: number;
  interest: number;
  skill: number;
  cognitive: number;
  ability: number;
  realWorld: number;
  overall: number;
}

export interface CareerPath {
  title: string;
  description: string;
  alignmentScore: number;
  matchLevel: 'excellent' | 'good' | 'moderate' | 'poor';
  requirements: string[];
  recommendations: string[];
}

export interface RecommendationItem {
  type: 'overall' | 'section' | 'career' | 'learning';
  title: string;
  description: string;
  confidence: number;
  nextSteps: string[];
}

export interface AssessmentResults {
  overallScore: number;
  recommendation: 'yes' | 'maybe' | 'no';
  confidence: number;
  reason?: string;
  sectionScores: SectionScore[];
  wiscarScores: WISCARScores;
  detailedSubsections?: Record<string, Record<string, number>>;
  careerPaths: CareerPath[];
  recommendations: RecommendationItem[];
  strengths: string[];
  improvements: string[];
  nextSteps: string[];
}

// API service class
class AssessmentAPI {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Get all assessments
  async getAllAssessments(): Promise<DynamicAssessment[]> {
    return this.request<DynamicAssessment[]>('/assessments');
  }

  // Get assessments by category
  async getAssessmentsByCategory(category: string): Promise<DynamicAssessment[]> {
    return this.request<DynamicAssessment[]>(`/assessments/category/${category}`);
  }

  // Get featured assessments
  async getFeaturedAssessments(): Promise<DynamicAssessment[]> {
    return this.request<DynamicAssessment[]>('/assessments/featured');
  }

  // Get specific assessment with sections
  async getAssessmentById(assessmentId: string): Promise<DynamicAssessment & { sections: AssessmentSection[] }> {
    return this.request<DynamicAssessment & { sections: AssessmentSection[] }>(`/assessments/${assessmentId}`);
  }

  // Start a new assessment session
  async startAssessmentSession(assessmentId: string, userId?: string): Promise<{
    sessionId: string;
    assessment: DynamicAssessment;
    sections: AssessmentSection[];
  }> {
    return this.request<{
      sessionId: string;
      assessment: DynamicAssessment;
      sections: AssessmentSection[];
    }>(`/assessments/${assessmentId}/start`, {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });
  }

  // Submit assessment answers
  async submitAssessment(
    assessmentId: string,
    sessionId: string,
    answers: Array<{ questionId: string; sectionId: string; value: any }>,
    userId?: string
  ): Promise<{ sessionId: string; results: AssessmentResults; duration: number }> {
    return this.request<AssessmentResults>(`/assessments/${assessmentId}/submit`, {
      method: 'POST',
      body: JSON.stringify({ sessionId, answers, userId }),
    });
  }

  // Get assessment results
  async getAssessmentResults(assessmentId: string, sessionId: string): Promise<{
    sessionId: string;
    assessmentId: string;
    results: AssessmentResults;
    duration: number;
    completedAt: string;
  }> {
    return this.request<{
      sessionId: string;
      assessmentId: string;
      results: AssessmentResults;
      duration: number;
      completedAt: string;
    }>(`/assessments/${assessmentId}/results/${sessionId}`);
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return this.request<{ status: string; timestamp: string }>('/assessments/health/status');
  }
}

// Export singleton instance
export const assessmentAPI = new AssessmentAPI();

// React Query keys for caching
export const assessmentKeys = {
  all: ['assessments'] as const,
  lists: () => [...assessmentKeys.all, 'list'] as const,
  list: (filters: string) => [...assessmentKeys.lists(), { filters }] as const,
  details: () => [...assessmentKeys.all, 'detail'] as const,
  detail: (id: string) => [...assessmentKeys.details(), id] as const,
  sessions: () => [...assessmentKeys.all, 'session'] as const,
  session: (sessionId: string) => [...assessmentKeys.sessions(), sessionId] as const,
};

// Blog API functions
export const getBlogPosts = async (params: {
  page?: number;
  limit?: number;
  category?: string;
} = {}): Promise<BlogPostList> => {
  const { page = 1, limit = 10, category } = params;
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(category && { category })
  });

  const response = await fetch(`${API_BASE_URL}/blog/posts/public?${queryParams}`);
  if (!response.ok) {
    throw new Error('Failed to fetch blog posts');
  }
  return response.json();
};

export const getBlogCategories = async (): Promise<BlogCategory[]> => {
  const response = await fetch(`${API_BASE_URL}/blog/categories`);
  if (!response.ok) {
    throw new Error('Failed to fetch blog categories');
  }
  return response.json();
};

export const searchBlogPosts = async (
  searchTerm: string,
  page: number = 1,
  limit: number = 10
): Promise<BlogPostList> => {
  const queryParams = new URLSearchParams({
    search: searchTerm,
    page: page.toString(),
    limit: limit.toString()
  });

  const response = await fetch(`${API_BASE_URL}/blog/search?${queryParams}`);
  if (!response.ok) {
    throw new Error('Failed to search blog posts');
  }
  return response.json();
};

export const getBlogPostsByCategory = async (
  category: string,
  page: number = 1,
  limit: number = 10
): Promise<BlogPostList> => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString()
  });

  const response = await fetch(`${API_BASE_URL}/blog/category/${category}?${queryParams}`);
  if (!response.ok) {
    throw new Error('Failed to fetch blog posts by category');
  }
  return response.json();
};

export const getBlogPost = async (slug: string): Promise<BlogPost> => {
  const response = await fetch(`${API_BASE_URL}/blog/posts/${slug}/public`);
  if (!response.ok) {
    throw new Error('Failed to fetch blog post');
  }
  return response.json();
};

// Contact API functions
export const submitContact = async (formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
}): Promise<{ success: boolean; message: string }> => {
  const response = await fetch(`${API_BASE_URL}/contact/send-message`, {
      method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to send contact message');
  }

  return response.json();
}; 