import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, ArrowLeft, Tag, Eye, Download, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Layout from '@/components/Layout';
import AdSenseComponent from '@/components/AdSenseComponent';
import { getBlogPost, type BlogPost, API_BASE_URL } from '@/lib/api';
import { format } from 'date-fns';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to decode HTML entities
  const decodeHtmlEntities = (html: string) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = html;
    return textarea.value;
  };

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
      console.log('Fetched blog post data:', postData);
      console.log('ContentBlocks:', postData.contentBlocks);
      console.log('ContentBlocks length:', postData.contentBlocks?.length);
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
          <h2 className="text-3xl font-bold mt-8 mb-6 text-gray-900 border-b border-gray-200 pb-2">
            {cleanedContent}
          </h2>
        );
      case 'subheading':
        return (
          <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
            {cleanedContent}
          </h3>
        );
      case 'list':
        const listItems = cleanedContent.split('\n').filter(item => item.trim());
        return (
          <ul className="list-disc pl-6 mb-6 space-y-2">
            {listItems.map((item, index) => (
              <li key={index} className="text-gray-700 leading-relaxed">
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
              <p key={index} className="mb-6 leading-relaxed text-gray-700 text-lg">
                {paragraph}
              </p>
            ))}
          </>
        );
      case 'image':
        return (
          <div className="my-8">
            <img 
              src={section.imageUrl} 
              alt={section.imageAlt || 'Blog image'}
              className="max-w-full h-auto rounded-lg shadow-md"
            />
            {section.imageAlt && (
              <p className="mt-3 text-sm text-gray-500 text-center italic">{section.imageAlt}</p>
            )}
          </div>
        );
      case 'quote':
        return (
          <blockquote className="border-l-4 border-blue-500 pl-6 my-8 italic text-gray-700 bg-gray-50 p-4 rounded-r-lg">
            <p className="text-lg">"{cleanedContent}"</p>
          </blockquote>
        );
      default:
        // Split content by line breaks and render each paragraph separately
        const defaultParagraphs = cleanedContent.split('\n').filter(p => p.trim());
        return (
          <>
            {defaultParagraphs.map((paragraph, index) => (
              <p key={index} className="mb-6 leading-relaxed text-gray-700 text-lg">
                {paragraph}
              </p>
            ))}
          </>
        );
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading blog post...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
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
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <AdSenseComponent />
      
      {/* Main Article Container */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate('/blog')} 
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>
          
          {/* Article Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
            {/* Category Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                {post.category}
              </Badge>
              {post.featured && (
                <Badge variant="default" className="bg-yellow-500 text-white">
                  Featured
                </Badge>
              )}
            </div>
            
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">
              {post.title}
            </h1>
            
            {/* Description */}
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {post.excerpt}
            </p>
            
            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{format(new Date(post.publishedAt), 'MMMM d, yyyy')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime || '5 min read'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>1,257 views</span>
              </div>
            </div>
            
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <Tag className="h-4 w-4 text-gray-500 mt-1" />
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="border-gray-300 text-gray-700 bg-gray-50">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          {/* Article Content */}
          <Card className="bg-gray-50 border border-gray-200 shadow-sm">
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none text-gray-800">
                {/* Prioritize contentBlocks over sections */}
                {post.contentBlocks && post.contentBlocks.length > 0 ? (
                  <div className="space-y-6">
                    {post.contentBlocks
                      .sort((a, b) => a.order - b.order)
                      .map((block, index) => (
                        <div key={block.id || index}>
                          {block.type === 'text' && block.content && (
                            <div className="text-gray-700 leading-relaxed">
                              {block.content.split('\n').map((line, lineIndex) => (
                                <p key={lineIndex} className="mb-4">{line}</p>
                              ))}
                            </div>
                          )}
                          {block.type === 'image' && block.imageUrl && (
                            <div className="my-8 text-center">
                              <img
                                src={block.imageUrl}
                                alt={block.imageAlt || 'Content image'}
                                className="max-w-full h-auto rounded-lg shadow-lg mx-auto"
                                style={{ maxHeight: '500px' }}
                              />
                              {block.imageAlt && (
                                <p className="mt-2 text-sm text-gray-600 italic">
                                  {block.imageAlt}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                ) : post.sections && post.sections.length > 0 ? (
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
              </div>
            </CardContent>
          </Card>
          
          {/* Attachments Section */}
          {post.attachments && post.attachments.length > 0 && (
            <Card className="mt-8 bg-white border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Attachments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {post.attachments.map((attachment) => {
                    const isImage = attachment.type.startsWith('image/');
                    const fileUrl = `${API_BASE_URL.replace('/api', '')}${attachment.url}`;
                    
                    return (
                      <div key={attachment._id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
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
                            <ExternalLink className="w-5 h-5 text-gray-400" />
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BlogPost;