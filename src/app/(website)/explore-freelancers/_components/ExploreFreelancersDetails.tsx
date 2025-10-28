"use client";

import React from "react";
import { MessageCircle, Phone, Star, MapPin } from "lucide-react";
import Image from "next/image";
import { BreadcrumbHeader } from "@/components/ReusableCard/SubHero";
import CustomerReviews from "@/components/share/CustomerReviews";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

// ✅ Type for API user data
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

// Component
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
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Something went wrong!
      </div>
    );

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

      <div className="bg-[#FEFAEF]">
        <div className="container mx-auto px-6 py-[96px]">
          <div className="overflow-hidden">
            <div className="flex flex-col md:flex-row gap-10 md:gap-16">
              {/* Left Section - Image */}
              <div className="w-full md:w-[40%] h-[400px] md:h-[600px] border">
                <Image
                  width={400}
                  height={400}
                  src={data?.profileImage || "/images/freelancersImage.jpg"}
                  alt={`${data?.firstName} ${data?.lastName}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Right Section - Details */}
              <div className="flex-1">
                {/* Header - Name and Badges */}
                <div className="mb-6">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {data?.firstName} {data?.lastName}
                  </h1>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      {data?.businessName}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      {data?.location}
                    </span>
                  </div>

                  {/* Dummy Rating and Location (optional) */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5">
                        <Star size={18} className="fill-yellow-400 text-yellow-400" />
                        <span className="font-bold text-gray-900">--</span>
                        <span className="text-gray-500 text-sm">(0 reviews)</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <MapPin size={16} />
                      <span className="text-sm">{data?.location}</span>
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

export default ExploreFreelancersDetails;
