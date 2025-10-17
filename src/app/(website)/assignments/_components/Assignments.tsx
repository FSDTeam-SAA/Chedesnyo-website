"use client";
import React from "react";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

interface Assignment {
  image: string;
  category: string;
  title: string;
  type: string;
  paymentType: string;
  paymentAmount: string;
  applications: number;
}

const assignments: Assignment[] = [
  {
    image: "/images/assignmentImage.png",
    category: "Information Technology",
    title: "Web application development",
    type: "Test Assignment",
    paymentType: "Hourly",
    paymentAmount: "$17.00",
    applications: 3,
  },
  {
    image:
      "/images/assignmentImage.png",
    category: "Information Technology",
    title: "Backend API Integration",
    type: "Test Assignment",
    paymentType: "Hourly",
    paymentAmount: "$17.00",
    applications: 5,
  },
  {
    image:
      "/images/assignmentImage.png",
    category: "Information Technology",
    title: "Frontend UI Design",
    type: "Test Assignment",
    paymentType: "Hourly",
    paymentAmount: "$17.00",
    applications: 4,
  },
  {
    image:
      "/images/assignmentImage.png",
    category: "Finance",
    title: "Profitability Ratios",
    type: "Test Assignment",
    paymentType: "Hourly",
    paymentAmount: "$17.00",
    applications: 6,
  },
  {
    image:
      "/images/assignmentImage.png",
    category: "Information Technology",
    title: "Web App Security Review",
    type: "Test Assignment",
    paymentType: "Hourly",
    paymentAmount: "$17.00",
    applications: 2,
  },
  {
    image: "/images/assignmentImage.png",
    category: "Information Technology",
    title: "React Component Testing",
    type: "Test Assignment",
    paymentType: "Hourly",
    paymentAmount: "$17.00",
    applications: 7,
  },
  {
    image: "/images/assignmentImage.png",
    category: "Information Technology",
    title: "Landing Page Optimization",
    type: "Test Assignment",
    paymentType: "Hourly",
    paymentAmount: "$17.00",
    applications: 3,
  },
  {
    image: "/images/assignmentImage.png",
    category: "Information Technology",
    title: "Promotional Flyers Design",
    type: "Test Assignment",
    paymentType: "Hourly",
    paymentAmount: "$17.00",
    applications: 5,
  },
  {
    image:
      "/images/assignmentImage.png",
    category: "Information Technology",
    title: "Full Stack App Prototype",
    type: "Test Assignment",
    paymentType: "Hourly",
    paymentAmount: "$17.00",
    applications: 4,
  },
];

function AssignmentCard({
  image,
  category,
  title,
  type,
  paymentType,
  paymentAmount,
  applications,
  onTakeDeal,
}: Assignment & { onTakeDeal: () => void }) {
  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Image */}
      <div className="relative w-full h-56 overflow-hidden">
        <Image
          width={500}
          height={500}
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Category */}
        <div className="inline-flex items-center">
          <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-semibold border border-green-200">
            <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
            {category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-gray-900 line-clamp-2 leading-snug">
          {title}
        </h3>

        <div className="h-px bg-gray-200"></div>

        {/* Details */}
        <div className="space-y-2.5 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Type:</span>
            <span className="font-medium">{type}</span>
          </div>

          <div className="flex justify-between text-gray-600">
            <span>Payment:</span>
            <span className="font-medium">
              {paymentType} - {paymentAmount}
            </span>
          </div>

          <div className="flex justify-between text-gray-600">
            <span>Applications:</span>
            <span className="font-medium">{applications}</span>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={onTakeDeal}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg text-sm mt-4"
        >
          <CheckCircle2 size={18} strokeWidth={2.5} />
          Take This Deal
        </button>
      </div>
    </div>
  );
}

export default function Assignments() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Assignments</h1>
            <p className="text-gray-600 text-sm mt-1">
              Browse and take assignments
            </p>
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-lg">
            + Create
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignments.map((assignment, index) => (
            <AssignmentCard
              key={index}
              {...assignment}
              onTakeDeal={() => alert(`Took deal: ${assignment.title}`)}
            />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 py-8">
        {[1, 2, 3].map((num) => (
          <button
            key={num}
            className="w-8 h-8 rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 flex items-center justify-center text-sm font-medium"
          >
            {num}
          </button>
        ))}
        <span className="text-gray-400">...</span>
      </div>
    </div>
  );
}
