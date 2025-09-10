"use client";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { useCategoryStore } from "@/store/categoriesStore";
import { Category } from "@/app/types/types";
import { Menu, X } from "lucide-react";

const BannerSection = () => {
  const workspace = useWorkspaceStore((state) => state.workspace);
  const { categories, fetchCategories } = useCategoryStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (workspace?._id) {
      fetchCategories(workspace._id);
    }
  }, [workspace, fetchCategories]);

  const mappedCategories: Category[] = (categories || []).map((cat) => ({
    _id: cat._id,
    name: cat.name,
    parentId: cat.parentId,
    level: cat.level ?? 0,
    children: [],
    image: cat.image,
    code: cat.code,
    description: cat.description,
    status: cat.status,
    path: cat.path,
    workspace_id: cat.workspace_id,
    created_by: cat.created_by,
  }));

  const buildCategoryTree = (categories: Category[]): Category[] => {
    const map = new Map<string, Category>();
    const roots: Category[] = [];
    categories.forEach((cat) => map.set(cat._id, { ...cat, children: [] }));
    categories.forEach((cat) => {
      if (cat.parentId && map.has(cat.parentId)) {
        map.get(cat.parentId)!.children!.push(map.get(cat._id)!);
      } else {
        roots.push(map.get(cat._id)!);
      }
    });
    return roots;
  };

  const categoryTree = buildCategoryTree(mappedCategories);

  return (
    <div className="container mx-auto p-4">
      {/* Mobile navbar with hamburger */}
      <div className="flex flex-col md:flex-row relative">
        <div className="w-full md:w-64 md:flex-shrink-0 md:mr-4">
          {/* Mobile Categories Header */}
          <div className="flex items-center justify-between md:hidden mb-2">
            <h2 className="text-lg font-bold">Categories</h2>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 border rounded-lg text-gray-700 hover:text-red-500 hover:border-red-500 transition-colors"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile dropdown */}
          <div
            className={`md:block overflow-hidden transition-max-h duration-300 ease-in-out ${
              sidebarOpen ? "max-h-[1000px]" : "max-h-0"
            }`}
          >
            <Sidebar categoryTree={categoryTree} isMobile={true}/>
          </div>

          {/* Desktop sidebar */}
          <div className="hidden md:block">
            <Sidebar categoryTree={categoryTree}   isMobile={false}/>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 mt-4 md:mt-0">
          <MainContent />
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
