"use client";
import React from "react";
import { Edit2, Trash2, Plus } from "lucide-react";
import { BreadcrumbHeader } from "@/components/ReusableCard/SubHero";
import Link from "next/link";

function CourseAccount() {
  const assignments = [
    { id: "01", title: "Web development", date: "25/10/2025" },
    { id: "01", title: "Web development", date: "25/10/2025" },
    { id: "01", title: "Web development", date: "25/10/2025" },
    { id: "01", title: "Web development", date: "25/10/2025" },
    { id: "01", title: "Web development", date: "25/10/2025" },
    { id: "01", title: "Web development", date: "25/10/2025" },
    { id: "01", title: "Web development", date: "25/10/2025" },
  ];

  return (
    <div>
      {/* Breadcrumb Header */}
      <BreadcrumbHeader
        title="My Courses"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "My Courses", href: "/course" },
        ]}
      />
      <div className="w-full px-6 container mx-auto py-[96px]">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
        </div>

        <div className="mb-6 flex justify-end">
          <Link href="/post_an_assignment">
            <button className="flex items-center gap-2 bg-[#008000] text-white px-4 py-2 rounded-lg hover:bg-[#095509] transition-colors font-medium">
              <Plus size={20} />
              Upload New Course
            </button>
          </Link>
        </div>

        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  No
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Assignment Title
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Date
                </th>
                <th className="pr-10 py-4 text-end text-sm font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {assignment.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {assignment.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {assignment.date}
                  </td>
                  <td className="px-6 py-4 text-sm flex items-end justify-end">
                    <div className="flex items-center gap-3">
                      <button
                        className="p-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        className="p-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CourseAccount;
