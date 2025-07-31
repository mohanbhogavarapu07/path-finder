
import React from 'react';
import { Brain, Code, Cloud, Smartphone, Shield, BarChart3, Palette, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AssessmentCard } from '@/components/ui/assessment-card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Assessments = () => {
  const assessmentCategories = [
    {
      title: "Technology & Programming",
      icon: Code,
      color: "bg-thinkera-blue/10 text-thinkera-blue border-thinkera-blue/20",
      assessments: [
        {
          id: "full-stack",
          title: "Full Stack Development",
          description: "Comprehensive assessment for front-end and back-end development skills",
          duration: "45 mins",
          tags: ["JavaScript", "React", "Node.js"],
          popular: true,
          participants: "75K+",
          rating: 4.7,
          category: "Technology",
          icon: <Code className="h-6 w-6" />
        },
        {
          id: "data-science",
          title: "Data Science & AI/ML",
          description: "Evaluate your aptitude for data science and machine learning careers",
          duration: "50 mins",
          tags: ["Python", "Statistics", "Machine Learning"],
          popular: true,
          participants: "50K+",
          rating: 4.8,
          category: "Technology",
          icon: <BarChart3 className="h-6 w-6" />
        },
        {
          id: "devops",
          title: "DevOps Engineering",
          description: "Assessment for cloud infrastructure and deployment expertise",
          duration: "40 mins",
          tags: ["AWS", "Docker", "CI/CD"],
          popular: false,
          participants: "30K+",
          rating: 4.6,
          category: "Technology",
          icon: <Cloud className="h-6 w-6" />
        }
      ]
    },
    {
      title: "Cloud & Infrastructure",
      icon: Cloud,
      color: "bg-purple-100 text-purple-700",
      assessments: [
        {
          id: "aws-cloud",
          title: "AWS Cloud Architect",
          description: "Comprehensive AWS skills and cloud architecture assessment",
          duration: "55 mins",
          tags: ["AWS", "Cloud Architecture", "Security"],
          popular: true,
          participants: "40K+",
          rating: 4.8,
          category: "Cloud",
          icon: <Cloud className="h-6 w-6" />
        },
        {
          id: "multi-cloud",
          title: "Multi-Cloud Engineer",
          description: "Cross-platform cloud expertise evaluation",
          duration: "60 mins",
          tags: ["AWS", "Azure", "GCP"],
          popular: false,
          participants: "25K+",
          rating: 4.7,
          category: "Cloud",
          icon: <Cloud className="h-6 w-6" />
        }
      ]
    },
    {
      title: "Mobile Development",
      icon: Smartphone,
      color: "bg-green-100 text-green-700",
      assessments: [
        {
          id: "flutter",
          title: "Flutter Development",
          description: "Cross-platform mobile development skills assessment",
          duration: "45 mins",
          tags: ["Flutter", "Dart", "Mobile UI"],
          popular: false,
          participants: "20K+",
          rating: 4.5,
          category: "Mobile",
          icon: <Smartphone className="h-6 w-6" />
        },
        {
          id: "react-native",
          title: "React Native",
          description: "JavaScript-based mobile app development evaluation",
          duration: "40 mins",
          tags: ["React Native", "JavaScript", "iOS/Android"],
          popular: false,
          participants: "35K+",
          rating: 4.6,
          category: "Mobile",
          icon: <Smartphone className="h-6 w-6" />
        }
      ]
    },
    {
      title: "Security & Ethics",
      icon: Shield,
      color: "bg-red-100 text-red-700",
      assessments: [
        {
          id: "cybersecurity",
          title: "Cybersecurity Specialist",
          description: "Information security and threat analysis capabilities",
          duration: "50 mins",
          tags: ["Security", "Penetration Testing", "Risk Analysis"],
          popular: true,
          participants: "35K+",
          rating: 4.9,
          category: "Security",
          icon: <Shield className="h-6 w-6" />
        },
        {
          id: "ethical-hacking",
          title: "Ethical Hacking",
          description: "White-hat hacking and vulnerability assessment skills",
          duration: "55 mins",
          tags: ["Penetration Testing", "Network Security", "Vulnerability Assessment"],
          popular: false,
          participants: "15K+",
          rating: 4.8,
          category: "Security",
          icon: <Shield className="h-6 w-6" />
        }
      ]
    },
    {
      title: "Business & Analytics",
      icon: BarChart3,
      color: "bg-orange-100 text-orange-700",
      assessments: [
        {
          id: "business-analyst",
          title: "Business Analyst",
          description: "Requirements analysis and business process optimization",
          duration: "35 mins",
          tags: ["Requirements Analysis", "Process Improvement", "Stakeholder Management"],
          popular: false,
          participants: "25K+",
          rating: 4.4,
          category: "Business",
          icon: <BarChart3 className="h-6 w-6" />
        },
        {
          id: "digital-marketing",
          title: "Digital Marketing",
          description: "Online marketing strategies and campaign management",
          duration: "40 mins",
          tags: ["SEO", "Social Media", "Analytics"],
          popular: true,
          participants: "45K+",
          rating: 4.7,
          category: "Business",
          icon: <BarChart3 className="h-6 w-6" />
        }
      ]
    },
    {
      title: "Design & User Experience",
      icon: Palette,
      color: "bg-pink-100 text-pink-700",
      assessments: [
        {
          id: "ui-ux-design",
          title: "UI/UX Design",
          description: "User interface and experience design capabilities",
          duration: "45 mins",
          tags: ["Design Thinking", "Prototyping", "User Research"],
          popular: false,
          participants: "30K+",
          rating: 4.6,
          category: "Design",
          icon: <Palette className="h-6 w-6" />
        }
      ]
    }
  ];



  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section - Omni Calculator Style */}
      {/* <section className="relative py-24 bg-gradient-to-br from-primary to-primary-variant overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center text-white">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <span className="text-sm font-medium">🎯 Scientifically Validated Career Assessments</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Find Your Perfect
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent"> Career Match </span>
            </h1>
            
            <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed mb-8">
              Take our comprehensive, scientifically-backed assessments to discover career paths that align perfectly 
              with your unique skills, interests, and personality. Join 50,000+ students who found their direction.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mt-12">
              <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-white/5 backdrop-blur-sm">
                <div className="text-2xl font-bold">15+</div>
                <div className="text-sm text-white/70">Assessment Types</div>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-white/5 backdrop-blur-sm">
                <div className="text-2xl font-bold">95%</div>
                <div className="text-sm text-white/70">Accuracy Rate</div>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-white/5 backdrop-blur-sm">
                <div className="text-2xl font-bold">30-60</div>
                <div className="text-sm text-white/70">Minutes Each</div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

             {/* Assessment Categories - Omni Style */}
       <section className="pt-32 pb-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-left mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Choose Your Assessment</h2>
            <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
              Explore our comprehensive range of career assessments, each designed with cutting-edge psychometric research 
              to provide you with accurate, actionable insights about your ideal career path.
            </p>
          </div>

                     <div className="space-y-12">
             {assessmentCategories.map((category, categoryIndex) => {
               const Icon = category.icon;
               // Create anchor ID from category title
               const anchorId = category.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
               return (
                 <div key={categoryIndex} id={anchorId}>
                   <div className="flex items-center gap-3 mb-6">
                     <div className={`p-3 rounded-lg ${category.color}`}>
                       <Icon className="h-6 w-6" />
                     </div>
                     <h3 className="text-2xl font-bold text-foreground">{category.title}</h3>
                   </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.assessments.map((assessment, index) => (
                      <AssessmentCard key={index} {...assessment} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-thinkera-blue/5 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">How Our Assessments Work</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-thinkera-blue text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Choose Assessment</h3>
              <p className="text-muted-foreground text-sm">Select the career path you're interested in exploring</p>
            </div>
            
            <div className="text-center">
              <div className="bg-thinkera-blue text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Complete Evaluation</h3>
              <p className="text-muted-foreground text-sm">Answer questions about your skills, interests, and preferences</p>
            </div>
            
            <div className="text-center">
              <div className="bg-thinkera-blue text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Get Analysis</h3>
              <p className="text-muted-foreground text-sm">Receive detailed insights based on scientific assessment methods</p>
            </div>
            
            <div className="text-center">
              <div className="bg-thinkera-blue text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Plan Your Path</h3>
              <p className="text-muted-foreground text-sm">Use personalized recommendations to guide your career journey</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-hero text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your Perfect Career?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Take the first step towards a fulfilling career with our comprehensive assessments.
          </p>
          <Button size="lg" variant="secondary">
            Start Your Journey Today
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Assessments;
