import { Question } from "@/types/assessment";

export const psychologicalQuestions: Question[] = [
  // Interest Scale
  {
    id: "interest-1",
    text: "I'm excited by the idea of building tools that generate creative output.",
    type: "likert",
    category: "interest",
    subcategory: "creative-motivation"
  },
  {
    id: "interest-2", 
    text: "I've played with tools like ChatGPT, Midjourney, or GitHub Copilot.",
    type: "likert",
    category: "interest",
    subcategory: "exposure"
  },
  {
    id: "interest-3",
    text: "I find myself imagining new applications for AI in creative fields.",
    type: "likert",
    category: "interest",
    subcategory: "innovation-thinking"
  },
  {
    id: "interest-4",
    text: "The intersection of technology and creativity fascinates me.",
    type: "likert",
    category: "interest",
    subcategory: "interdisciplinary"
  },

  // Personality Compatibility (Big 5 + traits)
  {
    id: "personality-1",
    text: "I enjoy exploring new ideas and approaches, even if they might not work.",
    type: "likert",
    category: "personality",
    subcategory: "openness"
  },
  {
    id: "personality-2",
    text: "I can work effectively even when the outcome is uncertain.",
    type: "likert",
    category: "personality",
    subcategory: "ambiguity-tolerance"
  },
  {
    id: "personality-3",
    text: "I tend to be curious about how things work behind the scenes.",
    type: "likert",
    category: "personality",
    subcategory: "curiosity"
  },
  {
    id: "personality-4",
    text: "I can adapt quickly when priorities or requirements change.",
    type: "likert",
    category: "personality",
    subcategory: "adaptability"
  },
  {
    id: "personality-5",
    text: "I enjoy collaborating with people from different backgrounds.",
    type: "likert",
    category: "personality",
    subcategory: "collaboration"
  },

  // Cognitive Style & Work Preferences
  {
    id: "cognitive-1",
    text: "I enjoy open-ended problem-solving more than routine tasks.",
    type: "likert",
    category: "cognitive",
    subcategory: "problem-solving-style"
  },
  {
    id: "cognitive-2",
    text: "I'm energized by rapid experimentation and iteration.",
    type: "likert",
    category: "cognitive",
    subcategory: "experimentation"
  },
  {
    id: "cognitive-3",
    text: "I prefer working on projects that blend logic and creativity.",
    type: "likert",
    category: "cognitive",
    subcategory: "hybrid-thinking"
  },
  {
    id: "cognitive-4",
    text: "I can think abstractly about complex systems and relationships.",
    type: "likert",
    category: "cognitive",
    subcategory: "abstract-thinking"
  },

  // Motivation Type
  {
    id: "motivation-1",
    text: "Creating something novel and useful is more important to me than following trends.",
    type: "likert",
    category: "motivation",
    subcategory: "intrinsic"
  },
  {
    id: "motivation-2",
    text: "I'm motivated by the potential to solve real-world problems.",
    type: "likert",
    category: "motivation",
    subcategory: "impact-driven"
  },
  {
    id: "motivation-3",
    text: "I want to work in Gen AI primarily because it's a growing field.",
    type: "likert",
    category: "motivation",
    subcategory: "external"
  }
];

