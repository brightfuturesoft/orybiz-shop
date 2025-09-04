
import { Product } from "@/app/types/product";
import { create } from "zustand";

type ProductState = {
  products: Product[] | null;
  loading: boolean;
  error: string | null;
  fetchProducts: (workspaceId: string) => Promise<void>;
};

export const useProductStore = create<ProductState>((set) => ({
  products: null,
  loading: false,
  error: null,
  fetchProducts: async (workspaceId: string) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`/api/products?workspaceId=${workspaceId}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch products");
      const data: { products: Product[] } = await res.json();
      set({ products: data.products, loading: false, error: null });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      set({ products: null, loading: false, error: err.message });
    }
  },
}));
