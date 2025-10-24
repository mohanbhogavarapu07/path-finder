import React, { useMemo } from 'react';
import { Search, Briefcase, Brain, ArrowRight } from 'lucide-react';
import { useAssessments, useAssessmentCategories } from '@/hooks/useAssessments';
import { Link } from 'react-router-dom';


const CategoriesSection: React.FC = () => {
  // Fetch categories and assessments from backend
  const { data: categoryNames, isLoading: categoriesLoading } = useAssessmentCategories();
  const { data: assessments, isLoading: assessmentsLoading } = useAssessments();

  // Generate categories dynamically from backend data
  const allCategories = useMemo(() => {
    if (!categoryNames || categoryNames.length === 0) {
      return [];
    }

    // Create simple category objects with just name and count
    return categoryNames.map(categoryName => ({
      name: categoryName,
      count: assessments?.filter(a => a.category?.toLowerCase() === categoryName.toLowerCase()).length || 0,
    }));
  }, [categoryNames, assessments]);

  // Group categories into Career and Psychology paths
  const careerCategories = useMemo(() => {
    const careerKeywords = ['career', 'business', 'technology', 'finance', 'marketing', 'leadership', 'communication', 'entrepreneurship', 'sales', 'project management', 'data analysis', 'design', 'writing', 'language', 'innovation', 'customer service', 'strategy', 'engineering', 'manufacturing', 'security', 'risk', 'analytics', 'digital', 'product', 'cloud', 'infrastructure', 'emerging', 'customer', 'success', 'support', 'training', 'sustainability', 'legal', 'compliance', 'governance'];
    return allCategories.filter(category => 
      careerKeywords.some(keyword => 
        category.name.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  }, [allCategories]);

  const psychologyCategories = useMemo(() => {
    const psychologyKeywords = ['psychology', 'personal', 'mental health', 'emotional', 'cognitive', 'learning', 'intelligence', 'relationships', 'creativity', 'wellness', 'stress', 'burnout', 'personality', 'behavior', 'health', 'life sciences'];
    return allCategories.filter(category => 
      psychologyKeywords.some(keyword => 
        category.name.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  }, [allCategories]);

  // Show loading state
  if (categoriesLoading || assessmentsLoading) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading paths...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Explore by Path */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Explore by Path
            </h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Search className="w-4 h-4" />
            <span>{allCategories.length} categories available</span>
          </div>
        </div>

        {/* Paths Overview - Two Clickable Square Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {/* Career Path */}
          <Link 
            to="/paths?path=career" 
            className="group block aspect-square"
            onClick={() => {
              // Scroll to top when path link is clicked
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }, 0);
            }}
          >
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 p-4 h-full flex flex-col items-center justify-center text-center group-hover:border-primary/30">
              {/* Path Name Only */}
              <h3 className="text-base font-semibold text-blue-900 group-hover:text-primary transition-colors">
                Career Development
              </h3>
            </div>
          </Link>

          {/* Psychology Path */}
          <Link 
            to="/paths?path=psychology" 
            className="group block aspect-square"
            onClick={() => {
              // Scroll to top when path link is clicked
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }, 0);
            }}
          >
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 p-4 h-full flex flex-col items-center justify-center text-center group-hover:border-primary/30">
              {/* Path Name Only */}
              <h3 className="text-base font-semibold text-purple-900 group-hover:text-primary transition-colors">
                Personal Development
              </h3>
            </div>
          </Link>
        </div>

        {/* Show message if no categories */}
        {allCategories.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-50 rounded-lg p-8">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No categories found</h3>
              <p className="text-gray-600">
                Categories will appear here once they are available.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoriesSection;
