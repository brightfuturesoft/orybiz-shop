/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface Review {
  _id?: string;
  user_id: string;
  product_id: string;
  rating: number;
  comment: string;
  created_at: string;
  [key: string]: any;
}

type ReviewState = {
  reviews: Review[] | null;
  loading: boolean;
  error: string | null;
  success: boolean;
  postReview: (reviewData: Review) => Promise<void>;
  fetchReviews: (product_id: string) => Promise<void>;
  fetchUserReviews: (user_id: string) => Promise<void>; // new method
};

export const useReviewStore = create<ReviewState>((set) => ({
  reviews: null,
  loading: false,
  error: null,
  success: false,

  postReview: async (reviewData: Review) => {
    set({ loading: true, error: null, success: false });
    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to post review");
      }

      set({ loading: false, error: null, success: true });
    } catch (err: any) {
      console.error(err);
      set({ loading: false, error: err.message, success: false });
    }
  },

  fetchReviews: async (product_id: string) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`/api/review?product_id=${product_id}`, {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed to fetch reviews");

      const data: { reviews: Review[] } = await res.json();
      set({ reviews: data.reviews, loading: false, error: null });
    } catch (err: any) {
      console.error(err);
      set({ reviews: null, loading: false, error: err.message });
    }
  },

  fetchUserReviews: async (user_id: string) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`/api/review?user_id=${user_id}`, {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed to fetch user reviews");

      const data: { reviews: Review[] } = await res.json();
      set({ reviews: data.reviews, loading: false, error: null });
    } catch (err: any) {
      console.error(err);
      set({ reviews: null, loading: false, error: err.message });
    }
  },
}));
