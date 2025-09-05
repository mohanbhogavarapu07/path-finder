import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Share2, Linkedin, MessageCircle, Mail, ExternalLink } from 'lucide-react';
import { PDFGenerator } from '@/lib/pdfGenerator';
import { toast } from 'sonner';

interface SocialShareDialogProps {
  assessmentTitle?: string;
  results?: any;
  children?: React.ReactNode;
  pdfContainerRef?: React.RefObject<HTMLDivElement>;
}

const SocialShareDialog: React.FC<SocialShareDialogProps> = ({ 
  assessmentTitle = "Assessment Results", 
  results,
  children,
  pdfContainerRef
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // Generate share text based on results
  const generateShareText = () => {
    if (results) {
      const overallScore = results.overall || results.technical?.overall || 0;
      return `I just completed the ${assessmentTitle} assessment and scored ${overallScore}%! Check out your technical readiness at PathFinder.`;
    }
    return `I just completed the ${assessmentTitle} assessment! Check out your technical readiness at PathFinder.`;
  };

  const shareText = generateShareText();
  const shareUrl = window.location.href;

  // Generate PDF and get download link
  const generatePDFForSharing = async () => {
    if (!pdfContainerRef?.current) {
      toast.error('PDF container not found');
      return null;
    }

    setIsGeneratingPDF(true);
    try {
      // Create a temporary element for PDF generation
      const tempElement = pdfContainerRef.current.cloneNode(true) as HTMLElement;
      tempElement.style.position = 'absolute';
      tempElement.style.left = '-9999px';
      tempElement.style.top = '-9999px';
      document.body.appendChild(tempElement);

      // Generate PDF using the existing PDFGenerator
      const printContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>${assessmentTitle} - Results</title>
            <style>
              @page { margin: 0.5in; size: A4; }
              body { font-family: 'Inter', sans-serif; font-size: 12pt; line-height: 1.5; }
              .pdf-layout-container { width: 100%; background: white; color: #1e293b; }
            </style>
          </head>
          <body>${tempElement.outerHTML}</body>
        </html>
      `;

      // Create blob URL for PDF
      const blob = new Blob([printContent], { type: 'text/html' });
      const pdfUrl = URL.createObjectURL(blob);
      
      // Clean up
      document.body.removeChild(tempElement);
      setIsGeneratingPDF(false);
      
      return pdfUrl;
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF');
      setIsGeneratingPDF(false);
      return null;
    }
  };

  const shareToLinkedIn = async () => {
    const pdfUrl = await generatePDFForSharing();
    const linkedinText = pdfUrl 
      ? `${shareText}\n\n📄 Download my detailed PDF report: ${pdfUrl}\n\nView online: ${shareUrl}`
      : `${shareText}\n\nView my results: ${shareUrl}`;
    
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${encodeURIComponent(linkedinText)}`;
    window.open(linkedinUrl, '_blank', 'width=600,height=400');
  };

  const shareToWhatsApp = async () => {
    const pdfUrl = await generatePDFForSharing();
    const whatsappText = pdfUrl 
      ? `${shareText}\n\n📄 Download my detailed PDF report: ${pdfUrl}\n\nView online: ${shareUrl}`
      : `${shareText}\n\nView my results: ${shareUrl}`;
    
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappText)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareToGmail = async () => {
    const pdfUrl = await generatePDFForSharing();
    const subject = `My ${assessmentTitle} Results`;
    const body = pdfUrl 
      ? `${shareText}\n\n📄 I've attached my detailed PDF report for your review.\n\nDownload PDF: ${pdfUrl}\nView online: ${shareUrl}`
      : `${shareText}\n\nView my detailed results: ${shareUrl}`;
    
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank');
  };


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200">
            <Share2 className="w-6 h-6 text-blue-600" />
            <span className="text-blue-700 font-medium">Share Results</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 px-6 py-6 text-white">
          <DialogHeader className="space-y-2">
            <div className="flex items-center justify-center space-x-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Share2 className="w-6 h-6" />
              </div>
              <DialogTitle className="text-xl font-bold">Share Your Results</DialogTitle>
            </div>
            <p className="text-blue-100 text-center text-sm">
              Spread the word about your assessment achievements
            </p>
          </DialogHeader>
        </div>

        {/* Content */}
        <div className="px-6 py-6 bg-gray-50">
          <div className="space-y-4">
            {/* Assessment info card */}
            <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Share2 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{assessmentTitle}</h3>
                  <p className="text-sm text-gray-600">Ready to share with your network</p>
                </div>
              </div>
            </div>

            {/* Social sharing options */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Choose Platform</h4>
              
              {/* LinkedIn */}
              <Button
                onClick={shareToLinkedIn}
                disabled={isGeneratingPDF}
                className="w-full h-14 bg-white hover:bg-gray-50 border border-gray-200 hover:border-[#0077B5] text-gray-900 hover:text-[#0077B5] transition-all duration-200 group"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-[#0077B5] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">LinkedIn</div>
                      <div className="text-sm text-gray-500">Professional network</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#0077B5]" />
                </div>
              </Button>

              {/* WhatsApp */}
              <Button
                onClick={shareToWhatsApp}
                disabled={isGeneratingPDF}
                className="w-full h-14 bg-white hover:bg-gray-50 border border-gray-200 hover:border-[#25D366] text-gray-900 hover:text-[#25D366] transition-all duration-200 group"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-[#25D366] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">WhatsApp</div>
                      <div className="text-sm text-gray-500">Instant messaging</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#25D366]" />
                </div>
              </Button>

              {/* Gmail */}
              <Button
                onClick={shareToGmail}
                disabled={isGeneratingPDF}
                className="w-full h-14 bg-white hover:bg-gray-50 border border-gray-200 hover:border-[#EA4335] text-gray-900 hover:text-[#EA4335] transition-all duration-200 group"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-[#EA4335] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.91L12 10.09l9.455-6.27h.909c.904 0 1.636.732 1.636 1.636z"/>
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">Gmail</div>
                      <div className="text-sm text-gray-500">Email sharing</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#EA4335]" />
                </div>
              </Button>
            </div>

            {/* Loading state */}
            {isGeneratingPDF && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                  <span className="text-sm text-blue-700 font-medium">Generating PDF for sharing...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SocialShareDialog;
