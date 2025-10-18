import React from 'react';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';

function BlogCard({ 
  image = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=350&fit=crop',
  date = 'January 04, 2024',
  title = 'Lorem ipsum dolor sit consectetur elit',
  onViewDetails = () => {}
}) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-md">
      {/* Image Container */}
      <div className="relative overflow-hidden h-48 bg-gray-200">
        <Image
        width={300}
        height={300}
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content Container */}
      <div className="p-6">
        {/* Date */}
        <p className="text-gray-500 text-sm font-medium mb-3">{date}</p>

        {/* Title */}
        <h3 className="text-gray-900 text-lg font-semibold mb-6 line-clamp-2 leading-tight">
          {title}
        </h3>

        {/* View Details Button */}
        <button
          onClick={onViewDetails}
          className="inline-flex items-center gap-2 text-green-600 font-medium hover:text-green-700 transition-colors duration-200 group"
        >
          View Details
          <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </div>
    </div>
  );
}

export default BlogCard;