
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Award, 
  Target, 
  TrendingUp, 
  Brain, 
  Code, 
  BarChart3,
  CheckCircle,
  ArrowRight,
  Download
} from "lucide-react";

interface ResultsStepProps {
  psychologicalAnswers: Record<string, string>;
  technicalAnswers: Record<string, string>;
  wiscarAnswers: Record<string, string>;
}

const ResultsStep = ({ psychologicalAnswers, technicalAnswers, wiscarAnswers }: ResultsStepProps) => {
  // Calculate scores (simplified scoring logic)
  const calculatePsychologicalScore = () => {
    const scores = {
      creativity: { creative: 4, balanced: 3, analytical: 2, collaborative: 3 },
      adaptability: { very_comfortable: 4, comfortable: 3, somewhat: 2, challenging: 1 },
      communication: { persuasive: 4, clear: 3, collaborative: 3, reserved: 2 },
      data_comfort: { love_it: 4, comfortable: 3, learning: 2, avoid: 1 },
      multitasking: { excellent: 4, good: 3, okay: 2, difficult: 1 },
      feedback: { embrace: 4, accept: 3, defensive: 2, struggle: 1 }
    };
    
    let total = 0;
    Object.entries(psychologicalAnswers).forEach(([key, value]) => {
      total += scores[key as keyof typeof scores]?.[value as keyof (typeof scores)[keyof typeof scores]] || 0;
    });
    
    return Math.round((total / 24) * 100);
  };

  const calculateTechnicalScore = () => {
    const scores = {
      tech_comfort: { very_comfortable: 4, comfortable: 3, moderate: 2, challenging: 1 },
      html_css: { experienced: 4, basic: 3, interested: 2, no_interest: 1 },
      analytics_tools: { familiar: 4, heard: 2, willing: 3, overwhelmed: 1 },
      automation: { excited: 4, interested: 3, neutral: 2, prefer_manual: 1 },
      social_platforms: { very_comfortable: 4, comfortable: 3, basic: 2, minimal: 1 },
      troubleshooting: { debug: 4, research: 3, ask_help: 2, frustrated: 1 }
    };
    
    let total = 0;
    Object.entries(technicalAnswers).forEach(([key, value]) => {
      total += scores[key as keyof typeof scores]?.[value as keyof (typeof scores)[keyof typeof scores]] || 0;
    });
    
    return Math.round((total / 24) * 100);
  };

  const psychScore = calculatePsychologicalScore();
  const techScore = calculateTechnicalScore();
  const overallScore = Math.round((psychScore + techScore) / 2);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getRecommendation = () => {
    if (overallScore >= 80) {
      return {
        title: "Excellent Fit!",
        description: "You show strong potential for success in digital marketing with both the psychological traits and technical aptitude needed.",
        nextSteps: [
          "Consider starting with online courses in Google Analytics and Google Ads",
          "Build a portfolio by creating campaigns for local businesses or personal projects",
          "Join digital marketing communities and follow industry blogs"
        ]
      };
    } else if (overallScore >= 60) {
      return {
        title: "Good Potential",
        description: "You have solid fundamentals for digital marketing. With some focused learning, you could thrive in this field.",
        nextSteps: [
          "Focus on strengthening your weaker areas identified in the assessment",
          "Start with beginner-friendly courses to build confidence",
          "Consider internships or entry-level positions to gain experience"
        ]
      };
    } else {
      return {
        title: "Consider Carefully",
        description: "While digital marketing is accessible to many, you may face some challenges. Consider whether you're willing to invest in developing the necessary skills.",
        nextSteps: [
          "Take time to research the field more thoroughly",
          "Consider related fields that might better match your strengths",
          "If still interested, start with very basic courses to test your interest"
        ]
      };
    }
  };

  const recommendation = getRecommendation();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Overall Score */}
      <Card className="bg-gradient-primary text-white border-0">
        <CardContent className="p-8 text-center">
          <Award className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">Your Digital Marketing Fit Score</h2>
          <div className="text-6xl font-bold mb-4">{overallScore}%</div>
          <p className="text-lg opacity-90">{recommendation.title}</p>
        </CardContent>
      </Card>

      {/* Detailed Scores */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-semibold">Psychological Fit</h3>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <Progress value={psychScore} className="flex-1" />
              <span className={`text-2xl font-bold ${getScoreColor(psychScore)}`}>
                {psychScore}%
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Measures creativity, adaptability, communication style, and mindset alignment
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Code className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-semibold">Technical Aptitude</h3>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <Progress value={techScore} className="flex-1" />
              <span className={`text-2xl font-bold ${getScoreColor(techScore)}`}>
                {techScore}%
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Evaluates comfort with technology, learning ability, and technical problem-solving
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recommendation */}
      <Card>
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-8 h-8 text-primary" />
            <h3 className="text-2xl font-bold">Our Recommendation</h3>
          </div>
          
          <p className="text-lg mb-6">{recommendation.description}</p>
          
          <h4 className="text-lg font-semibold mb-4">Next Steps:</h4>
          <div className="space-y-3 mb-6">
            {recommendation.nextSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-step-complete mt-0.5 flex-shrink-0" />
                <span>{step}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <Button size="lg" variant="outline">
          <Download className="w-5 h-5 mr-2" />
          Download Report
        </Button>
        <Button size="lg">
          Get Started with Learning
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default ResultsStep;
