import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  assessmentAPI, 
  assessmentKeys,
  type DynamicAssessment,
  type AssessmentSection,
  type AssessmentResults,
  type AssessmentSession
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

// Hook to start an assessment session
export const useStartAssessmentSession = () => {
  return useMutation({
    mutationFn: ({ assessmentId, userId }: { assessmentId: string; userId?: string }) =>
      assessmentAPI.startAssessmentSession(assessmentId, userId),
  });
};

// Hook to submit assessment answers
export const useSubmitAssessment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ assessmentId, sessionId, answers, userId }: { assessmentId: string; sessionId: string; answers: Array<{ questionId: string; sectionId: string; value: any }>; userId?: string }) =>
      assessmentAPI.submitAssessment(assessmentId, sessionId, answers, userId),
    onSuccess: (data, variables) => {
      // Invalidate session data
      queryClient.invalidateQueries({
        queryKey: assessmentKeys.session(variables.sessionId),
      });
    },
  });
};

// Hook to get assessment results
export const useAssessmentResults = (assessmentId: string, sessionId: string) => {
  return useQuery({
    queryKey: assessmentKeys.session(sessionId),
    queryFn: () => assessmentAPI.getAssessmentResults(assessmentId, sessionId),
    enabled: !!sessionId && !!assessmentId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
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
  
  const categories = Array.from(new Set(assessments.map(a => a.category)));
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

// Hook to get session from cache
export const useSessionFromCache = (sessionId: string) => {
  const queryClient = useQueryClient();
  
  return queryClient.getQueryData<{
    session: AssessmentSession;
    results: AssessmentResults;
  }>(assessmentKeys.session(sessionId));
};
