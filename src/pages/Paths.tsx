import React, { useState, useMemo, useEffect } from 'react';
import { Search, Briefcase, Brain, ArrowRight } from 'lucide-react';
import { useAssessments, useAssessmentCategories } from '@/hooks/useAssessments';
import CategoryCard from '@/components/CategoryCard';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AdSenseComponent from '@/components/AdSenseComponent';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Code, Cloud, Shield, BarChart3, Palette, Heart, Wrench, Cog, Monitor, Target, Users, Globe, Zap, Lightbulb } from 'lucide-react';

// Helper functions for category styling - matching exact design from CategoriesSection
const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    'Education': 'border-blue-200',
    'Health': 'border-green-200', 
    'Business': 'border-orange-200',
    'Personal': 'border-gray-200',
    'Technology': 'border-blue-200',
    'Finance': 'border-green-200',
    'Marketing': 'border-orange-200',
    'Leadership': 'border-purple-200',
    'Communication': 'border-teal-200',
    'Creativity': 'border-pink-200',
    'Psychology': 'border-blue-200',
    'Career': 'border-blue-200',
    'Business & Strategy': 'border-purple-200',
    'Design & Experience': 'border-pink-200',
    'Healthcare & Life Sciences': 'border-green-200',
    'Engineering & Manufacturing': 'border-orange-200',
    'Security & Risk': 'border-red-200',
    'Data & Analytics': 'border-indigo-200',
    'Digital Marketing & Content': 'border-teal-200',
    'Product & Innovation': 'border-yellow-200',
    'Cloud & Infrastructure': 'border-cyan-200',
    'Emerging Technologies': 'border-emerald-200',
    'Customer Success & Support': 'border-slate-200',
    'Education & Training': 'border-violet-200',
    'Green & Sustainability': 'border-lime-200',
    'Legal, Compliance & Governance': 'border-gray-200',
    'Cognitive & Learning Intelligence': 'border-blue-200',
    'Personal and emotional intelligence': 'border-rose-200',
  };
  return colors[category] || 'border-gray-200';
};

const getCategoryTextColor = (category: string) => {
  const textColors: Record<string, string> = {
    'Education': 'text-blue-600',
    'Health': 'text-green-600',
    'Business': 'text-orange-600', 
    'Personal': 'text-gray-600',
    'Technology': 'text-blue-600',
    'Finance': 'text-green-600',
    'Marketing': 'text-orange-600',
    'Leadership': 'text-purple-600',
    'Communication': 'text-teal-600',
    'Creativity': 'text-pink-600',
    'Psychology': 'text-blue-600',
    'Career': 'text-blue-600',
    'Business & Strategy': 'text-purple-600',
    'Design & Experience': 'text-pink-600',
    'Healthcare & Life Sciences': 'text-green-600',
    'Engineering & Manufacturing': 'text-orange-600',
    'Security & Risk': 'text-red-600',
    'Data & Analytics': 'text-indigo-600',
    'Digital Marketing & Content': 'text-teal-600',
    'Product & Innovation': 'text-yellow-600',
    'Cloud & Infrastructure': 'text-cyan-600',
    'Emerging Technologies': 'text-emerald-600',
    'Customer Success & Support': 'text-slate-600',
    'Education & Training': 'text-violet-600',
    'Green & Sustainability': 'text-lime-600',
    'Legal, Compliance & Governance': 'text-gray-600',
    'Personal and emotional intelligence': 'text-rose-600',
  };
  return textColors[category] || 'text-gray-600';
};

const getCategoryDotColor = (category: string) => {
  const dotColors: Record<string, string> = {
    'Education': 'bg-blue-500',
    'Health': 'bg-blue-500',
    'Business': 'bg-blue-500',
    'Personal': 'bg-blue-500',
    'Technology': 'bg-blue-500',
    'Finance': 'bg-blue-500',
    'Marketing': 'bg-blue-500',
    'Leadership': 'bg-blue-500',
    'Communication': 'bg-blue-500',
    'Creativity': 'bg-blue-500',
    'Psychology': 'bg-blue-500',
    'Career': 'bg-blue-500',
    'Business & Strategy': 'bg-blue-500',
    'Design & Experience': 'bg-blue-500',
    'Healthcare & Life Sciences': 'bg-blue-500',
    'Engineering & Manufacturing': 'bg-blue-500',
    'Security & Risk': 'bg-blue-500',
    'Data & Analytics': 'bg-blue-500',
    'Digital Marketing & Content': 'bg-blue-500',
    'Product & Innovation': 'bg-blue-500',
    'Cloud & Infrastructure': 'bg-blue-500',
    'Emerging Technologies': 'bg-blue-500',
    'Customer Success & Support': 'bg-blue-500',
    'Education & Training': 'bg-blue-500',
    'Green & Sustainability': 'bg-blue-500',
    'Legal, Compliance & Governance': 'bg-blue-500',
    'Personal and emotional intelligence': 'bg-blue-500',
  };
  return dotColors[category] || 'bg-blue-500';
};

const getCategoryIcon = (category: string) => {
  const icons: Record<string, any> = {
    'Technology': Code,
    'Business & Strategy': Briefcase,
    'Design & Experience': Palette,
    'Healthcare & Life Sciences': Heart,
    'Engineering & Manufacturing': Wrench,
    'Security & Risk': Shield,
    'Data & Analytics': BarChart3,
    'Digital Marketing & Content': Target,
    'Product & Innovation': Lightbulb,
    'Cloud & Infrastructure': Cloud,
    'Emerging Technologies': Zap,
    'Customer Success & Support': Users,
    'Education & Training': Brain,
    'Green & Sustainability': Globe,
    'Legal, Compliance & Governance': Cog,
    'Cognitive & Learning Intelligence': Brain,
    'Personal and emotional intelligence': Heart,
  };
  return icons[category] || Monitor;
};

