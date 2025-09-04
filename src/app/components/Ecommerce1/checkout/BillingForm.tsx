
"use client"

import { BillingDetails } from "@/app/types/checkout"

interface Props {
  billingDetails: BillingDetails
  handleInputChange: (field: keyof BillingDetails, value: string | boolean) => void
}

export default function BillingForm({ billingDetails, handleInputChange }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm text-gray-700 mb-2">
          First Name<span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="text"
          value={billingDetails.firstName}
          onChange={(e) => handleInputChange("firstName", e.target.value)}
          className="w-full px-4 py-3 bg-gray-100 border-0 rounded-none focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-700 mb-2">Company Name</label>
        <input
          type="text"
          value={billingDetails.companyName}
          onChange={(e) => handleInputChange("companyName", e.target.value)}
          className="w-full px-4 py-3 bg-gray-100 border-0 rounded-none focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-700 mb-2">
          Street Address<span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="text"
          value={billingDetails.streetAddress}
          onChange={(e) => handleInputChange("streetAddress", e.target.value)}
          className="w-full px-4 py-3 bg-gray-100 border-0 rounded-none focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-700 mb-2">Apartment, floor, etc. (optional)</label>
        <input
          type="text"
          value={billingDetails.apartment}
          onChange={(e) => handleInputChange("apartment", e.target.value)}
          className="w-full px-4 py-3 bg-gray-100 border-0 rounded-none focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-700 mb-2">
          Town/City<span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="text"
          value={billingDetails.townCity}
          onChange={(e) => handleInputChange("townCity", e.target.value)}
          className="w-full px-4 py-3 bg-gray-100 border-0 rounded-none focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-700 mb-2">
          Phone Number<span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="tel"
          value={billingDetails.phoneNumber}
          onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
          className="w-full px-4 py-3 bg-gray-100 border-0 rounded-none focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-700 mb-2">
          Email Address<span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="email"
          value={billingDetails.emailAddress}
          onChange={(e) => handleInputChange("emailAddress", e.target.value)}
          className="w-full px-4 py-3 bg-gray-100 border-0 rounded-none focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <div className="flex items-center space-x-3 pt-4">
        <input
          type="checkbox"
          id="save-info"
          checked={billingDetails.saveInfo}
          onChange={(e) => handleInputChange("saveInfo", e.target.checked)}
          className="w-4 h-4 text-red-500 bg-red-500 border-red-500 rounded focus:ring-red-500"
        />
        <label htmlFor="save-info" className="text-sm text-black">
          Save this information for faster check-out next time
        </label>
      </div>
    </div>
  )
}
