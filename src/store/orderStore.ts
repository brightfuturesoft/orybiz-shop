/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
interface Order {
  items: { productId: string; quantity: number }[];
  customerName: string;
  address: string;
  [key: string]: any; 
}

type OrderState = {
  loading: boolean;
  error: string | null;
  success: boolean;
  postOrder: (orderData: Order) => Promise<void>;
};

export const useOrderStore = create<OrderState>((set) => ({
  loading: false,
  error: null,
  success: false,
  postOrder: async (orderData: Order) => {
    set({ loading: true, error: null, success: false });
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to post order");
      }

      set({ loading: false, error: null, success: true });
    } catch (err: any) {
      console.error(err);
      set({ loading: false, error: err.message, success: false });
    }
  },
}));
