"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BreadcrumbHeader } from "@/components/ReusableCard/SubHero";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

function MyOrders() {
  const [activeTab, setActiveTab] = useState("in-progress");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const session = useSession();
  const TOKEN = session.data?.user?.accessToken || "";
  const queryClient = useQueryClient();

  // ✅ Fetch orders
  const { data: ordersData, isLoading } = useQuery({
    queryKey: ["my-orders"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/payment/my/all`,
        {
          headers: { Authorization: `Bearer ${TOKEN}` },
        }
      );
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json() as Promise<any>;
    },
  });

  // ✅ Approve status mutation
  const { mutate: updateStatus } = useMutation({
    mutationFn: async ({ orderId, newStatus }: { orderId: string; newStatus: string }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/payment/assasment/approve/${orderId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (!res.ok) throw new Error("Failed to update status");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Order status updated!");
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
    },
    onError: () => {
      toast.error("Failed to update status");
    },
  });

  // ✅ Reject status mutation
  const { mutate: updateStatusRejected } = useMutation({
    mutationFn: async ({ orderId, newStatus }: { orderId: string; newStatus: string }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/payment/assasment/reject/${orderId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (!res.ok) throw new Error("Failed to update status");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Order status updated!");
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
    },
    onError: () => {
      toast.error("Failed to update status");
    },
  });

  // ✅ Filter ONLY assignment orders
  const filterOrders = () => {
    if (!ordersData?.data) return [];
    const orders = ordersData.data.filter((order: any) => order.assigment);
    if (activeTab === "in-progress")
      return orders.filter((order: any) => order.status === "pending" || order.status === "processing");
    if (activeTab === "completed") return orders.filter((order: any) => order.status === "approved");
    if (activeTab === "cancelled")
      return orders.filter((order: any) => order.status === "refunded" || order.status === "cancelled");
    return orders;
  };

  const filteredOrders = filterOrders();
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700 rounded-full px-3 py-1 text-xs font-medium";
      case "pending":
      case "processing":
        return "bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-xs font-medium";
      case "refunded":
      case "cancelled":
        return "bg-red-100 text-red-700 rounded-full px-3 py-1 text-xs font-medium";
      default:
        return "bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-xs font-medium";
    }
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page);
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    if (newStatus === "approved") updateStatus({ orderId, newStatus });
    if (newStatus === "rejected") updateStatusRejected({ orderId, newStatus });
  };

  return (
    <div className="w-full">
      <BreadcrumbHeader
        title="My Orders History"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "My Orders History", href: "/my-orders" },
        ]}
      />

      <div className="max-w-6xl mx-auto py-[96px]">
        <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">My Assignment Orders</h1>

        {/* 🔥 Tabs */}
        <div className="flex gap-3 mb-6">
          {[
            { key: "in-progress", label: "In Progress" },
            { key: "completed", label: "Completed" },
            { key: "cancelled", label: "Cancelled" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 text-sm font-medium rounded border ${
                activeTab === tab.key
                  ? "bg-green-50 border-green-600 text-green-600"
                  : "bg-white border-green-600 text-green-600 hover:bg-green-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ✅ Orders Table */}
        <div className="border border-gray-300 rounded-lg overflow-hidden mb-6">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-300">
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Assignment</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Budget</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Date</th>
                <th className="py-3 pr-16 text-sm font-medium text-gray-900 text-end">Action</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : displayedOrders.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-gray-500">
                    No assignment orders found.
                  </td>
                </tr>
              ) : (
                displayedOrders.map((order: any) => {
                  const asg = order.assigment;
                  return (
                    <tr
                      key={order._id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900">{asg?.title || "--"}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{asg?.budget ? `$${asg.budget}` : "--"}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm flex justify-end items-center gap-2">
                        <span className={getStatusStyle(order.status)}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>

                        {order.status === "pending" && (
                          <select
                            className="ml-2 border border-gray-300 rounded px-2 py-1 text-sm text-gray-700 hover:bg-gray-50"
                            defaultValue=""
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          >
                            <option value="" disabled>
                              Select
                            </option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* ✅ Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-600">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredOrders.length)} of{" "}
            {filteredOrders.length} results
          </p>

          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`w-8 h-8 rounded text-sm font-medium ${
                  currentPage === i + 1
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "border border-gray-300 text-gray-900 hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyOrders;
