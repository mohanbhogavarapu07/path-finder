import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Target,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Book,
  Code,
  Users,
  ArrowRight,
  RotateCcw,
  XCircle,
  AlertTriangle,
  BookOpen,
  Star,
  ExternalLink,
  Brain
} from 'lucide-react';

interface AssessmentScores {
  psychometric: {
    interest: number;
    personality: number;
    cognitive: number;
    motivation: number;
    overall: number;
  };
  technical: {
    aptitude: number;
    crypto: number;
    programming: number;
    blockchain: number;
    overall: number;
  };
  wiscar: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    realWorld: number;
    overall: number;
    quadrant: string;
  };
}

interface ResultsSectionProps {
  scores: AssessmentScores;
  onRestart: () => void;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ scores, onRestart }) => {
  // Calculate overall recommendation
  const overallScore = Math.round(
    (scores.psychometric.overall + scores.technical.overall + scores.wiscar.overall) / 3
  );

  const calculateOverallRecommendation = () => {
    const psychScore = scores.psychometric?.overall || 0;
    const techScore = scores.technical?.overall || 0;
    const wiscarScore = scores.wiscar?.overall || 0;
    const overall = Math.round((psychScore + techScore + wiscarScore) / 3);
    if (overall >= 75) {
      return {
        recommendation: 'YES',
        title: 'Blockchain is an Excellent Fit for You!',
        color: 'green',
        icon: CheckCircle,
        description: 'You show strong alignment across psychological fit, technical readiness, and holistic assessment dimensions.'
      };
    } else if (overall >= 60) {
      return {
        recommendation: 'MAYBE',
        title: 'Blockchain Could Be Right with Preparation',
        color: 'orange',
        icon: AlertTriangle,
        description: 'You have potential but may need to strengthen certain areas before diving deep into blockchain.'
      };
    } else {
      return {
        recommendation: 'NO',
        title: 'Consider Alternative Paths',
        color: 'red',
        icon: XCircle,
        description: 'Based on your current profile, other technology paths might be a better fit for your interests and skills.'
      };
    }
  };

  const recommendation = calculateOverallRecommendation();
  const RecommendationIcon = recommendation.icon;

  const getRecommendation = () => {
    if (overallScore >= 75) return 'Yes';
    if (overallScore >= 55) return 'Maybe';
    return 'No';
  };

  const getRecommendationColor = () => {
    const rec = getRecommendation();
    if (rec === 'Yes') return 'text-green-600';
    if (rec === 'Maybe') return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRecommendationIcon = () => {
    const rec = getRecommendation();
    if (rec === 'Yes') return CheckCircle;
    if (rec === 'Maybe') return AlertCircle;
    return AlertCircle;
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-green-600';
    if (score >= 55) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 75) return 'bg-green-100';
    if (score >= 55) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getPersonalizedMessage = () => {
    const rec = getRecommendation();
    const highAreas = [];
    const lowAreas = [];

    if (scores.psychometric.overall >= 70) highAreas.push('psychological fit');
    else lowAreas.push('psychological alignment');

    if (scores.technical.overall >= 70) highAreas.push('technical aptitude');
    else lowAreas.push('technical skills');

    if (scores.wiscar.overall >= 70) highAreas.push('WISCAR readiness');
    else lowAreas.push('overall readiness factors');

    if (rec === 'Yes') {
      return `Excellent! You demonstrate strong ${highAreas.join(' and ')}. You're well-positioned to succeed in blockchain development.`;
    } else if (rec === 'Maybe') {
      return `You show promise with good ${highAreas.join(' and ')}, but may benefit from strengthening your ${lowAreas.join(' and ')} before diving deep into blockchain.`;
    } else {
      return `While blockchain is exciting, you may want to focus on building stronger ${lowAreas.join(' and ')} first. Consider exploring related fields or building foundational skills.`;
    }
  };

  const getNextSteps = () => {
    const rec = getRecommendation();
    
    if (rec === 'Yes') {
      return [
        'Start with Solidity fundamentals and smart contract development',
        'Explore Ethereum or Polygon ecosystems hands-on',
        'Contribute to open-source blockchain projects',
        'Build a portfolio of DApps and smart contracts',
        'Join blockchain developer communities and hackathons'
      ];
    } else if (rec === 'Maybe') {
      return [
        'Strengthen foundational programming skills (JavaScript/Python)',
        'Learn cryptography basics and hash functions',
        'Complete online blockchain courses (Coursera, Udemy)',
        'Practice with blockchain tutorials and simple projects',
        'Reassess in 3-6 months after building core skills'
      ];
    } else {
      return [
        'Focus on general programming fundamentals first',
        'Explore web development (HTML, CSS, JavaScript)',
        'Consider roles in Web3 product management or marketing',
        'Learn about blockchain from a business perspective',
        'Build technical skills gradually before specializing'
      ];
    }
  };

  const getCareerRoles = () => {
    const rec = getRecommendation();
    
    if (rec === 'Yes') {
      return [
        { title: 'Blockchain Developer', match: 'High', skills: ['Solidity', 'Web3', 'Smart Contracts'] },
        { title: 'Smart Contract Engineer', match: 'High', skills: ['Security', 'Auditing', 'Ethereum'] },
        { title: 'DApp Developer', match: 'High', skills: ['React', 'Web3.js', 'Frontend'] }
      ];
    } else if (rec === 'Maybe') {
      return [
        { title: 'Web3 Product Manager', match: 'Medium', skills: ['Strategy', 'UX', 'Blockchain Knowledge'] },
        { title: 'Blockchain Analyst', match: 'Medium', skills: ['Research', 'DeFi', 'Market Analysis'] },
        { title: 'Junior Blockchain Developer', match: 'Medium', skills: ['Learning Path', 'Mentorship'] }
      ];
    } else {
      return [
        { title: 'Crypto Community Manager', match: 'Medium', skills: ['Communication', 'Social Media'] },
        { title: 'Blockchain Content Creator', match: 'Medium', skills: ['Writing', 'Education'] },
        { title: 'Web3 Marketing Specialist', match: 'Low', skills: ['Marketing', 'Brand Strategy'] }
      ];
    }
  };

  // Career paths and learning path can be blockchain-specific as before
  // ... (keep your blockchain-specific logic for getCareerRoles, getNextSteps, etc.) ...

  // For brevity, only the main layout and color changes are shown here
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Overall Recommendation */}
      <Card className={`border-2 ${
        recommendation.color === 'green' ? 'border-green-200 bg-green-50' :
        recommendation.color === 'orange' ? 'border-orange-200 bg-orange-50' :
        'border-red-200 bg-red-50'
      }`}>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className={`p-4 rounded-full ${
              recommendation.color === 'green' ? 'bg-green-100' :
              recommendation.color === 'orange' ? 'bg-orange-100' :
              'bg-red-100'
            }`}>
              <RecommendationIcon className={`w-12 h-12 ${
                recommendation.color === 'green' ? 'text-green-600' :
                recommendation.color === 'orange' ? 'text-orange-600' :
                'text-red-600'
              }`} />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
            {recommendation.title}
          </CardTitle>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {recommendation.description}
          </p>
          <Badge 
            variant="outline" 
            className={`mt-4 text-lg px-4 py-2 ${
              recommendation.color === 'green' ? 'bg-green-100 text-green-800 border-green-300' :
              recommendation.color === 'orange' ? 'bg-orange-100 text-orange-800 border-orange-300' :
              'bg-red-100 text-red-800 border-red-300'
            }`}
          >
            Recommendation: {recommendation.recommendation}
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
                    {scores.psychometric?.overall || 0}%
                  </span>
                  <Badge variant={
                    (scores.psychometric?.overall || 0) >= 75 ? 'default' :
                    (scores.psychometric?.overall || 0) >= 60 ? 'secondary' : 'destructive'
                  }>
                    {(scores.psychometric?.overall || 0) >= 75 ? 'Excellent' :
                     (scores.psychometric?.overall || 0) >= 60 ? 'Good' : 'Needs Work'}
                  </Badge>
                </div>
                <Progress value={scores.psychometric?.overall || 0} className="h-3" />
              </div>
              <div className="space-y-2">
                {Object.entries(scores.psychometric).map(([key, score]) => (
                  key !== 'overall' && (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-gray-600">{key}</span>
                      <span className="font-medium">{typeof score === 'number' ? score : 0}%</span>
                    </div>
                  )
                ))}
              </div>
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
                    {scores.technical?.overall || 0}%
                  </span>
                  <Badge variant={
                    (scores.technical?.overall || 0) >= 75 ? 'default' :
                    (scores.technical?.overall || 0) >= 60 ? 'secondary' : 'destructive'
                  }>
                    {(scores.technical?.overall || 0) >= 75 ? 'Strong' :
                     (scores.technical?.overall || 0) >= 60 ? 'Moderate' : 'Developing'}
                  </Badge>
                </div>
                <Progress value={scores.technical?.overall || 0} className="h-3" />
              </div>
              <div className="space-y-2">
                {Object.entries(scores.technical).map(([key, score]) => (
                  key !== 'overall' && (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-gray-600">{key}</span>
                      <span className="font-medium">{typeof score === 'number' ? score : 0}%</span>
                    </div>
                  )
                ))}
              </div>
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
                    {scores.wiscar?.overall || 0}%
                  </span>
                  <Badge variant="outline" className="bg-orange-50 text-orange-700">
                    {scores.wiscar?.quadrant || 'Assessment Needed'}
                  </Badge>
                </div>
                <Progress value={scores.wiscar?.overall || 0} className="h-3" />
              </div>
              <div className="space-y-2">
                {Object.entries(scores.wiscar).map(([key, score]) => (
                  key !== 'overall' && (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-gray-600">{key}</span>
                      <span className="font-medium">{typeof score === 'number' ? score : 0}%</span>
                    </div>
                  )
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Career Roles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            Recommended Career Paths
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {getCareerRoles().map((role, index) => (
              <div key={index} className="p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{role.title}</h4>
                  <Badge 
                    variant={role.match === 'High' ? 'default' : role.match === 'Medium' ? 'secondary' : 'outline'}
                  >
                    {role.match} Match
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-1">
                  {role.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Book className="w-6 h-6 text-primary" />
            Recommended Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {getNextSteps().map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <Badge className="bg-primary text-primary-foreground mt-1">{index + 1}</Badge>
                <span className="text-sm">{step}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-center space-x-4">
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={onRestart}
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Retake Assessment
        </Button>
        {/* <Button
          className="border-green-500 text-green-700 hover:bg-green-50"
          variant="outline"
          asChild
        >
          <a href="https://docs.soliditylang.org/en/v0.8.17/" target="_blank" rel="noopener noreferrer">
            Start Learning
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </Button> */}
      </div>
    </div>
  );
};

export default ResultsSection;