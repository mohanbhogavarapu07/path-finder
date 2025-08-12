import React from 'react';
import { useAssessment } from '../../contexts/AssessmentContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Cloud, 
  Code, 
  Shield, 
  Zap, 
  Users, 
  Target, 
  ArrowRight,
  CloudSnow,
  Server,
  GitBranch,
  Clock,
  Award,
  TrendingUp
} from 'lucide-react';

const IntroductionSection: React.FC = () => {
  const { dispatch } = useAssessment();

  const handleStartAssessment = () => {
    dispatch({ type: 'SET_SECTION', payload: 'psychological' });
    dispatch({ type: 'UPDATE_PROGRESS', payload: 20 });
  };

  const careerRoles = [
    { title: 'Multi-Cloud Engineer', icon: Cloud, description: 'Manage infrastructure across multiple cloud platforms' },
    { title: 'Cloud Solutions Architect', icon: Server, description: 'Design end-to-end cloud solutions' },
    { title: 'DevOps Engineer', icon: GitBranch, description: 'Automate CI/CD pipelines across clouds' },
    { title: 'Cloud Security Engineer', icon: Shield, description: 'Ensure compliance and security' },
    { title: 'Site Reliability Engineer', icon: Zap, description: 'Maintain uptime and performance' },
  ];

  const idealTraits = [
    'High analytical and logical thinking',
    'Curiosity to explore complex systems',
    'Structured problem-solving approach',
    'Consistent learning attitude',
    'Adaptability in fast-evolving tech',
    'Strong attention to detail',
  ];

  const assessmentModules = [
    {
      number: 1,
      title: 'Psychological Fit Evaluation',
      description: 'Assess your interests, personality, and motivation alignment',
      color: 'assessment-psycho'
    },
    {
      number: 2,
      title: 'Technical Aptitude Testing',
      description: 'Evaluate your technical readiness and aptitude',
      color: 'assessment-technical'
    },
    {
      number: 3,
      title: 'WISCAR Framework Analysis',
      description: 'Comprehensive multi-dimensional assessment',
      color: 'assessment-wiscar'
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
            Discover Your Multi-Cloud Engineering Potential
          </CardTitle>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take our comprehensive assessment to evaluate your psychological fit, technical readiness, 
            and career alignment for a future in multi-cloud engineering and architecture.
          </p>
        </CardHeader>
        <CardContent className="text-center">
          <div className="flex justify-center items-center space-x-6 mb-6">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>25-30 minutes</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Users className="w-4 h-4" />
              <span>Personalized Results</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <TrendingUp className="w-4 h-4" />
              <span>Career Guidance</span>
            </div>
          </div>
          <Button 
            onClick={handleStartAssessment} 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
          >
            Start Assessment
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </CardContent>
      </Card>

      {/* What is Multi-Cloud Engineering */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Cloud className="w-6 h-6 text-blue-600" />
            <span>What is Multi-Cloud Engineering?</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            A <strong>Multi-Cloud Engineer</strong> manages applications, workloads, and infrastructure across multiple 
            cloud service providers like AWS, Azure, Google Cloud, and others. The role requires deep understanding 
            of cloud platforms, interoperability, automation, security, and DevOps practices.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Cloud Platform</h4>
              <p className="text-sm text-blue-700">Scalable, secure, and accessible</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Automation</h4>
              <p className="text-sm text-green-700">Streamline processes and reduce manual work</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">Enterprise Scale</h4>
              <p className="text-sm text-purple-700">Used by Fortune 500 companies</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Career Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-6 h-6 text-green-600" />
            <span>Career Opportunities</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {careerRoles.map((role, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-gray-900 mb-2">{role.title}</h4>
                <p className="text-sm text-gray-600">{role.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ideal Traits & Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="w-6 h-6 text-orange-600" />
            <span>Ideal Traits & Skills</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-3">
            {idealTraits.map((trait, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-700">{trait}</span>
              </div>
            ))}
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
};

export default IntroductionSection;