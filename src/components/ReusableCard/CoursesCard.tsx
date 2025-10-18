"use client";
import React from "react";
import { Book } from "lucide-react";
import Image from "next/image";

interface DealCardProps {
  image?: string;
  category: string;
  title: string;
  type: string;
  paymentType: string;
  paymentAmount: string;
  applications: number;
  onTakeDeal?: () => void;
  price?: string;
}

export default function CoursesCard({
  image = "https://via.placeholder.com/400x300?text=HTML5+Development",
  category = "Information Technology",
  title = "Web application development",
  type = "Test Assignment",
  paymentType = "Hourly",
  paymentAmount = "$17.00",
  applications = 3,
  onTakeDeal = () => alert("Deal taken!"),
}: DealCardProps) {
  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-[#8E959F]">
      {/* Image Container */}
      <div className="relative w-full h-72 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
        <Image
          src={image}
          width={500}
          height={500}
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      {/* Content Container */}
      <div className="p-4 space-y-2">
        {/* Category Badge */}
        <div className="inline-block">
          <span className="bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold border border-green-200 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-600 rounded-full"></span>
            {category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900 leading-tight">
          {title.slice(0, 20)}...
        </h3>

        {/* Divider */}
        <div className="h-px bg-gray-200"></div>

        {/* Details */}
        <div className="space-y-2">
          {/* Type */}
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">{type}</span>
          </div>

          {/* Payment Type and Amount */}
          <div className="flex items-center justify-between">
            <span className="text-gray-600">
              <span className="font-bold">Payment Type:{" "}</span>
              <span className="text-gray-900">
                {paymentType} ({paymentAmount})
              </span>
            </span>
          </div>

          {/* Applications */}
          <div className="flex items-center justify-between">
            <span className="text-gray-600">
              Applications:{" "}
              <span className="font-semibold text-gray-900">
                {applications}
              </span>
            </span>
          </div>
        </div>

        {/* Take This Deal Button */}
        <button
          onClick={onTakeDeal}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
        >
          <Book  size={20} />
          Take This Deal
        </button>
      </div>
    </div>
  );
}
