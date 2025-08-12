import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  AlertTriangle, 
  X, 
  TrendingUp, 
  Brain, 
  Code, 
  Target,
  Award,
  BookOpen,
  Users,
  ArrowRight,
  Download,
  Share2
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Results = () => {
  const navigate = useNavigate();
  // Mock results data - in a real app, this would come from the assessment responses
  const results = {
    overallScore: 78,
    recommendation: 'YES',
    confidence: 85,
    scores: {
      psychometric: 82,
      technical: 71,
      wiscar: {
        will: 85,
        interest: 90,
        skill: 65,
        cognitive: 78,
        ability: 80,
        realWorld: 75
      }
    }
  };

  // Recommendation logic for color/icon/badge
  const getRecommendationDetails = (rec) => {
    if (rec === 'YES') return {
      color: 'green',
      icon: <CheckCircle className="w-12 h-12 text-green-600" />, 
      badge: 'bg-green-100 text-green-800 border-green-300',
      card: 'border-green-200 bg-green-50',
      circle: 'bg-green-100',
      title: 'Great Fit!',
      desc: 'You show strong alignment across psychological fit, technical readiness, and holistic assessment dimensions.'
    };
    if (rec === 'MAYBE') return {
      color: 'orange',
      icon: <AlertTriangle className="w-12 h-12 text-orange-600" />, 
      badge: 'bg-orange-100 text-orange-800 border-orange-300',
      card: 'border-orange-200 bg-orange-50',
      circle: 'bg-orange-100',
      title: 'Could Be Right with Preparation',
      desc: 'You have potential but may need to strengthen certain areas before diving deep.'
    };
    return {
      color: 'red',
      icon: <X className="w-12 h-12 text-red-600" />, 
      badge: 'bg-red-100 text-red-800 border-red-300',
      card: 'border-red-200 bg-red-50',
      circle: 'bg-red-100',
      title: 'Consider Alternatives',
      desc: 'Other technology paths might be a better fit for your interests and skills.'
    };
  };
  const rec = getRecommendationDetails(results.recommendation);

  const careerPaths = [
    {
      title: 'Ethical Hacker / Penetration Tester',
      description: 'Simulate attacks to test system defenses',
      match: 85,
      skills: ['Network Security', 'Vulnerability Assessment', 'Scripting']
    },
    {
      title: 'Security Analyst',
      description: 'Monitor systems and investigate security events',
      match: 78,
      skills: ['Log Analysis', 'Incident Response', 'SIEM Tools']
    },
    {
      title: 'Cybersecurity Engineer',
      description: 'Build and deploy secure infrastructure',
      match: 72,
      skills: ['System Administration', 'Security Architecture', 'Automation']
    }
  ];

  const skillGaps = [
    { skill: 'Networking (TCP/IP)', current: 65, required: 85, priority: 'High' },
    { skill: 'Linux & Command Line', current: 45, required: 80, priority: 'High' },
    { skill: 'Scripting (Python)', current: 50, required: 75, priority: 'Medium' },
    { skill: 'Security Tools', current: 30, required: 70, priority: 'Medium' }
  ];

  // Section navigation pills (all completed for results)
  const sections = [
    { id: 'intro', title: '1️⃣ Introduction', icon: Brain },
    { id: 'psychometric', title: '2️⃣ Psychometric Section', icon: Brain },
    { id: 'technical', title: '3️⃣ Technical & Aptitude Section', icon: Code },
    { id: 'wiscar', title: '4️⃣ WISCAR Framework', icon: Target },
    { id: 'results', title: '5️⃣ Results', icon: TrendingUp }
  ];
  const sectionNav = (
    <div className="flex mt-4 space-x-4 overflow-x-auto">
      {sections.map((section, index) => {
        const Icon = section.icon;
        return (
          <div
            key={section.id}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg min-w-fit font-medium transition-colors select-none bg-green-100 text-green-700`}
          >
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-medium">{section.title.replace(/^[^ ]+ /, '')}</span>
          </div>
        );
      })}
    </div>
  );

  React.useEffect(() => {
    // If there is no assessment data (mock or real), redirect to index
    // Replace this condition with your real assessment completion check if needed
    if (!results) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Is ServiceNow Right for You?
              </h1>
              <p className="text-gray-600 text-sm">
                Comprehensive Career Assessment & Guidance
              </p>
            </div>
            <Badge variant="outline" className="text-sm px-3 py-1 font-semibold border-blue-300 bg-blue-50 text-blue-700">
              Complete
            </Badge>
          </div>
          {/* Progress Bar */}
          <div className="mt-4">
            <Progress value={100} className="h-3 rounded-full bg-blue-100" />
          </div>
          {/* Section Navigation Pills */}
          {sectionNav}
        </div>
      </div>
      <main className="py-8 px-4">
        <div className="container mx-auto max-w-6xl space-y-8">
          {/* Overall Recommendation */}
          <Card className={`border-2 ${rec.card}`}>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className={`p-4 rounded-full ${rec.circle}`}>{rec.icon}</div>
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                {rec.title}
              </CardTitle>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-2">
                {rec.desc}
              </p>
              <Badge variant="outline" className={`mt-4 text-lg px-4 py-2 ${rec.badge}`}>
                Recommendation: {results.recommendation}
              </Badge>
            </CardHeader>
          </Card>

          {/* Score Breakdown */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  <span>Psychological Fit</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-2xl font-bold text-purple-600">
                        {results.scores.psychometric}%
                      </span>
                      <Badge variant={
                        (results.scores.psychometric || 0) >= 75 ? 'default' :
                        (results.scores.psychometric || 0) >= 60 ? 'secondary' : 'destructive'
                      }>
                        {(results.scores.psychometric || 0) >= 75 ? 'Excellent' :
                         (results.scores.psychometric || 0) >= 60 ? 'Good' : 'Needs Work'}
                      </Badge>
                    </div>
                    <Progress value={results.scores.psychometric} className="h-3" />
                  </div>
                  {/* Sub-breakdown placeholder (add if available) */}
                </div>
              </CardContent>
            </Card>
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code className="w-5 h-5 text-green-600" />
                  <span>Technical Readiness</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-2xl font-bold text-green-600">
                        {results.scores.technical}%
                      </span>
                      <Badge variant={
                        (results.scores.technical || 0) >= 75 ? 'default' :
                        (results.scores.technical || 0) >= 60 ? 'secondary' : 'destructive'
                      }>
                        {(results.scores.technical || 0) >= 75 ? 'Strong' :
                         (results.scores.technical || 0) >= 60 ? 'Moderate' : 'Developing'}
                      </Badge>
                    </div>
                    <Progress value={results.scores.technical} className="h-3" />
                  </div>
                  {/* Sub-breakdown placeholder (add if available) */}
                </div>
              </CardContent>
            </Card>
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-orange-600" />
                  <span>WISCAR Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-2xl font-bold text-orange-600">
                        {Math.round(Object.values(results.scores.wiscar).reduce((a, b) => a + b, 0) / 6)}%
                      </span>
                      <Badge variant="outline" className="bg-orange-50 text-orange-700">
                        Multi-dimensional
                      </Badge>
                    </div>
                    <Progress value={Math.round(Object.values(results.scores.wiscar).reduce((a, b) => a + b, 0) / 6)} className="h-3" />
                  </div>
                  {/* Sub-breakdown placeholder (add if available) */}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Career Path Matching */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-6 h-6 text-blue-600" />
                <span>Career Path Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {careerPaths.map((career, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900">{career.title}</h4>
                      <Badge variant="outline" className={
                        career.match >= 75 ? 'bg-green-50 text-green-700' :
                        career.match >= 60 ? 'bg-orange-50 text-orange-700' :
                        'bg-red-50 text-red-700'
                      }>
                        {career.match}% Match
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{career.description}</p>
                    <div className="mb-3">
                      <Progress value={career.match} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-gray-500 mb-1">Key Requirements:</div>
                      {career.skills.map((req, reqIndex) => (
                        <Badge key={reqIndex} variant="secondary" className="mr-1 mb-1 text-xs">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => navigate('/')}
            >
              Retake Assessment
            </Button>
            {results.recommendation === 'YES' && (
              <Button variant="outline" className="border-green-500 text-green-700 hover:bg-green-50">
                View Learning Resources
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Results;
