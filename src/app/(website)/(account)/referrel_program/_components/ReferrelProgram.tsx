"use client";
import React from "react";
import { Gift, TrendingUp, BarChart3 } from "lucide-react";
import { BreadcrumbHeader } from "@/components/ReusableCard/SubHero";

function ReferralProgram() {
  return (
    <div className="min-h-screen">
      {/* Breadcrumb Header */}
      <BreadcrumbHeader
        title="Upload New Course"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Upload New Course", href: "/upload_new_course" },
        ]}
      />
      <div className="container mx-auto py-[96px] px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Referral Program – Earn Money by Sharing
          </h1>
          <p className="text-gray-600 text-base">
            Help others find jobs or sales talent – and earn alongside them!
          </p>
        </div>

        <div className="space-y-6">
          {/* How Does It Work */}
          <div className="border border-gray-300 rounded-lg p-6 bg-white">
            <div className="flex items-start gap-3 mb-4">
              <Gift className="text-gray-700 mt-1" size={20} />
              <h2 className="text-lg font-semibold text-gray-900">
                How Does It Work?
              </h2>
            </div>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex gap-3">
                <span className="text-gray-900">•</span>
                <span>Every user gets a unique referral link or code.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-900">•</span>
                <span>
                  Share it with others — like skilled freelance sales agents or
                  companies looking for help.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-900">•</span>
                <span>
                  When someone signs up and completes a deal via your link, you
                  earn commission.
                </span>
              </li>
            </ul>
          </div>

          {/* How Much Do You Earn */}
          <div className="border border-gray-300 rounded-lg p-6 bg-white">
            <div className="flex items-start gap-3 mb-4">
              <TrendingUp className="text-gray-700 mt-1" size={20} />
              <h2 className="text-lg font-semibold text-gray-900">
                How Much Do You Earn?
              </h2>
            </div>
            <div className="space-y-3">
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex gap-3">
                  <span className="text-gray-900">•</span>
                  <span>
                    DealClosed charges 15% commission per completed deal.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gray-900">•</span>
                  <span>
                    You earn 20% of that 15% — every time your referral gets
                    paid.
                  </span>
                </li>
              </ul>

              {/* Example Box */}
              <div className="bg-gray-100 p-4 rounded-lg mt-4 space-y-2">
                <p className="font-semibold text-gray-900 text-sm">Example:</p>
                <div className="space-y-1 text-sm text-gray-700">
                  <p>
                    A freelancer earns{" "}
                    <span className="font-semibold">€1000</span>
                  </p>
                  <p>
                    DealClosed takes{" "}
                    <span className="font-semibold">€150 (15%)</span>
                  </p>
                  <p>
                    You earn{" "}
                    <span className="font-semibold">€30 (20% of €150)</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Your Personal Referral Dashboard */}
          <div className="border border-gray-300 rounded-lg p-6 bg-white">
            <div className="flex items-start gap-3 mb-4">
              <BarChart3 className="text-gray-700 mt-1" size={20} />
              <h2 className="text-lg font-semibold text-gray-900">
                Your Personal Referral Dashboard
              </h2>
            </div>
            <div>
              <p className="text-gray-700 text-sm mb-3">
                On your referral page, you can see:
              </p>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex gap-3">
                  <span className="text-gray-900">•</span>
                  <span>Number of successful referrals</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gray-900">•</span>
                  <span>Total earned commission</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gray-900">•</span>
                  <span>Copy button to share your unique referral link</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gray-900">•</span>
                  <span>
                    Coming soon: Direct sharing via email or social platforms
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Tip Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p className="text-blue-900 text-sm">
              <span className="font-semibold">Tip:</span> There&apos;s No Limit
              To How Many People You Can Refer. The More You Share, The More You
              Earn — Even Passively!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReferralProgram;