export const technicalQuestions: Question[] = [
  // General Aptitude
  {
    id: "aptitude-1",
    text: "If pattern A transforms to pattern B, and pattern C follows the same rule, what would pattern D look like?",
    type: "multiple-choice",
    options: ["Option A", "Option B", "Option C", "Option D"],
    category: "aptitude",
    subcategory: "pattern-recognition"
  },
  {
    id: "aptitude-2",
    text: "In a vector space, if you have vectors [1,2] and [3,4], what is their dot product?",
    type: "multiple-choice",
    options: ["5", "7", "11", "14"],
    category: "aptitude",
    subcategory: "mathematical-reasoning"
  },
  {
    id: "aptitude-3",
    text: "You have a dataset where 70% of outcomes are positive. If you randomly sample 100 cases, what's the expected number of positive outcomes?",
    type: "multiple-choice",
    options: ["30", "50", "70", "100"],
    category: "aptitude",
    subcategory: "probability"
  },

  // Prerequisite Knowledge
  {
    id: "prereq-1",
    text: "What is the primary purpose of a neural network activation function?",
    type: "multiple-choice",
    options: [
      "To store data",
      "To introduce non-linearity", 
      "To reduce overfitting",
      "To increase training speed"
    ],
    category: "prerequisites",
    subcategory: "ml-fundamentals"
  },
  {
    id: "prereq-2",
    text: "In Python, which library is most commonly used for numerical operations and matrix manipulations?",
    type: "multiple-choice",
    options: ["Pandas", "NumPy", "Matplotlib", "Scikit-learn"],
    category: "prerequisites",
    subcategory: "python"
  },
  {
    id: "prereq-3",
    text: "What is the difference between supervised and unsupervised learning?",
    type: "multiple-choice",
    options: [
      "Supervised uses more data",
      "Supervised has labeled training data, unsupervised doesn't",
      "Unsupervised is more accurate",
      "There is no difference"
    ],
    category: "prerequisites",
    subcategory: "ml-concepts"
  },

  // Gen AI-Specific
  {
    id: "genai-1",
    text: "What is the key architectural innovation that enables transformer models like GPT?",
    type: "multiple-choice",
    options: [
      "Convolutional layers",
      "Attention mechanisms",
      "Recurrent connections", 
      "Pooling layers"
    ],
    category: "genai",
    subcategory: "architecture"
  },
  {
    id: "genai-2",
    text: "In prompt engineering, what does 'few-shot learning' refer to?",
    type: "multiple-choice",
    options: [
      "Training with small datasets",
      "Providing examples in the prompt",
      "Using short prompts",
      "Fine-tuning with minimal data"
    ],
    category: "genai",
    subcategory: "prompting"
  },
  {
    id: "genai-3",
    text: "Which of these is NOT a common application of diffusion models?",
    type: "multiple-choice",
    options: [
      "Image generation",
      "Text classification",
      "Audio synthesis",
      "Video generation"
    ],
    category: "genai",
    subcategory: "diffusion"
  }
];

export const wiscarQuestions: Question[] = [
  // Will (Grit/Perseverance)
  {
    id: "will-1",
    text: "I persist even when technical work gets complex and frustrating.",
    type: "likert",
    category: "will",
    subcategory: "persistence"
  },
  {
    id: "will-2",
    text: "I'm willing to spend months learning something difficult if it interests me.",
    type: "likert",
    category: "will",
    subcategory: "long-term-commitment"
  },
  {
    id: "will-3",
    text: "When I encounter setbacks, I usually bounce back quickly.",
    type: "likert",
    category: "will",
    subcategory: "resilience"
  },

  // Interest
  {
    id: "interest-deep-1",
    text: "I want to explore AI that writes stories, generates code, or creates art.",
    type: "likert",
    category: "interest",
    subcategory: "authentic-interest"
  },
  {
    id: "interest-deep-2",
    text: "I'm genuinely curious about how language models understand and generate text.",
    type: "likert",
    category: "interest",
    subcategory: "technical-curiosity"
  },

  // Skill (Current Competence)
  {
    id: "skill-1",
    text: "Rate your current ability to work with machine learning models (1=Beginner, 5=Expert):",
    type: "likert",
    category: "skill",
    subcategory: "ml-experience"
  },
  {
    id: "skill-2",
    text: "How comfortable are you with Python programming?",
    type: "likert",
    category: "skill",
    subcategory: "programming"
  },
  {
    id: "skill-3",
    text: "Rate your experience with APIs and cloud platforms:",
    type: "likert",
    category: "skill",
    subcategory: "technical-infrastructure"
  },

  // Cognitive Readiness
  {
    id: "cognitive-readiness-1",
    text: "I can easily work with abstract concepts and mathematical relationships.",
    type: "likert",
    category: "cognitive",
    subcategory: "abstract-reasoning"
  },
  {
    id: "cognitive-readiness-2",
    text: "I'm comfortable dealing with uncertainty and probabilistic thinking.",
    type: "likert",
    category: "cognitive",
    subcategory: "uncertainty-tolerance"
  },

  // Ability to Learn
  {
    id: "ability-learn-1",
    text: "I see failure as part of the learning process.",
    type: "likert",
    category: "ability",
    subcategory: "growth-mindset"
  },
  {
    id: "ability-learn-2",
    text: "I actively seek feedback to improve my work.",
    type: "likert",
    category: "ability",
    subcategory: "feedback-openness"
  },

  // Real-World Alignment
  {
    id: "real-world-1",
    text: "Scenario: You must fine-tune a model for a poetry app. How do you feel about this?",
    type: "multiple-choice",
    options: [
      "Very excited - this combines creativity and technology perfectly",
      "Interested - it sounds like a good learning opportunity", 
      "Neutral - it's work that needs to be done",
      "Concerned - I prefer more structured technical problems"
    ],
    category: "real-world",
    subcategory: "scenario-alignment"
  }
];

export const likertOptions = [
  "Strongly Disagree",
  "Disagree", 
  "Neutral",
  "Agree",
  "Strongly Agree"
];