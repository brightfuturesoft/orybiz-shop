
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
          Full Name<span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="text"
          value={billingDetails.full_name}
          onChange={(e) => handleInputChange("full_name", e.target.value)}
          className="w-full px-4 py-3 bg-gray-100 border-0 rounded-none focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-700 mb-2">
          Street Address<span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="text"
          value={billingDetails.street_address}
          onChange={(e) => handleInputChange("street_address", e.target.value)}
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
          value={billingDetails.town_city}
          onChange={(e) => handleInputChange("town_city", e.target.value)}
          className="w-full px-4 py-3 bg-gray-100 border-0 rounded-none focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-700 mb-2">
          Phone Number<span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="tel"
          value={billingDetails.phone_number}
          onChange={(e) => handleInputChange("phone_number", e.target.value)}
          className="w-full px-4 py-3 bg-gray-100 border-0 rounded-none focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-700 mb-2">
          Email Address<span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="email"
          value={billingDetails.email_address}
          onChange={(e) => handleInputChange("email_address", e.target.value)}
          className="w-full px-4 py-3 bg-gray-100 border-0 rounded-none focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      {/* <div className="flex items-center space-x-3 pt-4">
        <input
          type="checkbox"
          id="save-info"
          checked={billingDetails.saveInfo}
          onChange={(e) => handleInputChange("saveInfo", e.target.checked)}
          className="w-4 h-4 text-red-500 bg-red-500 border-red-500 rounded focus:ring-red-500"
        />
      </div> */}
    </div>
  )
}
