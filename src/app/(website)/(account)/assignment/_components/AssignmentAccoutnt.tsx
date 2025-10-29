"use client";
import React from "react";
import { Edit2, Trash2, Plus } from "lucide-react";
import { BreadcrumbHeader } from "@/components/ReusableCard/SubHero";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

// ✅ Define TypeScript types based on your API response
type Assignment = {
  _id: string;
  banner: string;
  title: string;
  description: string;
  budget: string;
  priceType: string;
  paymentMethod: string;
  deadLine: string;
  user: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  uploadFile: string;
  __v: number;
};

type AssignmentResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  meta: {
    total: number;
    page: number;
    limit: number;
  };
  data: Assignment[];
};

function CourseAccount() {
  const { data, isLoading, isError } = useQuery<AssignmentResponse>({
    queryKey: ["assignments"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/assigment`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json() as Promise<AssignmentResponse>;
    },
  });

  return (
    <div>
      {/* Breadcrumb Header */}
      <BreadcrumbHeader
        title="Assignments"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Assignments", href: "/assignment" },
        ]}
      />

      <div className="w-full px-6 container mx-auto py-[96px]">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Assignments</h1>
        </div>

        <div className="mb-6 flex justify-end">
          <Link href="/post_an_assignment">
            <button className="flex items-center gap-2 bg-[#008000] text-white px-4 py-2 rounded-lg hover:bg-[#095509] transition-colors font-medium">
              <Plus size={20} />
              Post An Assignment
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
                  Deadline
                </th>
                <th className="pr-10 py-4 text-end text-sm font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-6 text-gray-500 text-sm"
                  >
                    Loading assignments...
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-6 text-red-500 text-sm"
                  >
                    Failed to load assignments.
                  </td>
                </tr>
              ) : data?.data?.length ? (
                data.data.map((assignment, index) => (
                  <tr
                    key={assignment._id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {assignment.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {new Date(assignment.deadLine).toLocaleDateString()}
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
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-6 text-gray-500 text-sm"
                  >
                    No assignments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CourseAccount;
