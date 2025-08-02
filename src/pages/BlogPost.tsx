import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const BlogPost = () => {
  const { slug } = useParams();

  // Mock blog post data - in a real app, this would come from an API
  const post = {
    id: 1,
    title: "How to Choose the Right Engineering Stream in 2024",
    content: `
      <h2>Understanding Engineering Disciplines</h2>
      <p>Choosing the right engineering stream is one of the most important decisions you'll make in your academic journey. With numerous specializations available, it's crucial to understand what each field offers and how it aligns with your interests and career goals.</p>
      
      <h3>1. Computer Science Engineering</h3>
      <p>This field focuses on software development, algorithms, and computer systems. It's perfect for those who love problem-solving and technology.</p>
      
      <h3>2. Mechanical Engineering</h3>
      <p>One of the oldest engineering disciplines, mechanical engineering involves designing and manufacturing machines, engines, and mechanical systems.</p>
      
      <h3>3. Electrical Engineering</h3>
      <p>This field deals with electrical systems, electronics, and power generation. It's ideal for those interested in innovation and technology.</p>
      
      <h2>Factors to Consider</h2>
      <p>When choosing your engineering stream, consider these key factors:</p>
      <ul>
        <li>Your interests and aptitude</li>
        <li>Job market demand</li>
        <li>Salary expectations</li>
        <li>Future growth prospects</li>
        <li>Educational requirements</li>
      </ul>
      
      <h2>Making the Right Choice</h2>
      <p>The best way to choose your engineering stream is to take a comprehensive career assessment that evaluates your interests, skills, and personality traits. Our PathFinder assessments can help you make this crucial decision with confidence.</p>
    `,
    author: "Dr. Sarah Johnson",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Career Guidance",
    tags: ["Engineering", "Career Choice", "Students"],
    excerpt: "A comprehensive guide to understanding different engineering disciplines and making an informed choice that aligns with your interests and career goals."
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Article Header */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link to="/blog" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
            
            <div className="mb-6">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 mb-4">
                {post.category}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                {post.title}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                {post.excerpt}
              </p>
            </div>
            
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <Badge key={tag} variant="outline" className="border-primary/20 text-primary/80">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Article Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 shadow-card">
              <CardContent className="prose prose-lg max-w-none">
                <div 
                  dangerouslySetInnerHTML={{ __html: post.content }}
                  className="text-muted-foreground leading-relaxed"
                />
              </CardContent>
            </Card>
            
            {/* Call to Action */}
            <Card className="mt-12 p-8 bg-blue-50 border-blue-200">
              <CardContent className="text-center">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Ready to Find Your Perfect Career Path?
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Take our comprehensive career assessment to discover which engineering stream 
                  or career path aligns best with your interests and abilities.
                </p>
                <Link to="/assessments">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Start Your Assessment
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default BlogPost;