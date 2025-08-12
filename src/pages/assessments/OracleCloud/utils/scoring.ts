export interface WISCARScore {
  W: number;
  I: number;
  S: number;
  C: number;
  A: number;
  R: number;
  overall_confidence: number;
}

export interface Recommendation {
  recommendation: "Yes" | "Maybe" | "No";
  confidence_score: number;
  reason: string;
  next_steps: string[];
}

export const calculatePsychologicalScore = (answers: Record<string, string | number>): number => {
  const interestQuestions = ['interest_1', 'interest_2', 'interest_3', 'interest_4', 'interest_5'];
  const personalityQuestions = ['personality_1', 'personality_2', 'personality_3', 'personality_4', 'personality_5'];
  const cognitiveQuestions = ['cognitive_1', 'cognitive_2', 'cognitive_3', 'cognitive_4'];
  const motivationQuestions = ['motivation_2', 'motivation_3', 'motivation_4'];
  
  const interestScore = calculateAverageScore(answers, interestQuestions);
  const personalityScore = calculateAverageScore(answers, personalityQuestions);
  const cognitiveScore = calculateAverageScore(answers, cognitiveQuestions);
  const motivationScore = calculateAverageScore(answers, motivationQuestions);
  
  // Handle motivation_1 (choice question)
  const motivation1 = answers['motivation_1'];
  let motivation1Score = 0;
  if (typeof motivation1 === 'string') {
    if (motivation1.includes('Mastering complex enterprise systems')) motivation1Score = 100;
    else if (motivation1.includes('Working with mission-critical')) motivation1Score = 90;
    else if (motivation1.includes('Job security')) motivation1Score = 70;
    else if (motivation1.includes('certifications')) motivation1Score = 60;
    else motivation1Score = 50;
  }
  
  const finalMotivationScore = (motivationScore + motivation1Score) / 2;
  
  return Math.round((interestScore + personalityScore + cognitiveScore + finalMotivationScore) / 4);
};

export const calculateTechnicalScore = (answers: Record<string, string | number>): number => {
  const aptitudeQuestions = ['aptitude_1', 'aptitude_2', 'aptitude_3', 'aptitude_4'];
  const prereqQuestions = ['prereq_1', 'prereq_2', 'prereq_3', 'prereq_4'];
  const ociQuestions = ['oci_1', 'oci_2', 'oci_3', 'oci_4'];
  const devopsQuestions = ['devops_1', 'devops_2', 'devops_3', 'devops_4'];
  
  const correctAnswers = {
    'aptitude_1': 'Implement a fallback mechanism or queue',
    'aptitude_2': 'Scale horizontally by adding more processing nodes',
    'aptitude_3': 'A data structure that improves query performance',
    'aptitude_4': 'Application/Logic tier',
    'prereq_1': 'Both A and C are correct',
    'prereq_2': 'SELECT DISTINCT column_name FROM table',
    'prereq_3': 'To establish relationships between tables',
    'prereq_4': 'Makes the script executable',
    'oci_1': 'Oracle Container Engine for Kubernetes (OKE)',
    'oci_2': 'Self-managing, self-securing, and self-repairing database operations',
    'oci_3': 'A logical container for organizing cloud resources',
    'oci_4': 'Oracle Functions',
    'devops_1': 'Infrastructure as Code - defining and provisioning infrastructure',
    'devops_2': 'Continuous Integration',
    'devops_3': 'Managing infrastructure through code and version control',
    'devops_4': 'Automated build, test, and deployment pipelines'
  };
  
  const aptitudeScore = calculateCorrectAnswerScore(answers, aptitudeQuestions, correctAnswers);
  const prereqScore = calculateCorrectAnswerScore(answers, prereqQuestions, correctAnswers);
  const ociScore = calculateCorrectAnswerScore(answers, ociQuestions, correctAnswers);
  const devopsScore = calculateCorrectAnswerScore(answers, devopsQuestions, correctAnswers);
  
  return Math.round((aptitudeScore + prereqScore + ociScore + devopsScore) / 4);
};

