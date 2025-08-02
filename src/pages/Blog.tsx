
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, Tag, Search, Filter, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const blogPosts = [
    {
      id: 1,
      title: "How to Choose the Right Engineering Stream in 2024",
      excerpt: "A comprehensive guide to understanding different engineering disciplines and making an informed choice that aligns with your interests and career goals.",
      author: "Dr. Sarah Johnson",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "Career Guidance",
      tags: ["Engineering", "Career Choice", "Students"],
      image: "/api/placeholder/600/300",
      featured: true
    },
    {
      id: 2,
      title: "The Psychology Behind Career Assessment Tests",
      excerpt: "Discover the scientific principles that make career assessments effective tools for understanding your professional potential and personality fit.",
      author: "Dr. Priya Patel",
      date: "2024-01-12",
      readTime: "6 min read",
      category: "Assessment Science",
      tags: ["Psychology", "Assessment", "Research"],
      image: "/api/placeholder/600/300",
      featured: false
    },
    {
      id: 3,
      title: "Top 10 Emerging Tech Careers for 2024",
      excerpt: "Explore the fastest-growing technology careers and understand what skills you need to succeed in the digital economy of tomorrow.",
      author: "Michael Chen",
      date: "2024-01-10",
      readTime: "10 min read",
      category: "Technology",
      tags: ["Technology", "Future Careers", "Skills"],
      image: "/api/placeholder/600/300",
      featured: true
    },
    {
      id: 4,
      title: "Understanding Your WISCAR Analysis Results",
      excerpt: "A detailed breakdown of how to interpret your WISCAR assessment results and use them to make informed academic and career decisions.",
      author: "James Wilson",
      date: "2024-01-08",
      readTime: "7 min read",
      category: "Assessment Guide",
      tags: ["WISCAR", "Assessment", "Career Planning"],
      image: "/api/placeholder/600/300",
      featured: false
    },
    {
      id: 5,
      title: "The Rise of Data Science: Is It Right for You?",
      excerpt: "Explore the world of data science, understand the required skills, and discover if this rapidly growing field aligns with your interests.",
      author: "Dr. Sarah Johnson",
      date: "2024-01-05",
      readTime: "9 min read",
      category: "Career Spotlight",
      tags: ["Data Science", "Analytics", "Career Path"],
      image: "/api/placeholder/600/300",
      featured: false
    },
    {
      id: 6,
      title: "Medical vs Engineering: Making the Right Choice",
      excerpt: "A comprehensive comparison of medical and engineering careers to help you understand which path might be the better fit for your goals.",
      author: "Dr. Priya Patel",
      date: "2024-01-03",
      readTime: "12 min read",
      category: "Career Guidance",
      tags: ["Medical", "Engineering", "Comparison"],
      image: "/api/placeholder/600/300",
      featured: false
    }
  ];

  const categories = ["All", "Career Guidance", "Assessment Science", "Technology", "Assessment Guide", "Career Spotlight"];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);
  const recentPosts = blogPosts.slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-24 bg-blue-600 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <span className="text-sm font-medium">Expert Career Insights & Guidance</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Career Insights &
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent"> Expert Guidance</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Discover actionable insights, expert advice, and the latest trends to accelerate your career journey and make informed educational decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Featured Articles</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our most popular and impactful career guidance articles, handpicked by our experts
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {featuredPosts.map(post => (
              <Link key={post.id} to={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`}>
                <Card className="group cursor-pointer hover:shadow-card transition-all duration-300 border-2 hover:border-primary/20 bg-card">
                <div className="relative overflow-hidden">
                  <div className="h-56 bg-blue-50 flex items-center justify-center">
                    <div className="text-4xl opacity-20">📚</div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-yellow-500 text-white shadow-sm">Featured</Badge>
                  </div>
                </div>
                
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      {post.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors leading-tight">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-3">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs border-primary/20 text-primary/80">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="ghost" size="sm" className="group-hover:bg-primary/5 text-primary">
                      Read More <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filter */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                                          className="border border-border rounded-md px-3 py-2 text-sm"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="space-y-6">
              {filteredPosts.map(post => (
                <Link key={post.id} to={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  <Card className="group cursor-pointer hover:shadow-card transition-all duration-300 border hover:border-primary/20 bg-card">
                    <div className="md:flex">
                    <div className="md:w-80 flex-shrink-0">
                      <div className="h-48 md:h-full bg-blue-50 flex items-center justify-center">
                        <div className="text-3xl opacity-30">
                          {post.category === 'Technology' ? '💻' :
                           post.category === 'Career Guidance' ? '🎯' :
                           post.category === 'Assessment Science' ? '🧠' : '📖'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1 p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                          {post.category}
                        </Badge>
                        {post.featured && (
                          <Badge className="bg-yellow-500 text-white">Featured</Badge>
                        )}
                      </div>
                      
                      <CardTitle className="text-xl group-hover:text-primary transition-colors mb-3 leading-tight">
                        {post.title}
                      </CardTitle>
                      
                      <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-2">{post.excerpt}</p>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {post.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(post.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {post.readTime}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 3).map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs border-primary/20 text-primary/80">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Button variant="ghost" size="sm" className="group-hover:bg-primary/5 text-primary">
                          Read More <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No articles found matching your search criteria.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Recent Posts */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-lg">Recent Articles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPosts.map(post => (
                    <Link key={post.id} to={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`}>
                      <div className="group cursor-pointer">
                      <h4 className="font-medium text-sm group-hover:text-thinkera-purple transition-colors mb-1 line-clamp-2">
                        {post.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                    </div>
                  </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.slice(1).map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className="block w-full text-left text-sm text-muted-foreground hover:text-thinkera-purple py-1"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Stay Updated</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Subscribe to get the latest career insights and educational guidance.
                </p>
                <div className="space-y-3">
                  <Input type="email" placeholder="Enter your email" />
                  <Button className="w-full" size="sm">Subscribe</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
