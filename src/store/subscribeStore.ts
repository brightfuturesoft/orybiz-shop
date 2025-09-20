/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
interface Subscription {
  _id?: string;
  email: string;
  status: string;
  workspace_id?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

type SubscriptionState = {
  subscriptions: Subscription[] | null;
  loading: boolean;
  error: string | null;
  success: boolean;
  postSubscription: (data: { email: string; workspace_id?: string }) => Promise<void>;
  fetchSubscriptions: (workspace_id: string) => Promise<void>;
};

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  subscriptions: null,
  loading: false,
  error: null,
  success: false,

  postSubscription: async (data: { email: string; workspace_id?: string }) => {
    set({ loading: true, error: null, success: false });
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to subscribe");
      }
      set({ loading: false, error: null, success: true });
    } catch (err: any) {
      console.error(err);
      set({ loading: false, error: err.message, success: false });
    }
  },

  fetchSubscriptions: async (workspace_id: string) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`/api/subscribe?workspaceId=${workspace_id}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch subscriptions");
      const data: { subscriptions: Subscription[] } = await res.json();
      set({ subscriptions: data.subscriptions, loading: false, error: null });
    } catch (err: any) {
      console.error(err);
      set({ subscriptions: null, loading: false, error: err.message });
    }
  },
}));
