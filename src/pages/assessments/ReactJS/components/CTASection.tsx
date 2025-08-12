import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Clock, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-20 px-6 bg-gradient-subtle relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Header */}
        <Badge variant="outline" className="mb-6">Ready to Begin?</Badge>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Discover Your React.js Potential
        </h2>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          Take our comprehensive assessment and get personalized guidance on your journey 
          to becoming a React.js developer.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <Clock className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">25-30 Minutes</h3>
            <p className="text-sm text-muted-foreground">
              Comprehensive evaluation in under half an hour
            </p>
          </div>
          <div className="text-center">
            <Users className="h-10 w-10 text-accent mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Research-Backed</h3>
            <p className="text-sm text-muted-foreground">
              Based on validated psychological assessments
            </p>
          </div>
          <div className="text-center">
            <Award className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Personalized Results</h3>
            <p className="text-sm text-muted-foreground">
              AI-powered recommendations for your unique profile
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="gradient" className="text-lg px-8 py-6 group" asChild>
            <Link to="/assessment">
              Start Your Assessment
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-6">
            View Sample Report
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <p className="text-sm text-muted-foreground mb-4">
            Trusted by developers worldwide
          </p>
          <div className="flex items-center justify-center gap-8 opacity-60">
            <div className="text-xs font-medium">10,000+ Assessments</div>
            <div className="w-1 h-1 bg-muted-foreground rounded-full" />
            <div className="text-xs font-medium">95% Accuracy Rate</div>
            <div className="w-1 h-1 bg-muted-foreground rounded-full" />
            <div className="text-xs font-medium">4.9/5 Rating</div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/5 rounded-full blur-xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-primary opacity-5 rounded-full blur-3xl" />
    </section>
  );
};

export default CTASection;