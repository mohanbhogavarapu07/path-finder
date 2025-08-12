import { Question } from "@/components/assessment/AssessmentQuestion";

export const assessmentQuestions: Question[] = [
  // Psychological Fit - Interest Scale
  {
    id: "interest_1",
    type: "scale",
    category: "interest",
    question: "I enjoy automating repetitive tasks with scripts.",
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: "Strongly Disagree", max: "Strongly Agree" },
    weight: 1.2
  },
  {
    id: "interest_2",
    type: "scale",
    category: "interest",
    question: "I'm curious about how code gets deployed in real-world systems.",
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: "Strongly Disagree", max: "Strongly Agree" },
    weight: 1.0
  },
  {
    id: "interest_3",
    type: "scale",
    category: "interest",
    question: "I find satisfaction in optimizing processes and workflows.",
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: "Strongly Disagree", max: "Strongly Agree" },
    weight: 1.1
  },
  {
    id: "interest_4",
    type: "scale",
    category: "interest",
    question: "I enjoy learning about new tools and technologies.",
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: "Strongly Disagree", max: "Strongly Agree" },
    weight: 1.0
  },

  // Psychological Fit - Personality Compatibility
  {
    id: "personality_1",
    type: "multiple-choice",
    category: "personality",
    question: "When working on a complex problem, I prefer to:",
    options: [
      { value: "systematic", label: "Break it down into systematic steps and follow a structured approach" },
      { value: "creative", label: "Brainstorm creative solutions and try different approaches" },
      { value: "collaborative", label: "Discuss with others and gather different perspectives" },
      { value: "research", label: "Research best practices and established methodologies" }
    ],
    weight: 1.1
  },
  {
    id: "personality_2",
    type: "multiple-choice",
    category: "personality",
    question: "In a team environment, I typically:",
    options: [
      { value: "organizer", label: "Organize tasks and ensure processes are followed" },
      { value: "innovator", label: "Suggest new ideas and improvements" },
      { value: "facilitator", label: "Help team members collaborate effectively" },
      { value: "executor", label: "Focus on completing tasks efficiently" }
    ],
    weight: 1.0
  },
  {
    id: "personality_3",
    type: "scale",
    category: "personality",
    question: "I remain calm and focused when systems are failing or under pressure.",
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: "Strongly Disagree", max: "Strongly Agree" },
    weight: 1.3
  },

  // Cognitive Style & Preferences
  {
    id: "cognitive_1",
    type: "multiple-choice",
    category: "cognitive",
    question: "I learn best through:",
    options: [
      { value: "hands-on", label: "Hands-on experimentation and practice" },
      { value: "reading", label: "Reading documentation and tutorials" },
      { value: "courses", label: "Structured courses and guided learning" },
      { value: "mentoring", label: "Working with experienced mentors" }
    ],
    weight: 1.0
  },
  {
    id: "cognitive_2",
    type: "multiple-choice",
    category: "cognitive",
    question: "When solving problems, I prefer to:",
    options: [
      { value: "logical", label: "Follow logical, step-by-step reasoning" },
      { value: "intuitive", label: "Rely on intuition and past experience" },
      { value: "experimental", label: "Try different approaches and see what works" },
      { value: "research", label: "Research similar problems and solutions" }
    ],
    weight: 1.1
  },

  // Motivation
  {
    id: "motivation_1",
    type: "multiple-choice",
    category: "motivation",
    question: "What motivates you most in your career?",
    options: [
      { value: "growth", label: "Continuous learning and skill development" },
      { value: "impact", label: "Making a meaningful impact on projects" },
      { value: "autonomy", label: "Having independence and control over my work" },
      { value: "stability", label: "Job security and steady income" }
    ],
    weight: 1.2
  },
  {
    id: "motivation_2",
    type: "scale",
    category: "motivation",
    question: "I'm willing to invest significant time learning new technologies and tools.",
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: "Strongly Disagree", max: "Strongly Agree" },
    weight: 1.1
  },

  // Technical Aptitude - General Aptitude
  {
    id: "aptitude_1",
    type: "multiple-choice",
    category: "aptitude",
    question: "If A > B and B > C, and C > D, which statement is true?",
    options: [
      { value: "a>d", label: "A > D" },
      { value: "d>a", label: "D > A" },
      { value: "a=d", label: "A = D" },
      { value: "unknown", label: "Cannot be determined" }
    ],
    weight: 1.0
  },
  {
    id: "aptitude_2",
    type: "multiple-choice",
    category: "aptitude",
    question: "What comes next in this sequence: 2, 4, 8, 16, ?",
    options: [
      { value: "24", label: "24" },
      { value: "32", label: "32" },
      { value: "20", label: "20" },
      { value: "18", label: "18" }
    ],
    weight: 1.0
  },

  // Technical Knowledge Check
  {
    id: "technical_1",
    type: "multiple-choice",
    category: "technical",
    question: "Which command is used to check running processes in Linux?",
    options: [
      { value: "ps", label: "ps" },
      { value: "ls", label: "ls" },
      { value: "cd", label: "cd" },
      { value: "grep", label: "grep" }
    ],
    weight: 1.1
  },
  {
    id: "technical_2",
    type: "multiple-choice",
    category: "technical",
    question: "What is the purpose of a CI/CD pipeline?",
    options: [
      { value: "automate", label: "Automate the build, test, and deployment process" },
      { value: "monitor", label: "Monitor system performance and logs" },
      { value: "backup", label: "Create backups of source code" },
      { value: "security", label: "Implement security scanning only" }
    ],
    weight: 1.3
  },
  {
    id: "technical_3",
    type: "multiple-choice",
    category: "technical",
    question: "Docker is primarily used for:",
    options: [
      { value: "containerization", label: "Containerizing applications for consistent deployment" },
      { value: "database", label: "Managing databases exclusively" },
      { value: "networking", label: "Network configuration only" },
      { value: "monitoring", label: "System monitoring and alerting" }
    ],
    weight: 1.2
  },
  {
    id: "technical_4",
    type: "multiple-choice",
    category: "technical",
    question: "Infrastructure as Code (IaC) means:",
    options: [
      { value: "code-defined", label: "Defining infrastructure using code and configuration files" },
      { value: "manual", label: "Manually configuring servers through GUI interfaces" },
      { value: "hardware", label: "Physical hardware configuration only" },
      { value: "database", label: "Database schema definition only" }
    ],
    weight: 1.2
  },

  // Scenario-based Questions
  {
    id: "scenario_1",
    type: "scenario",
    category: "technical",
    question: "How would you approach this situation?",
    scenario: "A deployment to production failed, and users are experiencing downtime. The development team needs to understand what went wrong.",
    options: [
      { value: "rollback", label: "Immediately rollback to the previous working version" },
      { value: "investigate", label: "Investigate logs first, then decide on rollback or fix" },
      { value: "contact", label: "Contact the development team for immediate fix" },
      { value: "wait", label: "Wait for the system to auto-recover" }
    ],
    weight: 1.4
  },
  {
    id: "scenario_2",
    type: "scenario",
    category: "technical",
    question: "What would be your primary concern?",
    scenario: "You need to set up monitoring for a new microservices application with 10 different services.",
    options: [
      { value: "comprehensive", label: "Ensure comprehensive monitoring across all services and their interactions" },
      { value: "basic", label: "Set up basic uptime monitoring for each service" },
      { value: "performance", label: "Focus only on performance metrics" },
      { value: "errors", label: "Monitor only for errors and exceptions" }
    ],
    weight: 1.3
  }
];

export const sectionInfo = {
  psychological: {
    title: "Psychological Fit",
    description: "Evaluating your personality traits, interests, and motivations for DevOps",
    questions: assessmentQuestions.filter(q => ['interest', 'personality', 'cognitive', 'motivation'].includes(q.category))
  },
  technical: {
    title: "Technical Aptitude",
    description: "Assessing your technical knowledge and problem-solving abilities",
    questions: assessmentQuestions.filter(q => ['aptitude', 'technical'].includes(q.category))
  }
};