// API Configuration
const API_BASE_URL = 'http://localhost:5000';

// Types
export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  featured: boolean;
  sections: Array<{
    type: 'heading' | 'paragraph' | 'list' | 'subheading' | 'image' | 'quote';
    content: string;
    level: number;
    imageUrl?: string;
    imageAlt?: string;
  }>;
  attachments?: Array<{
    _id: string;
    name: string;
    url: string;
    type: string;
  }>;
  analytics: {
    views: number;
    shares: number;
    likes: number;
  };
}

export interface BlogPostList {
  posts: BlogPost[];
  totalPages: number;
  currentPage: number;
  total: number;
}

export interface AssessmentType {
  id: string;
  title: string;
  category: string;
  description: string;
}

export interface Assessment {
  _id: string;
  name: string;
  email: string;
  age: string;
  gender: string;
  assessmentType: string;
  status: 'started' | 'in-progress' | 'completed' | 'abandoned';
  startedAt: string;
  completedAt?: string;
  timeSpent?: number;
  results?: {
    score: number;
    level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    recommendations: string[];
    strengths: string[];
    areasForImprovement: string[];
    careerPaths: string[];
  };
}

export interface AssessmentAnswer {
  questionId: string;
  selectedOption: string;
  score: number;
  answeredAt: string;
}

// API Client
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    
    // Bind all methods to preserve 'this' context
    this.getBlogPosts = this.getBlogPosts.bind(this);
    this.getFeaturedBlogPosts = this.getFeaturedBlogPosts.bind(this);
    this.getBlogPost = this.getBlogPost.bind(this);
    this.getBlogCategories = this.getBlogCategories.bind(this);
    this.getBlogPostsByCategory = this.getBlogPostsByCategory.bind(this);
    this.searchBlogPosts = this.searchBlogPosts.bind(this);
    this.getAssessmentTypes = this.getAssessmentTypes.bind(this);
    this.getAssessmentStats = this.getAssessmentStats.bind(this);
    this.startAssessment = this.startAssessment.bind(this);
    this.getAssessment = this.getAssessment.bind(this);
    this.submitAssessmentAnswers = this.submitAssessmentAnswers.bind(this);
    this.completeAssessment = this.completeAssessment.bind(this);
    this.getUserAssessments = this.getUserAssessments.bind(this);
    this.submitContact = this.submitContact.bind(this);
    this.subscribeToNewsletter = this.subscribeToNewsletter.bind(this);
    this.getHealthStatus = this.getHealthStatus.bind(this);
    this.getApiStatus = this.getApiStatus.bind(this);
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
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Blog API Methods
  async getBlogPosts(params?: {
    page?: number;
    limit?: number;
    category?: string;
    featured?: boolean;
    search?: string;
  }): Promise<BlogPostList> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.category) searchParams.append('category', params.category);
    if (params?.featured) searchParams.append('featured', params.featured.toString());
    if (params?.search) searchParams.append('search', params.search);

    const queryString = searchParams.toString();
    return this.request<BlogPostList>(`/api/blog/posts/public${queryString ? `?${queryString}` : ''}`);
  }

  async getFeaturedBlogPosts(): Promise<BlogPost[]> {
    return this.request<BlogPost[]>('/api/blog/posts/featured');
  }

  async getBlogPost(slug: string): Promise<BlogPost> {
    return this.request<BlogPost>(`/api/blog/posts/${slug}/public`);
  }

  async getBlogCategories(): Promise<Array<{ _id: string; count: number }>> {
    return this.request<Array<{ _id: string; count: number }>>('/api/blog/categories');
  }

  async getBlogPostsByCategory(category: string, page = 1, limit = 10): Promise<BlogPostList> {
    return this.request<BlogPostList>(`/api/blog/category/${category}?page=${page}&limit=${limit}`);
  }

  async searchBlogPosts(query: string, page = 1, limit = 10): Promise<BlogPostList> {
    return this.request<BlogPostList>(`/api/blog/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`);
  }

  // Assessment API Methods
  async getAssessmentTypes(): Promise<AssessmentType[]> {
    return this.request<AssessmentType[]>('/api/assessment/types');
  }

  async getAssessmentStats(): Promise<Array<{
    _id: string;
    count: number;
    completed: number;
    avgScore: number;
  }>> {
    return this.request<Array<{
      _id: string;
      count: number;
      completed: number;
      avgScore: number;
    }>>('/api/assessment/stats');
  }

  async startAssessment(data: {
    name: string;
    email: string;
    age: string;
    gender: string;
    assessmentType: string;
  }): Promise<Assessment> {
    return this.request<Assessment>('/api/assessment/start', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getAssessment(id: string): Promise<Assessment> {
    return this.request<Assessment>(`/api/assessment/${id}`);
  }

  async submitAssessmentAnswers(id: string, answers: AssessmentAnswer[]): Promise<Assessment> {
    return this.request<Assessment>(`/api/assessment/${id}/answers`, {
      method: 'POST',
      body: JSON.stringify({ answers }),
    });
  }

  async completeAssessment(id: string, results: Assessment['results']): Promise<Assessment> {
    return this.request<Assessment>(`/api/assessment/${id}/complete`, {
      method: 'PUT',
      body: JSON.stringify({ results }),
    });
  }

  async getUserAssessments(email: string): Promise<Assessment[]> {
    return this.request<Assessment[]>(`/api/assessment/user/${email}`);
  }

  // Contact API Methods
  async submitContact(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<{ message: string }> {
    return this.request<{ message: string }>('/api/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Newsletter Subscription
  async subscribeToNewsletter(email: string): Promise<{ message: string }> {
    return this.request<{ message: string }>('/api/subscribers', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // Health Check
  async getHealthStatus(): Promise<{
    status: string;
    timestamp: string;
    uptime: number;
    memory: NodeJS.MemoryUsage;
    environment: string;
  }> {
    return this.request<{
      status: string;
      timestamp: string;
      uptime: number;
      memory: NodeJS.MemoryUsage;
      environment: string;
    }>('/health');
  }

  async getApiStatus(): Promise<{
    status: string;
    database: string;
    timestamp: string;
    version: string;
  }> {
    return this.request<{
      status: string;
      database: string;
      timestamp: string;
      version: string;
    }>('/api/status');
  }
}

// Create and export API client instance
export const apiClient = new ApiClient(API_BASE_URL);

// Export individual methods for convenience
export const {
  getBlogPosts,
  getFeaturedBlogPosts,
  getBlogPost,
  getBlogCategories,
  getBlogPostsByCategory,
  searchBlogPosts,
  getAssessmentTypes,
  getAssessmentStats,
  startAssessment,
  getAssessment,
  submitAssessmentAnswers,
  completeAssessment,
  getUserAssessments,
  submitContact,
  subscribeToNewsletter,
  getHealthStatus,
  getApiStatus,
} = apiClient; 