const Paths = () => {
  const [searchParams] = useSearchParams();
  const pathParam = searchParams.get('path');
  const [activePath, setActivePath] = useState<'career' | 'psychology'>(
    pathParam === 'psychology' ? 'psychology' : 'career'
  );
  const location = useLocation();

  // Scroll to top when path parameter changes
  useEffect(() => {
    if (pathParam) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathParam]);
  
  // Fetch categories and assessments from backend
  const { data: categoryNames, isLoading: categoriesLoading } = useAssessmentCategories();
  const { data: assessments, isLoading: assessmentsLoading } = useAssessments();

  // Generate categories dynamically from backend data
  const allCategories = useMemo(() => {
    if (!categoryNames || categoryNames.length === 0) {
      return [];
    }

    // Create category objects with metadata
    return categoryNames.map(categoryName => ({
      name: categoryName,
      count: assessments?.filter(a => a.category === categoryName).length || 0,
      color: getCategoryColor(categoryName),
      textColor: getCategoryTextColor(categoryName),
      dotColor: getCategoryDotColor(categoryName),
      icon: getCategoryIcon(categoryName),
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

  // Get current categories based on active path
  const currentCategories = activePath === 'career' ? careerCategories : psychologyCategories;

  // Show loading state
  if (categoriesLoading || assessmentsLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        <AdSenseComponent />
        <main className="flex-1">
          <div className="py-8 sm:py-12 lg:py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-foreground-soft">Loading paths...</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Secondary Navigation - Path Categories */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-4 sm:space-x-6 lg:space-x-8 overflow-x-auto py-3 sm:py-4">
            <button
              onClick={() => setActivePath('career')}
              className={`text-sm sm:text-base font-medium whitespace-nowrap transition-colors hover:text-factorbeam-primary px-2 py-1 cursor-pointer flex items-center gap-2 ${
                activePath === 'career'
                  ? "text-factorbeam-primary border-b-2 border-factorbeam-primary"
                  : "text-gray-600"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              Career Development
            </button>
            <button
              onClick={() => setActivePath('psychology')}
              className={`text-sm sm:text-base font-medium whitespace-nowrap transition-colors hover:text-factorbeam-primary px-2 py-1 cursor-pointer flex items-center gap-2 ${
                activePath === 'psychology'
                  ? "text-factorbeam-primary border-b-2 border-factorbeam-primary"
                  : "text-gray-600"
              }`}
            >
              <Brain className="w-4 h-4" />
              Personal Development
            </button>
          </nav>
        </div>
      </div>
      
      <AdSenseComponent />
      
      <main className="flex-1">
        <div className="py-8 sm:py-12 lg:py-16 px-4">
          <div className="max-w-7xl mx-auto">

            {/* Current Path Content */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-8">
                {activePath === 'career' ? (
                  <>
                    <Briefcase className="w-6 h-6 text-blue-600" />
                    <h2 className="text-2xl sm:text-3xl font-bold text-heading">Career Development</h2>
                  </>
                ) : (
                  <>
                    <Brain className="w-6 h-6 text-purple-600" />
                    <h2 className="text-2xl sm:text-3xl font-bold text-heading">Personal Development</h2>
                  </>
                )}
              </div>
              
              <p className="text-foreground-soft mb-8 max-w-3xl">
                {activePath === 'career' 
                  ? "Professional assessments to advance your career, develop technical skills, and build business expertise."
                  : "Psychological and personal assessments to understand yourself better, develop emotional intelligence, and enhance well-being."
                }
              </p>
              
              {currentCategories.length > 0 ? (
                <div className="space-y-12">
                  {currentCategories.map((category, categoryIndex) => {
                    const IconComponent = category.icon;
                    const categoryAssessments = assessments?.filter(a => a.category?.toLowerCase() === category.name.toLowerCase()) || [];
                    
                    return (
                      <div key={`${activePath}-category-${categoryIndex}`} className="border-b border-gray-200 pb-8 last:border-b-0">
                        {/* Category Sub-heading */}
                        <div className="flex items-center gap-3 mb-6">
                          <div className={`p-2 rounded-lg ${category.color.replace('border-', 'bg-').replace('/200', '/100')}`}>
                            <IconComponent className={`w-5 h-5 ${category.textColor}`} />
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900">{category.name}</h3>
                          <span className="text-sm text-gray-500">({categoryAssessments.length} assessments)</span>
                        </div>
                        
                        {/* Assessments Flex Boxes */}
                        {categoryAssessments.length > 0 ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {categoryAssessments.map((assessment, assessmentIndex) => (
                              <Link
                                key={`${category.name}-assessment-${assessmentIndex}`}
                                to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}/${assessment.id}`}
                                className="group block"
                              >
                                <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 p-4 h-full flex flex-col items-center justify-center text-center group-hover:border-primary/30">
                                  {/* Assessment Name Only */}
                                  <h4 className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors">
                                    {assessment.title}
                                  </h4>
                                </div>
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 bg-gray-50 rounded-lg">
                            <p className="text-gray-600 text-sm">No assessments available in this category yet.</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  {activePath === 'career' ? (
                    <>
                      <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No career categories found</h3>
                      <p className="text-gray-600">Career-related categories will appear here once they are available.</p>
                    </>
                  ) : (
                    <>
                      <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No psychology categories found</h3>
                      <p className="text-gray-600">Psychology-related categories will appear here once they are available.</p>
                    </>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Paths;