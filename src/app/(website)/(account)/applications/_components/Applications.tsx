"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { BreadcrumbHeader } from "@/components/ReusableCard/SubHero";

function Applications() {
  const [applications] = useState([
    {
      id: 1,
      title: "Web application development",
      assignmentType: "Test Assignment",
      budget: "Budget: €",
      bidAmount: "Bid Amount: €",
      bidDeadline: "Bid Deadline: 08 Oct 2025, 05:05",
    },
  ]);

  return (
    <div className="">
      {/* Breadcrumb Header */}
      <BreadcrumbHeader
        title="Applications"
        breadcrumbs={[
          { label: "Home", href: "/" },
          {
            label: "Applications",
            href: "/application",
          },
        ]}
      />
      <div className="container mx-auto px-10 py-[96px]">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Applications
        </h1>

        {/* Applications List */}
        <div className="space-y-4">
          {applications.map((application) => (
            <Card
              key={application.id}
              className="border border-gray-300 rounded-lg p-6 bg-white hover:shadow-md transition-shadow"
            >
              <div className="space-y-2">
                {/* Title */}
                <h2 className="text-base font-semibold text-gray-900">
                  {application.title}
                </h2>

                {/* Assignment Type */}
                <p className="text-sm text-gray-700">
                  {application.assignmentType}
                </p>

                {/* Budget */}
                <p className="text-sm text-gray-700">{application.budget}</p>

                {/* Bid Amount */}
                <p className="text-sm text-gray-700">{application.bidAmount}</p>

                {/* Bid Deadline */}
                <p className="text-sm text-gray-600">
                  {application.bidDeadline}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State Message (if needed) */}
        {applications.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No applications yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Applications;
