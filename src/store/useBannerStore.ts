import { Banner } from "@/app/types/types";
import { create } from "zustand";


type BannerState = {
  banners: Banner[] | null;
  loading: boolean;
  error: string | null;
  fetchBanners: (workspaceId: string) => Promise<void>;
};

export const useBannerStore = create<BannerState>((set) => ({
  banners: null,
  loading: false,
  error: null,
  fetchBanners: async (workspaceId: string) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`/api/banner?workspace_id=${workspaceId}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch banners");
      const data: Banner[] = await res.json();
      set({ banners: data, loading: false, error: null });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      set({ banners: null, loading: false, error: err.message });
    }
  },
}));
