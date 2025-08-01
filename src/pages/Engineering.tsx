import React from 'react';
import { Code, Target, Lightbulb, Compass } from 'lucide-react';
import AssessmentCard from '@/components/AssessmentCard';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Engineering = () => {
  const engineeringAssessments = [
    {
      id: "mechanical-engineering",
      title: "Mechanical Engineering Assessment",
    },
    {
      id: "electrical-engineering",
      title: "Electrical Engineering Assessment",
    },
    {
      id: "civil-engineering",
      title: "Civil Engineering Assessment",
    },
    {
      id: "chemical-engineering",
      title: "Chemical Engineering Assessment",
    },
    {
      id: "computer-engineering",
      title: "Computer Engineering Assessment",
    },
    {
      id: "biomedical-engineering",
      title: "Biomedical Engineering Assessment",
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-blue-100">
      <Header />
      
      {/* Hero Section */}
      <div className="pt-40 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-left mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Engineering Assessments</h2>
            <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
              Discover your engineering potential with our comprehensive assessments. From mechanical to computer engineering, 
              find the perfect engineering specialization that matches your technical skills and problem-solving abilities.
            </p>
          </div>
        </div>
      </div>
      
      {/* Engineering Assessments Section */}
      <div className="px-4 pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            {/* Left Column */}
            <div className="space-y-3">
              {engineeringAssessments.slice(0, Math.ceil(engineeringAssessments.length / 2)).map((assessment, index) => (
                <AssessmentCard key={index} {...assessment} />
              ))}
            </div>
            
            {/* Right Column */}
            <div className="space-y-3">
              {engineeringAssessments.slice(Math.ceil(engineeringAssessments.length / 2)).map((assessment, index) => (
                <AssessmentCard key={index + Math.ceil(engineeringAssessments.length / 2)} {...assessment} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Engineering; 