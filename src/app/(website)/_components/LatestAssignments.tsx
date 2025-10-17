import React from "react";
import { ChevronRight, Briefcase } from "lucide-react";
import Image from "next/image";

export default function LatestAssignments() {
  const assignments = [
    {
      image:
        "/images/assignmentImage.png",
      category: "Information Technology",
      title: "Web application development",
      type: "Test Assignment",
      paymentType: "Hourly",
      paymentAmount: "($17.00)",
      applications: 3,
    },
    {
      image:
        "/images/assignmentImage.png",
      category: "Information Technology",
      title: "Web application development",
      type: "Test Assignment",
      paymentType: "Hourly",
      paymentAmount: "($17.00)",
      applications: 3,
    },
    {
      image:
        "/images/assignmentImage.png",
      category: "Information Technology",
      title: "Web application development",
      type: "Test Assignment",
      paymentType: "Hourly",
      paymentAmount: "($17.00)",
      applications: 3,
    },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <p className="text-gray-500 text-sm font-semibold mb-2">
         4     ASSIGNMENTS
            </p>
            <h2 className="text-4xl font-bold text-gray-900">
              LATEST ASSIGNMENTS
            </h2>
          </div>
          <a
            href="#"
            className="text-green-600 font-semibold flex items-center gap-1 hover:text-green-700"
          >
            SEE ALL <ChevronRight size={20} />
          </a>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {assignments.map((assignment, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-gray-200">
                <Image
                  width={500}
                  height={500}
                  src={assignment.image}
                  alt={assignment.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {assignment.category}
                  </span>
                  <span className="text-gray-400 text-lg">$</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {assignment.title}
                </h3>

                {/* Type */}
                <p className="text-gray-600 text-sm font-medium mb-3">
                  {assignment.type}
                </p>

                {/* Payment Type */}
                <p className="text-gray-700 text-sm mb-2">
                  <span className="font-semibold">Payment Type:</span>{" "}
                  {assignment.paymentType} {assignment.paymentAmount}
                </p>

                {/* Applications */}
                <p className="text-gray-700 text-sm mb-6">
                  <span className="font-semibold">Applications:</span>{" "}
                  {assignment.applications}
                </p>

                {/* Button */}
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-full flex items-center justify-center gap-2 transition-colors">
                  <Briefcase size={18} />
                  Take This Deal
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
