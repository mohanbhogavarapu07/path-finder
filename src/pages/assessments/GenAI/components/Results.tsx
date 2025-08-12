import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AssessmentResult } from "@/types/assessment";
import { 
  TrendingUp, 
  Brain, 
  Code, 
  Target, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Users,
  BookOpen,
  ArrowRight,
  Star,
  Award,
  ExternalLink
} from "lucide-react";

interface ResultsProps {
  result: AssessmentResult;
  onRestart: () => void;
}

export const Results = ({ result, onRestart }: ResultsProps) => {
  const getRecommendationIcon = () => {
    switch (result.recommendation) {
      case 'yes': return <CheckCircle className="w-12 h-12 text-green-600" />;
      case 'maybe': return <AlertTriangle className="w-12 h-12 text-orange-600" />;
      case 'no': return <XCircle className="w-12 h-12 text-red-600" />;
    }
  };

  const getRecommendationTitle = () => {
    switch (result.recommendation) {
      case 'yes': return "Generative AI is an Excellent Fit for You!";
      case 'maybe': return "Generative AI Could Be Right with Preparation";
      case 'no': return "Consider Alternative Paths";
    }
  };

  const getRecommendationDescription = () => {
    switch (result.recommendation) {
      case 'yes': return "You show strong alignment across psychological fit, technical readiness, and holistic assessment dimensions.";
      case 'maybe': return "You have potential but may need to strengthen certain areas before diving deep into Generative AI.";
      case 'no': return "Based on your current profile, other technology paths might be a better fit for your interests and skills.";
    }
  };

  const getRecommendationColor = () => {
    switch (result.recommendation) {
      case 'yes': return "border-green-200 bg-green-50";
      case 'maybe': return "border-orange-200 bg-orange-50";
      case 'no': return "border-red-200 bg-red-50";
    }
  };

  const getRecommendationBadgeColor = () => {
    switch (result.recommendation) {
      case 'yes': return "bg-green-100 text-green-800 border-green-300";
      case 'maybe': return "bg-orange-100 text-orange-800 border-orange-300";
      case 'no': return "bg-red-100 text-red-800 border-red-300";
    }
  };

  const getRecommendationIconBg = () => {
    switch (result.recommendation) {
      case 'yes': return "bg-green-100";
      case 'maybe': return "bg-orange-100";
      case 'no': return "bg-red-100";
    }
  };

  const careerPaths = [
    {
      title: 'Prompt Engineer',
      description: 'Craft effective inputs for AI models',
      skillMatch: Math.max(result.technicalReadiness, 70),
      requirements: ['Prompt Design', 'AI Model Understanding', 'Creative Writing']
    },
    {
      title: 'AI Research Engineer',
      description: 'Build custom AI applications',
      skillMatch: Math.max(result.technicalReadiness, 75),
      requirements: ['Python', 'Machine Learning', 'Deep Learning']
    },
    {
      title: 'GenAI Product Manager',
      description: 'Guide AI product strategy',
      skillMatch: Math.max(result.psychologicalFit, 70),
      requirements: ['Product Strategy', 'AI Understanding', 'User Research']
    },
    {
      title: 'Creative AI Developer',
      description: 'Build artistic AI tools',
      skillMatch: Math.max(result.technicalReadiness, 65),
      requirements: ['Creative Coding', 'AI APIs', 'Design Thinking']
    }
  ];

  const learningPath = [
    {
      stage: 'Foundation',
      modules: ['Python Programming', 'Machine Learning Basics', 'AI Fundamentals'],
      duration: '4-6 weeks',
      completed: false
    },
    {
      stage: 'Intermediate',
      modules: ['Transformer Models', 'Prompt Engineering', 'API Integration'],
      duration: '6-8 weeks',
      completed: false
    },
    {
      stage: 'Advanced',
      modules: ['Fine-tuning Models', 'Custom AI Applications', 'Ethics & Safety'],
      duration: '8-12 weeks',
      completed: false
    },
    {
      stage: 'Specialization',
      modules: ['Portfolio Projects', 'Industry Applications', 'Certification Prep'],
      duration: '4-6 weeks',
      completed: false
    }
  ];

  const alternatives = [
    { title: 'Data Science', reason: 'Similar analytical focus, more established field' },
    { title: 'Software Engineering', reason: 'Strong technical foundation, broader applications' },
    { title: 'UX/UI Design', reason: 'Creative problem-solving with user focus' },
    { title: 'Product Management', reason: 'Technology leadership and strategy' }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Overall Recommendation */}
      <Card className={`border-2 ${getRecommendationColor()}`}>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className={`p-4 rounded-full ${getRecommendationIconBg()}`}>
              {getRecommendationIcon()}
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
            {getRecommendationTitle()}
          </CardTitle>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {getRecommendationDescription()}
          </p>
          <Badge 
            variant="outline" 
            className={`mt-4 text-lg px-4 py-2 ${getRecommendationBadgeColor()}`}
          >
            Recommendation: {result.recommendation.toUpperCase()}
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
                    {result.psychologicalFit}%
                  </span>
                  <Badge variant={
                    result.psychologicalFit >= 75 ? 'default' :
                    result.psychologicalFit >= 60 ? 'secondary' : 'destructive'
                  }>
                    {result.psychologicalFit >= 75 ? 'Excellent' :
                     result.psychologicalFit >= 60 ? 'Good' : 'Needs Work'}
                  </Badge>
                </div>
                <Progress value={result.psychologicalFit} className="h-3" />
              </div>
              <p className="text-sm text-gray-600">
                Your personality, interests, and cognitive style alignment with Gen AI work
              </p>
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
                    {result.technicalReadiness}%
                  </span>
                  <Badge variant={
                    result.technicalReadiness >= 75 ? 'default' :
                    result.technicalReadiness >= 60 ? 'secondary' : 'destructive'
                  }>
                    {result.technicalReadiness >= 75 ? 'Strong' :
                     result.technicalReadiness >= 60 ? 'Moderate' : 'Developing'}
                  </Badge>
                </div>
                <Progress value={result.technicalReadiness} className="h-3" />
              </div>
              <p className="text-sm text-gray-600">
                Your current technical skills and knowledge foundation
              </p>
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
                    {Math.round(Object.values(result.wiscarScores).reduce((a, b) => a + b, 0) / 6)}%
                  </span>
                  <Badge variant="outline" className="bg-orange-50 text-orange-700">
                    {Math.round(Object.values(result.wiscarScores).reduce((a, b) => a + b, 0) / 6) >= 75 ? 'Comprehensive' :
                     Math.round(Object.values(result.wiscarScores).reduce((a, b) => a + b, 0) / 6) >= 60 ? 'Balanced' : 'Developing'}
                  </Badge>
                </div>
                <Progress 
                  value={Math.round(Object.values(result.wiscarScores).reduce((a, b) => a + b, 0) / 6)} 
                  className="h-3" 
                />
              </div>
              <p className="text-sm text-gray-600">
                Comprehensive readiness across six key dimensions
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* WISCAR Detailed Breakdown */}
      <Card className="border-2 border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-orange-600" />
            <span>WISCAR Framework Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(result.wiscarScores).map(([key, score]) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between">
                  <span className="capitalize font-medium text-gray-700">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="font-bold text-gray-900">{score}%</span>
                </div>
                <Progress value={score} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

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
                    career.skillMatch >= 75 ? 'bg-green-50 text-green-700' :
                    career.skillMatch >= 60 ? 'bg-orange-50 text-orange-700' :
                    'bg-red-50 text-red-700'
                  }>
                    {career.skillMatch}% Match
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{career.description}</p>
                <div className="mb-3">
                  <Progress value={career.skillMatch} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-gray-500 mb-1">Key Requirements:</div>
                  {career.requirements.map((req, reqIndex) => (
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

      {/* Next Steps */}
      {result.recommendation === 'yes' && (
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-6 h-6 text-green-600" />
              <span>Your Learning Path</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {learningPath.map((stage, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-700 font-semibold text-sm">{index + 1}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900">{stage.stage}</h4>
                      <Badge variant="outline">{stage.duration}</Badge>
                    </div>
                    <div className="space-y-1">
                      {stage.modules.map((module, moduleIndex) => (
                        <div key={moduleIndex} className="text-sm text-gray-600">
                          • {module}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Recommended Next Steps:</h4>
              <ul className="space-y-1 text-sm text-blue-800">
                <li>• Join AI/ML communities and forums</li>
                <li>• Start with Python programming fundamentals</li>
                <li>• Explore OpenAI Playground and similar tools</li>
                <li>• Practice with hands-on projects and tutorials</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Alternative Recommendations */}
      {result.recommendation !== 'yes' && (
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="w-6 h-6 text-blue-600" />
              <span>Alternative Career Paths</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Based on your assessment results, here are some alternative technology paths that might be a better fit:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {alternatives.map((alt, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{alt.title}</h4>
                  <p className="text-sm text-gray-600">{alt.reason}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={onRestart}
        >
          Retake Assessment
        </Button>
        {result.recommendation === 'yes' && (
          <Button variant="outline" className="border-green-500 text-green-700 hover:bg-green-50">
            View Learning Resources
            <ExternalLink className="ml-2 w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};