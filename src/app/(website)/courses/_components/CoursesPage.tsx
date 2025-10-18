"use client";

import React, { useState } from "react";
import { BreadcrumbHeader } from "@/components/ReusableCard/SubHero";
import { Input } from "@/components/ui/input";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import CoursesCard from "@/components/ReusableCard/CoursesCard";

// ✅ Define TypeScript type
type courses = {
  image: string;
  category: string;
  title: string;
  type: string;
  paymentType: string;
  paymentAmount: string;
  applications: number;
};

// ✅ Sample assignments data
const courses: courses[] = [
  {
    image: "/images/courseImage.jpg",
    category: "Information Technology",
    title: "Web application development",
    type: "Test Assignment",
    paymentType: "Hourly",
    paymentAmount: "$17.00",
    applications: 3,
  },
  {
    image: "/images/courseImage.jpg",
    category: "Information Technology",
    title: "Backend API Integration",
    type: "Test Assignment",
    paymentType: "Hourly",
    paymentAmount: "$17.00",
    applications: 5,
  },
  {
    image: "/images/courseImage.jpg",
    category: "Information Technology",
    title: "Frontend UI Design",
    type: "Test Assignment",
    paymentType: "Hourly",
    paymentAmount: "$17.00",
    applications: 4,
  },
  {
    image: "/images/courseImage.jpg",
    category: "Finance",
    title: "Profitability Ratios",
    type: "Test Assignment",
    paymentType: "Hourly",
    paymentAmount: "$17.00",
    applications: 6,
  },
  {
    image: "/images/courseImage.jpg",
    category: "Finance",
    title: "Financial Analysis",
    type: "Test Assignment",
    paymentType: "Hourly",
    paymentAmount: "$17.00",
    applications: 6,
  },
  {
    image: "/images/courseImage.jpg",
    category: "Finance",
    title: "Budget Planning",
    type: "Test Assignment",
    paymentType: "Hourly",
    paymentAmount: "$17.00",
    applications: 6,
  },
  {
    image: "/images/courseImage.jpg",
    category: "Marketing",
    title: "Social Media Campaign",
    type: "Test Assignment",
    paymentType: "Hourly",
    paymentAmount: "$17.00",
    applications: 2,
  },
  {
    image: "/images/courseImage.jpg",
    category: "Marketing",
    title: "Content Strategy",
    type: "Test Assignment",
    paymentType: "Hourly",
    paymentAmount: "$17.00",
    applications: 4,
  },
  {
    image: "/images/courseImage.jpg",
    category: "Design",
    title: "Graphic Design Project",
    type: "Test Assignment",
    paymentType: "Hourly",
    paymentAmount: "$17.00",
    applications: 3,
  },
  {
    image: "/images/courseImage.jpg",
    category: "Design",
    title: "UX Research",
    type: "Test Assignment",
    paymentType: "Hourly",
    paymentAmount: "$17.00",
    applications: 5,
  },
  {
    image: "/images/courseImage.jpg",
    category: "Design",
    title: "UX Research",
    type: "Test Assignment",
    paymentType: "Hourly",
    paymentAmount: "$17.00",
    applications: 5,
  },
  {
    image: "/images/courseImage.jpg",
    category: "Design",
    title: "UX Research",
    type: "Test Assignment",
    paymentType: "Hourly",
    paymentAmount: "$17.00",
    applications: 5,
  },
];

function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // ✅ Filter assignments by title or category
  const filteredAssignments = courses.filter(
    (assignment) =>
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Calculate pagination
  const totalPages = Math.ceil(filteredAssignments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAssignments = filteredAssignments.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // ✅ Generate page numbers for pagination display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Header */}
      <BreadcrumbHeader
        title="Courses"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Courses", href: "/courses" },
        ]}
      />

      {/* Search Input */}
      <div className="max-w-5xl mx-auto px-6 py-[96px] flex items-center justify-center">
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Search here..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-4 h-[50px] shadow-[0px_4px_32px_0px_#00000040] bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400 text-gray-900"
          />
          <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white p-2.5 rounded-full transition-colors flex items-center justify-center">
            <Search size={20} />
          </button>
        </div>
      </div>

      {/* Assignment Cards Grid */}
      <div className="container mx-auto px-6 pb-16">
        {paginatedAssignments.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {paginatedAssignments.map((assignment, index) => (
                <CoursesCard key={index} {...assignment} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="w-full flex items-center justify-between mt-12 pt-6">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={20} className="text-gray-600" />
                </button>

                {/* Page Numbers */}
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  {pageNumbers[0] > 1 && (
                    <>
                      <button
                        onClick={() => handlePageChange(1)}
                        className="px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors text-gray-700 font-medium"
                      >
                        01
                      </button>
                      {pageNumbers[0] > 2 && (
                        <span className="px-2 text-gray-400">...</span>
                      )}
                    </>
                  )}

                  {pageNumbers.map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-2 rounded-md border font-medium transition-colors ${
                        currentPage === page
                          ? "border-green-500 bg-green-50 text-green-600"
                          : "border-gray-300 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {String(page).padStart(2, "0")}
                    </button>
                  ))}

                  {pageNumbers[pageNumbers.length - 1] < totalPages && (
                    <>
                      {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                        <span className="px-2 text-gray-400">...</span>
                      )}
                      <button
                        onClick={() => handlePageChange(totalPages)}
                        className="px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors text-gray-700 font-medium"
                      >
                        {String(totalPages).padStart(2, "0")}
                      </button>
                    </>
                  )}
                </div>

                {/* Next Button */}
                <button
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={20} className="text-gray-600" />
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-500 py-10">
            No assignments found for {searchTerm}
          </p>
        )}
      </div>
    </div>
  );
}

export default CoursesPage;
