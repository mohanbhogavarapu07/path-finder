
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Brain, 
  Code, 
  Compass, 
  Bot, 
  GraduationCap,
  Clock,
  Target,
  BarChart3,
  CheckCircle,
  Users,
  Lightbulb
} from 'lucide-react';

const AssessmentOverview = () => {
  const sections = [
    {
      id: '01',
      title: 'Test Introduction',
      icon: BookOpen,
      description: 'Purpose and overview of React.js skills assessment',
      duration: '3-5 min',
      features: ['React.js Overview', 'Career Paths', 'Success Traits']
    },
    {
      id: '02', 
      title: 'Psychometric Section',
      icon: Brain,
      description: 'Assess psychological alignment with front-end development',
      duration: '8-10 min',
      features: ['RIASEC/Holland Codes', 'Big Five Personality', 'Growth Mindset']
    },
    {
      id: '03',
      title: 'Technical & Aptitude',
      icon: Code,
      description: 'Evaluate technical readiness and foundational knowledge',
      duration: '10-12 min', 
      features: ['JavaScript Basics', 'React Knowledge', 'Problem Solving']
    },
    {
      id: '04',
      title: 'WISCAR Framework',
      icon: Compass,
      description: 'Holistic readiness across 6 key dimensions',
      duration: '8-10 min',
      features: ['Will', 'Interest', 'Skill', 'Cognitive', 'Ability', 'Real-World Fit']
    },
    {
      id: '05',
      title: 'AI Recommendation Engine',
      icon: Bot,
      description: 'Personalized guidance based on assessment results',
      duration: '2-3 min',
      features: ['Confidence Score', 'Learning Path', 'Next Steps']
    },
    {
      id: '06',
      title: 'Career & Learning Guidance',
      icon: GraduationCap,
      description: 'Bridge results with actionable career paths',
      duration: '5 min',
      features: ['Role Mapping', 'Skill Gaps', 'Alternative Tracks']
    }
  ];

  const outcomes = [
    {
      icon: Target,
      title: 'Psychological Fit Score',
      description: 'Cognitive and personality alignment (0-100)',
      color: 'text-primary'
    },
    {
      icon: Code,
      title: 'Technical Readiness',
      description: 'Foundational knowledge assessment (0-100)',
      color: 'text-accent'
    },
    {
      icon: BarChart3,
      title: 'WISCAR Analysis',
      description: 'Radar chart across 6 dimensions',
      color: 'text-primary'
    },
    {
      icon: CheckCircle,
      title: 'Overall Confidence',
      description: 'Composite readiness score',
      color: 'text-accent'
    }
  ];

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Assessment Structure</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Six-Stage Comprehensive Evaluation
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our research-backed assessment evaluates your readiness across psychological, 
            technical, and career dimensions to provide personalized guidance.
          </p>
        </div>

        {/* Assessment Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Card key={section.id} className="relative overflow-hidden border-border/50 hover:border-primary/50 transition-colors group">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{section.id}</Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {section.duration}
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{section.title}</CardTitle>
                  <CardDescription className="text-base">
                    {section.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {section.features.map((feature, featureIndex) => (
                      <Badge key={featureIndex} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                {/* Gradient overlay */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-primary opacity-5 rounded-bl-full" />
              </Card>
            );
          })}
        </div>

        {/* Expected Outcomes */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">Assessment Outcomes</h3>
          <p className="text-lg text-muted-foreground">
            Comprehensive insights delivered through multiple scoring dimensions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {outcomes.map((outcome, index) => {
            const Icon = outcome.icon;
            return (
              <div key={index} className="text-center p-6 rounded-lg border border-border/50 hover:border-primary/50 transition-colors">
                <Icon className={`h-10 w-10 mx-auto mb-4 ${outcome.color}`} />
                <h4 className="font-semibold mb-2">{outcome.title}</h4>
                <p className="text-sm text-muted-foreground">{outcome.description}</p>
              </div>
            );
          })}
        </div>

        {/* Key Features */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-8 p-6 rounded-lg bg-muted/50 border border-border/50">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Research-Backed</span>
            </div>
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium">AI-Powered</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Personalized</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssessmentOverview;