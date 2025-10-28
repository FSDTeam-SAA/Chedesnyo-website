"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import AssignmentCard from "@/components/ReusableCard/AssignmentCard";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

type Assignment = {
  _id: string;
  banner: string;
  title: string;
  budget: string;
  priceType: string;
  paymentMethod: string;
  status: string;
};

export default function LatestAssignments() {
  // Fetch assignments from your API
  const { data, isLoading, isError } = useQuery({
    queryKey: ["assignments"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/assigment`);
      if (!res.ok) throw new Error("Failed to fetch assignments");
      return res.json();
    },
  });

  const assignments: Assignment[] = data?.data || [];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <p className="text-gray-500 text-sm font-semibold mb-2">
              ASSIGNMENTS
            </p>
            <h2 className="text-4xl font-bold text-gray-900">
              Latest Assignments
            </h2>
          </div>
          <Link
            href="/assignments"
            className="text-green-600 font-semibold flex items-center gap-1 hover:text-green-700 transition-colors"
          >
            See All <ChevronRight size={20} />
          </Link>
        </div>

        {/* Loading State */}
        {isLoading && (
          <p className="text-center text-gray-500 text-lg">Loading assignments...</p>
        )}

        {/* Error State */}
        {isError && (
          <p className="text-center text-red-500 text-lg">
            Failed to load assignments.
          </p>
        )}

        {/* Cards Grid */}
        {!isLoading && !isError && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {assignments.slice(0, 6).map((assignment) => (
              <AssignmentCard
                key={assignment._id}
                image={assignment.banner}
                category={assignment.paymentMethod.toUpperCase()}
                title={assignment.title}
                type={assignment.status}
                paymentType={assignment.priceType}
                paymentAmount={`$${assignment.budget}`}
                applications={0}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
