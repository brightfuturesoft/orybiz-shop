"use client"

export default function Breadcrumb() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10 border-gray-200">
      <div className="container mx-auto">
        <nav className="text-sm text-gray-500">
          <span>Home</span>
          <span className="mx-2">/</span>
          <span>cart</span>
          <span className="mx-2">/</span>
          <span className="text-black font-medium">CheckOut</span>
        </nav>
      </div>
    </div>
  )
}
