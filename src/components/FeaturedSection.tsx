import { ArrowRight, TrendingUp, Award, Users, Code, Cloud, Brain, Shield, BarChart3, Palette, Briefcase, Heart, Wrench, Cog, Monitor, Target, Lightbulb, Compass, Globe, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAssessments } from "@/hooks/useAssessments";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { categoryToSlug } from "@/lib/utils";

// Helper functions for category styling (moved outside component to avoid hoisting issues)
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
    'Technology': 'bg-primary-soft border-primary/20',
    'Business & Strategy': 'bg-secondary-soft border-secondary/20',
    'Design & Experience': 'bg-highlight-soft border-highlight/20',
    'Healthcare & Life Sciences': 'bg-red-50 border-red-200',
    'Engineering & Manufacturing': 'bg-blue-50 border-blue-200',
    'Security & Risk': 'bg-orange-50 border-orange-200',
    'Data & Analytics': 'bg-purple-50 border-purple-200',
    'Digital Marketing & Content': 'bg-green-50 border-green-200',
    'Product & Innovation': 'bg-indigo-50 border-indigo-200',
    'Cloud & Infrastructure': 'bg-cyan-50 border-cyan-200',
    'Emerging Technologies': 'bg-pink-50 border-pink-200',
    'Customer Success & Support': 'bg-teal-50 border-teal-200',
    'Education & Training': 'bg-yellow-50 border-yellow-200',
    'Green & Sustainability': 'bg-emerald-50 border-emerald-200',
    'Legal, Compliance & Governance': 'bg-gray-50 border-gray-200',
  };
  return colors[category] || 'bg-muted border-border';
};

const getCategoryTextColor = (category: string) => {
  const textColors: Record<string, string> = {
    'Technology': 'text-primary',
    'Business & Strategy': 'text-secondary',
    'Design & Experience': 'text-highlight',
    'Healthcare & Life Sciences': 'text-red-600',
    'Engineering & Manufacturing': 'text-blue-600',
    'Security & Risk': 'text-orange-600',
    'Data & Analytics': 'text-purple-600',
    'Digital Marketing & Content': 'text-green-600',
    'Product & Innovation': 'text-indigo-600',
    'Cloud & Infrastructure': 'text-cyan-600',
    'Emerging Technologies': 'text-pink-600',
    'Customer Success & Support': 'text-teal-600',
    'Education & Training': 'text-yellow-600',
    'Green & Sustainability': 'text-emerald-600',
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

const FeaturedSection = () => {
  const stats = [
    { label: "Active Assessments", value: "300+", icon: Award },
    { label: "Monthly Users", value: "250K+", icon: Users },
    { label: "Success Rate", value: "94%", icon: TrendingUp },
  ];

  // Fetch assessments from backend to get categories
  const { data: assessments, isLoading } = useAssessments();

  // Generate categories from assessment data
  const categories = useMemo(() => {
    if (!assessments || assessments.length === 0) {
      // Fallback categories if no data
      return [
        {
          name: "Technology",
          description: "Programming, cloud computing, and technical assessments",
          count: 0,
          color: "bg-primary-soft border-primary/20",
          textColor: "text-primary",
          icon: Code,
        },
        {
          name: "Business & Strategy",
          description: "Management, leadership, and business development",
          count: 0,
          color: "bg-secondary-soft border-secondary/20",
          textColor: "text-secondary",
          icon: Briefcase,
        },
        {
          name: "Data & Analytics",
          description: "Data science, analytics, and business intelligence",
          count: 0,
          color: "bg-highlight-soft border-highlight/20",
          textColor: "text-highlight",
          icon: BarChart3,
        },
        {
          name: "Design & Experience",
          description: "UI/UX design, creative arts, and user experience",
          count: 0,
          color: "bg-muted border-border",
          textColor: "text-muted-foreground",
          icon: Palette,
        },
      ];
    }

    // Get unique categories from assessments
    const categoryMap = new Map();
    
    // Only allow these two categories
    const allowedCategories = ['Emerging Technologies', 'Engineering & Manufacturing'];
    
    assessments.forEach(assessment => {
      const category = assessment.category;
      // Only process allowed categories
      if (allowedCategories.includes(category) && !categoryMap.has(category)) {
        categoryMap.set(category, {
          name: category,
          description: getCategoryDescription(category),
          count: 0,
          color: getCategoryColor(category),
          textColor: getCategoryTextColor(category),
          icon: getCategoryIcon(category),
        });
      }
      // Count assessments for allowed categories
      if (allowedCategories.includes(category)) {
        categoryMap.get(category).count++;
      }
    });

    // Convert to array and take first 4 categories (should be max 2 now)
    return Array.from(categoryMap.values()).slice(0, 4);
  }, [assessments]);

  return (
    <div className="py-8 sm:py-12 lg:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Categories Grid */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
            <h3 className="text-xl sm:text-2xl font-bold text-heading text-center sm:text-left">Explore by Category</h3>
            <Link to="/categories" className="flex justify-center sm:justify-start">
              <Button variant="outline" className="flex items-center gap-2 text-sm sm:text-base">
                <span className="hidden sm:inline">View All Categories</span>
                <span className="sm:hidden">View All</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          
          {isLoading ? (
            <div className="text-center py-8 sm:py-12">
              <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-sm sm:text-base text-foreground-soft">Loading categories...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {categories.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <div
                    key={index}
                    className={`p-6 rounded-lg border-2 ${category.color} hover:shadow-custom-md transition-all duration-300 group cursor-pointer`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg ${category.color.replace('border-', 'bg-').replace('/20', '/10')}`}>
                          <IconComponent className={`w-4 h-4 ${category.textColor}`} />
                        </div>
                        <h4 className="text-lg font-semibold text-heading group-hover:text-primary transition-colors">
                          {category.name}
                        </h4>
                      </div>
                      <Badge variant="outline" className={`${category.textColor} text-sm`}>
                        {category.count}
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground-soft mb-4 line-clamp-2">
                      {category.description}
                    </p>
                    <Link to={`/category/${categoryToSlug(category.name)}`}>
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
        </div>

        {/* Stats Section */}
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-primary-soft text-primary border-primary/20 px-4 py-2">
            <TrendingUp className="w-4 h-4 mr-2" />
            Trusted by Professionals Worldwide
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-heading mb-4">
            Comprehensive Assessment Platform
          </h2>
          <p className="text-lg text-foreground-soft max-w-3xl mx-auto mb-8">
            Join thousands of individuals and organizations using our scientifically-backed assessments
            to unlock potential, drive growth, and achieve measurable results.
          </p>
          
     
        </div>

      </div>
    </div>
  );
};

export default FeaturedSection;

