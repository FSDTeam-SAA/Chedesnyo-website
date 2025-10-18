"use client";

import React, { useState } from "react";
import { FreelancerCard } from "@/components/ReusableCard/FreelancersCard";
import { BreadcrumbHeader } from "@/components/ReusableCard/SubHero";
import { Input } from "@/components/ui/input";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ✅ Define the TypeScript type
type Freelancer = {
  id: number;
  name: string;
  image: string;
  bio: string;
  rating: number;
  reviewCount: number;
};

export default function ExploreFreelancers() {
  // ✅ Freelancer demo data
  const freelancersData: Freelancer[] = [
    {
      id: 1,
      name: "Wilamsion",
      image: "/images/freelancersImage.jpg",
      bio: "I have been working as a freelancer in the IT, marketing, and design industry for 4 years, delivering high-quality services.",
      rating: 3.0,
      reviewCount: 1,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      image: "/images/freelancersImage.jpg",
      bio: "Expert in web development, UI/UX design, and digital marketing with 6 years of industry experience.",
      rating: 4.8,
      reviewCount: 45,
    },
    {
      id: 3,
      name: "Michael Chen",
      image: "/images/freelancersImage.jpg",
      bio: "Full-stack developer specializing in React, Node.js, and cloud solutions. Passionate about clean code.",
      rating: 4.9,
      reviewCount: 62,
    },
    {
      id: 4,
      name: "Emma Williams",
      image: "/images/freelancersImage.jpg",
      bio: "Creative designer with expertise in branding, graphic design, and motion graphics for 5+ years.",
      rating: 4.7,
      reviewCount: 38,
    },
    {
      id: 5,
      name: "Daniel Smith",
      image: "/images/freelancersImage.jpg",
      bio: "Experienced mobile app developer with deep knowledge in Flutter and React Native frameworks.",
      rating: 4.6,
      reviewCount: 22,
    },
    {
      id: 6,
      name: "Olivia Brown",
      image: "/images/freelancersImage.jpg",
      bio: "Professional content writer and SEO specialist helping brands grow organically online.",
      rating: 4.5,
      reviewCount: 30,
    },
    {
      id: 7,
      name: "James Anderson",
      image: "/images/freelancersImage.jpg",
      bio: "UI/UX designer crafting modern, user-friendly interfaces with Figma and Adobe XD.",
      rating: 4.9,
      reviewCount: 55,
    },
    {
      id: 8,
      name: "Sophia Lee",
      image: "/images/freelancersImage.jpg",
      bio: "Branding expert and visual designer passionate about helping businesses stand out.",
      rating: 4.8,
      reviewCount: 41,
    },
    {
      id: 9,
      name: "Liam Johnson",
      image: "/images/freelancersImage.jpg",
      bio: "Digital marketer focused on PPC, social ads, and performance marketing.",
      rating: 4.4,
      reviewCount: 18,
    },
    {
      id: 10,
      name: "Ava Martinez",
      image: "/images/freelancersImage.jpg",
      bio: "Professional video editor and motion designer with 7 years of experience.",
      rating: 4.9,
      reviewCount: 63,
    },
  ];

  // ✅ State for search and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // ✅ Filter freelancers by name or bio
  const filteredFreelancers = freelancersData.filter(
    (freelancer) =>
      freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      freelancer.bio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Pagination logic
  const totalPages = Math.ceil(filteredFreelancers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFreelancers = filteredFreelancers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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
    <div className="min-h-screen mb-[96px]">
      {/* ✅ Breadcrumb Header */}
      <BreadcrumbHeader
        title="Explore Freelancers"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Explore Freelancers", href: "/explore-freelancers" },
        ]}
      />

      <div className="container mx-auto px-6">
        {/* ✅ Search Bar */}
        <div className="max-w-5xl mx-auto px-6 pt-[96px] pb-6 flex items-center justify-center">
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

        {/* ✅ Filters */}
        <div className="flex flex-col sm:flex-row gap-4 pb-[72px] items-center mx-auto max-w-5xl">
          <div className="flex gap-6 items-center">
            <p>Filter by :</p>
            <div className="flex gap-[40px]">
              <Select>
                <SelectTrigger className="w-full sm:w-64 rounded-full h-[45px] shadow-[0px_4px_32px_0px_#00000040]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-full sm:w-64 rounded-full h-[45px] shadow-[0px_4px_32px_0px_#00000040]">
                  <SelectValue placeholder="Experience Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* ✅ Freelancers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {paginatedFreelancers.map((freelancer) => (
            <FreelancerCard key={freelancer.id} {...freelancer} />
          ))}
        </div>

        {/* ✅ Pagination */}
        {totalPages > 1 && (
          <div className="w-full flex items-center justify-between mt-12 pt-6">
            {/* Previous */}
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

            {/* Next */}
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
      </div>
    </div>
  );
}
