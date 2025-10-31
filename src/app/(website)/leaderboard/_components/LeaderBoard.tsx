"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BreadcrumbHeader } from "@/components/ReusableCard/SubHero";
import { useQuery } from "@tanstack/react-query";

// ✅ Type for a leaderboard item
type LeaderboardItem = {
  userId: string;
  totalSales: number;
  avgRating: number;
  user: {
    firstName?: string;
    email?: string;
    profileImage?: string;
    industry?: string;
    lastName?: string;
  } | null;
};

// ✅ Type for API response
type LeaderboardApiResponse = {
  success: boolean;
  message: string;
  data: {
    meta: {
      total: number;
      page: number;
      limit: number;
    };
    data: LeaderboardItem[];
  };
};

function LeaderBoard() {
  const [timeframe, setTimeframe] = useState("yearly");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // ✅ Fetch leaderboard data from API
  const { data: leaderboardData, error, isLoading, refetch } = useQuery<LeaderboardApiResponse>({
    queryKey: ["leaderboardData", timeframe, currentPage],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/leaderboard?timeframe=${timeframe}&page=${currentPage}&limit=${itemsPerPage}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch leaderboard data");
      return res.json();
    },
  });

  const leaderboardItems = leaderboardData?.data?.data || [];
  const totalPages = Math.ceil((leaderboardData?.data?.meta?.total || 0) / itemsPerPage);

  // Refetch on timeframe change
  useEffect(() => {
    setCurrentPage(1);
    refetch();
  }, [timeframe, refetch]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getInitial = (name: any) => (name ? name.charAt(0).toUpperCase() : "?");

  const getAvatarColor = (id: number) => {
    const colors = [
      "bg-blue-500",
      "bg-purple-500",
      "bg-yellow-500",
      "bg-pink-500",
      "bg-blue-400",
      "bg-orange-500",
      "bg-yellow-600",
      "bg-red-500",
      "bg-orange-600",
      "bg-green-500",
    ];
    return colors[id % colors.length];
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Failed to load leaderboard
      </div>
    );

  return (
    <div className="min-h-screen">
      {/* Breadcrumb Header */}
      <BreadcrumbHeader
        title="LeaderBoard"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "LeaderBoard", href: "/leaderboard" },
        ]}
      />

      <div className="container mx-auto py-[96px]">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Top Sales Professionals</h1>

          {/* Timeframe Buttons */}
          <div className="flex justify-center gap-4">
            {["yearly", "monthly", "weekly"].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  timeframe === tf
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400"
                }`}
              >
                {tf.charAt(0).toUpperCase() + tf.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Leaderboard List */}
        <div className="space-y-3 mb-8">
          {leaderboardItems.map((professional, index: number) => (
            <div
              key={professional.userId || index}
              className="bg-black rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4 flex-1">
                {/* Avatar */}
                <div
                  className={`w-12 h-12 rounded-full ${getAvatarColor(index)} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}
                >
                  {getInitial(professional.user?.firstName || "U")}
                </div>

                {/* Name and Email */}
                <div>
                  <p className="text-white font-semibold">
                    {professional.user?.firstName || "Unknown User"}{" "}
                    {professional.user?.lastName || ""}
                  </p>
                  <p className="text-gray-400 text-sm">{professional.user?.email || "N/A"}</p>
                </div>
              </div>

              {/* Sales Info */}
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="text-gray-400 text-xs">Total Sales: </p>
                  <p className="text-white font-semibold">{professional.totalSales}</p>
                  <p className="text-gray-400 text-xs">Ratings: </p>
                </div>

                {/* Rating Badge */}
                <div className="bg-orange-500 text-white font-bold px-3 py-1 rounded-full text-sm">
                  {professional.avgRating || 0}
                </div>
              </div>
            </div>
          ))}
          {leaderboardItems.length === 0 && (
            <p className="text-center text-gray-500 py-10">No data available for {timeframe}</p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`w-8 h-8 rounded font-medium transition-all ${
                    currentPage === num
                      ? "bg-gray-300 text-gray-900"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {num.toString().padStart(2, "0")}
                </button>
              ))}
              {totalPages > 5 && <span className="text-gray-400">...</span>}
              {totalPages > 5 && (
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className="w-8 h-8 rounded font-medium text-gray-400 hover:text-gray-600"
                >
                  {totalPages.toString().padStart(2, "0")}
                </button>
              )}
            </div>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LeaderBoard;
