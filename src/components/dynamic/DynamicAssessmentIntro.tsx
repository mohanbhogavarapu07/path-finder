import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, Target, TrendingUp, CheckCircle, 
  Cloud, BarChart3, Code, Brain, Users, Briefcase, Heart, Cog, Zap
} from 'lucide-react';
import { DynamicAssessment } from '@/lib/api';

interface DynamicAssessmentIntroProps {
  assessment: DynamicAssessment;
  onNext: () => void;
}

const DynamicAssessmentIntro: React.FC<DynamicAssessmentIntroProps> = ({
  assessment,
  onNext
}) => {
  // Safety check to ensure assessment has required properties
  if (!assessment || typeof assessment !== 'object') {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Assessment data not available</p>
      </div>
    );
  }

  // Ensure we have the required string properties
  const title = typeof assessment.title === 'string' ? assessment.title : 'Assessment';
  const description = typeof assessment.description === 'string' ? assessment.description : 'No description available';
  const whatIsDescription = typeof assessment.whatIsDescription === 'string' ? assessment.whatIsDescription : '';
  const duration = typeof assessment.duration === 'string' ? assessment.duration : 'Unknown duration';
  const difficulty = typeof assessment.difficulty === 'string' ? assessment.difficulty : 'Unknown difficulty';
  const userCount = assessment.metadata?.userCount && typeof assessment.metadata.userCount === 'string' ? assessment.metadata.userCount : 'Unknown';

  // Icon per category to mirror static pages
  const categoryIcons: Record<string, React.ComponentType<any>> = {
    Cloud,
    Data: BarChart3,
    Technology: Code,
    Programming: Brain,
    Management: Users,
    Business: Briefcase,
    Medical: Heart,
    Platform: Cog,
  } as any;

  const CategoryIcon = categoryIcons[assessment.category] || Code;

  // Fallback career items if none provided
  const fallbackCareers = [
    { title: `${title} Engineer`, description: 'Build and optimize real-world solutions' },
    { title: `${title} Architect`, description: 'Design scalable systems end-to-end' },
    { title: 'DevOps Engineer', description: 'Automate CI/CD and cloud workflows' },
    { title: 'Security Specialist', description: 'Harden and secure environments' },
    { title: 'Data Engineer', description: 'Develop reliable data pipelines' },
    { title: 'Platform Engineer', description: 'Own platform reliability and DX' }
  ];

  const careers = Array.isArray(assessment.typicalCareers) && assessment.typicalCareers.length > 0
    ? assessment.typicalCareers
    : fallbackCareers;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="text-center">
          <div className="flex justify-center mb-4">
            <CategoryIcon className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Discover Your {title} Career Potential
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            {description}
          </p>
          <div className="flex justify-center items-center space-x-6 mb-6">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Target className="w-4 h-4" />
              <span>Personalized Results</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <TrendingUp className="w-4 h-4" />
              <span>Career Guidance</span>
            </div>
          </div>
          <Button 
            onClick={onNext} 
            size="lg" 
            className="bg-factorbeam-primary hover:bg-factorbeam-primary-alt text-white px-8 py-3"
          >
            Start Assessment
          </Button>
        </CardContent>
      </Card>

      {/* What is {title}? */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-blue-600" />
            <span>What is {title}?</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            {whatIsDescription || `${title} is a powerful and evolving path that combines practical skills, problem solving, and real-world application.`}
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
                            <div className="bg-factorbeam-primary/5 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Foundation</h4>
              <p className="text-sm text-blue-700">Solid fundamentals and core concepts</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Hands-on</h4>
              <p className="text-sm text-green-700">Practical skills and experience</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">At Scale</h4>
              <p className="text-sm text-purple-700">Used widely across industries</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Career Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-6 w-6 text-green-600" />
            <span>Career Opportunities</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {careers.map((career: any, index: number) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-foreground mb-2">{career.title}</h4>
                {career.description && (
                  <p className="text-sm text-muted-foreground">{career.description}</p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ideal Traits */}
      {(Array.isArray(assessment.idealTraits) && assessment.idealTraits.length > 0) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="w-6 h-6 text-orange-600" />
              <span>Ideal Traits & Skills</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              {assessment.idealTraits.map((trait, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-700">{trait}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Assessment Overview */}
      <Card className="border-2 border-gray-200">
        <CardHeader>
          <CardTitle>What You'll Discover</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-foreground mb-3">Assessment Modules:</h4>
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
                  <span className="text-sm">FB6 Index Analysis</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Your Results Include:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {(assessment.assessmentOverview?.resultsInclude?.length
                  ? assessment.assessmentOverview.resultsInclude
                  : ['Personalized fit score (0-100)', 'Detailed trait analysis', 'Technical readiness assessment', 'Career pathway recommendations', 'Next steps and learning resources']
                ).map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DynamicAssessmentIntro;
