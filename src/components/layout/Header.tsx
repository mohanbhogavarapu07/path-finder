import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Menu, X, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAssessmentCategories } from "@/hooks/useAssessments";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { categories } = useAssessmentCategories();

  const navigation = [
    // { name: "Home", href: "/" },
    // { name: "Design", href: "/design" },
    // { name: "Healthcare", href: "/healthcare" },
    // { name: "Engineering", href: "/engineering" },
    // { name: "Security", href: "/security" },
    // { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
  ];

  // Assessment categories for secondary navigation - now dynamic
  const assessmentCategories = [
    { name: "View All", href: "/assessments" },
    ...categories.map(category => ({
      name: category,
      href: `/assessments?category=${category}`
    }))
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  const handleCategoryClick = (href: string) => {
    navigate(href);
    setIsMenuOpen(false);
  };

     return (
           <header className="sticky top-0 z-50 w-full border-b bg-[hsl(var(--thinkera-blue))]/90 text-white border-[hsl(var(--thinkera-blue))]/50">
       {/* Main Header - Show only on non-assessment pages */}
       {!location.pathname.startsWith("/assessment/") && (
         <div className="container mx-auto px-4">
           <div className="flex h-16 items-center justify-between">
             {/* Logo */}
             <Link to="/" className="flex items-center space-x-2">
               <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                 <Calculator className="h-5 w-5 text-primary-foreground" />
               </div>
                <span className="text-xl font-bold text-white">LAKXA</span>
             </Link>

             {/* Search Bar - Center */}
             <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
               <form onSubmit={handleSearch} className="relative w-full">
                 <Input
                   type="text"
                   placeholder="Search assessment..."
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[hsl(var(--thinkera-purple))] focus:border-transparent"
                 />
                 <Button
                   type="submit"
                   variant="ghost"
                   size="icon"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 text-gray-500 hover:text-[hsl(var(--thinkera-purple))]"
                 >
                   <Search className="h-4 w-4" />
                 </Button>
               </form>
             </div>

             {/* Desktop Navigation */}
             <nav className="hidden md:flex items-center space-x-8">
               {navigation.map((item) => (
                 <Link
                   key={item.name}
                   to={item.href}
                   className={`text-sm font-medium transition-colors hover:text-white ${
                      isActive(item.href)
                        ? "text-white"
                        : "text-white/80"
                   }`}
                 >
                   {item.name}
                 </Link>
               ))}
             </nav>

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

           {/* Mobile Search Bar */}
            <div className="md:hidden py-3 border-t border-border/40">
             <form onSubmit={handleSearch} className="relative">
               <Input
                 type="text"
                 placeholder="Search assessment..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[hsl(var(--thinkera-purple))] focus:border-transparent"
               />
               <Button
                 type="submit"
                 variant="ghost"
                 size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 text-gray-500 hover:text-[hsl(var(--thinkera-purple))]"
               >
                 <Search className="h-4 w-4" />
               </Button>
             </form>
           </div>

           {/* Mobile Navigation */}
           {isMenuOpen && (
             <div className="md:hidden">
               <div className="px-2 pt-2 pb-4 space-y-1 border-t">
                 {navigation.map((item) => (
                   <Link
                     key={item.name}
                     to={item.href}
                     className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                       isActive(item.href)
                          ? "bg-[hsl(var(--thinkera-blue-dark))] text-white"
                          : "text-white/80 hover:bg-[hsl(var(--thinkera-blue-dark))] hover:text-white"
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
       )}

       {/* Assessment Header - Show only on individual assessment pages */}
       {location.pathname.startsWith("/assessment/") && (
         <div className="container mx-auto px-4">
           <div className="flex h-16 items-center justify-between">
             {/* Logo */}
             <Link to="/" className="flex items-center space-x-2">
               <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                 <Calculator className="h-5 w-5 text-primary-foreground" />
               </div>
                <span className="text-xl font-bold text-white">LAKXA</span>
             </Link>

             {/* Assessment Categories Navigation */}
             <nav className="hidden md:flex items-center space-x-8">
               {assessmentCategories.map((category) => (
                 <button
                   key={category.name}
                   onClick={() => handleCategoryClick(category.href)}
                   className={`text-sm font-medium whitespace-nowrap transition-colors hover:text-white px-2 py-1 cursor-pointer ${
                      (category.name === "View All" && location.pathname === "/assessments" && !location.search.includes("category=")) ||
                      (category.name !== "View All" && location.search.includes(`category=${category.name}`))
                        ? "text-white border-b-2 border-white"
                        : "text-white/80"
                   }`}
                 >
                   {category.name}
                 </button>
               ))}
             </nav>

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

           {/* Mobile Assessment Navigation */}
           {isMenuOpen && (
             <div className="md:hidden">
               <div className="px-2 pt-2 pb-4 space-y-1 border-t">
                 {assessmentCategories.map((category) => (
                   <button
                     key={category.name}
                     onClick={() => handleCategoryClick(category.href)}
                     className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-colors cursor-pointer ${
                       (category.name === "View All" && location.pathname === "/assessments" && !location.search.includes("category=")) ||
                       (category.name !== "View All" && location.search.includes(`category=${category.name}`))
                          ? "bg-[hsl(var(--thinkera-blue-dark))] text-white"
                          : "text-white/80 hover:bg-[hsl(var(--thinkera-blue-dark))] hover:text-white"
                     }`}
                   >
                     {category.name}
                   </button>
                 ))}
               </div>
             </div>
           )}
         </div>
       )}

       {/* Secondary Navigation - Assessment Categories (Only on Assessments page) */}
       {location.pathname === "/assessments" && (
                   <div className="border-t border-[hsl(var(--thinkera-blue))]/40 bg-[hsl(var(--thinkera-blue))]/10">
           <div className="container mx-auto px-4">
             <nav className="flex items-center space-x-8 overflow-x-auto py-4">
               {assessmentCategories.map((category) => (
                 <button
                   key={category.name}
                   onClick={() => handleCategoryClick(category.href)}
                   className={`text-base font-medium whitespace-nowrap transition-colors hover:text-white px-2 py-1 cursor-pointer ${
                      (category.name === "View All" && location.pathname === "/assessments" && !location.search.includes("category=")) ||
                      (category.name !== "View All" && location.search.includes(`category=${category.name}`))
                        ? "text-white border-b-2 border-white"
                        : "text-white/80"
                   }`}
                 >
                   {category.name}
                 </button>
               ))}
             </nav>
           </div>
         </div>
       )}
     </header>
  );
};

export default Header;