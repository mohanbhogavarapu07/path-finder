import React, { useState, useMemo } from 'react';
import { Search, Filter, TrendingUp, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAssessments } from "@/hooks/useAssessments";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AssessmentCard from "@/components/AssessmentCard";

// Fallback popular assessments for when API data is not available
const fallbackPopularAssessments = [
  {
    id: "1",
    title: "BMI & Health Risk Calculator",
    description: "Calculate your body mass index and understand associated health risks with personalized recommendations.",
    category: "Health & Wellness",
    duration: "5 min",
    difficulty: "Beginner" as const,
    isActive: true,
    featured: true,
    metadata: {
      icon: "heart",
      gradient: "from-green-400 to-blue-500",
      userCount: "203,000",
      tags: ["Health", "Calculator", "Wellness"]
    },
    completions: 203000,
    rating: 4.8,
    tags: ["Health", "Calculator", "Wellness"]
  },
  {
    id: "2",
    title: "Stress Level Evaluation",
    description: "Assess your current stress levels and receive personalized coping strategies and recommendations.",
    category: "Health & Wellness",
    duration: "8 min",
    difficulty: "Beginner" as const,
    isActive: true,
    featured: true,
    metadata: {
      icon: "brain",
      gradient: "from-purple-400 to-pink-500",
      userCount: "156,000",
      tags: ["Health", "Stress", "Wellness"]
    },
    completions: 156000,
    rating: 4.7,
    tags: ["Health", "Stress", "Wellness"]
  },
  {
    id: "3",
    title: "Learning Style Assessment",
    description: "Discover your unique learning preferences and optimize your study methods for better retention and understanding.",
    category: "Education & Training",
    duration: "10 min",
    difficulty: "Beginner" as const,
    isActive: true,
    featured: true,
    metadata: {
      icon: "book",
      gradient: "from-blue-400 to-indigo-500",
      userCount: "125,000",
      tags: ["Education", "Learning", "Study"]
    },
    completions: 125000,
    rating: 4.6,
    tags: ["Education", "Learning", "Study"]
  },
  {
    id: "4",
    title: "Communication Style Profile",
    description: "Understand your communication preferences and learn to adapt your style for better relationships.",
    category: "Personal Development",
    duration: "12 min",
    difficulty: "Intermediate" as const,
    isActive: true,
    featured: true,
    metadata: {
      icon: "message-square",
      gradient: "from-orange-400 to-red-500",
      userCount: "98,000",
      tags: ["Communication", "Personal", "Relationships"]
    },
    completions: 98000,
    rating: 4.5,
    tags: ["Communication", "Personal", "Relationships"]
  },
  {
    id: "5",
    title: "Career Personality Match",
    description: "Find careers that align with your personality traits, values, and interests for long-term satisfaction.",
    category: "Business & Strategy",
    duration: "15 min",
    difficulty: "Intermediate" as const,
    isActive: true,
    featured: true,
    metadata: {
      icon: "briefcase",
      gradient: "from-teal-400 to-cyan-500",
      userCount: "89,000",
      tags: ["Career", "Personality", "Business"]
    },
    completions: 89000,
    rating: 4.4,
    tags: ["Career", "Personality", "Business"]
  },
  {
    id: "6",
    title: "Financial Wellness Score",
    description: "Evaluate your financial health across multiple dimensions and get actionable insights for improvement.",
    category: "Business & Strategy",
    duration: "12 min",
    difficulty: "Advanced" as const,
    isActive: true,
    featured: true,
    metadata: {
      icon: "dollar-sign",
      gradient: "from-emerald-400 to-green-500",
      userCount: "67,000",
      tags: ["Finance", "Wellness", "Business"]
    },
    completions: 67000,
    rating: 4.3,
    tags: ["Finance", "Wellness", "Business"]
  }
];

