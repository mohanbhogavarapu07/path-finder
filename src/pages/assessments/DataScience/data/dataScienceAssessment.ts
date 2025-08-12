import { Assessment } from '@/types/assessment';

export const dataScienceAssessment: Assessment = {
  id: 'data-science',
  title: 'Should I Learn Data Science?',
  subtitle: 'Discover If You\'re Ready to Explore the World of Data-Driven Decision Making',
  description: 'Take our comprehensive assessment to evaluate your psychological fit, technical readiness, and career alignment for a future in Data Science.',
  duration: '25-30 minutes',
  what_is_description: 'Data science combines programming, statistics, machine learning, and business acumen to derive actionable insights from data.',
  typical_careers: [
    'Data Scientist',
    'Data Analyst', 
    'ML Engineer',
    'Business Intelligence Analyst',
    'Quantitative Analyst',
    'AI Research Assistant'
  ],
  who_should_consider: [
    'Curious problem-solvers',
    'Detail-oriented and logical thinkers',
    'Mathematically inclined learners',
    'People who enjoy finding stories in data',
    'Individuals comfortable with both code and ambiguity'
  ],
  sections: [
    {
      id: 'psychological-fit',
      title: 'Psychological Fit',
      description: 'Evaluate your personality traits and working style compatibility with data science roles',
      icon: 'brain',
      scoreWeight: 25,
      questions: [
        {
          id: 'interest-1',
          type: 'scale',
          question: 'I enjoy solving puzzles, analyzing numbers, and discovering trends.',
          min: 1,
          max: 5,
          category: 'interest',
          weight: 1
        },
        {
          id: 'interest-2', 
          type: 'scale',
          question: 'I find it exciting to explore datasets and look for patterns.',
          min: 1,
          max: 5,
          category: 'interest',
          weight: 1
        },
        {
          id: 'personality-1',
          type: 'scale',
          question: 'I can work on complex problems for hours without getting frustrated.',
          min: 1,
          max: 5,
          category: 'persistence',
          weight: 1
        },
        {
          id: 'personality-2',
          type: 'scale',
          question: 'I prefer structured approaches to problem-solving.',
          min: 1,
          max: 5,
          category: 'structure',
          weight: 1
        },
        {
          id: 'cognitive-1',
          type: 'scale',
          question: 'I enjoy both exploratory analysis and detailed documentation.',
          min: 1,
          max: 5,
          category: 'cognitive-style',
          weight: 1
        },
        {
          id: 'motivation-1',
          type: 'multiple-choice',
          question: 'What primarily motivates you to learn data science?',
          options: [
            { value: '1', label: 'Career advancement and salary potential' },
            { value: '2', label: 'Genuine curiosity about data and insights' },
            { value: '3', label: 'Prestige and recognition in tech' },
            { value: '4', label: 'Making impactful business decisions' },
            { value: '5', label: 'Solving real-world problems with data' }
          ],
          category: 'motivation',
          weight: 1
        }
      ]
    },
    {
      id: 'technical-aptitude',
      title: 'Technical Aptitude',
      description: 'Assess your current technical knowledge and learning readiness',
      icon: 'code',
      scoreWeight: 35,
      questions: [
        {
          id: 'logic-1',
          type: 'multiple-choice',
          question: 'If A > B and B > C, then:',
          options: [
            { value: 'A', label: 'A > C' },
            { value: 'B', label: 'A = C' },
            { value: 'C', label: 'A < C' },
            { value: 'D', label: 'Cannot determine' }
          ],
          category: 'logical-reasoning',
          weight: 1
        },
        {
          id: 'data-interpretation-1',
          type: 'multiple-choice',
          question: 'In a dataset with mean=50 and standard deviation=10, what percentage of data falls within one standard deviation?',
          options: [
            { value: 'A', label: '50%' },
            { value: 'B', label: '68%' },
            { value: 'C', label: '95%' },
            { value: 'D', label: '99%' }
          ],
          category: 'statistics',
          weight: 1
        },
        {
          id: 'programming-1',
          type: 'multiple-choice',
          question: 'What does this Python code do: for i in range(len(data)): print(data[i])',
          options: [
            { value: 'A', label: 'Prints each element in the data list' },
            { value: 'B', label: 'Prints the length of data' },
            { value: 'C', label: 'Creates a new list' },
            { value: 'D', label: 'Sorts the data' }
          ],
          category: 'programming',
          weight: 1
        },
        {
          id: 'math-1',
          type: 'multiple-choice',
          question: 'What is the probability of getting heads twice when flipping a fair coin twice?',
          options: [
            { value: 'A', label: '0.25' },
            { value: 'B', label: '0.5' },
            { value: 'C', label: '0.75' },
            { value: 'D', label: '1.0' }
          ],
          category: 'probability',
          weight: 1
        },
        {
          id: 'data-science-1',
          type: 'multiple-choice',
          question: 'What is the primary purpose of exploratory data analysis (EDA)?',
          options: [
            { value: 'A', label: 'Clean and prepare data' },
            { value: 'B', label: 'Build machine learning models' },
            { value: 'C', label: 'Understand data patterns and relationships' },
            { value: 'D', label: 'Deploy models to production' }
          ],
          category: 'data-science-concepts',
          weight: 1
        },
        {
          id: 'tools-1',
          type: 'scale',
          question: 'How comfortable are you with learning new programming languages and tools?',
          min: 1,
          max: 5,
          category: 'adaptability',
          weight: 1
        }
      ]
    },
    {
      id: 'wiscar-analysis',
      title: 'WISCAR Analysis',
      description: 'Comprehensive evaluation across Will, Interest, Skill, Cognitive readiness, Ability to learn, and Real-world fit',
      icon: 'target',
      scoreWeight: 40,
      questions: [
        {
          id: 'will-1',
          type: 'scale',
          question: 'I persist through challenging problems even when solutions aren\'t immediately obvious.',
          min: 1,
          max: 5,
          category: 'will',
          weight: 1
        },
        {
          id: 'will-2',
          type: 'scale',
          question: 'I\'m willing to invest 6-12 months learning data science fundamentals.',
          min: 1,
          max: 5,
          category: 'will',
          weight: 1
        },
        {
          id: 'interest-3',
          type: 'scale',
          question: 'I actively seek out articles, podcasts, or videos about data and analytics.',
          min: 1,
          max: 5,
          category: 'interest',
          weight: 1
        },
        {
          id: 'skill-1',
          type: 'scale',
          question: 'I have experience with Excel formulas and data manipulation.',
          min: 1,
          max: 5,
          category: 'skill',
          weight: 1
        },
        {
          id: 'skill-2',
          type: 'scale',
          question: 'I understand basic statistical concepts like mean, median, and correlation.',
          min: 1,
          max: 5,
          category: 'skill',
          weight: 1
        },
        {
          id: 'cognitive-2',
          type: 'scale',
          question: 'I can think abstractly about relationships between variables.',
          min: 1,
          max: 5,
          category: 'cognitive',
          weight: 1
        },
        {
          id: 'ability-1',
          type: 'scale',
          question: 'I learn best through hands-on practice and experimentation.',
          min: 1,
          max: 5,
          category: 'ability',
          weight: 1
        },
        {
          id: 'real-world-1',
          type: 'multiple-choice',
          question: 'Which work environment appeals to you most?',
          options: [
            { value: '1', label: 'Collaborative team with regular stakeholder interaction' },
            { value: '2', label: 'Independent work with periodic check-ins' },
            { value: '3', label: 'Research-focused with academic freedom' },
            { value: '4', label: 'Fast-paced with immediate business impact' },
            { value: '5', label: 'Structured corporate environment' }
          ],
          category: 'real-world-fit',
          weight: 1
        }
      ]
    }
  ]
};