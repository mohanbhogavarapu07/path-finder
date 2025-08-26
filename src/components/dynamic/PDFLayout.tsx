import React from 'react';
import { Badge } from '@/components/ui/badge';
import {
  TrendingUp,
  Target,
  CheckCircle,
  Star,
  Lightbulb,
  BookOpen,
  Brain,
  Code,
  Award,
  AlertTriangle,
  XCircle,
  Calculator
} from 'lucide-react';
import { DynamicAssessment } from '@/lib/api';

// FactorBeam Logo Component
const FactorBeamLogo: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
  <img 
    src="/logo.png" 
    alt="FactorBeam Logo"
    className={className}
    style={{ 
      objectFit: 'contain',
      width: '100%',
      height: '100%',
      maxWidth: '50px',
      maxHeight: '50px',
      filter: 'brightness(1.2) contrast(1.1)'
    }}
  />
);

interface PDFLayoutProps {
  assessment: DynamicAssessment;
  results: any;
  overallScore: number;
  recommendation: any;
  getSectionPercentage: (sectionId: string) => number;
  badgeVariantForScore: (score: number) => 'default' | 'secondary' | 'destructive' | 'outline';
  formatSubsectionName: (key: string) => string;
  hasWiscarData: boolean;
  wiscarOverall: number;
}

