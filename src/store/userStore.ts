import { create } from "zustand";

interface User {
  _id: string;
  full_name: string;
  email: string;
  workspace_id?: string;
}

interface UserStore {
  user: User | null;
  loading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
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
      const res = await fetch("/api/user", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch user");
      const data = await res.json();
      set({ user: data.user, loading: false });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));
