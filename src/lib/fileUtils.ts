// File utility functions for handling uploads, validation, and processing

export interface FileValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface FileInfo {
  name: string;
  size: number;
  type: string;
  extension: string;
  isImage: boolean;
  isDocument: boolean;
  isPDF: boolean;
}

// Supported file types
export const SUPPORTED_FILE_TYPES = {
  images: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  documents: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
  ],
  all: ['*/*'] // Accept all file types
};

// File size limits (in bytes)
export const FILE_SIZE_LIMITS = {
  image: 5 * 1024 * 1024, // 5MB
  document: 10 * 1024 * 1024, // 10MB
  default: 5 * 1024 * 1024 // 5MB
};

/**
 * Get file information
 */
export const getFileInfo = (file: File): FileInfo => {
  const extension = file.name.split('.').pop()?.toLowerCase() || '';
  const isImage = file.type.startsWith('image/');
  const isDocument = file.type.startsWith('application/') || file.type.startsWith('text/');
  const isPDF = file.type === 'application/pdf';

  return {
    name: file.name,
    size: file.size,
    type: file.type,
    extension,
    isImage,
    isDocument,
    isPDF
  };
};

/**
 * Validate a single file
 */
export const validateFile = (
  file: File,
  options: {
    maxSize?: number;
    allowedTypes?: string[];
    maxFiles?: number;
    currentFileCount?: number;
  } = {}
): FileValidationResult => {
  const {
    maxSize = FILE_SIZE_LIMITS.default,
    allowedTypes = SUPPORTED_FILE_TYPES.all,
    maxFiles = 5,
    currentFileCount = 0
  } = options;

  const errors: string[] = [];
  const fileInfo = getFileInfo(file);

  // Check file size
  if (file.size > maxSize) {
    const maxSizeMB = (maxSize / 1024 / 1024).toFixed(1);
    errors.push(`${file.name} is too large. Maximum size is ${maxSizeMB}MB.`);
  }

  // Check file type
  const isValidType = allowedTypes.some(type => {
    if (type === '*/*') {
      return true; // Accept all file types
    }
    if (type.endsWith('/*')) {
      return file.type.startsWith(type.slice(0, -1));
    }
    return file.type === type;
  });

  if (!isValidType) {
    errors.push(`${file.name} is not an accepted file type.`);
  }

  // Check file count limit
  if (currentFileCount >= maxFiles) {
    errors.push(`Maximum ${maxFiles} files allowed.`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validate multiple files
 */
export const validateFiles = (
  files: File[],
  options: {
    maxSize?: number;
    allowedTypes?: string[];
    maxFiles?: number;
    currentFileCount?: number;
  } = {}
): FileValidationResult => {
  const {
    maxSize = FILE_SIZE_LIMITS.default,
    allowedTypes = SUPPORTED_FILE_TYPES.all,
    maxFiles = 5,
    currentFileCount = 0
  } = options;

  const errors: string[] = [];

  // Check total file count
  if (currentFileCount + files.length > maxFiles) {
    errors.push(`Maximum ${maxFiles} files allowed. You can add ${maxFiles - currentFileCount} more files.`);
  }

  // Validate each file
  files.forEach(file => {
    const validation = validateFile(file, {
      maxSize,
      allowedTypes,
      maxFiles: 1, // Individual file validation
      currentFileCount: 0
    });
    errors.push(...validation.errors);
  });

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Format file size for display
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Get appropriate file icon based on file type
 */
export const getFileIcon = (fileType: string): string => {
  if (fileType.startsWith('image/')) return '🖼️';
  if (fileType === 'application/pdf') return '📄';
  if (fileType.includes('word') || fileType.includes('document')) return '📝';
  if (fileType === 'text/plain') return '📄';
  return '📎';
};

/**
 * Create a preview URL for images
 */
export const createImagePreview = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('File is not an image'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target?.result as string);
    };
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    reader.readAsDataURL(file);
  });
};

/**
 * Check if file is an image
 */
export const isImageFile = (file: File): boolean => {
  return file.type.startsWith('image/');
};

/**
 * Check if file is a document
 */
export const isDocumentFile = (file: File): boolean => {
  return file.type.startsWith('application/') || file.type.startsWith('text/');
};

/**
 * Get file extension from filename
 */
export const getFileExtension = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() || '';
};

/**
 * Generate a unique filename
 */
export const generateUniqueFilename = (originalName: string): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  const extension = getFileExtension(originalName);
  const nameWithoutExtension = originalName.replace(/\.[^/.]+$/, '');
  
  return `${nameWithoutExtension}_${timestamp}_${random}.${extension}`;
};

/**
 * Sanitize filename for safe storage
 */
export const sanitizeFilename = (filename: string): string => {
  return filename
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
};

/**
 * Create FormData for file upload
 */
export const createUploadFormData = (
  files: File[],
  additionalData: Record<string, string> = {}
): FormData => {
  const formData = new FormData();
  
  files.forEach(file => {
    formData.append('files', file);
  });
  
  Object.entries(additionalData).forEach(([key, value]) => {
    formData.append(key, value);
  });
  
  return formData;
};

/**
 * Download file from URL
 */
export const downloadFile = (url: string, filename: string): void => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Copy file URL to clipboard
 */
export const copyFileUrl = async (url: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(url);
  } catch (error) {
    console.error('Failed to copy URL:', error);
    throw error;
  }
}; 