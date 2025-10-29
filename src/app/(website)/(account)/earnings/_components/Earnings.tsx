"use client";
import { BreadcrumbHeader } from "@/components/ReusableCard/SubHero";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

// ✅ Define type for your API data
type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
};

type Course = {
  _id: string;
  title: string;
  price: number;
  discount: number;
  status: string;
};

type Earning = {
  _id: string;
  user: User;
  course: Course;
  amount: number;
  currency: string;
  paymentMethod: string;
  status: string;
  userFree: number;
  adminFree: number;
  paymentDate: string;
};

type ApiResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  meta: {
    total: number;
    page: number;
    limit: number;
  };
  data: Earning[];
};

function Earnings() {
  const { data: session } = useSession();
    const TOKEN = session?.user?.accessToken || "";
  
  // ✅ Fetch data with proper return and type
  const { data: earningsData, isLoading, isError } = useQuery<ApiResponse>({
    queryKey: ["earnings"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/payment/seller/payments`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch earnings data");
      }

      return res.json();
    },
  });

  return (
    <div>
      {/* Breadcrumb Header */}
      <BreadcrumbHeader
        title="Earnings"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Earnings", href: "/earnings" },
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
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-8 text-center text-sm text-gray-500"
                    >
                      Loading earnings...
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-8 text-center text-sm text-red-500"
                    >
                      Failed to load data.
                    </td>
                  </tr>
                ) : earningsData?.data && earningsData.data.length > 0 ? (
                  earningsData.data.map((item) => (
                    <tr
                      key={item._id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="px-4 py-3 text-sm text-gray-900 flex items-center gap-2">
                        <Image
                          width={400}
                          height={400}
                          src={item.user.profileImage}
                          alt={item.user.firstName}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <div className="font-medium">
                            {item.user.firstName} {item.user.lastName}
                          </div>
                          <div className="text-xs text-gray-500">
                            {item.user.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        ${item.adminFree.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        ${item.userFree.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {new Date(item.paymentDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-8 text-center text-sm text-gray-500"
                    >
                      No earnings from referred freelancers.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Earnings;
