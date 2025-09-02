"use client";
import { useEffect } from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { useCategoryStore } from "@/store/categoriesStore";

interface Category {
  _id: string;
  name: string;
  parentId?: string;
  level: number;
  children?: Category[];
  image?: string;
  code?: string;
  description?: string;
  status?: string;
  path?: string;
  workspace_id?: string;
  created_by?: string;
}

const BannerSection = () => {
  const workspace = useWorkspaceStore((state) => state.workspace);
  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    if (workspace?._id) {
      fetchCategories(workspace._id);
    }
  }, [workspace, fetchCategories]);

  // Map CategoryType[] to Category[]
const mappedCategories: Category[] = (categories || []).map((cat) => ({
  _id: cat._id,
  name: cat.name,
  parentId: cat .parentId, 
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
    <div className="flex p-4 container mx-auto flex-col md:flex-row">

        <Sidebar categoryTree={categoryTree}/>
      <div className="flex-1 ml-4">
        <MainContent />
      </div>
    </div>
  );
};

export default BannerSection;
