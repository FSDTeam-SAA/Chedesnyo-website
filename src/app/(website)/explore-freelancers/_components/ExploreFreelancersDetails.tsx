import React from "react";
import { MessageCircle, Phone, Star, MapPin } from "lucide-react";
import Image from "next/image";
import { BreadcrumbHeader } from "@/components/ReusableCard/SubHero";
import CustomerReviews from "@/components/share/CustomerReviews";

// ✅ Define TypeScript type for Freelancer Details
type FreelancerDetails = {
  id: number;
  name: string;
  image: string;
  title: string;
  category: string;
  rating: number;
  reviewCount: number;
  location: string;
  overviewText: string;
  specialties: string;
  achievements: string;
};

// ✅ Sample freelancer details data (all texts styled like overviewText)
const freelancerDetails: FreelancerDetails = {
  id: 1,
  name: "Jane Cooper",
  image: "/images/freelancersImage.jpg",
  title: "Senior Freelancer",
  category: "Information Technology",
  rating: 4.8,
  reviewCount: 125,
  location: "San Francisco, USA",
  overviewText:
    "I have been working in freelancing for 10+ years, specializing in UX/UI design and full-stack development. I've successfully completed 500+ projects for clients ranging from startups to Fortune 500 companies. My expertise spans across modern web technologies, mobile app development, and strategic project management.",
  specialties:
    "I specialize in UX/UI design, full-stack development (React, Node.js), mobile app development, and creating seamless user experiences. My approach combines modern design systems with performance optimization to deliver visually appealing and functional digital products.",
  achievements:
    "Over the last decade, I have successfully completed more than 500 global projects, collaborated with Fortune 500 companies, and maintained a 98% client satisfaction rate. I was recognized as a Top-Rated Freelancer in 2023 for consistent performance and excellence.",
};

function ExploreFreelancersDetails() {
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

      <div className=" bg-[#FEFAEF]">
        <div className="container mx-auto px-6 py-[96px]">
          {/* Main Container */}
          <div className="overflow-hidden">
            <div className="flex flex-col md:flex-row gap-10 md:gap-16">
              {/* Left Section - Image */}
              <div className="w-full md:w-[40%] h-[400px] md:h-[600px]">
                <Image
                  width={400}
                  height={400}
                  src={freelancerDetails.image}
                  alt={freelancerDetails.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Right Section - Details */}
              <div className="flex-1">
                {/* Header - Name and Title */}
                <div className="mb-6">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {freelancerDetails.name}
                  </h1>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      {freelancerDetails.title}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      {freelancerDetails.category}
                    </span>
                  </div>

                  {/* Rating and Location */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5">
                        <Star
                          size={18}
                          className="fill-yellow-400 text-yellow-400"
                        />
                        <span className="font-bold text-gray-900">
                          {freelancerDetails.rating.toFixed(1)}
                        </span>
                        <span className="text-gray-500 text-sm">
                          ({freelancerDetails.reviewCount} reviews)
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <MapPin size={16} />
                      <span className="text-sm">
                        {freelancerDetails.location}
                      </span>
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

                {/* Overview, Specialties & Achievements */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Overview & Experience:
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {freelancerDetails.overviewText}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Specialties:
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {freelancerDetails.specialties}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Achievements:
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {freelancerDetails.achievements}
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

export default ExploreFreelancersDetails;
