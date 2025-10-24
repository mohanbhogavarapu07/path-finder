
import React from 'react';
import { Users, Target, Award, Heart, CheckCircle, Star, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';

const About = () => {
  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Scientific Officer",
      initials: "DSC",
      bio: "PhD in Psychology with 15+ years in assessment design"
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Product",
      initials: "MR",
      bio: "Former Google PM specializing in user experience"
    },
    {
      name: "Dr. James Thompson",
      role: "Research Director",
      initials: "DJT",
      bio: "Published researcher in psychometrics and data science"
    },
    {
      name: "Lisa Park",
      role: "Head of Design",
      initials: "LP",
      bio: "Award-winning UX designer focused on accessibility"
    }
  ];

  const achievements = [
    { number: "1,000+", label: "Students Assessed", icon: Users },
    { number: "95%", label: "Accuracy Rate", icon: Target },
    { number: "10+", label: "University Partners", icon: Award },
    { number: "4.8/5", label: "Student Satisfaction", icon: Star }
  ];

  const values = [
    {
      title: "Mission-Driven Focus",
      description: "We align all efforts with our core mission. Every decision, feature, and action moves us closer to solving real problems for our customers and dominating our market.",
      icon: CheckCircle
    },
    {
      title: "Absolute Ownership",
      description: "We take full responsibility for our work—from concept to launch and beyond. Ownership means owning outcomes, proactively addressing challenges, and delivering without excuses.",
      icon: Heart
    },
    {
      title: "Speed with Precision",
      description: "We move with urgency and discipline. Fast execution is critical, but never at the cost of quality. Meeting deadlines with excellence is how we win.",
      icon: Target
    },
    {
      title: "Relentless Competitive Drive",
      description: "We have an unwavering hunger to win. We push ourselves and our products to outperform competitors and raise the bar every day.",
      icon: Users
    },
    {
      title: "Resilience and Adaptability",
      description: "We thrive under pressure. Challenges and setbacks are opportunities to learn, adapt quickly, and come back stronger.",
      icon: Award
    },
    {
      title: "Teamwork with Clear Roles",
      description: "Like a well-coached sports team, we know our roles and trust each other to perform. Seamless collaboration and mutual accountability fuel our success.",
      icon: Star
    },
    {
      title: "Customer-Obsessed Execution",
      description: "Our customers set the pace. We obsess over their needs, anticipate their challenges, and deliver exceptional value that keeps them loyal and drives growth.",
      icon: Lightbulb
    }
  ];

  return (
    <Layout>
      
      {/* Hero Section - Mission & Vision */}
      <section className="relative py-20 bg-muted/30 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-black">
              About FactorBeam
            </h1>
            </div>
            
          {/* Statistics Cards */}
          <div className="flex justify-center gap-8 mb-16">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center w-60 h-40 flex flex-col justify-center">
              <div className="flex justify-center mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">1M+</div>
              <div className="text-gray-600 text-sm">Users Empowered</div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center w-60 h-40 flex flex-col justify-center">
              <div className="flex justify-center mb-4">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">300+</div>
              <div className="text-gray-600 text-sm">Assessment Tools</div>
          </div>
        </div>

          {/* Mission & Vision Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                         <Card className="p-8 border-2 hover:border-primary/20 transition-colors bg-card shadow-card flex flex-col h-full">
               <CardHeader className="pb-6 flex-shrink-0">
                <CardTitle className="text-3xl text-foreground flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <span>Our Mission</span>
                </CardTitle>
              </CardHeader>
               <CardContent className="flex-1 flex items-center">
                 <p className="text-muted-foreground text-lg leading-relaxed text-justify">
                 To deliver accessible, research-backed assessments across education, careers, skills, and personal growth  enabling clarity, guiding decisions, and setting a new global standard for how people and organizations measure, learn, and evolve.
                </p>
              </CardContent>
            </Card>
            
             <Card className="p-8 border-2 hover:border-primary/20 transition-colors bg-card shadow-card flex flex-col h-full">
               <CardHeader className="pb-6 flex-shrink-0">
                <CardTitle className="text-3xl text-foreground flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-secondary/10">
                    <Award className="h-8 w-8 text-secondary" />
                  </div>
                  <span>Our Vision</span>
                </CardTitle>
              </CardHeader>
               <CardContent className="flex-1 flex items-center">
                 <p className="text-muted-foreground text-lg leading-relaxed text-justify">
                 Illuminate your potential - empowering individuals, professionals, and organizations to make confident, data-driven decisions that unlock growth, opportunity, and purpose.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Our Impact</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                                    <Icon className="h-8 w-8 text-primary mx-auto mb-4" />
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
       <section className="py-16 bg-muted/30">
         <div className="container mx-auto px-4">
           <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Our Core Values</h2>
           
           {/* First row - 3 cards */}
           <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-8">
             {values.slice(0, 3).map((value, index) => {
               const Icon = value.icon;
               return (
                 <Card key={index} className="p-6 bg-white shadow-sm">
                   <div className="flex items-start gap-4">
                     <div className="flex-shrink-0">
                       <Icon className="h-6 w-6 text-blue-600" />
                     </div>
                     <div className="flex-1">
                       <h3 className="text-lg font-semibold text-foreground mb-3">{value.title}</h3>
                       <p className="text-gray-600 leading-relaxed">{value.description}</p>
                     </div>
                   </div>
                 </Card>
               );
             })}
           </div>
           
           {/* Second row - 3 cards */}
           <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-8">
             {values.slice(3, 6).map((value, index) => {
               const Icon = value.icon;
               return (
                 <Card key={index + 3} className="p-6 bg-white shadow-sm">
                   <div className="flex items-start gap-4">
                     <div className="flex-shrink-0">
                       <Icon className="h-6 w-6 text-blue-600" />
                     </div>
                     <div className="flex-1">
                       <h3 className="text-lg font-semibold text-foreground mb-3">{value.title}</h3>
                       <p className="text-gray-600 leading-relaxed">{value.description}</p>
                     </div>
                   </div>
                 </Card>
               );
             })}
           </div>
           
           {/* Third row - 1 centered card */}
           <div className="flex justify-center">
             <div className="w-full max-w-6xl">
               <div className="grid md:grid-cols-3 gap-8">
                 <div></div> {/* Empty space */}
                 <div>
                   {values.slice(6, 7).map((value, index) => {
                     const Icon = value.icon;
                     return (
                       <Card key={index + 6} className="p-6 bg-white shadow-sm">
                         <div className="flex items-start gap-4">
                           <div className="flex-shrink-0">
                             <Icon className="h-6 w-6 text-blue-600" />
                           </div>
                           <div className="flex-1">
                             <h3 className="text-lg font-semibold text-foreground mb-3">{value.title}</h3>
                             <p className="text-gray-600 leading-relaxed">{value.description}</p>
                           </div>
                         </div>
                       </Card>
                     );
                   })}
                 </div>
                 <div></div> {/* Empty space */}
               </div>
             </div>
           </div>
         </div>
       </section>

      {/* Our Story Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Our Story</h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                FactorBeam was founded in 2025 by a team of psychologists, data scientists, and technology leaders who recognized a gap in the market. While high-quality assessments existed in academic and corporate settings, they were largely inaccessible to individuals seeking personal growth and career clarity.
              </p>
              <p>
                Our founders, having worked at leading assessment companies and research institutions, understood the power of well-designed psychological instruments. They set out to create a platform that would democratize access to these tools while maintaining the highest standards of scientific rigor and user experience.
              </p>
              <p>
                Today, we're proud to serve over 1000+ users worldwide, from students and professionals to organizations and researchers. Our commitment to evidence-based assessment design and user-centric experience continues to drive innovation in the career guidance and personal development space.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/* <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4 text-foreground">Meet Our Team</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Our diverse team of experts combines years of experience in education, psychology, 
            technology, and student development to create the best possible experience for our users.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center bg-white shadow-sm">
                <CardHeader className="pb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{member.initials}</span>
                  </div>
                  <CardTitle className="text-lg text-foreground font-semibold">{member.name}</CardTitle>
                  <p className="text-blue-600 text-sm font-medium">{member.role}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* How We Work */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">How We Work</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
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



    </Layout>
  );
};

export default About;
