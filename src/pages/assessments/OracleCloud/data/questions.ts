import { Question } from "@/components/QuestionCard";

export const psychologicalQuestions: Question[] = [
  // Interest Scale
  {
    id: "interest_1",
    text: "Managing enterprise-scale cloud systems interests me.",
    type: "scale",
    scaleRange: [1, 5],
    scaleLabels: ["Strongly Disagree", "Strongly Agree"]
  },
  {
    id: "interest_2",
    text: "I'm drawn to platform-level infrastructure work.",
    type: "scale",
    scaleRange: [1, 5],
    scaleLabels: ["Strongly Disagree", "Strongly Agree"]
  },
  {
    id: "interest_3",
    text: "I find database administration and optimization engaging.",
    type: "scale",
    scaleRange: [1, 5],
    scaleLabels: ["Strongly Disagree", "Strongly Agree"]
  },
  {
    id: "interest_4",
    text: "Working with compliance and security frameworks appeals to me.",
    type: "scale",
    scaleRange: [1, 5],
    scaleLabels: ["Strongly Disagree", "Strongly Agree"]
  },
  {
    id: "interest_5",
    text: "I enjoy solving complex enterprise architecture problems.",
    type: "scale",
    scaleRange: [1, 5],
    scaleLabels: ["Strongly Disagree", "Strongly Agree"]
  },
  
  // Personality Compatibility
  {
    id: "personality_1",
    text: "I prefer structured, well-documented processes over ad-hoc solutions.",
    type: "scale",
    scaleRange: [1, 5],
    scaleLabels: ["Strongly Disagree", "Strongly Agree"]
  },
  {
    id: "personality_2",
    text: "I thrive in environments with clear compliance requirements.",
    type: "scale",
    scaleRange: [1, 5],
    scaleLabels: ["Strongly Disagree", "Strongly Agree"]
  },
  {
    id: "personality_3",
    text: "I pay close attention to details and rarely make careless mistakes.",
    type: "scale",
    scaleRange: [1, 5],
    scaleLabels: ["Strongly Disagree", "Strongly Agree"]
  },
  {
    id: "personality_4",
    text: "I'm comfortable working with complex, enterprise-level systems.",
    type: "scale",
    scaleRange: [1, 5],
    scaleLabels: ["Strongly Disagree", "Strongly Agree"]
  },
  {
    id: "personality_5",
    text: "I prefer stability and reliability over cutting-edge innovation.",
    type: "scale",
    scaleRange: [1, 5],
    scaleLabels: ["Strongly Disagree", "Strongly Agree"]
  },
  
  // Cognitive Style
  {
    id: "cognitive_1",
    text: "I prefer systematic, step-by-step approaches to problem-solving.",
    type: "scale",
    scaleRange: [1, 5],
    scaleLabels: ["Strongly Disagree", "Strongly Agree"]
  },
  {
    id: "cognitive_2",
    text: "I think in terms of systems and how components interact.",
    type: "scale",
    scaleRange: [1, 5],
    scaleLabels: ["Strongly Disagree", "Strongly Agree"]
  },
  {
    id: "cognitive_3",
    text: "I prefer planned, structured work over creative, open-ended tasks.",
    type: "scale",
    scaleRange: [1, 5],
    scaleLabels: ["Strongly Disagree", "Strongly Agree"]
  },
  {
    id: "cognitive_4",
    text: "I excel at understanding complex architectural diagrams and documentation.",
    type: "scale",
    scaleRange: [1, 5],
    scaleLabels: ["Strongly Disagree", "Strongly Agree"]
  },
  
  // Motivation
  {
    id: "motivation_1",
    text: "What motivates you most about learning Oracle Cloud?",
    type: "choice",
    options: [
      "Job security and stable career prospects",
      "Mastering complex enterprise systems",
      "Working with mission-critical infrastructure",
      "Obtaining industry certifications",
      "High earning potential"
    ]
  },
  {
    id: "motivation_2",
    text: "I'm motivated by the opportunity to manage systems that businesses depend on.",
    type: "scale",
    scaleRange: [1, 5],
    scaleLabels: ["Strongly Disagree", "Strongly Agree"]
  },
  {
    id: "motivation_3",
    text: "I find satisfaction in ensuring system reliability and uptime.",
    type: "scale",
    scaleRange: [1, 5],
    scaleLabels: ["Strongly Disagree", "Strongly Agree"]
  },
  {
    id: "motivation_4",
    text: "I'm driven by the challenge of optimizing performance and efficiency.",
    type: "scale",
    scaleRange: [1, 5],
    scaleLabels: ["Strongly Disagree", "Strongly Agree"]
  }
];

