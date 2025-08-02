import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, TrendingUp, BookOpen, Users, Code, Database, Cloud, Wrench } from "lucide-react";

interface CareerGuidanceProps {
  onNext: () => void;
  onPrev: () => void;
  assessmentData: any;
  updateAssessmentData: (data: any) => void;
  isFirst: boolean;
  isLast: boolean;
}

const CareerGuidance = ({ onPrev, assessmentData }: CareerGuidanceProps) => {
  const psychometricScore = Number(assessmentData.psychometricScore) || 0;
  const technicalScore = Number(assessmentData.technicalScore) || 0;
  const wiscarScores = assessmentData.wiscarScores || {};
  
  const wiscarValues = Object.values(wiscarScores).map(score => Number(score) || 0);
  const wiscarAverage = wiscarValues.length > 0 
    ? wiscarValues.reduce((sum: number, score: number) => sum + score, 0) / 6 
    : 0;
    
  const overallScore = Math.round((psychometricScore + technicalScore + wiscarAverage) / 3);

  const careerPaths = [
    {
      title: "Java Full Stack Developer",
      description: "Build complete web applications with both frontend and backend",
      icon: Code,
      skills: ["Java", "Spring Boot", "React/Angular", "REST APIs", "Database"],
      salary: "$75k - $120k",
      demand: "High",
      color: "blue"
    },
    {
      title: "Backend Developer (Java)",
      description: "Focus on server-side logic, APIs, and business processes",
      icon: Database,
      skills: ["Java", "Spring", "Microservices", "Database", "Security"],
      salary: "$70k - $110k",
      demand: "Very High",
      color: "green"
    },
    {
      title: "Java Software Engineer",
      description: "Build large-scale enterprise systems and applications",
      icon: Wrench,
      skills: ["Java", "System Design", "Architecture", "Performance", "Testing"],
      salary: "$80k - $130k",
      demand: "High",
      color: "purple"
    },
    {
      title: "Cloud Developer (Java + AWS/Azure)",
      description: "Develop cloud-native applications and microservices",
      icon: Cloud,
      skills: ["Java", "Spring Boot", "AWS/Azure", "Docker", "Kubernetes"],
      salary: "$85k - $140k",
      demand: "Very High",
      color: "orange"
    },
    {
      title: "Tech Lead (Java)",
      description: "Lead development teams and architectural decisions",
      icon: Users,
      skills: ["Java", "Leadership", "Architecture", "Mentoring", "CI/CD"],
      salary: "$100k - $160k",
      demand: "Medium",
      color: "red"
    }
  ];

  const skillMapping = [
    { skill: "Java Core", yourLevel: "Beginner", required: "Intermediate", gap: true },
    { skill: "Spring Boot", yourLevel: "None", required: "Beginner", gap: true },
    { skill: "REST APIs", yourLevel: "Beginner", required: "Intermediate", gap: true },
    { skill: "SQL/Database", yourLevel: "Intermediate", required: "Intermediate", gap: false },
    { skill: "Frontend (HTML/CSS/JS)", yourLevel: "Beginner", required: "Beginner", gap: false },
    { skill: "Git/Version Control", yourLevel: "Beginner", required: "Intermediate", gap: true },
    { skill: "Testing", yourLevel: "None", required: "Beginner", gap: true },
    { skill: "Docker/CI/CD", yourLevel: "None", required: "Beginner", gap: true }
  ];

  const learningPath = {
    phase1: {
      title: "Foundation (Months 1-2)",
      items: [
        "Java Fundamentals (Data types, OOP, Loops)",
        "Java Collections & Exception Handling",
        "Basic SQL and Database Concepts",
        "Git Version Control Basics"
      ]
    },
    phase2: {
      title: "Framework Mastery (Months 3-4)",
      items: [
        "Spring Boot Essentials (MVC, DI, REST)",
        "Building REST APIs with Spring",
        "Database Integration (JPA/Hibernate)",
        "Testing with JUnit and Mockito"
      ]
    },
    phase3: {
      title: "Full Stack Development (Months 5-6)",
      items: [
        "Frontend with HTML/CSS + JavaScript",
        "React or Angular Basics",
        "Full Stack Project (CRUD + Authentication)",
        "API Documentation and Testing"
      ]
    },
    phase4: {
      title: "Professional Skills (Months 7-8)",
      items: [
        "Docker and Containerization",
        "CI/CD Pipeline Setup",
        "Security Best Practices",
        "Performance Optimization"
      ]
    }
  };

  const alternativePaths = [
    {
      title: "Frontend Development",
      description: "Focus on user interfaces with React, Vue, or Angular",
      reason: "If you prefer visual development and user experience"
    },
    {
      title: "MERN Stack",
      description: "JavaScript-based full stack (MongoDB, Express, React, Node.js)",
      reason: "If you prefer JavaScript ecosystem over Java"
    },
    {
      title: "Python Full Stack",
      description: "Django or Flask backend with React frontend",
      reason: "If you prefer Python's syntax and ecosystem"
    },
    {
      title: "UI/UX Design",
      description: "Focus on user interface design and user experience",
      reason: "If you're more visually inclined and creative"
    },
    {
      title: "No-Code/Low-Code",
      description: "Build applications using platforms like Bubble or Webflow",
      reason: "If you want to build without extensive coding"
    }
  ];

  const restartAssessment = () => {
    window.location.reload();
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
          <MapPin className="w-6 h-6 text-blue-600" />
          Career & Learning Guidance
        </h2>
        <p className="text-gray-600 mb-4">
          Your personalized roadmap to Full Stack Java development
        </p>
        <Badge variant="outline" className="text-lg px-4 py-2">
          Overall Score: {overallScore}%
        </Badge>
      </div>

      {/* Career Paths */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-green-600" />
            Career Paths Available with Full Stack Java
          </CardTitle>
          <CardDescription>
            Explore the different career opportunities in the Java ecosystem
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {careerPaths.map((path, index) => {
              const Icon = path.icon;
              return (
                <Card key={index} className={`border-l-4 border-${path.color}-400`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Icon className={`w-8 h-8 text-${path.color}-600 mt-1`} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{path.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {path.demand} Demand
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-3">{path.description}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {path.skills.map((skill, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-green-600 font-semibold">💰 {path.salary}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Skill Mapping */}
      <Card>
        <CardHeader>
          <CardTitle>Required vs Current Skills</CardTitle>
          <CardDescription>
            See how your current skills compare to Full Stack Java requirements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {skillMapping.map((skill, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium">{skill.skill}</div>
                  <div className="text-sm text-gray-600">
                    Your Level: {skill.yourLevel} → Required: {skill.required}
                  </div>
                </div>
                <div className="text-right">
                  {skill.gap ? (
                    <Badge variant="destructive" className="text-xs">Gap</Badge>
                  ) : (
                    <Badge variant="secondary" className="text-xs">✓ Ready</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Learning Path */}
      {overallScore >= 55 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              Your 8-Month Learning Path
            </CardTitle>
            <CardDescription>
              Structured roadmap to becoming a Full Stack Java developer
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(learningPath).map(([phase, data], index) => (
                <div key={phase} className="relative">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-2">{data.title}</h4>
                      <div className="space-y-2">
                        {data.items.map((item, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {index < Object.keys(learningPath).length - 1 && (
                    <div className="absolute left-4 top-12 w-0.5 h-8 bg-gray-300"></div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Alternative Paths */}
      {overallScore < 55 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-orange-700">Alternative Career Paths</CardTitle>
            <CardDescription>
              Consider these alternatives that might be a better fit for your current profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alternativePaths.map((path, index) => (
                <Card key={index} className="border-l-4 border-orange-400">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-lg mb-2">{path.title}</h4>
                    <p className="text-gray-600 mb-2">{path.description}</p>
                    <p className="text-sm text-orange-700">
                      <strong>Consider if:</strong> {path.reason}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Final Actions */}
              <Card className="bg-blue-50 border-2 border-blue-200">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold mb-4">Ready to Start Your Journey?</h3>
          <p className="text-gray-600 mb-6">
            Based on your assessment, you now have a clear roadmap for your career development.
          </p>
          <div className="flex justify-center gap-4">
            <Button onClick={restartAssessment} variant="outline">
              Retake Assessment
            </Button>
            <Button className="px-8">
              Download Your Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrev}>
          ← Back to Recommendations
        </Button>
        <Button onClick={restartAssessment} className="px-8">
          Start New Assessment
        </Button>
      </div>
    </div>
  );
};

export default CareerGuidance;
