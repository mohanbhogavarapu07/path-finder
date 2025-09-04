import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Share2, Linkedin, MessageCircle, Mail } from 'lucide-react';

interface SocialShareDialogProps {
  assessmentTitle?: string;
  results?: any;
  children?: React.ReactNode;
}

const SocialShareDialog: React.FC<SocialShareDialogProps> = ({ 
  assessmentTitle = "Assessment Results", 
  results,
  children 
}) => {
  const [isOpen, setIsOpen] = useState(false);

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

  const shareToLinkedIn = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${encodeURIComponent(shareText)}`;
    window.open(linkedinUrl, '_blank', 'width=600,height=400');
  };

  const shareToWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareToGmail = () => {
    const subject = `My ${assessmentTitle} Results`;
    const body = `${shareText}\n\nView my detailed results: ${shareUrl}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
            <Share2 className="w-6 h-6" />
            <span>Share Results</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Share Your Results</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-gray-600 text-center">
            Share your assessment results with your network
          </p>
          <div className="grid grid-cols-1 gap-3">
            <Button
              onClick={shareToLinkedIn}
              className="w-full justify-start bg-[#0077B5] hover:bg-[#005885] text-white"
            >
              <Linkedin className="w-5 h-5 mr-3" />
              Share on LinkedIn
            </Button>
            <Button
              onClick={shareToWhatsApp}
              className="w-full justify-start bg-[#25D366] hover:bg-[#1DA851] text-white"
            >
              <MessageCircle className="w-5 h-5 mr-3" />
              Share on WhatsApp
            </Button>
            <Button
              onClick={shareToGmail}
              className="w-full justify-start bg-[#EA4335] hover:bg-[#D33B2C] text-white"
            >
              <Mail className="w-5 h-5 mr-3" />
              Share via Gmail
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SocialShareDialog;
