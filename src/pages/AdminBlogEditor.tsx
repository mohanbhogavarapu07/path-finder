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
  Download
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { API_BASE_URL } from '@/lib/api';
import { toast } from 'sonner';

interface BlogPost {
  _id?: string;
  title: string;
  slug: string;
  content: string;
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
  seo?: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}



const AdminBlogEditor = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [post, setPost] = useState<BlogPost>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    author: 'Path Finder Team',
    category: 'Career Guidance',
    tags: [],
    isPublished: false,
    featured: false,
    date: new Date().toISOString().split('T')[0],
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: []
    }
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newTag, setNewTag] = useState('');
  const [newKeyword, setNewKeyword] = useState('');
  
  // File upload states
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState(false);

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

              const response = await fetch(`${API_BASE_URL}/blog/posts/${postId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (!response.ok) {
        if (response.status === 401) {
          navigate('/admin');
          return;
        }
        if (response.status === 404) {
          // Post not found, redirect to create new post
          toast.error('Post not found. Creating new post instead.');
          navigate('/admin/new-post');
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPost(data);
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

  const handleSave = async (publish: boolean = false) => {
    try {
      setSaving(true);
      setError(null);

      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin');
        return;
      }

      const postData = {
        ...post,
        isPublished: publish ? true : post.isPublished
      };

      let response;
      if (postId) {
        // Update existing post
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
        if (response.status === 401) {
          navigate('/admin');
          return;
        }
        
        // Try to get error message from response
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (e) {
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

  const addKeyword = () => {
    if (newKeyword.trim() && !post.seo?.keywords.includes(newKeyword.trim())) {
      setPost(prev => ({
        ...prev,
        seo: {
          ...prev.seo!,
          keywords: [...(prev.seo?.keywords || []), newKeyword.trim()]
        }
      }));
      setNewKeyword('');
    }
  };

  const removeKeyword = (keywordToRemove: string) => {
    setPost(prev => ({
      ...prev,
      seo: {
        ...prev.seo!,
        keywords: prev.seo?.keywords.filter(keyword => keyword !== keywordToRemove) || []
      }
    }));
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
      <div className="min-h-screen bg-blue-50">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading post...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <Navigation />
      
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

              {/* Content */}
              <Card className="bg-white border border-gray-100 shadow-sm">
                <CardHeader>
                  <CardTitle>Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Write your blog post content here..."
                    value={post.content}
                    onChange={(e) => setPost(prev => ({ ...prev, content: e.target.value }))}
                    rows={20}
                    className="font-mono"
                  />
                </CardContent>
              </Card>
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

              {/* SEO Settings */}
              <Card className="bg-white border border-gray-100 shadow-sm">
                <CardHeader>
                  <CardTitle>SEO Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Meta Title</label>
                    <Input
                      value={post.seo?.metaTitle || ''}
                      onChange={(e) => setPost(prev => ({
                        ...prev,
                        seo: { ...prev.seo!, metaTitle: e.target.value }
                      }))}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Meta Description</label>
                    <Textarea
                      value={post.seo?.metaDescription || ''}
                      onChange={(e) => setPost(prev => ({
                        ...prev,
                        seo: { ...prev.seo!, metaDescription: e.target.value }
                      }))}
                      rows={3}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Keywords</label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        placeholder="Add keyword..."
                        value={newKeyword}
                        onChange={(e) => setNewKeyword(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                      />
                      <Button onClick={addKeyword} size="sm">Add</Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-2">
                      {post.seo?.keywords.map(keyword => (
                        <Badge key={keyword} variant="outline" className="cursor-pointer" onClick={() => removeKeyword(keyword)}>
                          {keyword} ×
                        </Badge>
                      ))}
                    </div>
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

      <Footer />
    </div>
  );
};

export default AdminBlogEditor; 