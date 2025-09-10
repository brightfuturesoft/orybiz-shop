"use client"

import { useState } from "react"
import Image from "next/image"

interface Variant {
  color: string
  size: string
  quantity: number
  normal_price: number
  offer_price: number
  product_cost: number
  cover_photo: string[]
}

interface Product {
  item_name: string
  item_description: string
  item_long_description: string
  variants: Variant[]
}

interface Props {
  product: Product
}

export default function ProductPage({ product }: Props) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [showAddedToCart, setShowAddedToCart] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const selectedVariant = product.variants[selectedVariantIndex]

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
        <span className="hover:text-gray-700 cursor-pointer">Electronics</span>
        <span className="mx-2">/</span>
        <span className="text-black">{product.item_name}</span>
      </div>

      <div className="px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="flex gap-4">
              {/* Thumbnail Images */}
              <div className="flex flex-col gap-4">
                {selectedVariant.cover_photo.slice(1).map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedVariantIndex(index + 1)}
                    className={`w-20 h-20 bg-gray-100 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                      selectedVariantIndex === index + 1
                        ? "ring-2 ring-red-500 ring-offset-2"
                        : "hover:ring-2 hover:ring-gray-300"
                    }`}
                  >
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`Variant ${index + 2}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-50 transition-colors">
                <Image
                  src={selectedVariant.cover_photo[0] || "/placeholder.svg"}
                  alt={product.item_name}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-semibold text-black mb-2">{product.item_name}</h1>
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
                  <span className="text-sm text-green-500 ml-4">{selectedVariant.quantity > 0 ? "In Stock" : "Out of Stock"}</span>
                </div>
              </div>

              {/* Price */}
              <div className="text-2xl font-normal text-black">${selectedVariant.offer_price}</div>

              {/* Description */}
              <div
                className="text-sm text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.item_long_description }}
              />

              <hr className="border-gray-200" />

              {/* Colors */}
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-lg text-black">Colors:</span>
                  <div className="flex gap-2">
                    {product.variants.map((variant, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedVariantIndex(index)}
                        className={`w-5 h-5 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                          selectedVariantIndex === index ? "ring-2 ring-gray-400 ring-offset-2" : ""
                        }`}
                        style={{ backgroundColor: variant.color }}
                        aria-label={`Select color ${variant.color}`}
                      />
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
