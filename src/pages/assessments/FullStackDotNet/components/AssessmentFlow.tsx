
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import AssessmentResults from "./AssessmentResults";

interface Question {
  id: string;
  text: string;
  type: 'likert' | 'multiple-choice' | 'technical';
  options?: string[];
  section: string;
}

interface AssessmentFlowProps {
  onBack: () => void;
}

const AssessmentFlow = ({ onBack }: AssessmentFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showResults, setShowResults] = useState(false);

  const sections = [
    { title: "Introduction", questions: 3 },
    { title: "Psychometric", questions: 15 },
    { title: "Technical & Aptitude", questions: 20 },
    { title: "WISCAR Framework", questions: 18 },
    { title: "Final Assessment", questions: 4 }
  ];

  const questions: Question[] = [
    // Introduction
    {
      id: "intro_1",
      text: "What is your primary motivation for considering Full Stack .NET development?",
      type: "multiple-choice",
      options: [
        "Career advancement and job opportunities",
        "Interest in building enterprise applications",
        "Attracted to Microsoft technology ecosystem",
        "Recommendation from others"
      ],
      section: "Introduction"
    },
    {
      id: "intro_2", 
      text: "How familiar are you with the .NET ecosystem?",
      type: "multiple-choice",
      options: [
        "Complete beginner",
        "Have heard about it but no experience",
        "Some exposure to C# or .NET",
        "Experienced with .NET development"
      ],
      section: "Introduction"
    },
    {
      id: "intro_3",
      text: "What type of applications interest you most?",
      type: "multiple-choice", 
      options: [
        "Web applications and APIs",
        "Desktop applications",
        "Mobile applications",
        "Cloud and enterprise solutions"
      ],
      section: "Introduction"
    },

    // Psychometric
    {
      id: "psych_1",
      text: "I prefer working on stable, long-term systems rather than experimental projects.",
      type: "likert",
      section: "Psychometric"
    },
    {
      id: "psych_2",
      text: "I enjoy debugging backend code as much as designing user interfaces.",
      type: "likert", 
      section: "Psychometric"
    },
    {
      id: "psych_3",
      text: "I am comfortable working within structured development frameworks.",
      type: "likert",
      section: "Psychometric"
    },
    {
      id: "psych_4",
      text: "I prefer detailed documentation and clear guidelines over creative freedom.",
      type: "likert",
      section: "Psychometric"
    },
    {
      id: "psych_5",
      text: "I enjoy solving complex logical problems step by step.",
      type: "likert",
      section: "Psychometric"
    },
    {
      id: "psych_6",
      text: "I am motivated more by building reliable systems than creating artistic designs.",
      type: "likert",
      section: "Psychometric"
    },
    {
      id: "psych_7",
      text: "I can maintain focus on projects that take months to complete.",
      type: "likert",
      section: "Psychometric"
    },
    {
      id: "psych_8",
      text: "I prefer working with established technologies over cutting-edge tools.",
      type: "likert", 
      section: "Psychometric"
    },
    {
      id: "psych_9",
      text: "I find satisfaction in optimizing code performance and architecture.",
      type: "likert",
      section: "Psychometric"
    },
    {
      id: "psych_10",
      text: "I enjoy learning about database design and data relationships.",
      type: "likert",
      section: "Psychometric"
    },
    {
      id: "psych_11",
      text: "I am comfortable with the idea of working in large enterprise environments.",
      type: "likert",
      section: "Psychometric"
    },
    {
      id: "psych_12",
      text: "I prefer collaborative development with clear role definitions.",
      type: "likert",
      section: "Psychometric"
    },
    {
      id: "psych_13",
      text: "I enjoy understanding business requirements and translating them to code.",
      type: "likert",
      section: "Psychometric"
    },
    {
      id: "psych_14",
      text: "I am patient with legacy systems and gradual improvement processes.",
      type: "likert",
      section: "Psychometric"
    },
    {
      id: "psych_15",
      text: "I find security and scalability considerations exciting challenges.",
      type: "likert",
      section: "Psychometric"
    },

    // Technical & Aptitude
    {
      id: "tech_1",
      text: "What is the primary purpose of object-oriented programming?",
      type: "multiple-choice",
      options: [
        "To make code run faster",
        "To organize code into reusable, maintainable units",
        "To reduce file size",
        "To make programming easier for beginners"
      ],
      section: "Technical"
    },
    {
      id: "tech_2",
      text: "In C#, what keyword is used to inherit from a class?",
      type: "multiple-choice",
      options: [
        "extends",
        "inherits", 
        ":",
        "implements"
      ],
      section: "Technical"
    },
    {
      id: "tech_3",
      text: "What does API stand for?",
      type: "multiple-choice",
      options: [
        "Application Programming Interface",
        "Advanced Programming Integration",
        "Automated Program Interaction",
        "Application Process Interface"
      ],
      section: "Technical"
    },
    {
      id: "tech_4",
      text: "What is the purpose of a database index?",
      type: "multiple-choice",
      options: [
        "To store data in alphabetical order",
        "To improve query performance",
        "To backup data automatically",
        "To prevent data corruption"
      ],
      section: "Technical"
    },
    {
      id: "tech_5",
      text: "In MVC architecture, what does the 'C' represent?",
      type: "multiple-choice",
      options: [
        "Component",
        "Controller",
        "Container",
        "Configuration"
      ],
      section: "Technical"
    },
    {
      id: "tech_6",
      text: "What is the difference between GET and POST HTTP methods?",
      type: "multiple-choice",
      options: [
        "GET is faster than POST",
        "GET retrieves data, POST sends data",
        "GET is more secure than POST", 
        "There is no difference"
      ],
      section: "Technical"
    },
    {
      id: "tech_7",
      text: "What is Entity Framework in .NET?",
      type: "multiple-choice",
      options: [
        "A web framework for building UIs",
        "An Object-Relational Mapping (ORM) framework",
        "A testing framework",
        "A deployment tool"
      ],
      section: "Technical"
    },
    {
      id: "tech_8",
      text: "What is the purpose of dependency injection?",
      type: "multiple-choice",
      options: [
        "To inject bugs into code",
        "To manage object dependencies and improve testability",
        "To speed up compilation",
        "To reduce memory usage"
      ],
      section: "Technical"
    },
    {
      id: "tech_9",
      text: "In SQL, which command is used to retrieve data?",
      type: "multiple-choice",
      options: [
        "GET",
        "RETRIEVE",
        "SELECT",
        "FETCH"
      ],
      section: "Technical"
    },
    {
      id: "tech_10",
      text: "What is async/await in C# used for?",
      type: "multiple-choice",
      options: [
        "Error handling",
        "Asynchronous programming",
        "Memory management",
        "Type conversion"
      ],
      section: "Technical"
    },
    {
      id: "tech_11", 
      text: "If you have an array [1, 2, 3, 4, 5], what would be the result of removing the element at index 2?",
      type: "multiple-choice",
      options: [
        "[1, 2, 4, 5]",
        "[1, 3, 4, 5]",
        "[2, 3, 4, 5]",
        "[1, 2, 3, 5]"
      ],
      section: "Technical"
    },
    {
      id: "tech_12",
      text: "What is the time complexity of searching for an element in a sorted array using binary search?",
      type: "multiple-choice",
      options: [
        "O(n)",
        "O(log n)",
        "O(n²)",
        "O(1)"
      ],
      section: "Technical"
    },
    {
      id: "tech_13",
      text: "What does CRUD stand for in database operations?",
      type: "multiple-choice",
      options: [
        "Create, Read, Update, Delete",
        "Copy, Retrieve, Update, Destroy",
        "Create, Retrieve, Upgrade, Delete",
        "Connect, Read, Update, Deploy"
      ],
      section: "Technical"
    },
    {
      id: "tech_14",
      text: "What is the primary benefit of using version control systems like Git?",
      type: "multiple-choice",
      options: [
        "Faster code execution",
        "Better code formatting",
        "Track changes and collaborate",
        "Automatic bug fixing"
      ],
      section: "Technical"
    },
    {
      id: "tech_15",
      text: "In web development, what is CORS?",
      type: "multiple-choice",
      options: [
        "Cross-Origin Resource Sharing",
        "Core Object Rendering System",
        "Common Object Request Specification",
        "Client-Origin Response Standard"
      ],
      section: "Technical"
    },
    {
      id: "tech_16",
      text: "What is the purpose of middleware in ASP.NET Core?",
      type: "multiple-choice",
      options: [
        "To store data",
        "To handle requests and responses in the pipeline",
        "To compile code",
        "To manage memory"
      ],
      section: "Technical"
    },
    {
      id: "tech_17",
      text: "What is JSON?",
      type: "multiple-choice",
      options: [
        "A programming language",
        "A data interchange format",
        "A database system",
        "A web framework"
      ],
      section: "Technical"
    },
    {
      id: "tech_18",
      text: "What is the difference between a class and an interface in C#?",
      type: "multiple-choice",
      options: [
        "Classes are faster than interfaces",
        "Classes can have implementation, interfaces define contracts",
        "Interfaces are deprecated",
        "There is no difference"
      ],
      section: "Technical"
    },
    {
      id: "tech_19",
      text: "What is the purpose of unit testing?",
      type: "multiple-choice",
      options: [
        "To test the entire application",
        "To test individual components in isolation",
        "To test user interface",
        "To test database connections"
      ],
      section: "Technical"
    },
    {
      id: "tech_20",
      text: "What is Azure in the Microsoft ecosystem?",
      type: "multiple-choice",
      options: [
        "A programming language",
        "A cloud computing platform",
        "A database system",
        "An IDE"
      ],
      section: "Technical"
    },

    // WISCAR Framework
    {
      id: "wiscar_will_1",
      text: "I consistently complete programming projects I start, even when they become challenging.",
      type: "likert",
      section: "WISCAR"
    },
    {
      id: "wiscar_will_2",
      text: "I can maintain motivation to learn programming concepts over several months.",
      type: "likert",
      section: "WISCAR"
    },
    {
      id: "wiscar_will_3",
      text: "I prefer to finish what I start rather than jumping to new projects.",
      type: "likert",
      section: "WISCAR"
    },
    {
      id: "wiscar_interest_1",
      text: "I find myself genuinely curious about how software applications work internally.",
      type: "likert",
      section: "WISCAR"
    },
    {
      id: "wiscar_interest_2",
      text: "I enjoy troubleshooting technical problems in my daily life.",
      type: "likert",
      section: "WISCAR"
    },
    {
      id: "wiscar_interest_3",
      text: "I would choose to work on a backend system over a frontend design.",
      type: "multiple-choice",
      options: [
        "Strongly prefer backend",
        "Slightly prefer backend", 
        "No preference",
        "Slightly prefer frontend",
        "Strongly prefer frontend"
      ],
      section: "WISCAR"
    },
    {
      id: "wiscar_skill_1",
      text: "How would you rate your current programming experience?",
      type: "multiple-choice",
      options: [
        "No experience",
        "Basic (can write simple programs)",
        "Intermediate (comfortable with OOP)",
        "Advanced (can build full applications)"
      ],
      section: "WISCAR"
    },
    {
      id: "wiscar_skill_2",
      text: "How comfortable are you with mathematical concepts?",
      type: "multiple-choice",
      options: [
        "Very uncomfortable",
        "Somewhat uncomfortable",
        "Neutral",
        "Comfortable",
        "Very comfortable"
      ],
      section: "WISCAR"
    },
    {
      id: "wiscar_skill_3",
      text: "How familiar are you with databases and SQL?",
      type: "multiple-choice",
      options: [
        "Never used",
        "Basic understanding",
        "Can write simple queries",
        "Comfortable with complex queries"
      ],
      section: "WISCAR"
    },
    {
      id: "wiscar_cognitive_1",
      text: "I can break down complex problems into smaller, manageable parts.",
      type: "likert",
      section: "WISCAR"
    },
    {
      id: "wiscar_cognitive_2",
      text: "I enjoy working with abstract concepts and logical patterns.",
      type: "likert",
      section: "WISCAR"
    },
    {
      id: "wiscar_cognitive_3",
      text: "I can focus on detailed work for extended periods without getting frustrated.",
      type: "likert",
      section: "WISCAR"
    },
    {
      id: "wiscar_ability_1",
      text: "I learn best by experimenting and making mistakes.",
      type: "likert",
      section: "WISCAR"
    },
    {
      id: "wiscar_ability_2",
      text: "I actively seek feedback to improve my skills.",
      type: "likert",
      section: "WISCAR"
    },
    {
      id: "wiscar_ability_3",
      text: "I believe my abilities can be developed through effort and practice.",
      type: "likert",
      section: "WISCAR"
    },
    {
      id: "wiscar_real_1",
      text: "What work environment appeals to you most?",
      type: "multiple-choice",
      options: [
        "Large corporate enterprise",
        "Medium-sized tech company",
        "Small startup",
        "Freelance/consulting"
      ],
      section: "WISCAR"
    },
    {
      id: "wiscar_real_2",
      text: "Which scenario sounds most appealing?",
      type: "multiple-choice",
      options: [
        "Fixing bugs in a financial system",
        "Designing animations for a website",
        "Creating a chatbot flow",
        "Optimizing database performance"
      ],
      section: "WISCAR"
    },
    {
      id: "wiscar_real_3",
      text: "What motivates you most in a career?",
      type: "multiple-choice",
      options: [
        "Job security and stability",
        "High salary potential",
        "Creative expression",
        "Technical mastery",
        "Helping others/impact"
      ],
      section: "WISCAR"
    },

    // Final Assessment
    {
      id: "final_1",
      text: "Based on what you've learned about .NET development, how interested are you in pursuing this path?",
      type: "multiple-choice",
      options: [
        "Very interested - I want to start immediately",
        "Interested - I'd like to learn more first",
        "Somewhat interested - I have some concerns",
        "Not very interested - seems like a poor fit"
      ],
      section: "Final"
    },
    {
      id: "final_2",
      text: "What is your biggest concern about pursuing Full Stack .NET development?",
      type: "multiple-choice",
      options: [
        "Time commitment required",
        "Technical complexity",
        "Job market uncertainty",
        "Lack of creativity",
        "No major concerns"
      ],
      section: "Final"
    },
    {
      id: "final_3",
      text: "How much time can you realistically dedicate to learning .NET development per week?",
      type: "multiple-choice",
      options: [
        "Less than 5 hours",
        "5-10 hours",
        "10-20 hours", 
        "More than 20 hours"
      ],
      section: "Final"
    },
    {
      id: "final_4",
      text: "What is your target timeline for becoming job-ready as a .NET developer?",
      type: "multiple-choice",
      options: [
        "3-6 months",
        "6-12 months",
        "1-2 years",
        "No specific timeline"
      ],
      section: "Final"
    }
  ];

  const currentQuestion = questions[currentStep];
  const currentSectionIndex = sections.findIndex(section => 
    section.title === currentQuestion?.section || 
    (currentQuestion?.section === "Technical" && section.title === "Technical & Aptitude") ||
    (currentQuestion?.section === "WISCAR" && section.title === "WISCAR Framework") ||
    (currentQuestion?.section === "Final" && section.title === "Final Assessment")
  );

  const totalQuestions = questions.length;
  const progress = ((currentStep + 1) / totalQuestions) * 100;

  const handleAnswer = (value: any) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isAnswered = currentQuestion && answers[currentQuestion.id] !== undefined;

  if (showResults) {
    return <AssessmentResults answers={answers} onRestart={() => {
      setCurrentStep(0);
      setAnswers({});
      setShowResults(false);
    }} />;
  }

  if (!currentQuestion) {
    return <div>Assessment completed!</div>;
  }

  const renderLikertScale = () => {
    const options = [
      "Strongly Disagree",
      "Disagree", 
      "Neutral",
      "Agree",
      "Strongly Agree"
    ];

    return (
      <div className="space-y-3">
        {options.map((option, index) => (
          <label key={index} className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name={currentQuestion.id}
              value={index + 1}
              onChange={(e) => handleAnswer(parseInt(e.target.value))}
              checked={answers[currentQuestion.id] === index + 1}
              className="text-blue-600"
            />
            <span className="text-gray-700">{option}</span>
          </label>
        ))}
      </div>
    );
  };

  const renderMultipleChoice = () => {
    return (
      <div className="space-y-3">
        {currentQuestion.options?.map((option, index) => (
          <label key={index} className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name={currentQuestion.id}
              value={option}
              onChange={(e) => handleAnswer(e.target.value)}
              checked={answers[currentQuestion.id] === option}
              className="text-blue-600"
            />
            <span className="text-gray-700">{option}</span>
          </label>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Overview
          </Button>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <Badge variant="outline" className="bg-blue-50">
                {currentSectionIndex >= 0 ? sections[currentSectionIndex].title : currentQuestion.section}
              </Badge>
              <span className="text-sm text-gray-500">
                Question {currentStep + 1} of {totalQuestions}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Question Card */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl leading-relaxed">
              {currentQuestion.text}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentQuestion.type === 'likert' && renderLikertScale()}
            {currentQuestion.type === 'multiple-choice' && renderMultipleChoice()}
            
            <div className="flex justify-between pt-6">
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              
              <Button 
                onClick={handleNext}
                disabled={!isAnswered}
                className={cn(
                  "bg-blue-600 hover:bg-blue-700",
                  isAnswered && "bg-green-600 hover:bg-green-700"
                )}
              >
                {isAnswered && <CheckCircle className="h-4 w-4 mr-2" />}
                {currentStep === questions.length - 1 ? "Complete Assessment" : "Next"}
                {currentStep < questions.length - 1 && <ArrowRight className="h-4 w-4 ml-2" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AssessmentFlow;
