import { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const popularSearches = [
    "Personality Test", "IQ Assessment", "Career Guide", "Health Check",
    "Leadership Skills", "Learning Style", "Stress Level", "Team Dynamics"
  ];

  return (
    <div className="bg-gradient-hero py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Main Search */}
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-heading mb-4">
            Discover Your Next Assessment
          </h2>
          <p className="text-lg text-foreground-soft mb-8 max-w-2xl mx-auto">
            Explore over 300 professionally designed assessments across education, health, business, and personal development
          </p>
          
          <div className="relative max-w-2xl mx-auto">
            <div className="search-glow relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground-soft" />
              <Input
                type="text"
                placeholder="Search assessments, topics, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-12 h-14 text-lg bg-card border-input-border rounded-xl shadow-custom-sm"
              />
              <Button
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 btn-primary h-10"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                AI Suggest
              </Button>
            </div>
          </div>
        </div>



        {/* Popular Searches */}
        <div className="text-center">
          <p className="text-sm text-foreground-soft mb-3">Popular searches:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {popularSearches.map((search) => (
              <button
                key={search}
                onClick={() => setSearchQuery(search)}
                className="px-3 py-1 text-sm bg-card hover:bg-card-hover border border-border rounded-md transition-colors"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;

