/* eslint-disable @typescript-eslint/no-explicit-any */
import { Address } from "@/app/types/types";
import { create } from "zustand";

type AddressState = {
  address: Address[] | null;
  loading: boolean;
  error: string | null;
  fetchAddress: (workspaceId: string, userId: string) => Promise<void>;
  updateAddress: (addressId: string, data: Partial<Address>) => Promise<Address | null>;
  setAddress: (addresses: Address[] | null) => void;
};

export const useAddressStore = create<AddressState>((set, get) => ({
  address: null,
  loading: false,
  error: null,

  fetchAddress: async (workspaceId: string, userId: string) => {
    set({ loading: true, error: null });
    try {
      let url = `/api/address?workspace_id=${workspaceId}`;
      if (userId) url += `&user_id=${userId}`;

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
      const data = await res.json(); 
      const updated: Address = data.address;
      const currentAddresses = get().address || [];
      set({
        address: currentAddresses.map((addr) =>
          addr._id === updated._id ? updated : addr
        ),
        loading: false,
      });

      return updated;
    } catch (err: any) {
      set({ loading: false, error: err.message });
      return null;
    }
  },

  setAddress: (addresses) => set({ address: addresses }),
}));