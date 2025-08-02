
import { Shield, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="bg-blue-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-cyan-400" />
            <div>
              <h1 className="text-2xl font-bold">🔐 CYBER CAREER COMPASS</h1>
              <p className="text-sm text-blue-200">"Should I Learn Cyber Security?" – Full Capability Assessment</p>
            </div>
          </div>
          {onMenuClick && (
            <Button variant="ghost" size="sm" onClick={onMenuClick} className="text-white hover:bg-white/10">
              <Menu className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
