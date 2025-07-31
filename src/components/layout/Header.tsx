import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
  ];

  // Assessment categories for secondary navigation
  const assessmentCategories = [
    { name: "Technology", href: "/assessments#technology-programming" },
    { name: "Bussiness", href: "/assessments#bussiness-information-systems" },
    { name: "Design", href: "/assessments#design-user-experience" },
    { name: "Health Care", href: "/assessments#health-care" },
    { name: "Engineering", href: "/assessments#engineering" },
    { name: "Security", href: "/assessments#security" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
         <header className="sticky top-0 z-50 w-full border-b bg-background">
      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
              <Calculator className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-gradient">career compass</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.href)
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          {/* <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search assessments..."
                className="w-[300px] pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div> */}

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-4 space-y-1 border-t">
              {/* Mobile Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search assessments..."
                  className="w-full pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    isActive(item.href)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Secondary Navigation - Assessment Categories (Only on Assessments page) */}
      {location.pathname === "/assessments" && (
        <div className="border-t border-border/40 bg-background/80">
          <div className="container mx-auto px-4">
                         <nav className="flex items-center space-x-12 overflow-x-auto py-4">
               {assessmentCategories.map((category) => (
                 <Link
                   key={category.name}
                   to={category.href}
                   className={`text-sm font-medium whitespace-nowrap transition-colors hover:text-thinkera-purple px-2 py-1 ${
                     location.hash === category.href.split("#")[1]
                       ? "text-thinkera-purple border-b-2 border-thinkera-purple"
                       : "text-muted-foreground"
                   }`}
                 >
                   {category.name}
                 </Link>
               ))}
             </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;