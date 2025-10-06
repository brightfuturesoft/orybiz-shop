/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import parse from "html-react-parser";
import { EnvelopeIcon, HeartIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { useProductStore } from "@/store/productStore";
import { PhoneIcon } from "lucide-react";

// Dummy fetch function replace with your API


export default function ServiceDetailsPage() {
  const params = useParams();
  const serviceId = params.id;

  const workspace = useWorkspaceStore((state) => state.workspace)
  const { products, fetchProducts } = useProductStore()

  const [service, setService] = useState<any>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);


  
  useEffect(() => {
    if (workspace?._id) fetchProducts(workspace._id)
  }, [workspace, fetchProducts])

  useEffect(() => {
    if (products?.length) {
      const p = products.find((p) => p._id === serviceId)
      setService(p)
    }
  }, [products, serviceId])

  if (!service) return <div className="p-8 text-center text-gray-500">Loading product...</div>


  const handleAddToWishlist = () => {
    if (!service) return;
    const existingWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const isInWishlist = existingWishlist.some((item: any) => item._id === service._id);
    if (!isInWishlist) {
      const updated = [...existingWishlist, service];
      localStorage.setItem("wishlist", JSON.stringify(updated));
      window.dispatchEvent(new Event("wishlistUpdated"));
      toast.success(`${service.item_name} added to wishlist!`);
      setIsWishlisted(true);
    } else {
      toast.error("Already in wishlist!");
    }
  };

  if (!service)
    return <div className="p-8 text-center text-gray-500">Loading service...</div>;

  return (
   <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left: Image */}
          <div className="relative w-full h-96 bg-gray-100">
            <Image
              src={service.attachments?.[0] || "/placeholder.png"}
              alt={service.item_name}
              fill
              className="object-cover"
            />
          </div>

          {/* Right: Details */}
          <div className="p-8 flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-gray-900">{service.item_name}</h1>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {service.categories?.map((cat: any) => (
                <span
                  key={cat.value}
                  className="text-xs px-3 py-1 bg-gray-200 text-gray-700 rounded-full"
                >
                  {cat.label}
                </span>
              ))}
            </div>

            {/* Price */}
            <div className="text-2xl font-semibold text-red-600 mt-2">
              {service.selling_price && Number(service.selling_price) > 0
                ? `$${service.selling_price}`
                : "Contact for Price"}
            </div>

            {/* Description */}
            <div className="mt-4 text-gray-700 space-y-2">
              {parse(service.item_description || "")}
              {parse(service.item_long_description || "")}
            </div>

            {/* Contact Info */}
            <div className="mt-4 flex flex-col gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 text-gray-700">
                <PhoneIcon className="w-5 h-5 text-gray-500" />
                <span>{service.contact_phone}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <EnvelopeIcon className="w-5 h-5 text-gray-500" />
                <span>{service.contact_email}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 mt-6">
              {service.is_purchasable && (
                <button
                  onClick={() => toast.success("Service booked!")}
                  className="px-6 py-3 bg-red-500 text-white font-medium rounded hover:bg-red-600 transition"
                >
                  Book Now
                </button>
              )}

              <button
                onClick={handleAddToWishlist}
                className={`w-12 h-12 flex items-center justify-center rounded border transition hover:bg-red-500 hover:text-white ${
                  isWishlisted ? "bg-red-100 border-red-500 text-red-500" : "bg-gray-100 border-gray-300 text-gray-700"
                }`}
              >
                <HeartIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Extra Info */}
            <div className="mt-6 border-t border-gray-200 pt-4 space-y-3">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-800">Availability:</span>
                <span className="text-gray-600">
                  {service.availeablein_ecommerce ? "Online" : "Offline only"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-800">SKU:</span>
                <span className="text-gray-600">{service.sku}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-800">Created By:</span>
                <span className="text-gray-600">{service.created_by}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
