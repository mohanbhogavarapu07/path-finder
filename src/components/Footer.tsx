import { BookOpen, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "All Assessments", href: "/" },
    { name: "Education", href: "/education" },
    { name: "Health", href: "/health" },
    { name: "Business", href: "/business" },
    { name: "Personal", href: "/personal" },
    { name: "Trending", href: "/trending" }
  ];

  const support = [
    { name: "Help Center", href: "/help" },
    { name: "Contact Us", href: "/contact" },
    { name: "FAQ", href: "/faq" },
    { name: "User Guide", href: "/guide" },
    { name: "System Status", href: "/status" },
    { name: "Feedback", href: "/feedback" }
  ];

  const company = [
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/team" },
    { name: "Careers", href: "/careers" },
    { name: "Press Kit", href: "/press" },
    { name: "Blog", href: "/blog" },
    { name: "Research", href: "/research" }
  ];

  const legal = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Data Protection", href: "/data-protection" },
    { name: "Accessibility", href: "/accessibility" },
    { name: "Compliance", href: "/compliance" }
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
    { name: "YouTube", icon: Youtube, href: "https://youtube.com" }
  ];

  return (
    <footer className="bg-card border-t border-border">
      {/* Main Footer Content */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            
            {/* Brand Section */}
            <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
              </div>
                <h3 className="text-xl font-bold text-heading">FactorBeam</h3>
            </div>
              <p className="text-foreground-soft mb-6 max-w-sm">
                The world's most comprehensive platform for personal and professional assessments. 
                Trusted by millions worldwide to unlock potential and drive growth.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center text-foreground-soft">
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="text-sm">hello@factorbeam.com</span>
                </div>
                <div className="flex items-center text-foreground-soft">
                  <Phone className="w-4 h-4 mr-2" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center text-foreground-soft">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">San Francisco, CA</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold text-heading mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.href} 
                      className="text-sm text-foreground-soft hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
          </div>

            {/* Support */}
          <div>
              <h4 className="text-sm font-semibold text-heading mb-4">Support</h4>
              <ul className="space-y-2">
                {support.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.href} 
                      className="text-sm text-foreground-soft hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

            {/* Company */}
          <div>
              <h4 className="text-sm font-semibold text-heading mb-4">Company</h4>
              <ul className="space-y-2">
                {company.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.href} 
                      className="text-sm text-foreground-soft hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

            {/* Legal */}
          <div>
              <h4 className="text-sm font-semibold text-heading mb-4">Legal</h4>
              <ul className="space-y-2">
                {legal.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.href} 
                      className="text-sm text-foreground-soft hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-foreground-soft">
              © {currentYear} FactorBeam. All rights reserved.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground-soft hover:text-primary transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
              </div>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 