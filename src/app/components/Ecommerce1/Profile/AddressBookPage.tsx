"use client"

import type React from "react"

import { useState } from "react"

interface Address {
  id: string
  name: string
  address: string
  postcode: string
  phone: string
  isHome: boolean
  isDefaultShipping: boolean
  isDefaultBilling: boolean
}

interface NewAddress {
  name: string
  address: string
  postcode: string
  phone: string
  isHome: boolean
}

export default function AddressBookPage() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      name: "Mahadi Hasan",
      address: "shjdbfyugasd",
      postcode: "Dhaka - Dhaka - North - Mirpur 10",
      phone: "1648780966",
      isHome: true,
      isDefaultShipping: true,
      isDefaultBilling: true,
    },
    {
      id: "2",
      name: "Mahadi Hasan",
      address: "daner jamtola, Azampur kachabazer",
      postcode: "Dhaka - Dhaka - North - Dakkhinkhan Jamtola",
      phone: "1648780966",
      isHome: true,
      isDefaultShipping: false,
      isDefaultBilling: false,
    },
  ])

  const [showDeliveryWarning, setShowDeliveryWarning] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [formData, setFormData] = useState<NewAddress>({
    name: "",
    address: "",
    postcode: "",
    phone: "",
    isHome: true,
  })

  const handleMakeDefaultShipping = (id?: string) => {
    if (!id) {
      const firstAddress = addresses[0]
      if (firstAddress) {
        setAddresses(
          addresses.map((addr) => ({
            ...addr,
            isDefaultShipping: addr.id === firstAddress.id,
          })),
        )
      }
    } else {
      setAddresses(
        addresses.map((addr) => ({
          ...addr,
          isDefaultShipping: addr.id === id,
        })),
      )
    }
  }

  const handleMakeDefaultBilling = (id?: string) => {
    if (!id) {
      const firstAddress = addresses[0]
      if (firstAddress) {
        setAddresses(
          addresses.map((addr) => ({
            ...addr,
            isDefaultBilling: addr.id === firstAddress.id,
          })),
        )
      }
    } else {
      setAddresses(
        addresses.map((addr) => ({
          ...addr,
          isDefaultBilling: addr.id === id,
        })),
      )
    }
  }

  const handleEditAddress = (id: string) => {
    const addressToEdit = addresses.find((addr) => addr.id === id)
    if (addressToEdit) {
      setEditingAddress(addressToEdit)
      setFormData({
        name: addressToEdit.name,
        address: addressToEdit.address,
        postcode: addressToEdit.postcode,
        phone: addressToEdit.phone,
        isHome: addressToEdit.isHome,
      })
      setShowAddModal(true)
    }
  }

  const handleAddNewAddress = () => {
    setEditingAddress(null)
    setFormData({
      name: "",
      address: "",
      postcode: "",
      phone: "",
      isHome: true,
    })
    setShowAddModal(true)
  }

  const handleSubmitAddress = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingAddress) {
      setAddresses(addresses.map((addr) => (addr.id === editingAddress.id ? { ...addr, ...formData } : addr)))
    } else {
      const newAddress: Address = {
        id: Date.now().toString(),
        ...formData,
        isDefaultShipping: addresses.length === 0,
        isDefaultBilling: addresses.length === 0,
      }
      setAddresses([...addresses, newAddress])
    }

    setShowAddModal(false)
    setEditingAddress(null)
  }

  const handleDeleteAddress = (id: string) => {
    const addressToDelete = addresses.find((addr) => addr.id === id)
    if (addressToDelete && addresses.length > 1) {
      const updatedAddresses = addresses.filter((addr) => addr.id !== id)
      if (addressToDelete.isDefaultShipping || addressToDelete.isDefaultBilling) {
        const firstAddress = updatedAddresses[0]
        if (firstAddress) {
          firstAddress.isDefaultShipping = addressToDelete.isDefaultShipping || firstAddress.isDefaultShipping
          firstAddress.isDefaultBilling = addressToDelete.isDefaultBilling || firstAddress.isDefaultBilling
        }
      }
      setAddresses(updatedAddresses)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 sm:mb-0">Address Book</h1>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm">
            <button
              onClick={() => handleMakeDefaultShipping()}
              className="text-blue-600 hover:text-blue-700 hover:underline"
            >
              Make default shipping address
            </button>
            <span className="hidden sm:inline text-gray-400">|</span>
            <button
              onClick={() => handleMakeDefaultBilling()}
              className="text-blue-600 hover:text-blue-700 hover:underline"
            >
              Make default billing address
            </button>
          </div>
        </div>

        {/* Address List */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Table Header - Hidden on mobile */}
          <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-700">
            <div className="col-span-2">Full Name</div>
            <div className="col-span-3">Address</div>
            <div className="col-span-3">Postcode</div>
            <div className="col-span-2">Phone Number</div>
            <div className="col-span-2"></div>
          </div>

          {/* Address Entries */}
          <div className="divide-y divide-gray-200">
            {addresses.map((address) => (
              <div key={address.id} className="p-4 md:p-6">
                {/* Mobile Layout */}
                <div className="md:hidden space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{address.name}</span>
                    {address.isHome && (
                      <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded">HOME</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    <div className="mb-1">{address.address}</div>
                    <div className="mb-1">{address.postcode}</div>
                    <div>{address.phone}</div>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {address.isDefaultShipping && <span className="text-gray-600">Default Shipping Address</span>}
                    {address.isDefaultBilling && <span className="text-gray-600">Default Billing Address</span>}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleMakeDefaultShipping(address.id)}
                        className="text-xs text-blue-600 hover:text-blue-700"
                        disabled={address.isDefaultShipping}
                      >
                        {address.isDefaultShipping ? "Default Shipping" : "Make Shipping"}
                      </button>
                      <button
                        onClick={() => handleMakeDefaultBilling(address.id)}
                        className="text-xs text-blue-600 hover:text-blue-700"
                        disabled={address.isDefaultBilling}
                      >
                        {address.isDefaultBilling ? "Default Billing" : "Make Billing"}
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditAddress(address.id)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        EDIT
                      </button>
                      {addresses.length > 1 && (
                        <button
                          onClick={() => handleDeleteAddress(address.id)}
                          className="text-red-600 hover:text-red-700 text-sm font-medium"
                        >
                          DELETE
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:grid md:grid-cols-12 gap-4 items-start">
                  <div className="col-span-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{address.name}</span>
                      {address.isHome && (
                        <span className="px-2 py-1 bg-orange-500 text-white text-xs font-medium rounded">HOME</span>
                      )}
                    </div>
                  </div>
                  <div className="col-span-3 text-gray-700">{address.address}</div>
                  <div className="col-span-3 text-gray-700">{address.postcode}</div>
                  <div className="col-span-2 text-gray-700">{address.phone}</div>
                  <div className="col-span-2">
                    <div className="space-y-1 text-xs text-gray-600 mb-2">
                      {address.isDefaultShipping && <div>Default Shipping Address</div>}
                      {address.isDefaultBilling && <div>Default Billing Address</div>}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleEditAddress(address.id)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        EDIT
                      </button>
                      {addresses.length > 1 && (
                        <button
                          onClick={() => handleDeleteAddress(address.id)}
                          className="text-red-600 hover:text-red-700 text-sm font-medium"
                        >
                          DELETE
                        </button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      <button
                        onClick={() => handleMakeDefaultShipping(address.id)}
                        className="text-xs text-red-600 hover:text-blue-700 disabled:text-gray-400"
                        disabled={address.isDefaultShipping}
                      >
                        {address.isDefaultShipping ? "Default Shipping" : "Make Shipping"}
                      </button>
                      <button
                        onClick={() => handleMakeDefaultBilling(address.id)}
                        className="text-xs text-red-600 hover:text-red-700 disabled:text-gray-400"
                        disabled={address.isDefaultBilling}
                      >
                        {address.isDefaultBilling ? "Default Billing" : "Make Billing"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Warning */}
        {showDeliveryWarning && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 bg-red-400 rounded-full flex items-center justify-center mt-0.5">
              <span className="text-white text-xs font-bold">!</span>
            </div>
            <div className="flex-1">
              <p className="text-red-800 text-sm">
                Your previous delivery is failed. Add a pin location to improve accurate delivery
              </p>
            </div>
            <button
              onClick={() => setShowDeliveryWarning(false)}
              className="flex-shrink-0 text-orange-600 hover:text-orange-800"
            >
              <span className="sr-only">Close</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Add New Address Button */}
        <div className="mt-6 flex justify-center md:justify-end">
          <button
            onClick={handleAddNewAddress}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            + ADD NEW ADDRESS
          </button>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingAddress ? "Edit Address" : "Add New Address"}
                </h2>
                <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmitAddress} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postcode</label>
                  <input
                    type="text"
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isHome"
                    checked={formData.isHome}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">Mark as Home address</label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    {editingAddress ? "Update Address" : "Add Address"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
