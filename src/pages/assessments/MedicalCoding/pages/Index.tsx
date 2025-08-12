import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "../components/ProgressBar";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Brain, Code, Target, TrendingUp, CheckCircle, Clock, Award, Users, Shield, Stethoscope, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FeatureCard } from "../components/FeatureCard";
import { CareerCard } from "../components/CareerCard";
import AssessmentLayout from '../../../../components/AssessmentLayout';
import PsychologicalFit from "../pages/PsychologicalFit";
import TechnicalAptitude from "../pages/TechnicalAptitude";
import WiscarAnalysis from "../pages/WiscarAnalysis";
import Results from "../pages/Results";

const Index = () => {
  const [currentSection, setCurrentSection] = useState("intro");
  const [assessmentData, setAssessmentData] = useState({
    psychometric: {},
    technical: {},
    wiscar: {},
    completed: false
  });
  const navigate = useNavigate();

  const sections = [
    { id: "intro", title: "Introduction", icon: BookOpen },
    { id: "psychological", title: "Psychological Fit", icon: Brain },
    { id: "technical", title: "Technical Aptitude", icon: Code },
    { id: "wiscar", title: "WISCAR Analysis", icon: Target },
    { id: "results", title: "Your Results", icon: TrendingUp }
  ];

  const getCurrentSectionIndex = () => {
    return sections.findIndex(section => section.id === currentSection);
  };

  const progress = ((getCurrentSectionIndex() + 1) / sections.length) * 100;

  const updateAssessmentData = (section, data) => {
    setAssessmentData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const goToNextSection = () => {
    const currentIndex = getCurrentSectionIndex();
    if (currentIndex < sections.length - 1) {
      setCurrentSection(sections[currentIndex + 1].id);
    }
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case "intro":
        return (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Hero Section */}
            <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                  Discover Your Medical Coding Career Potential
                </CardTitle>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Take our comprehensive assessment to evaluate your psychological fit, technical readiness, 
                  and career alignment for a future in Medical Coding.
                </p>
              </CardHeader>
              <CardContent className="text-center">
                <div className="flex justify-center items-center space-x-6 mb-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>25-30 minutes</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Award className="w-4 h-4" />
                    <span>Personalized Results</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>Career Guidance</span>
                  </div>
                </div>
                <Button 
                  onClick={goToNextSection} 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                >
                  Start Assessment
                  <TrendingUp className="ml-2 w-5 h-5" />
                </Button>
              </CardContent>
            </Card>
            {/* What is Medical Coding */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Stethoscope className="w-6 h-6 text-blue-600" />
                  <span>What is Medical Coding?</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  Medical coding involves transforming healthcare diagnoses, procedures, medical services, 
                  and equipment into universal <strong>alphanumeric codes</strong> (e.g., ICD-10, CPT, HCPCS). 
                  These codes are essential for billing, insurance claims, data analysis, and legal compliance in healthcare.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Universal Standards</h4>
                    <p className="text-sm text-blue-700">Standardized coding systems used globally</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Data Analysis</h4>
                    <p className="text-sm text-green-700">Essential for healthcare analytics and reporting</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">Compliance</h4>
                    <p className="text-sm text-purple-700">Critical for legal and regulatory requirements</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Career Opportunities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-6 h-6 text-green-600" />
                  <span>Career Opportunities</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <CareerCard title="Medical Coder" description="Assign standard codes to diagnoses and procedures" />
                  <CareerCard title="Clinical Data Analyst" description="Analyze healthcare data for insights and reporting" />
                  <CareerCard title="Medical Billing Specialist" description="Handle insurance claims and billing processes" />
                  <CareerCard title="Health Information Technician" description="Manage and maintain digital health records" />
                  <CareerCard title="Coding Auditor" description="Review and ensure accuracy of medical codes" />
                  <CareerCard title="Compliance Officer" description="Ensure healthcare coding meets regulatory standards" />
                </div>
              </CardContent>
            </Card>
            {/* Ideal Traits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="w-6 h-6 text-orange-600" />
                  <span>Ideal Traits & Skills</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700">Detail-oriented and methodical thinkers</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700">Enjoy repetitive but purposeful tasks</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700">Comfortable with rules and structure</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700">Analytical yet patient mindset</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700">Strong memory and recall abilities</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700">Ability to work independently</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* What You'll Discover */}
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle>What You'll Discover</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Assessment Modules:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center space-x-2">
                        <Badge variant="outline" className="bg-purple-50 text-purple-700">1</Badge>
                        <span className="text-sm">Psychological Fit Evaluation</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Badge variant="outline" className="bg-green-50 text-green-700">2</Badge>
                        <span className="text-sm">Technical Aptitude Testing</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Badge variant="outline" className="bg-orange-50 text-orange-700">3</Badge>
                        <span className="text-sm">WISCAR Framework Analysis</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Your Results Include:</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Personalized fit score (0-100)</li>
                      <li>• Detailed trait analysis</li>
                      <li>• Technical readiness assessment</li>
                      <li>• Career pathway recommendations</li>
                      <li>• Next steps and learning resources</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case "psychological":
        return (
          <PsychologicalFit
            onComplete={data => {
              updateAssessmentData("psychometric", data);
              goToNextSection();
            }}
          />
        );
      case "technical":
        return (
          <TechnicalAptitude
            onComplete={data => {
              updateAssessmentData("technical", data);
              goToNextSection();
            }}
          />
        );
      case "wiscar":
        return (
          <WiscarAnalysis
            onComplete={data => {
              updateAssessmentData("wiscar", data);
              setAssessmentData(prev => ({ ...prev, completed: true }));
              goToNextSection();
            }}
          />
        );
      case "results":
        return <Results assessmentData={assessmentData} onRestart={() => setCurrentSection("intro")} />;
      default:
        return null;
    }
  };

  return (
    <AssessmentLayout>
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Should I Learn Medical Coding?
              </h1>
              <p className="text-gray-600 text-sm">
                Comprehensive Career Assessment & Guidance
              </p>
            </div>
            <Badge variant="outline" className="text-sm">
              {Math.round(progress)}% Complete
            </Badge>
          </div>
          {/* Progress Bar */}
          <div className="mt-4">
            <ProgressBar value={progress} className="h-2" />
          </div>
          {/* Section Navigation */}
          <div className="flex mt-4 space-x-4 overflow-x-auto">
            {sections.map((section, index) => {
              const Icon = section.icon;
              const isActive = section.id === currentSection;
              const isCompleted = getCurrentSectionIndex() > index;
              return (
                <div
                  key={section.id}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg min-w-fit ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                      : isCompleted
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                  <span className="text-sm font-medium">{section.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 flex-1">
        {renderCurrentSection()}
      </div>
    </AssessmentLayout>
  );
};

export default Index;
