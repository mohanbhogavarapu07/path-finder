import { useRef, useCallback, useState } from 'react';
import { PDFGenerator } from '@/lib/pdfGenerator';
import { toast } from 'sonner';

export interface UsePDFResultsOptions {
  assessmentTitle?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const usePDFResults = (options: UsePDFResultsOptions = {}) => {
  const pdfContainerRef = useRef<HTMLDivElement>(null);
  const [isPrinting, setIsPrinting] = useState(false);
  const [isSavingPDF, setIsSavingPDF] = useState(false);

  const printResults = useCallback(() => {
    if (!pdfContainerRef.current) {
      toast.error('Print container not found');
      return;
    }

    setIsPrinting(true);

    try {
      // Open the print immediately without instructional toast for a direct experience
      PDFGenerator.printElement(pdfContainerRef.current);
      
      options.onSuccess?.();
    } catch (error) {
      console.error('Error printing:', error);
      toast.error('Failed to open print dialog');
      options.onError?.(error as Error);
    } finally {
      setIsPrinting(false);
    }
  }, [options]);

  const saveAsPDF = useCallback(() => {
    if (!pdfContainerRef.current) {
      toast.error('Print container not found');
      return;
    }

    setIsSavingPDF(true);

    try {
      // On mobile: generate and download a real PDF, on desktop: open print dialog
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                       (window.innerWidth <= 768) || 
                       ('ontouchstart' in window);
      if (isMobile) {
        PDFGenerator.downloadPDF(pdfContainerRef.current!, `${options.assessmentTitle || 'assessment'}-results.pdf`).then(() => {
          options.onSuccess?.();
          setIsSavingPDF(false);
        }).catch((error) => {
          console.error('Error generating PDF:', error);
          toast.error('Failed to generate PDF');
          options.onError?.(error as Error);
          setIsSavingPDF(false);
        });
        return;
      }
      // Desktop
      PDFGenerator.printElement(pdfContainerRef.current!);
      options.onSuccess?.();
      setIsSavingPDF(false);
      
    } catch (error) {
      console.error('Error saving as PDF:', error);
      toast.error('Failed to open print dialog');
      options.onError?.(error as Error);
      setIsSavingPDF(false);
    }
  }, [options]);

  // Share flow is removed per requirement to avoid showing Share on mobile

  const cleanup = useCallback(() => {
    PDFGenerator.cleanup();
  }, []);

  return {
    pdfContainerRef,
    printResults,
    saveAsPDF,
    cleanup,
    isPrinting,
    isSavingPDF
  };
};
