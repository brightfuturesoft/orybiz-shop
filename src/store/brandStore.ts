import { BrandType } from "@/app/types/brand";
import { create } from "zustand";

type BrandState = {
  brands: BrandType[] | null;
  loading: boolean;
  error: string | null;
  fetchBrands: (workspaceId: string) => Promise<void>;
};

export const useBrandStore = create<BrandState>((set) => ({
  brands: null,
  loading: false,
  error: null,
  fetchBrands: async (workspaceId: string) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`/api/brands?workspaceId=${workspaceId}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch brands");

      const data: { brands: BrandType[] } = await res.json();
      set({ brands: data.brands, loading: false, error: null });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      set({ brands: null, loading: false, error: err.message });
    }
  },
}));
