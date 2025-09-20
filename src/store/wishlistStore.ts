/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface WishlistItem {
  _id?: string;
  user_id?: string;
  product_id: string;
  created_at?: string;
  [key: string]: any;
}

type WishlistState = {
  wishlist: WishlistItem[] | null;
  loading: boolean;
  error: string | null;
  success: boolean;
  addToWishlist: (item: WishlistItem) => Promise<void>;
  fetchWishlist: (user_id: string) => Promise<void>;
  removeFromWishlist: (wishlistId: string) => Promise<void>;
};

export const useWishlistStore = create<WishlistState>((set) => ({
  wishlist: null,
  loading: false,
  error: null,
  success: false,

  addToWishlist: async (item: WishlistItem) => {
    set({ loading: true, error: null, success: false });
    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to add to wishlist");
      }

      set({ loading: false, error: null, success: true });
    } catch (err: any) {
      console.error(err);
      set({ loading: false, error: err.message, success: false });
    }
  },

  fetchWishlist: async (user_id: string) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`/api/wishlist?user_id=${user_id}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch wishlist");

      const data: { wishlist: WishlistItem[] } = await res.json();
      set({ wishlist: data.wishlist, loading: false, error: null });
    } catch (err: any) {
      console.error(err);
      set({ wishlist: null, loading: false, error: err.message });
    }
  },

  removeFromWishlist: async (wishlistId: string) => {
    set({ loading: true, error: null, success: false });
    try {
      const res = await fetch(`/api/wishlist?id=${wishlistId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to remove from wishlist");
      }

      set({ success: true, loading: false });
    } catch (err: any) {
      console.error(err);
      set({ loading: false, error: err.message, success: false });
    }
  },
}));
