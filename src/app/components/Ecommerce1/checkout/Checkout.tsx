export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Delivery Details */}
          <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">ডেলিভারি ঠিকানা</h2>

            <div className="space-y-4">
              {/* Phone Number */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">মোবাইল নাম্বার ex:01864411645</label>
                <input
                  type="tel"
                  placeholder="মোবাইল নাম্বার *"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">নাম লিখুন</label>
                <input
                  type="text"
                  placeholder="Mahadi Hasan"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">ইমেইল এড্রেস</label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="yaboho4084@jomspar.com"
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">ঠিকানা</label>
                <textarea
                  placeholder="ঠিকানা *"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Delivery Options */}
              <div>
                <label className="block text-sm text-gray-600 mb-3">ডেলিভারি এরিয়া নির্বাচন করুন :</label>
                <div className="flex gap-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="delivery"
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">ঢাকার ভিতরে</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="delivery"
                      defaultChecked
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">ঢাকার বাহিরে</span>
                  </label>
                </div>
              </div>

              {/* Checkbox */}
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">আমার ই-মেইল নেই</span>
                </label>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Payment Method</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {/* AmarPay */}
                <label className="border-2 border-blue-500 bg-blue-50 rounded-lg p-3 cursor-pointer">
                  <div className="flex items-center">
                    <input type="radio" name="payment" defaultChecked className="w-4 h-4 text-blue-600" />
                    <span className="ml-2 font-medium text-blue-700">AmarPay</span>
                  </div>
                </label>

                {/* Rocket */}
                <label className="border border-gray-300 rounded-lg p-3 cursor-pointer hover:border-gray-400">
                  <div className="flex items-center">
                    <input type="radio" name="payment" className="w-4 h-4 text-blue-600" />
                    <div className="ml-2">
                      <span className="font-medium text-gray-700">Rocket</span>
                      <span className="text-sm text-green-600 ml-1">10% Off</span>
                    </div>
                  </div>
                </label>

                {/* Bkash */}
                <label className="border border-gray-300 rounded-lg p-3 cursor-pointer hover:border-gray-400">
                  <div className="flex items-center">
                    <input type="radio" name="payment" className="w-4 h-4 text-blue-600" />
                    <div className="ml-2">
                      <span className="font-medium text-gray-700">Bkash</span>
                      <span className="text-sm text-green-600 ml-1">5% Off</span>
                    </div>
                  </div>
                </label>

                {/* Nagad */}
                <label className="border border-gray-300 rounded-lg p-3 cursor-pointer hover:border-gray-400">
                  <div className="flex items-center">
                    <input type="radio" name="payment" className="w-4 h-4 text-blue-600" />
                    <span className="ml-2 font-medium text-gray-700">Nagad</span>
                  </div>
                </label>

                {/* Cash On Delivery */}
                <label className="border border-gray-300 rounded-lg p-3 cursor-pointer hover:border-gray-400 md:col-span-2">
                  <div className="flex items-center">
                    <input type="radio" name="payment" className="w-4 h-4 text-blue-600" />
                    <span className="ml-2 font-medium text-gray-700">Cash On Delivery</span>
                  </div>
                </label>
              </div>

              {/* Dashed Border Box */}
              <div className="mt-6 border-2 border-dashed border-gray-300 rounded-lg h-20"></div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="bg-white rounded-lg p-6 shadow-sm h-fit">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">আপনার অর্ডার</h2>

            {/* Product Item */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="w-8 h-8 bg-gray-400 rounded"></div>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">Luxury Decor 3D DIY</h3>
                <p className="text-sm text-gray-600">colour: Black</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">৳270 X 1</p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">৳ 270</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping Fee</span>
                <span className="font-medium">৳ 100</span>
              </div>
              <div className="text-sm text-orange-600">১০ টি পণ্য অর্ডার ৫০০০ টাকার পণ্য ফ্রিতে ডেলিভারি ফ্রি।</div>
              <div className="flex justify-between">
                <span className="text-gray-600">Discount</span>
                <span className="font-medium">৳ 0</span>
              </div>
            </div>

            {/* Promo Code */}
            <div className="mb-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter your promo code"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <button className="px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500 transition-colors">
                  Apply
                </button>
              </div>
            </div>

            {/* Total */}
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>৳ 340</span>
              </div>
            </div>

            {/* Place Order Button */}
            <button className="w-full py-3 bg-orange-300 text-gray-800 rounded-md font-medium hover:bg-orange-400 transition-colors">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
