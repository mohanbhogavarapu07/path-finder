import { AssessmentSection } from '@/types/assessment';

export const assessmentSections: AssessmentSection[] = [
  {
    id: 'psychometric',
    title: 'Psychological Fit',
    description: 'Evaluate your personality, motivation, and mindset alignment',
    icon: 'brain',
    questions: [
      {
        id: 'psych_1',
        type: 'likert',
        category: 'psychometric',
        subcategory: 'interest',
        question: 'I enjoy building data pipelines and working with large datasets.',
        minValue: 1,
        maxValue: 5,
        minLabel: 'Strongly Disagree',
        maxLabel: 'Strongly Agree'
      },
      {
        id: 'psych_2',
        type: 'likert',
        category: 'psychometric',
        subcategory: 'personality',
        question: 'I prefer structure and well-defined processes over ambiguous situations.',
        minValue: 1,
        maxValue: 5,
        minLabel: 'Strongly Disagree',
        maxLabel: 'Strongly Agree'
      },
      {
        id: 'psych_3',
        type: 'slider',
        category: 'psychometric',
        subcategory: 'cognitive_style',
        question: 'I lean more toward logical/analytical thinking rather than creative exploration.',
        minValue: 0,
        maxValue: 100,
        minLabel: 'Creative',
        maxLabel: 'Analytical'
      },
      {
        id: 'psych_4',
        type: 'likert',
        category: 'psychometric',
        subcategory: 'motivation',
        question: 'I am motivated to learn new technologies to advance my career prospects.',
        minValue: 1,
        maxValue: 5,
        minLabel: 'Not Important',
        maxLabel: 'Very Important'
      },
      {
        id: 'psych_5',
        type: 'likert',
        category: 'psychometric',
        subcategory: 'grit',
        question: 'I finish what I start, even when projects become challenging.',
        minValue: 1,
        maxValue: 5,
        minLabel: 'Rarely',
        maxLabel: 'Always'
      },
      {
        id: 'psych_6',
        type: 'likert',
        category: 'psychometric',
        subcategory: 'growth_mindset',
        question: 'I believe that mistakes and failures help me grow and improve.',
        minValue: 1,
        maxValue: 5,
        minLabel: 'Strongly Disagree',
        maxLabel: 'Strongly Agree'
      },
      {
        id: 'psych_7',
        type: 'likert',
        category: 'psychometric',
        subcategory: 'detail_orientation',
        question: 'I pay close attention to data quality and accuracy in my work.',
        minValue: 1,
        maxValue: 5,
        minLabel: 'Not Important',
        maxLabel: 'Critical'
      }
    ]
  },
  {
    id: 'technical',
    title: 'Technical Aptitude',
    description: 'Test your logical reasoning and technical knowledge',
    icon: 'code',
    questions: [
      {
        id: 'tech_1',
        type: 'multiple-choice',
        category: 'technical',
        subcategory: 'sql_knowledge',
        question: 'What does the following SQL query accomplish? SELECT COUNT(DISTINCT customer_id) FROM orders WHERE order_date >= \'2023-01-01\'',
        options: [
          'Counts all orders from 2023',
          'Counts unique customers who placed orders in 2023',
          'Counts the total revenue from 2023',
          'Counts all customer IDs in the database'
        ]
      },
      {
        id: 'tech_2',
        type: 'multiple-choice',
        category: 'technical',
        subcategory: 'cloud_basics',
        question: 'Which of the following best describes the main advantage of cloud data warehouses over traditional on-premises solutions?',
        options: [
          'They are always cheaper to operate',
          'They provide elastic scaling and pay-per-use pricing',
          'They only work with specific database vendors',
          'They require no maintenance or administration'
        ]
      },
      {
        id: 'tech_3',
        type: 'multiple-choice',
        category: 'technical',
        subcategory: 'data_modeling',
        question: 'In a star schema design, what is the primary purpose of dimension tables?',
        options: [
          'Store transactional data and metrics',
          'Provide descriptive attributes for analysis',
          'Handle data transformations',
          'Manage user permissions'
        ]
      },
      {
        id: 'tech_4',
        type: 'multiple-choice',
        category: 'technical',
        subcategory: 'snowflake_specific',
        question: 'What is a virtual warehouse in Snowflake?',
        options: [
          'A physical storage location for data',
          'A compute cluster that processes queries',
          'A data backup mechanism',
          'A user interface for data visualization'
        ]
      },
      {
        id: 'tech_5',
        type: 'multiple-choice',
        category: 'technical',
        subcategory: 'snowflake_specific',
        question: 'What is Snowflake\'s Time Travel feature primarily used for?',
        options: [
          'Scheduling future data loads',
          'Accessing historical data and recovering from changes',
          'Optimizing query performance',
          'Managing user access controls'
        ]
      },
      {
        id: 'tech_6',
        type: 'multiple-choice',
        category: 'technical',
        subcategory: 'logical_reasoning',
        question: 'If Database A processes 1000 queries per hour and Database B processes 750 queries per hour, how many more queries does Database A process in 8 hours?',
        options: [
          '250 queries',
          '2000 queries',
          '2750 queries',
          '8000 queries'
        ]
      },
      {
        id: 'tech_7',
        type: 'multiple-choice',
        category: 'technical',
        subcategory: 'snowflake_specific',
        question: 'What data format does Snowflake use to handle semi-structured data like JSON?',
        options: [
          'VARCHAR',
          'VARIANT',
          'OBJECT',
          'ARRAY'
        ]
      }
    ]
  },
  {
    id: 'wiscar',
    title: 'FB6 Index Analysis',
    description: 'Comprehensive evaluation across six key dimensions',
    icon: 'radar',
    questions: [
      {
        id: 'wiscar_w1',
        type: 'likert',
        category: 'wiscar',
        subcategory: 'will',
        question: 'I have strong determination to master new technical skills, even when the learning curve is steep.',
        minValue: 1,
        maxValue: 5,
        minLabel: 'Not Like Me',
        maxLabel: 'Very Like Me'
      },
      {
        id: 'wiscar_w2',
        type: 'likert',
        category: 'wiscar',
        subcategory: 'will',
        question: 'I am willing to invest significant time and effort to become proficient in data technologies.',
        minValue: 1,
        maxValue: 5,
        minLabel: 'Unlikely',
        maxLabel: 'Very Likely'
      },
      {
        id: 'wiscar_i1',
        type: 'likert',
        category: 'wiscar',
        subcategory: 'interest',
        question: 'I find data engineering and pipeline optimization genuinely exciting and engaging.',
        minValue: 1,
        maxValue: 5,
        minLabel: 'Not at All',
        maxLabel: 'Extremely'
      },
      {
        id: 'wiscar_i2',
        type: 'scenario',
        category: 'wiscar',
        subcategory: 'interest',
        question: 'When faced with a slow-performing data query, I would most likely:',
        options: [
          'Accept the performance and work around it',
          'Ask someone else to optimize it',
          'Investigate and learn how to improve it myself',
          'Switch to a different approach entirely'
        ]
      },
      {
        id: 'wiscar_s1',
        type: 'likert',
        category: 'wiscar',
        subcategory: 'skill',
        question: 'Rate your current proficiency with SQL and database concepts.',
        minValue: 1,
        maxValue: 5,
        minLabel: 'Beginner',
        maxLabel: 'Expert'
      },
      {
        id: 'wiscar_s2',
        type: 'likert',
        category: 'wiscar',
        subcategory: 'skill',
        question: 'Rate your understanding of cloud computing platforms and services.',
        minValue: 1,
        maxValue: 5,
        minLabel: 'No Experience',
        maxLabel: 'Very Experienced'
      },
      {
        id: 'wiscar_c1',
        type: 'multiple-choice',
        category: 'wiscar',
        subcategory: 'cognitive',
        question: 'You need to design a data warehouse schema. Which approach would you take first?',
        options: [
          'Copy an existing schema from online',
          'Start building tables without planning',
          'Analyze business requirements and design accordingly',
          'Use a pre-built template regardless of needs'
        ]
      },
      {
        id: 'wiscar_c2',
        type: 'multiple-choice',
        category: 'wiscar',
        subcategory: 'cognitive',
        question: 'When debugging a complex data pipeline issue, what\'s your preferred approach?',
        options: [
          'Try random solutions until something works',
          'Ask for help immediately',
          'Systematically isolate and test each component',
          'Restart the entire pipeline'
        ]
      },
      {
        id: 'wiscar_a1',
        type: 'likert',
        category: 'wiscar',
        subcategory: 'ability_to_learn',
        question: 'I actively seek out new learning resources and stay updated with technology trends.',
        minValue: 1,
        maxValue: 5,
        minLabel: 'Never',
        maxLabel: 'Always'
      },
      {
        id: 'wiscar_a2',
        type: 'likert',
        category: 'wiscar',
        subcategory: 'ability_to_learn',
        question: 'When I encounter unfamiliar technical concepts, I research and experiment until I understand them.',
        minValue: 1,
        maxValue: 5,
        minLabel: 'Rarely',
        maxLabel: 'Always'
      },
      {
        id: 'wiscar_r1',
        type: 'scenario',
        category: 'wiscar',
        subcategory: 'real_world_alignment',
        question: 'A stakeholder requests a complex data analysis with a tight deadline. How would you approach this?',
        options: [
          'Tell them it\'s impossible and reject the request',
          'Rush through it without considering data quality',
          'Negotiate timeline while ensuring accuracy and reliability',
          'Delegate it to someone else'
        ]
      },
      {
        id: 'wiscar_r2',
        type: 'likert',
        category: 'wiscar',
        subcategory: 'real_world_alignment',
        question: 'I understand how data engineering work contributes to business objectives and decision-making.',
        minValue: 1,
        maxValue: 5,
        minLabel: 'No Understanding',
        maxLabel: 'Clear Understanding'
      }
    ]
  }
];

export const getQuestionsBySection = (sectionId: string) => {
  return assessmentSections.find(section => section.id === sectionId)?.questions || [];
};

export const getAllQuestions = () => {
  return assessmentSections.flatMap(section => section.questions);
};

export const getTotalQuestions = () => {
  return getAllQuestions().length;
};