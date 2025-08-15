
import React, { useEffect } from 'react';
import { Brain, Code, Cloud, Smartphone, Shield, BarChart3, Palette, Briefcase, Award, Heart, Wrench, Cog, Monitor, TrendingUp, Users } from 'lucide-react';
import AssessmentCard from '@/components/AssessmentCard';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { assessments, assessmentCategories } from '@/data/assessments';

const Assessments = () => {
  // Simple scroll handling for initial page load with hash
  useEffect(() => {
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  }, []);

  // Group assessments by category
  const groupedAssessments = assessmentCategories.reduce((acc, category) => {
    acc[category] = assessments.filter(assessment => assessment.category === category);
    return acc;
  }, {} as Record<string, typeof assessments>);

  // Category icons mapping
  const categoryIcons = {
    'Cloud': Cloud,
    'Data': BarChart3,
    'Technology': Code,
    'Programming': Brain,
    'Management': Users,
    'Business': Briefcase,
    'Medical': Heart,
    'Platform': Cog
  };

  // Category colors mapping
  const categoryColors = {
    'Cloud': 'bg-purple-100 text-purple-700',
    'Data': 'bg-orange-100 text-orange-700',
    'Technology': 'bg-indigo-100 text-indigo-700',
    'Programming': 'bg-blue-100 text-blue-700',
    'Management': 'bg-green-100 text-green-700',
    'Business': 'bg-yellow-100 text-yellow-700',
    'Medical': 'bg-red-100 text-red-700',
    'Platform': 'bg-teal-100 text-teal-700'
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <div className="pt-40 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-left mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Choose Your Assessment</h2>
            <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
              Explore our comprehensive range of career assessments, each designed with cutting-edge psychometric research 
              to provide you with accurate, actionable insights about your ideal career path.
            </p>
          </div>
        </div>
      </div>
      
      {/* Assessment Categories Section */}
      <div className="px-4 pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="space-y-16">
            {assessmentCategories.map((category, categoryIndex) => {
              const Icon = categoryIcons[category as keyof typeof categoryIcons] || Code;
              const color = categoryColors[category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-700';
              const anchorId = category.toLowerCase();
              const categoryAssessments = groupedAssessments[category] || [];
              
              return (
                <div key={categoryIndex} id={anchorId} className="scroll-mt-24">
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-3 rounded-lg ${color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{category}</h3>
                  </div>
                  
                  {/* Two Column Layout for Assessments */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
                    {/* Left Column */}
                    <div className="space-y-3">
                      {categoryAssessments.slice(0, Math.ceil(categoryAssessments.length / 2)).map((assessment, index) => (
                        <AssessmentCard key={assessment.id} {...assessment} />
                      ))}
                    </div>
                    
                    {/* Right Column */}
                    <div className="space-y-3">
                      {categoryAssessments.slice(Math.ceil(categoryAssessments.length / 2)).map((assessment, index) => (
                        <AssessmentCard key={assessment.id} {...assessment} />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="px-4 py-16">
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
