/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { MessageCircle, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import { BreadcrumbHeader } from "@/components/ReusableCard/SubHero";
import CustomerReviews from "@/components/share/CustomerReviews";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

// ✅ Type for API User
type FreelancerUser = {
  _id: string;
  firstName: string;
  lastName?: string;
  email: string;
  profileImage?: string;
  businessName?: string;
  location?: string;
  role: string;
  verified?: boolean;
  industry?: string;
  kvkVatNumber?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
};

// ✅ API Response type
type ApiResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    user: FreelancerUser;
    assigments: any[];
    courses: any[];
  };
};

function FindBusinessDetails() {
  const params = useParams();
  const freelancerId = params?.id;

  const { data, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ["businessDetails", freelancerId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/${freelancerId}`
      );
      if (!res.ok) throw new Error("Failed to fetch freelancer details");
      return res.json();
    },
    enabled: !!freelancerId,
  });

  const user = data?.data.user;

  if (isLoading)
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Something went wrong!
      </div>
    );

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        User not found.
      </div>
    );

  return (
    <div className="min-h-screen">
      {/* Breadcrumb Header */}
      <BreadcrumbHeader
        title="Business Details"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Business Details", href: "/find-business" },
        ]}
      />

      <div className="bg-[#FEFAEF]">
        <div className="container mx-auto px-6 py-[96px]">
          {/* Main Container */}
          <div className="overflow-hidden">
            <div className="flex flex-col md:flex-row gap-10 md:gap-16">
              {/* Left Section - Image */}
              <div className="w-full md:w-[40%] h-[400px] md:h-[600px]">
                <Image
                  width={400}
                  height={400}
                  src={user.profileImage || "/images/businessImage.jpg"}
                  alt={user.businessName || user.firstName}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Right Section - Details */}
              <div className="flex-1">
                {/* Header - Name and Title */}
                <div className="mb-6">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {user.businessName || `${user.firstName} ${user.lastName || ""}`}
                  </h1>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      {user.role}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      {user.industry || "N/A"}
                    </span>
                  </div>

                  {/* Rating and Location */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <MapPin size={16} />
                      <span className="text-sm">{user.location || "N/A"}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mb-6">
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-4 rounded-full transition-colors flex items-center justify-center gap-2">
                    <MessageCircle size={18} />
                    Chat
                  </button>
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-4 rounded-full transition-colors flex items-center justify-center gap-2">
                    <Phone size={18} />
                    Contact
                  </button>
                </div>

                {/* Overview */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Overview:</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {user.businessName
                        ? `${user.businessName} is a verified business located in ${user.location || "N/A"}.`
                        : `Freelancer ${user.firstName} ${user.lastName || ""} is a verified professional.`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <CustomerReviews />
        </div>
      </div>
    </div>
  );
}

export default FindBusinessDetails;
