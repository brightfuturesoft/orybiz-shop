'use client';
import { useWorkspaceStore } from "@/store/workspaceStore";
import { BannerSection, BestSellingProduct, BrowseByCategory, ExploreProducts, ExploreService, FeatureSection, MusicSection } from "../components/Ecommerce1";
import { useCategoryStore } from "@/store/categoriesStore";
import { useEffect } from "react";
import { Category } from "../types/types";






export default function HomePage() {
  const workspace = useWorkspaceStore((state) => state.workspace);
  const { categories, fetchCategories } = useCategoryStore();
  useEffect(() => {
    if (workspace?._id) {
      fetchCategories(workspace._id)}
  }, [workspace, fetchCategories]);

  const mappedCategories: Category[] = (categories || []).map(cat => ({
  _id: cat._id,
  name: cat.name,
  parentId: cat.parentId,
  level: cat.level ?? 0, // missing thakle default 0
  children: [],          // initially empty
  image: cat.image,
  code: cat.code,
  description: cat.description,
  status: cat.status,
  path: cat.path,
  workspace_id: cat.workspace_id,
  created_by: cat.created_by,
}));


  
  return (
    <div>
      <BannerSection/>
      <BrowseByCategory categories={mappedCategories}/>
      <div className="container my-5 h-[2px] mx-auto bg-gray-500 opacity-30"></div>
      <BestSellingProduct />
      <div className="container my-5 h-[2px] mx-auto bg-gray-500 opacity-30"></div>
      <ExploreProducts />
      <div className="container my-5 h-[2px] mx-auto bg-gray-500 opacity-30"></div>
      <MusicSection />
      <div className="container my-5 h-[2px] mx-auto bg-gray-500 opacity-30"></div>
      <ExploreService />
      <div className="container my-5 h-[2px] mx-auto bg-gray-500 opacity-30"></div>
      <FeatureSection />
    </div>
  );
}
