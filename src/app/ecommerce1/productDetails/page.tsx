"use client"

import { useState, useMemo } from "react"

const brands = ["Samsung", "LG", "Sony", "Apple", "Dell", "HP", "Lenovo", "ASUS"]

const allProducts = [
  {
    id: 1,
    title: "AMD Ryzen 5 7600X 4.7 GHz Six-Core AM5 Tray Processor",
    image: "/amd-processor.jpg",
    currentPrice: 550,
    originalPrice: 1800,
    discount: 69,
    category: "TV, Audio / Video, Gaming & Wearables",
    brand: "AMD",
    rating: 4,
  },
  {
    id: 2,
    title: "Wall Clock Black Tree Birds Design - Purple Background",
    image: "/purple-wall-clock-with-tree-birds.jpg",
    currentPrice: 199,
    originalPrice: 690,
    discount: 71,
    category: "Furniture & Decor",
    brand: "Samsung",
    rating: 5,
  },
  {
    id: 3,
    title: "Self-Adhesive 3D Foam Brick Wall Tiles - White",
    image: "/white-brick-foam-tiles.jpg",
    currentPrice: 238,
    originalPrice: 290,
    discount: 18,
    category: "Furniture & Decor",
    brand: "LG",
    rating: 3,
  },
  {
    id: 4,
    title: "Wall Clock Black Tree Birds Design - Elegant Purple",
    image: "/purple-wall-clock-with-tree-birds.jpg",
    currentPrice: 199,
    originalPrice: 690,
    discount: 71,
    category: "Furniture & Decor",
    brand: "Sony",
    rating: 4,
  },
  {
    id: 5,
    title: "Decorative Wall Clock with Nature Theme",
    image: "/purple-wall-clock-with-tree-birds.jpg",
    currentPrice: 199,
    originalPrice: 690,
    discount: 71,
    category: "Furniture & Decor",
    brand: "Apple",
    rating: 5,
  },
  {
    id: 6,
    title: "Modern Wall Clock - Tree and Birds Pattern",
    image: "/purple-wall-clock-with-tree-birds.jpg",
    currentPrice: 199,
    originalPrice: 690,
    discount: 71,
    category: "Furniture & Decor",
    brand: "Dell",
    rating: 2,
  },
  {
    id: 7,
    title: "Self-Adhesive 3D Foam Wall Decoration Tiles",
    image: "/white-brick-foam-tiles.jpg",
    currentPrice: 238,
    originalPrice: 290,
    discount: 18,
    category: "Furniture & Decor",
    brand: "HP",
    rating: 4,
  },
  {
    id: 8,
    title: "Premium 3D Foam Brick Pattern Wall Tiles",
    image: "/white-brick-foam-tiles.jpg",
    currentPrice: 238,
    originalPrice: 290,
    discount: 18,
    category: "Furniture & Decor",
    brand: "Lenovo",
    rating: 3,
  },
  {
    id: 9,
    title: "Smart TV 55 inch 4K Ultra HD LED",
    image: "/amd-processor.jpg",
    currentPrice: 899,
    originalPrice: 1200,
    discount: 25,
    category: "TV, Audio / Video, Gaming & Wearables",
    brand: "Samsung",
    rating: 5,
  },
  {
    id: 10,
    title: "Wireless Bluetooth Headphones Premium",
    image: "/amd-processor.jpg",
    currentPrice: 150,
    originalPrice: 200,
    discount: 25,
    category: "TV, Audio / Video, Gaming & Wearables",
    brand: "Sony",
    rating: 4,
  },
  {
    id: 11,
    title: "Coffee Maker Automatic Drip Machine",
    image: "/amd-processor.jpg",
    currentPrice: 120,
    originalPrice: 180,
    discount: 33,
    category: "Home Appliances",
    brand: "LG",
    rating: 4,
  },
  {
    id: 12,
    title: "Air Fryer Digital Touch Screen 5.5L",
    image: "/amd-processor.jpg",
    currentPrice: 89,
    originalPrice: 150,
    discount: 41,
    category: "Home Appliances",
    brand: "ASUS",
    rating: 5,
  },
]

