
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Brain, Code, Target, TrendingUp, ArrowRight, CheckCircle, Zap, Users } from 'lucide-react';
import AssessmentLayout from '../../../../components/AssessmentLayout';
import AssessmentIntro from '../components/AssessmentIntro';
import PsychometricSection from '../components/PsychometricSection';
import TechnicalSection from '../components/TechnicalSection';
import WiscarSection from '../components/WiscarSection';
import ResultsSection from '../components/ResultsSection';

const Index = () => {
  const [currentSection, setCurrentSection] = useState('intro');
  const [assessmentData, setAssessmentData] = useState({
    psychometric: {},
    technical: {},
    wiscar: {},
    completed: false
  });

  const sections = [
    { id: 'intro', title: 'Introduction', icon: BookOpen, color: 'bg-blue-500' },
    { id: 'psychometric', title: 'Psychological Fit', icon: Brain, color: 'bg-purple-500' },
    { id: 'technical', title: 'Technical Aptitude', icon: Code, color: 'bg-green-500' },
    { id: 'wiscar', title: 'WISCAR Analysis', icon: Target, color: 'bg-orange-500' },
    { id: 'results', title: 'Your Results', icon: TrendingUp, color: 'bg-red-500' }
  ];

  const getCurrentSectionIndex = () => sections.findIndex(section => section.id === currentSection);
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

  const handleStartAssessment = () => {
    setCurrentSection('psychometric');
  };

  const handleRestart = () => {
    setCurrentSection('intro');
    setAssessmentData({ psychometric: {}, technical: {}, wiscar: {}, completed: false });
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'intro':
  return (
            <div>
        {/* Hero Section */}
        <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 mb-8">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
              Discover Your Tech Career Potential
            </CardTitle>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Take our comprehensive assessment to evaluate your psychological fit, technical readiness, and career alignment for a future in technology fields.
            </p>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex justify-center items-center space-x-6 mb-6">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <ArrowRight className="w-4 h-4 mr-1" />
                <span>25-30 minutes</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Target className="w-4 h-4" />
                <span>Personalized Results</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <TrendingUp className="w-4 h-4" />
                <span>Career Guidance</span>
              </div>
            </div>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3" onClick={handleStartAssessment}>
                Start Assessment
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
          </CardContent>
        </Card>

        {/* What is Tech Careers? */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-6 h-6 text-blue-600" />
              <span>What are Tech Careers?</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Tech careers span a wide range of roles in software, cybersecurity, data, and cloud. These fields drive innovation, solve real-world problems, and offer opportunities for growth and impact across industries.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Cloud & Software</h4>
                <p className="text-sm text-blue-700">Build, deploy, and scale digital solutions</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Automation & Security</h4>
                <p className="text-sm text-green-700">Streamline processes and protect data</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">Enterprise Impact</h4>
                <p className="text-sm text-purple-700">Shape the future of business and society</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Career Opportunities */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-6 h-6 text-green-600" />
              <span>Career Opportunities</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-gray-900 mb-2">Software Developer</h4>
                <p className="text-sm text-gray-600">Design, build, and maintain applications</p>
              </div>
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-gray-900 mb-2">Cybersecurity Analyst</h4>
                <p className="text-sm text-gray-600">Protect systems and data from threats</p>
              </div>
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-gray-900 mb-2">Cloud Engineer</h4>
                <p className="text-sm text-gray-600">Deploy and manage cloud infrastructure</p>
              </div>
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-gray-900 mb-2">Data Analyst</h4>
                <p className="text-sm text-gray-600">Extract insights from complex data</p>
              </div>
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-gray-900 mb-2">IT Consultant</h4>
                <p className="text-sm text-gray-600">Advise organizations on technology strategy</p>
              </div>
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-gray-900 mb-2">DevOps Engineer</h4>
                <p className="text-sm text-gray-600">Automate and optimize development pipelines</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ideal Traits & Skills */}
        <Card className="mb-8">
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
                <span className="text-gray-700">Analytical thinking</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-700">Problem-solving mindset</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-700">Attention to detail</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-700">Interest in technology</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-700">Comfort with learning new tools</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-700">Collaboration & communication</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Overview Section */}
        <Card className="border-2 border-gray-200 mb-8">
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
      case 'psychometric':
        return (
          <PsychometricSection
            onComplete={(data) => {
              updateAssessmentData('psychometric', data);
              goToNextSection();
            }}
          />
        );
      case 'technical':
        return (
          <TechnicalSection
            onComplete={(data) => {
              updateAssessmentData('technical', data);
              goToNextSection();
            }}
          />
        );
      case 'wiscar':
        return (
          <WiscarSection
            onComplete={(data) => {
              updateAssessmentData('wiscar', data);
              setAssessmentData(prev => ({ ...prev, completed: true }));
              goToNextSection();
            }}
          />
        );
      case 'results':
        return <ResultsSection assessmentData={assessmentData} onRetake={handleRestart} />;
      default:
        return <AssessmentIntro onNext={goToNextSection} />;
    }
  };

  return (
    <AssessmentLayout>
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                TechCareer Compass
              </h1>
              <p className="text-gray-600 text-sm">
                Comprehensive Tech Career Assessment & Guidance
              </p>
            </div>
            <Badge variant="outline" className="text-sm">
              {Math.round(progress)}% Complete
            </Badge>
          </div>
          {/* Progress Bar */}
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
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
                  onClick={() => setCurrentSection(section.id)}
                  style={{ cursor: 'pointer' }}
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
