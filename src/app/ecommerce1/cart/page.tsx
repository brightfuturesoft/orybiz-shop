"use client";

import { CartActions, CartItemRow, CartTotals } from "@/app/components/Ecommerce1";
import { CartItem } from "@/app/types/checkout";
import { useAuthStore } from "@/store/loginStore";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const store_user = useAuthStore((state) => state.user);
  const [isPosting, setIsPosting] = useState(false);


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

   const handleProceedToCheckout = async () => {
    if (!store_user) return toast.error("Please login first to proceed to checkout");
    if (!cartItems.length) return toast.error("Your cart is empty!");
    setIsPosting(true);
  const filteredCart = cartItems.map(item => ({
  product_id: item._id,
  user_id:store_user._id,
  user_name:store_user.full_name,
  user_email:store_user?.email,
  product_name: item.item_name,
  sku: item.sku || "",
  quantity: item.quantity,
  order_price: parseFloat(item.selling_price),
  cover_photo: item.variants?.[0]?.cover_photo || item.attachments?.[0] || "",
}));
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filteredCart),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save cart");
      }

      if (res.ok) {
      toast.success("Cart saved successfully!");
      router.push("/ecommerce1/cart/checkout");
      }

     
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsPosting(false);
    }
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
            <CartTotals isPosting={isPosting} handleProceedToCheckout={handleProceedToCheckout} subtotal={subtotal} total={total} />
          </div>
        </div>
      </div>
    </div>
  );
}
