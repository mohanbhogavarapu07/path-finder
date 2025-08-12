import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "../components/ProgressBar";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, 
  Brain, 
  Code, 
  Target, 
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Users,
  Star,
  Award,
  ExternalLink,
  Download,
  ArrowRight
} from "lucide-react";

const Results = () => {
  const navigate = useNavigate();

  // Mock results data - in a real app, this would come from props or context
  const assessmentData = {
    psychometric: {
      overall: 88,
      categories: {
        "Attention to Detail": 92,
        "Systematic Thinking": 85,
        "Conscientiousness": 90,
        "Stress Tolerance": 82
      }
    },
    technical: {
      overall: 76,
      correctAnswers: 4,
      totalQuestions: 5,
      categories: {
        "Medical Terminology": 80,
        "Mathematical Reasoning": 70,
        "Coding Knowledge": 75,
        "Pattern Recognition": 80
      }
    },
    wiscar: {
      overall: 82,
      quadrant: "High Potential",
      dimensions: {
        "Will": 90,
        "Interest": 85,
        "Skill": 70,
        "Cognitive": 88,
        "Ability": 82,
        "Real-World Alignment": 80
      }
    }
  };

  const { psychometric, technical, wiscar } = assessmentData;

  // Calculate overall recommendation
  const calculateOverallRecommendation = () => {
    const overallScore = Math.round((psychometric.overall + technical.overall + wiscar.overall) / 3);
    
    if (overallScore >= 75) {
      return {
        recommendation: 'YES',
        title: 'Medical Coding is an Excellent Fit for You!',
        color: 'green',
        icon: CheckCircle,
        description: 'You show strong alignment across psychological fit, technical readiness, and holistic assessment dimensions. Your attention to detail and systematic thinking make you well-suited for medical coding.'
      };
    } else if (overallScore >= 60) {
      return {
        recommendation: 'MAYBE',
        title: 'Medical Coding Could Be Right with Preparation',
        color: 'orange',
        icon: AlertTriangle,
        description: 'You have potential but may need to strengthen certain areas before diving deep into medical coding. Focus on building your technical knowledge and attention to detail.'
      };
    } else {
      return {
        recommendation: 'NO',
        title: 'Consider Alternative Healthcare Paths',
        color: 'red',
        icon: XCircle,
        description: 'Based on your current profile, other healthcare paths might be a better fit for your interests and skills.'
      };
    }
  };

  const recommendation = calculateOverallRecommendation();
  const RecommendationIcon = recommendation.icon;

  const careerPaths = [
    {
      title: 'Medical Coder',
      description: 'Assign diagnostic and procedure codes to medical records',
      skillMatch: Math.max(technical.categories['Medical Terminology'] || 0, 75),
      requirements: ['ICD-10-CM', 'CPT Codes', 'Medical Terminology', 'Attention to Detail']
    },
    {
      title: 'Medical Biller',
      description: 'Process insurance claims and handle billing procedures',
      skillMatch: Math.max(psychometric.categories['Systematic Thinking'] || 0, 70),
      requirements: ['Insurance Knowledge', 'Claims Processing', 'Communication', 'Organization']
    },
    {
      title: 'Health Information Technician',
      description: 'Manage and organize patient health information',
      skillMatch: Math.max(wiscar.dimensions['Real-World Alignment'] || 0, 72),
      requirements: ['Data Management', 'Privacy Compliance', 'Record Keeping', 'Analytical Skills']
    },
    {
      title: 'Clinical Data Analyst',
      description: 'Analyze healthcare data for insights and reporting',
      skillMatch: Math.max(technical.categories['Mathematical Reasoning'] || 0, 68),
      requirements: ['Data Analysis', 'Statistics', 'Healthcare Knowledge', 'Technical Skills']
    }
  ];

  const learningPath = [
    {
      stage: 'Foundation',
      modules: ['Medical Terminology', 'Anatomy & Physiology', 'Healthcare Basics', 'ICD-10-CM Introduction'],
      duration: '4-6 weeks',
      completed: false
    },
    {
      stage: 'Intermediate',
      modules: ['CPT Coding', 'HCPCS Codes', 'Medical Billing', 'Insurance Processes'],
      duration: '8-10 weeks',
      completed: false
    },
    {
      stage: 'Advanced',
      modules: ['Specialty Coding', 'Compliance & Ethics', 'Auditing', 'Quality Assurance'],
      duration: '6-8 weeks',
      completed: false
    },
    {
      stage: 'Certification',
      modules: ['CPC Exam Prep', 'Practice Tests', 'Portfolio Building', 'Job Search Skills'],
      duration: '4-6 weeks',
      completed: false
    }
  ];

  const alternatives = [
    { title: 'Nursing Assistant', reason: 'Direct patient care with less technical complexity' },
    { title: 'Medical Transcriptionist', reason: 'Documentation focus without coding requirements' },
    { title: 'Healthcare Administration', reason: 'Management and organizational skills' },
    { title: 'Patient Care Coordinator', reason: 'Patient-focused role with communication emphasis' }
  ];

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
                    {psychometric.overall}%
                  </span>
                  <Badge variant={
                    psychometric.overall >= 75 ? 'default' :
                    psychometric.overall >= 60 ? 'secondary' : 'destructive'
                  }>
                    {psychometric.overall >= 75 ? 'Excellent' :
                     psychometric.overall >= 60 ? 'Good' : 'Needs Work'}
                  </Badge>
                </div>
                <ProgressBar value={psychometric.overall} className="h-3" />
              </div>
              <div className="space-y-2">
                {Object.entries(psychometric.categories).map(([category, score]) => (
                  <div key={category} className="flex justify-between text-sm">
                    <span className="text-gray-600">{category}</span>
                    <span className="font-medium">{score}%</span>
                  </div>
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
                    {technical.overall}%
                  </span>
                  <Badge variant={
                    technical.overall >= 75 ? 'default' :
                    technical.overall >= 60 ? 'secondary' : 'destructive'
                  }>
                    {technical.overall >= 75 ? 'Strong' :
                     technical.overall >= 60 ? 'Moderate' : 'Developing'}
                  </Badge>
                </div>
                <ProgressBar value={technical.overall} className="h-3" />
              </div>
              <div className="text-sm text-gray-600">
                Correct: {technical.correctAnswers} / {technical.totalQuestions}
              </div>
              <div className="space-y-2">
                {Object.entries(technical.categories).map(([category, score]) => (
                  <div key={category} className="flex justify-between text-sm">
                    <span className="text-gray-600">{category}</span>
                    <span className="font-medium">{score}%</span>
                  </div>
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
                    {wiscar.overall}%
                  </span>
                  <Badge variant="outline" className="bg-orange-50 text-orange-700">
                    {wiscar.quadrant}
                  </Badge>
                </div>
                <ProgressBar value={wiscar.overall} className="h-3" />
              </div>
              <div className="space-y-2">
                {Object.entries(wiscar.dimensions).map(([dimension, score]) => (
                  <div key={dimension} className="flex justify-between text-sm">
                    <span className="text-gray-600">{dimension.split(' ')[0]}</span>
                    <span className="font-medium">{score}%</span>
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
                  <ProgressBar value={career.skillMatch} className="h-2" />
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
                <li>• Join the AAPC (American Academy of Professional Coders)</li>
                <li>• Enroll in a medical coding certification program</li>
                <li>• Start with "Medical Terminology" and "Anatomy & Physiology" courses</li>
                <li>• Practice with real medical coding scenarios</li>
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
              Based on your assessment results, here are some alternative healthcare paths that might be a better fit:
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
      <div className="flex flex-wrap gap-4 justify-center">
        <Button 
          size="lg" 
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => navigate("/")}
        >
          Retake Assessment
        </Button>
        {/* {recommendation.recommendation === 'YES' && (
          <Button variant="outline" size="lg" className="border-green-500 text-green-700 hover:bg-green-50">
            View Learning Resources
            <ExternalLink className="ml-2 w-4 h-4" />
          </Button>
        )}
        <Button variant="outline" size="lg">
          <Download className="mr-2 w-4 h-4" />
          Download Full Report
        </Button>
        <Button variant="outline" size="lg">
          Share Results
        </Button> */}
      </div>
    </div>
  );
};

export default Results;