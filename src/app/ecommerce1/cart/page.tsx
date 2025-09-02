"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {  Trash2 } from "lucide-react";
import toast from "react-hot-toast";

interface CartItem {
  _id: string;
  item_name: string;
  selling_price: string;
  quantity: number;
  attachments?: string[];
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItems(savedCart);
    } catch (e) {
      console.error("Failed to parse cart from localStorage", e);
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

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.selling_price) * item.quantity,
    0
  );
  const shipping = 0;
  const total = subtotal + shipping;

  const handleUpdateCart = () => {
    toast.success('Cart updated successfully!');
  };

  const applyCoupon = () => {
    // Example coupon logic
    if (couponCode.trim() === 'MYCOUPON123') {
        toast.success('Coupon applied successfully!');
    } else {
        toast.error('Invalid coupon code.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <span>/</span>
            <span className="text-gray-900">Cart</span>
          </div>
        </nav>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500">Your cart is empty.</p>
            <Link
              href="/"
              className="mt-4 inline-block bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
            >
              Go Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Table Headers */}
                <div className="hidden sm:grid grid-cols-5 p-4 text-gray-500 font-medium border-b border-gray-200">
                  <span className="col-span-2">Product</span>
                  <span className="text-start">Price</span>
                  <span className="text-start">Quantity</span>
                  <span className="text-center">Subtotal</span>
                </div>

                {/* Cart Item Rows */}
                {cartItems.map(item => (
                  <div key={item._id} className="flex flex-col sm:flex-row items-center justify-between p-4 border-b border-gray-200 last:border-b-0">
                    {/* Product Info */}
                    <div className="flex items-center gap-4 w-full sm:w-2/5 mb-4 sm:mb-0">
                      <Image
                        src={item.attachments?.[0] || "/placeholder.svg"}
                        alt={item.item_name}
                        width={64}
                        height={64}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex flex-col">
                        <h3 className="font-medium text-gray-900">{item.item_name}</h3>
                        <button
                          onClick={() => removeItem(item._id)}
                          className="text-red-500 text-xs mt-1 hover:underline text-left sm:hidden"
                        >
                          <Trash2/>
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="w-full sm:w-1/5 text-center text-gray-600 mb-2 sm:mb-0">
                      ${Number(item.selling_price).toFixed(2)}
                    </div>
                    
                    {/* Quantity */}
                    <div className="w-full sm:w-1/5 flex justify-center mb-4 sm:mb-0">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="px-3 py-1 text-gray-500 hover:text-red-500"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          readOnly
                          className="w-12 text-center bg-transparent focus:outline-none"
                        />
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="px-3 py-1 text-gray-500 hover:text-red-500"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    {/* Subtotal */}
                    <div className="w-full sm:w-1/5 text-center sm:text-right font-semibold text-gray-800">
                      ${(Number(item.selling_price) * item.quantity).toFixed(2)}
                    </div>
                    <button
                      onClick={() => removeItem(item._id)}
                      className="hidden sm:block text-red-500 hover:underline cursor-pointer ml-4 border-1 border-gray-300 p-2 rounded-md"
                    >
                        <Trash2/>
                    </button>
                  </div>
                ))}
              </div>

              {/* Action Buttons & Coupon */}
              <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
                <Link href="/" className="w-full sm:w-auto text-center px-6 py-3 border border-gray-300 rounded-md  text-gray-700 hover:bg-gray-200 transition-colors">
                  Return To Shop
                </Link>
                <button
                  onClick={handleUpdateCart}
                  className="w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-md cursor-pointer text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  Update Cart
                </button>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 w-full sm:w-auto px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button
                  onClick={applyCoupon}
                  className="w-full sm:w-auto px-6 py-3 bg-red-500 text-white cursor-pointer hover:bg-red-600 transition-colors"
                >
                  Apply Coupon
                </button>
              </div>
            </div>

            {/* Totals */}
            <div className="lg:col-span-1">
              <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
                <h2 className="text-xl  mb-4">Cart Total</h2>
                <div className="space-y-4">
                  <div className="flex justify-between border-b pb-2">
                    <span>Subtotal:</span>
                    <span className="">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Shipping:</span>
                    <span className="">Free</span>
                  </div>
                  <div className="flex justify-between pt-4 text-lg">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <button className="w-full mt-6 py-3 bg-red-500 text-white  cursor-pointer hover:bg-red-600 transition-colors">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}