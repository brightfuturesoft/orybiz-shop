"use client"

import ContentPlaceholder from "@/app/components/Ecommerce1/Profile/ContentPlaceholder"
import ProfileForm from "@/app/components/Ecommerce1/Profile/ProfileForm"
import Sidebar from "@/app/components/Ecommerce1/Profile/Sidebar"
import Spinner from "@/app/ui/Spinner/Spinner"
import { useUserStore } from "@/store/userStore"
import React, { useEffect, useState } from "react"

export default function AccountPage() {
  const [activeSection, setActiveSection] = useState("My Profile")
  const [formData, setFormData] = useState({
    firstName: "Md",
    lastName: "Rimel",
    email: "rimel111@gmail.com",
    address: "Kingston, 5236, United State",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const { user, loading, error, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser(); 
  }, []);

  if (loading) return <Spinner message="Loading User"/>;

  // Show a nice centered error if no user
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveChanges = () => {
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      alert("New passwords do not match!")
      return
    }
    console.log("Saving changes:", formData)
    alert("Changes saved successfully!")
  }

  const handleCancel = () => {
    setFormData({
      firstName: "Md",
      lastName: "Rimel",
      email: "rimel111@gmail.com",
      address: "Kingston, 5236, United State",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
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
          {activeSection === "My Profile" ? (
            <ProfileForm
              formData={user}
              handleInputChange={handleInputChange}
              handleSaveChanges={handleSaveChanges}
              handleCancel={handleCancel}
            />
          ) : (
            <ContentPlaceholder title={activeSection} />
          )}
        </div>
      </div>
    </div>
  )
}