export const calculateWISCARScore = (answers: Record<string, string | number>): WISCARScore => {
  // Will (Grit + Motivation)
  const willQuestions = ['will_1', 'will_2', 'will_3'];
  const W = calculateAverageScore(answers, willQuestions);
  
  // Interest
  const interestQuestions = ['interest_overall', 'interest_database'];
  const I = calculateAverageScore(answers, interestQuestions);
  
  // Skill
  const skillQuestions = ['skill_scripting', 'skill_cloud', 'skill_database'];
  const S = calculateAverageScore(answers, skillQuestions);
  
  // Cognitive
  const cognitiveQuestions = ['cognitive_systems', 'cognitive_troubleshoot'];
  const C = calculateAverageScore(answers, cognitiveQuestions);
  
  // Ability to Learn
  const abilityQuestions = ['ability_feedback', 'ability_adapt'];
  const A = calculateAverageScore(answers, abilityQuestions);
  
  // Real-world Fit
  const realWorldCorrectAnswers = {
    'real_world_1': 'Assess current architecture and dependencies',
    'real_world_2': 'Implement automated backups, monitoring, and failover procedures',
    'real_world_3': 'Oracle Container Engine for Kubernetes with CI/CD pipelines'
  };
  const realWorldQuestions = ['real_world_1', 'real_world_2', 'real_world_3'];
  const R = calculateCorrectAnswerScore(answers, realWorldQuestions, realWorldCorrectAnswers);
  
  const overall_confidence = Math.round((W + I + S + C + A + R) / 6);
  
  return { W, I, S, C, A, R, overall_confidence };
};

export const generateRecommendation = (
  psychologicalScore: number,
  technicalScore: number,
  wiscarScore: WISCARScore
): Recommendation => {
  const overallScore = wiscarScore.overall_confidence;
  
  if (overallScore >= 75) {
    return {
      recommendation: "Yes",
      confidence_score: overallScore,
      reason: "Your psychological alignment and aptitude for structured, enterprise cloud systems is strong. You show excellent potential for Oracle Cloud roles.",
      next_steps: [
        "Start with Oracle Cloud Foundations free training",
        "Hands-on: Launch an OCI compute instance + configure a database",
        "Learn Terraform + OCI DevOps pipeline module",
        "Pursue Oracle Cloud Infrastructure certification"
      ]
    };
  } else if (overallScore >= 55) {
    return {
      recommendation: "Maybe",
      confidence_score: overallScore,
      reason: "You have good potential but need to strengthen some areas before diving deep into Oracle Cloud. Focus on building foundational skills first.",
      next_steps: [
        "Explore introductory Oracle Cloud labs and tutorials",
        "Strengthen scripting skills (Python/Bash basics)",
        "Join OCI community resources and forums",
        "Gain broader exposure to cloud concepts",
        "Consider starting with Oracle Cloud Always Free tier"
      ]
    };
  } else {
    return {
      recommendation: "No",
      confidence_score: overallScore,
      reason: "Based on your current profile, Oracle Cloud may not be the best immediate fit. Consider alternative paths that better align with your interests and strengths.",
      next_steps: [
        "Explore AWS or Azure for broader cloud adoption",
        "Consider SaaS administration roles",
        "Look into IT project management or business analyst roles in cloud projects",
        "Develop foundational IT skills before specializing",
        "Consider other technology domains that match your interests better"
      ]
    };
  }
};

// Helper functions
const calculateAverageScore = (answers: Record<string, string | number>, questions: string[]): number => {
  const scores = questions.map(q => {
    const answer = answers[q];
    if (typeof answer === 'number') {
      return (answer / 5) * 100; // Convert 1-5 scale to percentage
    }
    return 0;
  });
  
  const validScores = scores.filter(score => score > 0);
  if (validScores.length === 0) return 0;
  
  return Math.round(validScores.reduce((sum, score) => sum + score, 0) / validScores.length);
};

const calculateCorrectAnswerScore = (
  answers: Record<string, string | number>, 
  questions: string[], 
  correctAnswers: Record<string, string>
): number => {
  let correct = 0;
  let total = 0;
  
  questions.forEach(q => {
    if (answers[q] && correctAnswers[q]) {
      total++;
      if (answers[q] === correctAnswers[q]) {
        correct++;
      }
    }
  });
  
  return total === 0 ? 0 : Math.round((correct / total) * 100);
};