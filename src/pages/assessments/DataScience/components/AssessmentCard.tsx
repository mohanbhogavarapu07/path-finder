import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Star, Bookmark, Share2, ArrowRight } from 'lucide-react';

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
    <Card className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        {/* Header with Category Badge and Action Icons */}
        <div className="flex items-start justify-between mb-4">
          <Badge className="bg-factorbeam-primary text-white text-xs px-3 py-1">
            Data Science
          </Badge>
          <div className="flex items-center gap-2">
            <button className="p-1 hover:bg-gray-100 rounded transition-colors">
              <Bookmark className="h-4 w-4 text-gray-600" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded transition-colors">
              <Share2 className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-factorbeam-heading mb-2 leading-tight">
          {title}
        </h1>
        
        {/* Subtitle */}
        <p className="text-sm text-factorbeam-text-alt mb-3">
          {subtitle}
        </p>

        {/* Description */}
        <p className="text-sm text-factorbeam-text mb-4 leading-relaxed">
          {description.length > 120 ? `${description.substring(0, 120)}...` : description}
        </p>
        
        {/* Metadata */}
        <div className="flex items-center gap-4 text-sm text-factorbeam-text-alt mb-4">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>1K+</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-factorbeam-yellow fill-current" />
            <span>4.6 (1234)</span>
          </div>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Badge className="bg-factorbeam-green text-white text-xs px-2 py-1">
            Beginner
          </Badge>
          <Badge variant="outline" className="text-xs border-gray-200 text-factorbeam-text-alt">
            #data-science
          </Badge>
          <Badge variant="outline" className="text-xs border-gray-200 text-factorbeam-text-alt">
            #analytics
          </Badge>
        </div>

        {/* Button */}
        <Button 
          onClick={onStartAssessment}
          className="w-full bg-factorbeam-primary hover:bg-factorbeam-primary-alt text-white font-semibold py-3 px-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2"
        >
          Start Assessment
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};