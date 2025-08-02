import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Brain, 
  Code, 
  Target, 
  ChevronRight, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Users,
  BookOpen,
  ExternalLink,
  Star,
  Award
} from 'lucide-react';
import { AssessmentScores } from "../types/assessment";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { scores } = location.state as { scores: AssessmentScores };

  // Calculate overall recommendation
  const calculateOverallRecommendation = () => {
    const psychScore = scores.psychometric || 0;
    const techScore = scores.technical || 0;
    const wiscarScore = Math.round(Object.values(scores.wiscar).reduce((a, b) => a + b, 0) / 6);
    
    const overallScore = Math.round((psychScore + techScore + wiscarScore) / 3);
    
    if (overallScore >= 75) {
      return {
        recommendation: 'YES',
        title: 'Flutter is an Excellent Fit for You!',
        color: 'green',
        icon: CheckCircle,
        description: 'You show strong alignment across psychological fit, technical readiness, and holistic assessment dimensions.'
      };
    } else if (overallScore >= 60) {
      return {
        recommendation: 'MAYBE',
        title: 'Flutter Could Be Right with Preparation',
        color: 'orange',
        icon: AlertTriangle,
        description: 'You have potential but may need to strengthen certain areas before diving deep into Flutter.'
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

  const careerPaths = [
    {
      title: 'Flutter Developer',
      description: 'Build cross-platform mobile applications',
      skillMatch: Math.max(scores.technical || 0, 70),
      requirements: ['Dart Programming', 'Flutter Framework', 'Mobile Development']
    },
    {
      title: 'Mobile App Developer',
      description: 'Create native and cross-platform apps',
      skillMatch: Math.max(scores.psychometric || 0, 75),
      requirements: ['UI/UX Design', 'App Development', 'Platform Knowledge']
    },
    {
      title: 'Frontend Developer',
      description: 'Build web and mobile interfaces',
      skillMatch: Math.max(scores.wiscar.skill || 0, 70),
      requirements: ['JavaScript', 'React/Vue', 'CSS/HTML']
    },
    {
      title: 'UI/UX Developer',
      description: 'Design and implement user interfaces',
      skillMatch: Math.max(scores.psychometric || 0, 65),
      requirements: ['Design Principles', 'User Research', 'Prototyping']
    }
  ];

  const learningPath = [
    {
      stage: 'Foundation',
      modules: ['Dart Basics', 'Flutter Widgets', 'Basic Layouts'],
      duration: '4-6 weeks',
      completed: false
    },
    {
      stage: 'Intermediate',
      modules: ['Navigation', 'State Management', 'API Integration'],
      duration: '6-8 weeks',
      completed: false
    },
    {
      stage: 'Advanced',
      modules: ['Animations', 'Performance', 'App Deployment'],
      duration: '8-10 weeks',
      completed: false
    },
    {
      stage: 'Certification',
      modules: ['Flutter Certification', 'Practice Projects', 'Portfolio Building'],
      duration: '4-6 weeks',
      completed: false
    }
  ];

  const alternatives = [
    { title: 'React Native', reason: 'Similar cross-platform approach, JavaScript-based' },
    { title: 'Native iOS/Android', reason: 'Platform-specific development with better performance' },
    { title: 'Web Development', reason: 'Browser-based applications with broader reach' },
    { title: 'Backend Development', reason: 'Server-side programming and APIs' }
  ];

  return (
          <div className="min-h-screen bg-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Is Flutter Right for You?
              </h1>
              <p className="text-gray-600 text-sm">
                Comprehensive Career Assessment & Guidance
              </p>
            </div>
            <Badge variant="outline" className="text-sm">
              100% Complete
            </Badge>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <Progress value={100} className="h-2" />
          </div>
          
          {/* Section Navigation */}
          <div className="flex mt-4 space-x-4 overflow-x-auto">
            {[
              { id: 'intro', title: 'Introduction', icon: BookOpen, color: 'bg-blue-500' },
              { id: 'psychometric', title: 'Psychological Fit', icon: Brain, color: 'bg-purple-500' },
              { id: 'technical', title: 'Technical Aptitude', icon: Code, color: 'bg-green-500' },
              { id: 'wiscar', title: 'WISCAR Analysis', icon: Target, color: 'bg-orange-500' },
              { id: 'results', title: 'Your Results', icon: TrendingUp, color: 'bg-red-500' }
            ].map((section, index) => {
              const Icon = section.icon;
              const isActive = section.id === 'results';
              const isCompleted = true; // All sections are completed when viewing results
              
              return (
                <div
                  key={section.id}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg min-w-fit ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                      : isCompleted
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                  <span className="text-sm font-medium">{section.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
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
                        {Math.round(scores.psychometric)}%
                      </span>
                      <Badge variant={
                        scores.psychometric >= 75 ? 'default' :
                        scores.psychometric >= 60 ? 'secondary' : 'destructive'
                      }>
                        {scores.psychometric >= 75 ? 'Excellent' :
                         scores.psychometric >= 60 ? 'Good' : 'Needs Work'}
                      </Badge>
                    </div>
                    <Progress value={scores.psychometric} className="h-3" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Interest & Motivation</span>
                      <span className="font-medium">{Math.round(scores.psychometric * 0.3)}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Personality Fit</span>
                      <span className="font-medium">{Math.round(scores.psychometric * 0.25)}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Learning Style</span>
                      <span className="font-medium">{Math.round(scores.psychometric * 0.25)}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Working Approach</span>
                      <span className="font-medium">{Math.round(scores.psychometric * 0.2)}%</span>
                    </div>
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
                        {Math.round(scores.technical)}%
                      </span>
                      <Badge variant={
                        scores.technical >= 75 ? 'default' :
                        scores.technical >= 60 ? 'secondary' : 'destructive'
                      }>
                        {scores.technical >= 75 ? 'Strong' :
                         scores.technical >= 60 ? 'Moderate' : 'Developing'}
                      </Badge>
                    </div>
                    <Progress value={scores.technical} className="h-3" />
                  </div>
                  <div className="text-sm text-gray-600">
                    Questions Answered: 4 / 4
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Logical Reasoning</span>
                      <span className="font-medium">{Math.round(scores.technical * 0.25)}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Programming Concepts</span>
                      <span className="font-medium">{Math.round(scores.technical * 0.25)}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Flutter Fundamentals</span>
                      <span className="font-medium">{Math.round(scores.technical * 0.25)}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Numerical Skills</span>
                      <span className="font-medium">{Math.round(scores.technical * 0.25)}%</span>
                    </div>
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
                        {Math.round(Object.values(scores.wiscar).reduce((a, b) => a + b, 0) / 6)}%
                      </span>
                      <Badge variant="outline" className="bg-orange-50 text-orange-700">
                        WISCAR
                      </Badge>
                    </div>
                    <Progress value={Math.round(Object.values(scores.wiscar).reduce((a, b) => a + b, 0) / 6)} className="h-3" />
                  </div>
                  <div className="space-y-2">
                    {Object.entries(scores.wiscar).map(([dimension, score]) => (
                      <div key={dimension} className="flex justify-between text-sm">
                        <span className="text-gray-600">{dimension.split(' ')[0]}</span>
                        <span className="font-medium">{Math.round(score)}%</span>
                      </div>
                    ))}
                  </div>
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
          {recommendation.recommendation === 'YES' && (
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
                    <li>• Install Flutter SDK and set up your development environment</li>
                    <li>• Complete the Flutter "Get Started" tutorial</li>
                    <li>• Build your first Flutter app following the official guide</li>
                    <li>• Join the Flutter community on Discord and Reddit</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Alternative Recommendations */}
          {recommendation.recommendation !== 'YES' && (
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
              onClick={() => navigate('/')}
            >
              Retake Assessment
            </Button>
            {recommendation.recommendation === 'YES' && (
              <Button variant="outline" className="border-green-500 text-green-700 hover:bg-green-50">
                View Learning Resources
                <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}