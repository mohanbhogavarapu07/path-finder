import { BookOpen, Linkedin } from "lucide-react";
import WhatsAppIcon from "./icons/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { useAssessments } from "@/hooks/useAssessments";
import { useMemo } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Fetch assessments from backend to get categories
  const { data: assessments, isLoading } = useAssessments();

  // Generate categories from assessment data
  const categories = useMemo(() => {
    if (!assessments || assessments.length === 0) {
      // Fallback categories if no data - only show allowed categories
      return [
        { name: "All Assessments", href: "/" },
        { name: "Emerging Technologies", href: "/assessments?category=Emerging%20Technologies" },
        { name: "Engineering & Manufacturing", href: "/assessments?category=Engineering%20%26%20Manufacturing" }
      ];
    }

    // Only allow these two categories - same as assessments page
    const allowedCategories = ['Emerging Technologies', 'Engineering & Manufacturing'];
    
    // Get unique categories from assessments, but only include allowed ones
    const categoryMap = new Map();
    
    assessments.forEach(assessment => {
      const category = assessment.category;
      // Only process allowed categories
      if (allowedCategories.includes(category) && !categoryMap.has(category)) {
        categoryMap.set(category, {
          name: category,
          href: `/assessments?category=${encodeURIComponent(category)}`
        });
      }
    });

    // Convert to array and always include "All Assessments" at the beginning
    return [
      { name: "All Assessments", href: "/" },
      ...Array.from(categoryMap.values())
    ];
  }, [assessments]);

  const legal = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Data Protection Policy", href: "/data-protection" }
  ];

  const company = [
    // { name: "Blog", href: "/blog" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" }
    // { name: "About Us", href: "/about" }
  ];

  const socialLinks = [
    { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/factorbeam" },
    { name: "WhatsApp", icon: WhatsAppIcon, href: "https://whatsapp.com/channel/0029VbBDp9i7DAWpPbckVq1n" }
  ];

  return (
    <footer className="bg-card border-t border-border">
      {/* Main Footer Content */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            
            {/* Brand Section - Spans 2 columns */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-3">
                <img 
                  src="/logo.png" 
                  alt="FactorBeam Logo" 
                  className="h-24 w-auto object-contain"
                />
              </div>
              <p className="text-foreground-soft mb-4 max-w-lg leading-relaxed text-sm">
                The world's most comprehensive platform for personal and professional assessments. 
                Trusted by millions worldwide to unlock potential and drive growth.
              </p>
              
              {/* Social Links */}
              <div className="flex items-center space-x-3">
                <span className="text-xs text-foreground-soft font-medium">Follow us on:</span>
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground-soft hover:text-primary transition-all duration-300 p-2 rounded-full hover:bg-primary/10 border border-border hover:border-primary/30"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-base font-bold text-heading mb-3">Categories</h4>
              <ul className="space-y-1">
                {isLoading ? (
                  <li className="text-foreground-soft text-sm">Loading categories...</li>
                ) : (
                  categories.map((category) => (
                    <li key={category.name}>
                      <Link 
                        to={category.href} 
                        className="text-foreground-soft hover:text-primary transition-all duration-300 block py-0.5 hover:translate-x-1 text-sm"
                        onClick={() => {
                          // Scroll to top when category link is clicked
                          setTimeout(() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }, 0);
                        }}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-base font-bold text-heading mb-3">Company</h4>
              <ul className="space-y-1">
                {company.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.href} 
                      className="text-foreground-soft hover:text-primary transition-all duration-300 block py-0.5 hover:translate-x-1 text-sm"
                      onClick={() => {
                        // Scroll to top when company link is clicked
                        setTimeout(() => {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }, 0);
                      }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-base font-bold text-heading mb-3">Legal</h4>
              <ul className="space-y-1">
                {legal.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.href} 
                      className="text-foreground-soft hover:text-primary transition-all duration-300 block py-0.5 hover:translate-x-1 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-border my-6"></div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            {/* Copyright and Disclaimer */}
            <div className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-4">
              <p className="text-xs text-foreground-soft">
                © {currentYear} FactorBeam. All rights reserved.
              </p>
              <p className="text-xs text-foreground-soft">
                All assessments are for educational purposes only.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 