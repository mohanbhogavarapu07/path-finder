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
      // Single unified print flow (desktop layout) for all devices
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
      // Unify behavior: always trigger the desktop print layout.
      // If the popup is blocked or printing fails, fall back to downloadable PDF.
      try {
        PDFGenerator.printElement(pdfContainerRef.current!);
        options.onSuccess?.();
        setIsSavingPDF(false);
      } catch (err) {
        console.warn('Print failed, falling back to downloadable PDF...', err);
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
      }
      
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
