"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { BreadcrumbHeader } from "@/components/ReusableCard/SubHero";

function MyOrders() {
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const orders = [
    {
      id: 1,
      name: "Web Development",
      price: "$200.00",
      date: "04/21/2025",
      status: "Approved",
      statusColor: "green",
    },
    {
      id: 2,
      name: "Web Development",
      price: "$200.00",
      date: "04/21/2025",
      status: "Processing",
      statusColor: "purple",
    },
    {
      id: 3,
      name: "Web Development",
      price: "$200.00",
      date: "04/21/2025",
      status: "Processing",
      statusColor: "purple",
    },
    {
      id: 4,
      name: "Web Development",
      price: "$200.00",
      date: "04/21/2025",
      status: "Processing",
      statusColor: "purple",
    },
    {
      id: 5,
      name: "Web Development",
      price: "$200.00",
      date: "04/21/2025",
      status: "Cancelled",
      statusColor: "red",
    },
    {
      id: 6,
      name: "Web Development",
      price: "$200.00",
      date: "04/21/2025",
      status: "Cancelled",
      statusColor: "red",
    },
    {
      id: 7,
      name: "Web Development",
      price: "$200.00",
      date: "04/21/2025",
      status: "Cancelled",
      statusColor: "red",
    },
    {
      id: 8,
      name: "Web Development",
      price: "$200.00",
      date: "04/21/2025",
      status: "Approved",
      statusColor: "green",
    },
    {
      id: 9,
      name: "Web Development",
      price: "$200.00",
      date: "04/21/2025",
      status: "Processing",
      statusColor: "purple",
    },
    {
      id: 10,
      name: "Web Development",
      price: "$200.00",
      date: "04/21/2025",
      status: "Cancelled",
      statusColor: "red",
    },
    {
      id: 11,
      name: "Web Development",
      price: "$200.00",
      date: "04/21/2025",
      status: "Approved",
      statusColor: "green",
    },
    {
      id: 12,
      name: "Web Development",
      price: "$200.00",
      date: "04/21/2025",
      status: "Processing",
      statusColor: "purple",
    },
  ];

  const filterOrders = () => {
    if (activeTab === "all") return orders;
    if (activeTab === "in-progress")
      return orders.filter((order) => order.status === "Processing");
    if (activeTab === "completed")
      return orders.filter((order) => order.status === "Approved");
    if (activeTab === "cancelled")
      return orders.filter((order) => order.status === "Cancelled");
    return orders;
  };

  const filteredOrders = filterOrders();
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedOrders = filteredOrders.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const getStatusStyle = (color: any) => {
    switch (color) {
      case "green":
        return "bg-green-100 text-green-700 rounded-full px-3 py-1 text-xs font-medium";
      case "purple":
        return "bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-xs font-medium";
      case "red":
        return "bg-red-100 text-red-700 rounded-full px-3 py-1 text-xs font-medium";
      default:
        return "bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-xs font-medium";
    }
  };

  const handlePageChange = (page: any) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full">
      {/* Breadcrumb Header */}
      <BreadcrumbHeader
        title="My Orders History"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "My Orders History", href: "/my-orders" },
        ]}
      />
      <div className="max-w-6xl mx-auto py-[96px]">
        <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          My Orders History
        </h1>

        {/* Tab Buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => {
              setActiveTab("in-progress");
              setCurrentPage(1);
            }}
            className={`px-4 py-2 text-sm font-medium rounded border ${
              activeTab === "in-progress"
                ? "bg-green-50 border-green-600 text-green-600"
                : "bg-white border-green-600 text-green-600 hover:bg-green-50"
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => {
              setActiveTab("completed");
              setCurrentPage(1);
            }}
            className={`px-4 py-2 text-sm font-medium rounded border ${
              activeTab === "completed"
                ? "bg-green-50 border-green-600 text-green-600"
                : "bg-white border-green-600 text-green-600 hover:bg-green-50"
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => {
              setActiveTab("cancelled");
              setCurrentPage(1);
            }}
            className={`px-4 py-2 text-sm font-medium rounded border ${
              activeTab === "cancelled"
                ? "bg-green-50 border-green-600 text-green-600"
                : "bg-white border-green-600 text-green-600 hover:bg-green-50"
            }`}
          >
            Cancelled
          </button>
        </div>

        {/* Table */}
        <div className="border border-gray-300 rounded-lg overflow-hidden mb-6">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-300">
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                  Date
                </th>
                <th className="py-3 pr-16 text-sm font-medium text-gray-900 text-end">
                  Action
                </th>
              </tr>
            </thead>

            
            <tbody>
              {displayedOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {order.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {order.price}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 text-sm flex justify-end">
                    <div className="flex items-center gap-2">
                      <span className={getStatusStyle(order.statusColor)}>
                        {order.status}
                      </span>
                      <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                        <ChevronDown size={16} className="text-gray-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-600">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, filteredOrders.length)} of{" "}
            {filteredOrders.length} results
          </p>

          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
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
              className="p-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
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
