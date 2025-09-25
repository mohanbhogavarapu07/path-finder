import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Save, 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  Star, 
  FileText,
  Download,
  Code,
  CheckCircle,
  AlertCircle,
  Upload,
  FileText as FileTextIcon,
  Plus,
  Trash2
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import { API_BASE_URL } from '@/lib/api';

// Simple interface for any JSON input
interface RawAssessmentData {
  [key: string]: any;
}

// Question interface
interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'slider' | 'boolean' | 'scenario' | 'text' | 'likert';
  category: string;
  required: boolean;
  weight: number;
  orderIndex: number;
  options?: Array<{
    id: string;
    text: string;
    value: any;
    score: number;
  }>;
  scale?: {
    min: number;
    max: number;
    labels: {
      min: string;
      max: string;
    };
  };
}

// Our standardized assessment interface
interface Assessment {
  _id?: string;
  id: string;
  title: string;
  description: string;
  category: 'Emerging Technologies' | 'Engineering & Manufacturing' | 'Cognitive & Learning Intelligence' | 'Personal and emotional intelligence';
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  isActive: boolean;
  featured: boolean;
  metadata: {
    icon: string;
    gradient: string;
    userCount: string;
    tags: string[];
  };
  whatIsDescription: string;
  typicalCareers: Array<{
    title: string;
    description: string;
  }>;
  whoShouldConsider: string[];
  idealTraits: string[];
  assessmentOverview: {
    modules: string[];
    resultsInclude: string[];
  };
  sections: {
    introduction: {
      title: string;
      description: string;
      type: string;
      weight: number;
      orderIndex: number;
      questions: Question[];
      scoringConfig?: any;
    };
    psychometric: {
      title: string;
      description: string;
      type: string;
      weight: number;
      orderIndex: number;
      questions: Question[];
      scoringConfig?: any;
    };
    technical: {
      title: string;
      description: string;
      type: string;
      weight: number;
      orderIndex: number;
      questions: Question[];
      scoringConfig?: any;
    };
    wiscar: {
      title: string;
      description: string;
      type: string;
      weight: number;
      orderIndex: number;
      questions: Question[];
      scoringConfig?: any;
    };
    results: {
      title: string;
      description: string;
      type: string;
      weight: number;
      orderIndex: number;
      questions: Question[];
      scoringConfig?: any;
    };
  };
}

