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
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { apiClient } from '@/lib/api';
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
  featuredImage?: string;
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

interface FileUpload {
  file: File;
  id: string;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  url?: string;
  _id?: string;
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
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string>('');
  const [fileUploads, setFileUploads] = useState<FileUpload[]>([]);
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

      const response = await fetch(`http://localhost:5000/api/blog/posts/${postId}`, {
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
        response = await fetch(`http://localhost:5000/api/blog/posts/${postId}`, {
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
        response = await fetch('http://localhost:5000/api/blog/posts', {
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
      if (fileUploads.length > 0 || coverImage) {
        try {
          // Upload cover image first if selected
          if (coverImage) {
            await uploadCoverImage(savedPost._id);
          }

          // Upload attachments
          if (fileUploads.length > 0) {
            await uploadFiles(savedPost._id);
          }

          // Refresh the post data to get the updated attachments
          const refreshResponse = await fetch(`http://localhost:5000/api/blog/posts/${savedPost._id}`, {
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
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Cover image must be less than 5MB');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }

      setCoverImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeCoverImage = () => {
    setCoverImage(null);
    setCoverImagePreview('');
    setPost(prev => ({ ...prev, featuredImage: undefined }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    console.log('Files selected:', files); // Debug log
    
    files.forEach(file => {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error(`${file.name} is too large. Maximum size is 10MB`);
        return;
      }

      const uploadId = Math.random().toString(36).substr(2, 9);
      const newUpload: FileUpload = {
        file,
        id: uploadId,
        progress: 0,
        status: 'uploading'
      };

      setFileUploads(prev => [...prev, newUpload]);
    });
  };

  // Function to trigger file input clicks
  const triggerCoverImageInput = () => {
    console.log('Triggering cover image input...'); // Debug log
    toast.info('Opening file dialog for cover image...'); // Visual feedback
    const input = document.getElementById('cover-image-input') as HTMLInputElement;
    if (input) {
      console.log('Cover image input found, clicking...'); // Debug log
      input.click();
    } else {
      console.log('Cover image input not found!'); // Debug log
      toast.error('File input not found!');
    }
  };

  const triggerFileUploadInput = () => {
    console.log('Triggering file upload input...'); // Debug log
    toast.info('Opening file dialog for attachments...'); // Visual feedback
    const input = document.getElementById('file-upload-input') as HTMLInputElement;
    if (input) {
      console.log('File upload input found, clicking...'); // Debug log
      input.click();
    } else {
      console.log('File upload input not found!'); // Debug log
      toast.error('File input not found!');
    }
  };

  const removeFileUpload = (uploadId: string) => {
    setFileUploads(prev => prev.filter(upload => upload.id !== uploadId));
  };

  const uploadFiles = async (postId: string) => {
    if (fileUploads.length === 0) return;

    console.log('Starting file uploads...', fileUploads.length, 'files'); // Debug
    setUploadingFiles(true);

    for (const upload of fileUploads) {
      try {
        console.log('Uploading file:', upload.file.name); // Debug
        const formData = new FormData();
        formData.append('files', upload.file); // Changed from 'file' to 'files'
        formData.append('postId', postId);
        
        console.log('Adding postId to upload:', postId); // Debug

        const response = await fetch('http://localhost:5000/api/blog/upload', {
          method: 'POST',
          body: formData,
          credentials: 'include'
        });

        console.log('Upload response status:', response.status); // Debug

        if (response.ok) {
          const data = await response.json();
          console.log('Upload response data:', data); // Debug
          
          // Update upload status
          setFileUploads(prev => prev.map(u => 
            u.id === upload.id 
              ? { ...u, status: 'success', url: data.attachments[0].url, _id: data.attachments[0]._id }
              : u
          ));

          // Add to post attachments (for new posts, this will be saved when the post is created)
          setPost(prev => ({
            ...prev,
            attachments: [...(prev.attachments || []), {
              _id: data.attachments[0]._id,
              name: upload.file.name,
              url: data.attachments[0].url,
              type: upload.file.type
            }]
          }));

          toast.success(`${upload.file.name} uploaded successfully`);
        } else {
          const errorText = await response.text();
          console.error('Upload failed:', response.status, errorText); // Debug
          throw new Error(`Upload failed: ${response.status} - ${errorText}`);
        }
      } catch (error) {
        console.error('Upload error:', error); // Debug
        setFileUploads(prev => prev.map(u => 
          u.id === upload.id ? { ...u, status: 'error' } : u
        ));
        toast.error(`Failed to upload ${upload.file.name}: ${error}`);
      }
    }

    setUploadingFiles(false);
  };

  const uploadCoverImage = async (postId: string) => {
    if (!coverImage) return;

    console.log('Uploading cover image:', coverImage.name); // Debug
    const formData = new FormData();
    formData.append('files', coverImage); // Changed from 'file' to 'files'
    formData.append('postId', postId);
    formData.append('isCoverImage', 'true'); // Add flag to identify cover image
    
    console.log('Adding postId to cover image upload:', postId); // Debug

    try {
      const response = await fetch('http://localhost:5000/api/blog/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      console.log('Cover image upload response status:', response.status); // Debug

      if (response.ok) {
        const data = await response.json();
        console.log('Cover image upload response data:', data); // Debug
        setPost(prev => ({ ...prev, featuredImage: data.featuredImage }));
        toast.success('Cover image uploaded successfully');
      } else {
        const errorText = await response.text();
        console.error('Cover image upload failed:', response.status, errorText); // Debug
        throw new Error(`Upload failed: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error('Cover image upload error:', error); // Debug
      toast.error(`Failed to upload cover image: ${error}`);
    }
  };

  const removeAttachment = async (attachmentId: string) => {
    const token = localStorage.getItem('adminToken');
    
    try {
      const response = await fetch(`http://localhost:5000/api/blog/posts/${postId}/attachments/${attachmentId}`, {
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      {/* Editor Header */}
      <section className="py-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/admin')}
                className="text-white hover:text-white/80"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Admin
              </Button>
              <div>
                <h1 className="text-2xl font-bold">
                  {postId ? 'Edit Blog Post' : 'Create New Blog Post'}
                </h1>
                <p className="text-blue-100">Write and manage your blog content</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => handleSave(false)}
                disabled={saving}
                className="text-white border-white/30 hover:bg-white/10"
              >
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Saving...' : 'Save Draft'}
              </Button>
              
              <Button
                onClick={() => handleSave(true)}
                disabled={saving}
                className="bg-white text-blue-600 hover:bg-blue-50"
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
              <Card>
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
              <Card>
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
              <Card>
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
              <Card>
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
              <Card>
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
              <Card>
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
              <Card>
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

              {/* Cover Image */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Image className="h-5 w-5" />
                    Cover Image
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {coverImagePreview || post.featuredImage ? (
                    <div className="relative">
                      <img 
                        src={coverImagePreview || post.featuredImage} 
                        alt="Cover preview" 
                        className="w-full h-32 object-cover rounded-md"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={removeCoverImage}
                        className="absolute top-2 right-2"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                      <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Upload cover image</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCoverImageChange}
                        className="hidden"
                        id="cover-image-input"
                        style={{ display: 'none' }}
                      />
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="cursor-pointer" 
                        onClick={triggerCoverImageInput}
                        type="button"
                      >
                        Choose Image
                      </Button>
                    </div>
                  )}
                  
                  {coverImage && !coverImagePreview && (
                    <div className="text-sm text-gray-600">
                      Selected: {coverImage.name}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* File Attachments */}
              <Card>
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
                    <p className="text-sm text-gray-600 mb-2">Upload files (max 10MB each)</p>
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

                  {/* Pending uploads */}
                  {fileUploads.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Pending Uploads</h4>
                      {fileUploads.map(upload => (
                        <div key={upload.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center gap-2">
                            <File className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">{upload.file.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {upload.status === 'uploading' && (
                              <div className="text-xs text-blue-600">Uploading...</div>
                            )}
                            {upload.status === 'success' && (
                              <div className="text-xs text-green-600">✓ Uploaded</div>
                            )}
                            {upload.status === 'error' && (
                              <div className="text-xs text-red-600">✗ Failed</div>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFileUpload(upload.id)}
                              className="h-6 w-6 p-0"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
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
                              href={`http://localhost:5000${attachment.url}`}
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