export default function ProductListingPage() {
  const [selectedCategory, setSelectedCategory] = useState("Furniture & Decor")
  const [priceRange, setPriceRange] = useState({ min: 10, max: 1800 })
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedRatings, setSelectedRatings] = useState<number[]>([])
  const [sortBy, setSortBy] = useState("Best Match")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const categories = ["Furniture & Decor", "Home Appliances", "TV, Audio / Video, Gaming & Wearables"]

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = allProducts.filter((product) => {
      // Category filter
      if (product.category !== selectedCategory) return false

      // Price filter
      if (product.currentPrice < priceRange.min || product.currentPrice > priceRange.max) return false

      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false

      // Rating filter
      if (selectedRatings.length > 0 && !selectedRatings.includes(product.rating)) return false

      return true
    })

    // Sort products
    switch (sortBy) {
      case "Price: Low to High":
        filtered.sort((a, b) => a.currentPrice - b.currentPrice)
        break
      case "Price: High to Low":
        filtered.sort((a, b) => b.currentPrice - a.currentPrice)
        break
      case "Newest First":
        filtered.sort((a, b) => b.id - a.id)
        break
      default: // Best Match
        filtered.sort((a, b) => b.rating - a.rating)
    }

    return filtered
  }, [selectedCategory, priceRange, selectedBrands, selectedRatings, sortBy])

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  const toggleRating = (rating: number) => {
    setSelectedRatings((prev) => (prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]))
  }

  const applyPriceFilter = () => {
    // Force re-render by updating the price range
    setPriceRange({ ...priceRange })
  }

  const clearAllFilters = () => {
    setSelectedBrands([])
    setSelectedRatings([])
    setPriceRange({ min: 10, max: 1800 })
  }

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= rating ? "text-orange-400 fill-current" : "text-gray-300"}`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 container mx-auto">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`
          fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        >
          <div className="p-6 space-y-6 h-full overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-medium text-gray-900">Furniture & Decor</h1>
              <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 hover:bg-gray-100 rounded-md">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Clear Filters */}
            <button onClick={clearAllFilters} className="text-sm text-red-600 hover:text-red-800 underline">
              Clear All Filters
            </button>

            {/* Category */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900">Category</h3>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`text-sm cursor-pointer p-2 rounded ${
                      selectedCategory === category
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                  >
                    {category}
                  </div>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900">Brands</h3>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">{brand}</span>
                  </label>
                ))}
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-800 mt-2">Show All</button>
            </div>

            {/* Price */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900">Price</h3>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Price Range Slider */}
              <div className="relative mb-4">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span>0</span>
                  <span>1800</span>
                </div>
                <div className="relative">
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-blue-600 rounded-full"
                      style={{
                        marginLeft: `${(priceRange.min / 1800) * 100}%`,
                        width: `${((priceRange.max - priceRange.min) / 1800) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <div
                    className="absolute top-0 w-4 h-4 bg-blue-600 rounded-full -mt-1 cursor-pointer"
                    style={{ left: `${(priceRange.min / 1800) * 100}%` }}
                  ></div>
                  <div
                    className="absolute top-0 w-4 h-4 bg-blue-600 rounded-full -mt-1 cursor-pointer"
                    style={{ left: `${(priceRange.max / 1800) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Min Max Inputs */}
              <div className="flex gap-2 mb-3">
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">Min</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange((prev) => ({ ...prev, min: Math.max(0, Number.parseInt(e.target.value) || 0) }))
                      }
                      className="w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">Max</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange((prev) => ({
                          ...prev,
                          max: Math.min(1800, Number.parseInt(e.target.value) || 1800),
                        }))
                      }
                      className="w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={applyPriceFilter}
                className="w-full py-2 px-4 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500"
              >
                Apply
              </button>
            </div>

            {/* Rating */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900">Rating</h3>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <label key={rating} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedRatings.includes(rating)}
                      onChange={() => toggleRating(rating)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div className="ml-2">
                      <StarRating rating={rating} />
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 hover:bg-gray-100 rounded-md">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <h2 className="text-lg font-medium text-gray-900">Products ({filteredAndSortedProducts.length})</h2>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Sort By:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-sm border-none bg-transparent focus:ring-0 text-gray-900 cursor-pointer"
                  >
                    <option>Best Match</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest First</option>
                  </select>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${viewMode === "grid" ? "bg-gray-100" : "hover:bg-gray-50"}`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${viewMode === "list" ? "bg-gray-100" : "hover:bg-gray-50"}`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="p-4 lg:p-6">
            {filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg mb-2">No products found</div>
                <div className="text-gray-400 text-sm">Try adjusting your filters</div>
              </div>
            ) : (
              <div
                className={`
                grid gap-4
                ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}
              `}
              >
                {filteredAndSortedProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer
                      ${viewMode === "list" ? "flex" : ""}
                    `}
                  >
                    <div className={`relative ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}>
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.title}
                        className={`object-cover ${viewMode === "list" ? "w-full h-32" : "w-full h-48"}`}
                      />
                      <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                        -{product.discount}%
                      </div>
                    </div>
                    <div className="p-4 flex-1">
                      <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">{product.title}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg font-bold text-green-600">₹{product.currentPrice}</span>
                        <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <StarRating rating={product.rating} />
                        <span className="text-xs text-gray-500">{product.brand}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
