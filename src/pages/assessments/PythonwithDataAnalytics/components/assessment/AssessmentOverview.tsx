import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Clock, Target, Users, TrendingUp, CheckCircle, Zap } from 'lucide-react';

interface AssessmentOverviewProps {
  onStartAssessment: () => void;
}

const AssessmentOverview = ({ onStartAssessment }: AssessmentOverviewProps) => {
  const assessmentSections = [
    {
      title: 'Psychometric Evaluation',
      description: 'Personality traits, interests, and work preferences',
      duration: '8-10 minutes',
      questions: '25-30 questions',
      icon: Users,
      color: 'bg-primary'
    },
    {
      title: 'Technical Aptitude',
      description: 'Programming concepts, math, statistics, and data analysis',
      duration: '12-15 minutes', 
      questions: '30-35 questions',
      icon: Target,
      color: 'bg-accent'
    },
    {
      title: 'WISCAR Framework',
      description: 'Will, Interest, Skill, Cognitive readiness, Ability, Real-world fit',
      duration: '5-8 minutes',
      questions: '15-20 questions', 
      icon: TrendingUp,
      color: 'bg-success'
    },
    {
      title: 'Results & Recommendations',
      description: 'Personalized career guidance and learning paths',
      duration: 'Instant',
      questions: 'Analysis report',
      icon: CheckCircle,
      color: 'bg-warning'
    }
  ];

  const careerRoles = [
    'Data Analyst',
    'Business Intelligence Analyst', 
    'Product/Data Operations Analyst',
    'Marketing Analyst',
    'Entry-Level Data Scientist',
    'Python Automation Developer'
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
            Discover Your Data Analytics Career Potential
          </CardTitle>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take our comprehensive assessment to evaluate your psychological fit, technical readiness, 
            and career alignment for a future in data analytics and automation.
          </p>
        </CardHeader>
        <CardContent className="text-center">
          <div className="flex justify-center items-center space-x-6 mb-6">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>25-35 minutes</span>
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
            onClick={onStartAssessment} 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
          >
            Start Assessment
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </CardContent>
      </Card>

      {/* What is Data Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-6 h-6 text-blue-600" />
            <span>What is Data Analytics?</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Data analytics is a powerful field that leverages technology and statistics to extract insights from data, drive business decisions, and automate workflows. It empowers organizations to streamline processes and drive digital transformation across various departments and functions.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Cloud Platform</h4>
              <p className="text-sm text-blue-700">Scalable, secure, and accessible from anywhere</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Workflow Automation</h4>
              <p className="text-sm text-green-700">Streamline processes and reduce manual work</p>
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
            {careerRoles.map((career, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-gray-900 mb-2">{career}</h4>
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

export default AssessmentOverview;