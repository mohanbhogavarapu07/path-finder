import React from 'react';
import { Award, Target, Lightbulb, Compass } from 'lucide-react';
import AssessmentCard from '@/components/AssessmentCard';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Healthcare = () => {
  const healthcareAssessments = [
    {
      id: "medical-coding",
      title: "Medical Coding Assessment",
    },
    {
      id: "healthcare-administration",
      title: "Healthcare Administration Assessment",
    },
    {
      id: "nursing",
      title: "Nursing Assessment",
    },
    {
      id: "pharmacy",
      title: "Pharmacy Assessment",
    },
    {
      id: "public-health",
      title: "Public Health Assessment",
    },
    {
      id: "healthcare-technology",
      title: "Healthcare Technology Assessment",
    }
  ];

  return (
    <div className="min-h-screen bg-blue-50">
      <Header />
      
      {/* Hero Section */}
      <div className="pt-40 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-left mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Healthcare & Medical Assessments</h2>
            <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
              Explore healthcare career opportunities with our specialized medical assessments. From clinical roles to 
              healthcare administration, discover the perfect path in the growing healthcare industry.
            </p>
          </div>
        </div>
      </div>
      
      {/* Healthcare Assessments Section */}
      <div className="px-4 pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            {/* Left Column */}
            <div className="space-y-3">
              {healthcareAssessments.slice(0, Math.ceil(healthcareAssessments.length / 2)).map((assessment, index) => (
                <AssessmentCard key={index} {...assessment} />
              ))}
            </div>
            
            {/* Right Column */}
            <div className="space-y-3">
              {healthcareAssessments.slice(Math.ceil(healthcareAssessments.length / 2)).map((assessment, index) => (
                <AssessmentCard key={index + Math.ceil(healthcareAssessments.length / 2)} {...assessment} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Healthcare; 