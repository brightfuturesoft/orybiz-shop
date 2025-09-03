"use client";

import { CartActions, CartItemRow, CartTotals } from "@/app/components/Ecommerce1";
import { CartItem } from "@/app/types/checkout";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItems(savedCart);
    } catch (e) {
      console.error(e);
      setCartItems([]);
    } finally {
      setLoading(false);
      window.dispatchEvent(new Event("cartUpdated"));
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
      window.dispatchEvent(new Event("cartUpdated"));
    }
  }, [cartItems, loading]);

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setCartItems(prev => prev.map(item => (item._id === id ? { ...item, quantity } : item)));
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item._id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + Number(item.selling_price) * item.quantity, 0);
  const total = subtotal;

  const handleUpdateCart = () => {
    toast.success("Cart updated successfully!");
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {cartItems.map(item => (
                <CartItemRow key={item._id} item={item} updateQuantity={updateQuantity} removeItem={removeItem} />
              ))}
            </div>
            <CartActions onUpdateCart={handleUpdateCart} />
          </div>
          <div className="lg:col-span-1">
            <CartTotals subtotal={subtotal} total={total} />
          </div>
        </div>
      </div>
    </div>
  );
}
