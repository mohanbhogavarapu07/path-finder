import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface GateJsonUploadProps {
  onUploadSuccess?: (assessment: any) => void;
  onClose?: () => void;
}

const GateJsonUpload: React.FC<GateJsonUploadProps> = ({ onUploadSuccess, onClose }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadMessage, setUploadMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<any>(null);
  const [category, setCategory] = useState('GATE');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.name.endsWith('.json')) {
        toast.error('Please select a JSON file');
        return;
      }
      
      setSelectedFile(file);
      setUploadStatus('idle');
      setUploadMessage('');
      
      // Preview the JSON content
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target?.result as string);
          setPreviewData(jsonData);
        } catch (error) {
          toast.error('Invalid JSON file');
          setSelectedFile(null);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file first');
      return;
    }

    setIsUploading(true);
    setUploadStatus('uploading');
    setUploadMessage('Uploading and processing JSON file...');

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        toast.error('Please log in to upload files');
        return;
      }

      // Validate file before upload
      if (!selectedFile.name.endsWith('.json')) {
        toast.error('Please select a JSON file');
        return;
      }

      console.log('Uploading file:', selectedFile.name, 'Size:', selectedFile.size);

      // Try to read and validate JSON content
      try {
        const fileContent = await selectedFile.text();
        const jsonData = JSON.parse(fileContent);
        console.log('JSON validation successful');
        console.log('Has title:', !!jsonData.title);
        console.log('Has description:', !!jsonData.description);
        console.log('Has gateSections:', !!jsonData.gateSections);
        console.log('Has aptitude:', !!jsonData.gateSections?.aptitude);
        console.log('Has core:', !!jsonData.gateSections?.core);
        console.log('Has results:', !!jsonData.gateSections?.results);
        
        // Set category from input field
        console.log('Setting category to:', category);
        jsonData.category = category;
      } catch (jsonError) {
        console.error('JSON validation failed:', jsonError);
        toast.error('Invalid JSON file format');
        return;
      }

      const formData = new FormData();
      formData.append('gateJsonFile', selectedFile);
      formData.append('category', category);

      const response = await fetch('https://fb-backend-1-d0b6.onrender.com/api/admin/assessments/upload-gate-json', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Upload failed:', response.status, errorText);
        setUploadStatus('error');
        setUploadMessage(`Upload failed: ${response.status} - ${errorText}`);
        toast.error(`Upload failed: ${response.status} - ${errorText}`);
        return;
      }

      const result = await response.json();

      if (response.ok) {
        setUploadStatus('success');
        setUploadMessage('GATE assessment created successfully!');
        toast.success('GATE assessment uploaded successfully');
        
        if (onUploadSuccess) {
          onUploadSuccess(result.assessment);
        }
        
        // Reset form
        setTimeout(() => {
          setSelectedFile(null);
          setPreviewData(null);
          setUploadStatus('idle');
          setUploadMessage('');
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }, 2000);
      } else {
        setUploadStatus('error');
        if (response.status === 401) {
          setUploadMessage('Authentication failed. Please log in again.');
          toast.error('Authentication failed. Please log in again.');
        } else {
          setUploadMessage(result.message || 'Upload failed');
          toast.error(result.message || 'Upload failed');
        }
      }
    } catch (error) {
      setUploadStatus('error');
      setUploadMessage('Network error occurred');
      toast.error('Network error occurred');
    } finally {
      setIsUploading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewData(null);
    setUploadStatus('idle');
    setUploadMessage('');
    setCategory('GATE'); // Reset to default category
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getStatusIcon = () => {
    switch (uploadStatus) {
      case 'uploading':
        return <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Upload className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = () => {
    switch (uploadStatus) {
      case 'uploading':
        return 'text-blue-600';
      case 'success':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Upload GATE Assessment JSON
            </CardTitle>
            {onClose && (
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Category Input */}
          <div className="space-y-2">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Assessment Category
            </label>
            <input
              id="category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter assessment category (e.g., GATE, Engineering, etc.)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500">
              This will be used as the category for the assessment. Default is "GATE".
            </p>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">JSON File Requirements</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• File must be in JSON format (.json extension)</li>
              <li>• Must include: title, description, gateSections</li>
              <li>• gateSections must contain: aptitude, core, results</li>
              <li>• Each section must have questions array</li>
              <li>• Questions must have: id, text, type, options (for multiple-choice)</li>
            </ul>
          </div>

          {/* File Upload Area */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            {!selectedFile ? (
              <div className="space-y-4">
                <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                <div>
                  <p className="text-lg font-medium text-gray-900">Select JSON file</p>
                  <p className="text-sm text-gray-600">Drag and drop or click to browse</p>
                </div>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                >
                  Choose File
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <FileText className="w-12 h-12 text-blue-600 mx-auto" />
                <div>
                  <p className="text-lg font-medium text-gray-900">{selectedFile.name}</p>
                  <p className="text-sm text-gray-600">
                    {(selectedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <div className="flex gap-2 justify-center">
                  <Button
                    onClick={handleUpload}
                    disabled={isUploading}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isUploading ? 'Uploading...' : 'Upload & Create Assessment'}
                  </Button>
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    disabled={isUploading}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Upload Status */}
          {uploadMessage && (
            <div className={`flex items-center gap-2 p-3 rounded-lg ${
              uploadStatus === 'success' ? 'bg-green-50 text-green-800' :
              uploadStatus === 'error' ? 'bg-red-50 text-red-800' :
              'bg-blue-50 text-blue-800'
            }`}>
              {getStatusIcon()}
              <span className={getStatusColor()}>{uploadMessage}</span>
            </div>
          )}

          {/* JSON Preview */}
          {previewData && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">JSON Preview</h3>
              <div className="bg-gray-50 border rounded-lg p-4 max-h-64 overflow-y-auto">
                <div className="space-y-2">
                  <div>
                    <span className="font-medium">Title:</span> {previewData.title}
                  </div>
                  <div>
                    <span className="font-medium">Description:</span> {previewData.description}
                  </div>
                  {previewData.gateSections && (
                    <div>
                      <span className="font-medium">Sections:</span>
                      <div className="ml-4 space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">Aptitude</Badge>
                          <span className="text-sm text-gray-600">
                            {previewData.gateSections.aptitude?.questions?.length || 0} questions
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">Core</Badge>
                          <span className="text-sm text-gray-600">
                            {previewData.gateSections.core?.questions?.length || 0} questions
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">Results</Badge>
                          <span className="text-sm text-gray-600">Results section</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Sample JSON Structure */}
          <details className="bg-gray-50 border rounded-lg p-4">
            <summary className="font-medium text-gray-900 cursor-pointer">
              Sample JSON Structure
            </summary>
            <pre className="mt-3 text-xs text-gray-600 overflow-x-auto">
{`{
  "id": "gate-cs-2024",
  "title": "GATE Computer Science 2024",
  "description": "Comprehensive GATE CS assessment",
  "category": "GATE",
  "duration": "120 mins",
  "difficulty": "Advanced",
  "gateSections": {
    "aptitude": {
      "title": "Aptitude Assessment",
      "description": "General aptitude questions",
      "questions": [
        {
          "id": "apt-1",
          "text": "What is 2+2?",
          "type": "multiple-choice",
          "options": [
            {"id": "a", "text": "3", "value": "3"},
            {"id": "b", "text": "4", "value": "4"}
          ],
          "correctAnswer": "4"
        }
      ]
    },
    "core": {
      "title": "Core Subject Assessment",
      "description": "CS core subject questions",
      "questions": [...]
    },
    "results": {
      "title": "Results",
      "description": "Assessment results",
      "questions": []
    }
  }
}`}
            </pre>
          </details>
        </CardContent>
      </Card>
    </div>
  );
};

export default GateJsonUpload;
