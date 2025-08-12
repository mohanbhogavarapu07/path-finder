import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  TrendingUp,
  Target,
  CheckCircle,
  ArrowRight,
  Star,
  Lightbulb,
  BookOpen,
  Users,
  Brain,
  Code,
  Award,
  AlertTriangle,
  XCircle
} from 'lucide-react';
import { DynamicAssessment } from '@/lib/api';
import { useAssessmentResults } from '@/hooks/useAssessments';

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
  const { data: resultsData, isLoading, error } = useAssessmentResults(assessment.id, sessionId || '');

  useEffect(() => {
    if (error) {
      console.error('Error fetching results:', error);
    }
  }, [error]);

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
            <Button onClick={() => navigate('/dynamic-assessments')}>
              Back to Assessments
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { results } = resultsData || {};

  // Debug logging to see what data we're getting
  console.log('DynamicResultsSection - Full resultsData:', resultsData);
  console.log('DynamicResultsSection - Results object:', results);
  console.log('DynamicResultsSection - WISCAR scores:', results?.wiscarScores);
  console.log('DynamicResultsSection - Assessment data:', assessmentData);

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
            <Button onClick={() => navigate('/dynamic-assessments')}>
              Back to Assessments
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }



  // Helpers to shape data like AWS results layout
  const getSectionPercentage = (sectionId: string): number => {
    const s = results?.sectionScores?.find((x: any) => x.sectionId === sectionId);
    return s ? (typeof s.percentage === 'number' ? s.percentage : 0) : 0;
  };

  const badgeVariantForScore = (score: number): 'default' | 'secondary' | 'destructive' | 'outline' => {
    if (score >= 75) return 'default';
    if (score >= 60) return 'secondary';
    return 'destructive';
  };

  // Enhanced WISCAR calculation with better data validation
  const wiscarOverall: number = (() => {
    // First check if overall is directly provided
    if (results?.wiscarScores?.overall && typeof results.wiscarScores.overall === 'number') {
      return results.wiscarScores.overall;
    }
    
    // If no overall, calculate from individual dimensions
    if (results?.wiscarScores && typeof results.wiscarScores === 'object') {
      const validScores = Object.entries(results.wiscarScores)
        .filter(([key, value]) => 
          key !== 'overall' && 
          key !== '_id' && 
          typeof value === 'number' && 
          value >= 0 && 
          value <= 100
        )
        .map(([, value]) => value as number);
      
      if (validScores.length > 0) {
        return Math.round(validScores.reduce((sum, score) => sum + score, 0) / validScores.length);
      }
    }
    
    // Fallback: try to calculate from section scores if WISCAR section exists
    const wiscarSection = results?.sectionScores?.find((s: any) => s.sectionId === 'wiscar');
    if (wiscarSection && typeof wiscarSection.percentage === 'number') {
      return wiscarSection.percentage;
    }
    
    return 0;
  })();

  // Check if we have any WISCAR data at all
  const hasWiscarData = wiscarOverall > 0;

  // Helper function to format subsection names
  const formatSubsectionName = (key: string): string => {
    // Handle common patterns in question IDs
    if (key.includes('_')) {
      // Split by underscore and format each part
      const parts = key.split('_');
      if (parts.length >= 2) {
        const category = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
        const number = parts[1];
        return `${category} ${number}`;
      }
    }
    
    // Handle camelCase
    if (/[a-z][A-Z]/.test(key)) {
      return key
        .replace(/([A-Z])/g, ' $1') // Add space before capital letters
        .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
        .replace(/_/g, ' ') // Replace underscores with spaces
        .trim();
    }
    
    // Handle simple names
    return key
      .replace(/_/g, ' ') // Replace underscores with spaces
      .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
      .trim();
  };



  // Recommendation like AWS
  const overallScore = typeof results.overallScore === 'number' ? results.overallScore : 0;
  const recommendation = (() => {
    if (overallScore >= 75) {
      return {
        key: 'YES',
        title: `${assessment.title} is an Excellent Fit for You!`,
        color: 'green' as const,
        icon: CheckCircle,
        description: 'Strong alignment across sections. You are well-positioned to proceed.',
        score: overallScore,
      };
    }
    if (overallScore >= 60) {
      return {
        key: 'MAYBE',
        title: `${assessment.title} Could Be Right with Preparation`,
        color: 'orange' as const,
        icon: AlertTriangle,
        description: 'You have potential. Strengthen a few areas to increase your readiness.',
        score: overallScore,
      };
    }
    return {
      key: 'NO',
      title: `Consider Alternative Paths`,
      color: 'red' as const,
      icon: XCircle,
      description: 'Based on current results, adjacent paths may be a better fit right now.',
      score: overallScore,
    };
  })();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Assessment Complete! 🎉</h1>
          <p className="text-xl text-gray-600">Here are your personalized results for {assessment.title}</p>
        </div>

        {/* Recommendation (AWS style) */}
        <Card className={`mb-8 border-2 ${
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
                {(() => {
                  const Icon = recommendation.icon;
                  return <Icon className={`w-12 h-12 ${
                    recommendation.color === 'green' ? 'text-green-600' :
                    recommendation.color === 'orange' ? 'text-orange-600' :
                    'text-red-600'
                  }`} />
                })()}
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900 mb-2">{recommendation.title}</CardTitle>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{recommendation.description}</p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <Badge variant="outline" className={`${
                recommendation.color === 'green' ? 'bg-green-100 text-green-800 border-green-300' :
                recommendation.color === 'orange' ? 'bg-orange-100 text-orange-800 border-orange-300' :
                'bg-red-100 text-red-800 border-red-300'
              }`}>Recommendation: {recommendation.key}</Badge>
              <div className="text-2xl font-bold text-blue-700 flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600" /> {overallScore}% overall
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Score Breakdown (3 cards) */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white shadow-lg border-l-4 border-l-purple-500 hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg text-gray-800">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Brain className="w-5 h-5 text-purple-600" />
                </div>
                <span>Psychological Fit</span>
              </CardTitle>
          </CardHeader>
          <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-4xl font-bold text-purple-600">{getSectionPercentage('psychometric')}%</span>
                    <Badge variant={badgeVariantForScore(getSectionPercentage('psychometric'))} className="text-xs px-3 py-1">
                      {getSectionPercentage('psychometric') >= 75 ? 'Excellent' : getSectionPercentage('psychometric') >= 60 ? 'Good' : 'Needs Work'}
                    </Badge>
                  </div>
                  <Progress value={getSectionPercentage('psychometric')} className="h-3 bg-gray-200" />
                  <div className="mt-2 text-sm text-gray-600">
                    {getSectionPercentage('psychometric') >= 75 ? 'Outstanding performance in psychological assessment' : 
                     getSectionPercentage('psychometric') >= 60 ? 'Good psychological alignment' : 
                     'Room for improvement in psychological fit'}
                  </div>
               </div>
            </div>
          </CardContent>
        </Card>

          <Card className="bg-white shadow-lg border-l-4 border-l-green-500 hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg text-gray-800">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Code className="w-5 h-5 text-green-600" />
                </div>
                <span>Technical Readiness</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-4xl font-bold text-green-600">{getSectionPercentage('technical')}%</span>
                    <Badge variant={badgeVariantForScore(getSectionPercentage('technical'))} className="text-xs px-3 py-1">
                      {getSectionPercentage('technical') >= 75 ? 'Strong' : getSectionPercentage('technical') >= 60 ? 'Moderate' : 'Developing'}
                    </Badge>
                      </div>
                  <Progress value={getSectionPercentage('technical')} className="h-3 bg-gray-200" />
                  <div className="mt-2 text-sm text-gray-600">
                    {getSectionPercentage('technical') >= 75 ? 'Strong technical foundation demonstrated' : 
                     getSectionPercentage('technical') >= 60 ? 'Moderate technical skills' : 
                     'Technical skills need development'}
                  </div>
                </div>
            </div>
          </CardContent>
        </Card>

          <Card className="bg-white shadow-lg border-l-4 border-l-orange-500 hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg text-gray-800">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Target className="w-5 h-5 text-orange-600" />
                </div>
                <span>WISCAR Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-4xl font-bold text-orange-600">{wiscarOverall}%</span>
                    <Badge variant="outline" className="bg-orange-50 text-orange-700 text-xs px-3 py-1">Overall</Badge>
                    </div>
                  <Progress value={wiscarOverall} className="h-3 bg-gray-200" />
                  <div className="mt-2 text-sm text-gray-600">
                    {hasWiscarData ? (
                      wiscarOverall >= 75 ? 'Excellent holistic assessment score' : 
                      wiscarOverall >= 60 ? 'Good overall alignment' : 
                      'Overall assessment needs improvement'
                    ) : 'WISCAR data not available'}
                  </div>
                </div>
                

                
                {!hasWiscarData && (
                  <div className="pt-3 border-t border-gray-100">
                    <div className="text-xs text-gray-500 text-center py-2">
                      WISCAR assessment data not available
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Career Paths */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-green-600" />
                Recommended Career Paths
              </CardTitle>
            </CardHeader>
            <CardContent>
            {results.careerPaths && results.careerPaths.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.careerPaths.map((career, index) => (
                  <div key={index} className="p-4 rounded-lg bg-green-50 border border-green-200">
                    <div className="flex items-start gap-3 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-green-800">{career.title}</h4>
                        <p className="text-sm text-green-700 mt-1">{career.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <Badge variant="outline" className="text-xs">
                        {career.matchLevel} match
                      </Badge>
                      <span className="text-sm text-green-600 font-medium">
                        {career.alignmentScore}% alignment
                      </span>
                    </div>
                    {career.requirements && career.requirements.length > 0 && (
                      <div className="mt-3">
                        <p className="text-xs font-medium text-green-700 mb-1">Requirements:</p>
                        <ul className="text-xs text-green-600 space-y-1">
                          {career.requirements.map((req, reqIndex) => (
                            <li key={reqIndex} className="flex items-center gap-1">
                              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">Based on your assessment results, here are some recommended paths:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">Primary Career Path</h4>
                    <p className="text-sm text-blue-700 mb-3">Based on your assessment results</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">Good match</Badge>
                      <span className="text-sm text-blue-600 font-medium">{overallScore}% alignment</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">Alternative Path</h4>
                    <p className="text-sm text-green-700 mb-3">Consider exploring related fields</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">Moderate match</Badge>
                      <span className="text-sm text-green-600 font-medium">65% alignment</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            </CardContent>
          </Card>

        {/* Strengths and Improvements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Strengths */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-6 w-6 text-yellow-600" />
                  Your Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
              {results.strengths && results.strengths.length > 0 ? (
                <ul className="space-y-2">
                  {results.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{typeof strength === 'string' ? strength : 'Strength'}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Strong psychometric skills</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Strong wiscar skills</span>
                  </div>
                </div>
              )}
              </CardContent>
            </Card>

          {/* Areas for Improvement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-6 w-6 text-blue-600" />
                  Areas for Improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
              {results.improvements && results.improvements.length > 0 ? (
                <ul className="space-y-2">
                  {results.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>{typeof improvement === 'string' ? improvement : 'Improvement'}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Develop technical skills</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Gain practical experience</span>
                  </div>
                </div>
              )}
              </CardContent>
            </Card>
        </div>

        {/* Next Steps */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-indigo-600" />
                Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
            {results.nextSteps && results.nextSteps.length > 0 ? (
              <div className="space-y-3">
                {results.nextSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-indigo-50">
                    <div className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <span>{typeof step === 'string' ? step : 'Next step'}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-indigo-50">
                  <div className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <span>Focus on skill development</span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-indigo-50">
                  <div className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <span>Take relevant courses</span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-indigo-50">
                  <div className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <span>Gain practical experience</span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-indigo-50">
                  <div className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </div>
                  <span>Seek mentorship</span>
                </div>
              </div>
            )}
            </CardContent>
          </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => navigate('/dynamic-assessments')}
            className="flex items-center gap-2"
          >
            <ArrowRight className="h-4 w-4" />
            Take Another Assessment
          </Button>
          <Button 
            variant="outline"
            onClick={() => window.print()}
            className="flex items-center gap-2"
          >
            <BookOpen className="h-4 w-4" />
            Print Results
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DynamicResultsSection;
