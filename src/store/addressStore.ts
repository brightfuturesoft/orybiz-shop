/* eslint-disable @typescript-eslint/no-explicit-any */
import { Address } from "@/app/types/types";
import { create } from "zustand";

type address_state = {
  address: Address[] | null;
  loading: boolean;
  error: string | null;
  fetchAddress: (workspaceId: string, user_id:string) => Promise<void>;
  updateAddress: (addressId: string, data: Partial<Address>) => Promise<void>;

};

export const useAddressStore = create<address_state>((set) => ({
  address: null,
  loading: false,
  error: null,
  fetchAddress: async (workspace_id: string, user_id: string) => {
  set({ loading: true, error: null });
  try {
    let url = `/api/address?workspace_id=${workspace_id}`;
    if (user_id) url += `&user_id=${user_id}`; 
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch address");

    const data: { address: Address[] } = await res.json();
    set({ address: data.address, loading: false, error: null });
  } catch (err: any) {
    console.error(err);
    set({ address: null, loading: false, error: err.message });
  }
},

updateAddress: async (addressId: string, updateData: Partial<Address>) => {
  set({ loading: true, error: null });
  try {
    const res = await fetch(`/api/address?address_id=${addressId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to update address");
    }

    const data = await res.json(); // { address: Address }
    const updated: Address = data.address;

    // ✅ UI update instantly
    set((state) => ({
      address: state.address?.map((addr) => (addr._id === updated._id ? updated : addr)) || [updated],
      loading: false,
    }));
  } catch (err: any) {
    set({ loading: false, error: err.message });
  }
}



}));
