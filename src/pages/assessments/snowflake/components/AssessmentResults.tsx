import { AssessmentResults as Results } from "@/types/assessment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Target, 
  TrendingUp, 
  BookOpen,
  Users,
  Lightbulb,
  Download
} from "lucide-react";

interface AssessmentResultsProps {
  results: Results;
  onRestart: () => void;
}

export const AssessmentResults = ({ results, onRestart }: AssessmentResultsProps) => {
  const getRecommendationIcon = () => {
    switch (results.recommendation) {
      case 'Yes': return <CheckCircle className="h-6 w-6 text-success" />;
      case 'Maybe': return <AlertCircle className="h-6 w-6 text-warning" />;
      case 'No': return <XCircle className="h-6 w-6 text-destructive" />;
    }
  };

  const getRecommendationColor = () => {
    switch (results.recommendation) {
      case 'Yes': return 'bg-success text-success-foreground';
      case 'Maybe': return 'bg-warning text-warning-foreground';
      case 'No': return 'bg-destructive text-destructive-foreground';
    }
  };

  const getRecommendationMessage = () => {
    switch (results.recommendation) {
      case 'Yes': 
        return "Excellent! You show strong potential for a successful career in Snowflake data engineering. Your aptitude, motivation, and alignment make you an ideal candidate.";
      case 'Maybe': 
        return "You have promising potential for Snowflake, but some areas need development. Focus on the suggested next steps to strengthen your readiness.";
      case 'No': 
        return "Snowflake might not be the best fit right now. Consider exploring adjacent fields or building foundational skills before revisiting this path.";
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Overall Recommendation */}
      <Card className={`border-2 ${
        results.recommendation === 'Yes' ? 'border-green-200 bg-green-50' :
        results.recommendation === 'Maybe' ? 'border-orange-200 bg-orange-50' :
        'border-red-200 bg-red-50'
      }`}>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className={`p-4 rounded-full ${
              results.recommendation === 'Yes' ? 'bg-green-100' :
              results.recommendation === 'Maybe' ? 'bg-orange-100' :
              'bg-red-100'
            }`}>
              {getRecommendationIcon()}
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
            Assessment Complete!
          </CardTitle>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {getRecommendationMessage()}
          </p>
          <Badge 
            variant="outline" 
            className={`mt-4 text-lg px-4 py-2 ${
              results.recommendation === 'Yes' ? 'bg-green-100 text-green-800 border-green-300' :
              results.recommendation === 'Maybe' ? 'bg-orange-100 text-orange-800 border-orange-300' :
              'bg-red-100 text-red-800 border-red-300'
            }`}
          >
            {results.recommendation === 'Yes' && 'Recommended'}
            {results.recommendation === 'Maybe' && 'Conditional Fit'}
            {results.recommendation === 'No' && 'Not Recommended'}
          </Badge>
        </CardHeader>
      </Card>

      {/* Score Breakdown */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-purple-600" />
              <span>Psychological Fit</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-2xl font-bold text-purple-600">
                    {results.psychological_fit}%
                  </span>
                  <Badge variant={results.psychological_fit >= 70 ? "default" : "secondary"}>
                    {results.psychological_fit >= 70 ? "Strong" : results.psychological_fit >= 50 ? "Moderate" : "Weak"}
                  </Badge>
                </div>
                <Progress value={results.psychological_fit} className="h-3" />
              </div>
              <p className="text-sm text-muted-foreground">
                Your personality traits, motivation, and mindset alignment with data engineering roles.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-green-600" />
              <span>Technical Readiness</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-2xl font-bold text-green-600">
                    {results.technical_readiness}%
                  </span>
                  <Badge variant={results.technical_readiness >= 70 ? "default" : "secondary"}>
                    {results.technical_readiness >= 70 ? "Ready" : results.technical_readiness >= 50 ? "Developing" : "Beginner"}
                  </Badge>
                </div>
                <Progress value={results.technical_readiness} className="h-3" />
              </div>
              <p className="text-sm text-muted-foreground">
                Your current technical knowledge and aptitude for Snowflake concepts.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-orange-600" />
              <span>WISCAR Overall</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-2xl font-bold text-orange-600">
                    {results.wiscar.overall_confidence}%
                  </span>
                  <Badge variant={results.wiscar.overall_confidence >= 70 ? "default" : "secondary"}>
                    {results.wiscar.overall_confidence >= 70 ? "High" : results.wiscar.overall_confidence >= 50 ? "Medium" : "Low"}
                  </Badge>
                </div>
                <Progress value={results.wiscar.overall_confidence} className="h-3" />
              </div>
              <p className="text-sm text-muted-foreground">
                Comprehensive evaluation across six key dimensions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* WISCAR Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>WISCAR Dimensional Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { key: 'W', label: 'Will', score: results.wiscar.W },
              { key: 'I', label: 'Interest', score: results.wiscar.I },
              { key: 'S', label: 'Skill', score: results.wiscar.S },
              { key: 'C', label: 'Cognitive', score: results.wiscar.C },
              { key: 'A', label: 'Ability to Learn', score: results.wiscar.A },
              { key: 'R', label: 'Real-World Fit', score: results.wiscar.R }
            ].map((dimension) => (
              <div key={dimension.key} className="text-center p-4 bg-accent rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">{dimension.score}%</div>
                <div className="text-sm font-medium mb-2">{dimension.label}</div>
                <Progress value={dimension.score} className="h-1" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-blue-600" />
            Recommended Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {results.next_steps.map((step, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-accent rounded-lg">
                <div className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  {index + 1}
                </div>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Career Alignment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-green-600" />
            Career Alignment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {results.career_alignment.map((role, index) => (
              <div key={index} className="p-3 border rounded-lg text-center hover:shadow-md transition-shadow">
                <div className="font-medium">{role}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Learning Path */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Learning Path</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {results.ideal_path.map((step, index) => (
              <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <span className="font-medium">{step}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-center space-x-4">
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => window.location.reload()}
        >
          Retake Assessment
        </Button>
        {/* <Button variant="outline" className="flex items-center gap-2 bg-green-50 text-green-700 border-green-300">
          <Download className="h-4 w-4" />
          Download Full Report
        </Button> */}
      </div>
    </div>
  );
};