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
  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>No user logged in</p>;



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

  console.log(user)



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