const Popular = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTimeFilter, setActiveTimeFilter] = useState<'all' | 'month' | 'week'>('all');
  
  // Fetch assessments from backend
  const { data: assessments, isLoading } = useAssessments();

  // Use backend data or fallback to sample data
  const popularAssessments = useMemo(() => {
    if (!assessments || assessments.length === 0) {
      return fallbackPopularAssessments;
    }
    
    // Sort by popularity (userCount) and take top 6
    return assessments
      .sort((a, b) => {
        const aCount = parseInt(a.metadata?.userCount?.replace(/,/g, '') || '0');
        const bCount = parseInt(b.metadata?.userCount?.replace(/,/g, '') || '0');
        return bCount - aCount;
      })
      .slice(0, 6);
  }, [assessments]);

  // Filter assessments based on search term
  const filteredAssessments = useMemo(() => {
    return popularAssessments.filter(assessment =>
      assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [popularAssessments, searchTerm]);

  // Statistics
  const stats = [
    { value: "2.5M+", label: "Assessments Completed", icon: TrendingUp },
    { value: "4.9/5", label: "Average Rating", icon: Clock },
    { value: "94%", label: "Completion Rate", icon: Users },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1">
        <div className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
                <h1 className="text-4xl lg:text-5xl font-bold text-heading">
                  Popular Assessments
                </h1>
              </div>
              <p className="text-lg text-foreground-soft max-w-3xl mx-auto">
                Discover the most popular assessments chosen by our community of over 1 million users.
              </p>
            </div>

            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search assessments, tools, and calculators..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 text-lg border-2 focus:border-primary"
                />
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 cursor-pointer hover:text-primary" />
              </div>
            </div>

            {/* Time Filters */}
            <div className="mb-8">
              <div className="flex justify-center gap-4">
                <Button
                  variant={activeTimeFilter === 'all' ? 'default' : 'outline'}
                  onClick={() => setActiveTimeFilter('all')}
                  className="px-6 py-2"
                >
                  All Time
                </Button>
                <Button
                  variant={activeTimeFilter === 'month' ? 'default' : 'outline'}
                  onClick={() => setActiveTimeFilter('month')}
                  className="px-6 py-2"
                >
                  This Month
                </Button>
                <Button
                  variant={activeTimeFilter === 'week' ? 'default' : 'outline'}
                  onClick={() => setActiveTimeFilter('week')}
                  className="px-6 py-2"
                >
                  This Week
                </Button>
              </div>
            </div>

            {/* Statistics Section */}
            <div className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-soft rounded-lg mb-3">
                      <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-heading">{stat.value}</div>
                    <div className="text-sm text-foreground-soft">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Assessment Cards Grid */}
            <div className="mb-12">
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-foreground-soft">Loading popular assessments...</p>
                </div>
              ) : (
                                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {filteredAssessments.map((assessment, index) => (
                     <AssessmentCard
                       key={assessment.id || index}
                       id={assessment.id}
                       title={assessment.title}
                       description={assessment.description}
                       category={assessment.category}
                       duration={assessment.duration}
                       difficulty={assessment.difficulty}
                       completions={assessment.completions}
                       rating={assessment.rating}
                       tags={assessment.tags}
                       featured={assessment.featured}
                       metadata={assessment.metadata}
                     />
                   ))}
                 </div>
              )}

              {/* No results message */}
              {!isLoading && filteredAssessments.length === 0 && (
                <div className="text-center py-12">
                  <div className="bg-muted rounded-lg p-8">
                    <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-heading mb-2">No assessments found</h3>
                    <p className="text-foreground-soft">
                      Try adjusting your search terms to find what you're looking for.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-primary rounded-2xl p-8 lg:p-12 text-center text-white">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                Ready to Join the Community?
              </h3>
              <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
                Start with our most popular assessments and see why millions of users trust our platform for their personal and professional development.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/assessments">
                  <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                    Explore All Assessments
                  </Button>
                </Link>
                <Link to="/categories">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Browse Categories
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Popular;
