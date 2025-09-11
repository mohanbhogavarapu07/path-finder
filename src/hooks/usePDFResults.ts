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
      // Keep explicit print action as unified print flow
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
      // Detect mobile and directly download a PDF (avoid system print UI)
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                       (window.innerWidth <= 768) || 
                       ('ontouchstart' in window) ||
                       (navigator.maxTouchPoints > 0);

      if (isMobile) {
        PDFGenerator
          .downloadPDF(pdfContainerRef.current!, `${options.assessmentTitle || 'assessment'}-results.pdf`)
          .then(() => {
            options.onSuccess?.();
            setIsSavingPDF(false);
          })
          .catch((error) => {
            console.error('Error generating PDF:', error);
            toast.error('Failed to generate PDF');
            options.onError?.(error as Error);
            setIsSavingPDF(false);
          });
        return;
      }

      // Desktop: open print dialog (user can save as PDF there)
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
