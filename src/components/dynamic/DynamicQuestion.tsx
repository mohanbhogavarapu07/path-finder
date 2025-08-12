import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Question } from '@/lib/api';

interface DynamicQuestionProps {
  question: Question;
  onAnswer: (value: any) => void;
  currentAnswer?: any;
  isRequired?: boolean;
}

const DynamicQuestion: React.FC<DynamicQuestionProps> = ({
  question,
  onAnswer,
  currentAnswer,
  isRequired = false
}) => {
  const handleLikertAnswer = (value: string) => {
    // Map text value back to number for backend
    const mapTextValueToBackend = (textValue: string) => {
      switch (textValue) {
        case 'strongly_disagree': return 1;
        case 'disagree': return 2;
        case 'neutral': return 3;
        case 'agree': return 4;
        case 'strongly_agree': return 5;
        default: return 3;
      }
    };
    
    const backendValue = mapTextValueToBackend(value);
    console.log('Likert answer processed:', { textValue: value, backendValue, questionId: question.id });
    onAnswer(backendValue);
  };

  const handleMultipleChoiceAnswer = (value: string) => {
    const option = question.options?.find(opt => opt.value.toString() === value);
    onAnswer(option ? option.value : value);
  };

  const handleSliderAnswer = (values: number[]) => {
    onAnswer(values[0]);
  };

  const handleTextAnswer = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onAnswer(event.target.value);
  };

  const handleBooleanAnswer = (value: boolean) => {
    onAnswer(value);
  };

  const renderLikertScale = () => {
    // Create scale options with only text labels, no numbers
    const scaleOptions = [
      { value: 'strongly_disagree', label: 'Strongly Disagree' },
      { value: 'disagree', label: 'Disagree' },
      { value: 'neutral', label: 'Neutral' },
      { value: 'agree', label: 'Agree' },
      { value: 'strongly_agree', label: 'Strongly Agree' }
    ];

    // Map backend values to text values for display
    const mapBackendValueToText = (backendValue: any) => {
      if (!backendValue) return '';
      
      const numValue = parseInt(backendValue);
      switch (numValue) {
        case 1: return 'strongly_disagree';
        case 2: return 'disagree';
        case 3: return 'neutral';
        case 4: return 'agree';
        case 5: return 'strongly_agree';
        default: return '';
      }
    };

    return (
      <RadioGroup
        value={mapBackendValueToText(currentAnswer)}
        onValueChange={handleLikertAnswer}
        className="space-y-4"
      >
        {scaleOptions.map((option, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <RadioGroupItem 
              value={option.value} 
              id={`likert-${question.id}-${option.value}`}
              className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <Label 
              htmlFor={`likert-${question.id}-${option.value}`}
              className="text-base font-medium text-gray-900 cursor-pointer flex-1"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    );
  };

  const renderMultipleChoice = () => {
    if (!question.options) return null;

    return (
      <RadioGroup
        value={currentAnswer?.toString() || ''}
        onValueChange={handleMultipleChoiceAnswer}
        className="space-y-4"
      >
        {question.options.map((option, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <RadioGroupItem 
              value={option.value.toString()} 
              id={`mc-${question.id}-${option.value}`}
              className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <Label 
              htmlFor={`mc-${question.id}-${option.value}`}
              className="text-base font-medium text-gray-900 cursor-pointer flex-1"
            >
              {option.text}
            </Label>
          </div>
        ))}
      </RadioGroup>
    );
  };

  const renderSlider = () => {
    const min = question.scale?.min || 1;
    const max = question.scale?.max || 5;
    const step = 1;

    return (
      <div className="space-y-4">
        <Slider
          value={[currentAnswer || min]}
          onValueChange={handleSliderAnswer}
          min={min}
          max={max}
          step={step}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>{question.scale?.labels?.min || min}</span>
          <span>{question.scale?.labels?.max || max}</span>
        </div>
        {currentAnswer && (
          <div className="text-center">
            <span className="text-lg font-semibold text-blue-600">
              {currentAnswer}
            </span>
          </div>
        )}
      </div>
    );
  };

  const renderTextInput = () => {
    return (
      <Textarea
        value={currentAnswer || ''}
        onChange={handleTextAnswer}
        placeholder="Type your answer here..."
        className="min-h-[120px] resize-none"
      />
    );
  };

  const renderBoolean = () => {
    return (
      <div className="flex space-x-4">
        <Button
          variant={currentAnswer === true ? "default" : "outline"}
          onClick={() => handleBooleanAnswer(true)}
          className="flex-1 py-3"
        >
          Yes
        </Button>
        <Button
          variant={currentAnswer === false ? "default" : "outline"}
          onClick={() => handleBooleanAnswer(false)}
          className="flex-1 py-3"
        >
          No
        </Button>
      </div>
    );
  };

  const renderQuestionContent = () => {
    switch (question.type) {
      case 'likert':
        return renderLikertScale();
      case 'multiple-choice':
        return renderMultipleChoice();
      case 'slider':
        return renderSlider();
      case 'text':
        return renderTextInput();
      case 'boolean':
        return renderBoolean();
      default:
        return (
          <div className="text-gray-600">
            Unsupported question type: {question.type}
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      {renderQuestionContent()}
      
      {isRequired && (
        <div className="text-sm text-gray-500">
          * This question is required
        </div>
      )}
    </div>
  );
};

export default DynamicQuestion;
