import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
  Award,
  Download,
  Share2,
  BarChart3,
  Zap,
  Lightbulb,
  Clock,
  MapPin,
  DollarSign,
  ArrowUpRight,
  ArrowRight,
  Info,
  HelpCircle,
  PlayCircle
} from 'lucide-react';
import { DynamicAssessment, AssessmentResults } from '@/lib/api';
import { useAssessmentResults } from '@/hooks/useAssessments';
import FeedbackDialog from '@/components/FeedbackDialog';
import { assessmentAPI } from '@/lib/api';
import { usePDFResults } from '@/hooks/usePDFResults';
import PDFLayout from './PDFLayout';
import './PDFLayout.css';

interface DynamicResultsSectionProps {
  assessment: DynamicAssessment;
  assessmentData: any;
  sessionId: string | null;
}

const DynamicResultsSection: React.FC<DynamicResultsSectionProps> = ({
  assessment,
  assessmentData,
  sessionId
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const { data: resultsData, isLoading, error } = useAssessmentResults(assessment.id, sessionId || '');
  const [showFeedback, setShowFeedback] = useState(true);

  const handleFeedbackSubmit = async (feedback: { rating?: number; comments?: string }) => {
    try {
      console.log('handleFeedbackSubmit called with:', { feedback, sessionId, assessmentId: assessment.id });
      
      // Persist locally for inclusion on submit (defense-in-depth)
      localStorage.setItem('assessmentFeedback', JSON.stringify(feedback));
      console.log('Feedback saved to localStorage');
      
      // Persist to backend now as well (for sessions that already completed)
      if (sessionId) {
        console.log('Calling assessmentAPI.saveFeedback...');
        const result = await assessmentAPI.saveFeedback(assessment.id, sessionId, feedback);
        console.log('saveFeedback API call result:', result);
      } else {
        console.log('No sessionId available, skipping backend save');
      }
    } catch (e) {
      // Non-blocking
      console.error('Failed to save feedback:', e);
      console.error('Error details:', e);
    } finally {
      setShowFeedback(false);
    }
  };
  
  // Print functionality
  const { pdfContainerRef, printResults, saveAsPDF, isPrinting, isSavingPDF } = usePDFResults({
    assessmentTitle: assessment.title,
    onSuccess: () => console.log('Print operation completed successfully'),
    onError: (error) => console.error('Print operation failed:', error)
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Calculating your results...</p>
        </div>
      </div>
    );
  }

  if (error || !resultsData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-red-600">Error Loading Results</CardTitle>
            <CardDescription>
              There was an issue loading your assessment results. Please try again.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/assessments')}>
              Back to Assessments
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const results: AssessmentResults = resultsData.results;

  // Safety check to ensure results exists
  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-red-600">No Results Available</CardTitle>
            <CardDescription>
              Assessment results are not available. Please try again.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/assessments')}>
              Back to Assessments
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getRecommendationConfig = (recommendation: string) => {
    switch (recommendation) {
      case 'YES':
        return {
          color: 'green',
          icon: CheckCircle,
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-800'
        };
      case 'MAYBE':
        return {
          color: 'orange',
          icon: AlertTriangle,
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          textColor: 'text-orange-800'
        };
      case 'NO':
        return {
          color: 'red',
          icon: XCircle,
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-800'
        };
      default:
        return {
          color: 'gray',
          icon: HelpCircle,
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          textColor: 'text-gray-800'
        };
    }
  };

  const config = getRecommendationConfig(results.recommendation);
  const RecommendationIcon = config.icon;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'psychometric', label: 'Psychometric', icon: Brain },
    { id: 'technical', label: 'Technical', icon: Code },
    { id: 'wiscar', label: 'WISCAR', icon: Target },
    { id: 'careers', label: 'Careers', icon: Users },
    { id: 'learning', label: 'Learning', icon: BookOpen },
    { id: 'improvement', label: 'Improvement', icon: TrendingUp }
  ];

  return (
    <>
      <FeedbackDialog open={showFeedback} onClose={() => setShowFeedback(false)} onSubmit={handleFeedbackSubmit} />
      {/* Print Layout Container - Hidden but accessible for printing */}
      <div 
        ref={pdfContainerRef} 
        className="absolute -left-[9999px] top-0 w-[800px] opacity-0 pointer-events-none"
        style={{ visibility: 'hidden' }}
      >
        <PDFLayout
          assessment={assessment}
          results={results}
          overallScore={results.overallScore}
          recommendation={{
            key: results.recommendation,
            title: results.recommendation === 'YES' ? 'Excellent Fit!' :
                   results.recommendation === 'MAYBE' ? 'Good Potential with Preparation' :
                   'Consider Alternative Paths',
            color: results.recommendation === 'YES' ? 'green' : 
                   results.recommendation === 'MAYBE' ? 'orange' : 'red',
            icon: results.recommendation === 'YES' ? CheckCircle : 
                  results.recommendation === 'MAYBE' ? AlertTriangle : XCircle,
            description: results.recommendationReason
          }}
          getSectionPercentage={(sectionId: string) => {
            switch (sectionId) {
              case 'psychometric': return results.psychometric.overall;
              case 'technical': return results.technical.overall;
              case 'wiscar': return results.wiscar.overall;
              default: return 0;
            }
          }}
          badgeVariantForScore={(score: number) => {
            if (score >= 75) return 'default';
            if (score >= 60) return 'secondary';
            return 'destructive';
          }}
          formatSubsectionName={(name: string) => name}
          hasWiscarData={results.wiscar.overall > 0}
          wiscarOverall={results.wiscar.overall}
        />
      </div>

      {/* Main Display */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 assessment-print-container">
        {/* Print Header - Hidden on screen, visible in print */}
        <div className="hidden print:block print-header">
          <div className="print-logo">Path Finder</div>
          <div className="print-subtitle">Career Assessment & Guidance Platform</div>
          <div className="print-date">Generated on: {new Date().toLocaleDateString()}</div>
        </div>

        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-8 no-print">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Assessment Complete! 🎉</h1>
            <p className="text-xl text-gray-600">Here are your personalized results for {assessment.title}</p>
          </div>

          {/* Print Assessment Title */}
          <div className="hidden print:block print-assessment-title">
            <h1>Assessment Results</h1>
            <h2>{assessment.title}</h2>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-lg shadow-sm border mb-8">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => {
                const TabIcon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-4 whitespace-nowrap border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 bg-blue-50'
                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <TabIcon className="w-4 h-4" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[600px]">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Summary Overview */}
                <Card className={`${config.bgColor} ${config.borderColor} border-2`}>
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className={`p-4 rounded-full ${config.bgColor.replace('50', '100')}`}>
                        <RecommendationIcon className={`w-12 h-12 ${config.textColor}`} />
                      </div>
                    </div>
                    <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                      {results.recommendation === 'YES' ? 'Excellent Fit!' :
                       results.recommendation === 'MAYBE' ? 'Good Potential with Preparation' :
                       'Consider Alternative Paths'}
                    </CardTitle>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
                      {results.recommendationReason}
                    </p>
                    <div className="flex justify-center items-center gap-4 flex-wrap">
                      <Badge variant="outline" className={`text-lg px-4 py-2 ${config.bgColor} ${config.textColor} ${config.borderColor}`}>
                        Recommendation: {results.recommendation}
                      </Badge>
                      <Badge variant="outline" className="text-lg px-4 py-2">
                        Confidence: {results.confidenceScore}%
                      </Badge>
                      <Badge variant="outline" className="text-lg px-4 py-2">
                        Overall Score: {results.overallScore}%
                      </Badge>
                    </div>
                  </CardHeader>
                </Card>

                {/* Score Overview */}
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
                              {results.psychometric.overall}%
                            </span>
                            <Badge variant={results.psychometric.overall >= 75 ? 'default' : results.psychometric.overall >= 60 ? 'secondary' : 'destructive'}>
                              {results.psychometric.overall >= 75 ? 'Excellent' : results.psychometric.overall >= 60 ? 'Good' : 'Needs Work'}
                            </Badge>
                          </div>
                          <Progress value={results.psychometric.overall} className="h-3" />
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
                              {results.technical.overall}%
                            </span>
                            <Badge variant={results.technical.overall >= 75 ? 'default' : results.technical.overall >= 60 ? 'secondary' : 'destructive'}>
                              {results.technical.overall >= 75 ? 'Strong' : results.technical.overall >= 60 ? 'Moderate' : 'Developing'}
                            </Badge>
                          </div>
                          <Progress value={results.technical.overall} className="h-3" />
                        </div>
                        <div className="text-sm text-gray-600">
                          Correct: {results.technical.correctAnswers} / {results.technical.totalQuestions}
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
                              {results.wiscar.overall}%
                            </span>
                            <Badge variant="outline" className="bg-orange-50 text-orange-700">
                              {results.wiscar.overall >= 75 ? 'High Readiness' : results.wiscar.overall >= 60 ? 'Moderate Readiness' : 'Needs Development'}
                            </Badge>
                          </div>
                          <Progress value={results.wiscar.overall} className="h-3" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Zap className="w-6 h-6 text-blue-600" />
                      <span>Quick Actions</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2" onClick={printResults}>
                        <Download className="w-6 h-6" />
                        <span>Download PDF Report</span>
                      </Button>
                      <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                        <Share2 className="w-6 h-6" />
                        <span>Share Results</span>
                      </Button>
                      <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2" onClick={() => setActiveTab('learning')}>
                        <BookOpen className="w-6 h-6" />
                        <span>View Learning Path</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Psychometric Tab */}
            {activeTab === 'psychometric' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="w-6 h-6 text-purple-600" />
                    <span>Psychological Fit Analysis</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {Object.entries(results.psychometric.categories).map(([category, score]) => (
                        <div key={category} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <h4 className="font-semibold text-gray-900 capitalize">{category}</h4>
                            <Badge variant={score >= 75 ? 'default' : score >= 60 ? 'secondary' : 'destructive'}>
                              {score}%
                            </Badge>
                          </div>
                          <Progress value={score} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Technical Tab */}
            {activeTab === 'technical' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Code className="w-6 h-6 text-green-600" />
                    <span>Technical Readiness Analysis</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {Object.entries(results.technical.categories).map(([category, score]) => (
                        <div key={category} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <h4 className="font-semibold text-gray-900 capitalize">{category}</h4>
                            <Badge variant={score >= 75 ? 'default' : score >= 60 ? 'secondary' : 'destructive'}>
                              {score}%
                            </Badge>
                          </div>
                          <Progress value={score} className="h-2" />
                        </div>
                      ))}
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Performance Summary</h4>
                      <p className="text-gray-600">
                        You answered {results.technical.correctAnswers} out of {results.technical.totalQuestions} questions correctly.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* WISCAR Tab */}
            {activeTab === 'wiscar' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-6 h-6 text-orange-600" />
                    <span>WISCAR Career Readiness Analysis</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {Object.entries(results.wiscar.dimensions).map(([dimension, score]) => (
                        <div key={dimension} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <h4 className="font-semibold text-gray-900 capitalize">{dimension}</h4>
                            <Badge variant={score >= 75 ? 'default' : score >= 60 ? 'secondary' : 'destructive'}>
                              {score}%
                            </Badge>
                          </div>
                          <Progress value={score} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Careers Tab */}
            {activeTab === 'careers' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-6 h-6 text-blue-600" />
                    <span>Career Path Analysis</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-1 gap-4">
                      {results.careerMatches.map((career, index) => (
                        <div key={index} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                              <h4 className="text-xl font-semibold text-gray-900 mb-2">{career.title}</h4>
                              <p className="text-gray-600 mb-3">{career.description}</p>
                            </div>
                            <div className="text-right ml-4">
                              <Badge 
                                variant={career.matchScore >= 75 ? 'default' : career.matchScore >= 60 ? 'secondary' : 'outline'} 
                                className="mb-2"
                              >
                                {career.matchScore}% Match
                              </Badge>
                              <div className="text-sm text-gray-600 space-y-1">
                                <div className="flex items-center gap-1">
                                  <DollarSign className="w-4 h-4" />
                                  {career.salary}
                                </div>
                                <div className="flex items-center gap-1">
                                  <span>{career.demand === 'high' ? '📈' : career.demand === 'medium' ? '📊' : '📉'}</span>
                                  <span className="capitalize">{career.demand} demand</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <Progress value={career.matchScore} className="h-2 mb-4" />
                          
                          <div className="flex justify-between items-end">
                            <div>
                              <div className="text-sm text-gray-500 mb-2">Key Requirements:</div>
                              <div className="flex flex-wrap gap-2">
                                {career.requirements.map((req, reqIndex) => (
                                  <Badge key={reqIndex} variant="secondary" className="text-xs">
                                    {req}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <Button variant="outline" size="sm" className="flex items-center gap-2">
                              Learn More
                              <ArrowUpRight className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Learning Path Tab */}
            {activeTab === 'learning' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="w-6 h-6 text-green-600" />
                    <span>Your Learning Journey</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      {results.learningPath.map((stage, index) => (
                        <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
                          <div className="flex-shrink-0">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              stage.effort === 'high' ? 'bg-red-100 text-red-700' :
                              stage.effort === 'medium' ? 'bg-orange-100 text-orange-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {stage.completed ? (
                                <CheckCircle className="w-5 h-5" />
                              ) : (
                                <span className="font-semibold text-sm">{index + 1}</span>
                              )}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-gray-900">{stage.stage}</h4>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {stage.duration}
                                </Badge>
                                <Badge variant="outline" className={
                                  stage.effort === 'high' ? 'bg-red-100 text-red-700' :
                                  stage.effort === 'medium' ? 'bg-orange-100 text-orange-700' :
                                  'bg-green-100 text-green-700'
                                }>
                                  <span className="mr-1">
                                    {stage.effort === 'high' ? '🔥' : stage.effort === 'medium' ? '⚡' : '🌱'}
                                  </span>
                                  {stage.effort} effort
                                </Badge>
                              </div>
                            </div>
                            <div className="space-y-1 mb-3">
                              {stage.modules.map((module, moduleIndex) => (
                                <div key={moduleIndex} className="text-sm text-gray-600 flex items-center gap-2">
                                  <PlayCircle className="w-3 h-3 text-gray-400" />
                                  {module}
                                </div>
                              ))}
                            </div>
                            <Button variant="outline" size="sm" className="flex items-center gap-2">
                              Start Learning
                              <ArrowRight className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Improvement Tab */}
            {activeTab === 'improvement' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                    <span>Improvement Areas</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {results.improvementAreas.map((area, index) => (
                      <div key={index} className="border rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">{area.area}</h4>
                            <div className="flex items-center gap-4">
                              <div className="text-sm text-gray-600">
                                Current: {area.currentScore}%
                              </div>
                              <div className="text-sm text-gray-600">
                                Target: {area.targetScore}%
                              </div>
                            </div>
                          </div>
                          <Badge variant={area.currentScore >= area.targetScore ? 'default' : 'destructive'}>
                            {area.currentScore >= area.targetScore ? 'On Track' : 'Needs Work'}
                          </Badge>
                        </div>
                        
                        <Progress value={area.currentScore} className="h-2 mb-4" />
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h5 className="font-semibold text-gray-900 mb-2">Tips for Improvement:</h5>
                            <ul className="space-y-1">
                              {area.tips.map((tip, tipIndex) => (
                                <li key={tipIndex} className="text-sm text-gray-600 flex items-start gap-2">
                                  <Lightbulb className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                                  {tip}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-900 mb-2">Recommended Resources:</h5>
                            <ul className="space-y-1">
                              {area.resources.map((resource, resourceIndex) => (
                                <li key={resourceIndex} className="text-sm text-gray-600 flex items-start gap-2">
                                  <ExternalLink className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                  {resource}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DynamicResultsSection;
