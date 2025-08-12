import { AssessmentSection } from "@/types/assessment";

export const assessmentSections: AssessmentSection[] = [
  {
    id: "introduction",
    title: "Test Introduction",
    description: "Understanding Flutter and its career potential",
    questions: [],
    maxScore: 0,
  },
  {
    id: "psychometric",
    title: "Psychometric Assessment",
    description: "Evaluating your personality fit and learning motivation",
    maxScore: 100,
    questions: [
      {
        id: "interest-1",
        question: "How excited do you feel about building apps that work on multiple platforms (mobile, web, desktop)?",
        category: "interest",
        options: [
          { id: "a", text: "Extremely excited - this sounds like exactly what I want to do!", value: 100 },
          { id: "b", text: "Very interested - seems like a valuable skill", value: 75 },
          { id: "c", text: "Somewhat interested - could be useful", value: 50 },
          { id: "d", text: "Mildly interested - not my main focus", value: 25 },
          { id: "e", text: "Not interested - prefer specialized development", value: 0 }
        ]
      },
      {
        id: "personality-1",
        question: "When working on a project, which approach describes you best?",
        category: "personality",
        options: [
          { id: "a", text: "I love iterating and refining until it's perfect", value: 100 },
          { id: "b", text: "I work systematically through requirements", value: 75 },
          { id: "c", text: "I prefer to get something working quickly first", value: 50 },
          { id: "d", text: "I like to plan everything in detail before starting", value: 25 }
        ]
      },
      {
        id: "motivation-1",
        question: "What motivates you most when learning new technology?",
        category: "motivation",
        options: [
          { id: "a", text: "Building things that users will actually use and love", value: 100 },
          { id: "b", text: "Mastering elegant and efficient code", value: 75 },
          { id: "c", text: "Career advancement and better opportunities", value: 50 },
          { id: "d", text: "Staying current with industry trends", value: 25 }
        ]
      },
      {
        id: "working-style-1",
        question: "How do you prefer to approach learning new concepts?",
        category: "working-style",
        options: [
          { id: "a", text: "Hands-on experimentation and building projects", value: 100 },
          { id: "b", text: "Reading documentation and following tutorials", value: 75 },
          { id: "c", text: "Video courses with step-by-step guidance", value: 50 },
          { id: "d", text: "Structured courses with assignments", value: 25 }
        ]
      }
    ]
  },
  {
    id: "technical",
    title: "Technical & Aptitude Assessment",
    description: "Testing your logical reasoning and programming fundamentals",
    maxScore: 100,
    questions: [
      {
        id: "logic-1",
        question: "If you have a mobile app with 3 main screens and each screen can navigate to any other screen, how many possible navigation paths are there?",
        category: "logical-reasoning",
        options: [
          { id: "a", text: "6 paths", value: 100 },
          { id: "b", text: "9 paths", value: 50 },
          { id: "c", text: "3 paths", value: 25 },
          { id: "d", text: "12 paths", value: 0 }
        ]
      },
      {
        id: "programming-1",
        question: "In object-oriented programming, what does 'inheritance' allow you to do?",
        category: "programming",
        options: [
          { id: "a", text: "Create new classes based on existing classes, reusing their properties and methods", value: 100 },
          { id: "b", text: "Share variables between different functions", value: 25 },
          { id: "c", text: "Import external libraries into your code", value: 0 },
          { id: "d", text: "Execute multiple functions at the same time", value: 0 }
        ]
      },
      {
        id: "flutter-concepts-1",
        question: "In Flutter, everything is a 'Widget'. Which statement best describes this concept?",
        category: "flutter-concepts",
        options: [
          { id: "a", text: "Widgets are reusable building blocks that describe the UI structure and behavior", value: 100 },
          { id: "b", text: "Widgets are small applications that run independently", value: 0 },
          { id: "c", text: "Widgets are only used for displaying text and images", value: 25 },
          { id: "d", text: "Widgets are database connections in Flutter", value: 0 }
        ]
      },
      {
        id: "numerical-1",
        question: "If a mobile screen is 400px wide and you want to create 3 equal columns with 10px spacing between them, how wide should each column be?",
        category: "numerical",
        options: [
          { id: "a", text: "120px", value: 100 },
          { id: "b", text: "130px", value: 25 },
          { id: "c", text: "133px", value: 50 },
          { id: "d", text: "110px", value: 0 }
        ]
      }
    ]
  },
  {
    id: "wiscar",
    title: "WISCAR Framework Assessment",
    description: "Multi-dimensional readiness evaluation across 6 key areas",
    maxScore: 100,
    questions: [
      {
        id: "will-1",
        question: "How would you handle spending 2-3 months learning Flutter fundamentals before building your first real app?",
        category: "will",
        options: [
          { id: "a", text: "I'm committed to consistent daily practice and would enjoy the learning journey", value: 100 },
          { id: "b", text: "I'd stick with it as long as I see progress", value: 75 },
          { id: "c", text: "I'd probably need external motivation to stay on track", value: 50 },
          { id: "d", text: "I prefer faster results and might get frustrated", value: 25 }
        ]
      },
      {
        id: "interest-2",
        question: "Which aspect of Flutter development excites you most?",
        category: "interest",
        options: [
          { id: "a", text: "Creating beautiful, responsive user interfaces", value: 100 },
          { id: "b", text: "Building cross-platform apps efficiently", value: 75 },
          { id: "c", text: "Learning Dart programming language", value: 50 },
          { id: "d", text: "The career opportunities it might provide", value: 25 }
        ]
      },
      {
        id: "skill-1",
        question: "How would you rate your current understanding of mobile app development concepts?",
        category: "skill",
        options: [
          { id: "a", text: "Strong - I understand navigation, state management, and app lifecycle", value: 100 },
          { id: "b", text: "Good - I know the basics of how mobile apps work", value: 75 },
          { id: "c", text: "Fair - I've used apps but haven't built them", value: 50 },
          { id: "d", text: "Beginner - This would be completely new to me", value: 25 }
        ]
      },
      {
        id: "cognitive-1",
        question: "How comfortable are you with abstract thinking and mental models?",
        category: "cognitive",
        options: [
          { id: "a", text: "Very comfortable - I enjoy thinking about systems and relationships", value: 100 },
          { id: "b", text: "Comfortable - I can work with concepts once I understand them", value: 75 },
          { id: "c", text: "Somewhat comfortable - I prefer concrete examples", value: 50 },
          { id: "d", text: "I prefer hands-on, practical learning over abstract concepts", value: 25 }
        ]
      },
      {
        id: "ability-1",
        question: "When you encounter a coding error or bug, what's your typical approach?",
        category: "ability",
        options: [
          { id: "a", text: "I systematically debug, research solutions, and learn from the experience", value: 100 },
          { id: "b", text: "I try different solutions and usually figure it out", value: 75 },
          { id: "c", text: "I look for help online or ask others", value: 50 },
          { id: "d", text: "I often get frustrated and might give up temporarily", value: 25 }
        ]
      },
      {
        id: "real-world-1",
        question: "In a Flutter developer role, you'd typically work on UI implementation, state management, API integration, and testing. How does this sound?",
        category: "real-world",
        options: [
          { id: "a", text: "Perfect - this combines creativity with technical problem-solving", value: 100 },
          { id: "b", text: "Good - I'm interested in most of these aspects", value: 75 },
          { id: "c", text: "Okay - some parts sound more interesting than others", value: 50 },
          { id: "d", text: "Uncertain - I'm not sure if this matches my interests", value: 25 }
        ]
      }
    ]
  }
];

export const careerPaths = [
  {
    role: "Flutter Developer",
    description: "Build cross-platform applications using Flutter framework",
    requirements: ["Dart programming", "Flutter widgets", "State management", "API integration"],
    nextSteps: ["Learn Dart basics", "Master Flutter widgets", "Build portfolio projects"]
  },
  {
    role: "Mobile App Developer", 
    description: "Create mobile applications for iOS and Android platforms",
    requirements: ["Mobile development concepts", "UI/UX understanding", "Platform-specific knowledge"],
    nextSteps: ["Choose Flutter or native development", "Learn mobile design patterns", "Study app store guidelines"]
  },
  {
    role: "Cross-platform Engineer",
    description: "Develop applications that work across multiple platforms",
    requirements: ["Cross-platform frameworks", "Platform differences", "Performance optimization"],
    nextSteps: ["Compare frameworks", "Learn platform-specific optimizations", "Build multi-platform portfolio"]
  },
  {
    role: "Frontend Developer",
    description: "Focus on user interface and user experience development",
    requirements: ["UI frameworks", "Responsive design", "User experience principles"],
    nextSteps: ["Master UI development", "Learn design principles", "Build interactive prototypes"]
  }
];