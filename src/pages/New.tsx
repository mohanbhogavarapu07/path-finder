import React, { useState, useMemo } from 'react';
import { Search, Filter, Calendar, Clock, Users, Zap, Eye, Smartphone, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useAssessments } from "@/hooks/useAssessments";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AssessmentCard from "@/components/AssessmentCard";
import AdSenseComponent from "@/components/AdSenseComponent";

// Fallback new assessments for when API data is not available
const fallbackNewAssessments = [
  {
    id: "1",
    title: "Remote Work Effectiveness",
    description: "Assess your remote work skills and discover strategies to maximize productivity from home.",
    category: "Business",
    duration: "10 min",
    difficulty: "Beginner" as const,
    isActive: true,
    featured: false,
    isNew: true,
    metadata: {
      icon: "briefcase",
      gradient: "from-purple-400 to-pink-500",
      userCount: "5,600",
      tags: ["Remote Work", "Productivity", "Business"]
    },
    completions: 5600,
    rating: 4.6,
    tags: ["Remote Work", "Productivity", "Business"]
  },
  {
    id: "2",
    title: "Sustainability Mindset",
    description: "Discover your environmental consciousness level and get actionable steps for sustainable living.",
    category: "Personal",
    duration: "8 min",
    difficulty: "Beginner" as const,
    isActive: true,
    featured: false,
    isNew: true,
    metadata: {
      icon: "globe",
      gradient: "from-green-400 to-blue-500",
      userCount: "4,100",
      tags: ["Sustainability", "Environment", "Personal"]
    },
    completions: 4100,
    rating: 4.5,
    tags: ["Sustainability", "Environment", "Personal"]
  },
  {
    id: "3",
    title: "Digital Wellness Checkup",
    description: "Evaluate your relationship with technology and create a healthier digital lifestyle plan.",
    category: "Health",
    duration: "15 min",
    difficulty: "Beginner" as const,
    isActive: true,
    featured: false,
    isNew: true,
    metadata: {
      icon: "smartphone",
      gradient: "from-blue-400 to-indigo-500",
      userCount: "3,200",
      tags: ["Digital Wellness", "Health", "Technology"]
    },
    completions: 3200,
    rating: 4.4,
    tags: ["Digital Wellness", "Health", "Technology"]
  },
  {
    id: "4",
    title: "Leadership Style Evolution",
    description: "Next-generation leadership assessment incorporating modern management theories and practices.",
    category: "Business",
    duration: "20 min",
    difficulty: "Advanced" as const,
    isActive: true,
    featured: false,
    isNew: true,
    metadata: {
      icon: "brain",
      gradient: "from-orange-400 to-red-500",
      userCount: "2,900",
      tags: ["Leadership", "Management", "Business"]
    },
    completions: 2900,
    rating: 4.7,
    tags: ["Leadership", "Management", "Business"]
  },
  {
    id: "5",
    title: "AI Learning Readiness Test",
    description: "Evaluate your readiness to work with AI tools and understand your learning curve for new technologies.",
    category: "Technology",
    duration: "12 min",
    difficulty: "Intermediate" as const,
    isActive: true,
    featured: true,
    isNew: true,
    metadata: {
      icon: "zap",
      gradient: "from-cyan-400 to-teal-500",
      userCount: "2,400",
      tags: ["AI", "Technology", "Learning"]
    },
    completions: 2400,
    rating: 4.8,
    tags: ["AI", "Technology", "Learning"]
  },
  {
    id: "6",
    title: "Emotional Intelligence 2.0",
    description: "Advanced assessment of emotional intelligence with updated frameworks and personalized insights.",
    category: "Personal",
    duration: "18 min",
    difficulty: "Advanced" as const,
    isActive: true,
    featured: false,
    isNew: true,
    metadata: {
      icon: "heart",
      gradient: "from-pink-400 to-purple-500",
      userCount: "1,800",
      tags: ["Emotional Intelligence", "Personal", "Psychology"]
    },
    completions: 1800,
    rating: 4.9,
    tags: ["Emotional Intelligence", "Personal", "Psychology"]
  }
];

const New = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'newest' | 'recently'>('newest');
  const navigate = useNavigate();
  
  // Fetch assessments from backend
  const { data: assessments, isLoading } = useAssessments();

  // Use backend data or fallback to sample data
  const newAssessments = useMemo(() => {
    if (!assessments || assessments.length === 0) {
      return fallbackNewAssessments;
    }
    
    // Only allow these three categories
    const allowedCategories = ['Emerging Technologies', 'Engineering & Manufacturing', 'Cognitive & Learning Intelligence'];
    
    // Filter assessments to only include allowed categories
    const filteredAssessments = assessments.filter(assessment => 
      allowedCategories.includes(assessment.category)
    );
    
    // Sort by creation date (newest first) and take top 6
    return filteredAssessments
      .sort((a, b) => {
        // For now, just reverse the order as a proxy for newest
        return -1;
      })
      .slice(0, 6);
  }, [assessments]);

  // Remove local filtering - only use global search navigation
  const filteredAssessments = newAssessments;

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

  // What's New This Month features
  const whatsNewFeatures = [
    {
      title: "AI-Powered Insights",
      description: "Enhanced personalization with machine learning",
      icon: Brain,
      color: "text-purple-600"
    },
    {
      title: "Interactive Results",
      description: "Dynamic visualizations and actionable recommendations",
      icon: Eye,
      color: "text-blue-600"
    },
    {
      title: "Mobile Optimized",
      description: "Seamless experience across all devices",
      icon: Smartphone,
      color: "text-green-600"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <AdSenseComponent />
      
      <main className="flex-1">
        <div className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold text-black mb-4">
                New Assessments
              </h1>
              <p className="text-lg text-foreground-soft max-w-3xl mx-auto">
                Explore our latest assessments featuring cutting-edge research and innovative approaches to personal growth.
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
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className="pl-10 pr-4 py-3 text-lg border-2 border-primary/20 focus:border-primary"
                />

              </div>
            </div>

            {/* Filter Buttons */}
            <div className="mb-8">
              <div className="flex justify-center gap-4">
                <Button
                  variant={activeFilter === 'newest' ? 'default' : 'outline'}
                  onClick={() => setActiveFilter('newest')}
                  className="px-6 py-2 flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Newest First
                </Button>
                <Button
                  variant={activeFilter === 'recently' ? 'default' : 'outline'}
                  onClick={() => setActiveFilter('recently')}
                  className="px-6 py-2 flex items-center gap-2"
                >
                  <Clock className="w-4 h-4" />
                  Recently Added
                </Button>
              </div>
            </div>

            {/* What's New This Month Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-heading mb-6 text-center">
                What's New This Month
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {whatsNewFeatures.map((feature, index) => (
                  <div key={index} className="text-center p-6 rounded-lg border-2 bg-card hover:shadow-custom-md transition-all duration-300">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-soft rounded-lg mb-4">
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-heading mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-foreground-soft">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Assessment Cards Grid */}
            <div className="mb-12">
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-foreground-soft">Loading new assessments...</p>
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
                       isNew={assessment.isNew}
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


          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default New;
