import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertTriangle, XCircle, TrendingUp, BookOpen, Target, Users, ArrowRight } from 'lucide-react';
import WiscarChart from './WiscarChart';

interface AssessmentResultsProps {
  results: {
    psychometricScore: number;
    technicalScore: number;
    wiscarData: {
      W: number;
      I: number;
      S: number;
      C: number;
      A: number;
      R: number;
    };
    overallConfidence: number;
    recommendation: 'yes' | 'maybe' | 'no';
    skillGaps: Array<{
      skill: string;
      current: number;
      target: number;
      priority: 'high' | 'medium' | 'low';
    }>;
  };
  onRestart: () => void;
}

const AssessmentResults = ({ results, onRestart }: AssessmentResultsProps) => {
  const getRecommendationConfig = () => {
    switch (results.recommendation) {
      case 'yes':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          title: 'Yes - You Should Learn Data Analytics!',
          description: 'You show strong potential and alignment for a career in data analytics.'
        };
      case 'maybe':
        return {
          icon: AlertTriangle,
          color: 'text-orange-600',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          title: 'Maybe - Consider Exploring Further',
          description: 'You have some alignment but may benefit from additional exploration.'
        };
      case 'no':
        return {
          icon: XCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          title: 'Not Right Now - Consider Alternatives',
          description: 'Your profile suggests other paths might be a better fit currently.'
        };
    }
  };

  const recommendation = getRecommendationConfig();
  const RecommendationIcon = recommendation.icon;

  const careerRoles = [
    { role: 'Data Analyst', fit: results.overallConfidence },
    { role: 'BI Analyst', fit: Math.max(60, results.overallConfidence - 10) },
    { role: 'Marketing Analyst', fit: Math.max(50, results.overallConfidence - 15) },
    { role: 'Product Analyst', fit: Math.max(45, results.overallConfidence - 20) },
    { role: 'Junior Data Scientist', fit: Math.max(40, results.overallConfidence - 25) }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-green-100 text-green-700 border-green-200">
            Assessment Complete
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Assessment Results</h1>
          <p className="text-lg text-gray-600">
            Based on your responses, here's your personalized career guidance
          </p>
        </div>
        {/* Recommendation Card */}
        <Card className={`mb-8 shadow-lg border-2 ${recommendation.bgColor} ${recommendation.borderColor}`}>
          <CardHeader>
            <div className="flex items-center gap-4">
              <RecommendationIcon className={`h-8 w-8 ${recommendation.color}`} />
              <div>
                <CardTitle className="text-2xl">{recommendation.title}</CardTitle>
                <p className="text-lg text-gray-600">{recommendation.description}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 text-lg">
              <span className="font-medium">Confidence Score:</span>
              <Badge className="text-lg px-3 py-1 bg-blue-600 text-white">
                {results.overallConfidence}/100
              </Badge>
            </div>
          </CardContent>
        </Card>
        {/* Main Results Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Scores Overview */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Assessment Scores
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Psychological Fit</span>
                  <span className="font-bold">{results.psychometricScore}/100</span>
                </div>
                <Progress value={results.psychometricScore} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Technical Readiness</span>
                  <span className="font-bold">{results.technicalScore}/100</span>
                </div>
                <Progress value={results.technicalScore} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Overall Confidence</span>
                  <span className="font-bold">{results.overallConfidence}/100</span>
                </div>
                <Progress value={results.overallConfidence} className="h-3" />
              </div>
            </CardContent>
          </Card>
          {/* Career Role Fit */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Career Role Fit
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {careerRoles.map((career) => (
                <div key={career.role}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{career.role}</span>
                    <span className="text-sm font-bold">{career.fit}%</span>
                  </div>
                  <Progress value={career.fit} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        {/* WISCAR Chart */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              WISCAR Framework Analysis
            </CardTitle>
            <p className="text-gray-600">Detailed breakdown of your readiness across six key dimensions</p>
          </CardHeader>
          <CardContent>
            <WiscarChart data={results.wiscarData} overallScore={results.overallConfidence} />
          </CardContent>
        </Card>
        {/* Skill Gaps and Next Steps */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Skill Gaps */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Skill Development Areas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {results.skillGaps.map((gap) => (
                <div key={gap.skill} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{gap.skill}</span>
                    <Badge 
                      variant={gap.priority === 'high' ? 'destructive' : gap.priority === 'medium' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {gap.priority} priority
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Current: {gap.current}%</span>
                    <ArrowRight className="h-3 w-3" />
                    <span>Target: {gap.target}%</span>
                  </div>
                  <Progress value={gap.current} className="h-2 mt-2" />
                </div>
              ))}
            </CardContent>
          </Card>
          {/* Next Steps */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600" />
                Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                {(() => {
                  switch (results.recommendation) {
                    case 'yes':
                      return [
                        'Start with Python basics: variables, lists, functions',
                        'Learn Pandas and Matplotlib libraries',
                        'Build a mini project: CSV → DataFrame → Clean → Visualize',
                        'Practice with real datasets from Kaggle',
                        'Join Python data analytics communities'
                      ];
                    case 'maybe':
                      return [
                        'Take a short exploratory course (e.g., on Coursera)',
                        'Try using Jupyter Notebooks for basic analysis',
                        'Watch Python-based data storytelling case studies',
                        'Complete a beginner-friendly data project',
                        'Assess your interest level after initial exposure'
                      ];
                    case 'no':
                      return [
                        'Excel/Power BI for less code-heavy analytics',
                        'UX Research if you enjoy analysis but prefer qualitative data',
                        'Product Analytics Tools (Amplitude, Mixpanel)',
                        'Business Intelligence with visual tools',
                        'Project Management with data literacy focus'
                      ];
                  }
                })().map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        {/* Restart Button */}
        <div className="text-center mt-8">
          <Button onClick={onRestart} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
            Restart Assessment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentResults;