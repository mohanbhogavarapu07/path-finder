export const assessmentData = {
  psychological: [
    {
      id: 'interest_1',
      question: 'I\'m excited about building systems that can learn from data.',
      type: 'scale' as const,
      scale: {
        min: 1,
        max: 7,
        labels: ['Strongly Disagree', 'Disagree', 'Somewhat Disagree', 'Neutral', 'Somewhat Agree', 'Agree', 'Strongly Agree']
      }
    },
    {
      id: 'interest_2',
      question: 'I follow the latest developments in AI models and tools like ChatGPT or TensorFlow.',
      type: 'scale' as const,
      scale: {
        min: 1,
        max: 7,
        labels: ['Strongly Disagree', 'Disagree', 'Somewhat Disagree', 'Neutral', 'Somewhat Agree', 'Agree', 'Strongly Agree']
      }
    },
    {
      id: 'personality_1',
      question: 'I enjoy solving complex problems that require trial and error.',
      type: 'scale' as const,
      scale: {
        min: 1,
        max: 7,
        labels: ['Strongly Disagree', 'Disagree', 'Somewhat Disagree', 'Neutral', 'Somewhat Agree', 'Agree', 'Strongly Agree']
      }
    },
    {
      id: 'personality_2',
      question: 'I\'m comfortable working with ambiguous or incomplete information.',
      type: 'scale' as const,
      scale: {
        min: 1,
        max: 7,
        labels: ['Strongly Disagree', 'Disagree', 'Somewhat Disagree', 'Neutral', 'Somewhat Agree', 'Agree', 'Strongly Agree']
      }
    },
    {
      id: 'personality_3',
      question: 'I have strong attention to detail and can spot patterns in data.',
      type: 'scale' as const,
      scale: {
        min: 1,
        max: 7,
        labels: ['Strongly Disagree', 'Disagree', 'Somewhat Disagree', 'Neutral', 'Somewhat Agree', 'Agree', 'Strongly Agree']
      }
    },
    {
      id: 'cognitive_1',
      question: 'I prefer structured learning with clear milestones over free exploration.',
      type: 'scale' as const,
      scale: {
        min: 1,
        max: 7,
        labels: ['Strongly Disagree', 'Disagree', 'Somewhat Disagree', 'Neutral', 'Somewhat Agree', 'Agree', 'Strongly Agree']
      }
    },
    {
      id: 'grit_1',
      question: 'I have overcome setbacks to conquer an important challenge.',
      type: 'scale' as const,
      scale: {
        min: 1,
        max: 7,
        labels: ['Strongly Disagree', 'Disagree', 'Somewhat Disagree', 'Neutral', 'Somewhat Agree', 'Agree', 'Strongly Agree']
      }
    }
  ],
  
  technical: [
    {
      id: 'math_1',
      question: 'What is the result of multiplying two matrices A (2x3) and B (3x2)?',
      type: 'multiple' as const,
      options: [
        'A 2x2 matrix',
        'A 3x3 matrix',
        'A 2x3 matrix',
        'Cannot be multiplied'
      ]
    },
    {
      id: 'math_2',
      question: 'What does it mean when we say two events are independent in probability?',
      type: 'multiple' as const,
      options: [
        'The occurrence of one event affects the probability of the other',
        'The occurrence of one event does not affect the probability of the other',
        'Both events have equal probability',
        'Both events cannot occur at the same time'
      ]
    },
    {
      id: 'programming_1',
      question: 'In Python, what data structure would you use to store key-value pairs?',
      type: 'multiple' as const,
      options: [
        'List',
        'Tuple',
        'Dictionary',
        'Set'
      ]
    },
    {
      id: 'programming_2',
      question: 'What is the purpose of a "for" loop in programming?',
      type: 'multiple' as const,
      options: [
        'To make decisions based on conditions',
        'To repeat a block of code a specific number of times',
        'To define a function',
        'To handle errors'
      ]
    },
    {
      id: 'ml_1',
      question: 'What is the main difference between supervised and unsupervised learning?',
      type: 'multiple' as const,
      options: [
        'Supervised learning uses labeled data, unsupervised learning uses unlabeled data',
        'Supervised learning is faster than unsupervised learning',
        'Supervised learning uses more data than unsupervised learning',
        'There is no difference between them'
      ]
    },
    {
      id: 'ml_2',
      question: 'What does "overfitting" mean in machine learning?',
      type: 'multiple' as const,
      options: [
        'The model performs well on training data but poorly on new data',
        'The model performs poorly on both training and test data',
        'The model takes too long to train',
        'The model uses too much memory'
      ]
    },
    {
      id: 'ml_3',
      question: 'Which metric would you use to evaluate a classification model?',
      type: 'multiple' as const,
      options: [
        'Mean Squared Error',
        'Accuracy',
        'R-squared',
        'Mean Absolute Error'
      ]
    },
    {
      id: 'logic_1',
      question: 'If all roses are flowers, and some flowers are red, can we conclude that some roses are red?',
      type: 'boolean' as const
    }
  ],
  
  wiscar: [
    {
      id: 'will_1',
      question: 'I am willing to spend 2-3 hours daily for the next 6 months learning AI/ML.',
      type: 'scale' as const,
      scale: {
        min: 1,
        max: 7,
        labels: ['Strongly Disagree', 'Disagree', 'Somewhat Disagree', 'Neutral', 'Somewhat Agree', 'Agree', 'Strongly Agree']
      }
    },
    {
      id: 'will_2',
      question: 'I have consistently pursued long-term goals that required months or years of effort.',
      type: 'scale' as const,
      scale: {
        min: 1,
        max: 7,
        labels: ['Strongly Disagree', 'Disagree', 'Somewhat Disagree', 'Neutral', 'Somewhat Agree', 'Agree', 'Strongly Agree']
      }
    },
    {
      id: 'interest_3',
      question: 'I would choose to read about AI/ML developments in my free time.',
      type: 'scale' as const,
      scale: {
        min: 1,
        max: 7,
        labels: ['Strongly Disagree', 'Disagree', 'Somewhat Disagree', 'Neutral', 'Somewhat Agree', 'Agree', 'Strongly Agree']
      }
    },
    {
      id: 'skill_1',
      question: 'Rate your current Python programming skills.',
      type: 'scale' as const,
      scale: {
        min: 1,
        max: 7,
        labels: ['Beginner', 'Novice', 'Basic', 'Intermediate', 'Advanced', 'Expert', 'Master']
      }
    },
    {
      id: 'cognitive_2',
      question: 'I can break down complex problems into smaller, manageable parts.',
      type: 'scale' as const,
      scale: {
        min: 1,
        max: 7,
        labels: ['Strongly Disagree', 'Disagree', 'Somewhat Disagree', 'Neutral', 'Somewhat Agree', 'Agree', 'Strongly Agree']
      }
    },
    {
      id: 'ability_1',
      question: 'I actively seek feedback to improve my performance.',
      type: 'scale' as const,
      scale: {
        min: 1,
        max: 7,
        labels: ['Strongly Disagree', 'Disagree', 'Somewhat Disagree', 'Neutral', 'Somewhat Agree', 'Agree', 'Strongly Agree']
      }
    },
    {
      id: 'real_world_1',
      question: 'I would enjoy spending my day analyzing data patterns and building predictive models.',
      type: 'scale' as const,
      scale: {
        min: 1,
        max: 7,
        labels: ['Strongly Disagree', 'Disagree', 'Somewhat Disagree', 'Neutral', 'Somewhat Agree', 'Agree', 'Strongly Agree']
      }
    }
  ],
  
  motivation: [
    {
      id: 'motivation_1',
      question: 'What primarily motivates you to learn AI/ML?',
      type: 'multiple' as const,
      options: [
        'Intellectual challenge and innovation',
        'High salary potential',
        'Job market demand',
        'Making a positive impact on society',
        'Following current trends'
      ]
    },
    {
      id: 'motivation_2',
      question: 'How important is work-life balance to you?',
      type: 'scale' as const,
      scale: {
        min: 1,
        max: 7,
        labels: ['Not Important', 'Slightly Important', 'Somewhat Important', 'Moderately Important', 'Important', 'Very Important', 'Extremely Important']
      }
    },
    {
      id: 'motivation_3',
      question: 'I am motivated by building things that can solve real-world problems.',
      type: 'scale' as const,
      scale: {
        min: 1,
        max: 7,
        labels: ['Strongly Disagree', 'Disagree', 'Somewhat Disagree', 'Neutral', 'Somewhat Agree', 'Agree', 'Strongly Agree']
      }
    },
    {
      id: 'career_goal_1',
      question: 'What is your primary career goal in the next 5 years?',
      type: 'multiple' as const,
      options: [
        'Become a technical expert in AI/ML',
        'Lead AI/ML teams or projects',
        'Start my own AI/ML company',
        'Apply AI/ML to solve specific industry problems',
        'Teach or research AI/ML in academia'
      ]
    }
  ],
  
  preferences: [
    {
      id: 'learning_1',
      question: 'What is your preferred learning style?',
      type: 'multiple' as const,
      options: [
        'Hands-on projects and coding',
        'Theoretical study and research papers',
        'Video tutorials and online courses',
        'Mentorship and pair programming',
        'Self-directed exploration'
      ]
    },
    {
      id: 'learning_2',
      question: 'How do you prefer to tackle new challenges?',
      type: 'multiple' as const,
      options: [
        'Jump in and learn by doing',
        'Study the theory first, then apply',
        'Find examples and adapt them',
        'Ask for help and guidance',
        'Break it down into smaller steps'
      ]
    },
    {
      id: 'collaboration_1',
      question: 'Do you prefer working alone or in teams?',
      type: 'scale' as const,
      scale: {
        min: 1,
        max: 7,
        labels: ['Strongly Alone', 'Mostly Alone', 'Somewhat Alone', 'Neutral', 'Somewhat Team', 'Mostly Team', 'Strongly Team']
      }
    },
    {
      id: 'environment_1',
      question: 'Which work environment appeals to you most?',
      type: 'multiple' as const,
      options: [
        'Fast-paced startup with cutting-edge projects',
        'Established tech company with structured processes',
        'Research institution or university',
        'Consulting firm working with various clients',
        'Government or non-profit organization'
      ]
    }
  ]
};