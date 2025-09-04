"use client"

import { useState } from "react"
import Image from "next/image"

export default function ProductPage() {
  const [selectedColor, setSelectedColor] = useState("white")
  const [selectedSize, setSelectedSize] = useState("M")
  const [quantity, setQuantity] = useState(2)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [showAddedToCart, setShowAddedToCart] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const colors = [
    { name: "white", value: "#ffffff", border: "#e5e7eb" },
    { name: "red", value: "#ef4444", border: "#ef4444" },
  ]

  const sizes = ["XS", "S", "M", "L", "XL"]

  const productImages = [
    "/white-gaming-controller-front-view.png",
    "/white-gaming-controller-side-view.png",
    "/white-gaming-controller-back-view.png",
    "/white-gaming-controller-angle-view.png",
  ]

  const handleAddToCart = () => {
    setShowAddedToCart(true)
    setTimeout(() => setShowAddedToCart(false), 3000)
  }

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted)
  }

  return (
    <div className="min-h-screen bg-white">
      {showAddedToCart && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse">
          Added to cart successfully!
        </div>
      )}

      {/* Breadcrumb */}
      <div className="px-4 py-4 text-sm text-gray-500">
        <span className="hover:text-gray-700 cursor-pointer">Account</span>
        <span className="mx-2">/</span>
        <span className="hover:text-gray-700 cursor-pointer">Gaming</span>
        <span className="mx-2">/</span>
        <span className="text-black">Havic HV G-92 Gamepad</span>
      </div>

      <div className="px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="flex gap-4">
              {/* Thumbnail Images */}
              <div className="flex flex-col gap-4">
                {productImages.slice(1).map((image, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImageIndex(index + 1)}
                    className={`w-20 h-20 bg-gray-100 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                      selectedImageIndex === index + 1
                        ? "ring-2 ring-red-500 ring-offset-2"
                        : "hover:ring-2 hover:ring-gray-300"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Product view ${index + 2}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Main Image */}
              <div
                onClick={() => setSelectedImageIndex(0)}
                className="flex-1 bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <Image
                  src={productImages[selectedImageIndex] || "/placeholder.svg"}
                  alt="Havic HV G-92 Gamepad"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Product Title and Rating */}
              <div>
                <h1 className="text-2xl font-semibold text-black mb-2">Havic HV G-92 Gamepad</h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(4)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                    <svg className="w-4 h-4 fill-current text-gray-300" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer">(150 Reviews)</span>
                  <span className="text-sm text-green-500 ml-4">In Stock</span>
                </div>
              </div>

              {/* Price */}
              <div className="text-2xl font-normal text-black">$192.00</div>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed">
                PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install
                & mess free removal Pressure sensitive.
              </p>

              <hr className="border-gray-200" />

              {/* Colors */}
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-lg text-black">Colours:</span>
                  <div className="flex gap-2">
                    {colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-5 h-5 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                          selectedColor === color.name ? "ring-2 ring-gray-400 ring-offset-2" : ""
                        }`}
                        style={{
                          backgroundColor: color.value,
                          borderColor: color.border,
                        }}
                        aria-label={`Select ${color.name} color`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Size */}
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-lg text-black">Size:</span>
                  <div className="flex gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1 text-sm border rounded transition-all duration-200 hover:scale-105 ${
                          selectedSize === size
                            ? "bg-red-500 text-white border-red-500"
                            : "bg-white text-black border-gray-300 hover:border-gray-400"
                        }`}
                        aria-label={`Select size ${size}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quantity and Buy Button */}
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-lg border-x border-gray-300 min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-lg hover:bg-gray-50 transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-red-500 text-white py-3 px-8 rounded hover:bg-red-600 active:bg-red-700 transition-colors transform hover:scale-105 active:scale-95"
                >
                  Buy Now
                </button>

                <button
                  onClick={handleWishlistToggle}
                  className={`p-3 border rounded transition-all duration-200 hover:scale-105 ${
                    isWishlisted ? "border-red-500 bg-red-50 text-red-500" : "border-gray-300 hover:bg-gray-50"
                  }`}
                  aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <svg
                    className="w-5 h-5"
                    fill={isWishlisted ? "currentColor" : "none"}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>

              {/* Delivery Information */}
              <div className="space-y-4 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-black">Free Delivery</div>
                    <div className="text-sm text-gray-600 underline cursor-pointer hover:text-gray-800 transition-colors">
                      Enter your postal code for Delivery Availability
                    </div>
                  </div>
                </div>

                <hr className="border-gray-200" />

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-black">Return Delivery</div>
                    <div className="text-sm text-gray-600 hover:text-gray-800 cursor-pointer transition-colors">
                      Free 30 Days Delivery Returns. Details
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
