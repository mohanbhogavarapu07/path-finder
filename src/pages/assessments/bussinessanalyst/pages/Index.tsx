
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, Brain, Target, TrendingUp, Award, BookOpen, Users, BarChart3, ArrowRight, Clock, Star, XCircle, AlertTriangle, ExternalLink } from 'lucide-react';
import AssessmentLayout from "../../../../components/AssessmentLayout";

const Index = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState({});
  const [showResults, setShowResults] = useState(false);

  const goToSection = (index: number) => {
    setCurrentSection(index);
    setCurrentQuestion(0);
  };

  const sections = [
    { id: 'intro', title: 'Introduction', icon: Target },
    { id: 'psychometric', title: 'Psychometric Assessment', icon: Brain },
    { id: 'technical', title: 'Technical & Aptitude', icon: BarChart3 },
    { id: 'wiscar', title: 'WISCAR Framework', icon: TrendingUp },
    { id: 'results', title: 'Results & Recommendations', icon: Award }
  ];

  const psychometricQuestions = [
    "I enjoy mapping out complex processes step by step.",
    "I feel energized discussing requirements with stakeholders.",
    "I stay committed to goals even when they become difficult.",
    "I prefer structured approaches to problem-solving.",
    "I find satisfaction in analyzing data to discover insights.",
    "I communicate effectively with both technical and non-technical people.",
    "I adapt quickly to changing requirements and priorities.",
    "I pay close attention to details in documentation.",
    "I enjoy facilitating meetings and workshops.",
    "I can see the big picture while managing specific details."
  ];

  const psychometricOptions = [
    { value: '1', label: 'Strongly Disagree' },
    { value: '2', label: 'Disagree' },
    { value: '3', label: 'Neutral' },
    { value: '4', label: 'Agree' },
    { value: '5', label: 'Strongly Agree' },
  ];

  const wiscarOptions = [
    { value: '1', label: 'Very Low' },
    { value: '2', label: 'Low' },
    { value: '3', label: 'Average' },
    { value: '4', label: 'High' },
    { value: '5', label: 'Very High' },
  ];

  const technicalQuestions = [
    {
      question: "What is the main purpose of business process modeling?",
      options: ["To create software code", "To visualize and improve business workflows", "To design user interfaces", "To manage databases"],
      correct: 1,
      explanation: "Business process modeling is a method to visualize and improve business workflows, helping identify inefficiencies and areas for optimization.",
      category: "Business Process Modeling"
    },
    {
      question: "Which of these is a functional requirement?",
      options: ["System should be available 99.9% of the time", "User should be able to login with email", "System should load pages in 2 seconds", "System should support 1000 concurrent users"],
      correct: 1,
      explanation: "Functional requirements define what the system should do, not how it should do it. System should be available 99.9% of the time is a functional requirement.",
      category: "Functional Requirements"
    },
    {
      question: "In SQL, which command is used to retrieve data?",
      options: ["INSERT", "UPDATE", "SELECT", "DELETE"],
      correct: 2,
      explanation: "SELECT is the command used to retrieve data from a database. INSERT, UPDATE, and DELETE are used for data manipulation.",
      category: "SQL"
    },
    {
      question: "What's the difference between a use case and a user story?",
      options: ["No difference", "Use cases are more detailed and formal", "User stories are only for developers", "Use cases are outdated"],
      correct: 1,
      explanation: "A use case is a formal, documented description of a system's interaction with a user, while a user story is a brief, informal description of a feature from the user's perspective.",
      category: "Requirements"
    }
  ];

  const wiscarDimensions = [
    { key: 'will', label: 'Will', description: 'Endurance in goal completion' },
    { key: 'interest', label: 'Interest', description: 'Curiosity about business systems' },
    { key: 'skill', label: 'Skill', description: 'Current domain or communication skills' },
    { key: 'cognitive', label: 'Cognitive Readiness', description: 'Process mapping, system thinking' },
    { key: 'ability', label: 'Ability to Learn', description: 'Openness to feedback, self-learning' },
    { key: 'reality', label: 'Real-World Alignment', description: 'Desire for BA career & stakeholder interaction' }
  ];

  const careerPaths = [
    { title: "Business Analyst", description: "Analyze business needs and document requirements" },
    { title: "Data Analyst", description: "Explore and visualize business data" },
    { title: "Product Owner", description: "Manage product backlog and stakeholder alignment" },
    { title: "Management Consultant", description: "Advise on process/product improvements" },
    { title: "Requirements Engineer", description: "Translate business needs into technical specs" }
  ];

  const IntroSection = () => (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
            Discover Your Business Analyst Career Potential
          </CardTitle>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take our comprehensive assessment to evaluate your psychological fit, technical readiness, 
            and career alignment for a future in business analysis and consulting.
          </p>
        </CardHeader>
        <CardContent className="text-center">
          <div className="flex justify-center items-center space-x-6 mb-6">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>25-30 minutes</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Target className="w-4 h-4" />
              <span>Personalized Results</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <TrendingUp className="w-4 h-4" />
              <span>Career Guidance</span>
            </div>
          </div>
          <Button 
            onClick={() => goToSection(1)} 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
          >
            Start Assessment
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </CardContent>
      </Card>
      {/* What is Business Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            <span>What is Business Analysis?</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Business Analysis is a discipline focused on identifying business needs and finding technical solutions to business problems. BAs bridge the gap between stakeholders and IT, ensuring that solutions deliver value.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Process Mapping</h4>
              <p className="text-sm text-blue-700">Visualize and improve business workflows</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Stakeholder Management</h4>
              <p className="text-sm text-green-700">Facilitate communication and requirements</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">Data Analysis</h4>
              <p className="text-sm text-purple-700">Leverage data for business insights</p>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Career Paths */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-6 h-6 text-green-600" />
            <span>Career Opportunities</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {careerPaths.map((path, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-gray-900 mb-2">{path.title}</h4>
                <p className="text-sm text-gray-600">{path.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      {/* Ideal Traits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="w-6 h-6 text-orange-600" />
            <span>Ideal Traits & Skills</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-3">
            {["Structured, analytical thinking","Empathy and stakeholder management","Attention to detail","Visual and process-oriented mindset","Adaptability and communication skills"].map((trait, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-700">{trait}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      {/* Assessment Overview */}
      <Card className="border-2 border-gray-200">
        <CardHeader>
          <CardTitle>What You'll Discover</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Assessment Modules:</h4>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-purple-50 text-purple-700">1</Badge>
                  <span className="text-sm">Psychometric Assessment</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700">2</Badge>
                  <span className="text-sm">Technical & Aptitude</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-orange-50 text-orange-700">3</Badge>
                  <span className="text-sm">WISCAR Framework Analysis</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Your Results Include:</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Personalized fit score (0-100)</li>
                <li>• Detailed trait analysis</li>
                <li>• Technical readiness assessment</li>
                <li>• Career pathway recommendations</li>
                <li>• Next steps and learning resources</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Replace PsychometricSection with reference-style single-question flow
  const PsychometricSection = () => {
    const questions = psychometricQuestions;
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    const canProceed = responses[`psycho_${currentQuestion}`] !== undefined;
    const isLastQuestion = currentQuestion === questions.length - 1;
    return (
      <div className="max-w-3xl mx-auto">
        <Card className="border-2 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-6 h-6 text-purple-600" />
              <span>Psychological Fit Assessment</span>
            </CardTitle>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {questions[currentQuestion]}
              </h3>
              <RadioGroup
                value={responses[`psycho_${currentQuestion}`] || ''}
                onValueChange={value => setResponses(prev => ({ ...prev, [`psycho_${currentQuestion}`]: value }))}
                className="space-y-3"
              >
                {psychometricOptions.map(option => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={`psycho_${currentQuestion}_${option.value}`} />
                    <Label htmlFor={`psycho_${currentQuestion}_${option.value}`} className="text-sm cursor-pointer flex-1 py-2 px-3 rounded hover:bg-white/50 transition-colors">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Assessing: Psychometric
              </div>
              <Button
                onClick={() => {
                  if (!isLastQuestion) setCurrentQuestion(q => q + 1);
                  else goToSection(2);
                }}
                disabled={!canProceed}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isLastQuestion ? 'Complete Section' : 'Next Question'}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Replace TechnicalSection with reference-style single-question flow and feedback
  const TechnicalSection = () => {
    const [showExplanation, setShowExplanation] = useState(false);
    const questions = technicalQuestions;
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    const currentAnswer = responses[`tech_${currentQuestion}`];
    const isCorrect = currentAnswer !== undefined && parseInt(currentAnswer) === questions[currentQuestion].correct;
    const canProceed = currentAnswer !== undefined;
    const isLastQuestion = currentQuestion === questions.length - 1;
    return (
      <div className="max-w-3xl mx-auto">
        <Card className="border-2 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-6 h-6 text-green-600" />
              <span>Technical & Aptitude Assessment</span>
            </CardTitle>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {questions[currentQuestion].question}
              </h3>
              <RadioGroup
                value={currentAnswer !== undefined ? currentAnswer.toString() : ''}
                onValueChange={value => {
                  setResponses(prev => ({ ...prev, [`tech_${currentQuestion}`]: value }));
                  setShowExplanation(false);
                }}
                className="space-y-3"
              >
                {questions[currentQuestion].options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={index.toString()} id={`tech_${currentQuestion}_${index}`} />
                    <Label htmlFor={`tech_${currentQuestion}_${index}`} className="text-sm cursor-pointer flex-1 py-2 px-3 rounded hover:bg-white/50 transition-colors">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {showExplanation && (
                <div className={`mt-4 p-3 rounded-lg ${isCorrect ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'}`}>
                  <div className="flex items-start space-x-2">
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    )}
                    <div>
                      <div className={`font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>{isCorrect ? 'Correct!' : 'Incorrect'}</div>
                      <div className="text-sm text-gray-700 mt-1">
                        {questions[currentQuestion].explanation}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Category: {questions[currentQuestion].category}
              </div>
              <div className="space-x-3">
                {canProceed && !showExplanation && (
                  <Button onClick={() => setShowExplanation(true)} variant="outline" className="text-gray-600">Show Answer</Button>
                )}
                <Button
                  onClick={() => {
                    if (!isLastQuestion) {
                      setCurrentQuestion(q => q + 1);
                    } else {
                      goToSection(3);
                    }
                    setShowExplanation(false);
                  }}
                  disabled={!canProceed}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isLastQuestion ? 'Complete Section' : 'Next Question'}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Replace WiscarSection with reference-style single-question flow and explanation
  const WiscarSection = () => {
    const questions = wiscarDimensions;
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    const canProceed = responses[`wiscar_${questions[currentQuestion].key}`] !== undefined;
    const isLastQuestion = currentQuestion === questions.length - 1;
    return (
      <div className="max-w-3xl mx-auto">
        <Card className="border-2 border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-6 h-6 text-orange-600" />
              <span>WISCAR Framework Analysis</span>
            </CardTitle>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-sm font-medium text-orange-700 mb-2">
                {questions[currentQuestion].label}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {questions[currentQuestion].description}
              </h3>
              <RadioGroup
                value={responses[`wiscar_${questions[currentQuestion].key}`] || ''}
                onValueChange={value => setResponses(prev => ({ ...prev, [`wiscar_${questions[currentQuestion].key}`]: value }))}
                className="space-y-3"
              >
                {wiscarOptions.map(option => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={`wiscar_${questions[currentQuestion].key}_${option.value}`} />
                    <Label htmlFor={`wiscar_${questions[currentQuestion].key}_${option.value}`} className="text-sm cursor-pointer flex-1 py-2 px-3 rounded hover:bg-white/50 transition-colors">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Evaluating: {questions[currentQuestion].label}
              </div>
              <Button
                onClick={() => {
                  if (!isLastQuestion) setCurrentQuestion(q => q + 1);
                  else goToSection(4);
                }}
                disabled={!canProceed}
                className="bg-orange-600 hover:bg-orange-700"
              >
                {isLastQuestion ? 'Complete Assessment' : 'Next Question'}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">WISCAR Framework</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                <div><strong>W</strong>ill - Perseverance</div>
                <div><strong>I</strong>nterest - Long-term curiosity</div>
                <div><strong>S</strong>kill - Current abilities</div>
                <div><strong>C</strong>ognitive - Problem-solving</div>
                <div><strong>A</strong>bility - Learning capacity</div>
                <div><strong>R</strong>eal-world - Job alignment</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const calculateScores = () => {
    // Psychometric score calculation
    const psychoAnswers = psychometricQuestions.map((_, i) => parseInt(responses[`psycho_${i}`]) || 0);
    const psychoScore = Math.round((psychoAnswers.reduce((a, b) => a + b, 0) / (psychometricQuestions.length * 5)) * 100);

    // Technical score calculation
    let techCorrect = 0;
    technicalQuestions.forEach((q, i) => {
      if (parseInt(responses[`tech_${i}`]) === q.correct) techCorrect++;
    });
    const techScore = Math.round((techCorrect / technicalQuestions.length) * 100);

    // WISCAR scores
    const wiscarScores = {};
    let wiscarTotal = 0;
    wiscarDimensions.forEach(dimension => {
      const score = (parseInt(responses[`wiscar_${dimension.key}`]) || 0) * 20;
      wiscarScores[dimension.key] = score;
      wiscarTotal += score;
    });
    const wiscarAverage = Math.round(wiscarTotal / wiscarDimensions.length);

    const overallScore = Math.round((psychoScore + techScore + wiscarAverage) / 3);

    return { psychoScore, techScore, wiscarScores, wiscarAverage, overallScore };
  };

  const getRecommendation = (score) => {
    if (score >= 75) return { 
      verdict: "YES", 
      color: "green", 
      title: "Business Analysis is an Excellent Fit for You!",
      description: "You show strong alignment across psychological fit, technical readiness, and holistic assessment dimensions.",
      icon: CheckCircle
    };
    if (score >= 55) return { 
      verdict: "MAYBE", 
      color: "orange", 
      title: "Business Analysis Could Be Right with Preparation",
      description: "You have potential but may need to strengthen certain areas before diving deep into business analysis.",
      icon: AlertTriangle
    };
    return { 
      verdict: "NO", 
      color: "red", 
      title: "Consider Alternative Paths",
      description: "Based on your current profile, other career paths might be a better fit for your interests and skills.",
      icon: XCircle
    };
  };

  const ResultsSection = () => {
    const scores = calculateScores();
    const recommendation = getRecommendation(scores.overallScore);
    const RecommendationIcon = recommendation.icon;

    const careerPaths = [
      {
        title: 'Business Analyst',
        description: 'Analyze business needs and document requirements',
        skillMatch: Math.max(scores.psychoScore, 70),
        requirements: ['Requirements Analysis', 'Process Mapping', 'Communication']
      },
      {
        title: 'Data Analyst',
        description: 'Explore and visualize business data',
        skillMatch: Math.max(scores.techScore, 65),
        requirements: ['SQL', 'Data Visualization', 'Statistical Analysis']
      },
      {
        title: 'Product Owner',
        description: 'Manage product backlog and stakeholder alignment',
        skillMatch: Math.max(scores.wiscarAverage, 70),
        requirements: ['Agile Methodologies', 'Stakeholder Management', 'Product Strategy']
      },
      {
        title: 'Management Consultant',
        description: 'Advise on process/product improvements',
        skillMatch: Math.max(scores.psychoScore, 75),
        requirements: ['Strategic Thinking', 'Client Management', 'Problem Solving']
      }
    ];

    const learningPath = [
      {
        stage: 'Foundation',
        modules: ['BA Fundamentals', 'Requirements Gathering', 'Process Modeling'],
        duration: '2-4 weeks',
        completed: false
      },
      {
        stage: 'Intermediate',
        modules: ['Data & SQL Basics', 'BPMN Modeling', 'Stakeholder Management'],
        duration: '6-8 weeks',
        completed: false
      },
      {
        stage: 'Advanced',
        modules: ['Advanced Requirements', 'Business Process Design', 'Change Management'],
        duration: '8-12 weeks',
        completed: false
      },
      {
        stage: 'Certification',
        modules: ['CBAP Prep', 'PMI-PBA Prep', 'Portfolio Building'],
        duration: '4-6 weeks',
        completed: false
      }
    ];

    const alternatives = [
      { title: 'Project Management', reason: 'Similar organizational and leadership focus' },
      { title: 'Data Science', reason: 'Analytical thinking with technical implementation' },
      { title: 'UX/UI Design', reason: 'User-centered design and research skills' },
      { title: 'Operations Management', reason: 'Process optimization and efficiency focus' }
    ];

    return (
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Overall Recommendation */}
        <Card className={`border-2 ${
          recommendation.color === 'green' ? 'border-green-200 bg-green-50' :
          recommendation.color === 'orange' ? 'border-orange-200 bg-orange-50' :
          'border-red-200 bg-red-50'
        }`}>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className={`p-4 rounded-full ${
                recommendation.color === 'green' ? 'bg-green-100' :
                recommendation.color === 'orange' ? 'bg-orange-100' :
                'bg-red-100'
              }`}>
                <RecommendationIcon className={`w-12 h-12 ${
                  recommendation.color === 'green' ? 'text-green-600' :
                  recommendation.color === 'orange' ? 'text-orange-600' :
                  'text-red-600'
                }`} />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
              {recommendation.title}
            </CardTitle>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {recommendation.description}
            </p>
            <Badge 
              variant="outline" 
              className={`mt-4 text-lg px-4 py-2 ${
                recommendation.color === 'green' ? 'bg-green-100 text-green-800 border-green-300' :
                recommendation.color === 'orange' ? 'bg-orange-100 text-orange-800 border-orange-300' :
                'bg-red-100 text-red-800 border-red-300'
              }`}
            >
              Recommendation: {recommendation.verdict}
            </Badge>
          </CardHeader>
        </Card>

        {/* Score Breakdown */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-purple-600" />
                <span>Psychological Fit</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-2xl font-bold text-purple-600">
                      {scores.psychoScore}%
                    </span>
                    <Badge variant={
                      scores.psychoScore >= 75 ? 'default' :
                      scores.psychoScore >= 60 ? 'secondary' : 'destructive'
                    }>
                      {scores.psychoScore >= 75 ? 'Excellent' :
                       scores.psychoScore >= 60 ? 'Good' : 'Needs Work'}
                    </Badge>
                  </div>
                  <Progress value={scores.psychoScore} className="h-3" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Analytical Thinking</span>
                    <span className="font-medium">{scores.psychoScore}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Communication</span>
                    <span className="font-medium">{scores.psychoScore}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Problem Solving</span>
                    <span className="font-medium">{scores.psychoScore}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-green-600" />
                <span>Technical Readiness</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-2xl font-bold text-green-600">
                      {scores.techScore}%
                    </span>
                    <Badge variant={
                      scores.techScore >= 75 ? 'default' :
                      scores.techScore >= 60 ? 'secondary' : 'destructive'
                    }>
                      {scores.techScore >= 75 ? 'Strong' :
                       scores.techScore >= 60 ? 'Moderate' : 'Developing'}
                    </Badge>
                  </div>
                  <Progress value={scores.techScore} className="h-3" />
                </div>
                <div className="text-sm text-gray-600">
                  Correct: {Math.round(scores.techScore / 25)} / {technicalQuestions.length}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Business Process</span>
                    <span className="font-medium">{scores.techScore}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Requirements</span>
                    <span className="font-medium">{scores.techScore}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">SQL Basics</span>
                    <span className="font-medium">{scores.techScore}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-orange-600" />
                <span>FB6 Index Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-2xl font-bold text-orange-600">
                      {scores.wiscarAverage}%
                    </span>
                    <Badge variant="outline" className="bg-orange-50 text-orange-700">
                      {scores.wiscarAverage >= 70 ? 'Ready' : 'Developing'}
                    </Badge>
                  </div>
                  <Progress value={scores.wiscarAverage} className="h-3" />
                </div>
                <div className="space-y-2">
                  {wiscarDimensions.map(dimension => (
                    <div key={dimension.key} className="flex justify-between text-sm">
                      <span className="text-gray-600">{dimension.label.split(' ')[0]}</span>
                      <span className="font-medium">{scores.wiscarScores[dimension.key]}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Career Path Matching */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-6 h-6 text-blue-600" />
              <span>Career Path Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {careerPaths.map((career, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-900">{career.title}</h4>
                    <Badge variant="outline" className={
                      career.skillMatch >= 75 ? 'bg-green-50 text-green-700' :
                      career.skillMatch >= 60 ? 'bg-orange-50 text-orange-700' :
                      'bg-red-50 text-red-700'
                    }>
                      {career.skillMatch}% Match
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{career.description}</p>
                  <div className="mb-3">
                    <Progress value={career.skillMatch} className="h-2" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500 mb-1">Key Requirements:</div>
                    {career.requirements.map((req, reqIndex) => (
                      <Badge key={reqIndex} variant="secondary" className="mr-1 mb-1 text-xs">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        {recommendation.verdict === 'YES' && (
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-6 h-6 text-green-600" />
                <span>Your Learning Path</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {learningPath.map((stage, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-700 font-semibold text-sm">{index + 1}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900">{stage.stage}</h4>
                        <Badge variant="outline">{stage.duration}</Badge>
                      </div>
                      <div className="space-y-1">
                        {stage.modules.map((module, moduleIndex) => (
                          <div key={moduleIndex} className="text-sm text-gray-600">
                            • {module}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Recommended Next Steps:</h4>
                <ul className="space-y-1 text-sm text-blue-800">
                  <li>• Join the International Institute of Business Analysis (IIBA)</li>
                  <li>• Start with "Business Analysis Fundamentals" course</li>
                  <li>• Practice with case studies and real-world scenarios</li>
                  <li>• Build a portfolio of process models and requirements documents</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Alternative Recommendations */}
        {recommendation.verdict !== 'YES' && (
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="w-6 h-6 text-blue-600" />
                <span>Alternative Career Paths</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Based on your assessment results, here are some alternative career paths that might be a better fit:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {alternatives.map((alt, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">{alt.title}</h4>
                    <p className="text-sm text-gray-600">{alt.reason}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => {
              setResponses({});
              goToSection(0);
            }}
          >
            Retake Assessment
          </Button>
          {recommendation.verdict === 'YES' && (
            <Button variant="outline" className="border-green-500 text-green-700 hover:bg-green-50">
              View Learning Resources
              <ExternalLink className="ml-2 w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    );
  };

  const progress = ((currentSection + 1) / sections.length) * 100;

  return (
    <AssessmentLayout>
      {/* Top Assessment Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Should You Become a Business Analyst?
              </h1>
              <p className="text-gray-600 text-sm">
                Comprehensive Career Assessment & Guidance
              </p>
            </div>
            <Badge variant="outline" className="text-sm">
              {Math.round(progress)}% Complete
            </Badge>
          </div>
          {/* Progress Bar */}
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
          </div>
          {/* Section Navigation */}
          <div className="flex mt-4 space-x-4 overflow-x-auto">
            {sections.map((section, index) => {
              const Icon = section.icon;
              const isActive = index === currentSection;
              const isCompleted = currentSection > index;
              return (
                <div
                  key={section.id}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg min-w-fit ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                      : isCompleted
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                  <span className="text-sm font-medium">{section.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-4xl mx-auto">
          {currentSection === 0 && <IntroSection />}
          {currentSection === 1 && <PsychometricSection />}
          {currentSection === 2 && <TechnicalSection />}
          {currentSection === 3 && <WiscarSection />}
          {currentSection === 4 && <ResultsSection />}
        </div>
      </div>
    </AssessmentLayout>
  );
};

export default Index;
