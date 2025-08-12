import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Code2, 
  Component, 
  Layers, 
  Smartphone, 
  Globe,
  Briefcase,
  TrendingUp,
  Users,
  CheckCircle,
  Star
} from 'lucide-react';

const ReactOverview = () => {
  const careerPaths = [
    {
      title: 'Front-End Developer (React)',
      description: 'Build user interfaces with React components and state management',
      demand: 'High',
      icon: Code2,
      skills: ['React', 'JavaScript', 'CSS', 'HTML']
    },
    {
      title: 'JavaScript Engineer',
      description: 'Focus on complex JavaScript applications and frameworks',
      demand: 'High',
      icon: Component,
      skills: ['ES6+', 'React', 'Node.js', 'TypeScript']
    },
    {
      title: 'UI/UX Engineer with React',
      description: 'Bridge design and development with React implementations',
      demand: 'Medium',
      icon: Layers,
      skills: ['React', 'Figma', 'CSS', 'Design Systems']
    },
    {
      title: 'Full Stack Developer',
      description: 'React frontend with Node.js/Express backend development',
      demand: 'Very High',
      icon: Globe,
      skills: ['React', 'Node.js', 'Databases', 'APIs']
    },
    {
      title: 'Mobile Developer (React Native)',
      description: 'Cross-platform mobile apps using React Native framework',
      demand: 'High',
      icon: Smartphone,
      skills: ['React Native', 'Mobile UX', 'APIs', 'App Store']
    }
  ];

  const successTraits = [
    {
      trait: 'Logical Thinking',
      description: 'Pattern recognition and component-based problem solving',
      icon: CheckCircle
    },
    {
      trait: 'Creative Problem-Solving', 
      description: 'Finding innovative solutions to UI/UX challenges',
      icon: Star
    },
    {
      trait: 'Attention to Detail',
      description: 'Precision in code structure and user interface design',
      icon: CheckCircle
    },
    {
      trait: 'Patience & Persistence',
      description: 'Working through debugging and learning curve challenges',
      icon: Star
    },
    {
      trait: 'Visual Design Passion',
      description: 'Interest in user interaction and interface aesthetics',
      icon: CheckCircle
    }
  ];

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'Very High': return 'bg-emerald-500';
      case 'High': return 'bg-blue-500';
      case 'Medium': return 'bg-amber-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">What is React.js?</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Modern Frontend Development
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-muted-foreground mb-6">
              React.js is a JavaScript library for building user interfaces, particularly for 
              single-page applications. Developed by Meta (Facebook), it promotes component-based 
              architecture, state management, and virtual DOM manipulation.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Badge className="bg-primary/10 text-primary border-primary/20">Component-Based</Badge>
              <Badge className="bg-primary/10 text-primary border-primary/20">Virtual DOM</Badge>
              <Badge className="bg-primary/10 text-primary border-primary/20">State Management</Badge>
              <Badge className="bg-primary/10 text-primary border-primary/20">Meta (Facebook)</Badge>
            </div>
          </div>
        </div>

        {/* Career Paths */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
              <Briefcase className="h-8 w-8 text-primary" />
              Career Opportunities
            </h3>
            <p className="text-lg text-muted-foreground">
              React.js opens doors to diverse and high-demand career paths
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careerPaths.map((career, index) => {
              const Icon = career.icon;
              return (
                <Card key={index} className="relative overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 group hover:shadow-lg">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getDemandColor(career.demand)}`} />
                        <span className="text-xs font-medium text-muted-foreground">{career.demand} Demand</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg leading-tight">{career.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {career.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {career.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  {/* Gradient accent */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </Card>
              );
            })}
          </div>
        </div>

        {/* Success Traits */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
            <TrendingUp className="h-8 w-8 text-accent" />
            Skills & Traits for Success
          </h3>
          <p className="text-lg text-muted-foreground">
            Key characteristics that predict success in React.js development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {successTraits.map((trait, index) => {
            const Icon = trait.icon;
            return (
              <div key={index} className="text-center p-6 rounded-lg border border-border/50 hover:border-accent/50 transition-colors bg-card/50">
                <Icon className="h-10 w-10 mx-auto mb-4 text-accent" />
                <h4 className="font-semibold mb-2">{trait.trait}</h4>
                <p className="text-sm text-muted-foreground">{trait.description}</p>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">220k+</div>
            <div className="text-sm text-muted-foreground">React Jobs Worldwide</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-accent mb-2">$95k</div>
            <div className="text-sm text-muted-foreground">Average Salary (US)</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">41%</div>
            <div className="text-sm text-muted-foreground">Developer Usage</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-accent mb-2">2013</div>
            <div className="text-sm text-muted-foreground">First Released</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReactOverview;