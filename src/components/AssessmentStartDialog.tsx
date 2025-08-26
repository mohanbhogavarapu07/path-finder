import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AssessmentStartDialogProps {
  isOpen: boolean;
  onClose: () => void;
  assessmentId: string;
  assessmentTitle: string;
}

const AssessmentStartDialog: React.FC<AssessmentStartDialogProps> = ({
  isOpen,
  onClose,
  assessmentId,
  assessmentTitle,
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    ageRange: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.ageRange.trim()) {
      newErrors.ageRange = 'Age range is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStartAssessment = async () => {
    if (validateForm()) {
      // Store user data in localStorage or sessionStorage
      localStorage.setItem('assessmentUserData', JSON.stringify(formData));
      
      // Map sample assessment IDs to actual assessment routes
      const assessmentRouteMap: Record<string, string> = {
        '1': 'AWS', // Personality Assessment -> AWS
        '2': 'ReactJS', // Emotional Intelligence -> ReactJS
        '3': 'ScrumMaster', // Leadership Style -> ScrumMaster
        '4': 'DataScience', // Learning Style -> DataScience
        '5': 'CyberSecurity', // Stress and Burnout -> CyberSecurity
        '6': 'DevOps', // Career Aptitude -> DevOps
        '7': 'bussinessanalyst', // Team Dynamics -> Business Analyst
        '8': 'MedicalCoding', // Nutrition and Lifestyle -> Medical Coding
        '9': 'DigitalMarketing', // Creative Problem Solving -> Digital Marketing
        '10': 'Flutter', // Communication Skills -> Flutter
        '11': 'PowerBI', // Time Management -> PowerBI
        '12': 'Servicenow', // Conflict Resolution -> ServiceNow
        '13': 'Blockchain', // Decision Making -> Blockchain
        '14': 'MultiCloudEngineer', // Adaptability -> MultiCloud Engineer
        '15': 'GenAI', // Innovation Mindset -> GenAI
        '16': 'FullStackJAVA', // Entrepreneurship Readiness -> FullStack Java
        '17': 'Microsoft365', // Sales Aptitude -> Microsoft 365
        '18': 'OracleCloud', // Customer Service -> Oracle Cloud
        '19': 'MERNStack', // Project Management -> MERN Stack
        '20': 'PythonwithDataAnalytics', // Data Analysis -> Python with Data Analytics
        '21': 'AIML', // Design Thinking -> AI/ML
        '22': 'FullStackDotNet', // Writing Skills -> FullStack .NET
        '23': 'GoogleCloudPlatform', // Language Learning -> Google Cloud Platform
        '24': 'EthicalHacking', // Music Aptitude -> Ethical Hacking
        '25': 'snowflake', // Artistic Abilities -> Snowflake
        '26': 'fullstackpython' // Sports Performance -> FullStack Python
      };
      
      // Use mapped route if available, otherwise use the original ID
      const routeId = assessmentRouteMap[assessmentId] || assessmentId;
      
      // Close dialog and navigate to assessment
      onClose();
      navigate(`/assessments/${routeId}`);
      try {
        // Send user data to backend
        const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://pf-backend-6p4g.onrender.com/api';
        const response = await fetch(`${API_BASE_URL}/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to save user data');
        }

        const result = await response.json();
        
        // Store user data in localStorage with backend user ID
        const userDataWithId = {
          ...formData,
          userId: result.user.id
        };
        localStorage.setItem('assessmentUserData', JSON.stringify(userDataWithId));
        
        // Close dialog and navigate to assessment
        onClose();
        navigate(`/assessments/${assessmentId}`);
      } catch (error) {
        console.error('Error saving user data:', error);
        setErrors({ submit: error.message });
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-factorbeam-heading">
            Start Assessment
          </DialogTitle>
          <DialogDescription className="text-factorbeam-text">
            Please provide your information to begin the {assessmentTitle} assessment.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-factorbeam-heading">
              Full Name *
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={errors.name ? 'border-red-500 focus:border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-factorbeam-heading">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={errors.email ? 'border-red-500 focus:border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="ageRange" className="text-sm font-medium text-factorbeam-heading">
              Age Range *
            </Label>
            <Select
              value={formData.ageRange}
              onValueChange={(value) => handleInputChange('ageRange', value)}
            >
              <SelectTrigger className={errors.ageRange ? 'border-red-500 focus:border-red-500' : ''}>
                <SelectValue placeholder="Select your age range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="11-20">11-20 years</SelectItem>
                <SelectItem value="21-30">21-30 years</SelectItem>
                <SelectItem value="31-40">31-40 years</SelectItem>
                <SelectItem value="41-50">41-50 years</SelectItem>
                <SelectItem value="51-60">51-60 years</SelectItem>
                <SelectItem value="61-70">61-70 years</SelectItem>
                <SelectItem value="71-80">71-80 years</SelectItem>
              </SelectContent>
            </Select>
            {errors.ageRange && (
              <p className="text-sm text-red-500">{errors.ageRange}</p>
            )}
          </div>
        </div>

        {errors.submit && (
          <div className="text-sm text-red-500 text-center mb-4">
            {errors.submit}
          </div>
        )}
        
        <DialogFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-300 text-factorbeam-text hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            onClick={handleStartAssessment}
            className="bg-factorbeam-primary hover:bg-factorbeam-primary-alt text-white"
          >
            Start Assessment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssessmentStartDialog;
