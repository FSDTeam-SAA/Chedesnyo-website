"use client";
import React from "react";
import { CheckCircle, Star, Zap } from "lucide-react";
import { BreadcrumbHeader } from "@/components/ReusableCard/SubHero";

function ProfilePromotion() {
  return (
    <div className="min-h-screen">
      {/* Breadcrumb Header */}
      <BreadcrumbHeader
        title="Profile Promotion Explanation"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Profile Promotion Explanation", href: "/profile_promotion" },
        ]}
      />
      <div className="container mx-auto px-10 py-[96px]">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Promote Your Profile, Assignment, or Course
          </h1>
          <p className="text-gray-600 text-sm">
            Get More Visibility - Stand Out and Succeed!
          </p>
        </div>

        <div className="space-y-6">
          {/* What Can You Promote */}
          <div className="border border-gray-300 rounded-lg p-6 bg-white">
            <div className="flex items-start gap-3 mb-4">
              <CheckCircle
                className="text-red-500 mt-0.5 flex-shrink-0"
                size={20}
              />
              <h2 className="text-lg font-semibold text-gray-900">
                What Can You Promote?
              </h2>
            </div>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex gap-3">
                <span className="text-gray-900">•</span>
                <span>
                  <span className="font-medium">Freelancer profiles</span> -
                  Great for newcomers or those wanting more page.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-900">•</span>
                <span>
                  <span className="font-medium">Company pages</span> - Build
                  trust presence and attract freelancers.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-900">•</span>
                <span>
                  <span className="font-medium">Assignments</span> - Get more
                  bids and better proposals.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-900">•</span>
                <span>
                  <span className="font-medium">Courses</span> - Promote your
                  sales training to the right audience.
                </span>
              </li>
            </ul>
          </div>

          {/* What Does Promotion Include */}
          <div className="border border-gray-300 rounded-lg p-6 bg-white">
            <div className="flex items-start gap-3 mb-4">
              <Star
                className="text-yellow-500 mt-0.5 flex-shrink-0"
                size={20}
              />
              <h2 className="text-lg font-semibold text-gray-900">
                What Does Promotion Include?
              </h2>
            </div>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex gap-3">
                <span className="text-gray-900">•</span>
                <span>
                  <span className="font-medium">
                    Top placement in search results
                  </span>
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-900">•</span>
                <span>
                  <span className="font-medium">A Promoted label</span> for
                  visibility and attention.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-900">•</span>
                <span>
                  <span className="font-medium">
                    Coming soon: Featured spots on homepage
                  </span>{" "}
                  and recommended content.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-900">•</span>
                <span>
                  You can choose from daily, weekly, or monthly promotion
                  packages.
                </span>
              </li>
            </ul>
          </div>

          {/* Why Promote */}
          <div className="border border-gray-300 rounded-lg p-6 bg-white">
            <div className="flex items-start gap-3 mb-4">
              <Zap className="text-blue-500 mt-0.5 flex-shrink-0" size={20} />
              <h2 className="text-lg font-semibold text-gray-900">
                Why Promote?
              </h2>
            </div>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex gap-3">
                <span className="text-gray-900">•</span>
                <span>More Responses to your assignments</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-900">•</span>
                <span>Increased visibility and profile views</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-900">•</span>
                <span>Increased course views and sales</span>
              </li>
            </ul>
          </div>

          {/* Visibility Banner */}
          <div className="bg-green-100 border border-green-300 rounded-lg p-6 text-center">
            <p className="text-green-900 text-sm font-medium">
              Visibility = Opportunity. Promote Now, and Increase Your Quote
              Factor!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePromotion;
