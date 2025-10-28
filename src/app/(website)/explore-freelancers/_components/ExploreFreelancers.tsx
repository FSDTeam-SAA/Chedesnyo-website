"use client";

import React, { useState, useEffect } from "react";
import { FreelancerCard } from "@/components/ReusableCard/FreelancersCard";
import { BreadcrumbHeader } from "@/components/ReusableCard/SubHero";
import { Input } from "@/components/ui/input";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";

// ✅ Define the TypeScript type
type Freelancer = {
  id: string;
  firstName: string;
  profileImage: string;
  location: string;
  rating?: number;
  reviewCount?: number;
};

export default function ExploreFreelancers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // const [category, setCategory] = useState("");
  // const [experience, setExperience] = useState("");
  const itemsPerPage = 6;

  // ✅ Debounce search term
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearchTerm(searchTerm), 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // ✅ Fetch freelancers from API
  const { data, isError, refetch } = useQuery({
    queryKey: ["freelancers", debouncedSearchTerm,currentPage],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append("role", "seles");
      params.append("status", "approved");
      params.append("page", currentPage.toString());
      params.append("limit", itemsPerPage.toString());

      if (debouncedSearchTerm) params.append("searchTerm", debouncedSearchTerm);
      // if (category) params.append("category", category);
      // if (experience) params.append("experience", experience);

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/all-user?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch freelancers");
      return res.json();
    },
  });

  const freelancersData: Freelancer[] = data?.data || [];
  const totalItems: number = data?.meta?.total || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

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


  if (isError)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Failed to load freelancers.
      </div>
    );

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
        <div className="max-w-5xl mx-auto px-6 pb-6 flex items-center justify-center">
          <div className="relative w-full py-[96px]">
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
            <button
              onClick={() => refetch()}
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white p-2.5 rounded-full transition-colors flex items-center justify-center"
            >
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* ✅ Filters */}
        {/* <div className="flex flex-col sm:flex-row gap-4 pb-[72px] items-center mx-auto max-w-5xl">
          <div className="flex gap-6 items-center">
            <p>Filter by :</p>
            <div className="flex gap-[40px]">
              <Select onValueChange={(val) => { setCategory(val); setCurrentPage(1); }}>
                <SelectTrigger className="w-full sm:w-64 rounded-full h-[45px] shadow-[0px_4px_32px_0px_#00000040]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={(val) => { setExperience(val); setCurrentPage(1); }}>
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
        </div> */}

        {/* ✅ Freelancers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {freelancersData.map((freelancer) => (
            <FreelancerCard
              key={freelancer.id}
              id={freelancer.id}
              name={freelancer.firstName}
              image={freelancer.profileImage}
              bio={freelancer.location || ""}
              rating={freelancer.rating || 0}
              reviewCount={freelancer.reviewCount || 0}
            />
          ))}
        </div>

        {/* ✅ Pagination */}
        {totalPages > 1 && (
          <div className="w-full flex items-center justify-between mt-12 pt-6">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={20} className="text-gray-600" />
            </button>

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
                  className={`px-3 py-2 rounded-md border font-medium transition-colors ${currentPage === page
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
