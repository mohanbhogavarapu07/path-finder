import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Target } from 'lucide-react';

interface AssessmentCardProps {
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  onStartAssessment: () => void;
}

export const AssessmentCard = ({ 
  title, 
  subtitle, 
  description, 
  duration,
  onStartAssessment 
}: AssessmentCardProps) => {
  return (
          <Card className="border-2 border-blue-200 bg-blue-50 w-full max-w-4xl mx-auto shadow-lg">
      <CardContent className="p-8">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            <p className="text-lg text-gray-600">{subtitle}</p>
          </div>
          <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span>Personalized Results</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Career Guidance</span>
            </div>
          </div>
          <Button 
            onClick={onStartAssessment}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
          >
            Start Assessment &rarr;
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};