import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  TrendingUp, 
  BookOpen, 
  Users, 
  Target,
  Download,
  RotateCcw
} from "lucide-react";
import { AssessmentResult } from "@/types/assessment";

interface AssessmentResultsProps {
  results: AssessmentResult;
}

export const AssessmentResults = ({ results }: AssessmentResultsProps) => {
  const getRecommendationColor = () => {
    switch (results.recommendation) {
      case 'Yes': return 'text-green-600 bg-green-50 border-green-200';
      case 'Maybe': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'No': return 'text-red-600 bg-red-50 border-red-200';
    }
  };

  const getRecommendationIcon = () => {
    switch (results.recommendation) {
      case 'Yes': return <CheckCircle className="w-6 h-6" />;
      case 'Maybe': return <AlertCircle className="w-6 h-6" />;
      case 'No': return <XCircle className="w-6 h-6" />;
    }
  };

  const wiscarData = [
    { label: 'Will (Motivation)', value: results.scores.w, color: 'bg-blue-500' },
    { label: 'Interest', value: results.scores.i, color: 'bg-green-500' },
    { label: 'Skill', value: results.scores.s, color: 'bg-purple-500' },
    { label: 'Cognitive', value: results.scores.c, color: 'bg-orange-500' },
    { label: 'Ability to Learn', value: results.scores.a, color: 'bg-pink-500' },
    { label: 'Real-world Alignment', value: results.scores.r, color: 'bg-teal-500' },
  ];

  return (
    <div className="space-y-8">
      {/* Overall Results Header */}
      <Card className={`border-2 ${getRecommendationColor()}`}>
        <CardContent className="p-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            {getRecommendationIcon()}
            <h2 className="text-3xl font-bold">
              {results.recommendation === 'Yes' && 'AWS is Right for You!'}
              {results.recommendation === 'Maybe' && 'AWS Could Be a Good Fit'}
              {results.recommendation === 'No' && 'Consider Alternative Paths'}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">{results.scores.overall}%</div>
              <div className="text-sm text-muted-foreground">Overall Readiness</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">{results.confidence}%</div>
              <div className="text-sm text-muted-foreground">Confidence Score</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">
                {results.recommendation === 'Yes' ? 'High' : 
                 results.recommendation === 'Maybe' ? 'Medium' : 'Low'}
              </div>
              <div className="text-sm text-muted-foreground">Recommendation</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Score Breakdown */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Core Assessment Scores
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span>Psychological Fit</span>
                <span className="font-semibold">{results.scores.psychometric}%</span>
              </div>
              <Progress value={results.scores.psychometric} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span>Technical Readiness</span>
                <span className="font-semibold">{results.scores.technical}%</span>
              </div>
              <Progress value={results.scores.technical} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              WISCAR Framework
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {wiscarData.map((item) => (
              <div key={item.label}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">{item.label}</span>
                  <span className="text-sm font-semibold">{item.value}%</span>
                </div>
                <Progress value={item.value} className="h-1.5" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Strengths and Improvements */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              Your Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {results.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {results.improvements.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600">
                <TrendingUp className="w-5 h-5" />
                Areas for Growth
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {results.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5" />
                    <span className="text-sm">{improvement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Career Paths */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Recommended Career Paths
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            {results.careerPaths.map((path) => (
              <Badge key={path} variant="outline" className="p-2 justify-center">
                {path}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Your Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3">
            {results.nextSteps.map((step, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  {index + 1}
                </div>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      {/* Alternative Suggestions */}
      {results.alternativeSuggestions && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <AlertCircle className="w-5 h-5" />
              Alternative Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-orange-700 mb-3">
              Based on your assessment, you might want to consider these alternatives first:
            </p>
            <ul className="space-y-2">
              {results.alternativeSuggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-2 text-orange-700">
                  <AlertCircle className="w-4 h-4 mt-0.5" />
                  <span className="text-sm">{suggestion}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button size="lg" className="gap-2">
          <Download className="w-4 h-4" />
          Download Results
        </Button>
        <Button variant="outline" size="lg" className="gap-2" onClick={() => window.location.reload()}>
          <RotateCcw className="w-4 h-4" />
          Retake Assessment
        </Button>
      </div>
    </div>
  );
};