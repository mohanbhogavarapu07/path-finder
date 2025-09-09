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
      // Check if we're on a mobile device with more accurate detection
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                       (window.innerWidth <= 768) || 
                       ('ontouchstart' in window);
      
      PDFGenerator.printElement(pdfContainerRef.current);
      
      if (isMobile) {
        toast.success('PDF view opened. Tap the print button to save as PDF or share', {
          duration: 5000,
        });
      } else {
        toast.success('Print dialog opened');
      }
      
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
      // Check if we're on a mobile device
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                       (window.innerWidth <= 768) || 
                       ('ontouchstart' in window);
      
      if (isMobile) {
        // For mobile, show different instructions
        toast.info('On mobile: Tap the print button, then select "Save as PDF" or "Share" to save', {
          duration: 5000,
        });
      } else {
        // For desktop, show standard instructions
        toast.info('In the print dialog, select "Save as PDF" or "Microsoft Print to PDF" as destination', {
          duration: 4000,
        });
      }
      
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

  const shareMobilePDF = useCallback(() => {
    if (!pdfContainerRef.current) {
      toast.error('PDF container not found');
      return;
    }

    try {
      // Generate a shareable link for mobile
      const shareUrl = PDFGenerator.generateMobileShareLink(pdfContainerRef.current);
      
      // Check if Web Share API is available
      if (navigator.share) {
        navigator.share({
          title: 'Assessment Results',
          text: 'Check out my assessment results',
          url: shareUrl
        }).catch((error) => {
          console.log('Error sharing:', error);
          // Fallback to opening in new tab
          window.open(shareUrl, '_blank');
        });
      } else {
        // Fallback: open in new tab
        window.open(shareUrl, '_blank');
        toast.success('PDF opened in new tab. You can save or share it from there.');
      }
      
      options.onSuccess?.();
    } catch (error) {
      console.error('Error sharing PDF:', error);
      toast.error('Failed to share PDF');
      options.onError?.(error as Error);
    }
  }, [options]);

  const cleanup = useCallback(() => {
    PDFGenerator.cleanup();
  }, []);

  return {
    pdfContainerRef,
    printResults,
    saveAsPDF,
    shareMobilePDF,
    cleanup,
    isPrinting,
    isSavingPDF
  };
};
