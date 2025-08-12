import { AssessmentSection } from "@/types/assessment";

export const assessmentSections: AssessmentSection[] = [
  {
    id: "psychometric",
    title: "Psychological Fit",
    description: "Evaluate your personality traits and cognitive style for cloud engineering roles",
    duration: "4-5 minutes",
    questions: [
      {
        id: "psych1",
        text: "I find it exciting to build scalable backend systems and infrastructure.",
        type: "scale",
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: { min: "Strongly Disagree", max: "Strongly Agree" }
      },
      {
        id: "psych2",
        text: "I enjoy structured, analytical work over unstructured brainstorming.",
        type: "scale",
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: { min: "Strongly Disagree", max: "Strongly Agree" }
      },
      {
        id: "psych3",
        text: "I prefer problems with logical steps and clear answers.",
        type: "scale",
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: { min: "Strongly Disagree", max: "Strongly Agree" }
      },
      {
        id: "psych4",
        text: "I can stay motivated even when learning gets challenging.",
        type: "scale",
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: { min: "Strongly Disagree", max: "Strongly Agree" }
      },
      {
        id: "psych5",
        text: "I enjoy automating repetitive tasks and optimizing processes.",
        type: "scale",
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: { min: "Strongly Disagree", max: "Strongly Agree" }
      },
      {
        id: "psych6",
        text: "How do you typically approach complex technical problems?",
        type: "multiple-choice",
        options: [
          "Break them down into smaller, manageable parts",
          "Look for similar problems others have solved",
          "Experiment with different approaches until something works",
          "Seek help from colleagues or online communities"
        ]
      },
      {
        id: "psych7",
        text: "I thrive in environments with constant technological change.",
        type: "scale",
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: { min: "Strongly Disagree", max: "Strongly Agree" }
      },
      {
        id: "psych8",
        text: "I pay close attention to details and thoroughly test my work.",
        type: "scale",
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: { min: "Strongly Disagree", max: "Strongly Agree" }
      },
      {
        id: "psych9",
        text: "Which work environment energizes you most?",
        type: "multiple-choice",
        options: [
          "Collaborative team projects with regular communication",
          "Independent work with occasional team check-ins",
          "Mix of both collaborative and independent work",
          "Fast-paced environment with tight deadlines"
        ]
      },
      {
        id: "psych10",
        text: "I enjoy learning new technologies and staying updated with industry trends.",
        type: "scale",
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: { min: "Strongly Disagree", max: "Strongly Agree" }
      }
    ]
  },
  {
    id: "technical",
    title: "Technical Aptitude",
    description: "Assess your technical knowledge and problem-solving abilities",
    duration: "6-8 minutes",
    questions: [
      {
        id: "tech1",
        text: "What does EC2 stand for in AWS?",
        type: "multiple-choice",
        options: [
          "Elastic Compute Cloud",
          "Enhanced Computing Center",
          "Enterprise Cloud Computing",
          "Extended Capacity Control"
        ]
      },
      {
        id: "tech2",
        text: "Which AWS service is primarily used for object storage?",
        type: "multiple-choice",
        options: [
          "EBS (Elastic Block Store)",
          "S3 (Simple Storage Service)",
          "EFS (Elastic File System)",
          "RDS (Relational Database Service)"
        ]
      },
      {
        id: "tech3",
        text: "Rate your comfort level with command line interfaces (CLI):",
        type: "scale",
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: { min: "Complete Beginner", max: "Very Comfortable" }
      },
      {
        id: "tech4",
        text: "What is the primary purpose of IAM in AWS?",
        type: "multiple-choice",
        options: [
          "Identity and Access Management",
          "Infrastructure Automation Management",
          "Internet Application Monitoring",
          "Integrated Analytics Management"
        ]
      },
      {
        id: "tech5",
        text: "Rate your experience with scripting languages (Python, Bash, etc.):",
        type: "scale",
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: { min: "No Experience", max: "Expert Level" }
      },
      {
        id: "tech6",
        text: "Which networking concept is most important for AWS VPC?",
        type: "multiple-choice",
        options: [
          "Subnets and routing tables",
          "DNS resolution only",
          "Physical network cables",
          "Bluetooth connections"
        ]
      },
      {
        id: "tech7",
        text: "Rate your understanding of basic networking concepts (TCP/IP, DNS, etc.):",
        type: "scale",
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: { min: "No Understanding", max: "Strong Understanding" }
      },
      {
        id: "tech8",
        text: "What is the main benefit of AWS Lambda?",
        type: "multiple-choice",
        options: [
          "Serverless code execution",
          "Physical server management",
          "Database administration",
          "Network routing"
        ]
      },
      {
        id: "tech9",
        text: "If an AWS service costs $0.10 per hour and runs 24/7 for a month (30 days), what's the monthly cost?",
        type: "multiple-choice",
        options: [
          "$72",
          "$30",
          "$24",
          "$240"
        ]
      },
      {
        id: "tech10",
        text: "Rate your experience with version control systems (Git, etc.):",
        type: "scale",
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: { min: "No Experience", max: "Advanced User" }
      }
    ]
  },
  {
    id: "wiscar",
    title: "WISCAR Analysis",
    description: "Comprehensive evaluation across six key dimensions",
    duration: "8-10 minutes",
    questions: [
      // Will (Motivation)
      {
        id: "will1",
        text: "Would you persist through complex AWS certification preparation even if it takes 3-6 months?",
        type: "scale",
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: { min: "Definitely Not", max: "Absolutely" }
      },
      {
        id: "will2",
        text: "How important is career advancement to you right now?",
        type: "scale",
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: { min: "Not Important", max: "Extremely Important" }
      },
      // Interest
      {
        id: "interest1",
        text: "Do you regularly read tech blogs, AWS updates, or cloud computing news?",
        type: "scale",
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: { min: "Never", max: "Daily" }
      },
      {
        id: "interest2",
        text: "How excited are you about cloud technology trends?",
        type: "scale",
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: { min: "Not Excited", max: "Very Excited" }
      },
      // Skill
      {
        id: "skill1",
        text: "Have you worked with cloud platforms before?",
        type: "multiple-choice",
        options: [
          "Yes, extensively with AWS or similar platforms",
          "Some experience with cloud services",
          "Basic experience with cloud concepts",
          "No cloud experience"
        ]
      },
      {
        id: "skill2",
        text: "Rate your overall technical skill level:",
        type: "scale",
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: { min: "Beginner", max: "Expert" }
      },
      // Cognitive Readiness
      {
        id: "cognitive1",
        text: "When faced with a system outage, what's your first approach?",
        type: "multiple-choice",
        options: [
          "Check logs and monitoring dashboards systematically",
          "Try the most common fixes first",
          "Ask for help immediately",
          "Restart everything and hope for the best"
        ]
      },
      {
        id: "cognitive2",
        text: "How do you handle learning complex technical concepts?",
        type: "multiple-choice",
        options: [
          "Break it down into smaller parts and practice hands-on",
          "Read documentation thoroughly before trying",
          "Learn by following tutorials step-by-step",
          "Ask others to explain it to me"
        ]
      },
      // Ability to Learn
      {
        id: "ability1",
        text: "Do you actively seek feedback on your technical work?",
        type: "scale",
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: { min: "Never", max: "Always" }
      },
      {
        id: "ability2",
        text: "How do you react when you make technical mistakes?",
        type: "multiple-choice",
        options: [
          "Analyze what went wrong and learn from it",
          "Feel frustrated but try to fix it",
          "Ask someone else to help fix it",
          "Avoid similar tasks in the future"
        ]
      },
      // Real-world Alignment
      {
        id: "realworld1",
        text: "Do you enjoy designing scalable infrastructure systems?",
        type: "scale",
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: { min: "Not At All", max: "Love It" }
      },
      {
        id: "realworld2",
        text: "Which aspect of AWS work appeals to you most?",
        type: "multiple-choice",
        options: [
          "Building and architecting cloud solutions",
          "Automating deployment and operations",
          "Securing cloud environments",
          "Analyzing costs and optimizing resources"
        ]
      }
    ]
  }
];