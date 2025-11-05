"use client";

import React from "react";
import { MessageCircle, Phone, Star, MapPin, Copy } from "lucide-react";
import Image from "next/image";
import { BreadcrumbHeader } from "@/components/ReusableCard/SubHero";
import CustomerReviews from "@/components/share/CustomerReviews";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

type FreelancerUser = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
  businessName: string;
  location: string;
  verified: boolean;
};

function ExploreFreelancersDetails() {
  const params = useParams();
  const freelancerId = params?.id;

  const { data, isLoading, error } = useQuery({
    queryKey: ["freelancerDetails", freelancerId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/${freelancerId}`
      );
      if (!res.ok) throw new Error("Failed to fetch freelancer details");
      const json = await res.json();
      return json.data.user as FreelancerUser;
    },
    enabled: !!freelancerId,
  });

  if (isLoading)
    return <div className="min-h-screen flex items-center justify-center text-gray-700">Loading...</div>;
  if (error)
    return <div className="min-h-screen flex items-center justify-center text-red-500">Something went wrong!</div>;

  const handleContactClick = () => {
    if (!data?.email) return;
    // Copy email to clipboard
    navigator.clipboard.writeText(data.email);
    // Open mail client in new tab
    window.open(`mailto:${data.email}`, "_blank");
    alert(`Email copied to clipboard: ${data.email}`);
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumb Header */}
      <BreadcrumbHeader
        title="Freelancer Details"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Freelancer Details", href: "/assignments" },
        ]}
      />

      <div className="py-12 sm:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            {/* Left Section - Image */}
            <div className="w-full lg:w-1/3 flex-shrink-0 h-[350px] sm:h-[400px] md:h-[500px] lg:h-[550px] border rounded-lg overflow-hidden shadow-sm">
              <Image
                width={400}
                height={400}
                src={data?.profileImage || "/images/freelancersImage.jpg"}
                alt={`${data?.firstName} ${data?.lastName}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Section - Details */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                {/* Name */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {data?.firstName} {data?.lastName}{" "}
                  {data?.verified && (
                    <span className="inline-block ml-2 text-green-600 font-semibold text-sm">
                      Verified
                    </span>
                  )}
                </h1>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {data?.businessName && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      {data.businessName}
                    </span>
                  )}
                  {data?.location && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      {data.location}
                    </span>
                  )}
                </div>

                {/* Rating & Location */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 text-gray-600 mb-6">
                  <div className="flex items-center gap-1.5">
                    <Star size={18} className="fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-900">--</span>
                    <span className="text-sm">(0 reviews)</span>
                  </div>
                  {data?.location && (
                    <div className="flex items-center gap-1.5 mt-2 sm:mt-0">
                      <MapPin size={16} />
                      <span className="text-sm">{data.location}</span>
                    </div>
                  )}
                </div>

                {/* Email Badge */}
<div className="mb-6">
  <h3 className="text-sm text-gray-500 mb-1">Email:</h3>
  <span
    onClick={handleContactClick}
    className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer"
  >
    {data?.email}
  </span>
</div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-full transition flex items-center justify-center gap-2">
                    <MessageCircle size={18} />
                    Chat
                  </button>
                  <button
                    onClick={handleContactClick}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-full transition flex items-center justify-center gap-2"
                  >
                    <Phone size={18} />
                    Contact
                    <Copy size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="px-4 md:px-6 lg:px-8 mt-12">
          <CustomerReviews />
        </div>
      </div>
    </div>
  );
}

export default ExploreFreelancersDetails;
