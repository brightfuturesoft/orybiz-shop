"use client"

import { useState } from "react"
import { Category } from "@/app/types/types"
import { ChevronRightIcon, ChevronDownIcon } from "lucide-react"
import { useRouter } from "next/navigation"

interface Props {
  categoryTree: Category[]
  isMobile?: boolean
}

const SidebarItem = ({
  category,
  isMobile = false,
}: {
  category: Category
  isMobile?: boolean
}) => {
  const router = useRouter()
  const hasChildren = category.children && category.children.length > 0
  const [open, setOpen] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isMobile && hasChildren) {
      setOpen((prev) => !prev)
    } else {
      router.push(`/ecommerce1/productdetails?category=${category._id}`)
    }
  }

  return (
    <li className={`relative ${!isMobile ? "group" : ""}`}>
      <button
        onClick={handleClick}
        className="w-full flex justify-between items-center py-2 px-6 text-gray-700 hover:text-red-500 transition-colors text-left"
      >
        <span>{category.name}</span>
        {hasChildren &&
          (isMobile ? (
            <ChevronDownIcon
              className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${
                open ? "rotate-180 text-red-500" : ""
              }`}
            />
          ) : (
            <ChevronRightIcon className="h-4 w-4 text-gray-400 group-hover:text-red-500 group-hover:rotate-90 transition-all duration-300" />
          ))}
      </button>

      {/* Desktop hover dropdown */}
      {!isMobile && hasChildren && (
        <div className="hidden group-hover:block absolute left-full top-0 w-64 bg-white border border-gray-200 shadow-lg py-2 z-50">
          <ul className="list-none m-0 p-0">
            {category.children!.map((child) => (
              <SidebarItem key={child._id} category={child} />
            ))}
          </ul>
        </div>
      )}

      {/* Mobile vertical dropdown */}
      {isMobile && open && hasChildren && (
        <ul className="pl-4 border-l border-gray-200">
          {category.children!.map((child) => (
            <SidebarItem key={child._id} category={child} isMobile />
          ))}
        </ul>
      )}
    </li>
  )
}

const Sidebar = ({ categoryTree, isMobile = false }: Props) => {
  return (
    <div className="bg-white border-r border-gray-200 md:w-64 flex-shrink-0">
      <ul className="py-4">
        {categoryTree.map((cat) => (
          <SidebarItem key={cat._id} category={cat} isMobile={isMobile} />
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
