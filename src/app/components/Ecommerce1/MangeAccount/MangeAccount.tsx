"use client"

import { useState } from "react"

interface UserProfile {
  name: string
  email: string
  receiveMarketing: boolean
}

interface Address {
  name: string
  street: string
  city: string
  phone: string
}

interface Order {
  id: string
  date: string
  items: string[]
  total: number
  status: string
}

export default function ManageAccountPage() {
  const [profile, setProfile] = useState<UserProfile>({
    name: "Mahadi Hasan",
    email: "co******************@gmail.com",
    receiveMarketing: false,
  })

  const [shippingAddress, setShippingAddress] = useState<Address>({
    name: "Mahadi Hasan",
    street: "shjdbfyugasd",
    city: "Dhaka - Dhaka - North - Mirpur 10",
    phone: "(+880) 1648780966",
  })

  const [billingAddress, setBillingAddress] = useState<Address>({
    name: "Mahadi Hasan",
    street: "shjdbfyugasd",
    city: "Dhaka - Dhaka - North - Mirpur 10",
    phone: "(+880) 1648780966",
  })

  const [orders] = useState<Order[]>([
    {
      id: "659248425137143",
      date: "25/05/2024",
      items: ["/eco-friendly-product.png"],
      total: 210,
      status: "Delivered",
    },
    {
      id: "659667546737143",
      date: "22/05/2024",
      items: [
        "/brown-product-box.jpg",
        "/brown-product-box.jpg",
        "/brown-product-box.jpg",
        "/brown-product-box.jpg",
        "+2 more",
      ],
      total: 2745,
      status: "Shipped",
    },
    {
      id: "656979162237143",
      date: "17/03/2024",
      items: ["/kitchen-utensils.png", "/kitchen-utensils.png"],
      total: 666,
      status: "Delivered",
    },
  ])

  const [editingProfile, setEditingProfile] = useState(false)
  const [editingAddress, setEditingAddress] = useState(false)
  const [tempProfile, setTempProfile] = useState(profile)
  const [tempShippingAddress, setTempShippingAddress] = useState(shippingAddress)
  const [tempBillingAddress, setTempBillingAddress] = useState(billingAddress)

  const handleProfileEdit = () => {
    if (editingProfile) {
      setProfile(tempProfile)
      setEditingProfile(false)
    } else {
      setTempProfile(profile)
      setEditingProfile(true)
    }
  }

  const handleAddressEdit = () => {
    if (editingAddress) {
      setShippingAddress(tempShippingAddress)
      setBillingAddress(tempBillingAddress)
      setEditingAddress(false)
    } else {
      setTempShippingAddress(shippingAddress)
      setTempBillingAddress(billingAddress)
      setEditingAddress(true)
    }
  }

  const handleCancelEdit = () => {
    setEditingProfile(false)
    setEditingAddress(false)
    setTempProfile(profile)
    setTempShippingAddress(shippingAddress)
    setTempBillingAddress(billingAddress)
  }

  const handleOrderManage = (orderId: string) => {
    alert(`Managing order: ${orderId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6 md:mb-8">Manage My Account</h1>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Personal Profile Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900">Personal Profile</h2>
              <div className="flex space-x-2">
                <button onClick={handleProfileEdit} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  {editingProfile ? "SAVE" : "EDIT"}
                </button>
                {editingProfile && (
                  <button onClick={handleCancelEdit} className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                    CANCEL
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                {editingProfile ? (
                  <input
                    type="text"
                    value={tempProfile.name}
                    onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{profile.name}</p>
                )}
              </div>
              <div>
                {editingProfile ? (
                  <input
                    type="email"
                    value={tempProfile.email}
                    onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-600">{profile.email}</p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="marketing"
                  checked={editingProfile ? tempProfile.receiveMarketing : profile.receiveMarketing}
                  onChange={(e) =>
                    editingProfile && setTempProfile({ ...tempProfile, receiveMarketing: e.target.checked })
                  }
                  disabled={!editingProfile}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="marketing" className="text-sm text-gray-700">
                  Receive marketing emails
                </label>
              </div>
            </div>
          </div>

          {/* Address Book Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900">Address Book</h2>
              <div className="flex space-x-2">
                <button onClick={handleAddressEdit} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  {editingAddress ? "SAVE" : "EDIT"}
                </button>
                {editingAddress && (
                  <button onClick={handleCancelEdit} className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                    CANCEL
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Default Shipping Address */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
                  Default Shipping Address
                </h3>
                <div className="text-sm text-gray-900 space-y-2">
                  {editingAddress ? (
                    <>
                      <input
                        type="text"
                        value={tempShippingAddress.name}
                        onChange={(e) => setTempShippingAddress({ ...tempShippingAddress, name: e.target.value })}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="Name"
                      />
                      <input
                        type="text"
                        value={tempShippingAddress.street}
                        onChange={(e) => setTempShippingAddress({ ...tempShippingAddress, street: e.target.value })}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="Street"
                      />
                      <input
                        type="text"
                        value={tempShippingAddress.city}
                        onChange={(e) => setTempShippingAddress({ ...tempShippingAddress, city: e.target.value })}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="City"
                      />
                      <input
                        type="text"
                        value={tempShippingAddress.phone}
                        onChange={(e) => setTempShippingAddress({ ...tempShippingAddress, phone: e.target.value })}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="Phone"
                      />
                    </>
                  ) : (
                    <>
                      <p className="font-medium">{shippingAddress.name}</p>
                      <p>{shippingAddress.street}</p>
                      <p>{shippingAddress.city}</p>
                      <p>{shippingAddress.phone}</p>
                    </>
                  )}
                </div>
              </div>

              {/* Default Billing Address */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
                  Default Billing Address
                </h3>
                <div className="text-sm text-gray-900 space-y-2">
                  {editingAddress ? (
                    <>
                      <input
                        type="text"
                        value={tempBillingAddress.name}
                        onChange={(e) => setTempBillingAddress({ ...tempBillingAddress, name: e.target.value })}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="Name"
                      />
                      <input
                        type="text"
                        value={tempBillingAddress.street}
                        onChange={(e) => setTempBillingAddress({ ...tempBillingAddress, street: e.target.value })}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="Street"
                      />
                      <input
                        type="text"
                        value={tempBillingAddress.city}
                        onChange={(e) => setTempBillingAddress({ ...tempBillingAddress, city: e.target.value })}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="City"
                      />
                      <input
                        type="text"
                        value={tempBillingAddress.phone}
                        onChange={(e) => setTempBillingAddress({ ...tempBillingAddress, phone: e.target.value })}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="Phone"
                      />
                    </>
                  ) : (
                    <>
                      <p className="font-medium">{billingAddress.name}</p>
                      <p>{billingAddress.street}</p>
                      <p>{billingAddress.city}</p>
                      <p>{billingAddress.phone}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Recent Orders</h2>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Order #</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Placed On</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Items</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Total</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="py-4 px-4 text-sm text-gray-900">{order.id}</td>
                    <td className="py-4 px-4 text-sm text-gray-900">{order.date}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-1">
                        {order.items.slice(0, 4).map((item, index) =>
                          item.startsWith("/") ? (
                            <img
                              key={index}
                              src={item || "/placeholder.svg"}
                              alt="Product"
                              className="w-10 h-10 rounded object-cover"
                            />
                          ) : (
                            <span key={index} className="text-sm text-gray-500 ml-2">
                              {item}
                            </span>
                          ),
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-900">৳ {order.total.toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Shipped"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleOrderManage(order.id)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        MANAGE
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Order #{order.id}</p>
                    <p className="text-sm text-gray-500">{order.date}</p>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full mt-1 ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Shipped"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <button
                    onClick={() => handleOrderManage(order.id)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    MANAGE
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {order.items
                      .slice(0, 2)
                      .map((item, index) =>
                        item.startsWith("/") ? (
                          <img
                            key={index}
                            src={item || "/placeholder.svg"}
                            alt="Product"
                            className="w-10 h-10 rounded object-cover"
                          />
                        ) : null,
                      )}
                    {order.items.length > 2 && (
                      <span className="text-sm text-gray-500">+ {order.items.length - 2}</span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-gray-900">৳ {order.total.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
