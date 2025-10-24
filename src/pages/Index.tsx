
import Layout from "@/components/Layout";
import SearchSection from "@/components/SearchSection";
import FeaturedSection from "@/components/FeaturedSection";
import CategoriesSection from "@/components/CategoriesSection";
import AssessmentCard from "@/components/AssessmentCard";
import { useAssessments } from "@/hooks/useAssessments";
import { sampleAssessments } from "@/data/assessments";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Grid, List, SlidersHorizontal } from "lucide-react";
import { Shield, Users, Award, Globe, Clock, Star, Target, Lightbulb, Brain, Compass } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const Index = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"featured" | "popular" | "newest" | "rating">("featured");

  // Fetch assessments from backend
  const { data: apiAssessments, isLoading, error } = useAssessments();

  // Use API data if available, otherwise fallback to sample data
  const assessments = apiAssessments && apiAssessments.length > 0 ? apiAssessments : sampleAssessments;

  // Get all assessments (no category filtering)
  const filteredAssessments = assessments;

  // Sort assessments based on selected criteria
  const sortedAssessments = useMemo(() => {
    let sorted = [...filteredAssessments];
    
    switch (sortBy) {
      case "featured":
        return sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      case "popular":
        return sorted.sort((a, b) => {
          // Handle both sample data (completions) and API data (metadata.userCount)
          const aCompletions = 'completions' in a ? a.completions : parseInt(a.metadata?.userCount?.replace(/[^0-9]/g, '') || '0');
          const bCompletions = 'completions' in b ? b.completions : parseInt(b.metadata?.userCount?.replace(/[^0-9]/g, '') || '0');
          return bCompletions - aCompletions;
        });
      case "rating":
        return sorted.sort((a, b) => {
          // Handle both sample data (rating) and API data (default to 0 if no rating)
          const aRating = 'rating' in a ? a.rating : 0;
          const bRating = 'rating' in b ? b.rating : 0;
          return bRating - aRating;
        });
      case "newest":
        return sorted; // In a real app, this would sort by creation date
      default:
        return sorted;
    }
  }, [sortBy, filteredAssessments]);

  return (
    <Layout>
      <SearchSection />
      <FeaturedSection />
      
      {/* Categories Section */}
      <CategoriesSection />

      {/* Assessment Grid Section */}
      <section className="py-12 bg-factorbeam-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-heading mb-2">
                Featured Assessments
              </h2>
              <p className="text-sm sm:text-base text-foreground-soft">
                Start with our most popular and scientifically-validated assessments
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="h-8 w-8 p-0"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="h-8 w-8 p-0"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
              
              <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Sort by: </span>{sortBy}
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-foreground-soft">Loading assessments...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <p className="text-yellow-800 text-sm">
                  ⚠️ Using sample data. Some features may be limited.
                </p>
              </div>
              <div className={`grid gap-4 sm:gap-6 ${
                viewMode === "grid" 
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
                  : "grid-cols-1"
              }`}>
                {sortedAssessments.slice(0, 6).map((assessment) => (
                  <AssessmentCard key={assessment.id} {...assessment} />
                ))}
              </div>
            </div>
          ) : (
            <div className={`grid gap-4 sm:gap-6 ${
              viewMode === "grid" 
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
                : "grid-cols-1"
            }`}>
              {sortedAssessments.slice(0, 6).map((assessment) => (
                <AssessmentCard key={assessment.id} {...assessment} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Button size="lg" className="px-8" asChild>
              <Link to="/assessments">
                View All Assessments
              </Link>
            </Button>
          </div>
      </div>
      </section>
          

     
      <div className="py-8 px-4 bg-factorbeam-bg-alt">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Complete Coverage for Every Stage of Life
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto px-4">
              From high school stream selection to career pivots, we've got assessments for every major decision point in your educational and professional journey.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-primary/20 hover:border-primary/40 bg-gradient-to-br from-white to-primary/5">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-3 p-3 bg-primary rounded-full w-fit group-hover:scale-110 transition-transform">
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

            <Card className="group hover:shadow-xl transition-all duration-300 border-primary/20 hover:border-primary/40 bg-gradient-to-br from-white to-primary/5">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-3 p-3 bg-primary rounded-full w-fit group-hover:scale-110 transition-transform">
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

            <Card className="group hover:shadow-xl transition-all duration-300 border-primary/20 hover:border-primary/40 bg-gradient-to-br from-white to-primary/5">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-3 p-3 bg-primary rounded-full w-fit group-hover:scale-110 transition-transform">
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

            <Card className="group hover:shadow-xl transition-all duration-300 border-primary/20 hover:border-primary/40 bg-gradient-to-br from-white to-primary/5">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-3 p-3 bg-primary rounded-full w-fit group-hover:scale-110 transition-transform">
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

            <Card className="group hover:shadow-xl transition-all duration-300 border-primary/20 hover:border-primary/40 bg-gradient-to-br from-white to-primary/5">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-3 p-3 bg-primary rounded-full w-fit group-hover:scale-110 transition-transform">
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

            <Card className="group hover:shadow-xl transition-all duration-300 border-primary/20 hover:border-primary/40 bg-gradient-to-br from-white to-primary/5">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-3 p-3 bg-primary rounded-full w-fit group-hover:scale-110 transition-transform">
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
      </div>

      {/* Social Proof & Testimonials */}
      <div className="py-8 px-4 bg-factorbeam-bg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">What Students Say</h2>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">Real feedback from students who found their path</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <Card className="bg-gradient-to-br from-primary/5 to-white border-primary/20 hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-foreground mb-4">
                  "I've done some basic IoT projects, but this test made me realize how much I've overlooked the security side. It covered things like encryption protocols and attack vectors, which I hadn't studied deeply. It's eye-opening and definitely pushed me to learn more about secure design in IoT devices."
                </p>
                <div className="text-sm text-muted-foreground">
                  <p className="font-semibold text-foreground">Ishita R.</p>
                  <p>ECE Student (3rd Year)</p>
                  {/* <p className="text-xs text-primary font-medium mt-1">Assessment: IoT Security Engineer</p> */}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/5 to-white border-primary/20 hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-foreground mb-4">
                  "This test was a reality check! The questions dove into sensor fusion, path planning, and real-time control. I've worked on autonomous robots before, but the test made me realize how much depth there is in full-system design. Great for anyone interested in self-driving tech or robotics research."
                </p>
                <div className="text-sm text-muted-foreground">
                  <p className="font-semibold text-foreground">Yash Bhatt</p>
                  <p>RAE Student (Final Year)</p>
                  {/* <p className="text-xs text-primary font-medium mt-1">Assessment: Autonomous Systems Engineer</p> */}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/5 to-white border-primary/20 hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-foreground mb-4">
                  "This was my first time taking an RPA-focused test and it was a good intro. The questions covered real-world automation flows and tools like UiPath and Blue Prism. I struggled with a few questions on exception handling, but overall, it helped me decide to pursue an RPA-based final-year project."
                </p>
                <div className="text-sm text-muted-foreground">
                  <p className="font-semibold text-foreground">Riya Kapoor</p>
                  <p>CSE Student (Final Year)</p>
                  {/* <p className="text-xs text-primary font-medium mt-1">Assessment: RPA Developer</p> */}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {/* <div className="py-8 px-4">
        <div className="w-full text-center">
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
      </div> */}
    </Layout>
  );
};

export default Index;

