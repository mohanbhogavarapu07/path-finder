import { cn } from "@/lib/utils";
import { Brain, Code, Radar, Target, CheckCircle } from "lucide-react";

interface SectionTabsProps {
  currentSection: number;
  completedSections: number[];
  onSectionChange?: (section: number) => void;
  disabled?: boolean;
}

const sections = [
  { id: 0, title: "Introduction", icon: Target },
  { id: 1, title: "Psychological Fit", icon: Brain },
  { id: 2, title: "Technical Aptitude", icon: Code },
  { id: 3, title: "FB6 Index Analysis", icon: Radar },
  { id: 4, title: "Your Results", icon: CheckCircle }
];

const sectionStyles = [
  'bg-blue-100 text-blue-700 border-2 border-blue-300', // active
  'bg-green-100 text-green-700', // completed
  'bg-gray-100 text-gray-500' // inactive
];

export const SectionTabs = ({ 
  currentSection, 
  completedSections, 
  onSectionChange,
  disabled = false 
}: SectionTabsProps) => {
  return (
    <div className="flex flex-row gap-4 mb-4">
      {sections.map((section, index) => {
        const isActive = currentSection === section.id;
        const isCompleted = completedSections.includes(section.id);
        let style = sectionStyles[2];
        if (isActive) style = sectionStyles[0];
        else if (isCompleted) style = sectionStyles[1];
        return (
          <div
            key={section.id}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg min-w-fit ${style}`}
          >
            {isCompleted ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <section.icon className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">{section.title}</span>
          </div>
        );
      })}
    </div>
  );
};