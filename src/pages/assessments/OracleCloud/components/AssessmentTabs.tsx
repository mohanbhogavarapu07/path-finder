import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";

interface AssessmentTab {
  id: string;
  title: string;
  icon: React.ElementType;
  completed: boolean;
  current: boolean;
}

interface AssessmentTabsProps {
  tabs: AssessmentTab[];
  onTabClick: (tabId: string) => void;
}

export const AssessmentTabs = ({ tabs, onTabClick }: AssessmentTabsProps) => {
  return (
    <div className="flex mt-4 space-x-4 overflow-x-auto">
      {tabs.map((tab, index) => {
        const Icon = tab.icon;
        const isActive = tab.current;
        const isCompleted = tab.completed;
        return (
          <div
            key={tab.id}
            onClick={() => onTabClick(tab.id)}
            className={cn(
              "flex items-center space-x-2 px-3 py-2 rounded-lg min-w-fit cursor-pointer",
              isActive
                ? "bg-blue-100 text-blue-700 border-2 border-blue-300"
                : isCompleted
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-500"
            )}
          >
            {isCompleted ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <Icon className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">{tab.title}</span>
          </div>
        );
      })}
    </div>
  );
};

export const defaultTabs: AssessmentTab[] = [
  {
    id: "introduction",
    title: "Introduction",
    icon: CheckCircle,
    completed: false,
    current: true
  },
  {
    id: "psychological",
    title: "Psychological Fit",
    icon: CheckCircle,
    completed: false,
    current: false
  },
  {
    id: "technical",
    title: "Technical Aptitude",
    icon: CheckCircle,
    completed: false,
    current: false
  },
  {
    id: "wiscar",
    title: "WISCAR Analysis",
    icon: CheckCircle,
    completed: false,
    current: false
  },
  {
    id: "results",
    title: "Your Results",
    icon: CheckCircle,
    completed: false,
    current: false
  }
];