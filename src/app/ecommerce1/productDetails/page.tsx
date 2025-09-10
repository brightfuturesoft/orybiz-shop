/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useWorkspaceStore } from "@/store/workspaceStore"
import { useCategoryStore } from "@/store/categoriesStore"
import { useProductStore } from "@/store/productStore"
import { useBrandStore } from "@/store/brandStore"
import {
  StarIcon,
  XMarkIcon,
  Squares2X2Icon,
  Bars3Icon,
  FunnelIcon,
  ShoppingCartIcon,
  HeartIcon,
} from "@heroicons/react/24/outline"
import Slider from "rc-slider"
import "rc-slider/assets/index.css"
import toast from "react-hot-toast"

// TypeScript Interfaces
interface Product {
  _id: string
  item_name: string
  variants?: {
    cover_photo?: string[]
    offer_price?: number
    normal_price?: number
    sku?: string
    color?: string
    size?: string
  }[]
  selling_price?: number
  purchasing_price?: number
  selling_discount?: number
  categories?: { label: string }[]
  brand?: { label: string }
  rating?: number
}

interface Category {
  _id: string
  name: string
  parentId?: string
  children?: Category[]
}

interface Brand {
  brand: string
}

// Star Rating Component
interface StarRatingProps {
  rating: number
  size?: string
}
const StarRating: React.FC<StarRatingProps> = ({ rating, size = "w-4 h-4" }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <StarIcon
        key={star}
        className={`${size} ${star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
        aria-hidden="true"
      />
    ))}
  </div>
)

interface RatingFilterProps {
  rating: number
  selected: boolean
  onClick: () => void
}
const RatingFilter: React.FC<RatingFilterProps> = ({ rating, selected, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 p-1.5 rounded-md transition-colors w-full text-left ${
      selected ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100 text-gray-700"
    }`}
  >
    <div className="flex-1 flex items-center gap-2">
      <StarRating rating={rating} />
      <span className="text-sm font-medium">({rating} & up)</span>
    </div>
    {selected && <XMarkIcon className="h-4 w-4 text-blue-700" aria-hidden="true" />}
  </button>
)

