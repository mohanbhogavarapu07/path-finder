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
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
              <img 
                src="/logo.png" 
                alt="FactorBeam Logo" 
                className="h-12 sm:h-16 lg:h-20 w-auto object-contain"
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
              className="p-2"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Button 
                variant={location.pathname === "/categories" ? "default" : "ghost"} 
                size="sm" 
                asChild
                className="w-full justify-start"
              >
                <Link to="/categories" className="flex items-center gap-2" onClick={toggleMobileMenu}>
                  <Grid3X3 className="w-4 h-4" />
                  Categories
                </Link>
              </Button>
              <Button 
                variant={location.pathname === "/popular" ? "default" : "ghost"} 
                size="sm" 
                asChild
                className="w-full justify-start"
              >
                <Link to="/popular" className="flex items-center gap-2" onClick={toggleMobileMenu}>
                  <Sparkles className="w-4 h-4" />
                  Popular
                </Link>
              </Button>
              <Button 
                variant={location.pathname === "/new" ? "default" : "ghost"} 
                size="sm" 
                asChild
                className="w-full justify-start"
              >
                <Link to="/new" className="flex items-center gap-2" onClick={toggleMobileMenu}>
                  <Clock className="w-4 h-4" />
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
