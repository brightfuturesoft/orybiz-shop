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
        {
          loading?  <h1 className="text-center items-center h-[60vh] flex mx-auto">Loading..</h1> :  <div className="flex-1 p-4 lg:p-8">
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
        }

       
      </div>
    </div>
  )
}
