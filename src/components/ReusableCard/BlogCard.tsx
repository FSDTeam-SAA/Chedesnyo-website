// components/BlogCard.tsx
import React from "react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

interface BlogCardProps {
  image: string;
  date: string;
  title: string;
  onViewDetails?: () => void;
}

const BlogCard: React.FC<BlogCardProps> = ({
  image,
  date,
  title,
  onViewDetails = () => {},
}) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-md">
      {/* Image */}
      <div className="relative overflow-hidden h-48 bg-gray-200">
        <Image
          src={image}
          alt={title}
          width={400}
          height={300}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex justify-between items-center">
        {/* Left: Date and Title */}
        <div className="flex-1 pr-4">
          <p className="text-gray-500 text-sm font-medium mb-2">{date}</p>
          <h3 className="text-gray-900 text-lg font-semibold mb-0 line-clamp-2 leading-tight">
            {title.slice(0,20)}...
          </h3>
        </div>

        {/* Right: View Details Button */}
        <div className="flex-shrink-0 flex items-start">
          <button
            onClick={onViewDetails}
            className="inline-flex items-center gap-2 text-green-600 font-medium hover:text-green-700 transition-colors duration-200 group"
          >
            View Details
            <ChevronRight
              size={18}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
