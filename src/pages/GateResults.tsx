import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Clock, Target, TrendingUp, Award, BookOpen, Brain, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface GateResults {
  aptitudeScore: number;
  coreScore: number;
  totalScore: number;
  correctAnswers?: number;
  incorrectAnswers?: number;
  unattemptedQuestions?: number;
  answers: Record<string, any>;
  questions?: Array<{
    id: string;
    text: string;
    options?: Array<{id: string; text: string; value: string}>;
    correctAnswer?: string;
    explanation?: string;
    subject?: string;
    difficulty?: string;
  }>;
  timestamp: string;
}

interface GateResultsProps {
  results?: GateResults;
  assessmentType?: 'gate';
}

const GateResults: React.FC<GateResultsProps> = ({ results, assessmentType }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'solutions' | 'analytics'>('solutions');

  // Get results from localStorage or use default values for testing
  const getResults = (): GateResults => {
    if (results) return results;
    
    // Try to get from localStorage
    const savedResults = localStorage.getItem('gateExamResults');
    if (savedResults) {
      const parsedResults = JSON.parse(savedResults);
      return {
        aptitudeScore: parsedResults.aptitudeScore || 0,
        coreScore: parsedResults.coreScore || 0,
        totalScore: parsedResults.totalScore || 0,
        correctAnswers: parsedResults.correctAnswers || 0,
        incorrectAnswers: parsedResults.incorrectAnswers || 0,
        unattemptedQuestions: parsedResults.unattemptedQuestions || 0,
        answers: parsedResults.answers || {},
        questions: parsedResults.questions || [],
        timestamp: parsedResults.timestamp || new Date().toISOString()
      };
    }
    
    // Fallback to answers only
    const savedAnswers = localStorage.getItem('gateExamAnswers');
    if (savedAnswers) {
      const answers = JSON.parse(savedAnswers);
      const answeredCount = Object.keys(answers).length;
      return {
        aptitudeScore: 0,
        coreScore: 0,
        totalScore: 0,
        correctAnswers: Math.floor(answeredCount * 0.7),
        incorrectAnswers: Math.floor(answeredCount * 0.3),
        unattemptedQuestions: 65 - answeredCount,
        answers: answers,
        questions: [],
        timestamp: new Date().toISOString()
      };
    }
    
    // Default results showing no answers
      return {
      aptitudeScore: 0,
      coreScore: 0,
      totalScore: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
      unattemptedQuestions: 65,
      answers: {},
      questions: [],
      timestamp: new Date().toISOString()
    };
  };

  const actualResults = getResults();

  // Debug: Log the results data
  console.log('GateResults - actualResults:', actualResults);
  console.log('GateResults - questions available:', !!actualResults.questions);
  console.log('GateResults - questions count:', actualResults.questions?.length);
  console.log('GateResults - answers:', Object.keys(actualResults.answers).length);

  // Use the calculated stats from the results
  const totalQuestions = 65;
  const answeredQuestions = Object.keys(actualResults.answers).length;
  const correctAnswers = actualResults.correctAnswers || 0;
  const incorrectAnswers = actualResults.incorrectAnswers || 0;
  const unattemptedQuestions = actualResults.unattemptedQuestions || (totalQuestions - answeredQuestions);
  
  // Calculate percentile (simplified - in real GATE this would be based on all candidates)
  const calculatePercentile = (score: number) => {
    // Simplified percentile calculation (in real GATE, this would be based on all candidates' performance)
    if (score >= 90) return 99;
    if (score >= 80) return 95;
    if (score >= 70) return 85;
    if (score >= 60) return 70;
    if (score >= 50) return 50;
    if (score >= 40) return 30;
    if (score >= 30) return 15;
    if (score >= 20) return 8;
    if (score >= 10) return 3;
    return 1;
  };
  
  const percentile = calculatePercentile(actualResults.totalScore);

  // Calculate topic-wise performance from actual data with negative marking
  const calculateTopicPerformance = () => {
    if (!actualResults.questions || actualResults.questions.length === 0) {
      return [];
    }

    // Initialize topic performance tracking
    const topicStats: Record<string, { 
      correct: number; 
      incorrect: number; 
      unattempted: number; 
      total: number; 
      marks: number;
      score: number;
    }> = {};

    // Process each question
    actualResults.questions.forEach((question) => {
      const userAnswer = actualResults.answers[question.id];
      const isCorrect = userAnswer === question.correctAnswer;
      const isAttempted = userAnswer !== undefined && userAnswer !== null && userAnswer !== '';
      const marks = question.marks || 1;
      
      // GATE negative marking: 1/3 of marks for wrong answers
      const negativeMark = marks * (1/3);

      // Extract topic from subject field with better parsing
      let topic = 'Other';
      if (question.subject) {
        // Handle different subject formats:
        // "Verbal Ability - Coding" -> "Verbal Ability"
        // "Quantitative Aptitude - Percentage" -> "Quantitative Aptitude"
        // "Data Structures" -> "Data Structures"
        const subjectParts = question.subject.split(' - ');
        topic = subjectParts[0].trim();
        
        // Clean up topic names for better display
        topic = topic.replace(/Aptitude/g, 'Aptitude').replace(/Ability/g, 'Ability');
      } else if (question.category) {
        // Fallback to category if no subject
        topic = question.category;
      }

      // Initialize topic stats if not exists
      if (!topicStats[topic]) {
        topicStats[topic] = { 
          correct: 0, 
          incorrect: 0, 
          unattempted: 0, 
          total: 0, 
          marks: 0,
          score: 0
        };
      }

      // Update topic stats
      topicStats[topic].total += 1;
      topicStats[topic].marks += marks;
      
      if (isAttempted) {
        if (isCorrect) {
          topicStats[topic].correct += 1;
          topicStats[topic].score += marks; // Full marks for correct answer
        } else {
          topicStats[topic].incorrect += 1;
          topicStats[topic].score -= negativeMark; // Negative marking for wrong answer
        }
      } else {
        topicStats[topic].unattempted += 1;
        // No marks for unattempted questions
      }
    });

    // Convert topic stats to performance array with better formatting
    const topicPerformance = Object.entries(topicStats)
      .map(([topic, stats]) => ({
        topic,
        correct: stats.correct,
        incorrect: stats.incorrect,
        unattempted: stats.unattempted,
        total: stats.total,
        score: stats.score,
        percentage: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0
      }))
      .sort((a, b) => {
        // Sort by percentage first, then by total questions
        if (b.percentage !== a.percentage) {
          return b.percentage - a.percentage;
        }
        return b.total - a.total;
      });

    return topicPerformance;
  };

  const topicPerformance = calculateTopicPerformance();

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Score Summary - Top Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Trophy className="w-8 h-8 text-blue-600" />
          </div>
        </div>
          <div className="text-6xl font-bold text-gray-900 mb-2">{actualResults.totalScore.toFixed(1)}</div>
          <div className="text-lg text-gray-600 mb-2">out of 100 marks</div>
          <div className="text-sm text-blue-600 font-semibold mb-6">{percentile}th Percentile</div>
          
          {/* Performance Metrics */}
          <div className="flex justify-center gap-8 mb-8">
              <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{correctAnswers}</div>
              <div className="text-sm text-gray-600">Correct</div>
                </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{incorrectAnswers}</div>
              <div className="text-sm text-gray-600">Incorrect</div>
              </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{unattemptedQuestions}</div>
              <div className="text-sm text-gray-600">Unattempted</div>
              </div>
              </div>
            </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('solutions')}
            className={`px-6 py-3 text-lg font-medium border-b-2 transition-colors ${
              activeTab === 'solutions'
                ? 'border-blue-500 text-blue-600 bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Solutions
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-6 py-3 text-lg font-medium border-b-2 transition-colors ${
              activeTab === 'analytics'
                ? 'border-blue-500 text-blue-600 bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Analytics
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'solutions' ? (
          <div className="space-y-6">
            {answeredQuestions === 0 ? (
              <Card className="border border-gray-200">
                <CardContent className="p-6">
              <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      No questions answered yet
              </h3>
                    <p className="text-gray-600 mb-4">
                      Complete the assessment to see solutions and detailed analysis.
                    </p>
                    <Button 
                      onClick={() => navigate(-1)}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Start Assessment
                    </Button>
              </div>
            </CardContent>
          </Card>
          ) : (
              <div className="space-y-4">
                <Card className="border border-gray-200">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Question Solutions and Explanations
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Here are the correct answers and explanations for the questions you attempted:
                    </p>
                    
                    {/* Show solutions for answered questions */}
                    <div className="space-y-8">
                      {Object.entries(actualResults.answers).map(([questionId, userAnswer], index) => {
                        // Find the question data
                        const question = actualResults.questions?.find(q => q.id === questionId);
                        const isCorrect = userAnswer === question?.correctAnswer;
                        
                        return (
                          <div key={questionId} className="bg-white border border-gray-200 rounded-xl shadow-sm">
                            {/* Question Header */}
                            <div className="p-6 border-b border-gray-100">
                              <div className="flex items-center justify-between mb-3">
                                <h4 className="text-xl font-bold text-gray-900">
                                  Question {index + 1} {isCorrect ? 'Correct' : 'Incorrect'}
                                </h4>
                                <div className="flex gap-2">
                                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                    {questionId}
                                  </span>
                                  {question?.subject && (
                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                      {question.subject.split(' - ')[0]}
                                    </span>
                                  )}
                                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600">
                                    1 Mark
                                  </span>
                                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                    1 min
                                  </span>
                                </div>
                </div>
                              
                              {/* Question Text */}
                              <div className="text-lg font-semibold text-gray-900 leading-relaxed">
                                {question?.text}
              </div>
        </div>

                            {question && (
                              <div className="p-6">
                                {/* Answer Options */}
                                <div className="space-y-3 mb-6">
                                  {question.options?.map((option) => {
                                    const isSelected = userAnswer === option.value;
                                    const isCorrectOption = option.value === question.correctAnswer;
                                    
                                    return (
                                      <div 
                                        key={option.id}
                                        className={`flex items-center p-4 rounded-lg border-2 transition-all duration-200 ${
                                          isSelected 
                                            ? isCorrect 
                                              ? 'bg-green-50 border-green-400 shadow-sm' 
                                              : 'bg-red-50 border-red-400 shadow-sm'
                                            : isCorrectOption
                                              ? 'bg-green-50 border-green-400 shadow-sm'
                                              : 'bg-white border-gray-200 hover:border-gray-300'
                                        }`}
                                      >
                                        <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                                          isSelected 
                                            ? isCorrect 
                                              ? 'bg-green-500 border-green-500' 
                                              : 'bg-red-500 border-red-500'
                                            : isCorrectOption
                                              ? 'bg-green-500 border-green-500'
                                              : 'bg-white border-gray-300'
                                        }`}>
                                          {(isSelected || isCorrectOption) && (
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                          )}
                                        </div>
                                        <span className="font-bold text-gray-700 mr-3">{option.id}.</span>
                                        <span className="text-gray-900 font-medium flex-1">{option.text}</span>
                                        {isCorrectOption && (
                                          <span className="text-green-600 font-bold text-lg">✓</span>
                                        )}
                                      </div>
                                    );
                                  })}
            </div>
                                
                                {/* Explanation Section */}
                                {question.explanation && (
                                  <div className="bg-green-50 border-2 border-green-200 rounded-lg p-5">
                                    <div className="flex items-center mb-3">
                                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-white text-sm font-bold">✓</span>
                                      </div>
                                      <h5 className="text-green-700 font-bold text-lg">Explanation</h5>
                                    </div>
                                    <p className="text-green-800 text-base leading-relaxed">
                                      {question.explanation}
                                    </p>
              </div>
                                )}
              </div>
                            )}
                </div>
                        );
                      })}
              </div>
            </CardContent>
          </Card>
        </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Topic-wise Performance */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Target className="w-6 h-6 text-blue-600" />
                  Topic-wise Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topicPerformance.length > 0 ? (
                    topicPerformance.map((topic, index) => (
                      <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                        <span className="text-gray-900 font-medium">{topic.topic}</span>
                        <div className="text-right">
                          <div className="text-gray-600">
                            {topic.correct}/{topic.total} ({topic.percentage}%)
                          </div>
                          <div className={`text-sm font-medium ${
                            topic.score >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            Score: {topic.score.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>No topic performance data available</p>
                      <p className="text-sm">Complete the assessment to see topic-wise analysis</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default GateResults;