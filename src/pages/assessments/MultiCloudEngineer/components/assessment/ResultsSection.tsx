import React from 'react';
import { useAssessment } from '../../contexts/AssessmentContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import WISCARRadarChart from './RadarChart';
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  TrendingUp, 
  BookOpen, 
  Target, 
  Users, 
  Award,
  ArrowRight,
  RotateCcw,
  Brain,
  Code
} from 'lucide-react';

const ResultsSection: React.FC = () => {
  const { state, dispatch } = useAssessment();

  const handleRetakeAssessment = () => {
    dispatch({ type: 'RESET_ASSESSMENT' });
  };

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case 'yes':
        return <CheckCircle className="w-6 h-6 text-success" />;
      case 'maybe':
        return <AlertCircle className="w-6 h-6 text-warning" />;
      case 'no':
        return <XCircle className="w-6 h-6 text-destructive" />;
      default:
        return <AlertCircle className="w-6 h-6 text-warning" />;
    }
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'yes':
        return 'bg-success text-success-foreground';
      case 'maybe':
        return 'bg-warning text-warning-foreground';
      case 'no':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-warning text-warning-foreground';
    }
  };

  const getRecommendationText = (recommendation: string) => {
    switch (recommendation) {
      case 'yes':
        return 'Multi-Cloud Engineering is an excellent fit for you!';
      case 'maybe':
        return 'Multi-Cloud Engineering could be a good fit with some preparation.';
      case 'no':
        return 'Multi-Cloud Engineering may not be the best fit at this time.';
      default:
        return 'Assessment incomplete';
    }
  };

  // Recommendation color and icon logic
  const getRecommendationCardStyle = (rec: string) => {
    switch (rec) {
      case 'yes':
        return 'border-2 border-green-200 bg-green-50';
      case 'maybe':
        return 'border-2 border-orange-200 bg-orange-50';
      case 'no':
        return 'border-2 border-red-200 bg-red-50';
      default:
        return 'border-2 border-gray-200 bg-gray-50';
    }
  };
  const getRecommendationIconLarge = (rec: string) => {
    switch (rec) {
      case 'yes':
        return <CheckCircle className="w-12 h-12 text-green-600" />;
      case 'maybe':
        return <AlertCircle className="w-12 h-12 text-orange-600" />;
      case 'no':
        return <XCircle className="w-12 h-12 text-red-600" />;
      default:
        return <AlertCircle className="w-12 h-12 text-gray-600" />;
    }
  };

  const careerRoles = [
    { 
      title: 'Multi-Cloud Engineer', 
      match: state.results.overallScore >= 75 ? 'High' : state.results.overallScore >= 60 ? 'Medium' : 'Low',
      description: 'Manage infrastructure across multiple cloud platforms'
    },
    { 
      title: 'Cloud Security Engineer', 
      match: state.wiscarData.cognitive >= 70 ? 'High' : state.wiscarData.cognitive >= 60 ? 'Medium' : 'Low',
      description: 'Ensure compliance and security across clouds'
    },
    { 
      title: 'DevOps Engineer', 
      match: state.wiscarData.skill >= 70 ? 'High' : state.wiscarData.skill >= 60 ? 'Medium' : 'Low',
      description: 'Automate CI/CD pipelines across clouds'
    },
    { 
      title: 'Solutions Architect', 
      match: state.wiscarData.realWorld >= 70 ? 'High' : state.wiscarData.realWorld >= 60 ? 'Medium' : 'Low',
      description: 'Design end-to-end multi-cloud systems'
    },
    { 
      title: 'Site Reliability Engineer', 
      match: state.wiscarData.will >= 70 ? 'High' : state.wiscarData.will >= 60 ? 'Medium' : 'Low',
      description: 'Maintain uptime and performance'
    },
  ];

  const skillsMapping = [
    { skill: 'Networking Basics', match: state.technicalData.prerequisiteScore, gap: 100 - state.technicalData.prerequisiteScore },
    { skill: 'Scripting (Python/Bash)', match: state.wiscarData.skill, gap: 100 - state.wiscarData.skill },
    { skill: 'Cloud Concepts', match: state.technicalData.domainScore, gap: 100 - state.technicalData.domainScore },
    { skill: 'DevOps Tools', match: state.wiscarData.realWorld, gap: 100 - state.wiscarData.realWorld },
  ];

  const learningPath = [
    {
      level: 'Beginner',
      topics: ['Cloud Basics', 'OS fundamentals', 'Basic scripting'],
      recommended: state.results.overallScore < 60
    },
    {
      level: 'Intermediate',
      topics: ['Deep dive into AWS/Azure/GCP', 'Infrastructure as Code', 'Docker/Kubernetes'],
      recommended: state.results.overallScore >= 60 && state.results.overallScore < 80
    },
    {
      level: 'Job-Ready',
      topics: ['Project-based learning', 'CI/CD pipelines', 'Security practices'],
      recommended: state.results.overallScore >= 80
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Overall Recommendation */}
      <Card className={getRecommendationCardStyle(state.results.recommendation)}>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className={`p-4 rounded-full ${
              state.results.recommendation === 'yes' ? 'bg-green-100' :
              state.results.recommendation === 'maybe' ? 'bg-orange-100' :
              state.results.recommendation === 'no' ? 'bg-red-100' : 'bg-gray-100'
            }`}>
              {getRecommendationIconLarge(state.results.recommendation)}
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
            {getRecommendationText(state.results.recommendation)}
          </CardTitle>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-2">
            {state.results.recommendation === 'yes' && 'You show strong alignment across psychological fit, technical readiness, and holistic assessment dimensions.'}
            {state.results.recommendation === 'maybe' && 'You have potential but may need to strengthen certain areas before diving deep into multi-cloud engineering.'}
            {state.results.recommendation === 'no' && 'Based on your current profile, other technology paths might be a better fit for your interests and skills.'}
          </p>
          <Badge 
            variant="outline" 
            className={`mt-4 text-lg px-4 py-2 ${
              state.results.recommendation === 'yes' ? 'bg-green-100 text-green-800 border-green-300' :
              state.results.recommendation === 'maybe' ? 'bg-orange-100 text-orange-800 border-orange-300' :
              state.results.recommendation === 'no' ? 'bg-red-100 text-red-800 border-red-300' : 'bg-gray-100 text-gray-800 border-gray-300'
            }`}
          >
            Recommendation: {state.results.recommendation?.toUpperCase()}
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
                    {Math.round(state.psychologicalData.interestScore || 0)}%
                  </span>
                  <Badge variant={
                    (state.psychologicalData.interestScore || 0) >= 75 ? 'default' :
                    (state.psychologicalData.interestScore || 0) >= 60 ? 'secondary' : 'destructive'
                  }>
                    {(state.psychologicalData.interestScore || 0) >= 75 ? 'Excellent' :
                     (state.psychologicalData.interestScore || 0) >= 60 ? 'Good' : 'Needs Work'}
                  </Badge>
                </div>
                <Progress value={state.psychologicalData.interestScore || 0} className="h-3" />
              </div>
              <div className="space-y-2">
                {/* Add category breakdown if available */}
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
                    {Math.round(state.technicalData.aptitudeScore || 0)}%
                  </span>
                  <Badge variant={
                    (state.technicalData.aptitudeScore || 0) >= 75 ? 'default' :
                    (state.technicalData.aptitudeScore || 0) >= 60 ? 'secondary' : 'destructive'
                  }>
                    {(state.technicalData.aptitudeScore || 0) >= 75 ? 'Strong' :
                     (state.technicalData.aptitudeScore || 0) >= 60 ? 'Moderate' : 'Developing'}
                  </Badge>
                </div>
                <Progress value={state.technicalData.aptitudeScore || 0} className="h-3" />
              </div>
              <div className="text-sm text-gray-600">
                {/* Add correct/total if available */}
              </div>
              <div className="space-y-2">
                {/* Add category breakdown if available */}
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
                    {Math.round(state.wiscarData.skill || 0)}%
                  </span>
                  <Badge variant="outline" className="bg-orange-50 text-orange-700">
                    {state.results.recommendation?.toUpperCase()}
                  </Badge>
                </div>
                <Progress value={state.wiscarData.skill || 0} className="h-3" />
              </div>
              <div className="space-y-2">
                {/* Add dimension breakdown if available */}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Career Roles Match */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-primary" />
            <span>Career Role Compatibility</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {careerRoles.map((role, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gradient-card rounded-lg">
                <div>
                  <h4 className="font-semibold">{role.title}</h4>
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                </div>
                <Badge 
                  variant={role.match === 'High' ? 'default' : role.match === 'Medium' ? 'secondary' : 'outline'}
                  className={role.match === 'High' ? 'bg-success' : role.match === 'Medium' ? 'bg-warning' : ''}
                >
                  {role.match} Match
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skills Mapping */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span>Skills Assessment</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {skillsMapping.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{skill.skill}</span>
                  <span className="text-sm text-muted-foreground">
                    {Math.round(skill.match)}% proficiency
                  </span>
                </div>
                <Progress value={skill.match} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  Gap: {skill.gap > 40 ? 'High' : skill.gap > 20 ? 'Moderate' : 'Low'}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Learning Path */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <span>Recommended Learning Path</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {learningPath.map((level, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-lg border-2 ${
                  level.recommended 
                    ? 'border-primary bg-primary/5' 
                    : 'border-muted bg-muted/5'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{level.level}</h4>
                  {level.recommended && (
                    <Badge className="bg-primary">Recommended</Badge>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {level.topics.map((topic, topicIndex) => (
                    <Badge key={topicIndex} variant="outline" className="text-xs">
                      {topic}
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
          <CardTitle className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-primary" />
            <span>Your Next Steps</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {state.results.nextSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <span className="text-sm">{step}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => window.location.reload()}
        >
          Retake Assessment
        </Button>
        {/* <Button 
          size="lg"
          className="bg-gradient-primary"
          onClick={() => window.open('https://aws.amazon.com/training/', '_blank')}
        >
          Start Learning
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button> */}
      </div>
    </div>
  );
};

export default ResultsSection;