export default function ProductListingPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("query") || ""

  const workspace = useWorkspaceStore((state) => state.workspace)
  const { categories: fetchedCategories, fetchCategories } = useCategoryStore()
  const { products: fetchedProducts, fetchProducts } = useProductStore()
  const { brands: fetchedBrands, fetchBrands } = useBrandStore()

  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [priceRange, setPriceRange] = useState<number[]>([10, 5000])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedRatings, setSelectedRatings] = useState<number[]>([])
  const [sortBy, setSortBy] = useState<string>("Best Match")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({})

  const router = useRouter()

  // Fetch Data
  useEffect(() => {
    if (workspace?._id) {
      fetchCategories(workspace._id)
      fetchProducts(workspace._id)
      fetchBrands(workspace._id)
    }
  }, [workspace, fetchCategories, fetchProducts, fetchBrands])

  // Build Nested Categories
  const buildNestedCategories = (categories: Category[]): Category[] => {
    const map: Record<string, Category> = {}
    const roots: Category[] = []
    categories.forEach((cat) => (map[cat._id] = { ...cat, children: [] }))
    categories.forEach((cat) => {
      if (cat.parentId) {
        map[cat.parentId]?.children?.push(map[cat._id])
      } else roots.push(map[cat._id])
    })
    return roots
  }

  const toggleCollapse = (id: string) => {
    setCollapsedCategories((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const renderCategories = (categories: Category[], level: number = 0) =>
    categories.map((cat) => (
      <div key={cat._id} className="flex flex-col">
        <div className="flex items-center">
          {cat.children && cat.children.length > 0 && (
            <button
              onClick={() => toggleCollapse(cat._id)}
              className="text-gray-500 hover:text-gray-900 transition-colors p-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 transform transition-transform ${
                  collapsedCategories[cat._id] ? "rotate-90" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
          <button
            className={`text-left p-2 rounded-md transition-colors flex-1 text-sm font-medium ${
              selectedCategory === cat.name
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setSelectedCategory(cat.name)}
            style={{ marginLeft: level * 8 }}
          >
            {cat.name}
          </button>
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            collapsedCategories[cat._id] ? "max-h-96" : "max-h-0"
          }`}
        >
          {cat.children && cat.children.length > 0 && renderCategories(cat.children, level + 1)}
        </div>
      </div>
    ))

  const nestedCategories = useMemo(() => buildNestedCategories(fetchedCategories || []), [fetchedCategories])

  // Products & Brands
  const products = useMemo(
    () =>
      fetchedProducts?.map((p) => ({
        id: p._id,
        title: p.item_name,
        image: p.variants?.[0]?.cover_photo?.[0] || "/placeholder.svg",
        currentPrice: p.variants?.[0]?.offer_price || p.selling_price || 0,
        originalPrice: p.variants?.[0]?.normal_price || p.purchasing_price || 0,
        discount: p.selling_discount || 0,
        category: p.categories?.[0]?.label || "Uncategorized",
        brand: p.brand?.label || "Unknown",
        rating:  4,
        variants: p.variants,
      })) || [],
    [fetchedProducts]
  )

  const brands = useMemo(() => fetchedBrands?.map((b) => b.brand) || [], [fetchedBrands])

  const maxPrice = useMemo(() => Math.max(...products.map((p) => Number(p.currentPrice))) || 5000, [products])
  const minPrice = useMemo(() => Math.min(...products.map((p) => Number(p.currentPrice))) || 10, [products])
  const [localPriceRange, setLocalPriceRange] = useState<number[]>([minPrice, maxPrice])

  useEffect(() => {
    setLocalPriceRange([minPrice, maxPrice])
    setPriceRange([minPrice, maxPrice])
  }, [minPrice, maxPrice])

  // Filters
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products
    if (selectedCategory) filtered = filtered.filter((p) => p.category === selectedCategory)
    filtered = filtered.filter(
      (p) => Number(p.currentPrice) >= Number(priceRange[0]) && Number(p.currentPrice) <= Number(priceRange[1])
    )
    if (selectedBrands.length) filtered = filtered.filter((p) => selectedBrands.includes(p.brand))
    if (selectedRatings.length) filtered = filtered.filter((p) => selectedRatings.includes(p.rating))
    if (query.trim()) {
      const words = query.toLowerCase().split(" ")
      filtered = filtered.filter((p) => words.every((w) => p.title.toLowerCase().includes(w)))
    }
    const sorted = [...filtered]
    switch (sortBy) {
      case "Price: Low to High":
        sorted.sort((a, b) => Number(a.currentPrice) - Number(b.currentPrice))
        break
      case "Price: High to Low":
        sorted.sort((a, b) => Number(b.currentPrice) - Number(a.currentPrice))
        break
      case "Newest First":
        sorted.sort((a, b) => b.id.localeCompare(a.id))
        break
      default:
        sorted.sort((a, b) => b.rating - a.rating)
    }

    return sorted
  }, [products, selectedCategory, priceRange, selectedBrands, selectedRatings, sortBy, query])

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    )
  }

  const toggleRating = (rating: number) => {
    setSelectedRatings((prev) =>
      prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]
    )
  }
  const clearAllFilters = () => {
    setSelectedCategory("")
    setSelectedBrands([])
    setSelectedRatings([])
    setPriceRange([minPrice, maxPrice])
    setLocalPriceRange([minPrice, maxPrice])
    router.replace("/ecommerce1/productdetails")
  }

  // Cart & Wishlist Handlers
  const handleAddToCart = (product: any) => {
    const cartItem = {
      _id: product.id,
      product_name: product.title,
      product_image: product.image,
      quantity: 1,
      order_price: product.currentPrice,
    }
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]")
    if (!existingCart.some((item: any) => item._id === product.id)) {
      localStorage.setItem("cart", JSON.stringify([...existingCart, cartItem]))
      window.dispatchEvent(new Event("cartUpdated"))
      toast.success(`${product.title} added to cart!`)
    } else {
      toast.error("Product already in cart!")
    }
  }

  const handleAddToWishlist = (product: any) => {
    const wishlistItem = {
      _id: product.id,
      product_name: product.title,
      product_image: product.image,
      quantity: 1,
    }
    const existingWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
    if (!existingWishlist.some((item: any) => item._id === product.id)) {
      localStorage.setItem("wishlist", JSON.stringify([...existingWishlist, wishlistItem]))
      window.dispatchEvent(new Event("wishlistUpdated"))
      toast.success(`${product.title} added to wishlist!`)
    } else {
      toast.error("Product already in wishlist!")
    }
  }

  const handleBuyNow = (product: any) => {
    if (!product) return
    const variant = product.variants?.[0] || {}
    const quantity = 1

    const cartItem = {
      _id: product.id,
      product_name: product.title,
      product_image: product.image,
      sku: variant.sku || "",
      quantity,
      order_price: variant.offer_price || product.currentPrice,
      variation: {
        color: variant.color || "",
        size: variant.size || "",
      },
    }

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]")
    localStorage.setItem("cart", JSON.stringify([...existingCart, cartItem]))
    window.dispatchEvent(new Event("cartUpdated"))
    router.push("/ecommerce1/cart/checkout")
  }

  return (
    <div className="flex min-h-screen bg-gray-50 container mx-auto">
      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 lg:hidden transition-opacity duration-300 ease-in-out ${
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 w-80 bg-white border-r border-gray-200 overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6 h-full flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-2xl text-gray-800">Filters</h2>
            <button className="lg:hidden p-2 text-gray-500 hover:text-gray-900" onClick={() => setSidebarOpen(false)}>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <button
            className="text-sm font-medium text-red-600 hover:underline transition-colors w-max"
            onClick={clearAllFilters}
          >
            Clear All Filters
          </button>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-800">Category</h3>
            <div className="flex flex-col gap-1">{renderCategories(nestedCategories)}</div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-800">Price Range</h3>
            <div className="px-2">
              <Slider
                range
                min={minPrice}
                max={maxPrice}
                value={localPriceRange}
                onChange={(value) => setLocalPriceRange(value as number[])}
                onAfterChange={(value: any) => setPriceRange(value)}
                trackStyle={{ backgroundColor: "#2563EB", height: 4 }}
                handleStyle={{
                  borderColor: "#2563EB",
                  height: 16,
                  width: 16,
                  marginTop: -6,
                  backgroundColor: "white",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
                railStyle={{ backgroundColor: "#E5E7EB", height: 4 }}
              />
              <div className="flex justify-between text-sm mt-2 font-medium text-gray-700">
                <span>${localPriceRange[0]}</span>
                <span>${localPriceRange[1]}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-800">Brands</h3>
            <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-2">
              {brands.map((brand) => (
                <label key={brand} className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition-colors">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="font-medium">{brand}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-800">Rating</h3>
            <div className="flex flex-col gap-2">
              {[5, 4, 3, 2, 1].map((r) => (
                <RatingFilter
                  key={r}
                  rating={r}
                  selected={selectedRatings.includes(r)}
                  onClick={() => toggleRating(r)}
                />
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6">
        {/* Top Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <button
            className="lg:hidden p-2.5 flex items-center gap-2 border rounded-lg text-gray-700 bg-white shadow-sm"
            onClick={() => setSidebarOpen(true)}
          >
            <FunnelIcon className="h-5 w-5" aria-hidden="true" />
            <span className="font-medium">Filters</span>
          </button>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm text-gray-600 font-medium">
                Sort by:
              </label>
              <select
                id="sort"
                className="border border-gray-300 rounded-md p-2 text-sm text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option>Best Match</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button
                className={`p-2 rounded-md transition-colors ${viewMode === "grid" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-200"}`}
                onClick={() => setViewMode("grid")}
              >
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                className={`p-2 rounded-md transition-colors ${viewMode === "list" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-200"}`}
                onClick={() => setViewMode("list")}
              >
                <Bars3Icon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}>
          {filteredAndSortedProducts.map((product) => (
            <div
              key={product.id}
              className={`bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer ${
                viewMode === "list" ? "flex flex-col sm:flex-row" : "flex flex-col"
              }`}
            >
              {/* Image */}
              <div className={`relative ${viewMode === "list" ? "sm:w-60 flex-shrink-0" : ""}`}>
                <img
                  src={product.image}
                  alt={product.title}
                  className={`w-full h-48 object-cover transition-transform duration-300 ${
                    viewMode === "list" ? "sm:h-48" : "sm:h-56"
                  } hover:scale-105`}
                />
                {Number(product.discount) > 0 && (
                  <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                    -{product.discount}%
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-2">
                    {product.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl font-extrabold text-blue-600">
                      ${Number(product.currentPrice).toFixed(2)}
                    </span>
                    {Number(product.originalPrice) > Number(product.currentPrice) && (
                      <span className="text-sm text-gray-500 line-through">
                        ${Number(product.originalPrice).toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <StarRating rating={product.rating} />
                  <span className="text-xs text-gray-500 font-medium">{product.brand}</span>
                </div>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleBuyNow(product)}
                    className="flex-1 cursor-pointer bg-blue-600 text-sm text-white py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
                  >
                    Buy Now
                  </button>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 cursor-pointer flex items-center justify-center gap-1 bg-gray-800 text-white py-2 rounded-md font-medium hover:bg-gray-900 transition-colors"
                  >
                    <ShoppingCartIcon className="h-5 w-5" />
               
                  </button>
                  <button
                    onClick={() => handleAddToWishlist(product)}
                    className="flex-1 cursor-pointer flex items-center justify-center gap-1 bg-red-500 text-white py-2 rounded-md font-medium hover:bg-red-600 transition-colors"
                  >
                    <HeartIcon className="h-5 w-5" />
                 
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
