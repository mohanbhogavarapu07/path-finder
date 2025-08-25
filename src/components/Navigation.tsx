import { BookOpen, TrendingUp, User, Settings, Grid3X3, Sparkles, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-heading">FactorBeam</h1>
            </div>
          </div>

          {/* Center Navigation Categories */}
          <div className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/categories" className="flex items-center gap-2">
                <Grid3X3 className="w-4 h-4" />
                Categories
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/popular" className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Popular
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/new" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                New
              </Link>
            </Button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* <Button variant="ghost" size="sm" className="hidden md:flex" asChild>
              <Link to="/assessments">
                <TrendingUp className="w-4 h-4 mr-2" />
                Assessments
              </Link>
            </Button> */}
            <Button variant="ghost" size="sm" asChild>
              <Link to="/about">
                <User className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/contact">
                <Settings className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