const PDFLayout: React.FC<PDFLayoutProps> = ({
  assessment,
  results,
  overallScore,
  recommendation,
  getSectionPercentage,
  badgeVariantForScore,
  formatSubsectionName,
  hasWiscarData,
  wiscarOverall
}) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="pdf-layout-container">
      {/* Header */}
      <div className="pdf-header">
        <div className="pdf-header-content">
          <div className="pdf-logo-section">
            <div className="pdf-logo-icon">
              <FactorBeamLogo className="h-6 w-6 text-white" />
            </div>
            <div className="pdf-logo-text">
              <h1 className="pdf-logo-title">Factor Beam</h1>
              <p className="pdf-logo-subtitle">Career Assessment & Guidance Platform</p>
            </div>
          </div>
          <div className="pdf-header-info">
            <p className="pdf-date">Generated: {currentDate}</p>
            <p className="pdf-assessment-name">{assessment.title}</p>
          </div>
        </div>
      </div>

      {/* Title Section */}
      <div className="pdf-title-section">
        <h1 className="pdf-main-title">Assessment Results Report</h1>
        <h2 className="pdf-assessment-title">{assessment.title}</h2>
        <p className="pdf-assessment-description">{assessment.description}</p>
      </div>

      {/* Overall Recommendation */}
      <div className={`pdf-recommendation ${recommendation.color}`}>
        <div className="pdf-recommendation-content">
          <div className="pdf-recommendation-icon">
            {(() => {
              const Icon = recommendation.icon;
              return <Icon className="h-6 w-6" />
            })()}
          </div>
          <div className="pdf-recommendation-text">
            <h3 className="pdf-recommendation-title">{recommendation.title}</h3>
            <p className="pdf-recommendation-description">{recommendation.description}</p>
          </div>
          <div className="pdf-recommendation-score">
            <span className="pdf-score-value">{overallScore}%</span>
            <span className="pdf-score-label">Overall Score</span>
          </div>
        </div>
        <div className="pdf-recommendation-badge">
          <Badge className={`pdf-badge ${recommendation.color}`}>
            Recommendation: {recommendation.key}
          </Badge>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="pdf-scores-section">
        <h3 className="pdf-section-title">Detailed Score Breakdown</h3>
        <div className="pdf-scores-grid">
          {/* Psychological Fit */}
          <div className="pdf-score-card">
            <div className="pdf-score-header">
              <Brain className="h-5 w-5" />
              <h4>Psychological Fit</h4>
            </div>
            <div className="pdf-score-content">
              <div className="pdf-score-value">{getSectionPercentage('psychometric')}%</div>
              <div className="pdf-score-progress">
                <div 
                  className="pdf-progress-fill"
                  style={{ width: `${getSectionPercentage('psychometric')}%` }}
                ></div>
              </div>
              <Badge className={`pdf-score-badge ${getSectionPercentage('psychometric') >= 75 ? 'excellent' : getSectionPercentage('psychometric') >= 60 ? 'good' : 'needs-work'}`}>
                {getSectionPercentage('psychometric') >= 75 ? 'Excellent' : getSectionPercentage('psychometric') >= 60 ? 'Good' : 'Needs Work'}
              </Badge>
            </div>
          </div>

          {/* Technical Aptitude */}
          <div className="pdf-score-card">
            <div className="pdf-score-header">
              <Code className="h-5 w-5" />
              <h4>Technical Aptitude</h4>
            </div>
            <div className="pdf-score-content">
              <div className="pdf-score-value">{getSectionPercentage('technical')}%</div>
              <div className="pdf-score-progress">
                <div 
                  className="pdf-progress-fill"
                  style={{ width: `${getSectionPercentage('technical')}%` }}
                ></div>
              </div>
              <Badge className={`pdf-score-badge ${getSectionPercentage('technical') >= 75 ? 'excellent' : getSectionPercentage('technical') >= 60 ? 'good' : 'needs-work'}`}>
                {getSectionPercentage('technical') >= 75 ? 'Excellent' : getSectionPercentage('technical') >= 60 ? 'Good' : 'Needs Work'}
              </Badge>
            </div>
          </div>

          {/* WISCAR Analysis */}
          {hasWiscarData && (
            <div className="pdf-score-card">
              <div className="pdf-score-header">
                <Target className="h-5 w-5" />
                <h4>WISCAR Analysis</h4>
              </div>
              <div className="pdf-score-content">
                <div className="pdf-score-value">{wiscarOverall}%</div>
                <div className="pdf-score-progress">
                  <div 
                    className="pdf-progress-fill"
                    style={{ width: `${wiscarOverall}%` }}
                  ></div>
                </div>
                <Badge className={`pdf-score-badge ${wiscarOverall >= 75 ? 'excellent' : wiscarOverall >= 60 ? 'good' : 'needs-work'}`}>
                  {wiscarOverall >= 75 ? 'Excellent' : wiscarOverall >= 60 ? 'Good' : 'Needs Work'}
                </Badge>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Career Recommendations */}
      {results.careerPaths && results.careerPaths.length > 0 && (
        <div className="pdf-career-section">
          <h3 className="pdf-section-title">Recommended Career Paths</h3>
          <div className="pdf-career-grid">
            {results.careerPaths.slice(0, 4).map((career: any, index: number) => (
              <div key={index} className="pdf-career-card">
                <h4 className="pdf-career-title">{career.title}</h4>
                <p className="pdf-career-description">{career.description}</p>
                <div className="pdf-career-footer">
                  <Badge className="pdf-career-badge">{career.level || 'Career Path'}</Badge>
                  <span className="pdf-career-match">{career.match || career.alignmentScore || 85}% Match</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skill Analysis */}
      <div className="pdf-skills-section">
        <h3 className="pdf-section-title">Skill Analysis</h3>
        <div className="pdf-skills-content">
          <div className="pdf-skills-strengths">
            <h4 className="pdf-skills-subtitle">
              <CheckCircle className="h-4 w-4" />
              Strengths
            </h4>
            <ul className="pdf-skills-list">
              {results.strengths && results.strengths.length > 0 ? (
                results.strengths.slice(0, 4).map((strength: any, index: number) => (
                  <li key={index} className="pdf-skill-item strength">
                    <span>{typeof strength === 'string' ? strength : 'Strength'}</span>
                  </li>
                ))
              ) : (
                <>
                  <li className="pdf-skill-item strength">Strong analytical thinking</li>
                  <li className="pdf-skill-item strength">Good problem-solving skills</li>
                  <li className="pdf-skill-item strength">Effective communication</li>
                  <li className="pdf-skill-item strength">Adaptability to change</li>
                </>
              )}
            </ul>
          </div>
          <div className="pdf-skills-gaps">
            <h4 className="pdf-skills-subtitle">
              <AlertTriangle className="h-4 w-4" />
              Areas for Development
            </h4>
            <ul className="pdf-skills-list">
              {results.improvements && results.improvements.length > 0 ? (
                results.improvements.slice(0, 4).map((improvement: any, index: number) => (
                  <li key={index} className="pdf-skill-item gap">
                    <span>{typeof improvement === 'string' ? improvement : 'Improvement'}</span>
                  </li>
                ))
              ) : (
                <>
                  <li className="pdf-skill-item gap">Technical skill development</li>
                  <li className="pdf-skill-item gap">Industry-specific knowledge</li>
                  <li className="pdf-skill-item gap">Practical experience</li>
                  <li className="pdf-skill-item gap">Networking opportunities</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="pdf-next-steps-section">
        <h3 className="pdf-section-title">Recommended Next Steps</h3>
        <div className="pdf-next-steps-list">
          {(results.nextSteps && results.nextSteps.length > 0 ? results.nextSteps : [
            'Focus on skill development in identified areas',
            'Take relevant courses and certifications',
            'Gain practical experience through projects',
            'Seek mentorship from industry professionals',
            'Build a portfolio showcasing your capabilities'
          ]).slice(0, 5).map((step: string, index: number) => (
            <div key={index} className="pdf-next-step-item">
              <div className="pdf-step-number">{index + 1}</div>
              <span className="pdf-step-text">{typeof step === 'string' ? step : 'Next step'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PDFLayout;
