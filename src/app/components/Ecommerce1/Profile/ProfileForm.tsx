"use client"

import React from "react"

interface ProfileFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSaveChanges: () => void
  handleCancel: () => void
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  formData,
  handleInputChange,
  handleSaveChanges,
  handleCancel,
}) => {
  return (
    <div className="max-w-4xl">
      <h2 className="text-xl font-medium text-red-500 mb-8">Edit Your Profile</h2>

      <div className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.full_name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-100 border-0 rounded-md focus:bg-white focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
            />
          </div>
           <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-100 border-0 rounded-md focus:bg-white focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
            />
          </div>
          {/* <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.full_name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-100 border-0 rounded-md focus:bg-white focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
            />
          </div> */}
        </div>

        {/* Email and Address Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         
          {/* <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-100 border-0 rounded-md focus:bg-white focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
            />
          </div> */}
        </div>

        {/* Password Fields */}
        <div className="pt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Password Changes</h3>
          <div className="space-y-4">
            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              value={formData.currentPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-100 border-0 rounded-md placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
            />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-100 border-0 rounded-md placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-100 border-0 rounded-md placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6">
          <button
            onClick={handleCancel}
            className="px-6 py-3 text-gray-700 hover:text-gray-900 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveChanges}
            className="px-8 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors font-medium"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileForm
