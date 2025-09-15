"use client";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { CartItem } from "@/app/types/checkout";

interface CartItemRowProps {
  item: CartItem;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
}

export default function CartItemRow({ item, updateQuantity, removeItem }: CartItemRowProps) {
  const variation = item.variation || { color: "", size: "" };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-b border-gray-200 last:border-b-0">
      {/* Product Info */}
      <div className="flex items-center gap-4 w-full sm:w-2/5 mb-4 sm:mb-0">
      <Image
  src={item.product_image || "/placeholder.svg"}
  alt={item.product_name || "Product Image"}
  width={64}
  height={64}
  className="w-16 h-16 object-cover rounded"
/>

        <div className="flex flex-col">
          <h3 className="font-medium text-gray-900">{item.product_name}</h3>
          <span className="text-gray-500 text-xs">
            Color: {variation.color || "-"} | Size: {variation.size || "-"}
          </span>
          <button
            onClick={() => removeItem(item._id)}
            className="text-red-500 text-xs mt-1 hover:underline text-left sm:hidden"
          >
            <Trash2 />
          </button>
        </div>
      </div>

      {/* Price */}
      <div className="w-full sm:w-1/5 text-center text-gray-600 mb-2 sm:mb-0">
        ${Number(item.order_price).toFixed(2)}
      </div>

      {/* Quantity */}
      <div className="w-full sm:w-1/5 flex justify-center mb-4 sm:mb-0 ">
        <div className="flex items-center border border-gray-300 rounded-md">
          <button
            onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
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

      {/* Total */}
      <div className="w-full sm:w-1/5 text-center sm:text-right font-semibold text-gray-800">
        ${(Number(item.order_price) * item.quantity).toFixed(2)}
      </div>

      {/* Remove Button */}
      <button
        onClick={() => removeItem(item._id)}
        className="hidden sm:block text-red-500 hover:underline cursor-pointer ml-4 border-1 border-gray-300 p-2 rounded-md"
      >
        <Trash2 />
      </button>
    </div>
  );
}
