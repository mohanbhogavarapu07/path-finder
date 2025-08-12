import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Clock, Target, Users, TrendingUp, CheckCircle, Zap, Brain, Code } from 'lucide-react';

interface AssessmentIntroProps {
  onNext: () => void;
}

const AssessmentIntro = ({ onNext }: AssessmentIntroProps) => {
  const careers = [
    { title: 'Digital Marketing Specialist', description: 'Manages online campaigns and strategies' },
    { title: 'SEO Specialist', description: 'Optimizes websites for search engines' },
    { title: 'Social Media Manager', description: 'Manages brand presence on social platforms' },
    { title: 'Content Marketing Manager', description: 'Creates and distributes valuable content' },
    { title: 'PPC Specialist', description: 'Manages paid advertising campaigns' }
  ];

  const traits = [
    'Creative and analytical thinking',
    'Strong communication skills',
    'Data-driven mindset',
    'Interest in consumer behavior',
    'Comfort with digital tools',
    'Adaptability to trends'
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
            Discover Your Digital Marketing Career Potential
          </CardTitle>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take our comprehensive assessment to evaluate your psychological fit, technical readiness, 
            and career alignment for a future in digital marketing and online advertising.
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

      {/* What is Digital Marketing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-6 h-6 text-blue-600" />
            <span>What is Digital Marketing?</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Digital Marketing is a comprehensive approach to <strong>online advertising and promotion</strong> that encompasses 
            <strong> search engine optimization, social media marketing, content creation, and data analytics</strong>. 
            It empowers businesses to reach their target audience through various digital channels and measure the effectiveness of their campaigns.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Online Presence</h4>
              <p className="text-sm text-blue-700">Build and maintain digital brand presence</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Data Analytics</h4>
              <p className="text-sm text-green-700">Measure and optimize campaign performance</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">Multi-Channel</h4>
              <p className="text-sm text-purple-700">Reach audiences across various platforms</p>
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
              <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
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
            <CheckCircle className="w-6 h-6 text-purple-600" />
            <span>Ideal Traits for Success</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {traits.map((trait, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{trait}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Assessment Overview */}
      <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="text-center text-green-800">
            What You'll Learn
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Psychological Fit</h4>
              <p className="text-sm text-gray-600">Understand your personality traits and how they align with digital marketing roles</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Code className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Technical Readiness</h4>
              <p className="text-sm text-gray-600">Assess your comfort with digital tools and analytical thinking</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Career Alignment</h4>
              <p className="text-sm text-gray-600">Discover which digital marketing path best suits your skills and interests</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentIntro; 