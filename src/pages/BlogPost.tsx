import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, ArrowLeft, Share2, Bookmark, Tag } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { getBlogPost, type BlogPost } from '@/lib/api';
import { format } from 'date-fns';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetchBlogPost();
    }
  }, [slug]);

  const fetchBlogPost = async () => {
    try {
      setLoading(true);
      setError(null);
      const postData = await getBlogPost(slug!);
      setPost(postData);
    } catch (err) {
      console.error('Error fetching blog post:', err);
      setError(err instanceof Error ? err.message : 'Failed to load blog post');
    } finally {
      setLoading(false);
    }
  };

  const renderSection = (section: BlogPost['sections'][0]) => {
    const cleanedContent = section.content
      .replace(/—/g, '—')
      .replace(/–/g, '–')
      .replace(/-\s+/g, '')
      .replace(/\s+-/g, '')
      .trim();

    switch (section.type) {
      case 'heading':
        return (
          <h2 className="text-2xl font-medium mt-8 mb-4 font-playfair text-gray-900">
            {cleanedContent}
          </h2>
        );
      case 'subheading':
        return (
          <h3 className="text-xl font-medium mt-6 mb-3 font-playfair text-gray-900">
            {cleanedContent}
          </h3>
        );
      case 'list':
        const listItems = cleanedContent.split('\n').filter(item => item.trim());
        return (
          <ul className="list-disc pl-6 mb-4">
            {listItems.map((item, index) => (
              <li key={index} className="mb-2 text-gray-700">
                {item.trim()}
              </li>
            ))}
          </ul>
        );
      case 'paragraph':
        // Split content by line breaks and render each paragraph separately
        const paragraphItems = cleanedContent.split('\n').filter(p => p.trim());
        return (
          <>
            {paragraphItems.map((paragraph, index) => (
              <p key={index} className="mb-4 leading-relaxed text-gray-700">
                {paragraph}
              </p>
            ))}
          </>
        );
      case 'image':
        return (
          <div className="my-6">
            <img 
              src={section.imageUrl} 
              alt={section.imageAlt || 'Blog image'}
              className="max-w-full h-auto rounded-lg"
            />
            {section.imageAlt && (
              <p className="mt-2 text-sm text-gray-500 text-center">{section.imageAlt}</p>
            )}
          </div>
        );
      case 'quote':
        return (
          <blockquote className="border-l-4 border-primary pl-4 my-6 italic text-gray-700">
            "{cleanedContent}"
          </blockquote>
        );
      default:
        // Split content by line breaks and render each paragraph separately
        const defaultParagraphs = cleanedContent.split('\n').filter(p => p.trim());
        return (
          <>
            {defaultParagraphs.map((paragraph, index) => (
              <p key={index} className="mb-4 leading-relaxed text-gray-700">
                {paragraph}
              </p>
            ))}
          </>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-50">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading blog post...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-blue-50">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="text-red-500 text-xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Blog Post Not Found</h2>
            <p className="text-gray-600 mb-4">
              {error || 'The blog post you are looking for does not exist.'}
            </p>
            <Button onClick={() => navigate('/blog')} variant="outline">
              Back to Blog
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <Navigation />
      
      {/* Article Header */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/blog')} 
              className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
            
            <div className="mb-6">
                                                             <Badge variant="secondary" className="bg-[#4CAF50]/10 text-[#4CAF50] border-[#4CAF50]/20 mb-4">
                {post.category}
              </Badge>
              {post.featured && (
                <Badge variant="default" className="bg-yellow-500 text-white ml-2">
                  Featured
                </Badge>
              )}
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">
                {post.title}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {post.excerpt}
              </p>
            </div>
            
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>👁️ {post.analytics.views} views</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>
            
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <Tag className="h-4 w-4 text-gray-500" />
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="border-gray-300 text-gray-700">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Article Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 bg-white border border-gray-100 shadow-sm">
              <CardContent className="prose prose-lg max-w-none">
                {post.sections && post.sections.length > 0 ? (
                  post.sections.map((section, index) => (
                    <div key={index}>
                      {renderSection(section)}
                    </div>
                  ))
                ) : (
                  <div 
                    dangerouslySetInnerHTML={{ __html: post.content }}
                    className="text-gray-700 leading-relaxed"
                  />
                )}
              </CardContent>
            </Card>
            
            {/* Attachments */}
            {post.attachments && post.attachments.length > 0 && (
              <Card className="mt-8 p-6 bg-white border border-gray-100 shadow-sm">
                <CardContent>
                  <h3 className="text-xl font-semibold mb-4">Attachments</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {post.attachments.map((attachment) => {
                      const isImage = attachment.type.startsWith('image/');
                      const fileUrl = `${API_BASE_URL.replace('/api','')}${attachment.url}`;
                      
                      return (
                        <div key={attachment._id} className="border border-gray-200 rounded-lg overflow-hidden">
                          {isImage ? (
                            <div className="p-4">
                              <img 
                                src={fileUrl} 
                                alt={attachment.name}
                                className="max-w-full h-auto rounded-lg"
                              />
                              <p className="mt-2 text-sm text-gray-500">{attachment.name}</p>
                            </div>
                          ) : (
                            <a
                              href={fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center p-4 hover:bg-gray-50 transition-colors"
                            >
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">{attachment.name}</p>
                                <p className="text-sm text-gray-500">{attachment.type}</p>
                              </div>
                              <svg
                                className="w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                />
                              </svg>
                            </a>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Call to Action */}

          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default BlogPost;