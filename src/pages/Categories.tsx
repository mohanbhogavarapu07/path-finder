import React, { useState, useMemo } from 'react';
import { Search, Filter, ArrowRight, Code, Cloud, Brain, Shield, BarChart3, Palette, Briefcase, Heart, Wrench, Cog, Monitor, Target, Lightbulb, Compass, Globe, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useAssessments, useAssessmentCategories } from "@/hooks/useAssessments";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AdSenseComponent from "@/components/AdSenseComponent";
import { categoryToSlug } from "@/lib/utils";

// Helper functions for category styling
const getCategoryDescription = (category: string) => {
  const descriptions: Record<string, string> = {
    'Technology': 'Programming, cloud computing, and technical assessments',
    'Business & Strategy': 'Management, leadership, and business development',
    'Design & Experience': 'UI/UX design, creative arts, and user experience',
    'Healthcare & Life Sciences': 'Medical, health, and life sciences assessments',
    'Engineering & Manufacturing': 'Engineering, manufacturing, and technical skills',
    'Security & Risk': 'Cybersecurity, risk management, and security assessments',
    'Data & Analytics': 'Data science, analytics, and business intelligence',
    'Digital Marketing & Content': 'Marketing, content creation, and digital strategies',
    'Product & Innovation': 'Product management, innovation, and development',
    'Cloud & Infrastructure': 'Cloud computing, infrastructure, and DevOps',
    'Emerging Technologies': 'AI, ML, blockchain, and cutting-edge technologies',
    'Customer Success & Support': 'Customer service, support, and success management',
    'Education & Training': 'Learning, training, and educational assessments',
    'Green & Sustainability': 'Environmental, sustainability, and green technologies',
    'Legal, Compliance & Governance': 'Legal, compliance, and governance assessments',
    'Cognitive & Learning Intelligence': 'Cognitive abilities, learning styles, and intelligence assessment',
    'Personal and emotional intelligence': 'Personal development, emotional intelligence, and interpersonal skills',
  };
  return descriptions[category] || 'Professional assessments and career guidance';
};

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    'Technology': 'bg-blue-50 border-blue-200',
    'Business & Strategy': 'bg-purple-50 border-purple-200',
    'Design & Experience': 'bg-pink-50 border-pink-200',
    'Healthcare & Life Sciences': 'bg-green-50 border-green-200',
    'Engineering & Manufacturing': 'bg-orange-50 border-orange-200',
    'Security & Risk': 'bg-red-50 border-red-200',
    'Data & Analytics': 'bg-indigo-50 border-indigo-200',
    'Digital Marketing & Content': 'bg-teal-50 border-teal-200',
    'Product & Innovation': 'bg-yellow-50 border-yellow-200',
    'Cloud & Infrastructure': 'bg-cyan-50 border-cyan-200',
    'Emerging Technologies': 'bg-emerald-50 border-emerald-200',
    'Customer Success & Support': 'bg-slate-50 border-slate-200',
    'Education & Training': 'bg-violet-50 border-violet-200',
    'Green & Sustainability': 'bg-lime-50 border-lime-200',
    'Legal, Compliance & Governance': 'bg-gray-50 border-gray-200',
    'Personal and emotional intelligence': 'bg-rose-50 border-rose-200',
  };
  return colors[category] || 'bg-muted border-border';
};

