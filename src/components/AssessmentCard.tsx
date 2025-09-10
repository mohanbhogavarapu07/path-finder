
import { Clock, Users, Star, BookOpen, Heart, Briefcase, User, Cpu, DollarSign, Megaphone, Crown, MessageCircle, Palette, Brain, Users2, Target, Dumbbell, Apple, Shield, Zap, Lightbulb, ShoppingCart, Phone, Clipboard, BarChart, Paintbrush, PenTool, Globe, Music, Image, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { categoryToSlug } from "@/lib/utils";

interface AssessmentCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  completions?: number;
  rating?: number;
  tags?: string[];
  featured?: boolean;
  isNew?: boolean;
  metadata?: {
    icon: string;
    gradient: string;
    userCount: string;
    tags: string[];
  };
}

const AssessmentCard = ({
  id,
  title,
  description,
  category,
  duration,
  difficulty,
  completions = 0,
  rating = 0,
  tags = [],
  featured = false,
  isNew = false,
  metadata
}: AssessmentCardProps) => {
  const navigate = useNavigate();

  const handleStartAssessment = () => {
    // Navigate directly to the assessment page
    const categorySlug = categoryToSlug(category);
    navigate(`/category/${categorySlug}/${id}`);
  };
  const getCategoryIcon = () => {
    const categoryLower = category.toLowerCase();
    if (categoryLower.includes('education') || categoryLower.includes('training')) return <BookOpen className="w-4 h-4" />;
    if (categoryLower.includes('health') || categoryLower.includes('medical')) return <Heart className="w-4 h-4" />;
    if (categoryLower.includes('business') || categoryLower.includes('management')) return <Briefcase className="w-4 h-4" />;
    if (categoryLower.includes('personal') || categoryLower.includes('psychology')) return <User className="w-4 h-4" />;
    if (categoryLower.includes('technology') || categoryLower.includes('programming') || categoryLower.includes('cloud')) return <Cpu className="w-4 h-4" />;
    if (categoryLower.includes('finance') || categoryLower.includes('money')) return <DollarSign className="w-4 h-4" />;
    if (categoryLower.includes('marketing') || categoryLower.includes('advertising')) return <Megaphone className="w-4 h-4" />;
    if (categoryLower.includes('leadership') || categoryLower.includes('management')) return <Crown className="w-4 h-4" />;
    if (categoryLower.includes('communication')) return <MessageCircle className="w-4 h-4" />;
    if (categoryLower.includes('creativity') || categoryLower.includes('design') || categoryLower.includes('art')) return <Palette className="w-4 h-4" />;
    if (categoryLower.includes('data') || categoryLower.includes('analytics')) return <BarChart className="w-4 h-4" />;
    if (categoryLower.includes('sales')) return <Phone className="w-4 h-4" />;
    if (categoryLower.includes('customer') || categoryLower.includes('service')) return <Users className="w-4 h-4" />;
    if (categoryLower.includes('project')) return <Clipboard className="w-4 h-4" />;
    if (categoryLower.includes('writing') || categoryLower.includes('content')) return <PenTool className="w-4 h-4" />;
    if (categoryLower.includes('language')) return <Globe className="w-4 h-4" />;
    if (categoryLower.includes('music')) return <Music className="w-4 h-4" />;
    if (categoryLower.includes('sports') || categoryLower.includes('fitness')) return <Trophy className="w-4 h-4" />;
    return <BookOpen className="w-4 h-4" />;
  };

  const getCategoryColor = () => {
    const categoryLower = category.toLowerCase();
    if (categoryLower.includes('education') || categoryLower.includes('training')) return "bg-primary-soft text-primary border-primary/20";
    if (categoryLower.includes('health') || categoryLower.includes('medical')) return "bg-secondary-soft text-secondary border-secondary/20";
    if (categoryLower.includes('business') || categoryLower.includes('management')) return "bg-highlight-soft text-highlight border-highlight/20";
    if (categoryLower.includes('personal') || categoryLower.includes('psychology')) return "bg-muted text-muted-foreground border-border";
    if (categoryLower.includes('technology') || categoryLower.includes('programming') || categoryLower.includes('cloud')) return "bg-blue-50 text-blue-600 border-blue-200";
    if (categoryLower.includes('finance') || categoryLower.includes('money')) return "bg-green-50 text-green-600 border-green-200";
    if (categoryLower.includes('marketing') || categoryLower.includes('advertising')) return "bg-orange-50 text-orange-600 border-orange-200";
    if (categoryLower.includes('leadership')) return "bg-purple-50 text-purple-600 border-purple-200";
    if (categoryLower.includes('communication')) return "bg-teal-50 text-teal-600 border-teal-200";
    if (categoryLower.includes('creativity') || categoryLower.includes('design') || categoryLower.includes('art')) return "bg-pink-50 text-pink-600 border-pink-200";
    if (categoryLower.includes('data') || categoryLower.includes('analytics')) return "bg-zinc-50 text-zinc-600 border-zinc-200";
    if (categoryLower.includes('sales')) return "bg-fuchsia-50 text-fuchsia-600 border-fuchsia-200";
    if (categoryLower.includes('customer') || categoryLower.includes('service')) return "bg-sky-50 text-sky-600 border-sky-200";
    if (categoryLower.includes('project')) return "bg-slate-50 text-slate-600 border-slate-200";
    if (categoryLower.includes('writing') || categoryLower.includes('content')) return "bg-neutral-50 text-neutral-600 border-neutral-200";
    if (categoryLower.includes('language')) return "bg-gray-50 text-gray-600 border-gray-200";
    if (categoryLower.includes('music')) return "bg-pink-100 text-pink-700 border-pink-300";
    if (categoryLower.includes('sports') || categoryLower.includes('fitness')) return "bg-orange-100 text-orange-700 border-orange-300";
    return "bg-muted text-muted-foreground border-border";
  };

  const getDifficultyColor = () => {
    switch (difficulty) {
      case "Beginner": return "bg-success/10 text-success border-success/20";
      case "Intermediate": return "bg-warning/10 text-warning border-warning/20";
      case "Advanced": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div className={`assessment-card group ${featured ? 'ring-2 ring-primary/20' : ''}`}>
      {featured && (
        <div className="absolute -top-2 -right-2 bg-gradient-primary text-white px-2 py-1 rounded-md text-xs font-medium">
          Featured
        </div>
      )}
      {isNew && (
        <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-medium">
          NEW
        </div>
      )}
      {featured && isNew && (
        <div className="absolute -top-2 -right-16 bg-orange-500 text-white px-2 py-1 rounded-md text-xs font-medium">
          Featured
        </div>
      )}
      
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Badge className={`${getCategoryColor()} px-2 py-1`}>
            {getCategoryIcon()}
            <span className="ml-1 text-xs font-medium">{category}</span>
          </Badge>
          <Badge variant="outline" className={`${getDifficultyColor()} text-xs`}>
            {difficulty}
        </Badge>
        </div>
        <div className="flex items-center space-x-1 text-xs text-foreground-soft">
          <Star className="w-3 h-3 fill-current text-yellow-500" />
          <span>{rating || 0}</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-heading mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
        <p className="text-sm text-foreground-soft line-clamp-2 mb-3">
          {description}
        </p>
      
      {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {(metadata?.tags || tags) && (metadata?.tags || tags).slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
            {tag}
          </Badge>
        ))}
          {(metadata?.tags || tags) && (metadata?.tags || tags).length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{(metadata?.tags || tags).length - 3}
            </Badge>
        )}
      </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center space-x-4 text-xs text-foreground-soft">
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-3 h-3" />
            <span>{metadata?.userCount || (completions ? completions.toLocaleString() : '0')}</span>
          </div>
        </div>
        
        <Button size="sm" className="btn-primary text-xs h-8 px-4" onClick={handleStartAssessment}>
          Start Assessment
        </Button>
      </div>
    </div>
  );
};

export default AssessmentCard;
