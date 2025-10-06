"use client";

import { CartItem } from "@/app/types/checkout";
import Image from "next/image";

interface Props {
  cartItems: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
}

export default function OrderSummary({
  cartItems,
  subtotal,
  discount,
  total,
}: Props) {
  return (
    <div className="space-y-6">
      {/* Cart Items */}
      <div className="space-y-4">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item._id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                  {item.product_image && item.product_image[0] ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={item.product_image}
                        alt={item.product_name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-8 h-6 bg-gray-600 rounded-sm"></div>
                  )}
                </div>
                <div>
                  <span className="text-black">{item.product_name}</span>
                  {item.quantity > 1 && (
                    <span className="text-gray-500 text-sm ml-2">
                      x{item.quantity}
                    </span>
                  )}
                  {item.variation &&
                    (item.variation.color || item.variation.size) && (
                      <div className="text-gray-400 text-xs">
                        {item.variation.color && (
                          <span>Color: {item.variation.color}</span>
                        )}
                        {item.variation.size && (
                          <span className="ml-2">
                            Size: {item.variation.size}
                          </span>
                        )}
                      </div>
                    )}
                </div>
              </div>
              <span className="text-black">
                ${(Number(item.order_price) * item.quantity).toFixed(2)}
              </span>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            Your cart is empty
          </div>
        )}
      </div>

      {/* Totals */}
      <div className="border-t border-gray-200 pt-4 space-y-3">
        <div className="flex justify-between">
          <span className="text-black">Subtotal:</span>
          <span className="text-black">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-black">Shipping:</span>
          <span className="text-black">Free</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount:</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between border-t border-gray-200 pt-3">
          <span className="text-black font-medium">Total:</span>
          <span className="text-black font-medium">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
