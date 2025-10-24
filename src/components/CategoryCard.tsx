import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categoryToSlug } from '@/lib/utils';

interface CategoryCardProps {
  name: string;
  count: number;
  color: string;
  textColor: string;
  dotColor: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  name, 
  count, 
  color, 
  textColor, 
  dotColor,
  icon: IconComponent 
}) => {
  return (
    <Link 
      to={`/category/${categoryToSlug(name)}`}
      className="group block"
    >
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 p-4 h-full flex flex-col items-center text-center group-hover:border-primary/30">
        {/* Count Circle with Dot - Exact layout from image */}
        <div className="flex items-center justify-center mb-3">
          <div className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 ${color} bg-white`}>
            <span className={`text-lg font-bold ${textColor}`}>
              {count}
            </span>
          </div>
          {/* Small colored dot next to the circle */}
          <div className={`w-2 h-2 rounded-full ml-2 ${dotColor}`}></div>
        </div>

        {/* Category Name - Dark blue as shown in image */}
        <h3 className="text-base font-semibold text-blue-900 mb-3 group-hover:text-primary transition-colors">
          {name}
        </h3>

        {/* Arrow */}
        <div className="mt-auto">
          <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
