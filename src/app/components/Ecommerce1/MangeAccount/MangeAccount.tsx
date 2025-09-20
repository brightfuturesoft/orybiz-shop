/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import { useAddressStore } from "@/store/addressStore"; 
import { Address } from "@/app/types/types";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { useOrderStore } from "@/store/orderStore";

export default function ManageAccountPage() {
  const { user, fetchUser, updateUser, setUser, loading: userLoading } = useUserStore();
  const { address, fetchAddress, updateAddress, setAddress, loading: addressLoading } = useAddressStore();
  const { orders, fetchOrders, loading: ordersLoading } = useOrderStore();
  const workspace = useWorkspaceStore((state) => state.workspace);

  const [editingProfile, setEditingProfile] = useState(false);
  const [tempProfile, setTempProfile] = useState({ full_name: "", email: "" });
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [tempAddress, setTempAddress] = useState<Partial<Address>>({});

  // Fetch user
  useEffect(() => {
    if (!user) fetchUser();
  }, [fetchUser, user]);

  // Fetch addresses
  useEffect(() => {
    if (user && workspace) fetchAddress(workspace._id, user._id);
  }, [user, fetchAddress, workspace]);

  // Fetch orders
  useEffect(() => {
    if (workspace?._id && user?._id) fetchOrders(workspace._id, user._id);
  }, [workspace, user, fetchOrders]);

  // Initialize tempProfile when user loads
  useEffect(() => {
    if (user) setTempProfile({ full_name: user.full_name, email: user.email });
  }, [user]);

  // Profile save
  const handleProfileSave = async () => {
    if (!user) return;
    await updateUser({ full_name: tempProfile.full_name, email: tempProfile.email });
    setUser({ ...user, ...tempProfile });
    setEditingProfile(false);
  };

  const handleProfileCancel = () => {
    if (user) setTempProfile({ full_name: user.full_name, email: user.email });
    setEditingProfile(false);
  };

  // Address edit
  const handleAddressEdit = (addr: Address) => {
    setEditingAddressId(addr._id);
    setTempAddress(addr);
  };

  const handleAddressCancel = () => {
    setEditingAddressId(null);
    setTempAddress({});
  };

  const handleAddressSave = async () => {
    if (!editingAddressId) return;
    const { _id, ...updateDataWithoutId } = tempAddress;
    const updated = await updateAddress(editingAddressId, updateDataWithoutId);
    setAddress((prev: any) =>
      prev?.map((addr: any) => (addr._id === editingAddressId ? updated : addr)) || [updated]
    );
    setEditingAddressId(null);
    setTempAddress({});
  };

  if ((userLoading && !user) || addressLoading) return <p className="p-4">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6 md:mb-8">
          Manage My Account
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Personal Profile */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900">Personal Profile</h2>
              {editingProfile ? (
                <div className="flex space-x-2">
                  <button
                    onClick={handleProfileSave}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    SAVE
                  </button>
                  <button
                    onClick={handleProfileCancel}
                    className="text-gray-600 hover:text-gray-700 text-sm font-medium"
                  >
                    CANCEL
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setEditingProfile(true)}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  EDIT
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                {editingProfile ? (
                  <input
                    type="text"
                    value={tempProfile.full_name}
                    onChange={(e) => setTempProfile({ ...tempProfile, full_name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{user?.full_name}</p>
                )}
              </div>
              <div>
                {editingProfile ? (
                  <input
                    type="email"
                    value={tempProfile.email}
                    onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                ) : (
                  <p className="text-gray-600">{user?.email}</p>
                )}
              </div>
            </div>
          </div>

          {/* Address Book */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Address Book</h2>

            {address?.map((addr) => {
              const isEditing = editingAddressId === addr._id;
              return (
                <div key={addr._id} className="mb-4 border-b pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">{addr.full_name}</p>
                    {isEditing ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={handleAddressSave}
                          className="text-red-600 hover:text-red-700 text-sm font-medium"
                        >
                          SAVE
                        </button>
                        <button
                          onClick={handleAddressCancel}
                          className="text-gray-600 hover:text-gray-700 text-sm font-medium"
                        >
                          CANCEL
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAddressEdit(addr)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        EDIT
                      </button>
                    )}
                  </div>

                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={tempAddress.street || ""}
                        onChange={(e) => setTempAddress({ ...tempAddress, street: e.target.value })}
                        className="w-full mb-1 px-2 py-1 border rounded"
                      />
                      <input
                        type="text"
                        value={tempAddress.city || ""}
                        onChange={(e) => setTempAddress({ ...tempAddress, city: e.target.value })}
                        className="w-full mb-1 px-2 py-1 border rounded"
                      />
                      <input
                        type="text"
                        value={tempAddress.phone || ""}
                        onChange={(e) => setTempAddress({ ...tempAddress, phone: e.target.value })}
                        className="w-full mb-1 px-2 py-1 border rounded"
                      />
                    </>
                  ) : (
                    <div>
                      <p>{addr.street}</p>
                      <p>{addr.city}</p>
                      <p>{addr.phone}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Orders Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mt-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Recent Orders</h2>

          {ordersLoading && <p className="text-gray-500">Loading orders...</p>}

          {!ordersLoading && (!orders || orders.length === 0) && (
            <p className="text-gray-500 italic">You have not placed any orders yet.</p>
          )}

          {!ordersLoading && orders?.length && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Order #</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Placed On</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Items</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Total</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.map((order) => {
                    type OrderStatus = "pending" | "shipped" | "delivered" | "cancelled";
                    const statusColors: Record<OrderStatus, { text: string }> = {
                      pending: { text: "#B91C1C" },
                      shipped: { text: "#1E40AF" },
                      delivered: { text: "#15803D" },
                      cancelled: { text: "#374151" },
                    };
                    const currentStatus =
                      statusColors[order.order_status as OrderStatus] || statusColors.cancelled;

                    return (
                      <tr key={order._id}>
                        <td className="py-4 px-4 text-sm text-gray-900">{order.order_number}</td>
                        <td className="py-4 px-4 text-sm text-gray-900">
                          {new Date(order.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-900">
                          {order.products.map((p) => p.product_name).join(", ")}
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-900">৳ {order.total_amount}</td>
                        <td style={{ color: currentStatus.text }}>
                          {order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
