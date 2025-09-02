import { AppDataType } from "@/app/context/AppDataContext";
import { create } from "zustand";

type WorkspaceState = {
  workspace: AppDataType | null;
  loading: boolean;
  error: string | null;
  fetchWorkspace: () => Promise<void>;
};

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  workspace: null,
  loading: false,
  error: null,
  fetchWorkspace: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`/api/workspace`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch workspace");
      const data: AppDataType = await res.json();
      set({ workspace: data, loading: false, error: null });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      set({ workspace: null, loading: false, error: err.message });
    }
  },
}));
