import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Clock, Target, Users, TrendingUp, CheckCircle, Zap } from 'lucide-react';

interface AssessmentIntroProps {
  onNext: () => void;
}

const AssessmentIntro = ({ onNext }: AssessmentIntroProps) => {
  const careers = [
    { title: 'Cloud Engineer', description: 'Build and manage infrastructure' },
    { title: 'Cloud Architect', description: 'Design advanced system solutions' },
    { title: 'Data Engineer', description: 'Build data pipelines and analytics' },
    { title: 'DevOps/SRE Engineer', description: 'Automate deployment & reliability' },
    { title: 'ML Engineer', description: 'Deploy machine learning models' }
  ];

  const traits = [
    'Strong analytical thinking',
    'Systems-oriented mindset',
    'Logical problem-solving',
    'Interest in scalable infrastructure',
    'Comfort with automation',
    'Attention to security details'
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
              <Card className="border-2 border-blue-200 bg-blue-50">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
            Discover Your Google Cloud Platform Career Potential
          </CardTitle>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take our comprehensive assessment to evaluate your psychological fit, technical readiness, 
            and career alignment for a future in Google Cloud Platform development and administration.
          </p>
        </CardHeader>
        <CardContent className="text-center">
          <div className="flex justify-center items-center space-x-6 mb-6">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
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
          <Button 
            onClick={onNext} 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
          >
            Start Assessment
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </CardContent>
      </Card>

      {/* What is GCP */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-6 h-6 text-blue-600" />
            <span>What is Google Cloud Platform?</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Google Cloud Platform is a powerful <strong>cloud computing suite</strong> that specializes in 
            <strong> compute, storage, networking, AI/ML, analytics, DevOps, and serverless technologies</strong>. 
            It empowers organizations from startups to enterprises to build scalable, secure applications 
            and drive digital transformation across various industries.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Cloud Platform</h4>
              <p className="text-sm text-blue-700">Scalable, secure, and accessible from anywhere</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">AI/ML Integration</h4>
              <p className="text-sm text-green-700">Advanced machine learning and analytics capabilities</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">Enterprise Scale</h4>
              <p className="text-sm text-purple-700">Used by Fortune 500 companies worldwide</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Career Paths */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-6 h-6 text-green-600" />
            <span>Career Opportunities</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {careers.map((career, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-gray-900 mb-2">{career.title}</h4>
                <p className="text-sm text-gray-600">{career.description}</p>
              </div>
            ))}
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
            {traits.map((trait, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-700">{trait}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Assessment Overview */}
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

export default AssessmentIntro; 