
import React, { useEffect } from 'react';
import { Brain, Code, Cloud, Smartphone, Shield, BarChart3, Palette, Briefcase, Award, Heart, Wrench, Cog, Monitor, TrendingUp, Users } from 'lucide-react';
import AssessmentCard from '@/components/AssessmentCard';
import Header from '@/components/layout/Header';
import Footer from '@/components/Footer';
import { useAssessments, useAssessmentCategories } from '@/hooks/useAssessments';
import { DynamicAssessment } from '@/lib/api';
import { useSearchParams } from 'react-router-dom';
import { sampleAssessments } from '@/data/assessments';

const Assessments = () => {
  const { data: apiAssessments, isLoading, error } = useAssessments();
  const { categories } = useAssessmentCategories();
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category');

  // Use API data if available, otherwise fallback to sample data
  const assessments = apiAssessments && apiAssessments.length > 0 ? apiAssessments : sampleAssessments;

  // Simple scroll handling for initial page load with hash
  useEffect(() => {
    if (window.location.hash && !selectedCategory) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  }, [selectedCategory]);

  // Filter assessments by category if one is selected
  const filteredAssessments = selectedCategory 
    ? assessments?.filter(assessment => assessment.category === selectedCategory) || []
    : assessments || [];

  // Group assessments by category (only if no specific category is selected)
  const groupedAssessments = !selectedCategory ? categories.reduce((acc, category) => {
    acc[category] = assessments?.filter(assessment => assessment.category === category) || [];
    return acc;
  }, {} as Record<string, DynamicAssessment[]>) : {};

  // Category icons mapping - now dynamic
  const categoryIcons = {
    'Cloud': Cloud,
    'Data': BarChart3,
    'Technology': Code,
    'Programming': Brain,
    'Management': Users,
    'Business': Briefcase,
    'Medical': Heart,
    'Platform': Cog,
    // Add fallback for any new categories
    'default': Code
  };

  // Category colors mapping - now dynamic
  const categoryColors = {
    'Cloud': 'bg-purple-100 text-purple-700',
    'Data': 'bg-orange-100 text-orange-700',
    'Technology': 'bg-indigo-100 text-indigo-700',
         'Programming': 'bg-[#4CAF50]/10 text-[#4CAF50]',
    'Management': 'bg-green-100 text-green-700',
    'Business': 'bg-yellow-100 text-yellow-700',
    'Medical': 'bg-red-100 text-red-700',
    'Platform': 'bg-teal-100 text-teal-700',
    // Add fallback for any new categories
    'default': 'bg-gray-100 text-gray-700'
  };

  // Helper function to get icon for category
  const getCategoryIcon = (category: string) => {
    return categoryIcons[category as keyof typeof categoryIcons] || categoryIcons.default;
  };

  // Helper function to get color for category
  const getCategoryColor = (category: string) => {
    return categoryColors[category as keyof typeof categoryColors] || categoryColors.default;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-40 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-factorbeam-primary mx-auto"></div>
              <p className="mt-4 text-lg text-muted-foreground">Loading assessments...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error && (!assessments || assessments.length === 0)) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-40 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center">
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <p className="text-lg">Error loading assessments</p>
                <p className="text-sm mt-2">Please try again later</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <div className="pt-40 px-8 md:px-12 lg:px-16">
        <div className="w-full">
          <div className="text-left mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              {selectedCategory ? `${selectedCategory} Assessments` : 'Choose Your Assessment'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
              {selectedCategory 
                ? `Explore our comprehensive range of ${selectedCategory.toLowerCase()} assessments, each designed with cutting-edge psychometric research to provide you with accurate, actionable insights about your ideal career path.`
                : 'Explore our comprehensive range of career assessments, each designed with cutting-edge psychometric research to provide you with accurate, actionable insights about your ideal career path.'
              }
            </p>
          </div>
        </div>
      </div>


      
      {/* Assessment Categories Section */}
      <div className="px-8 md:px-12 lg:px-16 pb-20">
        {error && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm">
              ⚠️ Using sample data. Some features may be limited.
            </p>
          </div>
        )}
        <div className="w-full">
          {selectedCategory ? (
            // Show assessments for specific category
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-lg ${getCategoryColor(selectedCategory)}`}>
                  {React.createElement(getCategoryIcon(selectedCategory), { className: "h-6 w-6" })}
                </div>
                <h3 className="text-2xl font-bold text-foreground">{selectedCategory}</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAssessments.map((assessment) => (
                  <AssessmentCard key={assessment.id} {...assessment} />
                ))}
              </div>
              
              {filteredAssessments.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground">No assessments found for this category.</p>
                </div>
              )}
            </div>
          ) : (
            // Show all categories
            <div className="space-y-16">
              {categories.map((category, categoryIndex) => {
                const Icon = getCategoryIcon(category);
                const color = getCategoryColor(category);
                const categoryAssessments = groupedAssessments[category] || [];
                
                return (
                  <div key={categoryIndex} id={category.toLowerCase()} className="scroll-mt-24">
                    {/* Category Header */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`p-3 rounded-lg ${color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">{category}</h3>
                    </div>
                    
                    {/* Assessment Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categoryAssessments.map((assessment, index) => (
                        <AssessmentCard key={assessment.id} {...assessment} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* How It Works */}
      <div className="px-8 md:px-12 lg:px-16 py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">How Our Assessments Work</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
                              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Choose Assessment</h3>
              <p className="text-muted-foreground text-sm">Select the career path you're interested in exploring</p>
            </div>
            
            <div className="text-center">
                              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Complete Evaluation</h3>
              <p className="text-muted-foreground text-sm">Answer questions about your skills, interests, and preferences</p>
            </div>
            
            <div className="text-center">
                              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Get Analysis</h3>
              <p className="text-muted-foreground text-sm">Receive detailed insights based on scientific assessment methods</p>
            </div>
            
            <div className="text-center">
                              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Plan Your Path</h3>
              <p className="text-muted-foreground text-sm">Use personalized recommendations to guide your career journey</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Assessments;
