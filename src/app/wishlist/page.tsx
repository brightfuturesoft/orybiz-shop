"use client";

import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface WishlistItem {
  _id: string;
  product_name: string;
  product_image: string;
  sku: string;
  quantity: number;
  order_price: number;
  variation: {
    color: string;
    size: string;
  };
}

interface Variant {
  color: string;
  size: string;
  sku: string;
  offer_price: number;
  cover_photo?: string;
}

interface ProductLike {
  _id: string;
  item_name: string;
  selling_price: number;
  sku: string;
  variants?: Variant[];
  attachments?: string[];
}

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  // Load wishlist from localStorage
  useEffect(() => {
    const data = localStorage.getItem("wishlist");
    if (data) setWishlist(JSON.parse(data));
  }, []);

  // Convert product/variant to wishlist item structure
  const toWishlistItem = (product: ProductLike) => {
    const variant = product.variants?.[0] || {
      color: "",
      size: "",
      sku: product.sku,
      offer_price: product.selling_price,
      cover_photo: product.attachments?.[0] || "/placeholder.png",
    };

    return {
      _id: product._id,
      product_name: product.item_name,
      product_image: variant.cover_photo,
      sku: variant.sku,
      quantity: 1,
      order_price: variant.offer_price,
      variation: {
        color: variant.color,
        size: variant.size,
      },
    };
  };

  // Move all to cart
  const moveAllToBag = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const mergedCart = [...existingCart];

    wishlist.forEach((item) => {
      const exists = existingCart.some(
        (c: WishlistItem) =>
          c._id === item._id &&
          c.variation.color === item.variation.color &&
          c.variation.size === item.variation.size
      );
      if (!exists) mergedCart.push(item);
    });

    localStorage.setItem("cart", JSON.stringify(mergedCart));
    setWishlist([]);
    localStorage.removeItem("wishlist");
    window.dispatchEvent(new Event("cartUpdated"));
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  const handleRemove = (id: string) => {
    const updated = wishlist.filter((i) => i._id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  const handleAddToCart = (item: WishlistItem) => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const exists = existingCart.some(
      (i: WishlistItem) =>
        i._id === item._id &&
        i.variation.color === item.variation.color &&
        i.variation.size === item.variation.size
    );
    if (!exists) {
      localStorage.setItem("cart", JSON.stringify([...existingCart, item]));
      window.dispatchEvent(new Event("cartUpdated"));
    }
  };

  return (
    <div className="container mx-auto min-h-screen p-4">
      <div className="flex justify-between items-center my-10">
        <div className="text-xl sm:text-2xl lg:text-xl text-gray-800">
          Wishlist ({wishlist.length})
        </div>
        {wishlist.length > 0 && (
          <button
            onClick={moveAllToBag}
            className="px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base font-medium text-gray-700 border border-gray-300 cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200 ease-in-out"
          >
            Move All To Bag
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.length > 0 ? (
          wishlist.map((item) => (
            <div
              key={item._id}
              className="relative group bg-white p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <img
                src={item.product_image}
                alt={item.product_name}
                className="w-full h-48 object-cover rounded-md mb-2"
              />

              <button
                onClick={() => handleAddToCart(item)}
                className="absolute w-full cursor-pointer bottom-24 left-1/2 -translate-x-1/2 px-4 py-2 bg-black text-white rounded opacity-0 group-hover:opacity-100 transition"
              >
                Add to Cart
              </button>

              <div className="font-semibold text-gray-800 truncate">{item.product_name}</div>
              <div className="text-red-500 font-bold mt-1">${item.order_price}</div>

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
