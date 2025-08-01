import React from 'react';
import { Palette, Target, Lightbulb, Compass } from 'lucide-react';
import AssessmentCard from '@/components/AssessmentCard';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Design = () => {
  const designAssessments = [
    {
      id: "ui-ux-design",
      title: "UI/UX Design Assessment",
    },
    {
      id: "graphic-design",
      title: "Graphic Design Assessment",
    },
    {
      id: "web-design",
      title: "Web Design Assessment",
    },
    {
      id: "product-design",
      title: "Product Design Assessment",
    },
    {
      id: "interaction-design",
      title: "Interaction Design Assessment",
    },
    {
      id: "design-thinking",
      title: "Design Thinking Assessment",
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-blue-100">
      <Header />
      
      {/* Hero Section */}
      <div className="pt-40 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-left mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Design & Creative Assessments</h2>
            <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
              Discover your creative potential with our comprehensive design assessments. From UI/UX to graphic design, 
              find the perfect creative career path that matches your artistic talents and design thinking abilities.
            </p>
          </div>
        </div>
      </div>
      
      {/* Design Assessments Section */}
      <div className="px-4 pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            {/* Left Column */}
            <div className="space-y-3">
              {designAssessments.slice(0, Math.ceil(designAssessments.length / 2)).map((assessment, index) => (
                <AssessmentCard key={index} {...assessment} />
              ))}
            </div>
            
            {/* Right Column */}
            <div className="space-y-3">
              {designAssessments.slice(Math.ceil(designAssessments.length / 2)).map((assessment, index) => (
                <AssessmentCard key={index + Math.ceil(designAssessments.length / 2)} {...assessment} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Design; 