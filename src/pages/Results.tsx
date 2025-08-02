
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Share2, Download, RefreshCw, ExternalLink, CheckCircle, AlertCircle, TrendingUp, Brain, Target, Lightbulb, ArrowRight } from "lucide-react";
import { Link, useParams, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Results = () => {
  const { id } = useParams();
  const location = useLocation();
  const answers = location.state?.answers || {};

  // Mock results data - would be calculated based on answers in real app
  const resultsData = {
    "skills-software": {
      title: "Python Programming Fit Assessment",
      overallScore: 85,
      scoreLabel: "Strong Fit",
      color: "green",
      summary: "You show strong alignment with Python programming! Your logical thinking style and problem-solving approach make you well-suited for Python development.",
      breakdown: [
        {
          category: "Learning Style Match",
          score: 90,
          description: "Your hands-on learning preference aligns perfectly with Python's interactive nature"
        },
        {
          category: "Problem-Solving Approach",
          score: 85,
          description: "Your systematic approach to challenges fits well with programming logic"
        },
        {
          category: "Career Motivation",
          score: 80,
          description: "Strong alignment with typical Python career paths and opportunities"
        },
        {
          category: "Technical Aptitude",
          score: 85,
          description: "Good foundation for developing Python programming skills"
        }
      ],
      strengths: [
        "Natural problem-solver with logical thinking",
        "Prefers hands-on learning (perfect for coding)",
        "Strong interest in automation and data analysis",
        "Comfortable with self-directed learning"
      ],
      considerations: [
        "Consider starting with data analysis projects to build confidence",
        "Join Python communities for support and networking",
        "Focus on practical projects rather than just theory"
      ],
      recommendations: [
        {
          type: "course",
          title: "Python for Beginners",
          description: "Start with this free course covering Python basics",
          link: "#",
          icon: <Lightbulb className="h-5 w-5" />
        },
        {
          type: "project",
          title: "Build Your First Data Analysis Project",
          description: "Hands-on project to apply Python for real data insights",
          link: "#",
          icon: <Target className="h-5 w-5" />
        },
        {
          type: "career",
          title: "Python Developer Career Path",
          description: "Explore career opportunities and skill requirements",
          link: "#",
          icon: <TrendingUp className="h-5 w-5" />
        }
      ]
    }
  };

  const result = resultsData[id as keyof typeof resultsData];

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Results not found</h1>
          <Link to="/assessments">
            <Button className="mt-4">Back to Assessments</Button>
          </Link>
        </div>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-100";
    if (score >= 60) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-5 w-5 text-green-600" />;
    if (score >= 60) return <AlertCircle className="h-5 w-5 text-yellow-600" />;
    return <AlertCircle className="h-5 w-5 text-red-600" />;
  };

  return (
          <div className="min-h-screen bg-blue-50">
      <Header logoType="brain" navLinks={[
        { to: "/", label: "Home" },
        { to: "/assessments", label: "Assessments" },
        { to: "/about", label: "About" },
        { to: "/blog", label: "Blog" },
      ]} rightContent={<></>} />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Results Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-foreground">Assessment Complete!</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Your {result.title} Results
          </h1>
        </div>

        {/* Overall Score Card */}
        <Card className="mb-8 bg-blue-50 border-blue-200 shadow-lg">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-blue-600 flex items-center justify-center">
                    <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center">
                      <span className="text-4xl font-bold text-foreground">{result.overallScore}</span>
                    </div>
                  </div>
                  <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-thinkera-blue text-white px-4 py-1">
                    {result.scoreLabel}
                  </Badge>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Strong Fit for Python Programming
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {result.summary}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Detailed Breakdown */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-6 w-6 text-thinkera-blue" />
                  <span>Detailed Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {result.breakdown.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-muted/50 border border-border">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-foreground">{item.category}</h3>
                      <div className="flex items-center space-x-2">
                        {getScoreIcon(item.score)}
                        <Badge className={`${getScoreColor(item.score)} font-bold`}>
                          {item.score}%
                        </Badge>
                      </div>
                    </div>
                    <Progress value={item.score} className="mb-3 h-2" />
                                          <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Strengths & Considerations */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-lg border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-green-700">
                    <CheckCircle className="h-5 w-5" />
                    <span>Your Strengths</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {result.strengths.map((strength, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-foreground text-sm">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

                      <Card className="shadow-lg border-thinkera-blue/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-thinkera-blue">
                    <Lightbulb className="h-5 w-5" />
                    <span>Key Considerations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {result.considerations.map((consideration, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                                          <Lightbulb className="h-4 w-4 text-thinkera-blue mt-0.5 flex-shrink-0" />
                  <span className="text-foreground text-sm">{consideration}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Action Panel */}
          <div className="space-y-6">
            <Card className="shadow-lg border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-purple-700">
                  <Target className="h-6 w-6" />
                  <span>Recommended Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {result.recommendations.map((rec, idx) => (
                  <div key={idx} className="p-4 rounded-lg border border-border hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-purple-100 rounded-full">
                        {rec.icon}
                      </div>
                      <div className="flex-1">
                                              <h4 className="font-semibold text-foreground mb-1">{rec.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                        <Button size="sm" variant="outline" className="w-full">
                          <span>Explore</span>
                          <ExternalLink className="ml-2 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="shadow-lg bg-blue-600 text-white">
              <CardContent className="p-6 text-center">
                <h3 className="font-bold text-xl mb-4">Ready for Your Next Assessment?</h3>
                <p className="mb-6 text-white/90">
                  Explore more areas to build a complete picture of your ideal path.
                </p>
                <div className="space-y-3">
                  <Link to="/assessments">
                    <Button className="w-full bg-white text-thinkera-blue hover:bg-muted">
                      Take Another Assessment
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-thinkera-blue">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Retake This Assessment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Share Your Results */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardContent className="p-6 text-center">
            <h3 className="font-bold text-xl text-foreground mb-4">
              Share Your Journey with Friends
            </h3>
            <p className="text-muted-foreground mb-6">
              Invite friends to take assessments and compare your career strengths and interests.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                              <Button className="bg-thinkera-blue hover:bg-thinkera-blue/90">
                <Share2 className="mr-2 h-4 w-4" />
                Share Results
              </Button>
              <Button variant="outline">
                Invite Friends
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Results;
