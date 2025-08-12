import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AssessmentResult } from '@/types/assessment';
import { CheckCircle, AlertCircle, XCircle, BarChart3, Target, User, Briefcase, BookOpen, Star, ExternalLink, Users, TrendingUp, ArrowRight } from 'lucide-react';
import { AssessmentProgress } from './AssessmentProgress';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface AssessmentResultsProps {
  result: AssessmentResult;
  onRestart: () => void;
}

const AssessmentResults = ({ result, onRestart }: AssessmentResultsProps) => {
  // Map recommendation to color, icon, and title
  const getRecommendation = () => {
    switch (result.recommendation) {
      case 'yes':
        return {
          color: 'green',
          icon: CheckCircle,
          title: 'Yes, You Should Learn Data Science!',
          badge: 'YES',
          description: result.reason,
        };
      case 'maybe':
        return {
          color: 'orange',
          icon: AlertCircle,
          title: 'Maybe - With Some Preparation',
          badge: 'MAYBE',
          description: result.reason,
        };
      case 'no':
        return {
          color: 'red',
          icon: XCircle,
          title: 'Consider Alternative Paths',
          badge: 'NO',
          description: result.reason,
        };
      default:
        return {
          color: 'gray',
          icon: XCircle,
          title: 'No Recommendation',
          badge: 'N/A',
          description: '',
        };
    }
  };
  const recommendation = getRecommendation();
  const RecommendationIcon = recommendation.icon;

  // Career roles for the right column (reference style)
  const careerRoles = [
    { role: 'Data Analyst', fit: result.confidence_score },
    { role: 'BI Analyst', fit: Math.max(60, result.confidence_score - 10) },
    { role: 'Data Scientist', fit: Math.max(40, result.confidence_score - 20) },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      {/* Top Bar: Progress/Navigation */}
      <AssessmentProgress currentSection="results" progress={100} />
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
        <Card className={`mb-8 shadow-lg border-2 ${
          recommendation.color === 'green' ? 'bg-green-50 border-green-200' :
          recommendation.color === 'orange' ? 'bg-orange-50 border-orange-200' :
          'bg-red-50 border-red-200'
        }`}>
          <CardHeader>
            <div className="flex items-center gap-4">
              <RecommendationIcon className={`h-8 w-8 ${
                recommendation.color === 'green' ? 'text-green-600' :
                recommendation.color === 'orange' ? 'text-orange-600' :
                'text-red-600'
              }`} />
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
                {result.confidence_score}/100
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
                  <span className="font-bold">{result.psychological_fit}/100</span>
                </div>
                <Progress value={result.psychological_fit} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Technical Readiness</span>
                  <span className="font-bold">{result.technical_readiness}/100</span>
                </div>
                <Progress value={result.technical_readiness} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Overall Confidence</span>
                  <span className="font-bold">{result.confidence_score}/100</span>
                </div>
                <Progress value={result.confidence_score} className="h-3" />
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
        {/* WISCAR Chart Visualization */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              WISCAR Framework Analysis
            </CardTitle>
            <p className="text-gray-600">Detailed breakdown of your readiness across six key dimensions</p>
          </CardHeader>
          <CardContent>
            {/* Radar Chart */}
            <div className="h-96 w-full flex flex-col items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={[
                  { subject: 'Will', score: result.wiscar_scores.W, fullMark: 100 },
                  { subject: 'Interest', score: result.wiscar_scores.I, fullMark: 100 },
                  { subject: 'Skill', score: result.wiscar_scores.S, fullMark: 100 },
                  { subject: 'Cognitive', score: result.wiscar_scores.C, fullMark: 100 },
                  { subject: 'Ability', score: result.wiscar_scores.A, fullMark: 100 },
                  { subject: 'Real-World', score: result.wiscar_scores.R, fullMark: 100 },
                ]}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: '#334155' }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10, fill: '#64748b' }} />
                  <Radar name="Score" dataKey="score" stroke="#2563eb" fill="#2563eb" fillOpacity={0.2} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
              {/* Overall Score */}
              <div className="text-center mt-6">
                <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full">
                  <span className="text-sm font-medium">Overall Confidence Score:</span>
                  <span className="text-lg font-bold text-blue-700">{result.confidence_score}/100</span>
                    </div>
              </div>
            </div>
            {/* Dimension Breakdown */}
            <div className="grid md:grid-cols-2 gap-4 mt-8">
              {[
                { key: 'W', label: 'Will (Persistence)', description: 'Your determination to overcome challenges in data analytics' },
                { key: 'I', label: 'Interest (Passion)', description: 'Your genuine curiosity about data and analytics' },
                { key: 'S', label: 'Skill (Current)', description: 'Your existing technical capabilities in programming and analytics' },
                { key: 'C', label: 'Cognitive Readiness', description: 'Your analytical thinking and logical reasoning abilities' },
                { key: 'A', label: 'Ability to Learn', description: 'Your openness to feedback and learning new concepts' },
                { key: 'R', label: 'Real-World Fit', description: 'How well you align with actual data analyst job requirements' }
              ].map((dimension) => {
                const score = result.wiscar_scores[dimension.key];
                const getScoreColor = (score: number) => {
                  if (score >= 80) return '#16a34a'; // green
                  if (score >= 60) return '#eab308'; // yellow
                  return '#dc2626'; // red
                };
                return (
                  <div key={dimension.key} className="bg-white rounded-lg p-4 border shadow-soft">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-sm">{dimension.label}</h4>
                      <span className="font-bold text-sm px-2 py-1 rounded" style={{ color: getScoreColor(score), backgroundColor: `${getScoreColor(score)}20` }}>{score}/100</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{dimension.description}</p>
                    <div className="mt-2 bg-gray-100 rounded-full h-2">
                      <div className="h-2 rounded-full transition-all duration-500" style={{ width: `${score}%`, backgroundColor: getScoreColor(score) }} />
      </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
        {/* Next Steps */}
        <Card className="shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-blue-600" />
              Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {result.next_steps && result.next_steps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
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