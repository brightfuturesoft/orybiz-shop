"use client";
import Link from "next/link";

interface CartTotalsProps {
  subtotal: number;
  total: number;
}

export default function CartTotals({ subtotal, total }: CartTotalsProps) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl mb-4">Cart Total</h2>
      <div className="space-y-4">
        <div className="flex justify-between border-b pb-2">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span>Shipping:</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between pt-4 text-lg">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      <Link
        href="/ecommerce1/cart/checkout"
        className="w-full mt-6 py-3 bg-red-500 text-white cursor-pointer hover:bg-red-600 transition-colors block text-center rounded-md"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
}
