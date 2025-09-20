/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
export interface Policy {
  _id: string;
  title: string;
  description: string;
  status: string;
  workspace_id: string;
  createdAt: string;
  updatedAt: string;
}

type PolicyState = {
  policies: Policy[] | null;
  loading: boolean;
  error: string | null;
  fetchPolicies: (workspaceId: string) => Promise<void>;
};

export const usePolicyStore = create<PolicyState>((set) => ({
  policies: null,
  loading: false,
  error: null,

  fetchPolicies: async (workspaceId: string) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`/api/policy?workspaceId=${workspaceId}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch policies");
      const data: { policies: Policy[] } = await res.json();
      set({ policies: data.policies, loading: false, error: null });
    } catch (err: any) {
      console.error(err);
      set({ policies: null, loading: false, error: err.message });
    }
  },
}));
