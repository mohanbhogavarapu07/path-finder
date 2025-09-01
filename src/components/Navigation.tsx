import { BookOpen, TrendingUp, User, Settings, Grid3X3, Sparkles, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/logo.png" 
                alt="FactorBeam Logo" 
                className="h-24 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Center Navigation Categories */}
          <div className="hidden md:flex items-center space-x-6">
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

          {/* Right Actions - Hidden icons */}
          <div className="flex items-center space-x-4">
            {/* User and Settings icons removed */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
