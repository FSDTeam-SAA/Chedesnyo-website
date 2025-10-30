"use client";

import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  Loader2,
  Calendar,
  DollarSign,
  Briefcase,
  Globe,
  Book,
} from "lucide-react";
import { BreadcrumbHeader } from "@/components/ReusableCard/SubHero";
import { useSession } from "next-auth/react";

export default function AssignmentDetails() {
  const params = useParams();
  const assignmentId = params?.id as string;
  const session = useSession();
    const TOKEN = session.data?.user?.accessToken || "";

  // ✅ Fetch assignment details
  const { data, isLoading, isError } = useQuery({
    queryKey: ["assignmentDetails", assignmentId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/assigment/${assignmentId}`,
        { cache: "no-store" }
      );
      if (!res.ok) throw new Error("Failed to fetch assignment details");
      return res.json();
    },
    enabled: !!assignmentId,
  });

  const assignment = data?.data;

  // ✅ Payment Mutation
  const paymentMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/payment/assasment/${assignmentId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      if (!res.ok) throw new Error("Payment initiation failed");
      return res.json();
    },
    onSuccess: (data) => {
      const url = data?.data?.url;
      if (url) {
        // Redirect to payment URL
        window.location.href = url;
      } else {
        alert("Payment URL not found!");
      }
    },
    onError: (error) => {
      console.error("Payment error:", error);
      alert("Payment initiation failed. Please try again.");
    },
  });

  // ✅ Handle button click
  const handleTakeDeal = () => {
    if (!assignmentId) return;
    paymentMutation.mutate();
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-green-600" size={40} />
      </div>
    );

  if (isError)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Failed to load assignment details.
      </div>
    );

  if (!assignment)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        No assignment data found.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 pb-[96px]">
      <div className="pb-[96px]">
        <BreadcrumbHeader
          title="Assignment Details"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Assignment Details", href: "/assignments" },
          ]}
        />
      </div>
      <div className="container mx-auto bg-white rounded-2xl border border-gray-200">
        {/* Banner Image */}
        <div className="relative h-[400px] w-full">
          <Image
            src={assignment.banner}
            alt={assignment.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
            <h1 className="text-3xl lg:text-4xl font-bold text-white drop-shadow-lg">
              {assignment.title}
            </h1>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-gray-700">
            <div className="flex items-center gap-2">
              <DollarSign className="text-green-600" size={20} />
              <p>
                <span className="font-semibold">Budget:</span> $
                {assignment.budget}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="text-blue-600" size={20} />
              <p>
                <span className="font-semibold">Price Type:</span>{" "}
                {assignment.priceType}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="text-purple-600" size={20} />
              <p>
                <span className="font-semibold">Payment:</span>{" "}
                {assignment.paymentMethod}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="text-orange-600" size={20} />
              <p>
                <span className="font-semibold">Deadline:</span>{" "}
                {new Date(assignment.deadLine).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200" />

          {/* Description */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Description
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {assignment.description}
            </p>
          </div>

          {/* Upload File */}
          {assignment.uploadFile && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Attached File
              </h2>
              <a
                href={assignment.uploadFile}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-green-600 hover:underline font-medium"
              >
                View Uploaded File →
              </a>
            </div>
          )}

          {/* Status + Take Deal Button */}
          <div className="pt-6">
            <span
              className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                assignment.status === "approved"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {assignment.status.toUpperCase()}
            </span>

            {/* ✅ Take This Deal Button */}
            <div className="mt-4">
              <button
                onClick={handleTakeDeal}
                disabled={paymentMutation.isPending}
                className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-70 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                {paymentMutation.isPending ? (
                  <>
                    <Loader2 className="animate-spin" size={20} /> Processing...
                  </>
                ) : (
                  <>
                    <Book size={20} />
                    Take This Deal
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
