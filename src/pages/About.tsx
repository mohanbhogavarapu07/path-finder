
import React from 'react';
import { Users, Target, Award, Heart, CheckCircle, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const About = () => {
  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Academic Officer",
      image: "/api/placeholder/300/300",
      bio: "Ph.D. in Educational Psychology with 15+ years in career counseling",
      specialties: ["Career Psychology", "Assessment Design", "Student Development"]
    },
    {
      name: "Michael Chen",
      role: "Lead Technology Architect",
      image: "/api/placeholder/300/300",
      bio: "Former Google engineer specializing in AI-driven educational platforms",
      specialties: ["AI/ML", "Educational Technology", "Platform Architecture"]
    },
    {
      name: "Dr. Priya Patel",
      role: "Research Director",
      image: "/api/placeholder/300/300",
      bio: "Expert in psychometric testing and educational research methodology",
      specialties: ["Psychometrics", "Research Design", "Data Analysis"]
    },
    {
      name: "James Wilson",
      role: "Student Success Manager",
      image: "/api/placeholder/300/300",
      bio: "Dedicated to helping students navigate their career journey successfully",
      specialties: ["Student Counseling", "Career Guidance", "Success Coaching"]
    }
  ];

  const achievements = [
    { number: "50,000+", label: "Students Assessed", icon: Users },
    { number: "95%", label: "Accuracy Rate", icon: Target },
    { number: "200+", label: "University Partners", icon: Award },
    { number: "4.8/5", label: "Student Satisfaction", icon: Star }
  ];

  const values = [
    {
      title: "Evidence-Based Approach",
      description: "All our assessments are grounded in scientific research and validated through extensive testing.",
      icon: CheckCircle
    },
    {
      title: "Student-Centric Design",
      description: "Every feature is designed with the student experience in mind, ensuring clarity and ease of use.",
      icon: Heart
    },
    {
      title: "Continuous Innovation",
      description: "We constantly update our assessments to reflect the evolving landscape of education and careers.",
      icon: Target
    },
    {
      title: "Accessibility First",
      description: "Our platform is designed to be accessible to all students, regardless of their background or abilities.",
      icon: Users
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary to-primary-variant overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center text-white">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <span className="text-sm font-medium">🚀 Empowering 50,000+ Students Worldwide</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              About
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent"> PathFinder </span>
            </h1>
            
            <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
              We're revolutionizing career guidance through cutting-edge technology and scientifically-backed assessments. 
              Our mission is to help every student discover their perfect career path with confidence and clarity.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 border-2 hover:border-primary/20 transition-colors bg-card shadow-card">
              <CardHeader className="pb-6">
                <CardTitle className="text-3xl text-foreground flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <span>Our Mission</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  To democratize access to world-class career guidance by providing scientifically-backed assessments 
                  that help students discover their true potential. We believe every individual deserves personalized 
                  insights to make confident career decisions.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-8 border-2 hover:border-primary/20 transition-colors bg-card shadow-card">
              <CardHeader className="pb-6">
                <CardTitle className="text-3xl text-foreground flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-secondary/10">
                    <Award className="h-8 w-8 text-secondary" />
                  </div>
                  <span>Our Vision</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  To become the global standard for career assessment technology, empowering millions of students 
                  worldwide to unlock their potential and pursue fulfilling careers aligned with their unique 
                  strengths and passions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="bg-thinkera-blue/5 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Our Impact</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                                    <Icon className="h-8 w-8 text-thinkera-blue mx-auto mb-4" />
                <div className="text-3xl font-bold text-foreground mb-2">{achievement.number}</div>
                <div className="text-muted-foreground">{achievement.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Our Core Values</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="p-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl text-foreground">
                      <Icon className="h-6 w-6" />
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
              <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4 text-foreground">Meet Our Team</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Our diverse team of experts combines years of experience in education, psychology, 
            technology, and student development to create the best possible experience for our users.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4"></div>
                  <CardTitle className="text-lg text-foreground">{member.name}</CardTitle>
                  <Badge variant="secondary" className="mx-auto">{member.role}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {member.specialties.map((specialty, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">How We Work</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-thinkera-blue/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-thinkera-blue">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Research & Development</h3>
                <p className="text-muted-foreground">
                  We continuously research the latest trends in education and career development to ensure our assessments remain relevant and accurate.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Assessment Design</h3>
                <p className="text-muted-foreground">
                  Our psychologists and education experts design comprehensive assessments that evaluate multiple dimensions of student potential.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Personalized Insights</h3>
                <p className="text-muted-foreground">
                  We provide detailed, actionable insights and recommendations tailored to each student's unique profile and aspirations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-hero text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Discover Your Path?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of students who have found their direction with PathFinder's comprehensive assessments.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <a href="/assessments">Start Your Assessment</a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
