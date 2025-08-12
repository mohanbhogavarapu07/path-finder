import { Question } from "@/components/assessment/AssessmentQuestion";

export const psychometricQuestions: Question[] = [
  {
    id: "psych_1",
    type: "scale",
    question: "I'm curious about how companies use data to make decisions.",
    description: "Rate your level of agreement with this statement."
  },
  {
    id: "psych_2", 
    type: "scale",
    question: "I enjoy working with spreadsheets or numbers.",
    description: "Consider your natural preference for numerical work."
  },
  {
    id: "psych_3",
    type: "radio",
    question: "When faced with a complex problem, what's your typical approach?",
    options: [
      "Break it down into smaller, manageable parts",
      "Look for patterns or similar problems I've solved before", 
      "Seek input from others before proceeding",
      "Try different solutions until something works",
      "Research extensively before taking action"
    ]
  },
  {
    id: "psych_4",
    type: "scale", 
    question: "I prefer structured, organized work environments over flexible, unstructured ones.",
    description: "Think about your ideal working conditions."
  },
  {
    id: "psych_5",
    type: "radio",
    question: "What motivates you most in your work?",
    options: [
      "Solving challenging problems",
      "Creating something new and innovative",
      "Helping others achieve their goals",
      "Advancing my career and earning potential", 
      "Gaining expertise and mastery in my field"
    ]
  },
  {
    id: "psych_6",
    type: "scale",
    question: "I'm comfortable with repetitive tasks if they serve a larger purpose.",
    description: "Data work often involves repetitive analysis and cleaning."
  },
  {
    id: "psych_7",
    type: "scale",
    question: "I enjoy telling stories or presenting insights to others.",
    description: "Data analysts frequently present findings to stakeholders."
  },
  {
    id: "psych_8",
    type: "radio",
    question: "How do you handle feedback on your work?",
    options: [
      "I actively seek it out to improve",
      "I appreciate it when it's constructive",
      "I prefer to figure things out independently",
      "I find it helpful but sometimes overwhelming",
      "I use it to validate my approach"
    ]
  }
];

export const technicalQuestions: Question[] = [
  {
    id: "tech_1",
    type: "radio",
    question: "What is the average of these numbers: 10, 15, 20, 25, 30?",
    options: ["15", "18", "20", "22", "25"]
  },
  {
    id: "tech_2",
    type: "radio", 
    question: "In Python, which of these is the correct way to create a list?",
    options: [
      "list = [1, 2, 3, 4]",
      "list = (1, 2, 3, 4)", 
      "list = {1, 2, 3, 4}",
      "list = <1, 2, 3, 4>",
      "I'm not familiar with Python syntax"
    ]
  },
  {
    id: "tech_3",
    type: "radio",
    question: "Looking at this data: [5, 10, 15, 100, 20]. Which value is an outlier?",
    options: ["5", "10", "15", "100", "20"]
  },
  {
    id: "tech_4",
    type: "radio",
    question: "What does 'data cleaning' typically involve?",
    options: [
      "Removing duplicate records and fixing errors",
      "Making data look visually appealing", 
      "Encrypting sensitive information",
      "Compressing files to save space",
      "I'm not sure what this means"
    ]
  },
  {
    id: "tech_5",
    type: "radio",
    question: "In a dataset with 1000 rows, if 30% are marked as 'Category A', how many rows is that?",
    options: ["30", "300", "3000", "33", "I need a calculator"]
  },
  {
    id: "tech_6",
    type: "radio",
    question: "Which chart type is best for showing the relationship between two numerical variables?",
    options: [
      "Pie chart",
      "Bar chart", 
      "Scatter plot",
      "Line chart",
      "Histogram"
    ]
  },
  {
    id: "tech_7",
    type: "radio",
    question: "What is the purpose of a 'for loop' in programming?",
    options: [
      "To repeat a set of instructions multiple times",
      "To make decisions based on conditions",
      "To store data permanently",
      "To connect to external databases", 
      "I'm not familiar with programming loops"
    ]
  },
  {
    id: "tech_8",
    type: "radio",
    question: "If a survey has a margin of error of ±3%, what does this mean?",
    options: [
      "3% of respondents didn't answer",
      "The true result could be 3 percentage points higher or lower",
      "3% of the data is incorrect",
      "The survey was conducted 3 times",
      "I'm not sure about statistical concepts"
    ]
  }
];

