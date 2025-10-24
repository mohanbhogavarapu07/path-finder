import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Save, 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  Star, 
  Calendar,
  Tag,
  User,
  FileText,
  Upload,
  Image,
  File,
  X,
  Download,
  Plus,
  Move,
  Trash2,
  Type
} from 'lucide-react';
import Layout from '@/components/Layout';
import { API_BASE_URL } from '@/lib/api';
import { toast } from 'sonner';

interface ContentBlock {
  id: string;
  type: 'text' | 'image';
  content: string;
  imageUrl?: string;
  imageAlt?: string;
  order: number;
}

interface BlogPost {
  _id?: string;
  title: string;
  slug: string;
  content: string;
  contentBlocks: ContentBlock[];
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  isPublished: boolean;
  featured: boolean;
  date: string;

  attachments?: {
    _id: string;
    name: string;
    url: string;
    type: string;
  }[];
}



const AdminBlogEditor = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [post, setPost] = useState<BlogPost>({
    title: '',
    slug: '',
    content: '',
    contentBlocks: [{
      id: '1',
      type: 'text',
      content: '',
      order: 0
    }],
    excerpt: '',
    author: 'Factor Beam Team',
    category: 'Career Guidance',
    tags: [],
    isPublished: false,
    featured: false,
    date: new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newTag, setNewTag] = useState('');
  
  // File upload states
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const categories = [
    'Career Guidance',
    'Entrance Exams',
    'Psychology',
    'Study Tips',
    'Skill Development',
    'Success Stories',
    'Technology',
    'Education'
  ];

  useEffect(() => {
    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin');
        return;
      }

      console.log('Fetching post with ID:', postId);
      console.log('API URL:', `${API_BASE_URL}/blog/posts/${postId}`);

      const response = await fetch(`${API_BASE_URL}/blog/posts/${postId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        if (response.status === 401) {
          navigate('/admin');
          return;
        }
        if (response.status === 404) {
          // Post not found - show more helpful error message
          console.error('Post not found with ID:', postId);
          console.error('This might be due to a data sync issue between list and individual post endpoints');
          toast.error(`Post with ID "${postId}" not found. This might be due to a data sync issue.`);
          setError(`Post with ID "${postId}" not found. This could be due to:
1. The post was deleted from the database
2. There's a mismatch between the list and individual post endpoints
3. The post ID format is different between endpoints

Please try refreshing the admin page to get the latest post list.`);
          return;
        }
        
        // Get more detailed error information
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          console.error('Error response data:', errorData);
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (e) {
          console.error('Could not parse error response:', e);
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('Post data received:', data);
      
      // Handle existing posts that might not have contentBlocks
      if (data.contentBlocks) {
        setPost(data);
      } else {
        // Convert old content format to new contentBlocks format
        const contentBlocks = data.content ? [{
          id: '1',
          type: 'text' as const,
          content: data.content,
          order: 0
        }] : [{
          id: '1',
          type: 'text' as const,
          content: '',
          order: 0
        }];
        
        setPost({
          ...data,
          contentBlocks
        });
      }
    } catch (err) {
      console.error('Error fetching post:', err);
      setError(err instanceof Error ? err.message : 'Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setPost(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }));
  };

  // Generate final content from blocks - SIMPLIFIED like attachments
  const generateContentFromBlocks = () => {
    return post.contentBlocks
      .sort((a, b) => a.order - b.order)
      .filter(block => block.type === 'text' && block.content.trim())
      .map(block => block.content)
      .join('\n\n');
  };

  const handleSave = async (publish: boolean = false) => {
    try {
      setSaving(true);
      setError(null);

      // Validate required fields
      if (!post.title.trim()) {
        setError('Title is required');
        setSaving(false);
        return;
      }
      
      // Check if we have any content in blocks
      const hasContent = post.contentBlocks.some(block => 
        block.type === 'text' ? block.content.trim() : block.imageUrl
      );
      
      if (!hasContent) {
        setError('Content is required');
        setSaving(false);
        return;
      }

      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin');
        return;
      }

      const postData = {
        ...post,
        content: generateContentFromBlocks(),
        contentBlocks: Array.isArray(post.contentBlocks) ? post.contentBlocks.filter(block => 
          block.type === 'text' ? block.content.trim() : block.imageUrl
        ) : [], // Ensure it's always an array and filter out empty blocks
        isPublished: publish ? true : post.isPublished
      };

      console.log('Saving post data:', postData); // Debug log
      console.log('ContentBlocks being sent:', postData.contentBlocks);
      console.log('ContentBlocks validation:', {
        isArray: Array.isArray(postData.contentBlocks),
        length: postData.contentBlocks?.length,
        firstBlock: postData.contentBlocks?.[0]
      });

      let response;
      if (postId) {
        // Update existing post
        console.log('Updating existing post:', postId);
        response = await fetch(`${API_BASE_URL}/blog/posts/${postId}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData),
          credentials: 'include'
        });
      } else {
        // Create new post
        console.log('Creating new post');
        response = await fetch(`${API_BASE_URL}/blog/posts`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData),
          credentials: 'include'
        });
      }

      if (!response.ok) {
        console.error('API Error:', response.status, response.statusText);
        
        if (response.status === 401) {
          navigate('/admin');
          return;
        }
        
        // Try to get error message from response
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          console.error('Error response data:', errorData);
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (e) {
          console.error('Could not parse error response:', e);
          // If we can't parse JSON, use default message
        }
        
        throw new Error(errorMessage);
      }

      const savedPost = await response.json();
      console.log('Post saved successfully:', savedPost); // Debug

      // Now upload files if we have any
      if (selectedFiles.length > 0) {
        try {
          await uploadFiles(savedPost._id);

          // Refresh the post data to get the updated attachments
          const refreshResponse = await fetch(`${API_BASE_URL}/blog/posts/${savedPost._id}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          });

          if (refreshResponse.ok) {
            const refreshedPost = await refreshResponse.json();
            setPost(refreshedPost);
          }

          toast.success('Post and files saved successfully!');
        } catch (uploadError) {
          console.error('Error uploading files:', uploadError);
          toast.error('Post saved but files failed to upload');
        }
      } else {
        toast.success(postId ? 'Post updated successfully!' : 'Post created successfully!');
      }

      navigate('/admin');
    } catch (err) {
      console.error('Error saving post:', err);
      setError(err instanceof Error ? err.message : 'Failed to save post');
    } finally {
      setSaving(false);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !post.tags.includes(newTag.trim())) {
      setPost(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setPost(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // Content block management functions
  const addContentBlock = (type: 'text' | 'image', afterIndex?: number) => {
    const newBlock: ContentBlock = {
      id: Date.now().toString(),
      type,
      content: type === 'text' ? '' : '',
      order: afterIndex !== undefined ? afterIndex + 1 : post.contentBlocks.length,
      ...(type === 'image' && { imageUrl: '', imageAlt: '' })
    };

    setPost(prev => {
      const newBlocks = [...prev.contentBlocks];
      if (afterIndex !== undefined) {
        newBlocks.splice(afterIndex + 1, 0, newBlock);
        // Reorder blocks
        newBlocks.forEach((block, index) => {
          block.order = index;
        });
      } else {
        newBlocks.push(newBlock);
      }
      return { ...prev, contentBlocks: newBlocks };
    });
  };

  const updateContentBlock = (blockId: string, updates: Partial<ContentBlock>) => {
    setPost(prev => ({
      ...prev,
      contentBlocks: prev.contentBlocks.map(block =>
        block.id === blockId ? { ...block, ...updates } : block
      )
    }));
  };

  const removeContentBlock = (blockId: string) => {
    setPost(prev => ({
      ...prev,
      contentBlocks: prev.contentBlocks.filter(block => block.id !== blockId)
    }));
  };

  const moveContentBlock = (blockId: string, direction: 'up' | 'down') => {
    setPost(prev => {
      const blocks = [...prev.contentBlocks];
      const currentIndex = blocks.findIndex(block => block.id === blockId);
      
      if (currentIndex === -1) return prev;
      
      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      
      if (newIndex < 0 || newIndex >= blocks.length) return prev;
      
      // Swap blocks
      [blocks[currentIndex], blocks[newIndex]] = [blocks[newIndex], blocks[currentIndex]];
      
      // Update order
      blocks.forEach((block, index) => {
        block.order = index;
      });
      
      return { ...prev, contentBlocks: blocks };
    });
  };

  const handleImageUpload = async (file: File, blockId: string) => {
    try {
      const formData = new FormData();
      formData.append('files', file);
      // Don't include postId to avoid adding to attachments
      // formData.append('postId', postId);

      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/blog/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        if (data.attachments && data.attachments.length > 0) {
          const imageUrl = data.attachments[0].url;
          const fullImageUrl = `${API_BASE_URL.replace('/api', '')}${imageUrl}`;
          console.log('Image uploaded successfully for content:', {
            originalUrl: imageUrl,
            fullUrl: fullImageUrl,
            blockId,
            note: 'Image will be embedded in content, not added to attachments'
          });
          updateContentBlock(blockId, { 
            imageUrl: fullImageUrl,
            imageAlt: file.name 
          });
          toast.success('Image uploaded successfully');
        }
      } else {
        throw new Error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    }
  };


  // File handling functions
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    console.log('Files selected:', files); // Debug log
    
    const validFiles: File[] = [];
    const errors: string[] = [];
    
    files.forEach(file => {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit (matching backend)
        errors.push(`${file.name} is too large. Maximum size is 5MB`);
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length > 0) {
      errors.forEach(error => toast.error(error));
    }

    if (validFiles.length > 0) {
      setSelectedFiles(validFiles);
      toast.success(`${validFiles.length} file(s) selected successfully`);
    }
  };

  const removeSelectedFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const triggerFileUploadInput = () => {
    const input = document.getElementById('file-upload-input') as HTMLInputElement;
    if (input) {
      input.click();
    } else {
      toast.error('File input not found!');
    }
  };

  const uploadFiles = async (postId: string) => {
    if (selectedFiles.length === 0) {
      toast.error('No files selected for upload');
      return;
    }

    console.log('Starting file uploads...', selectedFiles.length, 'files'); // Debug
    setUploadingFiles(true);

    try {
      const formData = new FormData();
      selectedFiles.forEach(file => {
        formData.append('files', file);
        console.log('Adding file to FormData:', file.name, file.size); // Debug
      });
      formData.append('postId', postId);

      console.log('FormData created, sending request...'); // Debug

      const token = localStorage.getItem('adminToken');
              const response = await fetch(`${API_BASE_URL}/blog/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
        credentials: 'include'
      });

      console.log('Response received:', response.status, response.statusText); // Debug

      if (response.ok) {
        const data = await response.json();
        console.log('Upload response data:', data); // Debug
        
        if (data.attachments && data.attachments.length > 0) {
          // Add to post attachments
          setPost(prev => ({
            ...prev,
            attachments: [...(prev.attachments || []), ...data.attachments]
          }));

          toast.success(`${data.attachments.length} file(s) uploaded successfully`);
          setSelectedFiles([]); // Clear selected files after successful upload
        } else {
          throw new Error('No attachments returned from server');
        }
      } else {
        const errorText = await response.text();
        console.error('Upload failed:', response.status, errorText); // Debug
        throw new Error(`Upload failed: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error('Upload error:', error); // Debug
      toast.error(`Failed to upload files: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setUploadingFiles(false);
    }
  };



  const removeAttachment = async (attachmentId: string) => {
    const token = localStorage.getItem('adminToken');
    
    try {
              const response = await fetch(`${API_BASE_URL}/blog/posts/${postId}/attachments/${attachmentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setPost(prev => ({
          ...prev,
          attachments: prev.attachments?.filter(att => att._id !== attachmentId) || []
        }));
        toast.success('Attachment removed successfully');
      } else {
        throw new Error('Failed to remove attachment');
      }
    } catch (error) {
      toast.error('Failed to remove attachment');
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading post...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Post</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={() => navigate('/admin')}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Admin
              </Button>
              <Button 
                onClick={() => {
                  // Clear any cached data and refresh
                  localStorage.removeItem('adminPostsCache');
                  window.location.reload();
                }}
                variant="default"
                className="flex items-center gap-2"
              >
                Refresh Admin Page
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      
             {/* Editor Header */}
       <section className="py-6 bg-white border-b border-gray-100">
         <div className="container mx-auto px-4">
           <div className="flex items-center justify-between">
             <div className="flex items-center gap-4">
               <Button 
                 variant="ghost" 
                 onClick={() => navigate('/admin')}
                 className="text-gray-700 hover:text-gray-900 hover:bg-gray-100"
               >
                 <ArrowLeft className="h-4 w-4 mr-2" />
                 Back to Admin
               </Button>
               <div>
                 <h1 className="text-2xl font-bold text-gray-900">
                   {postId ? 'Edit Blog Post' : 'Create New Blog Post'}
                 </h1>
                 <p className="text-gray-600">Write and manage your blog content</p>
               </div>
             </div>
             
               <div className="flex gap-2">
                 <Button
                   variant="outline"
                   onClick={() => setPreviewMode(!previewMode)}
                   className="border-gray-300 text-gray-700 hover:bg-gray-50"
                 >
                   <Eye className="h-4 w-4 mr-2" />
                   {previewMode ? 'Edit Mode' : 'Preview'}
                 </Button>
                 
                 <Button
                   variant="outline"
                   onClick={() => handleSave(false)}
                   disabled={saving}
                   className="border-gray-300 text-gray-700 hover:bg-gray-50"
                 >
                   <Save className="h-4 w-4 mr-2" />
                   {saving ? 'Saving...' : 'Save Draft'}
                 </Button>
                 
                 <Button
                   onClick={() => handleSave(true)}
                   disabled={saving}
                   className="bg-blue-600 hover:bg-blue-700 text-white"
                 >
                   <Eye className="h-4 w-4 mr-2" />
                   {saving ? 'Publishing...' : 'Publish'}
                 </Button>
               </div>
           </div>
         </div>
       </section>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mx-4 mt-4">
          {error}
        </div>
      )}

      {/* Editor Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Editor */}
            <div className="lg:col-span-2 space-y-6">
              {/* Preview Mode */}
              {previewMode && (
                <Card className="bg-white border border-gray-100 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      Preview - How your content will look on the frontend
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-lg max-w-none text-gray-800">
                      <div 
                        dangerouslySetInnerHTML={{ __html: generateContentFromBlocks() }}
                        className="text-gray-700 leading-relaxed"
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {/* Title */}
              <Card className="bg-white border border-gray-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Post Title
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="Enter post title..."
                    value={post.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="text-lg"
                  />
                </CardContent>
              </Card>

              {/* Slug */}
              <Card className="bg-white border border-gray-100 shadow-sm">
                <CardHeader>
                  <CardTitle>URL Slug</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="post-url-slug"
                    value={post.slug}
                    onChange={(e) => setPost(prev => ({ ...prev, slug: e.target.value }))}
                  />
                </CardContent>
              </Card>

              {/* Excerpt */}
              <Card className="bg-white border border-gray-100 shadow-sm">
                <CardHeader>
                  <CardTitle>Excerpt</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Brief description of the post..."
                    value={post.excerpt}
                    onChange={(e) => setPost(prev => ({ ...prev, excerpt: e.target.value }))}
                    rows={3}
                  />
                </CardContent>
              </Card>

              {/* Rich Content Editor */}
              {!previewMode && (
              <Card className="bg-white border border-gray-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Content Editor</span>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addContentBlock('text')}
                        className="flex items-center gap-2"
                      >
                        <Type className="h-4 w-4" />
                        Add Text
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addContentBlock('image')}
                        className="flex items-center gap-2"
                      >
                        <Image className="h-4 w-4" />
                        Add Image
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {post.contentBlocks
                    .sort((a, b) => a.order - b.order)
                    .map((block, index) => (
                      <div key={block.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-600">
                              {block.type === 'text' ? 'Text Block' : 'Image Block'}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {index + 1}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => moveContentBlock(block.id, 'up')}
                              disabled={index === 0}
                              className="h-6 w-6 p-0"
                            >
                              <Move className="h-3 w-3 rotate-180" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => moveContentBlock(block.id, 'down')}
                              disabled={index === post.contentBlocks.length - 1}
                              className="h-6 w-6 p-0"
                            >
                              <Move className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => addContentBlock('text', index)}
                              className="h-6 w-6 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeContentBlock(block.id)}
                              className="h-6 w-6 p-0 text-red-600"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        {block.type === 'text' ? (
                          <Textarea
                            placeholder="Write your content here..."
                            value={block.content}
                            onChange={(e) => updateContentBlock(block.id, { content: e.target.value })}
                            rows={6}
                            className="resize-none"
                          />
                        ) : (
                          <div className="space-y-3">
                            {block.imageUrl ? (
                              <div className="relative">
                                <img
                                  src={block.imageUrl}
                                  alt={block.imageAlt || 'Content image'}
                                  className="max-w-full h-auto rounded-lg border border-gray-200"
                                />
                                <div className="mt-2 flex gap-2">
                                  <Input
                                    placeholder="Image alt text"
                                    value={block.imageAlt || ''}
                                    onChange={(e) => updateContentBlock(block.id, { imageAlt: e.target.value })}
                                    className="text-sm"
                                  />
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => updateContentBlock(block.id, { imageUrl: '', imageAlt: '' })}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                                <p className="text-sm text-gray-600 mb-3">Upload an image for this block</p>
                                <p className="text-xs text-gray-500 mb-3">Image will be embedded in the blog content</p>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      handleImageUpload(file, block.id);
                                    }
                                  }}
                                  className="hidden"
                                  id={`image-upload-${block.id}`}
                                />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => document.getElementById(`image-upload-${block.id}`)?.click()}
                                >
                                  Choose Image
                                </Button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                </CardContent>
              </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Publish Settings */}
              <Card className="bg-white border border-gray-100 shadow-sm">
                <CardHeader>
                  <CardTitle>Publish Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Published</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPost(prev => ({ ...prev, isPublished: !prev.isPublished }))}
                    >
                      {post.isPublished ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Featured</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPost(prev => ({ ...prev, featured: !prev.featured }))}
                    >
                      <Star className={`h-4 w-4 ${post.featured ? 'text-yellow-500' : 'text-gray-400'}`} />
                    </Button>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Publish Date</label>
                    <Input
                      type="date"
                      value={post.date}
                      onChange={(e) => setPost(prev => ({ ...prev, date: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Post Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Post Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Author</label>
                    <Input
                      value={post.author}
                      onChange={(e) => setPost(prev => ({ ...prev, author: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Category</label>
                    <select
                      value={post.category}
                      onChange={(e) => setPost(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card className="bg-white border border-gray-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="h-5 w-5" />
                    Tags
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add tag..."
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    />
                    <Button onClick={addTag} size="sm">Add</Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                        {tag} ×
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>




              {/* File Attachments */}
              <Card className="bg-white border border-gray-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <File className="h-5 w-5" />
                    Attachments
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Upload new files */}
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                    <Upload className="h-6 w-6 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Upload files (max 5MB each)</p>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload-input"
                      style={{ display: 'none' }}
                    />
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="cursor-pointer" 
                      onClick={triggerFileUploadInput}
                      type="button"
                    >
                      Choose Files
                    </Button>
                  </div>

                  {/* Selected files */}
                  {selectedFiles.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Selected Files</h4>
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center gap-2">
                            <File className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">{file.name}</span>
                            <span className="text-xs text-gray-500">
                              ({(file.size / 1024 / 1024).toFixed(2)} MB)
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSelectedFile(index)}
                            className="h-6 w-6 p-0"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                                             <Button
                         onClick={() => {
                           if (postId) {
                             uploadFiles(postId);
                           } else {
                             toast.error('Please save the post first before uploading files');
                           }
                         }}
                         disabled={uploadingFiles || !postId}
                         size="sm"
                         className="w-full"
                       >
                         {uploadingFiles ? 'Uploading...' : 'Upload Files'}
                       </Button>
                       {selectedFiles.length > 0 && (
                         <div className="text-xs text-gray-500 mt-2">
                           Ready to upload {selectedFiles.length} file(s)
                         </div>
                       )}
                    </div>
                  )}

                  {/* Existing attachments */}
                  {post.attachments && post.attachments.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Attached Files</h4>
                      {post.attachments.map(attachment => (
                        <div key={attachment._id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center gap-2">
                            <File className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">{attachment.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <a
                              href={`${API_BASE_URL.replace('/api','')}${attachment.url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <Download className="h-4 w-4" />
                            </a>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeAttachment(attachment._id)}
                              className="h-6 w-6 p-0 text-red-600"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default AdminBlogEditor; 