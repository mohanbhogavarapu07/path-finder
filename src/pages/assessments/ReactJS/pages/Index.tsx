import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Brain, Code, Target, Users, TrendingUp, ArrowRight, CheckCircle, ArrowLeft, AlertTriangle, XCircle, Star, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import AssessmentLayout from '../../../../components/AssessmentLayout';

const Index = () => {
  const [currentSection, setCurrentSection] = useState('intro');
  const [assessmentData, setAssessmentData] = useState({
    psychometric: {},
    technical: {},
    wiscar: {},
    completed: false
  });

  // Assessment state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showExplanation, setShowExplanation] = useState(false);

  const sections = [
    { id: 'intro', title: 'Introduction', icon: BookOpen, color: 'bg-blue-500' },
    { id: 'psychometric', title: 'Psychological Fit', icon: Brain, color: 'bg-purple-500' },
    { id: 'technical', title: 'Technical Aptitude', icon: Code, color: 'bg-green-500' },
    { id: 'wiscar', title: 'WISCAR Analysis', icon: Target, color: 'bg-orange-500' },
    { id: 'results', title: 'Your Results', icon: TrendingUp, color: 'bg-red-500' }
  ];

  // Psychological Fit Questions
  const psychometricQuestions = [
    {
      category: 'Interest (RIASEC)',
      question: 'I enjoy building user interfaces and creating interactive web experiences',
      options: [
        { value: '5', label: 'Strongly Agree' },
        { value: '4', label: 'Agree' },
        { value: '3', label: 'Neutral' },
        { value: '2', label: 'Disagree' },
        { value: '1', label: 'Strongly Disagree' }
      ]
    },
    {
      category: 'Interest (RIASEC)',
      question: 'I prefer working with structured code and following established patterns',
      options: [
        { value: '5', label: 'Strongly Agree' },
        { value: '4', label: 'Agree' },
        { value: '3', label: 'Neutral' },
        { value: '2', label: 'Disagree' },
        { value: '1', label: 'Strongly Disagree' }
      ]
    },
    {
      category: 'Personality (Big 5)',
      question: 'I am thorough in my work and pay attention to code quality and details',
      options: [
        { value: '5', label: 'Strongly Agree' },
        { value: '4', label: 'Agree' },
        { value: '3', label: 'Neutral' },
        { value: '2', label: 'Disagree' },
        { value: '1', label: 'Strongly Disagree' }
      ]
    },
    {
      category: 'Personality (Big 5)',
      question: 'I enjoy solving complex problems with logical, step-by-step approaches',
      options: [
        { value: '5', label: 'Strongly Agree' },
        { value: '4', label: 'Agree' },
        { value: '3', label: 'Neutral' },
        { value: '2', label: 'Disagree' },
        { value: '1', label: 'Strongly Disagree' }
      ]
    },
    {
      category: 'Motivation',
      question: 'My primary motivation for learning React.js is career advancement in web development',
      options: [
        { value: '5', label: 'Strongly Agree' },
        { value: '4', label: 'Agree' },
        { value: '3', label: 'Neutral' },
        { value: '2', label: 'Disagree' },
        { value: '1', label: 'Strongly Disagree' }
      ]
    },
    {
      category: 'Motivation',
      question: 'I am genuinely curious about how modern web applications are built and function',
      options: [
        { value: '5', label: 'Strongly Agree' },
        { value: '4', label: 'Agree' },
        { value: '3', label: 'Neutral' },
        { value: '2', label: 'Disagree' },
        { value: '1', label: 'Strongly Disagree' }
      ]
    },
    {
      category: 'Cognitive Style',
      question: 'I prefer working with component-based architecture over monolithic code',
      options: [
        { value: '5', label: 'Strongly Agree' },
        { value: '4', label: 'Agree' },
        { value: '3', label: 'Neutral' },
        { value: '2', label: 'Disagree' },
        { value: '1', label: 'Strongly Disagree' }
      ]
    },
    {
      category: 'Cognitive Style',
      question: 'I enjoy analyzing user experience patterns and improving interface design',
      options: [
        { value: '5', label: 'Strongly Agree' },
        { value: '4', label: 'Agree' },
        { value: '3', label: 'Neutral' },
        { value: '2', label: 'Disagree' },
        { value: '1', label: 'Strongly Disagree' }
      ]
    }
  ];

  // Technical Aptitude Questions
  const technicalQuestions = [
    {
      category: 'Logical Reasoning',
      question: 'What comes next in this sequence: 1, 2, 4, 8, 16, ?',
      options: [
        { value: 'A', label: '24' },
        { value: 'B', label: '32' },
        { value: 'C', label: '28' },
        { value: 'D', label: '20' }
      ],
      correct: 'B',
      explanation: 'Each number is multiplied by 2: 1×2=2, 2×2=4, 4×2=8, 8×2=16, 16×2=32'
    },
    {
      category: 'Logical Reasoning',
      question: 'If all React components are JavaScript functions, and some JavaScript functions can be asynchronous, which statement must be true?',
      options: [
        { value: 'A', label: 'All React components can be asynchronous' },
        { value: 'B', label: 'Some React components may be asynchronous' },
        { value: 'C', label: 'No React components can be asynchronous' },
        { value: 'D', label: 'Only JavaScript functions can be asynchronous' }
      ],
      correct: 'B',
      explanation: 'Since React components are JavaScript functions and some JavaScript functions can be async, some React components may be asynchronous.'
    },
    {
      category: 'Numerical Ability',
      question: 'A React application renders 500 components per page. If 20% are stateful components, how many stateful components are rendered?',
      options: [
        { value: 'A', label: '80' },
        { value: 'B', label: '100' },
        { value: 'C', label: '120' },
        { value: 'D', label: '150' }
      ],
      correct: 'B',
      explanation: '500 × 0.20 = 100 stateful components'
    },
    {
      category: 'Basic Web Knowledge',
      question: 'What is the primary purpose of HTML in web development?',
      options: [
        { value: 'A', label: 'To style web pages' },
        { value: 'B', label: 'To structure web content' },
        { value: 'C', label: 'To add interactivity' },
        { value: 'D', label: 'To handle data storage' }
      ],
      correct: 'B',
      explanation: 'HTML (HyperText Markup Language) is used to structure and organize web content.'
    },
    {
      category: 'Basic Web Knowledge',
      question: 'What does "DOM" stand for in web development?',
      options: [
        { value: 'A', label: 'Document Object Model' },
        { value: 'B', label: 'Data Object Management' },
        { value: 'C', label: 'Document Order Method' },
        { value: 'D', label: 'Dynamic Object Mapping' }
      ],
      correct: 'A',
      explanation: 'DOM (Document Object Model) is a programming interface for HTML and XML documents.'
    },
    {
      category: 'JavaScript Foundations',
      question: 'In JavaScript, what will this code output: console.log(typeof [])?',
      options: [
        { value: 'A', label: 'array' },
        { value: 'B', label: 'object' },
        { value: 'C', label: 'list' },
        { value: 'D', label: 'undefined' }
      ],
      correct: 'B',
      explanation: 'In JavaScript, arrays are objects, so typeof [] returns "object"'
    },
    {
      category: 'React Awareness',
      question: 'What is the main purpose of React.js?',
      options: [
        { value: 'A', label: 'To create server-side applications' },
        { value: 'B', label: 'To build user interfaces' },
        { value: 'C', label: 'To manage databases' },
        { value: 'D', label: 'To handle network requests' }
      ],
      correct: 'B',
      explanation: 'React.js is a JavaScript library for building user interfaces, particularly single-page applications.'
    },
    {
      category: 'React Awareness',
      question: 'What is a React component?',
      options: [
        { value: 'A', label: 'A database table' },
        { value: 'B', label: 'A reusable piece of UI' },
        { value: 'C', label: 'A server function' },
        { value: 'D', label: 'A CSS file' }
      ],
      correct: 'B',
      explanation: 'React components are reusable pieces of UI that can contain their own logic and styling.'
    }
  ];

  // WISCAR Questions
  const wiscarQuestions = [
    {
      category: 'Will (Perseverance)',
      question: 'When I start learning a new programming language or framework, I stick with it even when it gets difficult',
      options: [
        { value: '5', label: 'Always true' },
        { value: '4', label: 'Usually true' },
        { value: '3', label: 'Sometimes true' },
        { value: '2', label: 'Rarely true' },
        { value: '1', label: 'Never true' }
      ]
    },
    {
      category: 'Will (Perseverance)',
      question: 'I have completed online courses or certifications in programming or web development',
      options: [
        { value: '5', label: 'Multiple certifications' },
        { value: '4', label: 'Several courses' },
        { value: '3', label: 'A few courses' },
        { value: '2', label: 'One or two' },
        { value: '1', label: 'None completed' }
      ]
    },
    {
      category: 'Interest (Long-term)',
      question: 'I actively seek out information about modern web development technologies and trends',
      options: [
        { value: '5', label: 'Very frequently' },
        { value: '4', label: 'Often' },
        { value: '3', label: 'Sometimes' },
        { value: '2', label: 'Rarely' },
        { value: '1', label: 'Never' }
      ]
    },
    {
      category: 'Interest (Long-term)',
      question: 'I would enjoy learning React.js even if it wasn\'t for career reasons',
      options: [
        { value: '5', label: 'Strongly agree' },
        { value: '4', label: 'Agree' },
        { value: '3', label: 'Neutral' },
        { value: '2', label: 'Disagree' },
        { value: '1', label: 'Strongly disagree' }
      ]
    },
    {
      category: 'Skill (Current Level)',
      question: 'How would you rate your current web development skills?',
      options: [
        { value: '5', label: 'Advanced (Full-stack development, multiple frameworks)' },
        { value: '4', label: 'Intermediate (HTML, CSS, JavaScript, some frameworks)' },
        { value: '3', label: 'Basic (HTML, CSS, some JavaScript)' },
        { value: '2', label: 'Beginner (Limited web development experience)' },
        { value: '1', label: 'No web development background' }
      ]
    },
    {
      category: 'Skill (Current Level)',
      question: 'Have you worked with JavaScript frameworks or libraries before?',
      options: [
        { value: '5', label: 'Extensively (Multiple frameworks, led projects)' },
        { value: '4', label: 'Moderately (Used several frameworks)' },
        { value: '3', label: 'Some exposure (One or two frameworks)' },
        { value: '2', label: 'Very limited' },
        { value: '1', label: 'No experience' }
      ]
    },
    {
      category: 'Cognitive Readiness',
      question: 'I can understand complex relationships between different parts of a web application',
      options: [
        { value: '5', label: 'Very easily' },
        { value: '4', label: 'Usually' },
        { value: '3', label: 'Sometimes' },
        { value: '2', label: 'With difficulty' },
        { value: '1', label: 'Very difficult' }
      ]
    },
    {
      category: 'Cognitive Readiness',
      question: 'When faced with a complex coding problem, I can break it down into smaller, manageable parts',
      options: [
        { value: '5', label: 'Always' },
        { value: '4', label: 'Usually' },
        { value: '3', label: 'Sometimes' },
        { value: '2', label: 'Rarely' },
        { value: '1', label: 'Never' }
      ]
    },
    {
      category: 'Ability (Learning Capacity)',
      question: 'I can learn new programming concepts quickly and apply them to real projects',
      options: [
        { value: '5', label: 'Very easily' },
        { value: '4', label: 'Usually' },
        { value: '3', label: 'Sometimes' },
        { value: '2', label: 'With difficulty' },
        { value: '1', label: 'Very difficult' }
      ]
    },
    {
      category: 'Real-World Alignment',
      question: 'I understand that React.js development involves working with teams and following industry best practices',
      options: [
        { value: '5', label: 'Strongly agree' },
        { value: '4', label: 'Agree' },
        { value: '3', label: 'Neutral' },
        { value: '2', label: 'Disagree' },
        { value: '1', label: 'Strongly disagree' }
      ]
    }
  ];

  const getCurrentSectionIndex = () => {
    return sections.findIndex(section => section.id === currentSection);
  };

  const progress = ((getCurrentSectionIndex() + 1) / sections.length) * 100;

  const updateAssessmentData = (section, data) => {
    setAssessmentData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const goToNextSection = () => {
    const currentIndex = getCurrentSectionIndex();
    if (currentIndex < sections.length - 1) {
      setCurrentSection(sections[currentIndex + 1].id);
      setCurrentQuestion(0);
      setAnswers({});
      setShowExplanation(false);
    }
  };

  const handleAnswerChange = (value: string) => {
    const questionKey = `${currentSection}_${currentQuestion}`;
    setAnswers(prev => ({ ...prev, [questionKey]: value }));
  };

  const handleNext = () => {
    const questions = getCurrentQuestions();
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      // Complete section
      let scores;
      if (currentSection === 'wiscar') {
        scores = calculateWiscarScores();
      } else {
        scores = calculateScores();
      }
      updateAssessmentData(currentSection, scores);
      goToNextSection();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowExplanation(false);
    }
  };

  const getCurrentQuestions = () => {
    switch (currentSection) {
      case 'psychometric':
        return psychometricQuestions;
      case 'technical':
        return technicalQuestions;
      case 'wiscar':
        return wiscarQuestions;
      default:
        return [];
    }
  };

  const calculateScores = () => {
    const questions = getCurrentQuestions();
    const categoryScores = {};
    let totalScore = 0;
    let answeredQuestions = 0;

    questions.forEach((q, index) => {
      const questionKey = `${currentSection}_${index}`;
      const answer = answers[questionKey];
      
      if (answer) {
        answeredQuestions++;
        const score = parseInt(answer);
        totalScore += score;
        
        if (!categoryScores[q.category]) {
          categoryScores[q.category] = { total: 0, count: 0 };
        }
        categoryScores[q.category].total += score;
        categoryScores[q.category].count++;
      }
    });

    // Calculate category averages
    Object.keys(categoryScores).forEach(category => {
      categoryScores[category] = Math.round((categoryScores[category].total / categoryScores[category].count) * 20);
    });

    const overallScore = answeredQuestions > 0 ? Math.round((totalScore / (answeredQuestions * 5)) * 100) : 0;

    return {
      overall: overallScore,
      categories: categoryScores,
      totalQuestions: questions.length,
      answeredQuestions
    };
  };

  const calculateWiscarScores = () => {
    const questions = getCurrentQuestions();
    const dimensions = {};
    let totalScore = 0;
    let answeredQuestions = 0;

    questions.forEach((q, index) => {
      const questionKey = `${currentSection}_${index}`;
      const answer = answers[questionKey];
      
      if (answer) {
        answeredQuestions++;
        const score = parseInt(answer);
        totalScore += score;
        
        if (!dimensions[q.category]) {
          dimensions[q.category] = { total: 0, count: 0 };
        }
        dimensions[q.category].total += score;
        dimensions[q.category].count++;
      }
    });

    // Calculate dimension averages
    Object.keys(dimensions).forEach(dimension => {
      dimensions[dimension] = Math.round((dimensions[dimension].total / dimensions[dimension].count) * 20);
    });

    const overallScore = answeredQuestions > 0 ? Math.round((totalScore / (answeredQuestions * 5)) * 100) : 0;

    return {
      overall: overallScore,
      dimensions: dimensions,
      totalQuestions: questions.length,
      answeredQuestions
    };
  };

  const calculateOverallRecommendation = () => {
    const psychScore = assessmentData.psychometric?.overall || 0;
    const techScore = assessmentData.technical?.overall || 0;
    const wiscarScore = assessmentData.wiscar?.overall || 0;
    
    const overallScore = Math.round((psychScore + techScore + wiscarScore) / 3);
    
    if (overallScore >= 75) {
      return {
        recommendation: 'YES',
        title: 'React.js is an Excellent Fit for You!',
        color: 'green',
        icon: CheckCircle,
        description: 'You show strong alignment across psychological fit, technical readiness, and holistic assessment dimensions.'
      };
    } else if (overallScore >= 60) {
      return {
        recommendation: 'MAYBE',
        title: 'React.js Could Be Right with Preparation',
        color: 'orange',
        icon: AlertTriangle,
        description: 'You have potential but may need to strengthen certain areas before diving deep into React.js development.'
      };
    } else {
      return {
        recommendation: 'NO',
        title: 'Consider Alternative Paths',
        color: 'red',
        icon: XCircle,
        description: 'Based on your current profile, other technology paths might be a better fit for your interests and skills.'
      };
    }
  };

  const getCurrentQuestionProgress = () => {
    const questions = getCurrentQuestions();
    return ((currentQuestion + 1) / questions.length) * 100;
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'intro':
        return (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Hero Section */}
            <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                  Discover Your React.js Career Potential
                </CardTitle>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Take our comprehensive assessment to evaluate your psychological fit, technical readiness, 
                  and career alignment for a future in React.js development.
                </p>
              </CardHeader>
              <CardContent className="text-center">
                <div className="flex justify-center items-center space-x-6 mb-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <BookOpen className="w-4 h-4" />
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
                  onClick={goToNextSection} 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                >
                  Start Assessment
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </CardContent>
            </Card>

            {/* What is React.js */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                  <span>What is React.js?</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  React.js is a powerful <strong>JavaScript library</strong> that specializes in 
                  <strong> building user interfaces</strong> for web applications. It empowers developers 
                  to create dynamic, interactive, and scalable front-end experiences using component-based architecture.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Component-Based</h4>
                    <p className="text-sm text-blue-700">Build encapsulated components that manage their own state</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Virtual DOM</h4>
                    <p className="text-sm text-green-700">Optimize performance with efficient DOM updates</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">Ecosystem</h4>
                    <p className="text-sm text-purple-700">Used by Facebook, Netflix, Airbnb, and thousands more</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Career Paths */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-6 h-6 text-blue-600" />
                  <span>Career Opportunities</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { title: 'React.js Developer', description: 'Build dynamic user interfaces and web applications' },
                    { title: 'Frontend Engineer', description: 'Craft seamless user experiences with modern tools' },
                    { title: 'Full Stack Developer', description: 'Combine React with backend technologies' },
                    { title: 'UI Engineer', description: 'Bridge design and development with React' },
                    { title: 'Mobile Developer', description: 'Build mobile apps with React Native' },
                    { title: 'Software Engineer', description: 'General development with React expertise' }
                  ].map((career, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">{career.title}</h4>
                      <p className="text-sm text-gray-600">{career.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Ideal Traits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-6 h-6 text-blue-600" />
                  <span>Ideal Traits & Skills</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    'Strong analytical thinking',
                    'Process-oriented mindset', 
                    'Logical problem-solving',
                    'Interest in user interfaces',
                    'Comfort with JavaScript',
                    'Attention to detail'
                  ].map((trait, index) => (
                    <div key={index} className="flex items-center space-x-2 p-3 rounded-lg bg-gray-50">
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      <span className="text-sm">{trait}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 'psychometric':
      case 'technical':
      case 'wiscar':
        const questions = getCurrentQuestions();
        const currentQ = questions[currentQuestion];
        const questionProgress = getCurrentQuestionProgress();
        const questionKey = `${currentSection}_${currentQuestion}`;
        const selectedAnswer = answers[questionKey];

        return (
          <div className="max-w-4xl mx-auto">
            <Card className={`border-2 ${
              currentSection === 'psychometric' ? 'border-purple-200' :
              currentSection === 'technical' ? 'border-green-200' :
              'border-orange-200'
            }`}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {currentSection === 'psychometric' && <Brain className="w-6 h-6 text-purple-600" />}
                  {currentSection === 'technical' && <Code className="w-6 h-6 text-green-600" />}
                  {currentSection === 'wiscar' && <Target className="w-6 h-6 text-orange-600" />}
                  <span>
                    {currentSection === 'psychometric' && 'Psychological Fit Assessment'}
                    {currentSection === 'technical' && 'Technical Aptitude Assessment'}
                    {currentSection === 'wiscar' && 'WISCAR Framework Analysis'}
                  </span>
                </CardTitle>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Question {currentQuestion + 1} of {questions.length}</span>
                    <span>{Math.round(questionProgress)}% Complete</span>
                  </div>
                  <Progress value={questionProgress} className="h-2" />
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm font-medium text-gray-700 mb-2">
                    {currentQ.category}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {currentQ.question}
                  </h3>
                  <RadioGroup
                    value={selectedAnswer || ''}
                    onValueChange={handleAnswerChange}
                    className="space-y-3"
                  >
                    {currentQ.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem 
                          value={option.value} 
                          id={`${questionKey}-option-${index}`} 
                        />
                        <Label 
                          htmlFor={`${questionKey}-option-${index}`} 
                          className="text-sm cursor-pointer flex-1 py-2 px-3 rounded hover:bg-white/50 transition-colors"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Show explanation for technical questions */}
                {currentSection === 'technical' && currentQ.explanation && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Explanation:</h4>
                    <p className="text-sm text-blue-800">{currentQ.explanation}</p>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    {currentSection === 'psychometric' && 'Evaluating: Psychological Fit'}
                    {currentSection === 'technical' && 'Evaluating: Technical Readiness'}
                    {currentSection === 'wiscar' && 'Evaluating: WISCAR Dimensions'}
                  </div>
                  <div className="flex space-x-2">
                    {currentQuestion > 0 && (
                      <Button 
                        onClick={handlePrevious}
                        variant="outline"
                        className="border-gray-200 text-gray-600 hover:bg-gray-50"
                      >
                        <ArrowLeft className="mr-2 w-4 h-4" />
                        Previous
                      </Button>
                    )}
                    <Button 
                      onClick={handleNext}
                      disabled={!selectedAnswer}
                      className={
                        currentSection === 'psychometric' ? 'bg-purple-600 hover:bg-purple-700' :
                        currentSection === 'technical' ? 'bg-green-600 hover:bg-green-700' :
                        'bg-orange-600 hover:bg-orange-700'
                      }
                    >
                      {currentQuestion === questions.length - 1 ? 'Complete Section' : 'Next Question'}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 'results':
        const recommendation = calculateOverallRecommendation();
        const RecommendationIcon = recommendation.icon;

        const careerPaths = [
          {
            title: 'React.js Developer',
            description: 'Build dynamic user interfaces and web applications',
            skillMatch: Math.max(assessmentData.technical?.categories?.['JavaScript Foundations'] || 0, 70),
            requirements: ['JavaScript', 'React.js', 'Component Architecture']
          },
          {
            title: 'Frontend Engineer',
            description: 'Craft seamless user experiences with modern tools',
            skillMatch: Math.max(assessmentData.technical?.categories?.['Basic Web Knowledge'] || 0, 75),
            requirements: ['HTML/CSS', 'JavaScript', 'UI/UX Design']
          },
          {
            title: 'Full Stack Developer',
            description: 'Combine React with backend technologies',
            skillMatch: Math.max(assessmentData.wiscar?.dimensions?.['Skill (Current Level)'] || 0, 70),
            requirements: ['Frontend', 'Backend', 'Database', 'APIs']
          },
          {
            title: 'UI Engineer',
            description: 'Bridge design and development with React',
            skillMatch: Math.max(assessmentData.psychometric?.categories?.['Cognitive Style'] || 0, 65),
            requirements: ['Design Systems', 'Component Libraries', 'Accessibility']
          }
        ];

        const learningPath = [
          {
            stage: 'Foundation',
            modules: ['JavaScript Basics', 'HTML/CSS Fundamentals', 'React.js Introduction'],
            duration: '2-4 weeks',
            completed: false
          },
          {
            stage: 'Intermediate',
            modules: ['Component Lifecycle', 'State Management', 'Hooks & Effects'],
            duration: '6-8 weeks',
            completed: false
          },
          {
            stage: 'Advanced',
            modules: ['Custom Hooks', 'Context API', 'Performance Optimization'],
            duration: '8-12 weeks',
            completed: false
          },
          {
            stage: 'Professional',
            modules: ['Testing', 'Deployment', 'Best Practices'],
            duration: '4-6 weeks',
            completed: false
          }
        ];

        const alternatives = [
          { title: 'Vue.js Development', reason: 'Similar component-based approach, gentler learning curve' },
          { title: 'Angular Development', reason: 'Full-featured framework with enterprise focus' },
          { title: 'Backend Development', reason: 'Server-side programming without UI complexity' },
          { title: 'DevOps Engineering', reason: 'Infrastructure and deployment automation' }
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
                  Recommendation: {recommendation.recommendation}
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
                          {assessmentData.psychometric?.overall || 0}%
                        </span>
                        <Badge variant={
                          (assessmentData.psychometric?.overall || 0) >= 75 ? 'default' :
                          (assessmentData.psychometric?.overall || 0) >= 60 ? 'secondary' : 'destructive'
                        }>
                          {(assessmentData.psychometric?.overall || 0) >= 75 ? 'Excellent' :
                           (assessmentData.psychometric?.overall || 0) >= 60 ? 'Good' : 'Needs Work'}
                        </Badge>
                      </div>
                      <Progress value={assessmentData.psychometric?.overall || 0} className="h-3" />
                    </div>
                    <div className="space-y-2">
                      {assessmentData.psychometric?.categories && Object.entries(assessmentData.psychometric.categories).map(([category, score]) => (
                        <div key={category} className="flex justify-between text-sm">
                          <span className="text-gray-600">{category.replace(/\(.*\)/, '').trim()}</span>
                          <span className="font-medium">{typeof score === 'number' ? score : 0}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Code className="w-5 h-5 text-green-600" />
                    <span>Technical Readiness</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-2xl font-bold text-green-600">
                          {assessmentData.technical?.overall || 0}%
                        </span>
                        <Badge variant={
                          (assessmentData.technical?.overall || 0) >= 75 ? 'default' :
                          (assessmentData.technical?.overall || 0) >= 60 ? 'secondary' : 'destructive'
                        }>
                          {(assessmentData.technical?.overall || 0) >= 75 ? 'Strong' :
                           (assessmentData.technical?.overall || 0) >= 60 ? 'Moderate' : 'Developing'}
                        </Badge>
                      </div>
                      <Progress value={assessmentData.technical?.overall || 0} className="h-3" />
                    </div>
                    <div className="text-sm text-gray-600">
                      Correct: {assessmentData.technical?.correctAnswers || 0} / {assessmentData.technical?.totalQuestions || 0}
                    </div>
                    <div className="space-y-2">
                      {assessmentData.technical?.categories && Object.entries(assessmentData.technical.categories).map(([category, score]) => (
                        <div key={category} className="flex justify-between text-sm">
                          <span className="text-gray-600">{category}</span>
                          <span className="font-medium">{typeof score === 'number' ? score : 0}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-orange-600" />
                    <span>WISCAR Analysis</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-2xl font-bold text-orange-600">
                          {assessmentData.wiscar?.overall || 0}%
                        </span>
                        <Badge variant="outline" className="bg-orange-50 text-orange-700">
                          {assessmentData.wiscar?.quadrant || 'Assessment Needed'}
                        </Badge>
                      </div>
                      <Progress value={assessmentData.wiscar?.overall || 0} className="h-3" />
                    </div>
                    <div className="space-y-2">
                      {assessmentData.wiscar?.dimensions && Object.entries(assessmentData.wiscar.dimensions).map(([dimension, score]) => (
                        <div key={dimension} className="flex justify-between text-sm">
                          <span className="text-gray-600">{dimension.split(' ')[0]}</span>
                          <span className="font-medium">{typeof score === 'number' ? score : 0}%</span>
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
            {recommendation.recommendation === 'YES' && (
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
                      <li>• Join the React.js Developer Community</li>
                      <li>• Set up a development environment with Node.js</li>
                      <li>• Start with "React.js Fundamentals" course</li>
                      <li>• Practice with hands-on projects and tutorials</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Alternative Recommendations */}
            {recommendation.recommendation !== 'YES' && (
              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="w-6 h-6 text-blue-600" />
                    <span>Alternative Career Paths</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Based on your assessment results, here are some alternative technology paths that might be a better fit:
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
                onClick={() => setCurrentSection('intro')}
              >
                Retake Assessment
              </Button>
              {recommendation.recommendation === 'YES' && (
                <Button variant="outline" className="border-green-500 text-green-700 hover:bg-green-50">
                  View Learning Resources
                  <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AssessmentLayout>
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Is React.js Right for You?
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
              const isActive = section.id === currentSection;
              const isCompleted = getCurrentSectionIndex() > index;
              
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
        {renderCurrentSection()}
      </div>
    </AssessmentLayout>
  );
};

export default Index;
