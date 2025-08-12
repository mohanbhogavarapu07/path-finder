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
    // { name: "Home", href: "/" },
    // { name: "Design", href: "/design" },
    // { name: "Healthcare", href: "/healthcare" },
    // { name: "Engineering", href: "/engineering" },
    // { name: "Security", href: "/security" },
    // { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Dynamic Assessments", href: "/dynamic-assessments" },
  ];

  // Assessment categories for secondary navigation
  const assessmentCategories = [
    { name: "Cloud", href: "/assessments#cloud" },
    { name: "Data", href: "/assessments#data" },
    { name: "Technology", href: "/assessments#technology" },
    { name: "Programming", href: "/assessments#programming" },
    { name: "Management", href: "/assessments#management" },
    { name: "Business", href: "/assessments#business" },
    { name: "Medical", href: "/assessments#medical" },
    { name: "Platform", href: "/assessments#platform" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log("Searching for:", searchQuery);
  };

     return (
           <header className="sticky top-0 z-50 w-full border-b bg-blue-600/50 text-white border-blue-700/40">
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
                   className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-thinkera-purple focus:border-transparent"
                 />
                 <Button
                   type="submit"
                   variant="ghost"
                   size="icon"
                   className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 text-gray-500 hover:text-thinkera-purple"
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
                       : "text-blue-100"
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
                 className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-thinkera-purple focus:border-transparent"
               />
               <Button
                 type="submit"
                 variant="ghost"
                 size="icon"
                 className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 text-gray-500 hover:text-thinkera-purple"
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
                         ? "bg-blue-700 text-white"
                         : "text-blue-100 hover:bg-blue-700 hover:text-white"
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
               <span className="text-xl font-bold text-gradient">LAKXA</span>
             </Link>

             {/* Assessment Categories Navigation */}
             <nav className="hidden md:flex items-center space-x-8">
               {assessmentCategories.map((category) => (
                 <a
                   key={category.name}
                   href={category.href}
                   className={`text-sm font-medium whitespace-nowrap transition-colors hover:text-white px-2 py-1 cursor-pointer ${
                     location.hash === category.href.split("#")[1]
                       ? "text-white border-b-2 border-white"
                       : "text-blue-100"
                   }`}
                 >
                   {category.name}
                 </a>
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
                   <a
                     key={category.name}
                     href={category.href}
                     className={`block px-3 py-2 text-base font-medium rounded-md transition-colors cursor-pointer ${
                       location.hash === category.href.split("#")[1]
                         ? "bg-blue-700 text-white"
                         : "text-blue-100 hover:bg-blue-700 hover:text-white"
                     }`}
                     onClick={() => setIsMenuOpen(false)}
                   >
                     {category.name}
                   </a>
                 ))}
               </div>
             </div>
           )}
         </div>
       )}

       {/* Secondary Navigation - Assessment Categories (Only on Assessments page) */}
       {location.pathname === "/assessments" && (
                   <div className="border-t border-blue-700/40 bg-blue-600/10">
           <div className="container mx-auto px-4">
             <nav className="flex items-center space-x-8 overflow-x-auto py-4">
               {assessmentCategories.map((category) => (
                 <a
                   key={category.name}
                   href={category.href}
                   className={`text-base font-medium whitespace-nowrap transition-colors hover:text-white px-2 py-1 cursor-pointer ${
                     location.hash === category.href.split("#")[1]
                       ? "text-white border-b-2 border-white"
                       : "text-blue-100"
                   }`}
                 >
                   {category.name}
                 </a>
               ))}
             </nav>
           </div>
         </div>
       )}
     </header>
  );
};

export default Header;