import { BookOpen, TrendingUp, User, Settings, Grid3X3, Sparkles, Clock, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Navigation = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="relative z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
              <img 
                src="/logo.png" 
                alt="FactorBeam Logo" 
                className="h-10 sm:h-12 lg:h-16 xl:h-20 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation Categories - Centered */}
          <div className="hidden md:flex items-center justify-center space-x-4 lg:space-x-6 absolute left-1/2 transform -translate-x-1/2">
            <Button 
              variant={location.pathname === "/categories" ? "default" : "ghost"} 
              size="sm" 
              asChild
            >
              <Link to="/categories" className="flex items-center gap-2">
                <Grid3X3 className="w-4 h-4" />
                Categories
              </Link>
            </Button>
            <Button 
              variant={location.pathname === "/popular" ? "default" : "ghost"} 
              size="sm" 
              asChild
            >
              <Link to="/popular" className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Popular
              </Link>
            </Button>
            <Button 
              variant={location.pathname === "/new" ? "default" : "ghost"} 
              size="sm" 
              asChild
            >
              <Link to="/new" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                New
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="p-2 h-10 w-10"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-sm">
            <div className="px-4 py-3 space-y-2">
              <Button 
                variant={location.pathname === "/categories" ? "default" : "ghost"} 
                size="sm" 
                asChild
                className="w-full justify-start h-12"
              >
                <Link to="/categories" className="flex items-center gap-3" onClick={toggleMobileMenu}>
                  <Grid3X3 className="w-5 h-5" />
                  Categories
                </Link>
              </Button>
              <Button 
                variant={location.pathname === "/popular" ? "default" : "ghost"} 
                size="sm" 
                asChild
                className="w-full justify-start h-12"
              >
                <Link to="/popular" className="flex items-center gap-3" onClick={toggleMobileMenu}>
                  <Sparkles className="w-5 h-5" />
                  Popular
                </Link>
              </Button>
              <Button 
                variant={location.pathname === "/new" ? "default" : "ghost"} 
                size="sm" 
                asChild
                className="w-full justify-start h-12"
              >
                <Link to="/new" className="flex items-center gap-3" onClick={toggleMobileMenu}>
                  <Clock className="w-5 h-5" />
                  New
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
