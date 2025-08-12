import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Clock, Target, Users, TrendingUp, CheckCircle, Zap } from 'lucide-react';

interface AssessmentIntroProps {
  onNext: () => void;
}

export const AssessmentIntro = ({ onNext }: AssessmentIntroProps) => {
  const careers = [
    { title: 'Business Intelligence Analyst', description: 'Builds dashboards and extracts KPIs' },
    { title: 'Data Analyst', description: 'Analyzes trends and answers questions with data' },
    { title: 'Data Visualization Specialist', description: 'Designs compelling dashboards and reports' },
    { title: 'Operations Analyst', description: 'Uses BI to improve workflows and efficiencies' },
    { title: 'BI Developer', description: 'Develops and maintains BI solutions' }
  ];

  const traits = [
    'Strong analytical thinking',
    'Data-driven mindset',
    'Visual design skills',
    'Interest in business intelligence',
    'Comfort with data analysis',
    'Attention to detail'
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
            Discover Your Power BI & Tableau Career Potential
          </CardTitle>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take our comprehensive assessment to evaluate your psychological fit, technical readiness, 
            and career alignment for a future in Power BI and Tableau development and business intelligence.
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

      {/* What are Power BI & Tableau */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-6 h-6 text-blue-600" />
            <span>What are Power BI & Tableau?</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Power BI (Microsoft) and Tableau (Salesforce) are powerful <strong>business intelligence platforms</strong> that specialize in 
            <strong> data visualization and analytics</strong>. They empower organizations to transform raw data into actionable insights, 
            create compelling dashboards, and drive data-driven decision making across various departments and functions.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Data Analysis</h4>
              <p className="text-sm text-blue-700">Transform raw data into actionable insights</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Visualization</h4>
              <p className="text-sm text-green-700">Create compelling charts and dashboards</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">Business Intelligence</h4>
              <p className="text-sm text-purple-700">Drive data-driven decision making</p>
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
            <Target className="w-6 h-6 text-purple-600" />
            <span>Ideal Traits for Success</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-3">
            {traits.map((trait, index) => (
              <div key={index} className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-gray-700">{trait}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Assessment Overview */}
      <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 border-2 border-indigo-200">
        <CardHeader>
          <CardTitle className="text-center text-indigo-900">
            What You'll Learn
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-blue-900 mb-2">Career Fit</h4>
              <p className="text-sm text-blue-700">Understand if BI tools align with your career goals</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-green-900 mb-2">Skill Assessment</h4>
              <p className="text-sm text-green-700">Evaluate your technical and soft skills readiness</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-purple-900 mb-2">Path Guidance</h4>
              <p className="text-sm text-purple-700">Get personalized recommendations for your journey</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};