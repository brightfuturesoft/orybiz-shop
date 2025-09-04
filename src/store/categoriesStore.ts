import { CategoryType } from "@/app/types/types";
import { create } from "zustand";


type CategoryState = {
  categories: CategoryType[] | null;
  loading: boolean;
  error: string | null;
  fetchCategories: (workspaceId: string) => Promise<void>;
};

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: null,
  loading: false,
  error: null,
  fetchCategories: async (workspaceId: string) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`/api/categories?workspaceId=${workspaceId}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data: { categories: CategoryType[] } = await res.json();
      set({ categories: data.categories, loading: false, error: null });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      set({ categories: null, loading: false, error: err.message });
    }
  },
}));
