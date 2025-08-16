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
      PDFGenerator.printElement(pdfContainerRef.current);
      toast.success('Print dialog opened');
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
      // Show instructions first on the current page
      toast.info('In the print dialog, select "Save as PDF" or "Microsoft Print to PDF" as destination', {
        duration: 4000, // Show for 4 seconds
      });
      
      // Wait 2 seconds for user to read instructions, then open print dialog
      setTimeout(() => {
        PDFGenerator.printElement(pdfContainerRef.current!);
        options.onSuccess?.();
        setIsSavingPDF(false);
      }, 2000);
      
    } catch (error) {
      console.error('Error saving as PDF:', error);
      toast.error('Failed to open print dialog');
      options.onError?.(error as Error);
      setIsSavingPDF(false);
    }
  }, [options]);

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
