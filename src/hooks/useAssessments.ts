import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  assessmentAPI, 
  assessmentKeys,
  API_BASE_URL,
  type DynamicAssessment,
  type AssessmentSection,
  type AssessmentResults
} from '@/lib/api';

// Hook to get all assessments
export const useAssessments = () => {
  return useQuery({
    queryKey: assessmentKeys.lists(),
    queryFn: () => assessmentAPI.getAllAssessments(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook to get assessments by category
export const useAssessmentsByCategory = (category: string) => {
  return useQuery({
    queryKey: assessmentKeys.list(category),
    queryFn: () => assessmentAPI.getAssessmentsByCategory(category),
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Hook to get featured assessments
export const useFeaturedAssessments = () => {
  return useQuery({
    queryKey: [...assessmentKeys.lists(), 'featured'],
    queryFn: () => assessmentAPI.getFeaturedAssessments(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Hook to get a specific assessment with sections
export const useAssessment = (assessmentId: string) => {
  return useQuery({
    queryKey: assessmentKeys.detail(assessmentId),
    queryFn: () => assessmentAPI.getAssessmentById(assessmentId),
    enabled: !!assessmentId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};







// Hook to check API health
export const useAssessmentHealth = () => {
  return useQuery({
    queryKey: [...assessmentKeys.all, 'health'],
    queryFn: () => assessmentAPI.healthCheck(),
    staleTime: 1 * 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
  });
};

// Utility hook to get assessment categories
export const useAssessmentCategories = () => {
  const { data: assessments } = useAssessments();
  
  if (!assessments) return { categories: [], isLoading: true };
  
  // Only allow these three categories
  const allowedCategories = ['Emerging Technologies', 'Engineering & Manufacturing', 'Cognitive & Learning Intelligence'];
  
  // Filter categories to only include allowed ones
  const allCategories = Array.from(new Set(assessments.map(a => a.category)));
  const categories = allCategories.filter(category => allowedCategories.includes(category));
  
  return { categories, isLoading: false };
};

// Hook to get assessment by ID from cache
export const useAssessmentFromCache = (assessmentId: string) => {
  const queryClient = useQueryClient();
  
  return queryClient.getQueryData<{
    assessment: DynamicAssessment;
    sections: AssessmentSection[];
  }>(assessmentKeys.detail(assessmentId));
};

// Hook to start assessment tracking
export const useStartAssessment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ userId, assessmentData }: { userId: string; assessmentData: any }) => {
      const response = await fetch(`${API_BASE_URL}/users/${userId}/start-assessment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(assessmentData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to start assessment tracking');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: assessmentKeys.lists() });
    },
  });
};

// Hook to complete assessment with feedback
export const useCompleteAssessment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ userId, assessmentId, feedback }: { userId: string; assessmentId: string; feedback: any }) => {
      const response = await fetch(`${API_BASE_URL}/users/${userId}/complete-assessment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assessmentId, feedback }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to complete assessment');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: assessmentKeys.lists() });
    },
  });
};

// Hook to get assessment status
export const useAssessmentStatus = (userId: string) => {
  return useQuery({
    queryKey: ['assessmentStatus', userId],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/users/${userId}/assessment-status`);
      if (!response.ok) {
        throw new Error('Failed to get assessment status');
      }
      return response.json();
    },
    enabled: !!userId,
  });
};