export const technicalQuestions: Question[] = [
  // General Aptitude
  {
    id: "aptitude_1",
    text: "If System A depends on System B, and System B is temporarily unavailable, what's the best approach?",
    type: "choice",
    options: [
      "Implement a fallback mechanism or queue",
      "Restart System A immediately",
      "Wait for System B to come back online",
      "Bypass the dependency completely"
    ]
  },
  {
    id: "aptitude_2",
    text: "You need to process 1 million records daily. The current system handles 100,000. What's your approach?",
    type: "choice",
    options: [
      "Scale horizontally by adding more processing nodes",
      "Upgrade to a single more powerful machine",
      "Process records in smaller batches throughout the day",
      "Reduce the number of records processed"
    ]
  },
  {
    id: "aptitude_3",
    text: "Which of these best describes a database index?",
    type: "choice",
    options: [
      "A data structure that improves query performance",
      "A backup copy of the database",
      "A security mechanism for data protection",
      "A tool for data compression"
    ]
  },
  {
    id: "aptitude_4",
    text: "In a three-tier architecture, which tier handles business logic?",
    type: "choice",
    options: [
      "Presentation tier",
      "Application/Logic tier",
      "Data tier",
      "All tiers equally"
    ]
  },
  
  // Prerequisite Knowledge
  {
    id: "prereq_1",
    text: "What does CIDR notation 192.168.1.0/24 represent?",
    type: "choice",
    options: [
      "A network with 256 possible IP addresses",
      "A single IP address",
      "A subnet mask of 255.255.255.0",
      "Both A and C are correct"
    ]
  },
  {
    id: "prereq_2",
    text: "Which SQL statement would you use to retrieve unique values from a column?",
    type: "choice",
    options: [
      "SELECT DISTINCT column_name FROM table",
      "SELECT UNIQUE column_name FROM table",
      "SELECT column_name UNIQUE FROM table",
      "SELECT column_name FROM table UNIQUE"
    ]
  },
  {
    id: "prereq_3",
    text: "What is the purpose of a foreign key in a relational database?",
    type: "choice",
    options: [
      "To establish relationships between tables",
      "To encrypt sensitive data",
      "To improve query performance",
      "To create unique identifiers"
    ]
  },
  {
    id: "prereq_4",
    text: "In bash scripting, what does the command 'chmod +x script.sh' do?",
    type: "choice",
    options: [
      "Makes the script executable",
      "Copies the script to another location",
      "Deletes the script",
      "Edits the script content"
    ]
  },
  
  // Oracle Cloud Domain
  {
    id: "oci_1",
    text: "Which Oracle Cloud service provides managed Kubernetes?",
    type: "choice",
    options: [
      "Oracle Container Engine for Kubernetes (OKE)",
      "Oracle Compute Cloud Service",
      "Oracle Functions",
      "Oracle API Gateway"
    ]
  },
  {
    id: "oci_2",
    text: "What is Oracle Autonomous Database primarily designed for?",
    type: "choice",
    options: [
      "Self-managing, self-securing, and self-repairing database operations",
      "Manual database administration tasks",
      "Only data warehousing workloads",
      "Small-scale development projects"
    ]
  },
  {
    id: "oci_3",
    text: "In Oracle Cloud Infrastructure, what is a compartment?",
    type: "choice",
    options: [
      "A logical container for organizing cloud resources",
      "A physical data center location",
      "A type of virtual machine",
      "A network security group"
    ]
  },
  {
    id: "oci_4",
    text: "Which Oracle Cloud service is used for serverless computing?",
    type: "choice",
    options: [
      "Oracle Functions",
      "Oracle Compute",
      "Oracle Container Engine",
      "Oracle Load Balancer"
    ]
  },
  
  // DevOps/Infrastructure-as-Code
  {
    id: "devops_1",
    text: "What is the primary purpose of Terraform?",
    type: "choice",
    options: [
      "Infrastructure as Code - defining and provisioning infrastructure",
      "Application deployment and monitoring",
      "Database administration",
      "Network security management"
    ]
  },
  {
    id: "devops_2",
    text: "In a CI/CD pipeline, what does 'CI' stand for?",
    type: "choice",
    options: [
      "Continuous Integration",
      "Code Implementation",
      "Container Infrastructure",
      "Cloud Integration"
    ]
  },
  {
    id: "devops_3",
    text: "Which practice best describes Infrastructure as Code?",
    type: "choice",
    options: [
      "Managing infrastructure through code and version control",
      "Writing application code for infrastructure teams",
      "Manually configuring servers through GUI interfaces",
      "Using spreadsheets to track infrastructure changes"
    ]
  },
  {
    id: "devops_4",
    text: "What is the benefit of using Oracle Cloud DevOps service?",
    type: "choice",
    options: [
      "Automated build, test, and deployment pipelines",
      "Manual code review processes",
      "Infrastructure monitoring only",
      "Database backup services"
    ]
  }
];

