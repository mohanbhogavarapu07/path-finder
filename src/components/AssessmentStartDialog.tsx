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
import { API_BASE_URL } from '@/lib/api';

interface AssessmentStartDialogProps {
  isOpen: boolean;
  onClose: () => void;
  assessmentId: string;
  assessmentTitle: string;
  categorySlug?: string;
}

const AssessmentStartDialog: React.FC<AssessmentStartDialogProps> = ({
  isOpen,
  onClose,
  assessmentId,
  assessmentTitle,
  categorySlug,
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    country: '',
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

    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }

    if (!formData.ageRange.trim()) {
      newErrors.ageRange = 'Age range is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCancel = () => {
    // Navigate back to the appropriate page (same logic as assessment back button)
    if (categorySlug) {
      navigate(`/category/${categorySlug}`);
    } else {
      navigate('/assessments');
    }
    onClose();
  };

  const handleStartAssessment = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      // Send user data to backend
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          country: formData.country,
          ageRange: formData.ageRange
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save user data');
      }

      const result = await response.json();
      
      // Store user data in localStorage with backend user ID
      const userData = {
        country: formData.country,
        ageRange: formData.ageRange,
        userId: result.user.id,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('assessmentUserData', JSON.stringify(userData));

      // Start the assessment tracking
      const startAssessmentResponse = await fetch(`${API_BASE_URL}/users/${result.user.id}/start-assessment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assessmentId: assessmentId,
          assessmentTitle: assessmentTitle,
          totalQuestions: 0 // Will be updated when assessment loads
        }),
      });

      if (!startAssessmentResponse.ok) {
        console.warn('Failed to start assessment tracking, but continuing...');
      }

      // Navigate to assessment (new nested route if category available)
      if (categorySlug) {
        navigate(`/category/${categorySlug}/${assessmentId}`);
      } else {
        navigate(`/assessments/${assessmentId}`);
      }
      onClose();
      
      // Scroll to top of the page
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Error starting assessment:', error);
      setErrors({ submit: (error as Error).message });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md border-2 border-gray-300 shadow-2xl" hideCloseButton>
        <DialogHeader className="text-center sm:text-left">
          <DialogTitle className="text-lg sm:text-xl font-bold text-factorbeam-heading">
            Start Assessment
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-factorbeam-text">
            Please provide your information to begin the {assessmentTitle} assessment.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-2 sm:py-4">
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
                <SelectItem value="11-17">11 to 17</SelectItem>
                <SelectItem value="18-24">18 to 24</SelectItem>
                <SelectItem value="25-34">25 to 34</SelectItem>
                <SelectItem value="35-44">35 to 44</SelectItem>
                <SelectItem value="45-54">45 to 54</SelectItem>
                <SelectItem value="55-64">55 to 64</SelectItem>
                <SelectItem value="65+">65 or over</SelectItem>
              </SelectContent>
            </Select>
            {errors.ageRange && (
              <p className="text-sm text-red-500">{errors.ageRange}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="country" className="text-sm font-medium text-factorbeam-heading">
              Country *
            </Label>
            <Select
              value={formData.country}
              onValueChange={(value) => handleInputChange('country', value)}
            >
              <SelectTrigger className={errors.country ? 'border-red-500 focus:border-red-500' : ''}>
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="India">India</SelectItem>
              </SelectContent>
            </Select>
            {errors.country && (
              <p className="text-sm text-red-500">{errors.country}</p>
            )}
            <p className="text-xs text-gray-500">Currently available for India only</p>
          </div>
        </div>

        {errors.submit && (
          <div className="text-sm text-red-500 text-center mb-4">
            {errors.submit}
          </div>
        )}
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-2">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="border-gray-300 text-factorbeam-text hover:bg-gray-50 w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={handleStartAssessment}
            className="bg-factorbeam-primary hover:bg-factorbeam-primary-alt text-white w-full sm:w-auto"
          >
            Start Assessment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssessmentStartDialog;
