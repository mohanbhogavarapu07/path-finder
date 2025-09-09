import { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/assessments?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="bg-gradient-hero py-8 sm:py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Main Search */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-heading mb-3 sm:mb-4">
            Discover Your Next Assessment
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-foreground-soft mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Explore over 300 professionally designed assessments across education, health, business, and personal development
          </p>
          
          <div className="relative max-w-2xl mx-auto px-4">
            <div className="search-glow relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-foreground-soft" />
              <Input
                type="text"
                placeholder="Search assessments, topics, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10 sm:pl-12 pr-20 sm:pr-24 h-12 sm:h-14 text-sm sm:text-base lg:text-lg bg-card border-2 border-primary/20 rounded-xl shadow-custom-sm"
              />
              <Button
                size="sm"
                className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 btn-primary h-8 sm:h-10 text-xs sm:text-sm"
                onClick={handleSearch}
              >
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">AI Suggest</span>
                <span className="sm:hidden">AI</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;

