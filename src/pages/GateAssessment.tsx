import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Users, BookOpen, CheckCircle, Brain, Target } from 'lucide-react';
import AssessmentLayout from '@/components/AssessmentLayout';
import GateAssessment from '@/components/gate/GateAssessment';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface GateAssessmentData {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  difficulty: string;
  assessmentType: 'gate';
  gateSections: {
    aptitude: {
      title: string;
      description: string;
      type: string;
      questions: Array<{
        id: string;
        text: string;
        type: string;
        options?: Array<{
          id: string;
          text: string;
          value: string | number;
        }>;
        correctAnswer?: string | number;
        explanation?: string;
        subject?: string;
        difficulty?: string;
      }>;
      timeLimit?: number;
    };
    core: {
      title: string;
      description: string;
      type: string;
      questions: Array<{
        id: string;
        text: string;
        type: string;
        options?: Array<{
          id: string;
          text: string;
          value: string | number;
        }>;
        correctAnswer?: string | number;
        explanation?: string;
        subject?: string;
        difficulty?: string;
      }>;
      timeLimit?: number;
    };
    results: {
      title: string;
      description: string;
      type: string;
      questions: any[];
    };
  };
}

const GateAssessmentPage = () => {
  const { assessmentId, categorySlug } = useParams();
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState<GateAssessmentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showStartDialog, setShowStartDialog] = useState(true);
  const [currentStep, setCurrentStep] = useState<'intro' | 'aptitude' | 'core' | 'results'>('intro');
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://fb-backend-1-d0b6.onrender.com/api/assessments/${assessmentId}`, {
          credentials: 'include'
        });
        
        if (!response.ok) {
          throw new Error('Assessment not found');
        }
        
        const data = await response.json();
        
        // Check if it's a gate assessment
        if (data.assessmentType !== 'gate') {
          throw new Error('This is not a GATE assessment');
        }
        
        setAssessment(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load assessment');
      } finally {
        setLoading(false);
      }
    };

    if (assessmentId) {
      fetchAssessment();
    }
  }, [assessmentId]);

  const handleStartAssessment = () => {
    setShowStartDialog(false);
  };

  const handleCompleteAssessment = async (results: any) => {
    try {
      // Try to save results to backend
      const response = await fetch('https://fb-backend-1-d0b6.onrender.com/api/assessments/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          assessmentId,
          results,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        console.log('Assessment results saved to backend successfully');
      } else {
        console.warn('Failed to save assessment results to backend, but continuing with local storage');
      }
    } catch (error) {
      console.warn('Error saving assessment results to backend, but continuing with local storage:', error);
    }

    // Always navigate to results page, even if backend save fails
    // The results are already saved in localStorage by the GateAssessment component
    navigate(`/gate-results/${assessmentId}`, { 
      state: { results, assessmentType: 'gate' } 
    });
  };

  if (loading) {
    return (
      <AssessmentLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-foreground-soft">Loading GATE assessment...</p>
          </div>
        </div>
      </AssessmentLayout>
    );
  }

  if (error || !assessment) {
    return (
      <AssessmentLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </AssessmentLayout>
    );
  }

  if (showStartDialog) {
    return (
      <AssessmentLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-heading mb-4">{assessment.title}</h1>
              <p className="text-xl text-foreground-soft mb-6">{assessment.description}</p>
              <div className="flex justify-center gap-4 mb-8">
                <Badge variant="outline" className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {assessment.duration}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  {assessment.difficulty}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  GATE Assessment
                </Badge>
              </div>
            </div>

            {/* Assessment Overview */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Aptitude Section
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    {assessment.gateSections.aptitude.questions.length} questions testing your general aptitude and problem-solving skills.
                  </p>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline">15% Weight</Badge>
                    <span className="text-sm text-gray-500">
                      {assessment.gateSections.aptitude.timeLimit || 30} minutes
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Core Subject Section
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    {assessment.gateSections.core.questions.length} questions evaluating your knowledge in core subjects.
                  </p>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline">85% Weight</Badge>
                    <span className="text-sm text-gray-500">
                      {assessment.gateSections.core.timeLimit || 90} minutes
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Instructions */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Assessment Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">1</span>
                    <span>Complete the aptitude section first (10 questions, 15% weight)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">2</span>
                    <span>Then proceed to the core subject section (55 questions, 85% weight)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">3</span>
                    <span>Each section has a time limit - manage your time wisely</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">4</span>
                    <span>You can navigate between questions within a section</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">5</span>
                    <span>Once you complete a section, you cannot go back</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Start Button */}
            <div className="text-center space-y-4">
              <Button
                onClick={handleStartAssessment}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
              >
                Start GATE Assessment
              </Button>
              
            </div>
          </div>
        </div>
      </AssessmentLayout>
    );
  }

  return (
    <AssessmentLayout>
      <GateAssessment
        assessment={assessment}
        onComplete={handleCompleteAssessment}
      />
    </AssessmentLayout>
  );
};

export default GateAssessmentPage;
