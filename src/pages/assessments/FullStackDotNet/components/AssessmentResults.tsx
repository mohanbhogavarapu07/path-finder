
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  TrendingUp,
  BookOpen,
  Target,
  Users,
  Code,
  Brain,
  Award,
  RotateCcw
} from "lucide-react";

interface AssessmentResultsProps {
  answers: Record<string, any>;
  onRestart: () => void;
}

const AssessmentResults = ({ answers, onRestart }: AssessmentResultsProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Calculate scores based on answers
  const calculateScores = () => {
    const psychometricAnswers = Object.entries(answers).filter(([key]) => key.startsWith('psych_'));
    const technicalAnswers = Object.entries(answers).filter(([key]) => key.startsWith('tech_'));
    const wiscarAnswers = Object.entries(answers).filter(([key]) => key.startsWith('wiscar_'));

    // Psychometric Score (0-100)
    const psychometricScore = psychometricAnswers.length > 0 
      ? Math.round((psychometricAnswers.reduce((sum, [, value]) => sum + (value || 0), 0) / (psychometricAnswers.length * 5)) * 100)
      : 75;

    // Technical Score (correct answers)
    const technicalCorrectAnswers = {
      'tech_1': 'To organize code into reusable, maintainable units',
      'tech_2': ':',
      'tech_3': 'Application Programming Interface',
      'tech_4': 'To improve query performance',
      'tech_5': 'Controller',
      'tech_6': 'GET retrieves data, POST sends data',
      'tech_7': 'An Object-Relational Mapping (ORM) framework',
      'tech_8': 'To manage object dependencies and improve testability',
      'tech_9': 'SELECT',
      'tech_10': 'Asynchronous programming',
      'tech_11': '[1, 2, 4, 5]',
      'tech_12': 'O(log n)',
      'tech_13': 'Create, Read, Update, Delete',
      'tech_14': 'Track changes and collaborate',
      'tech_15': 'Cross-Origin Resource Sharing',
      'tech_16': 'To handle requests and responses in the pipeline',
      'tech_17': 'A data interchange format',
      'tech_18': 'Classes can have implementation, interfaces define contracts',
      'tech_19': 'To test individual components in isolation',
      'tech_20': 'A cloud computing platform'
    };

    const correctCount = technicalAnswers.filter(([key, value]) => 
      technicalCorrectAnswers[key as keyof typeof technicalCorrectAnswers] === value
    ).length;
    const technicalScore = Math.round((correctCount / technicalAnswers.length) * 100);

    // WISCAR Framework Scores
    const wiscarWillAnswers = wiscarAnswers.filter(([key]) => key.includes('will'));
    const wiscarInterestAnswers = wiscarAnswers.filter(([key]) => key.includes('interest'));
    const wiscarSkillAnswers = wiscarAnswers.filter(([key]) => key.includes('skill'));
    const wiscarCognitiveAnswers = wiscarAnswers.filter(([key]) => key.includes('cognitive'));
    const wiscarAbilityAnswers = wiscarAnswers.filter(([key]) => key.includes('ability'));
    const wiscarRealAnswers = wiscarAnswers.filter(([key]) => key.includes('real'));

    const calculateWiscarComponent = (componentAnswers: [string, any][]) => {
      if (componentAnswers.length === 0) return 75;
      const numericAnswers = componentAnswers.filter(([, value]) => typeof value === 'number');
      if (numericAnswers.length === 0) return 75;
      return Math.round((numericAnswers.reduce((sum, [, value]) => sum + value, 0) / (numericAnswers.length * 5)) * 100);
    };

    const wiscarScores = {
      will: calculateWiscarComponent(wiscarWillAnswers),
      interest: calculateWiscarComponent(wiscarInterestAnswers),
      skill: Math.min(85, calculateWiscarComponent(wiscarSkillAnswers) + 10),
      cognitive: calculateWiscarComponent(wiscarCognitiveAnswers),
      ability: calculateWiscarComponent(wiscarAbilityAnswers),
      real: calculateWiscarComponent(wiscarRealAnswers)
    };

    // Overall Confidence Score
    const overallScore = Math.round((psychometricScore + technicalScore + Object.values(wiscarScores).reduce((a, b) => a + b, 0) / 6) / 3);

    return {
      psychometric: psychometricScore,
      technical: technicalScore,
      wiscar: wiscarScores,
      overall: overallScore
    };
  };

  const scores = calculateScores();

  const getRecommendation = () => {
    if (scores.overall >= 75) {
      return {
        status: 'YES',
        icon: CheckCircle,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        title: 'Excellent Fit for Full Stack .NET Development',
        description: 'You demonstrate strong analytical thinking, technical aptitude, and alignment with .NET development. You should begin the Full Stack .NET pathway.',
        action: 'Start learning ASP.NET Core immediately'
      };
    } else if (scores.overall >= 55) {
      return {
        status: 'MAYBE',
        icon: AlertCircle,
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        title: 'Good Potential with Foundation Work Needed',
        description: 'You show promise for .NET development but need to strengthen some foundational skills first. Focus on the recommended learning plan.',
        action: 'Build foundations before advancing to .NET'
      };
    } else {
      return {
        status: 'NO',
        icon: XCircle,
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        title: 'Consider Alternative Paths',
        description: 'Based on your responses, Full Stack .NET may not be the best fit. Consider UI/UX design, Python development, or the MERN stack instead.',
        action: 'Explore alternative technology stacks'
      };
    }
  };

  const recommendation = getRecommendation();

  const getSkillLevel = (score: number) => {
    if (score >= 80) return { level: 'Advanced', color: 'text-green-600', bg: 'bg-green-100' };
    if (score >= 60) return { level: 'Intermediate', color: 'text-orange-600', bg: 'bg-orange-100' };
    return { level: 'Beginner', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const skillMapping = [
    { skill: 'C# Syntax', current: scores.technical >= 70 ? 'Intermediate' : 'Beginner', gap: scores.technical >= 70 ? 'Low' : 'High' },
    { skill: 'OOP Concepts', current: scores.technical >= 60 ? 'Intermediate' : 'Beginner', gap: scores.technical >= 60 ? 'Moderate' : 'High' },
    { skill: 'SQL & Databases', current: scores.technical >= 65 ? 'Intermediate' : 'Beginner', gap: scores.technical >= 65 ? 'Moderate' : 'High' },
    { skill: 'ASP.NET Core', current: 'None', gap: 'High' },
    { skill: 'JavaScript/Frontend', current: 'Beginner', gap: 'High' },
    { skill: 'Azure/DevOps', current: 'None', gap: 'High' }
  ];

  const careerPaths = [
    {
      title: 'Full Stack .NET Developer',
      description: 'Build frontend (Blazor/JS) + backend (C#/.NET)',
      match: scores.overall >= 75 ? 'High' : scores.overall >= 55 ? 'Medium' : 'Low'
    },
    {
      title: 'Backend Developer (.NET)',
      description: 'APIs, services, DB logic using ASP.NET',
      match: scores.technical >= 70 ? 'High' : scores.technical >= 50 ? 'Medium' : 'Low'
    },
    {
      title: 'Web App Developer',
      description: 'UI + business logic in enterprise-grade apps',
      match: scores.wiscar.interest >= 70 ? 'High' : 'Medium'
    },
    {
      title: 'Cloud Developer (.NET + Azure)',
      description: 'DevOps, CI/CD pipelines',
      match: scores.technical >= 80 ? 'High' : scores.technical >= 60 ? 'Medium' : 'Low'
    },
    {
      title: 'Enterprise Solution Architect',
      description: 'Lead app planning & architecture for large systems',
      match: scores.overall >= 85 ? 'High' : scores.overall >= 70 ? 'Medium' : 'Low'
    }
  ];

  const learningPath = [
    { 
      phase: '1. C# Deep Dive', 
      duration: '4-6 weeks',
      topics: ['Data Types & Variables', 'Classes & Objects', 'Inheritance & Polymorphism', 'Exception Handling'],
      status: scores.technical >= 70 ? 'completed' : 'pending'
    },
    { 
      phase: '2. ASP.NET Core Fundamentals', 
      duration: '6-8 weeks',
      topics: ['MVC Pattern', 'Controllers & Views', 'Routing', 'Middleware'],
      status: 'pending'
    },
    { 
      phase: '3. Frontend Integration', 
      duration: '4-6 weeks',
      topics: ['HTML & CSS', 'JavaScript/TypeScript', 'Razor Pages', 'Blazor Basics'],
      status: 'pending'
    },
    { 
      phase: '4. Database & Entity Framework', 
      duration: '4-5 weeks',
      topics: ['SQL Server', 'Entity Framework Core', 'LINQ Queries', 'Migrations'],
      status: 'pending'
    },
    { 
      phase: '5. Advanced Topics', 
      duration: '6-8 weeks',
      topics: ['Authentication & Authorization', 'API Development', 'Testing', 'Performance'],
      status: 'pending'
    },
    { 
      phase: '6. Deployment & DevOps', 
      duration: '3-4 weeks',
      topics: ['Azure Deployment', 'CI/CD Pipelines', 'Docker Basics', 'Monitoring'],
      status: 'pending'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Assessment Results</h1>
          <p className="text-gray-600">Your personalized Full Stack .NET development assessment</p>
        </div>

        {/* Overall Recommendation */}
        <Card className={`mb-8 border-2 ${recommendation.borderColor} ${recommendation.bgColor} shadow-lg`}>
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <recommendation.icon className={`h-12 w-12 ${recommendation.color} mr-4`} />
                <div>
                  <Badge className={`mb-2 ${recommendation.color} ${recommendation.bgColor}`}>
                    {recommendation.status}
                  </Badge>
                  <h2 className="text-2xl font-bold text-gray-900">{recommendation.title}</h2>
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">{scores.overall}%</div>
                <div className="text-sm text-gray-600">Overall Score</div>
              </div>
            </div>
            <p className="text-gray-700 mb-4">{recommendation.description}</p>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Recommended Next Step:</h3>
              <p className={`${recommendation.color} font-medium`}>{recommendation.action}</p>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Results Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="overview" className="flex items-center">
              <Target className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="wiscar" className="flex items-center">
              <Brain className="h-4 w-4 mr-2" />
              WISCAR
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center">
              <Code className="h-4 w-4 mr-2" />
              Skills
            </TabsTrigger>
            <TabsTrigger value="careers" className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Careers
            </TabsTrigger>
            <TabsTrigger value="learning" className="flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              Learning
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="h-5 w-5 mr-2 text-purple-600" />
                    Psychometric Fit
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{scores.psychometric}%</div>
                  <Progress value={scores.psychometric} className="mb-3" />
                  <p className="text-sm text-gray-600">
                    {scores.psychometric >= 80 ? 'Strong personality alignment with .NET development culture and mindset.' :
                     scores.psychometric >= 60 ? 'Good fit with some areas for mindset development.' :
                     'May want to explore if .NET development aligns with your working style.'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Code className="h-5 w-5 mr-2 text-green-600" />
                    Technical Readiness
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{scores.technical}%</div>
                  <Progress value={scores.technical} className="mb-3" />
                  <p className="text-sm text-gray-600">
                    {scores.technical >= 80 ? 'Excellent technical foundation. Ready for advanced .NET concepts.' :
                     scores.technical >= 60 ? 'Solid base. Focus on strengthening programming fundamentals.' :
                     'Recommend building stronger programming foundation before .NET-specific learning.'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2 text-blue-600" />
                    Learning Readiness
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {Math.round(Object.values(scores.wiscar).reduce((a, b) => a + b, 0) / 6)}%
                  </div>
                  <Progress value={Math.round(Object.values(scores.wiscar).reduce((a, b) => a + b, 0) / 6)} className="mb-3" />
                  <p className="text-sm text-gray-600">
                    Your overall capacity and motivation for learning Full Stack .NET development.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* WISCAR Tab */}
          <TabsContent value="wiscar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>WISCAR Framework Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {Object.entries(scores.wiscar).map(([key, score]) => {
                    const labels = {
                      will: 'Will (Persistence)',
                      interest: 'Interest (Motivation)',
                      skill: 'Skill (Current Ability)',
                      cognitive: 'Cognitive (Problem-solving)',
                      ability: 'Ability to Learn',
                      real: 'Real-world Alignment'
                    };
                    const level = getSkillLevel(score);
                    
                    return (
                      <div key={key} className="text-center">
                        <h3 className="font-semibold text-gray-900 mb-3">{labels[key as keyof typeof labels]}</h3>
                        <div className="text-2xl font-bold text-gray-900 mb-2">{score}%</div>
                        <Progress value={score} className="mb-3" />
                        <Badge className={`${level.bg} ${level.color} border-0`}>
                          {level.level}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Skill Mapping & Development Needs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Required Skill</th>
                        <th className="text-left p-3">Current Level</th>
                        <th className="text-left p-3">Learning Gap</th>
                        <th className="text-left p-3">Priority</th>
                      </tr>
                    </thead>
                    <tbody>
                      {skillMapping.map((skill, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-3 font-medium">{skill.skill}</td>
                          <td className="p-3">
                            <Badge variant="outline" className={
                              skill.current === 'Intermediate' ? 'border-orange-200 text-orange-700' :
                              skill.current === 'None' || skill.current === 'Beginner' ? 'border-red-200 text-red-700' :
                              'border-green-200 text-green-700'
                            }>
                              {skill.current}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <Badge variant="outline" className={
                              skill.gap === 'High' ? 'border-red-200 text-red-700' :
                              skill.gap === 'Moderate' ? 'border-orange-200 text-orange-700' :
                              'border-green-200 text-green-700'
                            }>
                              {skill.gap}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <Badge className={
                              skill.gap === 'High' ? 'bg-red-100 text-red-700' :
                              skill.gap === 'Moderate' ? 'bg-orange-100 text-orange-700' :
                              'bg-green-100 text-green-700'
                            }>
                              {skill.gap === 'High' ? 'High' : skill.gap === 'Moderate' ? 'Medium' : 'Low'}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Careers Tab */}
          <TabsContent value="careers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top 5 .NET Career Paths & Your Fit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {careerPaths.map((career, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">{career.title}</h3>
                        <Badge className={
                          career.match === 'High' ? 'bg-green-100 text-green-700' :
                          career.match === 'Medium' ? 'bg-orange-100 text-orange-700' :
                          'bg-red-100 text-red-700'
                        }>
                          {career.match} Match
                        </Badge>
                      </div>
                      <p className="text-gray-600">{career.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Learning Tab */}
          <TabsContent value="learning" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recommended Learning Path</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {learningPath.map((phase, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{phase.phase}</h3>
                          <p className="text-gray-600">{phase.duration}</p>
                        </div>
                        <Badge className={
                          phase.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }>
                          {phase.status === 'completed' ? 'Ready to Skip' : 'To Complete'}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {phase.topics.map((topic, topicIndex) => (
                          <Badge key={topicIndex} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {scores.overall < 55 && (
                  <Card className="bg-orange-50 border-orange-200">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-orange-800 mb-3">Alternative Learning Paths</h3>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                          <span className="text-orange-700">Frontend Development (React, Angular)</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                          <span className="text-orange-700">Python + Django / Flask</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                          <span className="text-orange-700">UI/UX Design (Figma + HTML/CSS)</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                          <span className="text-orange-700">No-code Development (WordPress)</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Actions */}
        <div className="text-center mt-8">
          <Button 
            onClick={onRestart}
            variant="outline" 
            className="mr-4"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Retake Assessment
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <BookOpen className="h-4 w-4 mr-2" />
            Start Learning Plan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentResults;
