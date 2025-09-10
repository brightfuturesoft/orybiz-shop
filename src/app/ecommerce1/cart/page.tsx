/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/loginStore";
import { CartItem } from "@/app/types/checkout";
import { CartActions, CartItemRow, CartTotals } from "@/app/components/Ecommerce1";

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPosting, setIsPosting] = useState(false);
  const store_user = useAuthStore((state) => state.user);
  const router = useRouter();

  // Load cart from localStorage
  useEffect(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItems(savedCart);
    } catch (err) {
      console.error(err);
      setCartItems([]);
    } finally {
      setLoading(false);
      window.dispatchEvent(new Event("cartUpdated"));
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
      window.dispatchEvent(new Event("cartUpdated"));
    }
  }, [cartItems, loading]);

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) => (item._id === id ? { ...item, quantity } : item))
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.order_price * item.quantity, 0);
  const total = subtotal;

  const handleUpdateCart = () => toast.success("Cart updated successfully!");

  const handleProceedToCheckout = async () => {
    if (!cartItems.length) return toast.error("Your cart is empty!");
    setIsPosting(true);
    try {
      router.push("/ecommerce1/cart/checkout");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsPosting(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <CartItemRow
                  key={item._id}
                  item={item}
                  updateQuantity={updateQuantity}
                  removeItem={removeItem}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                Your cart is empty
              </div>
            )}
            <CartActions onUpdateCart={handleUpdateCart} />
          </div>

          <div className="lg:col-span-1">
            <CartTotals
              isPosting={isPosting}
              handleProceedToCheckout={handleProceedToCheckout}
              subtotal={subtotal}
              total={total}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
