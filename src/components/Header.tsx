import { Link } from "react-router-dom";
import { Sparkles, Brain, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import React from "react";

interface HeaderProps {
  logoType?: "sparkles" | "brain";
  navLinks?: Array<{ to: string; label: string; active?: boolean }>;
  rightContent?: React.ReactNode;
  showContainer?: boolean;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({
  logoType = "sparkles",
  navLinks = [
    { to: "/", label: "Home" },
    // { to: "/assessments", label: "Assessments" },
    { to: "/about", label: "About" },
    { to: "/blog", label: "Blog" },
  ],
  rightContent,
  showContainer = true,
  className = "",
}) => {
  return (
     <header className={`bg-primary/90 text-primary-foreground border-b border-primary/50 sticky top-0 z-50 ${className}`}>
      <div className={showContainer ? "container mx-auto px-4 py-4 flex justify-between items-center" : "px-4 py-4 flex justify-between items-center"}>
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            {logoType === "sparkles" ? (
              <Sparkles className="h-8 w-8 text-white" />
            ) : (
              <Brain className="h-8 w-8 text-white" />
            )}
            <span className="text-2xl font-bold text-white">FactorBeam</span>
          </div>
        </Link>
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-white/80 hover:text-white transition-colors font-medium ${link.active ? "text-white font-semibold" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        {rightContent && <div className="flex items-center space-x-4">{rightContent}</div>}
      </div>
    </header>
  );
};

export default Header; 