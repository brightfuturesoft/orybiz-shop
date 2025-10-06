/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Trash2 } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useWishlistStore } from "@/store/wishlistStore";
import { useUserStore } from "@/store/userStore";
import Image from "next/image";

const Wishlist = () => {
  const { user } = useUserStore();

  const user_id = user?._id || "";
  const { wishlist, loading, error, fetchWishlist, removeFromWishlist } =
    useWishlistStore();

  // Fetch wishlist on mount
  useEffect(() => {
    if (user_id) fetchWishlist(user_id);
  }, [user_id, fetchWishlist]);

  // Handle remove
  const handleRemove = async (id: string) => {
    try {
      await removeFromWishlist(id);
      toast.success("Item removed from wishlist");
      fetchWishlist(user_id);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to remove item");
    }
  };

  return (
    <div className="container mx-auto min-h-screen p-4">
      <h2 className="text-2xl font-semibold mb-6">My Wishlist</h2>

      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : !wishlist || wishlist.length === 0 ? (
        <div className="text-center text-gray-500">Your wishlist is empty</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="relative group bg-white p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <Image
                src={item.product_image || "/placeholder.png"}
                alt={item.product_name}
                width={400} 
                height={192} 
                className="w-full h-48 object-cover rounded-md mb-2"
              />

              <div className="font-semibold text-gray-800 truncate">
                {item.product_name}
              </div>
              <div className="text-red-500 font-bold mt-1">
                ${item.order_price}
              </div>

              <div className="flex items-center gap-2 mt-1 text-gray-500 text-sm">
                <span>Size: {item.variation.size || "N/A"}</span>
                <span className="flex items-center gap-1">
                  Color:
                  <span
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: item.variation.color }}
                  />
                </span>
              </div>

              <button
                onClick={() => handleRemove(item._id!)}
                className="cursor-pointer absolute top-2 right-2 p-2 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition"
              >
                <Trash2 />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