const AdminAssessmentEditor = () => {
  const navigate = useNavigate();
  const { assessmentId } = useParams();
  
  // Main states
  const [assessment, setAssessment] = useState<Assessment>({
    id: `assessment-${Date.now()}`,
    title: 'New Assessment',
    description: 'Assessment description',
    category: 'Emerging Technologies',
    duration: '10-15 mins',
    difficulty: 'Intermediate',
    isActive: true,
    featured: false,
    metadata: {
      icon: 'code',
      gradient: 'from-blue-500 to-blue-700',
      userCount: '1K+',
      tags: []
    },
    whatIsDescription: 'This is a new assessment',
    typicalCareers: [],
    whoShouldConsider: [],
    idealTraits: [],
    assessmentOverview: {
      modules: [],
      resultsInclude: []
    },
    sections: {
      introduction: {
        title: 'Introduction',
        description: 'Welcome to your career readiness assessment',
        type: 'introduction',
        weight: 0,
        orderIndex: 1,
        questions: []
      },
      psychometric: {
        title: 'Psychological Fit',
        description: 'Assess your personality compatibility with AI/ML careers',
        type: 'psychometric',
        weight: 25,
        orderIndex: 2,
        questions: []
      },
      technical: {
        title: 'Technical Aptitude',
        description: 'Evaluate your coding, math, and ML knowledge',
        type: 'technical',
        weight: 30,
        orderIndex: 3,
        questions: []
      },
      wiscar: {
        title: 'FB6 Index Analysis',
        description: 'Comprehensive evaluation across 6 key dimensions',
        type: 'wiscar',
        weight: 25,
        orderIndex: 4,
        questions: []
      },
      results: {
        title: 'Your Results',
        description: 'Review your assessment results and recommendations',
        type: 'results',
        weight: 10,
        orderIndex: 5,
        questions: []
      }
    }
  });

  // UI states
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'form' | 'json'>('json'); // Start with JSON view
  const [rawJsonInput, setRawJsonInput] = useState('');
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<'psychometric' | 'technical' | 'wiscar'>('psychometric');

    const categories = [
    'Emerging Technologies',
    'Engineering & Manufacturing',
    'Cognitive & Learning Intelligence',
    'Personal and emotional intelligence'
  ];
  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

  useEffect(() => {
    if (assessmentId) {
      fetchAssessment();
    }
  }, [assessmentId]);

  const fetchAssessment = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/admin/assessments/${assessmentId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (!response.ok) {
        if (response.status === 401) {
          navigate('/admin');
          return;
        }
        if (response.status === 404) {
          toast.error('Assessment not found. Creating new assessment instead.');
          navigate('/admin/new-assessment');
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched assessment data:', data);
      console.log('Assessment sections:', data.sections);
      console.log('Psychometric questions:', data.sections?.psychometric?.questions);
      console.log('Technical questions:', data.sections?.technical?.questions);
      console.log('WISCAR questions:', data.sections?.wiscar?.questions);
      
      // Clean and normalize the data structure
      const normalizedData = cleanAssessmentData(data);
      console.log('Normalized data sections:', normalizedData.sections);
      setAssessment(normalizedData);
      setRawJsonInput(JSON.stringify(normalizedData, null, 2));
      
      // Switch to form view when editing existing assessment
      setViewMode('form');
      
      toast.success('Assessment loaded successfully! You can now edit it in the form view.');
    } catch (err) {
      console.error('Error fetching assessment:', err);
      setError(err instanceof Error ? err.message : 'Failed to load assessment');
    } finally {
      setLoading(false);
    }
  };

  // Simple JSON to Assessment converter
  const convertJsonToAssessment = (jsonData: RawAssessmentData): Assessment => {
    // Helper function to safely get nested values
    const getValue = (obj: any, keys: string[], defaultValue: any) => {
      for (const key of keys) {
        if (obj && obj[key] !== undefined) {
          return obj[key];
        }
      }
      return defaultValue;
    };

         // Helper function to convert questions
     const convertQuestions = (questions: any[]): Question[] => {
       if (!Array.isArray(questions)) return [];
       
       return questions.map((q, index) => {
         // Convert question type to valid enum values
         let questionType = getValue(q, ['type', 'questionType'], 'multiple-choice') as string;
         if (questionType === 'scale') questionType = 'slider';
         if (questionType === 'multiple') questionType = 'multiple-choice';
         
         // Convert options to proper format
         let options = getValue(q, ['options', 'choices', 'answers'], []);
         if (Array.isArray(options)) {
           options = options.map((opt, optIndex) => {
             if (typeof opt === 'string') {
               return {
                 id: `opt-${Date.now()}-${optIndex}`,
                 text: opt,
                 value: opt.toLowerCase().replace(/\s+/g, '_'),
                 score: optIndex + 1
               };
             }
             return opt;
           });
         }
         
         return {
           id: getValue(q, ['id', 'questionId', 'qid'], `q-${index + 1}`),
           text: getValue(q, ['text', 'question', 'content', 'title'], 'Question'),
           type: questionType as 'multiple-choice' | 'slider' | 'boolean' | 'scenario' | 'text' | 'likert',
           category: getValue(q, ['category', 'section'], 'general'),
           required: getValue(q, ['required'], true),
           weight: getValue(q, ['weight', 'score'], 1),
           orderIndex: getValue(q, ['orderIndex', 'order'], index + 1),
           options: options,
           scale: getValue(q, ['scale', 'range', 'slider'], null)
         };
       });
     };

    // Create the assessment object
    const convertedAssessment: Assessment = {
      id: getValue(jsonData, ['id', 'assessmentId', '_id'], `assessment-${Date.now()}`),
      title: getValue(jsonData, ['title', 'name', 'assessmentName'], 'Untitled Assessment'),
      description: getValue(jsonData, ['description', 'summary', 'desc', 'about'], 'No description provided'),
      category: getValue(jsonData, ['category', 'type'], 'Technology'),
      duration: getValue(jsonData, ['duration', 'time', 'estimatedTime'], '10-15 mins'),
      difficulty: getValue(jsonData, ['difficulty', 'level', 'complexity'], 'Intermediate'),
      isActive: getValue(jsonData, ['isActive', 'active'], true),
      featured: getValue(jsonData, ['featured', 'highlighted'], false),
      metadata: {
        icon: getValue(jsonData, ['metadata.icon', 'icon', 'assessmentIcon'], 'code'),
        gradient: getValue(jsonData, ['metadata.gradient', 'gradient', 'colorScheme'], 'from-blue-500 to-blue-700'),
        userCount: getValue(jsonData, ['metadata.userCount', 'userCount', 'participants'], '1K+'),
        tags: getValue(jsonData, ['metadata.tags', 'tags', 'keywords'], [])
      },
      whatIsDescription: getValue(jsonData, ['whatIsDescription', 'about', 'introduction'], ''),
      typicalCareers: getValue(jsonData, ['typicalCareers', 'careers', 'jobRoles'], []),
      whoShouldConsider: getValue(jsonData, ['whoShouldConsider', 'targetAudience', 'audience'], []),
      idealTraits: getValue(jsonData, ['idealTraits', 'traits', 'qualities'], []),
             assessmentOverview: {
         modules: ['Psychological Fit', 'Technical Aptitude', 'FB6 Index Analysis', 'Results'],
         resultsInclude: ['Detailed Analysis', 'Career Recommendations', 'Skill Assessment', 'Personalized Insights']
       },
      sections: {
        introduction: {
          title: 'Introduction',
          description: 'Welcome to your career readiness assessment',
          type: 'introduction',
          weight: 0,
          orderIndex: 1,
          questions: []
        },
        psychometric: {
          title: 'Psychological Fit',
          description: 'Assess your personality compatibility with AI/ML careers',
          type: 'psychometric',
          weight: 25,
          orderIndex: 2,
          questions: []
        },
        technical: {
          title: 'Technical Aptitude',
          description: 'Evaluate your coding, math, and ML knowledge',
          type: 'technical',
          weight: 30,
          orderIndex: 3,
          questions: []
        },
        wiscar: {
          title: 'FB6 Index Analysis',
          description: 'Comprehensive evaluation across 6 key dimensions',
          type: 'wiscar',
          weight: 25,
          orderIndex: 4,
          questions: []
        },
        results: {
          title: 'Your Results',
          description: 'Review your assessment results and recommendations',
          type: 'results',
          weight: 10,
          orderIndex: 5,
          questions: []
        }
      }
    };

    // Handle questions - distribute them to the appropriate sections
    let allQuestions: Question[] = [];
    
    // Check if questions are at root level
    if (jsonData.questions) {
      allQuestions = convertQuestions(jsonData.questions);
    }
    // Check if questions are in sections
    else if (jsonData.sections) {
      Object.keys(jsonData.sections).forEach(sectionKey => {
        const section = jsonData.sections[sectionKey];
        if (section && (section.questions || section.items)) {
          const sectionQuestions = convertQuestions(section.questions || section.items);
          // Map to our standard sections
          const targetSection = sectionKey === 'intro' || sectionKey === 'introduction' ? 'introduction' :
                               sectionKey === 'psych' || sectionKey === 'psychometric' ? 'psychometric' :
                               sectionKey === 'tech' || sectionKey === 'technical' ? 'technical' :
                               sectionKey === 'wiscar' ? 'wiscar' : 'psychometric';
          
          if (targetSection === 'psychometric' || targetSection === 'technical' || targetSection === 'wiscar') {
            convertedAssessment.sections[targetSection].questions.push(...sectionQuestions);
          }
        }
      });
    }

    // Distribute questions if they're at root level
    if (allQuestions.length > 0) {
      allQuestions.forEach(q => {
        const targetSection = q.category === 'psychometric' ? 'psychometric' :
                             q.category === 'technical' ? 'technical' :
                             q.category === 'wiscar' ? 'wiscar' : 'psychometric';
        convertedAssessment.sections[targetSection].questions.push(q);
      });
    }

    return convertedAssessment;
  };

  // Handle JSON input
  const handleJsonInput = () => {
    try {
      setJsonError(null);
      
      if (!rawJsonInput.trim()) {
        setJsonError('Please enter some JSON data');
        return;
      }

      const parsedData = JSON.parse(rawJsonInput);
      const convertedAssessment = convertJsonToAssessment(parsedData);
      
      setAssessment(convertedAssessment);
      toast.success('JSON data converted successfully!');
      
      // Switch to form view to show the converted data
      setViewMode('form');
      
    } catch (err) {
      setJsonError(err instanceof Error ? err.message : 'Invalid JSON format');
    }
  };

  // Load sample data
  const loadSampleData = () => {
    const sampleData = {
      "id": "sample-assessment",
      "title": "Sample Assessment",
      "description": "This is a sample assessment",
      "category": "Technology",
      "sections": {
        "introduction": {
          "title": "Introduction",
          "description": "Welcome to this assessment",
          "type": "introduction",
          "weight": 0,
          "orderIndex": 1,
          "questions": []
        },
        "psychometric": {
          "title": "Psychological Fit",
          "description": "Assess your personality compatibility",
          "type": "psychometric",
          "weight": 25,
          "orderIndex": 2,
          "questions": [
            {
              "id": "q1",
              "text": "How do you handle stress?",
              "type": "slider",
              "category": "psychometric",
              "required": true,
              "weight": 1,
              "orderIndex": 1,
              "scale": {"min": 1, "max": 10, "labels": {"min": "Poorly", "max": "Very Well"}}
            }
          ]
        },
        "technical": {
          "title": "Technical Aptitude",
          "description": "Evaluate your technical skills",
          "type": "technical",
          "weight": 30,
          "orderIndex": 3,
          "questions": [
            {
              "id": "q2",
              "text": "What is your experience level?",
              "type": "multiple-choice",
              "category": "technical",
              "required": true,
              "weight": 1,
              "orderIndex": 1,
              "options": [
                {"id": "opt1", "text": "Beginner", "value": "beginner", "score": 1},
                {"id": "opt2", "text": "Intermediate", "value": "intermediate", "score": 2},
                {"id": "opt3", "text": "Advanced", "value": "advanced", "score": 3}
              ]
            }
          ]
        }
      }
    };
    
    setRawJsonInput(JSON.stringify(sampleData, null, 2));
    toast.success('Sample data loaded! Click "Convert JSON" to process it.');
  };

  // Add question to section
  const addQuestion = (sectionKey: 'psychometric' | 'technical' | 'wiscar') => {
    const newQuestion: Question = {
      id: `q-${Date.now()}`,
      text: 'New Question',
      type: 'multiple-choice',
      category: sectionKey,
      required: true,
      weight: 1,
      orderIndex: assessment.sections[sectionKey].questions.length + 1,
      options: [
        { id: `opt-${Date.now()}-1`, text: 'Option 1', value: 'option1', score: 1 },
        { id: `opt-${Date.now()}-2`, text: 'Option 2', value: 'option2', score: 2 }
      ]
    };

    console.log('Adding question:', newQuestion);

    setAssessment(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionKey]: {
          ...prev.sections[sectionKey],
          questions: [...prev.sections[sectionKey].questions, newQuestion]
        }
      }
    }));
  };

  // Remove question from section
  const removeQuestion = (sectionKey: 'psychometric' | 'technical' | 'wiscar', questionId: string) => {
    setAssessment(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionKey]: {
          ...prev.sections[sectionKey],
          questions: prev.sections[sectionKey].questions.filter(q => q.id !== questionId)
        }
      }
    }));
  };

  // Update question
  const updateQuestion = (sectionKey: 'psychometric' | 'technical' | 'wiscar', questionId: string, field: keyof Question, value: any) => {
    setAssessment(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionKey]: {
          ...prev.sections[sectionKey],
          questions: prev.sections[sectionKey].questions.map(q => 
            q.id === questionId ? { ...q, [field]: value } : q
          )
        }
      }
    }));
  };

    // Clean and validate assessment data before sending
  const cleanAssessmentData = (data: Assessment): Assessment => {
    const cleaned = { ...data };
    
    // Ensure all required fields are present with defaults
    cleaned.id = cleaned.id || `assessment-${Date.now()}`;
    cleaned.title = cleaned.title || 'Untitled Assessment';
    cleaned.description = cleaned.description || 'No description provided';
    cleaned.category = cleaned.category || 'Emerging Technologies';
    cleaned.duration = cleaned.duration || '10-15 mins';
    cleaned.difficulty = cleaned.difficulty || 'Intermediate';
    cleaned.isActive = cleaned.isActive !== undefined ? cleaned.isActive : true;
    cleaned.featured = cleaned.featured !== undefined ? cleaned.featured : false;
    
    // Ensure metadata is properly structured
    cleaned.metadata = {
      icon: cleaned.metadata?.icon || 'code',
      gradient: cleaned.metadata?.gradient || 'from-blue-500 to-blue-700',
      userCount: cleaned.metadata?.userCount || '1K+',
      tags: cleaned.metadata?.tags || []
    };
    
    // Ensure other fields are present
    cleaned.whatIsDescription = cleaned.whatIsDescription || '';
    cleaned.typicalCareers = cleaned.typicalCareers || [];
    cleaned.whoShouldConsider = cleaned.whoShouldConsider || [];
    cleaned.idealTraits = cleaned.idealTraits || [];
    
    // Ensure assessmentOverview has proper structure
    cleaned.assessmentOverview = {
      modules: cleaned.assessmentOverview?.modules || ['Psychological Fit', 'Technical Aptitude', 'FB6 Index Analysis', 'Results'],
      resultsInclude: cleaned.assessmentOverview?.resultsInclude || ['Detailed Analysis', 'Career Recommendations', 'Skill Assessment', 'Personalized Insights']
    };
    
    // Ensure sections are properly structured
    const defaultSections = {
      introduction: {
        title: 'Introduction',
        description: 'Welcome to your career readiness assessment',
        type: 'introduction',
        weight: 0,
        orderIndex: 1,
        questions: []
      },
      psychometric: {
        title: 'Psychological Fit',
        description: 'Assess your personality compatibility with AI/ML careers',
        type: 'psychometric',
        weight: 25,
        orderIndex: 2,
        questions: []
      },
      technical: {
        title: 'Technical Aptitude',
        description: 'Evaluate your coding, math, and ML knowledge',
        type: 'technical',
        weight: 30,
        orderIndex: 3,
        questions: []
      },
      wiscar: {
        title: 'FB6 Index Analysis',
        description: 'Comprehensive evaluation across 6 key dimensions',
        type: 'wiscar',
        weight: 25,
        orderIndex: 4,
        questions: []
      },
      results: {
        title: 'Your Results',
        description: 'Review your assessment results and recommendations',
        type: 'results',
        weight: 10,
        orderIndex: 5,
        questions: []
      }
    };
    
    // Merge existing sections with defaults
    cleaned.sections = {
      ...defaultSections,
      ...cleaned.sections
    };
    
    // Clean questions in all sections
    Object.keys(cleaned.sections).forEach(sectionKey => {
      const section = cleaned.sections[sectionKey as keyof typeof cleaned.sections];
      if (section && Array.isArray(section.questions)) {
        section.questions = section.questions.map((q, index) => {
          // Ensure question type is valid
          let questionType = q.type as string;
          if (questionType === 'scale') questionType = 'slider';
          if (questionType === 'multiple') questionType = 'multiple-choice';
          
          // Ensure options are properly formatted
          let options = q.options || [];
          if (Array.isArray(options)) {
            options = options.map((opt: any, optIndex) => {
              if (typeof opt === 'string') {
                return {
                  id: `opt-${Date.now()}-${optIndex}`,
                  text: opt,
                  value: opt.toLowerCase().replace(/\s+/g, '_'),
                  score: optIndex + 1
                };
              }
              return {
                id: opt.id || `opt-${Date.now()}-${optIndex}`,
                text: opt.text || opt,
                value: opt.value || opt.text?.toLowerCase().replace(/\s+/g, '_') || `option_${optIndex}`,
                score: opt.score || optIndex + 1
              };
            });
          }
          
          // Ensure all required fields are present
          return {
            id: q.id || `q-${Date.now()}-${index}`,
            text: q.text || 'Question',
            type: questionType as 'multiple-choice' | 'slider' | 'boolean' | 'scenario' | 'text' | 'likert',
            category: q.category || sectionKey,
            required: q.required !== undefined ? q.required : true,
            weight: q.weight || 1,
            orderIndex: q.orderIndex || index + 1,
            options: options,
            scale: q.scale || null
          };
        });
      }
    });
    
    console.log('Cleaned assessment data:', JSON.stringify(cleaned, null, 2));
    return cleaned;
  };

  // Handle save
  const handleSave = async (publish: boolean = false) => {
    try {
      setSaving(true);
      setError(null);

      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin');
        return;
      }

      // Validate required fields
      if (!assessment.id || !assessment.title || !assessment.description || !assessment.category) {
        setError('Please fill in all required fields: ID, Title, Description, and Category');
        setSaving(false);
        return;
      }

      const assessmentData = cleanAssessmentData({
        ...assessment,
        isActive: publish ? true : assessment.isActive
      });
      
      console.log('Sending assessment data:', JSON.stringify(assessmentData, null, 2));

      let response;
      if (assessmentId) {
        response = await fetch(`${API_BASE_URL}/admin/assessments/${assessmentId}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(assessmentData),
          credentials: 'include'
        });
      } else {
        response = await fetch(`${API_BASE_URL}/admin/assessments`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(assessmentData),
          credentials: 'include'
        });
      }

      if (!response.ok) {
        if (response.status === 401) {
          navigate('/admin');
          return;
        }
        
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          console.log('Backend error details:', errorData);
          if (errorData.errors && Array.isArray(errorData.errors)) {
            errorMessage = `Validation errors: ${errorData.errors.map((err: any) => `${err.field}: ${err.message}`).join(', ')}`;
          } else {
            errorMessage = errorData.message || errorData.error || errorMessage;
          }
        } catch (e) {
          // If we can't parse JSON, use default message
        }
        
        throw new Error(errorMessage);
      }

      const savedAssessment = await response.json();
      toast.success(assessmentId ? 'Assessment updated successfully!' : 'Assessment created successfully!');
      navigate('/admin');
    } catch (err) {
      console.error('Error saving assessment:', err);
      setError(err instanceof Error ? err.message : 'Failed to save assessment');
    } finally {
      setSaving(false);
    }
  };

  // Export current assessment as JSON
  const exportJson = () => {
    const dataStr = JSON.stringify(assessment, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${assessment.id || 'assessment'}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-50">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading assessment...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <Navigation />
      
      {/* Editor Header */}
      <section className="py-6 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/admin')}
                className="text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Admin
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {assessmentId ? 'Edit Assessment' : 'Create New Assessment'}
                </h1>
                <p className="text-gray-600">Import raw JSON or edit assessment data</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setViewMode(viewMode === 'form' ? 'json' : 'form')}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                {viewMode === 'form' ? <Code className="h-4 w-4 mr-2" /> : <FileTextIcon className="h-4 w-4 mr-2" />}
                {viewMode === 'form' ? 'JSON Input' : 'Form View'}
              </Button>
              
              <Button
                variant="outline"
                onClick={exportJson}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <Download className="h-4 w-4 mr-2" />
                Export JSON
              </Button>
              
              <Button
                variant="outline"
                onClick={() => handleSave(false)}
                disabled={saving}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Saving...' : 'Save Draft'}
              </Button>
              
              <Button
                onClick={() => handleSave(true)}
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                {saving ? 'Publishing...' : 'Publish'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mx-4 mt-4">
          {error}
        </div>
      )}

      {/* Editor Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {viewMode === 'json' ? (
            // JSON Input View
            <div className="space-y-6">
              <Card className="bg-white border border-gray-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Raw JSON Input
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                    <h4 className="font-medium text-blue-900 mb-2">How to use:</h4>
                    <ol className="text-blue-700 text-sm space-y-1 list-decimal list-inside">
                      <li>Paste your raw JSON data below (any format)</li>
                      <li>Click "Convert JSON" to transform it to our format</li>
                      <li>Switch to "Form View" to see the converted data</li>
                      <li>Edit if needed and save</li>
                    </ol>
                    {assessmentId && (
                      <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded">
                        <p className="text-green-700 text-sm">
                          <strong>Editing Mode:</strong> This assessment has been loaded from the database. 
                          You can edit it in the form view or modify the JSON directly.
                        </p>
                      </div>
                    )}
                  </div>
                  
                                     <div className="flex gap-2">
                     <Button onClick={handleJsonInput} className="bg-green-600 hover:bg-green-700">
                       Convert JSON
                     </Button>
                     <Button onClick={loadSampleData} variant="outline">
                       Load Sample Data
                     </Button>
                     <Button onClick={() => setRawJsonInput(JSON.stringify(assessment, null, 2))} variant="outline">
                       Load Current Data
                    </Button>
                                         {assessmentId && (
                       <Button 
                         onClick={() => {
                           setRawJsonInput(JSON.stringify(assessment, null, 2));
                           toast.success('Current assessment data loaded into JSON input!');
                         }} 
                         variant="outline"
                         className="bg-blue-100 text-blue-800"
                       >
                         Load DB Data
                       </Button>
                     )}
                     <Button 
                       onClick={() => {
                         console.log('Current assessment state:', assessment);
                         console.log('Sections:', assessment.sections);
                         console.log('Psychometric questions:', assessment.sections.psychometric.questions);
                         console.log('Technical questions:', assessment.sections.technical.questions);
                         console.log('WISCAR questions:', assessment.sections.wiscar.questions);
                         alert('Check console for current assessment data');
                       }} 
                       variant="outline"
                       className="bg-gray-100 text-gray-800"
                     >
                       Debug Data
                     </Button>
                     <Button 
                       onClick={async () => {
                         try {
                           const token = localStorage.getItem('adminToken');
                           const response = await fetch(`${API_BASE_URL}/admin/assessments/test`, {
                             method: 'POST',
                             headers: {
                               'Authorization': `Bearer ${token}`,
                               'Content-Type': 'application/json'
                             },
                             body: JSON.stringify(assessment)
                           });
                           const result = await response.json();
                           console.log('Test result:', result);
                           alert(JSON.stringify(result, null, 2));
                         } catch (error) {
                           console.error('Test error:', error);
                           alert('Test failed: ' + error.message);
                         }
                       }} 
                       variant="outline"
                       className="bg-yellow-100 text-yellow-800"
                     >
                       Test Data
                     </Button>
                     <Button 
                       onClick={async () => {
                         try {
                           const token = localStorage.getItem('adminToken');
                           const testAssessment = {
                             id: `test-assessment-${Date.now()}`,
                             title: 'Test Assessment with Questions',
                              description: 'This is a test assessment with embedded questions',
                             category: 'Technology',
                              duration: '10-15 mins',
                              difficulty: 'Intermediate',
                              isActive: true,
                              featured: false,
                              metadata: {
                                icon: 'code',
                                gradient: 'from-blue-500 to-blue-700',
                                userCount: '1K+',
                                tags: ['test', 'sample']
                              },
                              whatIsDescription: 'This is a test assessment',
                              typicalCareers: [],
                              whoShouldConsider: [],
                              idealTraits: [],
                              assessmentOverview: {
                                modules: ['Psychological Fit', 'Technical Aptitude', 'FB6 Index Analysis', 'Results'],
                                resultsInclude: ['Detailed Analysis', 'Career Recommendations', 'Skill Assessment', 'Personalized Insights']
                              },
                             sections: {
                                introduction: {
                                  title: 'Introduction',
                                  description: 'Welcome to your career readiness assessment',
                                  type: 'introduction',
                                  weight: 0,
                                  orderIndex: 1,
                                  questions: []
                                },
                               psychometric: {
                                 title: 'Psychological Fit',
                                  description: 'Assess your personality compatibility with AI/ML careers',
                                 type: 'psychometric',
                                 weight: 25,
                                 orderIndex: 2,
                                 questions: [
                                   {
                                     id: 'test-q1',
                                      text: 'How do you handle stress?',
                                     type: 'multiple-choice',
                                     category: 'psychometric',
                                     required: true,
                                     weight: 1,
                                     orderIndex: 1,
                                     options: [
                                        { id: 'opt1', text: 'Very Well', value: 'very_well', score: 3 },
                                        { id: 'opt2', text: 'Moderately', value: 'moderately', score: 2 },
                                        { id: 'opt3', text: 'Poorly', value: 'poorly', score: 1 }
                                      ]
                                    },
                                    {
                                      id: 'test-q2',
                                      text: 'Do you enjoy working with data?',
                                      type: 'multiple-choice',
                                      category: 'psychometric',
                                      required: true,
                                      weight: 1,
                                      orderIndex: 2,
                                      options: [
                                        { id: 'opt4', text: 'Yes, very much', value: 'yes_very_much', score: 3 },
                                        { id: 'opt5', text: 'Sometimes', value: 'sometimes', score: 2 },
                                        { id: 'opt6', text: 'Not really', value: 'not_really', score: 1 }
                                      ]
                                    }
                                  ]
                                },
                                technical: {
                                  title: 'Technical Aptitude',
                                  description: 'Evaluate your coding, math, and ML knowledge',
                                  type: 'technical',
                                  weight: 30,
                                  orderIndex: 3,
                                  questions: [
                                    {
                                      id: 'test-q3',
                                      text: 'What is your programming experience?',
                                      type: 'multiple-choice',
                                      category: 'technical',
                                      required: true,
                                      weight: 1,
                                      orderIndex: 1,
                                      options: [
                                        { id: 'opt7', text: 'Advanced', value: 'advanced', score: 3 },
                                        { id: 'opt8', text: 'Intermediate', value: 'intermediate', score: 2 },
                                        { id: 'opt9', text: 'Beginner', value: 'beginner', score: 1 }
                                      ]
                                    }
                                  ]
                                },
                                wiscar: {
                                  title: 'FB6 Index Analysis',
                                  description: 'Comprehensive evaluation across 6 key dimensions',
                                  type: 'wiscar',
                                  weight: 25,
                                  orderIndex: 4,
                                  questions: [
                                    {
                                      id: 'test-q4',
                                      text: 'How motivated are you to learn new technologies?',
                                      type: 'multiple-choice',
                                      category: 'wiscar',
                                      required: true,
                                      weight: 1,
                                      orderIndex: 1,
                                      options: [
                                        { id: 'opt10', text: 'Highly Motivated', value: 'highly_motivated', score: 3 },
                                        { id: 'opt11', text: 'Somewhat Motivated', value: 'somewhat_motivated', score: 2 },
                                        { id: 'opt12', text: 'Not Very Motivated', value: 'not_very_motivated', score: 1 }
                                      ]
                                    }
                                  ]
                                },
                                results: {
                                  title: 'Your Results',
                                  description: 'Review your assessment results and recommendations',
                                  type: 'results',
                                  weight: 10,
                                  orderIndex: 5,
                                  questions: []
                               }
                             }
                           };
                           
                           const response = await fetch(`${API_BASE_URL}/admin/assessments`, {
                             method: 'POST',
                             headers: {
                               'Authorization': `Bearer ${token}`,
                               'Content-Type': 'application/json'
                             },
                             body: JSON.stringify(testAssessment)
                           });
                           
                           if (response.ok) {
                             const result = await response.json();
                             console.log('Test assessment created:', result);
                              alert('Test assessment created successfully! You can now edit it.');
                           } else {
                             const error = await response.json();
                             console.error('Test assessment failed:', error);
                             alert('Test assessment failed: ' + JSON.stringify(error, null, 2));
                           }
                         } catch (error) {
                           console.error('Test error:', error);
                           alert('Test failed: ' + error.message);
                         }
                       }} 
                       variant="outline"
                       className="bg-green-100 text-green-800"
                     >
                       Create Test Assessment
                     </Button>
                   </div>
                  
                  {jsonError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                      <AlertCircle className="h-4 w-4 inline mr-2" />
                      {jsonError}
                    </div>
                  )}
                  
                  <Textarea
                    placeholder="Paste your raw JSON data here..."
                    value={rawJsonInput}
                    onChange={(e) => {
                      setRawJsonInput(e.target.value);
                      setJsonError(null);
                    }}
                    rows={25}
                    className="font-mono text-sm"
                  />
                </CardContent>
              </Card>
            </div>
          ) : (
            // Form View
            <div className="space-y-6">
              {/* Basic Information */}
              <Card className="bg-white border border-gray-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Assessment ID</label>
                      <Input
                        placeholder="unique-assessment-id"
                        value={assessment.id}
                        onChange={(e) => setAssessment(prev => ({ ...prev, id: e.target.value }))}
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Title</label>
                      <Input
                        placeholder="Assessment Title"
                        value={assessment.title}
                        onChange={(e) => setAssessment(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      placeholder="Assessment description..."
                      value={assessment.description}
                      onChange={(e) => setAssessment(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium">Category</label>
                      <select
                        value={assessment.category}
                        onChange={(e) => setAssessment(prev => ({ ...prev, category: e.target.value as any }))}
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Difficulty</label>
                      <select
                        value={assessment.difficulty}
                        onChange={(e) => setAssessment(prev => ({ ...prev, difficulty: e.target.value as any }))}
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {difficulties.map(difficulty => (
                          <option key={difficulty} value={difficulty}>{difficulty}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Duration</label>
                      <Input
                        placeholder="10-15 mins"
                        value={assessment.duration}
                        onChange={(e) => setAssessment(prev => ({ ...prev, duration: e.target.value }))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Section Navigation */}
              <Card className="bg-white border border-gray-100 shadow-sm">
                <CardHeader>
                  <CardTitle>Assessment Sections</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={activeSection === 'psychometric' ? 'default' : 'outline'}
                      onClick={() => setActiveSection('psychometric')}
                      className="flex items-center gap-2"
                    >
                      <Badge variant="secondary">{assessment.sections.psychometric.questions.length}</Badge>
                      Psychological Fit
                    </Button>
                    <Button
                      variant={activeSection === 'technical' ? 'default' : 'outline'}
                      onClick={() => setActiveSection('technical')}
                      className="flex items-center gap-2"
                    >
                      <Badge variant="secondary">{assessment.sections.technical.questions.length}</Badge>
                      Technical Aptitude
                    </Button>
                    <Button
                      variant={activeSection === 'wiscar' ? 'default' : 'outline'}
                      onClick={() => setActiveSection('wiscar')}
                      className="flex items-center gap-2"
                    >
                      <Badge variant="secondary">{assessment.sections.wiscar.questions.length}</Badge>
                      FB6 Index Analysis
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Active Section Editor */}
              <Card className="bg-white border border-gray-100 shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{assessment.sections[activeSection].title}</CardTitle>
                    <Button onClick={() => addQuestion(activeSection)} className="bg-green-600 hover:bg-green-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Question
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Section Description</label>
                    <Textarea
                      value={assessment.sections[activeSection].description}
                      onChange={(e) => setAssessment(prev => ({
                        ...prev,
                        sections: {
                          ...prev.sections,
                          [activeSection]: {
                            ...prev.sections[activeSection],
                            description: e.target.value
                          }
                        }
                      }))}
                      rows={2}
                    />
                  </div>

                  {/* Questions List */}
                  <div className="space-y-4">
                    <h4 className="font-medium">Questions ({assessment.sections[activeSection].questions.length})</h4>
                    {assessment.sections[activeSection].questions.map((question, index) => (
                      <div key={question.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Question {index + 1}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeQuestion(activeSection, question.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium">Question Text</label>
                          <Textarea
                            value={question.text}
                            onChange={(e) => updateQuestion(activeSection, question.id, 'text', e.target.value)}
                            rows={2}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium">Type</label>
                            <select
                              value={question.type}
                              onChange={(e) => updateQuestion(activeSection, question.id, 'type', e.target.value)}
                              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="multiple-choice">Multiple Choice</option>
                              <option value="slider">Slider</option>
                              <option value="boolean">Boolean</option>
                              <option value="text">Text</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium">Weight</label>
                            <Input
                              type="number"
                              value={question.weight}
                              onChange={(e) => updateQuestion(activeSection, question.id, 'weight', parseInt(e.target.value))}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {assessment.sections[activeSection].questions.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        No questions added yet. Click "Add Question" to get started.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

                             {/* Introduction Section */}
               <Card className="bg-white border border-gray-100 shadow-sm">
                 <CardHeader>
                   <CardTitle>Introduction (Theory/Content)</CardTitle>
                 </CardHeader>
                 <CardContent>
                   <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                     <p className="text-blue-700 text-sm">
                       The Introduction section is for theory and content only. 
                       Questions should be added to the other sections (Psychological Fit, Technical Aptitude, FB6 Index Analysis).
                     </p>
                   </div>
                 </CardContent>
               </Card>

              {/* Results Section Info */}
              <Card className="bg-white border border-gray-100 shadow-sm">
                <CardHeader>
                  <CardTitle>Results Section</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                    <p className="text-blue-700 text-sm">
                      The Results section is automatically handled by the result engine. 
                      No questions need to be added here.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AdminAssessmentEditor;
