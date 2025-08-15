import { Link } from "react-router-dom";
import { Calculator, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Platform",
      links: [
        { name: "All Assessments", href: "/assessments" },
        { name: "Career Guidance", href: "/about" },
        { name: "Blog", href: "/blog" },
        { name: "How it Works", href: "/about" },
      ],
    },
    {
      title: "Popular Assessments",
      links: [
        { name: "Data Science", href: "/assessments" },
        { name: "Full Stack Development", href: "/assessments" },
        { name: "Cyber Security", href: "/assessments" },
        { name: "Cloud Computing", href: "/assessments" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Career Tips", href: "/blog" },
        { name: "Industry Insights", href: "/blog" },
        { name: "Success Stories", href: "/blog" },
        { name: "FAQs", href: "/about" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Contact Us", href: "/about" },
        { name: "Help Center", href: "/about" },
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
      ],
    },
  ];

     return (
            <footer className="bg-primary/90 text-primary-foreground border-t border-primary/50 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent">
                <Calculator className="h-5 w-5 text-accent-foreground" />
              </div>
              <span className="text-xl font-bold text-white">PathFinder</span>
            </Link>
            <p className="text-white/80 mb-4 max-w-sm">
              Discover your perfect career path with our comprehensive assessments. 
              Make informed decisions about your future with data-driven insights.
            </p>
            <div className="space-y-2 text-sm text-white/80">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>hello@pathfinder.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/80 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

         {/* Bottom Bar */}
                 <div className="border-t border-primary/50 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-white/80">
              © {currentYear} Career Compass. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-white/80">
              <Link to="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="#" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;