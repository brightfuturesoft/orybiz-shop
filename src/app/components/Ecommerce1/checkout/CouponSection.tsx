"use client"

interface Props {
  couponCode: string
  setCouponCode: (value: string) => void
  applyCoupon: () => void
}

export default function CouponSection({ couponCode, setCouponCode, applyCoupon }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 pt-4">
      <input
        type="text"
        placeholder="Coupon Code"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
        className="flex-1 px-4 py-3 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-red-500"
      />
      <button
        onClick={applyCoupon}
        className="px-6 py-3 bg-red-500 text-white font-medium hover:bg-red-600 transition-colors whitespace-nowrap"
      >
        Apply Coupon
      </button>
    </div>
  )
}
