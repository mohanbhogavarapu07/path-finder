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
      href: `/assessments?category=${encodeURIComponent(category)}`
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
            <header className="sticky top-0 z-50 w-full border-b bg-white text-gray-900 border-gray-200 shadow-lg">
       {/* Main Header - Show only on non-assessment pages */}
       {!location.pathname.startsWith("/assessment/") && (
         <div className="container mx-auto px-4">
           <div className="flex h-16 items-center justify-between">
              {/* Logo */}
               <Link to="/" className="flex items-center space-x-3">
                 <img 
                   src="/logo.png" 
                   alt="FactorBeam Logo" 
                   className="h-10 w-auto object-contain"
                 />
                 <span className="text-xl font-bold text-gray-900">FactorBeam</span>
               </Link>

                           {/* Search Bar - Center */}
              <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
                <form onSubmit={handleSearch} className="relative w-full">
                  <Input
                    type="text"
                    placeholder="Search assessment..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                     className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-factorbeam-primary focus:border-factorbeam-primary"
                  />
                  <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                     className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 text-gray-500 hover:text-factorbeam-primary"
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
                    className={`text-sm font-medium transition-colors hover:text-factorbeam-primary ${
                       isActive(item.href)
                         ? "text-factorbeam-primary"
                         : "text-gray-600"
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
              <div className="md:hidden py-3 border-t border-gray-200">
               <form onSubmit={handleSearch} className="relative">
                 <Input
                   type="text"
                   placeholder="Search assessment..."
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                                       className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-factorbeam-primary focus:border-factorbeam-primary"
                 />
                 <Button
                   type="submit"
                   variant="ghost"
                   size="icon"
                                       className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 text-gray-500 hover:text-factorbeam-primary"
                 >
                   <Search className="h-4 w-4" />
                 </Button>
               </form>
             </div>

                                               {/* Mobile Navigation */}
             {isMenuOpen && (
               <div className="md:hidden">
                 <div className="px-2 pt-2 pb-4 space-y-1 border-t border-gray-200">
                   {navigation.map((item) => (
                     <Link
                       key={item.name}
                       to={item.href}
                       className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                         isActive(item.href)
                            ? "bg-factorbeam-primary text-white"
                            : "text-gray-600 hover:bg-gray-100 hover:text-factorbeam-primary"
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
              <Link to="/" className="flex items-center space-x-3">
                <img 
                  src="/logo.png" 
                  alt="FactorBeam Logo" 
                  className="h-8 w-auto object-contain"
                />
                 <span className="text-xl font-bold text-gray-900">FactorBeam</span>
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
                           ? "bg-factorbeam-primary-alt text-white"
                           : "text-white/80 hover:bg-factorbeam-primary-alt hover:text-white"
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
                     <div className="border-t border-gray-200 bg-gray-50">
             <div className="container mx-auto px-4">
               <nav className="flex items-center space-x-8 overflow-x-auto py-4">
                 {assessmentCategories.map((category) => (
                   <button
                     key={category.name}
                     onClick={() => handleCategoryClick(category.href)}
                     className={`text-base font-medium whitespace-nowrap transition-colors hover:text-factorbeam-primary px-2 py-1 cursor-pointer ${
                        (category.name === "View All" && location.pathname === "/assessments" && !location.search.includes("category=")) ||
                        (category.name !== "View All" && location.search.includes(`category=${encodeURIComponent(category.name)}`))
                          ? "text-factorbeam-primary border-b-2 border-factorbeam-primary"
                          : "text-gray-600"
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