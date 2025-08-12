import { useState, useCallback } from 'react';
import { uploadFiles, uploadCoverImage, deleteAttachment } from '@/lib/api';
import { toast } from 'sonner';

interface UploadedFile {
  _id: string;
  name: string;
  url: string;
  type: string;
}

interface FileUploadState {
  uploading: boolean;
  progress: number;
  error: string | null;
}

export const useFileUpload = () => {
  const [uploadState, setUploadState] = useState<FileUploadState>({
    uploading: false,
    progress: 0,
    error: null,
  });

  const uploadMultipleFiles = useCallback(async (
    files: File[],
    postId?: string
  ): Promise<UploadedFile[]> => {
    if (files.length === 0) return [];

    setUploadState({
      uploading: true,
      progress: 0,
      error: null,
    });

    try {
      const result = await uploadFiles(files, postId);
      
      setUploadState({
        uploading: false,
        progress: 100,
        error: null,
      });

      toast.success(`${files.length} file(s) uploaded successfully`);
      return result.attachments;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      setUploadState({
        uploading: false,
        progress: 0,
        error: errorMessage,
      });
      
      toast.error(`Upload failed: ${errorMessage}`);
      throw error;
    }
  }, []);

  const uploadSingleFile = useCallback(async (
    file: File,
    postId: string,
    isCoverImage: boolean = false
  ): Promise<{ featuredImage?: string; attachments?: UploadedFile[] }> => {
    setUploadState({
      uploading: true,
      progress: 0,
      error: null,
    });

    try {
      if (isCoverImage) {
        const result = await uploadCoverImage(file, postId);
        setUploadState({
          uploading: false,
          progress: 100,
          error: null,
        });
        toast.success('Cover image uploaded successfully');
        return { featuredImage: result.featuredImage };
      } else {
        const result = await uploadFiles([file], postId);
        setUploadState({
          uploading: false,
          progress: 100,
          error: null,
        });
        toast.success('File uploaded successfully');
        return { attachments: result.attachments };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      setUploadState({
        uploading: false,
        progress: 0,
        error: errorMessage,
      });
      
      toast.error(`Upload failed: ${errorMessage}`);
      throw error;
    }
  }, []);

  const deleteFile = useCallback(async (
    postId: string,
    attachmentId: string
  ): Promise<void> => {
    try {
      await deleteAttachment(postId, attachmentId);
      toast.success('File deleted successfully');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Delete failed';
      toast.error(`Delete failed: ${errorMessage}`);
      throw error;
    }
  }, []);

  const resetUploadState = useCallback(() => {
    setUploadState({
      uploading: false,
      progress: 0,
      error: null,
    });
  }, []);

  return {
    uploadMultipleFiles,
    uploadSingleFile,
    deleteFile,
    resetUploadState,
    uploadState,
  };
}; 