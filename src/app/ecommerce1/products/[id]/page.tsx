'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import { useWorkspaceStore } from "@/store/workspaceStore"
import { useProductStore } from "@/store/productStore"
import { useParams } from "next/navigation"
import parse from "html-react-parser"
import ReletedProducts from "@/app/components/Ecommerce1/ReletedItems/ReletedItems"

export default function ProductPage() {
  const params = useParams()
  const productId = params.id // URL theke id
  const workspace = useWorkspaceStore((state) => state.workspace)
  const { products, fetchProducts } = useProductStore()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [product, setProduct] = useState<any>(null)
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [showAddedToCart, setShowAddedToCart] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  useEffect(() => {
    if (workspace?._id) {
      fetchProducts(workspace._id)
    }
  }, [workspace, fetchProducts])

  useEffect(() => {
    if (products?.length) {
      const p = products.find((p) => p._id === productId)
      setProduct(p)
      if (p?.color) setSelectedColor(p.color.label)
      if (p?.size) setSelectedSize(p.size.label)
    }
  }, [products, productId])

  if (!product) return <div className="p-8 text-center text-gray-500">Loading product...</div>
  const productImages = product.attachments.length
    ? product.attachments
    : ["/placeholder.svg"] 
  const colors = product.color ? [{ name: product.color.label, value: product.color.value, border: product.color.value }] : []
  const sizes = product.size ? [product.size.value] : []
  const handleAddToCart = () => {
    setShowAddedToCart(true)
    setTimeout(() => setShowAddedToCart(false), 3000)
  }

  const handleWishlistToggle = () => setIsWishlisted(!isWishlisted)

  return (
    <div className="min-h-screen bg-white">
      {showAddedToCart && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse">
          Added to cart successfully!
        </div>
      )}

      {/* Breadcrumb */}
      <div className="px-4 py-4 text-sm text-gray-500 container mx-auto">
        <span className="hover:text-gray-700 cursor-pointer">Account</span>
        <span className="mx-2">/</span>
        <span className="hover:text-gray-700 cursor-pointer">{product.categories?.[0]?.label || "Category"}</span>
        <span className="mx-2">/</span>
        <span className="text-black">{product.item_name}</span>
      </div>

      <div className="px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="flex gap-4">
            <div className="flex flex-col gap-4">
  {productImages.slice(1).map((image: string, index: number) => (
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


              <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-50 transition-colors">
                <Image
                  src={productImages[selectedImageIndex] || "/placeholder.svg"}
                  alt={product.item_name}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <h1 className="text-2xl font-semibold text-black mb-2">{product.item_name}</h1>
              <div className="text-2xl font-normal text-black">${product.selling_price}</div>
              <div className="text-sm text-gray-600">{product.item_description}</div>
              {product.item_long_description && (
                <div className="text-sm text-gray-600">{parse(product.item_long_description)}</div>
              )}

              {/* Colors */}
              {colors.length > 0 && (
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
                        style={{ backgroundColor: color.value, borderColor: color.border }}
                        aria-label={`Select ${color.name} color`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size */}
              {sizes.length > 0 && (
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-lg text-black">Size:</span>
                  <div className="flex gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1 text-sm border rounded transition-all duration-200 hover:scale-105 ${
                          selectedSize === size ? "bg-red-500 text-white border-red-500" : "bg-white text-black border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & Buttons */}
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-lg border-x border-gray-300 min-w-[60px] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-lg hover:bg-gray-50 transition-colors"
                  >
                    +
                  </button>
                </div>

                <button

                  onClick={handleAddToCart}
                  className="flex-1 cursor-pointer bg-red-500 text-white py-3 px-8 rounded hover:bg-red-600 transition-colors"
                >
                  Buy Now
                </button>

                <button
                  onClick={handleWishlistToggle}
                  className={`p-3 border rounded transition-all duration-200 hover:scale-105 ${
                    isWishlisted ? "border-red-500 bg-red-50 text-red-500" : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  ❤️
                </button>
              </div>

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
      <ReletedProducts products={products || [] } />
    </div>
  )
}
