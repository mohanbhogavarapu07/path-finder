import React, { useState, useRef } from 'react';
import { Upload, X, File, Image, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  onFileRemoved?: (file: File) => void;
  selectedFiles: File[];
  maxFiles?: number;
  maxFileSize?: number; // in MB
  acceptedTypes?: string[];
  label?: string;
  multiple?: boolean;
  className?: string;
}

interface UploadedFile {
  _id: string;
  name: string;
  url: string;
  type: string;
}

interface FileDisplayProps {
  files: UploadedFile[];
  onDelete?: (fileId: string) => void;
  showDownload?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFilesSelected,
  onFileRemoved,
  selectedFiles,
  maxFiles = 5,
  maxFileSize = 5,
  acceptedTypes = ['*/*'],
  label = 'Upload Files',
  multiple = true,
  className = '',
}) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    validateAndAddFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    validateAndAddFiles(files);
  };

  const validateAndAddFiles = (files: File[]) => {
    const validFiles: File[] = [];
    const errors: string[] = [];

    files.forEach(file => {
      // Check file size
      if (file.size > maxFileSize * 1024 * 1024) {
        errors.push(`${file.name} is too large. Maximum size is ${maxFileSize}MB.`);
        return;
      }

      // Check file type
      const isValidType = acceptedTypes.some(type => {
        if (type.endsWith('/*')) {
          return file.type.startsWith(type.slice(0, -1));
        }
        return file.type === type;
      });

      if (!isValidType) {
        errors.push(`${file.name} is not an accepted file type.`);
        return;
      }

      validFiles.push(file);
    });

    // Check max files limit
    if (selectedFiles.length + validFiles.length > maxFiles) {
      errors.push(`Maximum ${maxFiles} files allowed.`);
    }

    if (errors.length > 0) {
      alert(errors.join('\n'));
      return;
    }

    onFilesSelected(validFiles);
  };

  const removeFile = (fileToRemove: File) => {
    onFileRemoved?.(fileToRemove);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={className}>
      <Card className={`border-2 border-dashed transition-colors ${
        dragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-gray-400'
      }`}>
        <CardContent className="p-6">
          <div
            className="text-center cursor-pointer"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={triggerFileInput}
          >
            <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-600 mb-2">{label}</p>
            <p className="text-xs text-gray-500">
              {multiple ? `Drag & drop or click to select files (max ${maxFiles})` : 'Drag & drop or click to select a file'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Max size: {maxFileSize}MB per file
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple={multiple}
            accept={acceptedTypes.join(',')}
            onChange={handleFileSelect}
            className="hidden"
          />
        </CardContent>
      </Card>

      {/* Selected Files Display */}
      {selectedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium">Selected Files</h4>
          {selectedFiles.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div className="flex items-center gap-2">
                {file.type.startsWith('image/') ? (
                  <Image className="h-4 w-4 text-blue-500" />
                ) : (
                  <File className="h-4 w-4 text-gray-500" />
                )}
                <span className="text-sm">{file.name}</span>
                <Badge variant="outline" className="text-xs">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFile(file)}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const FileDisplay: React.FC<FileDisplayProps> = ({
  files,
  onDelete,
  showDownload = true,
}) => {
  if (files.length === 0) return null;

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Attachments</h4>
      {files.map((file) => {
        const isImage = file.type.startsWith('image/');
        const fileUrl = `https://pf-backend-6p4g.onrender.com${file.url}`;

        return (
          <div key={file._id} className="border border-gray-200 rounded-lg overflow-hidden">
            {isImage ? (
              <div className="p-4">
                <img 
                  src={fileUrl} 
                  alt={file.name}
                  className="max-w-full h-auto rounded-lg"
                />
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm text-gray-500">{file.name}</p>
                  {onDelete && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(file._id)}
                      className="h-6 w-6 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2">
                  <File className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-500">{file.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {showDownload && (
                    <a
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Download className="h-4 w-4" />
                    </a>
                  )}
                  {onDelete && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(file._id)}
                      className="h-6 w-6 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}; 