export const wiscarQuestions: Question[] = [
  // Will (Grit + Motivation)
  {
    id: "will_1",
    text: "I consistently work through complex technical challenges, even when they take weeks to resolve.",
    type: "scale",
    scaleRange: [1, 5],
    scaleLabels: ["Strongly Disagree", "Strongly Agree"]
  },
  {
    id: "will_2",
    text: "I have a track record of completing long-term learning projects.",
    type: "scale",
    scaleRange: [1, 5],
    scaleLabels: ["Strongly Disagree", "Strongly Agree"]
  },
  {
    id: "will_3",
    text: "When learning new technology, I prefer to master it thoroughly rather than just learning the basics.",
    type: "scale",
    scaleRange: [1, 5],
    scaleLabels: ["Strongly Disagree", "Strongly Agree"]
  },
  
  // Interest
  {
    id: "interest_overall",
    text: "How interested are you in enterprise cloud architecture and infrastructure?",
    type: "scale",
    scaleRange: [1, 5],
    scaleLabels: ["Not at all interested", "Extremely interested"]
  },
  {
    id: "interest_database",
    text: "Working with database systems and SQL optimization excites me.",
    type: "scale",
    scaleRange: [1, 5],
    scaleLabels: ["Strongly Disagree", "Strongly Agree"]
  },
  
  // Skill (Current Technical Level)
  {
    id: "skill_scripting",
    text: "How would you rate your current scripting ability (Bash, Python, etc.)?",
    type: "scale",
    scaleRange: [1, 5],
    scaleLabels: ["Beginner", "Expert"]
  },
  {
    id: "skill_cloud",
    text: "How familiar are you with cloud computing concepts?",
    type: "scale",
    scaleRange: [1, 5],
    scaleLabels: ["No experience", "Very experienced"]
  },
  {
    id: "skill_database",
    text: "How comfortable are you with SQL and database concepts?",
    type: "scale",
    scaleRange: [1, 5],
    scaleLabels: ["Beginner", "Expert"]
  },
  
  // Cognitive (Logic and System Thinking)
  {
    id: "cognitive_systems",
    text: "I can easily understand how different system components interact and affect each other.",
    type: "scale",
    scaleRange: [1, 5],
    scaleLabels: ["Strongly Disagree", "Strongly Agree"]
  },
  {
    id: "cognitive_troubleshoot",
    text: "When systems fail, I can systematically narrow down the root cause.",
    type: "scale",
    scaleRange: [1, 5],
    scaleLabels: ["Strongly Disagree", "Strongly Agree"]
  },
  
  // Ability to Learn
  {
    id: "ability_feedback",
    text: "I actively seek feedback and use it to improve my technical skills.",
    type: "scale",
    scaleRange: [1, 5],
    scaleLabels: ["Strongly Disagree", "Strongly Agree"]
  },
  {
    id: "ability_adapt",
    text: "I adapt quickly when new versions or updates change how systems work.",
    type: "scale",
    scaleRange: [1, 5],
    scaleLabels: ["Strongly Disagree", "Strongly Agree"]
  },
  
  // Real-world Fit
  {
    id: "real_world_1",
    text: "Your company needs to migrate a critical business application to Oracle Cloud. What's your first step?",
    type: "choice",
    options: [
      "Assess current architecture and dependencies",
      "Immediately start moving data to the cloud",
      "Train the entire team on Oracle Cloud first",
      "Purchase all necessary Oracle Cloud services"
    ]
  },
  {
    id: "real_world_2",
    text: "You're responsible for ensuring 99.9% uptime for a business-critical Oracle database. How do you approach this?",
    type: "choice",
    options: [
      "Implement automated backups, monitoring, and failover procedures",
      "Manually check the system every hour",
      "Keep multiple backup administrators on call",
      "Rely on Oracle's default configuration"
    ]
  },
  {
    id: "real_world_3",
    text: "A development team wants to deploy applications faster. What Oracle Cloud service would you recommend?",
    type: "choice",
    options: [
      "Oracle Container Engine for Kubernetes with CI/CD pipelines",
      "Manual deployment processes",
      "Traditional virtual machines only",
      "Email-based deployment requests"
    ]
  }
];