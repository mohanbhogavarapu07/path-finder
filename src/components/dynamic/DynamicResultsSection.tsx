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
  XCircle,
  Download,
  Printer
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

  // Print function with proper formatting
  const handlePrint = () => {
    // Add print-specific styles before printing
    const style = document.createElement('style');
    style.id = 'print-styles';
    style.innerHTML = `
      @media print {
        @page {
          margin: 0.5in;
          size: A4;
        }
        
        * {
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        
        body {
          background: white !important;
          color: #1e293b !important;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 11pt;
          line-height: 1.5;
          margin: 0;
          padding: 0;
        }
        
        .no-print {
          display: none !important;
        }
        
        .print-only {
          display: block !important;
        }
        
        /* Professional Header */
        .print-header {
          display: block !important;
          background: linear-gradient(135deg, #1EAEDB 0%, #33C3F0 100%);
          color: white;
          padding: 2rem 0;
          margin-bottom: 2rem;
          text-align: center;
          border-radius: 0;
        }
        
        .print-logo {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          color: white;
          font-family: 'Poppins', sans-serif;
        }
        
        .print-subtitle {
          font-size: 1.1rem;
          opacity: 0.9;
          margin-bottom: 1rem;
        }
        
        .print-date {
          font-size: 0.9rem;
          opacity: 0.8;
          border-top: 1px solid rgba(255,255,255,0.3);
          padding-top: 1rem;
          margin-top: 1rem;
        }
        
        /* Assessment Title Section */
        .print-assessment-title {
          text-align: center;
          margin-bottom: 2rem;
          padding: 1.5rem;
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
        }
        
        .print-assessment-title h1 {
          font-size: 2rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }
        
        .print-assessment-title h2 {
          font-size: 1.2rem;
          color: #64748b;
          font-weight: 500;
        }
        
        /* Recommendation Section */
        .print-recommendation {
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
          border: 3px solid #1EAEDB;
          border-radius: 16px;
          padding: 2rem;
          margin-bottom: 2rem;
          text-align: center;
          position: relative;
        }
        
        .print-recommendation::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(135deg, #1EAEDB, #33C3F0);
          border-radius: 16px;
          z-index: -1;
        }
        
        .print-recommendation-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 1rem;
        }
        
        .print-recommendation-description {
          font-size: 1.1rem;
          color: #475569;
          margin-bottom: 1.5rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .print-recommendation-badge {
          display: inline-block;
          background: #1EAEDB;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          margin-right: 1rem;
        }
        
        .print-overall-score {
          display: inline-block;
          font-size: 1.5rem;
          font-weight: 700;
          color: #1EAEDB;
        }
        
        /* Score Cards */
        .print-score-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .print-score-card {
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          padding: 1.5rem;
          position: relative;
          overflow: hidden;
        }
        
        .print-score-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #1EAEDB, #33C3F0);
        }
        
        .print-score-card-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .print-score-value {
          font-size: 3rem;
          font-weight: 800;
          color: #1EAEDB;
          margin-bottom: 0.5rem;
          display: block;
        }
        
        .print-score-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        
        .print-score-badge.excellent {
          background: #dcfce7;
          color: #166534;
          border: 1px solid #22c55e;
        }
        
        .print-score-badge.good {
          background: #fef3c7;
          color: #92400e;
          border: 1px solid #f59e0b;
        }
        
        .print-score-badge.needs-work {
          background: #fee2e2;
          color: #991b1b;
          border: 1px solid #ef4444;
        }
        
        .print-progress-container {
          margin: 1rem 0;
        }
        
        .print-progress-bar {
          height: 12px;
          background: #f1f5f9;
          border-radius: 6px;
          overflow: hidden;
          position: relative;
        }
        
        .print-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #1EAEDB, #33C3F0);
          border-radius: 6px;
          transition: width 0.3s ease;
        }
        
        .print-score-description {
          font-size: 0.9rem;
          color: #64748b;
          margin-top: 0.5rem;
        }
        
        /* Career Paths */
        .print-career-section {
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .print-career-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .print-career-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1rem;
        }
        
        .print-career-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 1rem;
        }
        
        .print-career-card-title {
          font-size: 1rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }
        
        .print-career-card-description {
          font-size: 0.85rem;
          color: #64748b;
          margin-bottom: 0.75rem;
        }
        
        .print-career-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .print-career-badge {
          background: #1EAEDB;
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 500;
        }
        
        .print-career-alignment {
          font-size: 0.85rem;
          color: #1EAEDB;
          font-weight: 600;
        }
        
        /* Analysis Sections */
        .print-analysis-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .print-analysis-card {
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          padding: 1.5rem;
        }
        
        .print-analysis-title {
          font-size: 1.2rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .print-analysis-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .print-analysis-list li {
          padding: 0.5rem 0;
          border-bottom: 1px solid #f1f5f9;
          color: #374151;
          font-size: 0.9rem;
        }
        
        .print-analysis-list li:last-child {
          border-bottom: none;
        }
        
        /* Next Steps */
        .print-next-steps {
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .print-next-steps-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .print-step-list {
          counter-reset: step-counter;
        }
        
        .print-step-item {
          counter-increment: step-counter;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 0.75rem;
          position: relative;
        }
        
        .print-step-item::before {
          content: counter(step-counter);
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          background: #1EAEDB;
          color: white;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.8rem;
        }
        
        .print-step-text {
          margin-left: 2.5rem;
          color: #374151;
          font-size: 0.9rem;
        }
        
        /* Professional Footer */
        .print-footer {
          background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
          color: white;
          padding: 2rem;
          margin-top: 3rem;
          border-radius: 12px;
          text-align: center;
        }
        
        .print-footer-brand {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: white;
        }
        
        .print-footer-description {
          font-size: 0.9rem;
          opacity: 0.8;
          margin-bottom: 1rem;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .print-footer-contact {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
          font-size: 0.8rem;
          opacity: 0.7;
        }
        
        .print-footer-contact-item {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        
        /* Page breaks */
        .page-break-before {
          page-break-before: always;
        }
        
        .page-break-after {
          page-break-after: always;
        }
        
        .avoid-break {
          page-break-inside: avoid;
        }
        
        /* Hide interactive elements */
        button, .btn, .button, .interactive-element {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);
    
    window.print();
    
    // Remove print styles after printing
    setTimeout(() => {
      const printStyle = document.getElementById('print-styles');
      if (printStyle) {
        printStyle.remove();
      }
    }, 1000);
  };

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
            <Button onClick={() => navigate('/assessments')}>
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

        {/* Recommendation (AWS style) */}
        <Card className={`mb-8 border-2 print-card print-recommendation ${
          recommendation.color === 'green' ? 'border-green-200 bg-green-50' :
          recommendation.color === 'orange' ? 'border-orange-200 bg-orange-50' :
          'border-red-200 bg-red-50'
        }`}>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4 no-print">
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
            <CardTitle className="text-3xl font-bold text-gray-900 mb-2 print-recommendation-title">{recommendation.title}</CardTitle>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto print-recommendation-description">{recommendation.description}</p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <Badge variant="outline" className={`print-recommendation-badge ${
                recommendation.color === 'green' ? 'bg-green-100 text-green-800 border-green-300' :
                recommendation.color === 'orange' ? 'bg-orange-100 text-orange-800 border-orange-300' :
                'bg-red-100 text-red-800 border-red-300'
              }`}>Recommendation: {recommendation.key}</Badge>
              <div className="text-2xl font-bold text-blue-700 flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600 no-print" /> 
                <span className="print-overall-score">{overallScore}% overall</span>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Score Breakdown (3 cards) */}
        <div className="grid md:grid-cols-3 gap-6 mb-8 print-score-grid">
          <Card className="bg-white shadow-lg border-l-4 border-l-purple-500 hover:shadow-xl transition-shadow print-score-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg text-gray-800 print-score-card-title">
                <div className="p-2 bg-purple-100 rounded-lg no-print">
                  <Brain className="w-5 h-5 text-purple-600" />
                </div>
                <span>Psychological Fit</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-4xl font-bold text-purple-600 print-score-value">{getSectionPercentage('psychometric')}%</span>
                    <Badge variant={badgeVariantForScore(getSectionPercentage('psychometric'))} className={`text-xs px-3 py-1 print-score-badge ${
                      getSectionPercentage('psychometric') >= 75 ? 'excellent' : 
                      getSectionPercentage('psychometric') >= 60 ? 'good' : 'needs-work'
                    }`}>
                      {getSectionPercentage('psychometric') >= 75 ? 'Excellent' : getSectionPercentage('psychometric') >= 60 ? 'Good' : 'Needs Work'}
                    </Badge>
                  </div>
                  <div className="print-progress-container">
                    <div className="print-progress-bar">
                      <div 
                        className="print-progress-fill" 
                        style={{ width: `${getSectionPercentage('psychometric')}%` }}
                      ></div>
                    </div>
                  </div>
                  <Progress value={getSectionPercentage('psychometric')} className="h-3 bg-gray-200 no-print" />
                  <div className="mt-2 text-sm text-gray-600 print-score-description">
                    {getSectionPercentage('psychometric') >= 75 ? 'Outstanding performance in psychological assessment' : 
                     getSectionPercentage('psychometric') >= 60 ? 'Good psychological alignment' : 
                     'Room for improvement in psychological fit'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-l-4 border-l-green-500 hover:shadow-xl transition-shadow print-score-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg text-gray-800 print-score-card-title">
                <div className="p-2 bg-green-100 rounded-lg no-print">
                  <Code className="w-5 h-5 text-green-600" />
                </div>
                <span>Technical Readiness</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-4xl font-bold text-green-600 print-score-value">{getSectionPercentage('technical')}%</span>
                    <Badge variant={badgeVariantForScore(getSectionPercentage('technical'))} className={`text-xs px-3 py-1 print-score-badge ${
                      getSectionPercentage('technical') >= 75 ? 'excellent' : 
                      getSectionPercentage('technical') >= 60 ? 'good' : 'needs-work'
                    }`}>
                      {getSectionPercentage('technical') >= 75 ? 'Strong' : getSectionPercentage('technical') >= 60 ? 'Moderate' : 'Developing'}
                    </Badge>
                  </div>
                  <div className="print-progress-container">
                    <div className="print-progress-bar">
                      <div 
                        className="print-progress-fill" 
                        style={{ width: `${getSectionPercentage('technical')}%` }}
                      ></div>
                    </div>
                  </div>
                  <Progress value={getSectionPercentage('technical')} className="h-3 bg-gray-200 no-print" />
                  <div className="mt-2 text-sm text-gray-600 print-score-description">
                    {getSectionPercentage('technical') >= 75 ? 'Strong technical foundation demonstrated' : 
                     getSectionPercentage('technical') >= 60 ? 'Moderate technical skills' : 
                     'Technical skills need development'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-l-4 border-l-orange-500 hover:shadow-xl transition-shadow print-score-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg text-gray-800 print-score-card-title">
                <div className="p-2 bg-orange-100 rounded-lg no-print">
                  <Target className="w-5 h-5 text-orange-600" />
                </div>
                <span>WISCAR Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-4xl font-bold text-orange-600 print-score-value">{wiscarOverall}%</span>
                    <Badge variant="outline" className="bg-orange-50 text-orange-700 text-xs px-3 py-1 print-score-badge">Overall</Badge>
                  </div>
                  <div className="print-progress-container">
                    <div className="print-progress-bar">
                      <div 
                        className="print-progress-fill" 
                        style={{ width: `${wiscarOverall}%` }}
                      ></div>
                    </div>
                  </div>
                  <Progress value={wiscarOverall} className="h-3 bg-gray-200 no-print" />
                  <div className="mt-2 text-sm text-gray-600 print-score-description">
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
        <Card className="mb-8 print-career-section">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 print-career-title">
              <TrendingUp className="h-6 w-6 text-green-600 no-print" />
              Recommended Career Paths
            </CardTitle>
          </CardHeader>
          <CardContent>
            {results.careerPaths && results.careerPaths.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print-career-grid">
                {results.careerPaths.map((career, index) => (
                  <div key={index} className="p-4 rounded-lg bg-green-50 border border-green-200 print-career-card">
                    <div className="flex items-start gap-3 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0 no-print" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-green-800 print-career-card-title">{career.title}</h4>
                        <p className="text-sm text-green-700 mt-1 print-career-card-description">{career.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3 print-career-card-footer">
                      <Badge variant="outline" className="text-xs print-career-badge">
                        {career.matchLevel} match
                      </Badge>
                      <span className="text-sm text-green-600 font-medium print-career-alignment">
                        {career.alignmentScore}% alignment
                      </span>
                    </div>
                    {career.requirements && career.requirements.length > 0 && (
                      <div className="mt-3">
                        <p className="text-xs font-medium text-green-700 mb-1">Requirements:</p>
                        <ul className="text-xs text-green-600 space-y-1">
                          {career.requirements.map((req, reqIndex) => (
                            <li key={reqIndex} className="flex items-center gap-1">
                              <div className="w-1 h-1 bg-green-500 rounded-full no-print"></div>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print-career-grid">
                  <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 print-career-card">
                    <h4 className="font-semibold text-blue-800 print-career-card-title">Primary Career Path</h4>
                    <p className="text-sm text-blue-700 mb-3 print-career-card-description">Based on your assessment results</p>
                    <div className="flex items-center justify-between print-career-card-footer">
                      <Badge variant="outline" className="text-xs print-career-badge">Good match</Badge>
                      <span className="text-sm text-blue-600 font-medium print-career-alignment">{overallScore}% alignment</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-green-50 border border-green-200 print-career-card">
                    <h4 className="font-semibold text-green-800 print-career-card-title">Alternative Path</h4>
                    <p className="text-sm text-green-700 mb-3 print-career-card-description">Consider exploring related fields</p>
                    <div className="flex items-center justify-between print-career-card-footer">
                      <Badge variant="outline" className="text-xs print-career-badge">Moderate match</Badge>
                      <span className="text-sm text-green-600 font-medium print-career-alignment">65% alignment</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            </CardContent>
          </Card>

        {/* Strengths and Improvements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 print-analysis-grid">
          {/* Strengths */}
            <Card className="print-analysis-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 print-analysis-title">
                  <Star className="h-6 w-6 text-yellow-600 no-print" />
                  Your Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
              {results.strengths && results.strengths.length > 0 ? (
                <ul className="space-y-2 print-analysis-list">
                  {results.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0 no-print" />
                      <span>{typeof strength === 'string' ? strength : 'Strength'}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="space-y-2 print-analysis-list">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0 no-print" />
                    <span>Strong psychometric skills</span>
            </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0 no-print" />
                    <span>Strong wiscar skills</span>
                  </div>
                </div>
              )}
          </CardContent>
        </Card>

          {/* Areas for Improvement */}
            <Card className="print-analysis-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 print-analysis-title">
                  <Lightbulb className="h-6 w-6 text-blue-600 no-print" />
                  Areas for Improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
              {results.improvements && results.improvements.length > 0 ? (
                <ul className="space-y-2 print-analysis-list">
                  {results.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0 no-print" />
                      <span>{typeof improvement === 'string' ? improvement : 'Improvement'}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="space-y-2 print-analysis-list">
                  <div className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0 no-print" />
                    <span>Develop technical skills</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0 no-print" />
                    <span>Gain practical experience</span>
                  </div>
                </div>
              )}
              </CardContent>
            </Card>
        </div>

        {/* Next Steps */}
        <Card className="mb-8 print-next-steps">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 print-next-steps-title">
                <BookOpen className="h-6 w-6 text-indigo-600 no-print" />
                Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            {results.nextSteps && results.nextSteps.length > 0 ? (
              <div className="space-y-3 print-step-list">
                {results.nextSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-indigo-50 print-step-item">
                    <div className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold no-print">
                      {index + 1}
                    </div>
                    <span className="print-step-text">{typeof step === 'string' ? step : 'Next step'}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3 print-step-list">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-indigo-50 print-step-item">
                  <div className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold no-print">
                    1
                  </div>
                  <span className="print-step-text">Focus on skill development</span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-indigo-50 print-step-item">
                  <div className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold no-print">
                    2
                  </div>
                  <span className="print-step-text">Take relevant courses</span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-indigo-50 print-step-item">
                  <div className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold no-print">
                    3
                  </div>
                  <span className="print-step-text">Gain practical experience</span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-indigo-50 print-step-item">
                  <div className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold no-print">
                    4
                  </div>
                  <span className="print-step-text">Seek mentorship</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Print Footer */}
        <div className="hidden print:block print-footer">
          <div className="print-footer-brand">Path Finder</div>
          <div className="print-footer-description">
            Discover your perfect career path with our comprehensive assessments. Make informed decisions about your future with data-driven insights.
          </div>
          <div className="print-footer-contact">
            <div className="print-footer-contact-item">
              <span>📧</span>
              <span>hello@careercompass.com</span>
            </div>
            <div className="print-footer-contact-item">
              <span>📞</span>
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="print-footer-contact-item">
              <span>📍</span>
              <span>San Francisco, CA</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center no-print">
          <Button 
            onClick={() => navigate('/assessments')}
            className="flex items-center gap-2"
          >
            <ArrowRight className="h-4 w-4" />
            Take Another Assessment
          </Button>
          <Button 
            variant="outline"
            onClick={handlePrint}
            className="flex items-center gap-2"
          >
            <Printer className="h-4 w-4" />
            Print Results
          </Button>
          <Button 
            variant="outline"
            onClick={() => {
              // Generate PDF download
              handlePrint();
            }}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DynamicResultsSection;
