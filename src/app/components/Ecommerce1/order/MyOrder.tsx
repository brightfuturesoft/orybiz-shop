/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Search, Package } from "lucide-react";
import { useOrderStore } from "../../../../store/orderStore";
import { useWorkspaceStore } from "../../../../store/workspaceStore";
import { useUserStore } from "../../../../store/userStore";
import ReviewModal from "../Reviews/ReviewModal";
import { rgbToName } from "@/app/utils/colorUtils";

const tabs = [
  "All",
  "To Pay",
  "To Ship",
  "To Receive",
  "To Review",
  "Cancelled",
];

// Backend order_status mapping to frontend tabs
const statusMapping: Record<string, string[]> = {
  "To Pay": ["pending"],
  "To Ship": ["paid", "processing"],
  "To Receive": ["shipped"],
  "To Review": ["delivered"],
  Cancelled: ["cancelled"],
};

export default function MyOrdersPage() {
  const { orders, fetchOrders, loading: ordersLoading } = useOrderStore();
  const workspace = useWorkspaceStore((state) => state.workspace);
  const { user } = useUserStore();
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch orders on mount
  useEffect(() => {
    if (workspace?._id) fetchOrders(workspace?._id, user?._id);
  }, [workspace, user, fetchOrders]);

  const filteredOrders = orders
    ? orders.filter((order) => {
        const matchesTab =
          activeTab === "All" ||
          statusMapping[activeTab]?.includes(order.order_status);
        const matchesSearch =
          searchQuery === "" ||
          order.order_number
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          order.products.some((p: any) =>
            p.product_name.toLowerCase().includes(searchQuery.toLowerCase())
          );
        return matchesTab && matchesSearch;
      })
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-0 lg:px-0">
          <h1 className="text-xl font-semibold  text-gray-900 py-4">My Orders</h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-0 lg:px-0">
        {/* Tabs */}
        <div className="bg-white">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white px-4 py-4 border-b border-gray-200">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by seller, order ID, or product name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-gray-50 border border-gray-300 rounded-md">
          {ordersLoading ? (
            <div className="text-center py-12 text-gray-500">
              Loading orders...
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No orders found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchQuery
                  ? "Try adjusting your search terms."
                  : "You haven't placed any orders yet."}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <div key={order._id} className="p-4 sm:p-6">
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div className="flex items-center mb-2 sm:mb-0">
                      <Package className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                      <span className="text-sm font-medium text-gray-900">
                        <span className="font-semibold">Order Id:</span>{" "}
                        {order.order_number}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>
                        Order Placed{" "}
                        {new Date(order?.created_at).toLocaleString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>

                      <span className="text-blue-400">View Invoice-</span>
                      <span className="bg-red-200 px-2 py-1 rounded-md text-red-600 cursor-pointer">
                        Return
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-4">
                    {order.products.map((item) => (
                      <div
                        key={item.product_id}
                        className="flex items-start space-x-4"
                      >
                        <div className="flex-shrink-0">
                          <img
                            src={item.product_image || "/placeholder.svg"}
                            alt={item.product_name}
                            className="h-16 w-16 sm:h-20 sm:w-20 rounded-lg object-cover border border-gray-200"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                            <div className="flex-1 pr-4">
                              <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                                {item.product_name}
                              </h4>

                              {item.variation && (
                                <p className="text-xs text-gray-500">
                                  Color: {rgbToName(item.variation.color)}
                                  {item.variation.size &&
                                    item.variation.size.trim() !== "" &&
                                    ` | Size: ${item.variation.size}`}
                                </p>
                              )}

                              <span className="text-sm font-medium text-gray-900">
                                Price: ৳ {item.order_price}
                              </span>
                              <p className="text-xs font-bold">
                                <span className="font-semibold">Qty:</span>{" "}
                                {item.quantity}
                              </p>
                            </div>

                            <div className="flex flex-col sm:items-end space-y-1">
                              <h3 className="font-semibold">Shiping Updates</h3>
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  order.order_status === "cancelled"
                                    ? "bg-red-100 text-red-800"
                                    : order.order_status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : order.order_status === "paid" ||
                                      order.order_status === "processing"
                                    ? "bg-blue-100 text-blue-800"
                                    : order.order_status === "shipped"
                                    ? "bg-purple-100 text-purple-800"
                                    : "bg-green-100 text-green-800"
                                }`}
                              >
                                {order.order_status}
                              </span>
                              {/* Add Review Button (only for delivered orders) */}
                              {order.order_status === "delivered" && (
                                <div className="mt-4 flex md:justify-end">
                                  <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 cursor-pointer"
                                  >
                                    Add Review
                                  </button>
                                </div>
                              )}

                              <ReviewModal
                                order_id={order?._id}
                                isOpen={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
