import React from 'react';
import { Shield, Target, Lightbulb, Compass } from 'lucide-react';
import AssessmentCard from '@/components/AssessmentCard';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Security = () => {
  const securityAssessments = [
    {
      id: "cyber-security",
      title: "Cyber Security Assessment",
    },
    {
      id: "ethical-hacking",
      title: "Ethical Hacking Assessment",
    },
    {
      id: "network-security",
      title: "Network Security Assessment",
    },
    {
      id: "information-security",
      title: "Information Security Assessment",
    },
    {
      id: "penetration-testing",
      title: "Penetration Testing Assessment",
    },
    {
      id: "security-analysis",
      title: "Security Analysis Assessment",
    }
  ];

  return (
    <div className="min-h-screen bg-blue-50">
      <Header />
      
      {/* Hero Section */}
      <div className="pt-40 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-left mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Security & Cybersecurity Assessments</h2>
            <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
              Explore cybersecurity career opportunities with our specialized security assessments. From ethical hacking to 
              network security, discover the perfect path in the high-demand cybersecurity industry.
            </p>
          </div>
        </div>
      </div>
      
      {/* Security Assessments Section */}
      <div className="px-4 pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            {/* Left Column */}
            <div className="space-y-3">
              {securityAssessments.slice(0, Math.ceil(securityAssessments.length / 2)).map((assessment, index) => (
                <AssessmentCard key={index} {...assessment} />
              ))}
            </div>
            
            {/* Right Column */}
            <div className="space-y-3">
              {securityAssessments.slice(Math.ceil(securityAssessments.length / 2)).map((assessment, index) => (
                <AssessmentCard key={index + Math.ceil(securityAssessments.length / 2)} {...assessment} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Security; 