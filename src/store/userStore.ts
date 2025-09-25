/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

export interface User {
  _id: string;
  full_name: string;
  email: string;
  phone_number?: string;
  workspace_id?: string;
  [key: string]: any;
}

export interface UpdateUser {
  _id?: string;
  full_name: string;
  email: string;
  phone_number?: string;
  workspace_id?: string;
  [key: string]: any;
}

interface UserStore {
  user: User | null;
  loading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>; 
  setUser: (user: User | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  loading: false,
  error: null,

  setUser: (user) => set({ user }),

  fetchUser: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/user", {
        cache: "no-store",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch user");
      const data = await res.json();
      set({ user: data.user, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  updateUser: async (updateData: Partial<User>) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/user", {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update user");
      }

      const data = await res.json();
      set({ user: data.user, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));
