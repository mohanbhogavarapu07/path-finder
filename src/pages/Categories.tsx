import React, { useState, useMemo } from 'react';
import { Search, Filter, ArrowRight, Code, Cloud, Brain, Shield, BarChart3, Palette, Briefcase, Heart, Wrench, Cog, Monitor, Target, Lightbulb, Compass, Globe, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useAssessments } from "@/hooks/useAssessments";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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
  };
  return icons[category] || Monitor;
};

// Fallback categories for when API data is not available
const fallbackCategories = [
  {
    name: "Education",
    description: "Learning assessments, skill tests, and educational tools",
    count: 89,
    color: "bg-blue-50 border-blue-200",
    textColor: "text-blue-600",
    icon: Brain,
  },
  {
    name: "Health & Wellness",
    description: "Health calculators, fitness assessments, and wellness tools",
    count: 76,
    color: "bg-green-50 border-green-200",
    textColor: "text-green-600",
    icon: Heart,
  },
  {
    name: "Business",
    description: "Professional development, finance calculators, and business tools",
    count: 95,
    color: "bg-purple-50 border-purple-200",
    textColor: "text-purple-600",
    icon: Briefcase,
  },
  {
    name: "Personal Development",
    description: "Self-improvement tools, personality tests, and growth assessments",
    count: 62,
    color: "bg-orange-50 border-orange-200",
    textColor: "text-orange-600",
    icon: Target,
  },
  {
    name: "Technology",
    description: "Technical assessments, coding challenges, and IT tools",
    count: 45,
    color: "bg-cyan-50 border-cyan-200",
    textColor: "text-cyan-600",
    icon: Code,
  },
  {
    name: "Finance",
    description: "Financial planning, investment tools, and economic calculators",
    count: 38,
    color: "bg-indigo-50 border-indigo-200",
    textColor: "text-indigo-600",
    icon: BarChart3,
  },
];

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'popular' | 'newest'>('all');
  
  // Fetch assessments from backend
  const { data: assessments, isLoading } = useAssessments();

  // Generate categories from assessment data or use fallback
  const categories = useMemo(() => {
    if (!assessments || assessments.length === 0) {
      return fallbackCategories;
    }

    // Get unique categories from assessments
    const categoryMap = new Map();
    
    assessments.forEach(assessment => {
      const category = assessment.category;
      if (!categoryMap.has(category)) {
        categoryMap.set(category, {
          name: category,
          description: getCategoryDescription(category),
          count: 0,
          color: getCategoryColor(category),
          textColor: getCategoryTextColor(category),
          icon: getCategoryIcon(category),
        });
      }
      categoryMap.get(category).count++;
    });

    return Array.from(categoryMap.values());
  }, [assessments]);

  // Filter categories based on search term
  const filteredCategories = useMemo(() => {
    let filtered = categories.filter(category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Apply sorting based on active filter
    switch (activeFilter) {
      case 'popular':
        filtered.sort((a, b) => b.count - a.count);
        break;
      case 'newest':
        // For now, just reverse the order as a proxy for newest
        filtered.reverse();
        break;
      default:
        // 'all' - keep original order
        break;
    }

    return filtered;
  }, [categories, searchTerm, activeFilter]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1">
        <div className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold text-heading mb-4">
                Browse All Categories
              </h1>
              <p className="text-lg text-foreground-soft max-w-3xl mx-auto">
                Explore our comprehensive collection of assessment categories to find exactly what you're looking for.
              </p>
            </div>

            {/* Search and Filter Section */}
            <div className="mb-8">
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search assessments, tools, and calculators..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 text-lg border-2 focus:border-primary"
                />

              </div>

              {/* Filter Buttons */}
              <div className="flex justify-center gap-4">
                <Button
                  variant={activeFilter === 'all' ? 'default' : 'outline'}
                  onClick={() => setActiveFilter('all')}
                  className="px-6 py-2"
                >
                  All Categories
                </Button>
                <Button
                  variant={activeFilter === 'popular' ? 'default' : 'outline'}
                  onClick={() => setActiveFilter('popular')}
                  className="px-6 py-2"
                >
                  Most Popular
                </Button>
                <Button
                  variant={activeFilter === 'newest' ? 'default' : 'outline'}
                  onClick={() => setActiveFilter('newest')}
                  className="px-6 py-2"
                >
                  Newest
                </Button>
              </div>
            </div>

            {/* Categories Grid */}
            <div className="mb-12">
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-foreground-soft">Loading categories...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCategories.map((category, index) => {
                    const IconComponent = category.icon;
                    return (
                      <div
                        key={index}
                        className={`p-6 rounded-lg border-2 ${category.color} hover:shadow-custom-md transition-all duration-300 group cursor-pointer relative`}
                      >

                        
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`p-3 rounded-lg ${category.color.replace('border-', 'bg-').replace('/200', '/100')}`}>
                            <IconComponent className={`w-6 h-6 ${category.textColor}`} />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-heading group-hover:text-primary transition-colors">
                              {category.name}
                            </h3>
                            <Badge variant="outline" className={`${category.textColor} text-sm mt-1`}>
                              {category.count} assessments
                            </Badge>
                          </div>
                        </div>
                        
                        <p className="text-sm text-foreground-soft mb-4 line-clamp-2">
                          {category.description}
                        </p>
                        
                        <Link to={`/assessments?category=${encodeURIComponent(category.name)}`}>
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
              {!isLoading && filteredCategories.length === 0 && (
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
