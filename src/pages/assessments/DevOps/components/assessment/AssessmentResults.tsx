import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle, 
  BookOpen,
  ExternalLink,
  Target
} from "lucide-react";

export interface AssessmentResult {
  psychologicalFit: number;
  technicalReadiness: number;
  wiscarScores: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    realWorld: number;
  };
  overallScore: number;
  recommendation: 'yes' | 'maybe' | 'no';
  strengths: string[];
  improvements: string[];
  careerPaths: string[];
  nextSteps: string[];
}

interface AssessmentResultsProps {
  result: AssessmentResult;
  onRestart: () => void;
}

export function AssessmentResults({ result, onRestart }: AssessmentResultsProps) {
  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'yes': return 'bg-success text-white';
      case 'maybe': return 'bg-warning text-black';
      case 'no': return 'bg-destructive text-white';
      default: return 'bg-muted text-foreground';
    }
  };

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case 'yes': return <CheckCircle className="h-5 w-5" />;
      case 'maybe': return <AlertCircle className="h-5 w-5" />;
      case 'no': return <TrendingDown className="h-5 w-5" />;
      default: return <AlertCircle className="h-5 w-5" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-success';
    if (score >= 50) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Overall Results */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Your DevOps Assessment Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {Math.round(result.overallScore)}%
              </div>
              <div className="text-sm text-muted-foreground">Overall Score</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {Math.round(result.psychologicalFit)}%
              </div>
              <div className="text-sm text-muted-foreground">Psychological Fit</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {Math.round(result.technicalReadiness)}%
              </div>
              <div className="text-sm text-muted-foreground">Technical Readiness</div>
            </div>
          </div>
          
          <div className="text-center">
            <Badge className={getRecommendationColor(result.recommendation)}>
              {getRecommendationIcon(result.recommendation)}
              <span className="ml-2 capitalize">
                {result.recommendation === 'yes' ? 'Recommended' : 
                 result.recommendation === 'maybe' ? 'Consider Further' : 'Not Recommended'}
              </span>
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* WISCAR Framework Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">WISCAR Framework Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(result.wiscarScores).map(([key, score]) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium capitalize">
                    {key === 'realWorld' ? 'Real World Alignment' : key}
                  </span>
                  <span className={`text-sm font-semibold ${getScoreColor(score)}`}>
                    {Math.round(score)}%
                  </span>
                </div>
                <Progress value={score} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Strengths & Areas for Improvement */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-success" />
              Your Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Target className="h-5 w-5 text-warning" />
              Areas for Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.improvements.map((improvement, index) => (
                <li key={index} className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{improvement}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Career Pathways */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Recommended Career Paths</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.careerPaths.map((path, index) => (
              <div key={index} className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">{path}</h4>
                <p className="text-sm text-muted-foreground">
                  Based on your assessment results, this path aligns well with your strengths.
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Your Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {result.nextSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <Badge className="bg-primary text-primary-foreground">
                  {index + 1}
                </Badge>
                <div className="flex-1">
                  <p className="text-sm">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Learning Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Recommended Learning Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border border-border rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">FreeCodeCamp DevOps Roadmap</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Comprehensive learning path for DevOps fundamentals
              </p>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Resource
              </Button>
            </div>
            
            <div className="p-4 border border-border rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">Hands-on Labs</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Practice with Katacoda, GitHub Actions, and cloud platforms
              </p>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                Start Labs
              </Button>
            </div>
            
            <div className="p-4 border border-border rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">DevOps Communities</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Join Slack communities and forums for networking and support
              </p>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                Join Community
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-center gap-4">
        <Button onClick={onRestart} variant="outline">
          Retake Assessment
        </Button>
        <Button>
          Download Report
        </Button>
      </div>
    </div>
  );
}