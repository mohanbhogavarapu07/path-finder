import { Brain, Code2, Target, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-assessment.jpg';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-subtle overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Technical Assessment" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Brain className="h-8 w-8 text-primary" />
          <span className="text-lg font-semibold text-primary">TECHNICAL FUTURES</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
          Should You Learn React.js?
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
          A Research-Backed Assessment of Your Readiness, Fit & Career Potential in React.js Development
        </p>

        {/* Key Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <Target className="h-8 w-8 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">6</div>
            <div className="text-sm text-muted-foreground">Assessment Sections</div>
          </div>
          <div className="text-center">
            <Code2 className="h-8 w-8 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">25-30</div>
            <div className="text-sm text-muted-foreground">Minutes Duration</div>
          </div>
          <div className="text-center">
            <TrendingUp className="h-8 w-8 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">100</div>
            <div className="text-sm text-muted-foreground">Confidence Score</div>
          </div>
          <div className="text-center">
            <Brain className="h-8 w-8 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">AI</div>
            <div className="text-sm text-muted-foreground">Powered Analysis</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="gradient" className="text-lg px-8 py-6">
            Start Assessment
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-6">
            Learn More
          </Button>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-primary rounded-full opacity-60 animate-pulse" />
      <div className="absolute top-40 right-20 w-6 h-6 bg-accent rounded-full opacity-40 animate-pulse delay-1000" />
      <div className="absolute bottom-32 left-20 w-3 h-3 bg-primary rounded-full opacity-50 animate-pulse delay-500" />
    </section>
  );
};

export default HeroSection;