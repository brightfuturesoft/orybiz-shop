/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface Product {
  product_id: string;
  product_name: string;
  quantity: number;
  order_price: number;
  variation?: any;
  product_image?: string;
}

interface DeliveryAddress {
  full_name: string;
  phone_number: string;
  street: string;
  city: string;
  state: string;
  postal_code?: string;
  country?: string;
}

interface Order {
  _id?: string;
  order_number: string;
  products: Product[];
  delivery_address: DeliveryAddress;
  total_amount: number;
  order_status: string;
  created_at: string;
  [key: string]: any;
}

type OrderState = {
  orders: Order[] | null;
  loading: boolean;
  error: string | null;
  success: boolean;
  postOrder: (orderData: Order) => Promise<void>;
  fetchOrders: (workspace_id: string, user_id?: string) => Promise<void>;
};

export const useOrderStore = create<OrderState>((set) => ({
  orders: null,
  loading: false,
  error: null,
  success: false,

  postOrder: async (orderData: Order) => {
    set({ loading: true, error: null, success: false });
    try {
      const res = await fetch("/api/order", {
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

 fetchOrders: async (workspace_id: string, user_id?: string) => {
    set({ loading: true, error: null });
    try {
      let url = `/api/order?workspace_id=${workspace_id}`;
      if (user_id) url += `&user_id=${user_id}`;

      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch orders");

      const data: { orders: Order[] } = await res.json();
      set({ orders: data.orders, loading: false, error: null });
    } catch (err: any) {
      console.error(err);
      set({ orders: null, loading: false, error: err.message });
    }
  },
}));
