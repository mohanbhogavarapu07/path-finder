import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Brain, Code, Target, Users, TrendingUp, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { QuestionCard } from '../components/QuestionCard';
import { assessmentData } from '../data/assessmentData';

type AssessmentSection = {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  questions: Array<{
    id: string;
    question: string;
    type: 'scale' | 'multiple' | 'boolean';
    options?: string[];
    scale?: { min: number; max: number; labels: string[] };
  }>;
};

const Assessment = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [startTime] = useState(new Date());

  const sections: AssessmentSection[] = [
    {
      id: 'introduction',
      title: 'Introduction',
      description: 'Welcome to the AI/ML Career Readiness Assessment',
      icon: BookOpen,
      questions: []
    },
    {
      id: 'psychological',
      title: 'Psychological Fit',
      description: 'Assess your personality compatibility with AI/ML careers',
      icon: Brain,
      questions: assessmentData.psychological
    },
    {
      id: 'technical',
      title: 'Technical Aptitude',
      description: 'Evaluate your coding, math, and ML knowledge',
      icon: Code,
      questions: assessmentData.technical
    },
    {
      id: 'wiscar',
      title: 'WISCAR Framework',
      description: 'Comprehensive evaluation across 6 key dimensions',
      icon: Target,
      questions: assessmentData.wiscar
    },
    {
      id: 'motivation',
      title: 'Motivation & Goals',
      description: 'Understand your drive and career aspirations',
      icon: TrendingUp,
      questions: assessmentData.motivation
    },
    {
      id: 'preferences',
      title: 'Learning Preferences',
      description: 'Identify your preferred learning style',
      icon: Users,
      questions: assessmentData.preferences
    }
  ];

  const totalQuestions = sections.reduce((acc, section) => acc + section.questions.length, 0);
  const currentQuestionIndex = sections.slice(0, currentSection).reduce((acc, section) => acc + section.questions.length, 0) + currentQuestion;
  const progress = (currentQuestionIndex / totalQuestions) * 100;

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const nextQuestion = () => {
    const currentSectionData = sections[currentSection];
    
    if (currentQuestion < currentSectionData.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else if (currentSection < sections.length - 1) {
      setCurrentSection(prev => prev + 1);
      setCurrentQuestion(0);
    } else {
      // Assessment complete
      const endTime = new Date();
      const duration = Math.round((endTime.getTime() - startTime.getTime()) / 1000 / 60); // in minutes
      
      navigate('/results', {
        state: {
          answers,
          duration,
          sections: sections.map(s => ({ id: s.id, title: s.title }))
        }
      });
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    } else if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
      setCurrentQuestion(sections[currentSection - 1].questions.length - 1);
    }
  };

  const currentSectionData = sections[currentSection];
  const currentQuestionData = currentSectionData.questions[currentQuestion];

  // Introduction screen
  if (currentSection === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <Badge className="mb-6 px-4 py-2 text-sm font-medium primary-gradient text-white">
              <Brain className="w-4 h-4 mr-2" />
              AI/ML Career Assessment
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              🧪 Test Introduction
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              You're about to take a comprehensive assessment that will help you understand your readiness for an AI/ML career.
            </p>
          </div>

          <Card className="assessment-card mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">🎯 What You'll Discover</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">🧠 What Is AI/ML?</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• <strong>Artificial Intelligence (AI):</strong> The simulation of human intelligence in machines</li>
                    <li>• <strong>Machine Learning (ML):</strong> A subset of AI where systems learn from data</li>
                    <li>• Used for predictions, recommendations, automation, and more</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">👥 Who Thrives in AI/ML?</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Logical and systems thinkers</li>
                    <li>• Curious and analytical minds</li>
                    <li>• Persistent problem-solvers</li>
                    <li>• High tolerance for ambiguity</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="assessment-card mb-8">
            <CardHeader>
              <CardTitle>📊 Assessment Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-neural-blue/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Brain className="w-6 h-6 text-neural-blue" />
                  </div>
                  <h3 className="font-semibold">Duration</h3>
                  <p className="text-sm text-muted-foreground">20-30 minutes</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-neural-purple/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Target className="w-6 h-6 text-neural-purple" />
                  </div>
                  <h3 className="font-semibold">Sections</h3>
                  <p className="text-sm text-muted-foreground">5 comprehensive modules</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-neural-cyan/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-neural-cyan" />
                  </div>
                  <h3 className="font-semibold">Questions</h3>
                  <p className="text-sm text-muted-foreground">{totalQuestions} total questions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button 
              size="lg" 
              className="px-12 py-6 text-lg primary-gradient hover:opacity-90 transition-opacity"
              onClick={nextQuestion}
            >
              Begin Assessment
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Section color and icon mapping for navigation and progress bar
  const sectionStyles: Record<string, { color: string; icon: React.ReactNode; border: string; bg: string; text: string }> = {
    psychological: { color: 'bg-purple-100', icon: <Brain className="w-4 h-4 text-purple-600" />, border: 'border-purple-200', bg: 'bg-purple-50', text: 'text-purple-700' },
    technical: { color: 'bg-green-100', icon: <Code className="w-4 h-4 text-green-600" />, border: 'border-green-200', bg: 'bg-green-50', text: 'text-green-700' },
    wiscar: { color: 'bg-orange-100', icon: <Target className="w-4 h-4 text-orange-600" />, border: 'border-orange-200', bg: 'bg-orange-50', text: 'text-orange-700' },
    motivation: { color: 'bg-blue-100', icon: <TrendingUp className="w-4 h-4 text-blue-600" />, border: 'border-blue-200', bg: 'bg-blue-50', text: 'text-blue-700' },
    preferences: { color: 'bg-red-100', icon: <Users className="w-4 h-4 text-red-600" />, border: 'border-red-200', bg: 'bg-red-50', text: 'text-red-700' },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Section Navigation Bar */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4 overflow-x-auto">
            {sections.slice(1).map((section, idx) => {
              const isActive = currentSection === idx + 1;
              const isCompleted = currentSection > idx + 1;
              const style = sectionStyles[section.id] || { color: 'bg-gray-100', icon: null };
              return (
                <div
                  key={section.id}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg min-w-fit transition-colors select-none
                    ${isActive ? `${style.color} text-blue-700 border-2 border-blue-300` :
                      isCompleted ? `bg-green-100 text-green-700` :
                      'bg-gray-100 text-gray-500'}
                  `}
                >
                  {style.icon}
                  <span className="text-sm font-medium">{section.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Section Header and Per-Section Progress Bar */}
      <div className="border-b border-border/50 bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {sectionStyles[currentSectionData.id]?.icon}
              <div>
                <h1 className="text-xl font-semibold">{currentSectionData.title}</h1>
                <p className="text-sm text-muted-foreground">{currentSectionData.description}</p>
              </div>
            </div>
            <Badge variant="outline">
              Question {currentQuestion + 1} of {currentSectionData.questions.length}
            </Badge>
          </div>
          {/* Per-section progress bar */}
          <div className="mt-4">
            <Progress value={((currentQuestion + 1) / currentSectionData.questions.length) * 100} className="h-2" />
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="container mx-auto px-4 py-8">
        <Card className={`border-2 ${sectionStyles[currentSectionData.id]?.border || 'border-gray-200'}`}> 
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {sectionStyles[currentSectionData.id]?.icon}
              <span>{currentSectionData.title}</span>
            </CardTitle>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Question {currentQuestion + 1} of {currentSectionData.questions.length}</span>
                <span>{Math.round(((currentQuestion + 1) / currentSectionData.questions.length) * 100)}% Complete</span>
              </div>
              <Progress value={((currentQuestion + 1) / currentSectionData.questions.length) * 100} className="h-2" />
            </div>
          </CardHeader>
          <CardContent className={`space-y-6 ${sectionStyles[currentSectionData.id]?.bg || ''}`}> 
            <QuestionCard
              question={currentQuestionData}
              answer={answers[currentQuestionData.id]}
              onAnswer={handleAnswer}
            />
            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevQuestion}
                disabled={currentSection === 0 && currentQuestion === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <div className="flex items-center gap-2">
                {currentSectionData.questions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentQuestion ? 'bg-primary' : 
                      index < currentQuestion ? 'bg-primary/50' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
              <Button
                onClick={nextQuestion}
                disabled={!answers[currentQuestionData.id]}
                className={sectionStyles[currentSectionData.id]?.color || 'bg-blue-600 text-white'}
              >
                {currentSection === sections.length - 1 && currentQuestion === currentSectionData.questions.length - 1 
                  ? 'Complete Assessment' 
                  : 'Next'
                }
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Assessment;