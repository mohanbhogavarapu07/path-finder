import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Star, 
  Calendar, 
  User, 
  Search,
  Filter,
  LogOut
} from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { apiClient } from '@/lib/api';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  isPublished: boolean;
  featured: boolean;
  analytics: {
    views: number;
    shares: number;
    likes: number;
  };
}

const Admin = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(true);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Initialize refs array
  useEffect(() => {
    otpInputRefs.current = otpInputRefs.current.slice(0, 6);
  }, []);

  // Check for existing session
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
      setShowAuthModal(false);
      // Only fetch posts after authentication is confirmed
      setTimeout(() => {
        fetchPosts();
      }, 100);
    } else {
      // If no token, ensure we show the auth modal
      setIsAuthenticated(false);
      setShowAuthModal(true);
    }
  }, []);

  // Add effect to refetch posts when filters change (only if authenticated)
  useEffect(() => {
    if (isAuthenticated && !showAuthModal) {
      fetchPosts();
    }
  }, [currentPage, statusFilter, categoryFilter, isAuthenticated, showAuthModal]);

  // Request OTP
  const requestOTP = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('OTP sent to admin email');
        setShowOtpInput(true);
      } else {
        toast.error(data.message || 'Failed to send OTP');
      }
    } catch (error) {
      toast.error('Error sending OTP');
    }
  };

  // Handle OTP input change
  const handleOtpChange = (index: number, value: string) => {
    // Only allow single digit numbers
    if (!/^\d*$/.test(value)) {
      return;
    }

    // Take only the last character if multiple characters are pasted
    const digit = value.slice(-1);
    
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Move to next input if a digit was entered
    if (digit && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  // Handle OTP key down
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Move to previous input on backspace if current input is empty
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain');
    const digits = pastedData.replace(/\D/g, '').slice(0, 6).split('');
    
    const newOtp = [...otp];
    digits.forEach((digit, index) => {
      if (index < 6) {
        newOtp[index] = digit;
      }
    });
    
    setOtp(newOtp);
    
    // Focus the next empty input or the last input
    const nextEmptyIndex = newOtp.findIndex(digit => !digit);
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    otpInputRefs.current[focusIndex]?.focus();
  };

  // Verify OTP
  const verifyOTP = async () => {
    try {
      const otpString = otp.join('');
      if (otpString.length !== 6) {
        toast.error('Please enter complete OTP');
        return;
      }

      const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp: otpString }),
        credentials: 'include'
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        setIsAuthenticated(true);
        setShowAuthModal(false);
        toast.success('Authentication successful');
        fetchPosts();
      } else {
        toast.error(data.message || 'Invalid OTP');
        setOtp(['', '', '', '', '', '']); // Reset OTP on error
        otpInputRefs.current[0]?.focus(); // Focus first input
      }
    } catch (error) {
      toast.error('Error verifying OTP');
    }
  };

  const fetchPosts = async () => {
    try {
      // Don't fetch if not authenticated
      if (!isAuthenticated || showAuthModal) {
        return;
      }

      setLoading(true);
      setError(null);

      const token = localStorage.getItem('adminToken');
      if (!token) {
        setIsAuthenticated(false);
        setShowAuthModal(true);
        return;
      }

      const params = new URLSearchParams();
      params.append('page', currentPage.toString());
      params.append('limit', '10');
      if (statusFilter !== 'all') {
        params.append('status', statusFilter);
      }
      if (categoryFilter !== 'all') {
        params.append('category', categoryFilter);
      }

      const response = await fetch(`http://localhost:5000/api/blog/posts?${params.toString()}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('adminToken');
          setIsAuthenticated(false);
          setShowAuthModal(true);
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPosts(data.posts);
      setTotalPages(data.totalPages);
      setTotalPosts(data.total);
    } catch (err) {
      console.error('Error fetching posts:', err);
      if (err instanceof Error && err.message.includes('401')) {
        // Handle unauthorized - clear any existing session
        localStorage.removeItem('adminToken');
        setIsAuthenticated(false);
        setShowAuthModal(true);
      } else {
        setError(err instanceof Error ? err.message : 'Failed to load posts');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/blog/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      fetchPosts(); // Refresh the list
      toast.success('Post deleted successfully');
    } catch (err) {
      console.error('Error deleting post:', err);
      toast.error('Failed to delete post');
    }
  };

  const handleTogglePublish = async (postId: string, currentStatus: boolean) => {
    try {
      const token = localStorage.getItem('adminToken');
      const post = posts.find(p => p._id === postId);
      if (!post) return;

      const response = await fetch(`http://localhost:5000/api/blog/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...post,
          isPublished: !currentStatus
        }),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      fetchPosts(); // Refresh the list
      toast.success(`Post ${!currentStatus ? 'published' : 'unpublished'} successfully`);
    } catch (err) {
      console.error('Error updating post:', err);
      toast.error('Failed to update post');
    }
  };

  const handleToggleFeatured = async (postId: string, currentStatus: boolean) => {
    try {
      const token = localStorage.getItem('adminToken');
      const post = posts.find(p => p._id === postId);
      if (!post) return;

      const response = await fetch(`http://localhost:5000/api/blog/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...post,
          featured: !currentStatus
        }),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      fetchPosts(); // Refresh the list
      toast.success(`Post ${!currentStatus ? 'featured' : 'unfeatured'} successfully`);
    } catch (err) {
      console.error('Error updating post:', err);
      toast.error('Failed to update post');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setShowAuthModal(true);
    toast.success('Logged out successfully');
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Auth Modal Component
  const AuthModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">Admin Authentication</h2>
        {!showOtpInput ? (
          <div className="space-y-4">
            <p className="text-gray-600 mb-4">
              Click the button below to receive an OTP at the admin email address
            </p>
            <Button
              onClick={requestOTP}
              className="w-full"
            >
              Request OTP
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-600 mb-4">
              Enter the OTP sent to the admin email address
            </p>
            <div className="flex justify-center space-x-2 mb-4" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  ref={el => otpInputRefs.current[index] = el}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  maxLength={1}
                  className="w-12 h-12 text-center text-xl"
                  autoFocus={index === 0}
                />
              ))}
            </div>
            <div className="flex space-x-4">
              <Button
                onClick={verifyOTP}
                className="flex-1"
              >
                Verify OTP
              </Button>
              <Button
                onClick={requestOTP}
                variant="outline"
                className="flex-1"
              >
                Resend OTP
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />
        <AuthModal />
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Dashboard</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={fetchPosts} variant="outline">
              Try Again
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      {/* Admin Header */}
      <section className="py-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-blue-100">Manage your blog posts and content</p>
            </div>
            <div className="flex gap-4">
              <Button 
                onClick={() => navigate('/admin/new-post')}
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Button>
              <Button 
                variant="outline" 
                className="text-white border-white/30 hover:bg-white/10"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {totalPosts}
                </div>
                <p className="text-gray-600">Total Posts</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {posts.filter(p => p.isPublished).length}
                </div>
                <p className="text-gray-600">Published</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {posts.filter(p => !p.isPublished).length}
                </div>
                <p className="text-gray-600">Drafts</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {posts.filter(p => p.featured).length}
                </div>
                <p className="text-gray-600">Featured</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-6 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-4 items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
              
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="Career Guidance">Career Guidance</option>
                <option value="Entrance Exams">Entrance Exams</option>
                <option value="Psychology">Psychology</option>
                <option value="Study Tips">Study Tips</option>
                <option value="Skill Development">Skill Development</option>
                <option value="Success Stories">Success Stories</option>
              </select>
            </div>
            
            <div className="text-sm text-gray-600">
              Showing {filteredPosts.length} of {totalPosts} posts
            </div>
          </div>
        </div>
      </section>

      {/* Posts Table */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Card>
            <CardHeader>
              <CardTitle>Blog Posts</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts found</h3>
                  <p className="text-gray-600 mb-4">
                    {searchTerm ? `No posts match "${searchTerm}"` : 'No posts in this category yet'}
                  </p>
                  <Button onClick={() => navigate('/admin/new-post')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Post
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredPosts.map((post) => (
                    <div key={post._id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
                            {post.featured && (
                              <Badge variant="default" className="bg-yellow-500 text-white">
                                <Star className="h-3 w-3 mr-1" />
                                Featured
                              </Badge>
                            )}
                            <Badge variant={post.isPublished ? 'default' : 'secondary'}>
                              {post.isPublished ? 'Published' : 'Draft'}
                            </Badge>
                            <Badge variant="outline">{post.category}</Badge>
                          </div>
                          
                          <p className="text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>
                          
                          <div className="flex items-center gap-6 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              <span>{post.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(post.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              <span>{post.analytics.views} views</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/admin/edit-post/${post._id}`)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleTogglePublish(post._id, post.isPublished)}
                          >
                            {post.isPublished ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleToggleFeatured(post._id, post.featured)}
                          >
                            <Star className={`h-4 w-4 ${post.featured ? 'text-yellow-500' : 'text-gray-400'}`} />
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(post._id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    
                    <span className="flex items-center px-4 text-sm text-gray-600">
                      Page {currentPage} of {totalPages}
                    </span>
                    
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Admin; 