"use client";

import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Variant {
  color: string; // color as rgb string
  size: string; // size as string
  sku: string;
  quantity: number;
  normal_price: number;
  offer_price: number;
  product_cost: number;
  cover_photo?: string;
}

interface WishlistItem {
  _id: string;
  item_name: string;
  selling_price: number; // selling_price numeric
  attachments?: string[];
  variants?: Variant[];
  quantity?: number;
}

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  // Load wishlist from localStorage
  useEffect(() => {
    const data = localStorage.getItem("wishlist");
    if (data) setWishlist(JSON.parse(data));
  }, []);

  // Move all items to cart
  const moveAllToBag = () => {
    const existingCart = localStorage.getItem("cart");
    const cartItems: WishlistItem[] = existingCart
      ? JSON.parse(existingCart)
      : [];
    localStorage.setItem("cart", JSON.stringify([...cartItems, ...wishlist]));
    setWishlist([]);
    localStorage.removeItem("wishlist");
    toast.success("All items moved to bag!");
    window.dispatchEvent(new Event("cartUpdated"));
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  // Remove single item
  const handleRemove = (id: string) => {
    const updatedWishlist = wishlist.filter((item) => item._id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    toast.success("Item removed from wishlist");
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  const handleAddToCart = (item: WishlistItem) => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const isItemInCart = existingCart.some(
      (i: WishlistItem) => i._id === item._id
    );
    if (!isItemInCart) {
      localStorage.setItem(
        "cart",
        JSON.stringify([...existingCart, { ...item, quantity: 1 }])
      );
      toast.success(`${item.item_name} added to cart!`);
      window.dispatchEvent(new Event("cartUpdated"));
    } else {
      toast.error("Item already in cart!");
    }
  };

  return (
    <div className="container mx-auto min-h-screen p-4">
      {/* Header */}
      <div className="flex justify-between items-center my-10">
        <div className="text-xl sm:text-2xl lg:text-xl text-gray-800">
          Wishlist ({wishlist.length})
        </div>
        <button
          onClick={moveAllToBag}
          className="px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base font-medium text-gray-700 border border-gray-300 cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200 ease-in-out"
        >
          Move All To Bag
        </button>
      </div>

      {/* Wishlist Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.length > 0 ? (
          wishlist.map((item) => (
            <div
              key={item._id}
              className="relative group bg-white p-4 rounded-lg shadow hover:shadow-md transition"
            >
              {/* Image */}
              <img
                src={
                  item.variants?.[0]?.cover_photo ||
                  item.attachments?.[0] ||
                  "/placeholder.png"
                }
                alt={item.item_name}
                className="w-full h-48 object-cover rounded-md mb-2"
              />

              {/* Add To Cart Button */}
              <button
                onClick={() => handleAddToCart(item)}
                className="absolute w-full cursor-pointer bottom-24 left-1/2 -translate-x-1/2 px-4 py-2 bg-black text-white rounded opacity-0 group-hover:opacity-100 transition"
              >
                Add to Cart
              </button>

              {/* Item Details */}
              <div className="font-semibold text-gray-800 truncate">
                {item.item_name}
              </div>
              <div className="text-red-500 font-bold mt-1">
                ${item.selling_price}
              </div>

              {/* Variant Details */}
              {item.variants && item.variants.length > 0 && (
                <div className="flex items-center gap-2 mt-1 text-gray-500 text-sm">
                  <span>Size: {item.variants[0].size}</span>
                  <span className="flex items-center gap-1">
                    Color:
                    <span
                      className="w-4 h-4 rounded-full border"
                      style={{ backgroundColor: item.variants[0].color }}
                    />
                  </span>
                </div>
              )}

              {/* Delete Button */}
              <button
                onClick={() => handleRemove(item._id)}
                className="cursor-pointer absolute top-2 right-2 p-2 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition"
              >
                <Trash2 />
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            Your wishlist is empty
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
