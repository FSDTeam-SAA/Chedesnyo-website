"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import BlogCard from "@/components/ReusableCard/BlogCard";
import { BreadcrumbHeader } from "@/components/ReusableCard/SubHero";
import { ChevronLeft, ChevronRight } from "lucide-react";

type BlogPost = {
  id: number;
  image: string;
  date: string;
  title: string;
};

const blogPosts: BlogPost[] = [
  { id: 1, image: "/images/blogImage.jpg", date: "January 04, 2024", title: "Lorem ipsum dolor sit consectetur elit" },
  { id: 2, image: "/images/blogImage.jpg", date: "January 03, 2024", title: "Ut enim ad minim veniam quis nostrud" },
  { id: 3, image: "/images/blogImage.jpg", date: "January 02, 2024", title: "Duis aute irure dolor in reprehenderit" },
  { id: 4, image: "/images/blogImage.jpg", date: "January 01, 2024", title: "Sed ut perspiciatis unde omnis iste" },
  { id: 5, image: "/images/blogImage.jpg", date: "December 31, 2023", title: "Nemo enim ipsam voluptatem quia voluptas" },
  { id: 6, image: "/images/blogImage.jpg", date: "December 30, 2023", title: "Neque porro quisquam est qui dolorem ipsum" },
  { id: 7, image: "/images/blogImage.jpg", date: "December 29, 2023", title: "Another blog post title here" },
  { id: 8, image: "/images/blogImage.jpg", date: "December 28, 2023", title: "More content for the blog post" },
];

export default function BlogPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const totalPages = Math.ceil(blogPosts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPosts = blogPosts.slice(startIndex, startIndex + itemsPerPage);

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages: number[] = [];
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

  const handleViewDetails = (postId: number) => {
    router.push(`/blog/${postId}`);
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumb Header */}
      <BreadcrumbHeader
        title="Blogs"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blogs", href: "/blogs" },
        ]}
      />

      <div className="container mx-auto py-[96px] px-6">
        {paginatedPosts.length > 0 ? (
          <>
            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  image={post.image}
                  date={post.date}
                  title={post.title}
                  onViewDetails={() => handleViewDetails(post.id)}
                />
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
                      {pageNumbers[0] > 2 && <span className="px-2 text-gray-400">...</span>}
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
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={20} className="text-gray-600" />
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-500 py-10">No blog posts found.</p>
        )}
      </div>
    </div>
  );
}
