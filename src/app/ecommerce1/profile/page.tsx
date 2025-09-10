"use client"

import ManageAccountPage from "@/app/components/Ecommerce1/MangeAccount/MangeAccount"
import AddressBookPage from "@/app/components/Ecommerce1/Profile/AddressBookPage"
import EditProfilePage from "@/app/components/Ecommerce1/Profile/EditProfilePage"
import Sidebar from "@/app/components/Ecommerce1/Profile/Sidebar"
import Spinner from "@/app/ui/Spinner/Spinner"
import { useUserStore } from "@/store/userStore"
import React, { useEffect, useState } from "react"

export default function AccountPage() {
  const [activeSection, setActiveSection] = useState("Manage My Account")
  const { user, loading, error, fetchUser } = useUserStore();
  useEffect(() => {
    fetchUser(); 
  }, []);
  if (loading) return <Spinner message="Loading User"/>;
 if (!user || error) {
  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className=" rounded-xl  p-10 text-center max-w-md w-full">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h1>

        {/* Message */}
        <p className="text-gray-600 mb-4">
          {error ? error : "No user is logged in."}
        </p>
        <p className="text-gray-500 mb-6">
          Please log in to access your account and view your profile.
        </p>

        {/* Login Button */}
        <button
          onClick={() => (window.location.href = "/ecommerce1/login")}
          className="bg-red-500 cursor-pointer hover:bg-red-600 text-white font-medium px-6 py-3 rounded-lg transition-colors"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}


  return (
    <div className="min-h-screen bg-white container mx-auto my-10">
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-8 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center text-sm text-gray-600">
            <span className="hover:text-gray-900 cursor-pointer">Home</span>
            <span className="mx-2">/</span>
            <span className="text-gray-900">My Account</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-600">Welcome!</span>
            <span className="text-red-500 ml-1 font-medium">{user?.full_name}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

        <div className="flex-1 p-4 lg:p-8">
          {activeSection === "Manage My Account" && (
            <ManageAccountPage/>
          )}
            {activeSection === "My Profile" && (
            <EditProfilePage/>
          )}
            {activeSection === "Address Book" && (
            <AddressBookPage/>
          )}
        </div>
      </div>
    </div>
  )
}
