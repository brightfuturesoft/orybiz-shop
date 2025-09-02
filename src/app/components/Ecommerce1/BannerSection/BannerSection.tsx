"use client";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

interface Category {
  _id: string;
  name: string;
  parentId?: string;
  level: number;
  children?: Category[];
}

interface Props {
  workspaceId: string;
}

const BannerSection = ({ workspaceId }: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (!workspaceId) return;
    fetch(`/api/get-categories?workspaceId=${workspaceId}`)
      .then((res) => res.json())
      .then((data) => setCategories(data.data))
      .catch(console.error);
  }, [workspaceId]);

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

  const categoryTree = buildCategoryTree(categories);

  return (
    <div className="flex p-4 container mx-auto flex-col md:flex-row">
      <Sidebar categories={categoryTree} />
      <div className="flex-1 ml-4">
        <MainContent />
      </div>
    </div>
  );
};

export default BannerSection;
