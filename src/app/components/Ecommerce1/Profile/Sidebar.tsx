"use client"

import React from "react"

interface SidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  const accountSections = ["My Profile", "Address Book"]
  const orderSections = ["My Returns", "My Cancellations"]
  const wishlistSection = "My Wishlist"
  const manageAccountSection = "Manage My Account"

  const renderButton = (name: string) => (
    <button
      key={name}
      onClick={() => setActiveSection(name)}
      className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
        activeSection === name ? "text-red-500 bg-red-50" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
      }`}
    >
      {name}
    </button>
  )

  return (
    <div className="w-full lg:w-64 bg-white border-r border-gray-200 p-4 lg:p-6 space-y-6">
      <div>
        <h3
          onClick={() => setActiveSection(manageAccountSection)}
          className={`text-base font-medium mb-3 cursor-pointer ${
            activeSection === manageAccountSection ? "text-red-500" : "text-gray-900"
          }`}
        >
          Manage My Account
        </h3>
        <div className="space-y-2">{accountSections.map(renderButton)}</div>
      </div>
      <div>
        <h3 className="text-base font-medium text-gray-900 mb-3">My Orders</h3>
        <div className="space-y-2">{orderSections.map(renderButton)}</div>
      </div>
      <div>{renderButton(wishlistSection)}</div>
    </div>
  )
}

export default Sidebar
