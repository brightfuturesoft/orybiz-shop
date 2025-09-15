'use client';

import { useCategoryStore } from "@/store/categoriesStore";
import { useProductStore } from "@/store/productStore";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { useEffect } from "react";
import { Category } from "./types/types";
import { Product } from "./types/product";
import { BannerSection, BestSellingProduct, BrowseByCategory, ExploreProducts, ExploreService, MusicSection } from "./components/Ecommerce1";

export default function Page() {
  const workspace = useWorkspaceStore((state) => state.workspace);
  const { categories, fetchCategories } = useCategoryStore();
  const { products, fetchProducts } = useProductStore();
  useEffect(() => {
    if (workspace?._id) {
      fetchCategories(workspace._id);
      fetchProducts(workspace._id);
    }
  }, [workspace, fetchCategories, fetchProducts]);

  // Categories map
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

const productItems: Product[] = (products || []).filter(
  (p) => p.item_type === "product"
);

const serviceItems: Product[] = (products || []).filter(
  (p) => p.item_type === "service"
);

  return (
    <div>
      <BannerSection/>
      <BrowseByCategory categories={mappedCategories}/>
      <div className="container my-5 h-[2px] mx-auto bg-gray-500 opacity-30"></div>
      <BestSellingProduct products={productItems || []} />
      <div className="container my-5 h-[2px] mx-auto bg-gray-500 opacity-30"></div>
      <ExploreProducts  products={productItems || []}/>
      <div className="container my-5 h-[2px] mx-auto bg-gray-500 opacity-30"></div>
      <MusicSection />
      <div className="container my-5 h-[2px] mx-auto bg-gray-500 opacity-30"></div>
      <ExploreService products={serviceItems || []}/>
    </div>
  );
}