export const wiscarQuestions: Question[] = [
  {
    id: "wiscar_1",
    type: "scenario",
    question: "You're working on a data analysis project and encounter a complex error that you can't immediately solve. What's your response?",
    scenario: {
      situation: "It's Friday afternoon, you're tired, and this error is blocking your progress on an important project due Monday.",
      options: [
        { text: "Take a break and tackle it fresh on Monday", value: "low_will" },
        { text: "Spend the weekend researching and trying different solutions", value: "high_will" },
        { text: "Ask a colleague for help immediately", value: "medium_will" },
        { text: "Try a few quick fixes, then move to other tasks", value: "low_will" }
      ]
    }
  },
  {
    id: "wiscar_2",
    type: "scale",
    question: "I find myself naturally curious about data patterns and trends in my daily life.",
    description: "For example, noticing patterns in weather, sports statistics, or social media trends."
  },
  {
    id: "wiscar_3",
    type: "radio", 
    question: "How would you rate your current Python programming skills?",
    options: [
      "I can write complex programs with multiple functions and libraries",
      "I can write basic scripts with variables, loops, and simple functions",
      "I understand the concepts but need help with syntax",
      "I've tried a tutorial but struggle with practical application",
      "I have no Python experience"
    ]
  },
  {
    id: "wiscar_4",
    type: "scenario",
    question: "You're presented with a large spreadsheet of sales data and asked to find insights. What's your approach?",
    scenario: {
      situation: "The spreadsheet has 50,000 rows and 20 columns of customer purchase data from the last year.",
      options: [
        { text: "Start by exploring the data structure and looking for patterns", value: "high_cognitive" },
        { text: "Immediately create charts and graphs to visualize everything", value: "medium_cognitive" },
        { text: "Ask for specific questions to answer first", value: "medium_cognitive" },
        { text: "Feel overwhelmed and unsure where to begin", value: "low_cognitive" }
      ]
    }
  },
  {
    id: "wiscar_5",
    type: "scale",
    question: "I actively seek out learning opportunities and enjoy acquiring new technical skills.",
    description: "Think about your approach to professional development and skill building."
  },
  {
    id: "wiscar_6",
    type: "radio",
    question: "In a typical data analyst role, which task would you find most engaging?", 
    options: [
      "Cleaning and organizing messy datasets",
      "Creating visualizations and dashboards",
      "Presenting findings to business stakeholders",
      "Writing code to automate repetitive tasks",
      "Collaborating with teams to solve business problems"
    ]
  }
];

export const sectionConfigs = [
  {
    name: "Psychometric Evaluation",
    description: "Assessing personality traits, interests, and work preferences",
    color: "bg-primary",
    questions: psychometricQuestions
  },
  {
    name: "Technical Aptitude", 
    description: "Evaluating programming concepts, math, statistics, and data analysis skills",
    color: "bg-accent",
    questions: technicalQuestions
  },
  {
    name: "WISCAR Framework",
    description: "Measuring Will, Interest, Skill, Cognitive readiness, Ability, and Real-world fit",
    color: "bg-success", 
    questions: wiscarQuestions
  }
];

// Scoring functions
export const calculatePsychometricScore = (answers: Record<string, any>): number => {
  let score = 0;
  let totalQuestions = 0;

  psychometricQuestions.forEach(question => {
    const answer = answers[question.id];
    if (answer !== undefined) {
      totalQuestions++;
      if (question.type === 'scale') {
        score += (answer / 5) * 20; // Convert 1-5 scale to 0-20 points
      } else if (question.type === 'radio') {
        // Score based on alignment with data analytics mindset
        if (question.id === 'psych_3' && answer === "Break it down into smaller, manageable parts") score += 20;
        else if (question.id === 'psych_5' && (answer.includes('Solving challenging problems') || answer.includes('expertise'))) score += 20;
        else if (question.id === 'psych_8' && answer === "I actively seek it out to improve") score += 20;
        else score += 10; // Partial points for other answers
      }
    }
  });

  return totalQuestions > 0 ? Math.round((score / totalQuestions) * 5) : 0; // Normalize to 0-100
};

