import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Code, 
  Target, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  ArrowRight,
  Download,
  Share2
} from 'lucide-react';

type AssessmentResults = {
  answers: Record<string, any>;
  duration: number;
  sections: Array<{ id: string; title: string }>;
};

type ScoreData = {
  psychological: number;
  technical: number;
  wiscar: number;
  motivation: number;
  preferences: number;
  overall: number;
};

type RecommendationType = 'Yes' | 'Maybe' | 'No';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState<AssessmentResults | null>(null);
  const [scores, setScores] = useState<ScoreData | null>(null);
  const [recommendation, setRecommendation] = useState<RecommendationType>('Maybe');
  const [confidenceScore, setConfidenceScore] = useState(0);

  useEffect(() => {
    const data = location.state as AssessmentResults;
    if (!data) {
      navigate('/');
      return;
    }

    setResults(data);
    
    // Calculate scores based on answers
    const calculatedScores = calculateScores(data.answers);
    setScores(calculatedScores);
    
    // Determine recommendation
    const { recommendation: rec, confidence } = determineRecommendation(calculatedScores);
    setRecommendation(rec);
    setConfidenceScore(confidence);
  }, [location.state, navigate]);

  const calculateScores = (answers: Record<string, any>): ScoreData => {
    // Psychological Fit Score (0-100)
    const psychologicalAnswers = Object.entries(answers)
      .filter(([key]) => key.startsWith('interest_') || key.startsWith('personality_') || key.startsWith('cognitive_') || key.startsWith('grit_'))
      .map(([, value]) => value);
    
    const psychologicalScore = psychologicalAnswers.length > 0 
      ? (psychologicalAnswers.reduce((sum, val) => sum + val, 0) / psychologicalAnswers.length / 7) * 100
      : 0;

    // Technical Aptitude Score (0-100)
    const technicalAnswers = Object.entries(answers)
      .filter(([key]) => key.startsWith('math_') || key.startsWith('programming_') || key.startsWith('ml_') || key.startsWith('logic_'));
    
    let technicalScore = 0;
    technicalAnswers.forEach(([key, value]) => {
      if (key === 'math_1' && value === 'A 2x2 matrix') technicalScore += 25;
      if (key === 'math_2' && value === 'The occurrence of one event does not affect the probability of the other') technicalScore += 25;
      if (key === 'programming_1' && value === 'Dictionary') technicalScore += 25;
      if (key === 'programming_2' && value === 'To repeat a block of code a specific number of times') technicalScore += 25;
      if (key === 'ml_1' && value === 'Supervised learning uses labeled data, unsupervised learning uses unlabeled data') technicalScore += 25;
      if (key === 'ml_2' && value === 'The model performs well on training data but poorly on new data') technicalScore += 25;
      if (key === 'ml_3' && value === 'Accuracy') technicalScore += 25;
      if (key === 'logic_1' && value === false) technicalScore += 25; // Correct answer is false
    });
    technicalScore = Math.min(technicalScore, 100);

    // WISCAR Score (0-100)
    const wiscarAnswers = Object.entries(answers)
      .filter(([key]) => key.startsWith('will_') || key.startsWith('interest_3') || key.startsWith('skill_') || key.startsWith('cognitive_2') || key.startsWith('ability_') || key.startsWith('real_world_'))
      .map(([, value]) => value);
    
    const wiscarScore = wiscarAnswers.length > 0 
      ? (wiscarAnswers.reduce((sum, val) => sum + val, 0) / wiscarAnswers.length / 7) * 100
      : 0;

    // Motivation Score (0-100)
    const motivationAnswers = Object.entries(answers)
      .filter(([key]) => key.startsWith('motivation_') || key.startsWith('career_goal_'))
      .map(([, value]) => typeof value === 'number' ? value : 5); // Default for multiple choice
    
    const motivationScore = motivationAnswers.length > 0 
      ? (motivationAnswers.reduce((sum, val) => sum + val, 0) / motivationAnswers.length / 7) * 100
      : 0;

    // Preferences Score (0-100)
    const preferencesAnswers = Object.entries(answers)
      .filter(([key]) => key.startsWith('learning_') || key.startsWith('collaboration_') || key.startsWith('environment_'))
      .map(([, value]) => typeof value === 'number' ? value : 5); // Default for multiple choice
    
    const preferencesScore = preferencesAnswers.length > 0 
      ? (preferencesAnswers.reduce((sum, val) => sum + val, 0) / preferencesAnswers.length / 7) * 100
      : 0;

    // Overall Score
    const overall = (psychologicalScore + technicalScore + wiscarScore + motivationScore + preferencesScore) / 5;

    return {
      psychological: Math.round(psychologicalScore),
      technical: Math.round(technicalScore),
      wiscar: Math.round(wiscarScore),
      motivation: Math.round(motivationScore),
      preferences: Math.round(preferencesScore),
      overall: Math.round(overall)
    };
  };

  const determineRecommendation = (scores: ScoreData): { recommendation: RecommendationType; confidence: number } => {
    const { psychological, technical, wiscar, overall } = scores;
    
    if (overall >= 75 && technical >= 60 && psychological >= 70) {
      return { recommendation: 'Yes', confidence: Math.min(95, overall + 10) };
    } else if (overall >= 60 && (technical >= 40 || psychological >= 60)) {
      return { recommendation: 'Maybe', confidence: Math.min(85, overall + 5) };
    } else {
      return { recommendation: 'No', confidence: Math.min(75, 100 - overall) };
    }
  };

  const getRecommendationIcon = () => {
    switch (recommendation) {
      case 'Yes': return <CheckCircle className="w-8 h-8 text-neural-green" />;
      case 'Maybe': return <AlertCircle className="w-8 h-8 text-neural-orange" />;
      case 'No': return <XCircle className="w-8 h-8 text-red-500" />;
    }
  };

  const getRecommendationColor = () => {
    switch (recommendation) {
      case 'Yes': return 'bg-neural-green/10 text-neural-green';
      case 'Maybe': return 'bg-neural-orange/10 text-neural-orange';
      case 'No': return 'bg-red-500/10 text-red-500';
    }
  };

  const getNextSteps = () => {
    if (recommendation === 'Yes') {
      return [
        'Start with a strong Python + Math foundation',
        'Follow the path: Python → Math → ML Models → Real Projects',
        'Join AI/ML communities and start building a portfolio',
        'Consider enrolling in a comprehensive ML course'
      ];
    } else if (recommendation === 'Maybe') {
      return [
        'Try introductory AI courses (Google AI for Everyone, Coursera)',
        'Explore AI tools (AutoML, HuggingFace playgrounds)',
        'Join communities (Kaggle, fast.ai forums)',
        'Work on your foundational skills first'
      ];
    } else {
      return [
        'Consider Data Analytics with Python (less theoretical)',
        'Explore AI Product Management (non-coding, high strategy)',
        'Look into UX for AI Systems',
        'Focus on building foundational skills first'
      ];
    }
  };

  const careerRoles = [
    { title: 'Machine Learning Engineer', match: scores?.technical || 0, level: 'Advanced' },
    { title: 'Data Scientist', match: Math.round(((scores?.technical || 0) + (scores?.psychological || 0)) / 2), level: 'Intermediate-Advanced' },
    { title: 'AI Product Manager', match: scores?.motivation || 0, level: 'Mid-level' },
    { title: 'ML Research Assistant', match: scores?.psychological || 0, level: 'Entry-Mid' },
    { title: 'AI Ethics Analyst', match: scores?.preferences || 0, level: 'Mid-level' }
  ];

  if (!results || !scores) {
    return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">Loading results...</div>
    </div>;
  }

  // Color mapping for cards and badges
  const cardStyles = {
    psychological: 'border-purple-200 bg-purple-50',
    technical: 'border-green-200 bg-green-50',
    wiscar: 'border-orange-200 bg-orange-50',
    motivation: 'border-blue-200 bg-blue-50',
    preferences: 'border-red-200 bg-red-50',
  };
  const iconStyles = {
    psychological: <Brain className="w-5 h-5 text-purple-600" />,
    technical: <Code className="w-5 h-5 text-green-600" />,
    wiscar: <Target className="w-5 h-5 text-orange-600" />,
    motivation: <TrendingUp className="w-5 h-5 text-blue-600" />,
    preferences: <Users className="w-5 h-5 text-red-600" />,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="mb-4 px-4 py-2 text-sm font-medium border border-blue-200 bg-blue-50 text-blue-700">
            <Brain className="w-4 h-4 mr-2" />
            Assessment Complete
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            🎯 Your AI/ML Readiness Results
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Completed in {results.duration} minutes • Comprehensive analysis across 5 dimensions
          </p>
        </div>

        {/* Overall Recommendation */}
        <Card className={`border-2 ${
          recommendation === 'Yes' ? 'border-green-200 bg-green-50' :
          recommendation === 'Maybe' ? 'border-orange-200 bg-orange-50' :
          'border-red-200 bg-red-50'
        }`}>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className={`p-4 rounded-full ${
                recommendation === 'Yes' ? 'bg-green-100' :
                recommendation === 'Maybe' ? 'bg-orange-100' :
                'bg-red-100'
              }`}>
                {getRecommendationIcon()}
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
              {recommendation === 'Yes' && 'AI/ML is an Excellent Fit for You!'}
              {recommendation === 'Maybe' && 'AI/ML Could Be Right with Preparation'}
              {recommendation === 'No' && 'Consider Alternative Paths'}
            </CardTitle>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {recommendation === 'Yes' && 'You show strong potential for an AI/ML career. Your motivation and aptitude align well with the field.'}
              {recommendation === 'Maybe' && 'You have some potential but may need to develop certain skills. Consider starting with foundational courses.'}
              {recommendation === 'No' && 'AI/ML may not be the best fit right now. Consider alternative paths or focus on building prerequisites.'}
            </p>
            <Badge 
              variant="outline" 
              className={`mt-4 text-lg px-4 py-2 ${
                recommendation === 'Yes' ? 'bg-green-100 text-green-800 border-green-300' :
                recommendation === 'Maybe' ? 'bg-orange-100 text-orange-800 border-orange-300' :
                'bg-red-100 text-red-800 border-red-300'
              }`}
            >
              Recommendation: {recommendation}
            </Badge>
          </CardHeader>
        </Card>

        {/* Detailed Scores */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className={`border-2 ${cardStyles.psychological}`}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {iconStyles.psychological}
                <span>Psychological Fit</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-2">
                <span className="text-2xl font-bold text-purple-600">{scores.psychological}%</span>
                <Badge variant={scores.psychological >= 75 ? 'default' : scores.psychological >= 60 ? 'secondary' : 'destructive'}>
                  {scores.psychological >= 75 ? 'Excellent' : scores.psychological >= 60 ? 'Good' : 'Needs Work'}
                </Badge>
              </div>
              <Progress value={scores.psychological} className="h-3" />
              <div className="text-xs text-gray-600 mt-2">Personality compatibility and mindset alignment</div>
            </CardContent>
          </Card>

          <Card className={`border-2 ${cardStyles.technical}`}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {iconStyles.technical}
                <span>Technical Aptitude</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-2">
                <span className="text-2xl font-bold text-green-600">{scores.technical}%</span>
                <Badge variant={scores.technical >= 75 ? 'default' : scores.technical >= 60 ? 'secondary' : 'destructive'}>
                  {scores.technical >= 75 ? 'Strong' : scores.technical >= 60 ? 'Moderate' : 'Developing'}
                </Badge>
              </div>
              <Progress value={scores.technical} className="h-3" />
              <div className="text-xs text-gray-600 mt-2">Programming, math, and ML knowledge</div>
            </CardContent>
          </Card>

          <Card className={`border-2 ${cardStyles.wiscar}`}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {iconStyles.wiscar}
                <span>WISCAR</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-2">
                <span className="text-2xl font-bold text-orange-600">{scores.wiscar}%</span>
                <Badge variant={scores.wiscar >= 75 ? 'default' : scores.wiscar >= 60 ? 'secondary' : 'destructive'}>
                  {scores.wiscar >= 75 ? 'Strong' : scores.wiscar >= 60 ? 'Moderate' : 'Developing'}
                </Badge>
              </div>
              <Progress value={scores.wiscar} className="h-3" />
              <div className="text-xs text-gray-600 mt-2">Will, Interest, Skill, Cognitive, Ability, Real-world fit</div>
            </CardContent>
          </Card>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className={`border-2 ${cardStyles.motivation}`}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {iconStyles.motivation}
                <span>Motivation</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-2">
                <span className="text-2xl font-bold text-blue-600">{scores.motivation}%</span>
                <Badge variant={scores.motivation >= 75 ? 'default' : scores.motivation >= 60 ? 'secondary' : 'destructive'}>
                  {scores.motivation >= 75 ? 'Strong' : scores.motivation >= 60 ? 'Moderate' : 'Developing'}
                </Badge>
              </div>
              <Progress value={scores.motivation} className="h-3" />
              <div className="text-xs text-gray-600 mt-2">Drive and career goal alignment</div>
            </CardContent>
          </Card>
          <Card className={`border-2 ${cardStyles.preferences}`}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {iconStyles.preferences}
                <span>Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-2">
                <span className="text-2xl font-bold text-red-600">{scores.preferences}%</span>
                <Badge variant={scores.preferences >= 75 ? 'default' : scores.preferences >= 60 ? 'secondary' : 'destructive'}>
                  {scores.preferences >= 75 ? 'Strong' : scores.preferences >= 60 ? 'Moderate' : 'Developing'}
                </Badge>
              </div>
              <Progress value={scores.preferences} className="h-3" />
              <div className="text-xs text-gray-600 mt-2">Learning style and work preferences</div>
            </CardContent>
          </Card>
        </div>

        {/* Career Matches */}
        <Card className="border-2 border-gray-200 bg-white">
          <CardHeader>
            <CardTitle>🔓 Career Role Matches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {careerRoles.map((role, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold">{role.title}</h3>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {role.level}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 min-w-[120px]">
                    <Progress value={role.match} className="h-2 flex-1" />
                    <span className="font-medium">{role.match}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle>🛤️ Recommended Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {getNextSteps().map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-700 font-semibold text-sm">{index + 1}</span>
                  </div>
                  <p className="text-sm">{step}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="px-8 py-6 bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => navigate('/')}
          >
            Take Another Assessment
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          <Button variant="outline" size="lg" className="px-8 py-6">
            <Download className="w-5 h-5 mr-2" />
            Download Report
          </Button>
          
          <Button variant="outline" size="lg" className="px-8 py-6">
            <Share2 className="w-5 h-5 mr-2" />
            Share Results
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;