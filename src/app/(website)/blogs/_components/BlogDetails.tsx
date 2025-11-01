"use client";

import React from "react";
import { Heart, Share2, Bookmark } from "lucide-react";
import Image from "next/image";
import { BreadcrumbHeader } from "@/components/ReusableCard/SubHero";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

type BlogDetail = {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
};

type BlogApiResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  data: BlogDetail;
};

function BlogDetailPage() {
  const params = useParams();
  const { id } = params;

  const { data, error, isLoading } = useQuery<BlogApiResponse>({
    queryKey: ["singleBlogData", id],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/blog/${id}`);
      if (!res.ok) throw new Error("Failed to fetch blog details");
      return res.json();
    },
    enabled: !!id,
  });

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">Failed to load blog</div>;

  const blog = data?.data;

  if (!blog) return <div className="min-h-screen flex items-center justify-center text-gray-500">No blog found</div>;

  return (
    <div className="min-h-screen">
      {/* Breadcrumb Header */}
      <BreadcrumbHeader
        title="Blogs Details"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blogs Details", href: "/blogs" },
        ]}
      />

      <div className="container mx-auto px-6 lg:py-12">
        {/* Featured Image */}
        <div className="mb-8 rounded-lg overflow-hidden">
          <Image
            width={600}
            height={600}
            src={blog.thumbnail}
            alt={blog.title}
            className="w-full h-96 object-cover"
          />
        </div>

        {/* Meta Information */}
        <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">By</span>
            <span className="font-semibold text-gray-900">Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Date</span>
            <span className="font-semibold text-gray-900">
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "2-digit",
              })}
            </span>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Heart size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Share2 size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Bookmark size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Blog Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-8 leading-tight">
          {blog.title}
        </h1>

        {/* Blog Content */}
        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <p className="text-base leading-relaxed">{blog.description}</p>
        </div>

        {/* Tags Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-3">Tags:</p>
          <div className="flex flex-wrap gap-2">
            <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition-colors">
              #Blog
            </span>
            <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition-colors">
              #Design
            </span>
            <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition-colors">
              #Technology
            </span>
            <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition-colors">
              #Insights
            </span>
          </div>
        </div>

        {/* Author Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center gap-4">
            <Image
              width={500}
              height={500}
              src="/images/blogDetailsImage.jpg"
              alt="Author"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="font-bold text-gray-900">Admin</h3>
              <p className="text-sm text-gray-600">
                Experienced writer and content creator passionate about sharing insights and knowledge with readers worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetailPage;
