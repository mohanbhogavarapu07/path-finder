import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  TrendingUp, 
  BookOpen, 
  Award,
  ArrowRight,
  BarChart3,
  Target,
  Lightbulb,
  Users,
  Star,
  ExternalLink,
  Brain,
  Code
} from "lucide-react";

interface WISCARScore {
  W: number; // Will
  I: number; // Interest  
  S: number; // Skill
  C: number; // Cognitive
  A: number; // Ability to Learn
  R: number; // Real-world Fit
  overall_confidence: number;
}

interface Recommendation {
  recommendation: "Yes" | "Maybe" | "No";
  confidence_score: number;
  reason: string;
  next_steps: string[];
}

interface ResultsProps {
  psychologicalScore: number;
  technicalScore: number;
  wiscarScore: WISCARScore;
  recommendation: Recommendation;
  onRestart: () => void;
}

export const Results = ({ 
  psychologicalScore, 
  technicalScore, 
  wiscarScore, 
  recommendation, 
  onRestart 
}: ResultsProps) => {
  // Calculate overall recommendation based on scores
  const calculateOverallRecommendation = () => {
    const overallScore = Math.round((psychologicalScore + technicalScore + wiscarScore.overall_confidence) / 3);
    if (overallScore >= 75) {
      return {
        recommendation: 'YES',
        title: 'Oracle Cloud is an Excellent Fit for You!',
        color: 'green',
        icon: CheckCircle,
        description: 'You show strong alignment across psychological fit, technical readiness, and holistic assessment dimensions.'
      };
    } else if (overallScore >= 60) {
      return {
        recommendation: 'MAYBE',
        title: 'Oracle Cloud Could Be Right with Preparation',
        color: 'orange',
        icon: AlertTriangle,
        description: 'You have potential but may need to strengthen certain areas before diving deep into Oracle Cloud.'
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

  const overallRecommendation = calculateOverallRecommendation();
  const RecommendationIcon = overallRecommendation.icon;

  // Career paths (Oracle Cloud context)
  const careerPaths = [
    {
      title: 'OCI Engineer',
      description: 'Deploy and manage compute, storage, and networking resources',
      skillMatch: Math.max(technicalScore, 70),
      requirements: ['Cloud Infrastructure', 'Networking', 'Security']
    },
    {
      title: 'Cloud Database Administrator',
      description: 'Manage Oracle Autonomous Database and optimize performance',
      skillMatch: Math.max(technicalScore, 75),
      requirements: ['SQL', 'Database Management', 'Performance Tuning']
    },
    {
      title: 'Oracle Cloud Solutions Architect',
      description: 'Design enterprise cloud solutions and architectures',
      skillMatch: Math.max(wiscarScore.R, 70),
      requirements: ['Architecture Design', 'Enterprise Systems', 'Stakeholder Communication']
    },
    {
      title: 'DevOps Engineer',
      description: 'Build CI/CD pipelines and infrastructure automation',
      skillMatch: Math.max(psychologicalScore, 65),
      requirements: ['Automation', 'CI/CD', 'Infrastructure as Code']
    }
  ];

  // Learning path (Oracle Cloud context)
  const learningPath = [
    {
      stage: 'Foundation',
      modules: ['Oracle Cloud Basics', 'OCI Console Fundamentals', 'Basic Networking'],
      duration: '2-4 weeks',
      completed: false
    },
    {
      stage: 'Intermediate',
      modules: ['Compute & Storage', 'Database Services', 'Security & Identity'],
      duration: '6-8 weeks',
      completed: false
    },
    {
      stage: 'Advanced',
      modules: ['Advanced Networking', 'DevOps & Automation', 'High Availability'],
      duration: '8-12 weeks',
      completed: false
    },
    {
      stage: 'Certification',
      modules: ['OCI Architect Associate', 'OCI Developer Associate', 'Real-world Projects'],
      duration: '4-6 weeks',
      completed: false
    }
  ];

  // Alternatives (Oracle Cloud context)
  const alternatives = [
    { title: 'Data Analyst', reason: 'Focus on data insights and business intelligence' },
    { title: 'Cloud Product Management', reason: 'Non-technical, high-level strategy' },
    { title: 'Software Engineering', reason: 'Broader development focus beyond cloud' },
    { title: 'IT Operations', reason: 'Traditional infrastructure management' }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Overall Recommendation */}
      <Card className={`border-2 ${
        overallRecommendation.color === 'green' ? 'border-green-200 bg-green-50' :
        overallRecommendation.color === 'orange' ? 'border-orange-200 bg-orange-50' :
        'border-red-200 bg-red-50'
      }`}>
        <CardHeader className="flex flex-col items-center text-center py-8">
          <div className={`p-4 rounded-full mb-4 ${
            overallRecommendation.color === 'green' ? 'bg-green-100' :
            overallRecommendation.color === 'orange' ? 'bg-orange-100' :
            'bg-red-100'
          }`}>
            <RecommendationIcon className={`w-12 h-12 ${
              overallRecommendation.color === 'green' ? 'text-green-600' :
              overallRecommendation.color === 'orange' ? 'text-orange-600' :
              'text-red-600'
            }`} />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
            {overallRecommendation.title}
          </CardTitle>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
            {overallRecommendation.description}
          </p>
          <Badge 
            variant="outline" 
            className={`text-lg px-4 py-2 ${
              overallRecommendation.color === 'green' ? 'bg-green-100 text-green-800 border-green-300' :
              overallRecommendation.color === 'orange' ? 'bg-orange-100 text-orange-800 border-orange-300' :
              'bg-red-100 text-red-800 border-red-300'
            }`}
          >
            Recommendation: {overallRecommendation.recommendation}
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
                    {psychologicalScore}%
                  </span>
                  <Badge variant={
                    psychologicalScore >= 75 ? 'default' :
                    psychologicalScore >= 60 ? 'secondary' : 'destructive'
                  }>
                    {psychologicalScore >= 75 ? 'Excellent' :
                     psychologicalScore >= 60 ? 'Good' : 'Needs Work'}
                  </Badge>
                </div>
                <Progress value={psychologicalScore} className="h-3" />
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
                    {technicalScore}%
                  </span>
                  <Badge variant={
                    technicalScore >= 75 ? 'default' :
                    technicalScore >= 60 ? 'secondary' : 'destructive'
                  }>
                    {technicalScore >= 75 ? 'Strong' :
                     technicalScore >= 60 ? 'Moderate' : 'Developing'}
                  </Badge>
                </div>
                <Progress value={technicalScore} className="h-3" />
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
                    {wiscarScore.overall_confidence}%
                  </span>
                  <Badge variant="outline" className="bg-orange-50 text-orange-700">
                    {wiscarScore.overall_confidence >= 75 ? 'High Confidence' :
                     wiscarScore.overall_confidence >= 60 ? 'Moderate Confidence' : 'Low Confidence'}
                  </Badge>
                </div>
                <Progress value={wiscarScore.overall_confidence} className="h-3" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Will</span>
                  <span className="font-medium">{wiscarScore.W}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Interest</span>
                  <span className="font-medium">{wiscarScore.I}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Skill</span>
                  <span className="font-medium">{wiscarScore.S}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Cognitive</span>
                  <span className="font-medium">{wiscarScore.C}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Ability</span>
                  <span className="font-medium">{wiscarScore.A}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Real-world</span>
                  <span className="font-medium">{wiscarScore.R}%</span>
                </div>
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
      {overallRecommendation.recommendation === 'YES' && (
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
                <li>• Sign up for Oracle Cloud Free Tier account</li>
                <li>• Complete Oracle Cloud Infrastructure Foundations course</li>
                <li>• Practice with hands-on labs and tutorials</li>
                <li>• Join Oracle Cloud community forums</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Alternative Recommendations */}
      {overallRecommendation.recommendation !== 'YES' && (
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
        {overallRecommendation.recommendation === 'YES' && (
          <Button variant="outline" className="border-green-500 text-green-700 hover:bg-green-50">
            View Learning Resources
            <ExternalLink className="ml-2 w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};