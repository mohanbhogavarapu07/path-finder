
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, Tag, Search, Filter, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getBlogPosts, getBlogCategories, searchBlogPosts, getBlogPostsByCategory, BlogPost, BlogPostList } from '@/lib/api';
import { format } from 'date-fns';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Array<{ _id: string; count: number }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  // Fetch blog posts and categories on component mount
  useEffect(() => {
    fetchBlogData();
  }, [currentPage, selectedCategory]);

  const fetchBlogData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch categories if not already loaded
      if (categories.length === 0) {
        const categoriesData = await getBlogCategories();
        setCategories(categoriesData);
      }

      // Fetch blog posts
      let postsData: BlogPostList;
      
      if (searchTerm.trim()) {
        postsData = await searchBlogPosts(searchTerm, currentPage, 10);
      } else if (selectedCategory !== 'All') {
        postsData = await getBlogPostsByCategory(selectedCategory, currentPage, 10);
      } else {
        postsData = await getBlogPosts({
          page: currentPage,
          limit: 10,
          category: selectedCategory === 'All' ? undefined : selectedCategory
        });
      }

      setBlogPosts(postsData.posts);
      setTotalPages(postsData.totalPages);
      setTotalPosts(postsData.total);
    } catch (err) {
      console.error('Error fetching blog data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setCurrentPage(1);
    await fetchBlogData();
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setSearchTerm('');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredPosts = blogPosts;

  const featuredPosts = blogPosts.filter(post => post.featured);

  if (loading && blogPosts.length === 0) {
    return (
      <div className="min-h-screen bg-blue-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading blog posts...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="text-red-500 text-xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Blog</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={fetchBlogData} variant="outline">
              Try Again
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <Header />
      
      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Category Filter and Search */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                <div className="flex items-center gap-4 flex-1">
                  <Filter className="h-5 w-5 text-gray-500" />
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={selectedCategory === 'All' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleCategoryChange('All')}
                    >
                      All ({totalPosts})
                    </Button>
                    {categories.map((category) => (
                      <Button
                        key={category._id}
                        variant={selectedCategory === category._id ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleCategoryChange(category._id)}
                      >
                        {category._id} ({category.count})
                      </Button>
                    ))}
                  </div>
                </div>
                
                {/* Search Bar */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-none">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Search posts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      className="pl-10 w-full sm:w-64"
                    />
                  </div>
                  <Button
                    onClick={handleSearch}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Search
                  </Button>
                </div>
              </div>

              {/* Blog Posts */}
              {filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts found</h3>
                  <p className="text-gray-600">
                    {searchTerm ? `No posts match "${searchTerm}"` : 'No posts in this category yet'}
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredPosts.map((post) => (
                    <Card key={post._id} className="group hover:shadow-lg transition-shadow overflow-hidden bg-white border border-gray-100 shadow-sm">
                      {/* Featured Image */}
                      {post.featuredImage && (
                        <div className="aspect-video overflow-hidden">
                          <img 
                            src={`https://pf-backend-6p4g.onrender.com${post.featuredImage}`}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="secondary" className="text-xs">
                                {post.category}
                              </Badge>
                              {post.featured && (
                                <Badge variant="default" className="text-xs">
                                  Featured
                                </Badge>
                              )}
                            </div>
                            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                              <Link to={`/blog/${post.slug}`}>
                                {post.title}
                              </Link>
                            </h3>
                            <p className="text-gray-600 mb-4 line-clamp-2">
                              {post.excerpt}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <User className="h-4 w-4" />
                                  {post.author}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {format(new Date(post.date), 'MMM d, yyyy')}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {post.readTime}
                                </span>
                              </div>
                              <Link
                                to={`/blog/${post.slug}`}
                                className="flex items-center gap-1 text-primary hover:text-primary/80 font-medium"
                              >
                                Read More
                                <ArrowRight className="h-4 w-4" />
                              </Link>
                            </div>
                          </div>
                        </div>
                        
                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                            <Tag className="h-4 w-4 text-gray-400" />
                            <div className="flex flex-wrap gap-1">
                              {post.tags.slice(0, 3).map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {post.tags.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{post.tags.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </Button>
                    ))}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Categories */}
                <Card className="bg-white border border-gray-100 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button
                        variant={selectedCategory === 'All' ? 'default' : 'ghost'}
                        className="w-full justify-start"
                        onClick={() => handleCategoryChange('All')}
                      >
                        All Posts ({totalPosts})
                      </Button>
                      {categories.map((category) => (
                        <Button
                          key={category._id}
                          variant={selectedCategory === category._id ? 'default' : 'ghost'}
                          className="w-full justify-start"
                          onClick={() => handleCategoryChange(category._id)}
                        >
                          {category._id} ({category.count})
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Newsletter Signup */}
                <Card className="bg-white border border-gray-100 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Stay Updated</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Get the latest career insights and assessment tips delivered to your inbox.
                    </p>
                    <div className="space-y-2">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        className="text-sm"
                      />
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="sm">
                        Subscribe
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
