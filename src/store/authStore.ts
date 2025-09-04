import { create } from "zustand";

interface User {
  _id: string;
  full_name: string;
  email: string;
  workspace_id?: string | null;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  signup: (data: {
    full_name: string;
    email: string;
    password: string;
    workspace_id?: string;
  }) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,
  signup: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Signup failed");
      set({ user: { _id: result.userId, full_name: data.full_name, email: data.email, workspace_id: data.workspace_id || null } });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },
}));




