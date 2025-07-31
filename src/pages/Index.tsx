
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AssessmentCard } from "@/components/ui/assessment-card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Search, ArrowRight, BookOpen, Users, Award, TrendingUp, Brain, Code, Shield, Cloud, Palette, BarChart, Target, Lightbulb, Compass, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const featuredAssessments = [
    {
      id: "data-science",
      title: "Data Science Career Assessment",
      description: "Discover if data science is the right career path for you with our comprehensive evaluation covering statistics, programming, and analytical thinking.",
      duration: "15-20 mins",
      participants: "50K+",
      rating: 4.8,
      category: "Technology",
      icon: <BarChart className="h-6 w-6" />,
      tags: ["Python", "Statistics", "Machine Learning"],
      difficulty: "Intermediate"
    },
    {
      id: "cyber-security",
      title: "Cyber Security Assessment",
      description: "Evaluate your cybersecurity aptitude and learn if this high-demand field matches your skills and interests.",
      duration: "25-30 mins", 
      participants: "35K+",
      rating: 4.9,
      category: "Security",
      icon: <Shield className="h-6 w-6" />,
      tags: ["Security", "Networking", "Ethical Hacking"],
      difficulty: "Advanced"
    },
    {
      id: "full-stack",
      title: "Full Stack Development",
      description: "Test your full-stack development potential across frontend, backend, and database technologies.",
      duration: "20-25 mins",
      participants: "75K+", 
      rating: 4.7,
      category: "Development",
      icon: <Code className="h-6 w-6" />,
      tags: ["JavaScript", "React", "Node.js"],
      difficulty: "Intermediate"
    },
    {
      id: "aws-cloud",
      title: "Cloud Computing (AWS)",
      description: "Assess your cloud computing skills and readiness for AWS certification and cloud architecture roles.",
      duration: "18-22 mins",
      participants: "40K+",
      rating: 4.8,
      category: "Cloud",
      icon: <Cloud className="h-6 w-6" />,
      tags: ["AWS", "Cloud Architecture", "DevOps"],
      difficulty: "Advanced"
    },
    {
      id: "ux-design",
      title: "UI/UX Design Assessment",
      description: "Discover your design thinking abilities and potential in user experience and interface design.",
      duration: "15-18 mins",
      participants: "25K+",
      rating: 4.6,
      category: "Design",
      icon: <Palette className="h-6 w-6" />,
      tags: ["Design Thinking", "Prototyping", "User Research"],
      difficulty: "Beginner"
    },
    {
      id: "ai-ml",
      title: "AI/ML Engineering",
      description: "Evaluate your artificial intelligence and machine learning capabilities for the future of technology.",
      duration: "22-28 mins",
      participants: "30K+",
      rating: 4.9,
      category: "AI/ML",
      icon: <Brain className="h-6 w-6" />,
      tags: ["AI", "Machine Learning", "Deep Learning"],
      difficulty: "Advanced"
    }
  ];

  const categories = [
    { name: "Technology", count: "15 assessments", icon: <Code className="h-6 w-6" /> },
    { name: "Business", count: "8 assessments", icon: <BarChart className="h-6 w-6" /> },
    { name: "Design", count: "6 assessments", icon: <Palette className="h-6 w-6" /> },
    { name: "Healthcare", count: "7 assessments", icon: <Award className="h-6 w-6" /> },
    { name: "Engineering", count: "12 assessments", icon: <Users className="h-6 w-6" /> },
    { name: "Security", count: "5 assessments", icon: <Shield className="h-6 w-6" /> }
  ];

  const stats = [
    { label: "Free Assessments", value: "50+", icon: BookOpen },
    { label: "Students Helped", value: "100K+", icon: Users },
    { label: "Success Rate", value: "95%", icon: Award },
    { label: "Career Growth", value: "85%", icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section - Omni Style */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 left-10 h-64 w-64 rounded-full bg-primary/5 blur-3xl"></div>
          <div className="absolute bottom-10 right-10 h-48 w-48 rounded-full bg-thinkera-purple/5 blur-3xl"></div>
        </div>

        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Your career in{' '}
              <span className="text-gradient">50+ free</span>
              <br />
              assessments
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover your perfect career path with comprehensive assessments. 
              Make informed decisions about your future with data-driven insights.
            </p>
            
            {/* Search Bar - Omni Style */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search assessments..."
                  className="h-14 pl-12 pr-4 text-lg border-2 rounded-2xl shadow-card"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="h-12 text-lg px-8 rounded-xl">
                Start Free Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="h-12 text-lg px-8 rounded-xl">
                Explore All Assessments
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid - Omni Style */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Link
                key={index}
                to="/assessments"
                className="group"
              >
                <div className="bg-card rounded-2xl border-2 border-border hover:border-primary/20 p-6 text-center transition-all duration-300 hover:shadow-lg-custom shadow-card">
                  <div className="flex justify-center mb-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors flex items-center justify-center">
                      {category.icon}
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Assessments */}
      <section className="py-16 px-4 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Popular Assessments
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Start with our most trusted career assessments, used by thousands of students and professionals.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredAssessments.map((assessment) => (
              <AssessmentCard key={assessment.id} {...assessment} />
            ))}
          </div>
          <div className="text-center">
            <Link to="/assessments">
              <Button size="lg" className="bg-gradient-to-r from-secondary-500 to-accent-500 hover:opacity-90 text-white px-8 border-0 shadow-lg hover:shadow-xl transition-all">
                Explore All Assessments
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
          

     
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Complete Coverage for Every Stage of Life
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From high school stream selection to career pivots, we've got assessments for every major decision point in your educational and professional journey.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-primary-100 hover:border-primary-200 bg-gradient-to-br from-white to-primary-50">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-3 p-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full w-fit group-hover:scale-110 transition-transform">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg font-semibold text-foreground">High School Students</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Stream selection, entrance exam guidance, and career exploration for grades 9-12.
                </p>
                <div className="flex flex-wrap gap-1 justify-center">
                  <Badge variant="secondary" className="text-xs bg-primary-100 text-primary-600 border-0">Science Stream</Badge>
                  <Badge variant="secondary" className="text-xs bg-accent-100 text-accent-600 border-0">JEE/NEET</Badge>
                  <Badge variant="secondary" className="text-xs bg-secondary-100 text-secondary-600 border-0">Commerce</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-secondary-100 hover:border-secondary-200 bg-gradient-to-br from-white to-secondary-50">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-3 p-3 bg-gradient-to-r from-secondary-500 to-primary-500 rounded-full w-fit group-hover:scale-110 transition-transform">
                  <Lightbulb className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg font-semibold text-foreground">College Students</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Engineering specializations, skill development, and career planning for undergraduates.
                </p>
                <div className="flex flex-wrap gap-1 justify-center">
                  <Badge variant="secondary" className="text-xs bg-primary-100 text-primary-600 border-0">Programming</Badge>
                  <Badge variant="secondary" className="text-xs bg-accent-100 text-accent-600 border-0">Specialization</Badge>
                  <Badge variant="secondary" className="text-xs bg-secondary-100 text-secondary-600 border-0">Internships</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-accent-100 hover:border-accent-200 bg-gradient-to-br from-white to-accent-50">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-3 p-3 bg-gradient-to-r from-accent-500 to-secondary-500 rounded-full w-fit group-hover:scale-110 transition-transform">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg font-semibold text-foreground">Graduates & Professionals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Career transitions, skill upgrades, and industry switches for working professionals.
                </p>
                <div className="flex flex-wrap gap-1 justify-center">
                  <Badge variant="secondary" className="text-xs bg-primary-100 text-primary-600 border-0">Career Switch</Badge>
                  <Badge variant="secondary" className="text-xs bg-accent-100 text-accent-600 border-0">Upskilling</Badge>
                  <Badge variant="secondary" className="text-xs bg-secondary-100 text-secondary-600 border-0">Leadership</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-primary-100 hover:border-primary-200 bg-gradient-to-br from-white to-primary-50">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-3 p-3 bg-gradient-to-r from-accent-500 to-secondary-500 rounded-full w-fit group-hover:scale-110 transition-transform">
                  <Compass className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg font-semibold text-foreground">Creative & Arts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Design thinking, artistic mediums, and creative career paths across all art forms.
                </p>
                <div className="flex flex-wrap gap-1 justify-center">
                  <Badge variant="secondary" className="text-xs bg-primary-100 text-primary-600 border-0">UI/UX Design</Badge>
                  <Badge variant="secondary" className="text-xs bg-accent-100 text-accent-600 border-0">Digital Art</Badge>
                  <Badge variant="secondary" className="text-xs bg-secondary-100 text-secondary-600 border-0">Music</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-secondary-100 hover:border-secondary-200 bg-gradient-to-br from-white to-secondary-50">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-3 p-3 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full w-fit group-hover:scale-110 transition-transform">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg font-semibold text-foreground">Business & Commerce</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Entrepreneurship readiness, business acumen, and finance career assessments.
                </p>
                <div className="flex flex-wrap gap-1 justify-center">
                  <Badge variant="secondary" className="text-xs bg-primary-100 text-primary-600 border-0">Entrepreneurship</Badge>
                  <Badge variant="secondary" className="text-xs bg-accent-100 text-accent-600 border-0">Finance</Badge>
                  <Badge variant="secondary" className="text-xs bg-secondary-100 text-secondary-600 border-0">Marketing</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-accent-100 hover:border-accent-200 bg-gradient-to-br from-white to-accent-50">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-3 p-3 bg-gradient-to-r from-secondary-500 to-primary-500 rounded-full w-fit group-hover:scale-110 transition-transform">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg font-semibold text-foreground">International Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Study abroad readiness, global career paths, and international education guidance.
                </p>
                <div className="flex flex-wrap gap-1 justify-center">
                  <Badge variant="secondary" className="text-xs bg-primary-100 text-primary-600 border-0">Study Abroad</Badge>
                  <Badge variant="secondary" className="text-xs bg-accent-100 text-accent-600 border-0">Scholarships</Badge>
                  <Badge variant="secondary" className="text-xs bg-secondary-100 text-secondary-600 border-0">Global Careers</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof & Testimonials */}
      <section className="py-16 px-4 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">What Students Say</h2>
            <p className="text-lg text-muted-foreground">Real feedback from students who found their path</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-primary-50 to-white border-primary-100 hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent-400 text-accent-400" />
                  ))}
                </div>
                <p className="text-foreground mb-4">
                  "Finally understood why I was struggling with programming. The assessment helped me switch to UX design - best decision ever!"
                </p>
                <div className="text-sm text-muted-foreground">
                  <p className="font-semibold text-foreground">Priya S.</p>
                  <p>Engineering Student</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-secondary-50 to-white border-secondary-100 hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent-400 text-accent-400" />
                  ))}
                </div>
                <p className="text-foreground mb-4">
                  "The career assessment showed me I'm perfect for data analysis. Now I'm interning at a tech startup!"
                </p>
                <div className="text-sm text-muted-foreground">
                  <p className="font-semibold text-foreground">Rahul K.</p>
                  <p>CS Graduate</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-accent-50 to-white border-accent-100 hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent-400 text-accent-400" />
                  ))}
                </div>
                <p className="text-foreground mb-4">
                  "Saved me from making a costly mistake. Almost switched streams until this assessment revealed my true strengths."
                </p>
                <div className="text-sm text-muted-foreground">
                  <p className="font-semibold text-foreground">Ananya M.</p>
                  <p>Electronics Engineering</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto bg-card rounded-3xl p-12 shadow-lg-custom border-2 border-border">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to discover your perfect career?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of students and professionals who have found their ideal career path through our assessments.
            </p>
            <Button size="lg" className="h-12 text-lg px-8 rounded-xl" asChild>
              <Link to="/assessments">
                Get Started for Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

    
      <Footer />
    </div>
  );
};

export default Index;