export const calculateTechnicalScore = (answers: Record<string, any>): number => {
  let score = 0;
  const correctAnswers = {
    'tech_1': '20',
    'tech_2': 'list = [1, 2, 3, 4]', 
    'tech_3': '100',
    'tech_4': 'Removing duplicate records and fixing errors',
    'tech_5': '300',
    'tech_6': 'Scatter plot',
    'tech_7': 'To repeat a set of instructions multiple times',
    'tech_8': 'The true result could be 3 percentage points higher or lower'
  };

  technicalQuestions.forEach(question => {
    const answer = answers[question.id];
    const correct = correctAnswers[question.id as keyof typeof correctAnswers];
    
    if (answer === correct) {
      score += 12.5; // 100/8 questions = 12.5 points each
    } else if (answer && !answer.includes("not sure") && !answer.includes("not familiar")) {
      score += 6; // Partial credit for attempting
    }
  });

  return Math.round(score);
};

export const calculateWiscarScores = (answers: Record<string, any>) => {
  const wiscar = { W: 0, I: 0, S: 0, C: 0, A: 0, R: 0 };

  // Will (persistence) - based on scenario response and other indicators
  if (answers['wiscar_1'] === 'high_will') wiscar.W += 40;
  else if (answers['wiscar_1'] === 'medium_will') wiscar.W += 25;
  else wiscar.W += 10;

  // Interest - direct measurement
  if (answers['wiscar_2']) wiscar.I = (answers['wiscar_2'] / 5) * 100;

  // Skill - current technical capability
  const skillAnswer = answers['wiscar_3'];
  if (skillAnswer?.includes('complex programs')) wiscar.S = 90;
  else if (skillAnswer?.includes('basic scripts')) wiscar.S = 70;
  else if (skillAnswer?.includes('understand the concepts')) wiscar.S = 50;
  else if (skillAnswer?.includes('tried a tutorial')) wiscar.S = 30;
  else wiscar.S = 10;

  // Cognitive readiness
  if (answers['wiscar_4'] === 'high_cognitive') wiscar.C = 85;
  else if (answers['wiscar_4'] === 'medium_cognitive') wiscar.C = 60;
  else wiscar.C = 30;

  // Ability to learn
  if (answers['wiscar_5']) wiscar.A = (answers['wiscar_5'] / 5) * 100;

  // Real-world fit - based on task preference
  const taskAnswer = answers['wiscar_6'];
  if (taskAnswer) wiscar.R = 75; // Any engagement with typical tasks shows fit
  if (taskAnswer?.includes('Creating visualizations') || taskAnswer?.includes('Presenting findings')) {
    wiscar.R = 85; // Higher fit for communication aspects
  }

  return wiscar;
};

export const generateRecommendation = (
  psychScore: number, 
  techScore: number, 
  wiscarScores: any, 
  overallScore: number
): 'yes' | 'maybe' | 'no' => {
  if (overallScore >= 75) return 'yes';
  if (overallScore >= 50) return 'maybe';
  return 'no';
};

export const generateSkillGaps = (techScore: number, wiscarScores: any) => [
  {
    skill: "Python Basics",
    current: Math.max(20, wiscarScores.S),
    target: 70,
    priority: wiscarScores.S < 50 ? 'high' : 'medium' as 'high' | 'medium' | 'low'
  },
  {
    skill: "Data Cleaning (Pandas)",
    current: Math.max(15, techScore - 20),
    target: 75, 
    priority: 'high' as 'high' | 'medium' | 'low'
  },
  {
    skill: "Data Visualization",
    current: Math.max(25, techScore - 10),
    target: 60,
    priority: 'medium' as 'high' | 'medium' | 'low'
  },
  {
    skill: "Statistics & Analysis",
    current: Math.max(30, techScore),
    target: 70,
    priority: techScore < 60 ? 'high' : 'medium' as 'high' | 'medium' | 'low'
  }
];