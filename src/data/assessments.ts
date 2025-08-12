import {
    ArrowRight,
    ArrowRightLeft,
    Award,
    BarChart,
    BookOpen,
    Bot,
    Brain,
    Brush,
    Code,
    Cog,
    Compass,
    DollarSign,
    Globe,
    GraduationCap,
    Heart,
    Lightbulb,
    Monitor,
    Shield,
    Palette,
    Plane,
    Rocket,
    Search,
    Target,
    TrendingUp,
    Users,
    Wrench,
    Cloud
  } from 'lucide-react';
  
  export interface Assessment {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    duration: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    userCount: string;
    tags: string[];
    category: string;
    comingSoon?: boolean;
    gradient: string;
    featured?: boolean;
  }
  
  export const assessments: Assessment[] = [
    // Cloud (7 assessments)
    {
      id: 'aws',
      title: 'AWS',
      description: 'Assess your readiness and skills for Amazon Web Services cloud roles.',
      icon: Cloud,
      duration: '10-15 mins',
      difficulty: 'Intermediate',
      userCount: '5K+',
      tags: ['Cloud', 'AWS', 'DevOps'],
      category: 'Cloud',
      gradient: 'from-primary to-accent',
      featured: true
    },
    {
      id: 'google-cloud-platform',
      title: 'Google Cloud Platform',
      description: 'Evaluate your knowledge and skills for Google Cloud Platform careers.',
      icon: Cloud,
      duration: '10-15 mins',
      difficulty: 'Intermediate',
      userCount: '4K+',
      tags: ['Cloud', 'GCP', 'DevOps'],
      category: 'Cloud',
      gradient: 'from-coral to-primary'
    },
    {
      id: 'oracle-cloud',
      title: 'Oracle Cloud',
      description: 'Assess your skills for Oracle Cloud Infrastructure roles.',
      icon: Cloud,
      duration: '10-15 mins',
      difficulty: 'Intermediate',
      userCount: '1K+',
      tags: ['Cloud', 'Oracle', 'DevOps'],
      category: 'Cloud',
      gradient: 'from-primary to-coral'
    },
    {
      id: 'devops',
      title: 'DevOps',
      description: 'Test your DevOps skills and cloud automation knowledge.',
      icon: Wrench,
      duration: '10-15 mins',
      difficulty: 'Intermediate',
      userCount: '5K+',
      tags: ['DevOps', 'Cloud', 'Automation'],
      category: 'Cloud',
      gradient: 'from-primary to-accent'
    },
    {
      id: 'multi-cloud-engineer',
      title: 'Multi Cloud Engineer',
      description: 'Evaluate your ability to work across multiple cloud platforms.',
      icon: Cloud,
      duration: '12-15 mins',
      difficulty: 'Advanced',
      userCount: '3K+',
      tags: ['Cloud', 'Multi Cloud', 'DevOps'],
      category: 'Cloud',
      gradient: 'from-accent to-primary'
    },
    {
      id: 'microsoft-365',
      title: 'Microsoft 365',
      description: 'Assess your skills in Microsoft 365 applications and administration.',
      icon: Cloud,
      duration: '10-15 mins',
      difficulty: 'Intermediate',
      userCount: '2K+',
      tags: ['Microsoft 365', 'Office 365', 'Productivity'],
      category: 'Cloud',
      gradient: 'from-accent to-primary'
    },

    // Data (3 assessments)
    {
      id: 'snowflake',
      title: 'Snowflake',
      description: 'Test your expertise in Snowflake data warehousing and analytics.',
      icon: BarChart,
      duration: '10-15 mins',
      difficulty: 'Intermediate',
      userCount: '2K+',
      tags: ['Data', 'Snowflake', 'Analytics'],
      category: 'Data',
      gradient: 'from-accent to-primary'
    },
    {
      id: 'data-science',
      title: 'Data Science',
      description: 'Assess your readiness for data science roles and projects.',
      icon: BarChart,
      duration: '12-15 mins',
      difficulty: 'Advanced',
      userCount: '8K+',
      tags: ['Data Science', 'Analytics', 'ML'],
      category: 'Data',
      gradient: 'from-primary to-accent',
      featured: true
    },
    {
      id: 'powerbi-tableau',
      title: 'Power BI & Tableau',
      description: 'Test your knowledge of Power BI and Tableau data visualization tools.',
      icon: BarChart,
      duration: '10-15 mins',
      difficulty: 'Intermediate',
      userCount: '3K+',
      tags: ['Power BI', 'Tableau', 'Data Visualization'],
      category: 'Data',
      gradient: 'from-primary to-accent'
    },

    // Technology (5 assessments)
    {
      id: 'blockchain',
      title: 'Blockchain',
      description: 'Evaluate your understanding of blockchain technology and applications.',
      icon: Cog,
      duration: '10-15 mins',
      difficulty: 'Advanced',
      userCount: '3K+',
      tags: ['Blockchain', 'Crypto', 'Technology'],
      category: 'Technology',
      gradient: 'from-coral to-primary'
    },
    {
      id: 'ai-ml',
      title: 'AI/ML',
      description: 'Test your knowledge in artificial intelligence and machine learning.',
      icon: Bot,
      duration: '12-15 mins',
      difficulty: 'Advanced',
      userCount: '7K+',
      tags: ['AI', 'ML', 'Technology'],
      category: 'Technology',
      gradient: 'from-accent to-primary'
    },
    {
      id: 'gen-ai',
      title: 'Gen AI',
      description: 'Assess your understanding of generative AI concepts and tools.',
      icon: Bot,
      duration: '10-15 mins',
      difficulty: 'Advanced',
      userCount: '2K+',
      tags: ['AI', 'Generative AI', 'Technology'],
      category: 'Technology',
      gradient: 'from-coral to-primary'
    },
    {
      id: 'cyber-security',
      title: 'Cyber Security',
      description: 'Evaluate your knowledge of cybersecurity principles and practices.',
      icon: Shield,
      duration: '12-15 mins',
      difficulty: 'Advanced',
      userCount: '6K+',
      tags: ['Cyber Security', 'IT Security', 'Technology'],
      category: 'Technology',
      gradient: 'from-primary to-accent'
    },
    {
      id: 'ethical-hacking',
      title: 'Ethical Hacking',
      description: 'Assess your skills in ethical hacking and penetration testing.',
      icon: Shield,
      duration: '12-15 mins',
      difficulty: 'Advanced',
      userCount: '3K+',
      tags: ['Ethical Hacking', 'Security', 'Penetration Testing'],
      category: 'Technology',
      gradient: 'from-accent to-primary'
    },

    // Programming (8 assessments)
    {
      id: 'python-data-analytics',
      title: 'Python with Data Analytics',
      description: 'Evaluate your skills in Python programming and data analytics.',
      icon: Code,
      duration: '10-15 mins',
      difficulty: 'Intermediate',
      userCount: '6K+',
      tags: ['Python', 'Data Analytics', 'Programming'],
      category: 'Programming',
      gradient: 'from-primary to-coral'
    },
    {
      id: 'full-stack-python',
      title: 'Full Stack Python',
      description: 'Evaluate your skills in full stack Python development.',
      icon: Code,
      duration: '12-15 mins',
      difficulty: 'Advanced',
      userCount: '5K+',
      tags: ['Python', 'Full Stack', 'Web Development'],
      category: 'Programming',
      gradient: 'from-coral to-primary'
    },
    {
      id: 'full-stack-java',
      title: 'Full Stack JAVA',
      description: 'Test your expertise in full stack Java development.',
      icon: Code,
      duration: '12-15 mins',
      difficulty: 'Advanced',
      userCount: '5K+',
      tags: ['Java', 'Full Stack', 'Web Development'],
      category: 'Programming',
      gradient: 'from-primary to-accent'
    },
    {
      id: 'full-stack-dotnet',
      title: 'Full Stack Dot Net',
      description: 'Assess your skills in full stack .NET development.',
      icon: Code,
      duration: '12-15 mins',
      difficulty: 'Advanced',
      userCount: '3K+',
      tags: ['.NET', 'Full Stack', 'Web Development'],
      category: 'Programming',
      gradient: 'from-accent to-primary'
    },
    {
      id: 'mern-stack',
      title: 'MERN Stack',
      description: 'Test your knowledge of MongoDB, Express, React, and Node.js.',
      icon: Code,
      duration: '12-15 mins',
      difficulty: 'Advanced',
      userCount: '4K+',
      tags: ['MERN', 'Full Stack', 'Web Development'],
      category: 'Programming',
      gradient: 'from-primary to-coral'
    },
    {
      id: 'react-js',
      title: 'React JS',
      description: 'Evaluate your skills in React.js front-end development.',
      icon: Monitor,
      duration: '10-15 mins',
      difficulty: 'Intermediate',
      userCount: '6K+',
      tags: ['React', 'JavaScript', 'Front End'],
      category: 'Programming',
      gradient: 'from-coral to-primary'
    },
    {
      id: 'flutter',
      title: 'Flutter',
      description: 'Assess your skills in Flutter mobile app development.',
      icon: Monitor,
      duration: '10-15 mins',
      difficulty: 'Intermediate',
      userCount: '4K+',
      tags: ['Flutter', 'Mobile', 'App Development'],
      category: 'Programming',
      gradient: 'from-accent to-primary'
    },

    // Management (1 assessment)
    {
      id: 'scrum-master',
      title: 'Scrum Master',
      description: 'Assess your knowledge of Scrum and agile project management.',
      icon: Users,
      duration: '8-12 mins',
      difficulty: 'Intermediate',
      userCount: '4K+',
      tags: ['Scrum', 'Agile', 'Project Management'],
      category: 'Management',
      gradient: 'from-primary to-coral'
    },

    // Business (2 assessments)
    {
      id: 'business-analyst',
      title: 'Business Analyst',
      description: 'Test your skills in business analysis and requirements gathering.',
      icon: BarChart,
      duration: '10-15 mins',
      difficulty: 'Intermediate',
      userCount: '5K+',
      tags: ['Business Analysis', 'Requirements', 'Strategy'],
      category: 'Business',
      gradient: 'from-coral to-primary'
    },
    {
      id: 'digital-marketing',
      title: 'Digital Marketing',
      description: 'Evaluate your skills in digital marketing and online strategy.',
      icon: TrendingUp,
      duration: '10-15 mins',
      difficulty: 'Intermediate',
      userCount: '5K+',
      tags: ['Digital Marketing', 'SEO', 'Online Strategy'],
      category: 'Business',
      gradient: 'from-coral to-primary'
    },

    // Medical (1 assessment)
    {
      id: 'medical-coding',
      title: 'Medical Coding',
      description: 'Test your knowledge of medical coding standards and practices.',
      icon: Heart,
      duration: '10-15 mins',
      difficulty: 'Intermediate',
      userCount: '2K+',
      tags: ['Medical Coding', 'Healthcare', 'Compliance'],
      category: 'Medical',
      gradient: 'from-primary to-coral'
    },

    // Platform (1 assessment)
    {
      id: 'servicenow',
      title: 'ServiceNow',
      description: 'Assess your skills in ServiceNow platform administration and development.',
      icon: Cog,
      duration: '10-15 mins',
      difficulty: 'Intermediate',
      userCount: '3K+',
      tags: ['ServiceNow', 'ITSM', 'Platform Development'],
      category: 'Platform',
      gradient: 'from-primary to-accent'
    }
  ];
  
  export const getFeaturedAssessments = (): Assessment[] => {
    return assessments.filter(assessment => assessment.featured);
  };

export const assessmentCategories = Array.from(new Set(assessments.map(a => a.category)));

