"use client";
import { BreadcrumbHeader } from "@/components/ReusableCard/SubHero";
import React from "react";

function Earnings() {
  return (
    <div>
      {/* Breadcrumb Header */}
      <BreadcrumbHeader
        title="Earnings"
        breadcrumbs={[
          { label: "Home", href: "/" },
          {
            label: "Earnings",
            href: "/earnings",
          },
        ]}
      />
      <div className="container mx-auto px-10 py-[96px]">
        {/* Earnings from Referred Freelancers */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 p-4 border-b border-gray-200">
            <div className="w-4 h-4 bg-amber-700 rounded-sm"></div>
            <h2 className="text-base font-semibold text-gray-900">
              Earnings from Referred Freelancers
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Referred Freelancer
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Platform Profit
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Your Earning
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-8 text-center text-sm text-gray-500"
                  >
                    No earnings from referred freelancers.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Earnings from Referred Businesses */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 p-4 border-b border-gray-200">
            <div className="w-4 h-4 bg-amber-700 rounded-sm"></div>
            <h2 className="text-base font-semibold text-gray-900">
              Earnings from Referred Businesses
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Referred Business
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Platform Profit
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Your Earning
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-8 text-center text-sm text-gray-500"
                  >
                    No earnings from referred businesses.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Earnings;