const getCategoryTextColor = (category: string) => {
  const textColors: Record<string, string> = {
    'Technology': 'text-blue-600',
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
  return textColors[category] || 'text-muted-foreground';
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

// Fallback categories for when API data is not available
// No fallback categories - system is now fully dynamic

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'popular' | 'newest'>('all');
  const navigate = useNavigate();
  
  // Fetch categories from backend
  const { data: categoryNames, isLoading: categoriesLoading } = useAssessmentCategories();
  const { data: assessments, isLoading: assessmentsLoading } = useAssessments();

  // Generate categories dynamically from backend data
  const categories = useMemo(() => {
    if (!categoryNames || categoryNames.length === 0) {
      return [];
    }

    // Create category objects with metadata
    return categoryNames.map(categoryName => ({
      name: categoryName,
      description: getCategoryDescription(categoryName),
      count: assessments?.filter(a => a.category === categoryName).length || 0,
      color: getCategoryColor(categoryName),
      textColor: getCategoryTextColor(categoryName),
      icon: getCategoryIcon(categoryName),
    }));
  }, [categoryNames, assessments]);

  // Filter and sort categories based on active filter
  const filteredCategories = useMemo(() => {
    let filtered = [...categories];

    // Apply sorting based on active filter
    switch (activeFilter) {
      case 'popular':
        // Sort by assessment count (most popular first)
        filtered.sort((a, b) => (b.count || 0) - (a.count || 0));
        break;
      case 'newest':
        // Sort by category name alphabetically as a proxy for newest
        // In a real implementation, you'd have a creation date field
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // 'all' - keep original order (alphabetical by default)
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }, [categories, activeFilter]);

  // Handle search navigation
  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/assessments?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // Only navigate if user types and then presses Enter or clicks search
    // Don't filter locally - let the main assessments page handle all filtering
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <AdSenseComponent />
      
      <main className="flex-1">
        <div className="py-8 sm:py-12 lg:py-16 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-8 sm:mb-12">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-heading mb-3 sm:mb-4">
                Browse All Categories
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-foreground-soft max-w-3xl mx-auto px-4">
                Explore our comprehensive collection of assessment categories to find exactly what you're looking for.
              </p>
            </div>

            {/* Search and Filter Section */}
            <div className="mb-8">
              {/* Search Bar */}
              <div className="mb-4 sm:mb-6">
                <div className="relative max-w-2xl mx-auto px-4">
                  <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 sm:w-5 sm:h-5" />
                  <Input
                    type="text"
                    placeholder="Search assessments, tools, and calculators..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className="pl-9 sm:pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base lg:text-lg border-2 border-primary/20 focus:border-primary"
                  />
                </div>
              </div>

              {/* Filter Buttons */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                <Button
                  variant={activeFilter === 'all' ? 'default' : 'outline'}
                  onClick={() => setActiveFilter('all')}
                  className="px-6 py-2 text-sm rounded-md font-medium"
                >
                  All Categories
                </Button>
                <Button
                  variant={activeFilter === 'popular' ? 'default' : 'outline'}
                  onClick={() => setActiveFilter('popular')}
                  className="px-6 py-2 text-sm rounded-md font-medium"
                >
                  Most Popular
                </Button>
                <Button
                  variant={activeFilter === 'newest' ? 'default' : 'outline'}
                  onClick={() => setActiveFilter('newest')}
                  className="px-6 py-2 text-sm rounded-md font-medium"
                >
                  Newest
                </Button>
              </div>
            </div>

            {/* Categories Grid */}
            <div className="mb-12">
              {(categoriesLoading || assessmentsLoading) ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-foreground-soft">Loading categories...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {filteredCategories.map((category, index) => {
                    const IconComponent = category.icon;
                    return (
                      <div
                        key={index}
                 className={`p-4 sm:p-6 rounded-lg border-2 ${category.color} hover:shadow-custom-md transition-all duration-300 group cursor-pointer flex flex-col h-full`}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`p-2 sm:p-3 rounded-lg ${category.color.replace('border-', 'bg-').replace('/200', '/100')}`}>
                            <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 ${category.textColor}`} />
                          </div>
                          <div>
                            <h3 className="text-lg sm:text-xl font-semibold text-heading group-hover:text-primary transition-colors">
                              {category.name}
                            </h3>
                            <Badge variant="outline" className={`${category.textColor} text-xs sm:text-sm mt-1`}>
                              {category.count} assessments
                            </Badge>
                          </div>
                        </div>
                        
                        <p className="text-sm text-foreground-soft mb-4 line-clamp-2 flex-grow">
                          {category.description}
                        </p>
                        
                        <Link to={`/category/${categoryToSlug(category.name)}`} className="mt-auto">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all"
                          >
                            Explore Assessments
                          </Button>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* No results message */}
              {!(categoriesLoading || assessmentsLoading) && filteredCategories.length === 0 && (
                <div className="text-center py-12">
                  <div className="bg-muted rounded-lg p-8">
                    <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-heading mb-2">No categories found</h3>
                    <p className="text-foreground-soft">
                      Try adjusting your search terms or filters to find what you're looking for.
                    </p>
                  </div>
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

export default Categories;
