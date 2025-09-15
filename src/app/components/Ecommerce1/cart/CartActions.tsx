"use client";
import Link from "next/link";
import toast from "react-hot-toast";
import { useState } from "react";

interface CartActionsProps {
  onUpdateCart: () => void;
}

export default function CartActions({ onUpdateCart }: CartActionsProps) {
  const [couponCode, setCouponCode] = useState("");

  const applyCoupon = () => {
    if (couponCode.trim() === "MYCOUPON123") toast.success("Coupon applied successfully!");
    else toast.error("Invalid coupon code.");
  };

  return (
    <div className="mt-8 ">

      <div className="flex justify-between mb-5 flex-col gap-2 md:flex-row">
              <button
        onClick={onUpdateCart}
        className="w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-md cursor-pointer text-gray-700 hover:bg-gray-200 transition-colors"
      >
        Update Cart
      </button>
      <Link
        href="/"
        className="w-full sm:w-auto text-center px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200 transition-colors"
      >
        Return To Shop
      </Link>
      </div>


      <div className="flex gap-5 flex-col md:flex-row">
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
  );
}
