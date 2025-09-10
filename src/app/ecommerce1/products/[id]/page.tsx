/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useWorkspaceStore } from "@/store/workspaceStore"
import { useProductStore } from "@/store/productStore"
import { useParams, useRouter } from "next/navigation"
import parse from "html-react-parser"
import ReletedProducts from "@/app/components/Ecommerce1/ReletedItems/ReletedItems"
import toast, { Toaster } from "react-hot-toast"

export default function ProductPage() {
  const params = useParams()
  const productId = params.id
  const workspace = useWorkspaceStore((state) => state.workspace)
  const { products, fetchProducts } = useProductStore()

  // Product & Variant States
  const [product, setProduct] = useState<any>(null)
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const router = useRouter();
  useEffect(() => {
    if (workspace?._id) fetchProducts(workspace._id)
  }, [workspace, fetchProducts])

  useEffect(() => {
    if (products?.length) {
      const p = products.find((p) => p._id === productId)
      setProduct(p)
    }
  }, [products, productId])

  if (!product) return <div className="p-8 text-center text-gray-500">Loading product...</div>

  // Variant data
  const variants = product.variants || []
  const selectedVariant = variants[selectedVariantIndex] || {}

  const productImages = selectedVariant.cover_photo?.length
    ? selectedVariant.cover_photo
    : ["/placeholder.svg"]

  const colors = variants.map((v:any, i:number) => ({ color: v.color, index: i }))
  const sizes = variants.filter((v:any) => v.size).map((v:any) => v.size)

  const handleAddToCart = () => {
    if (!product) return
    const variant = selectedVariant

    const cartItem = {
      _id: product._id,
      product_name: product.item_name,
      product_image:productImages[0],
      sku: variant.sku || product.sku,
      quantity: quantity,
      order_price: variant.offer_price || product.selling_price || 0,
      variation: {
        color: variant.color || '',
        size: variant.size || '',
      },
    }

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]")
    const isProductInCart = existingCart.some(
      (item: any) =>
        item._id === product._id &&
        item.variation.color === cartItem.variation.color &&
        item.variation.size === cartItem.variation.size
    )

    if (!isProductInCart) {
      const updatedCart = [...existingCart, cartItem]
      localStorage.setItem("cart", JSON.stringify(updatedCart))
      window.dispatchEvent(new Event("cartUpdated"))
      toast.success("Added to cart successfully!")
    } else {
      toast.error("This variant is already in cart!")
    }
  }

 const handleBuyNow = () => {

  if (!product) return;
  const variant = selectedVariant;

  const cartItem = {
    _id: product._id,
    product_name: product.item_name,
    product_image: productImages[0],
    sku: variant.sku || product.sku,
    quantity: quantity,
    order_price: variant.offer_price || product.selling_price || 0,
    variation: {
      color: variant.color || '',
      size: variant.size || '',
    },
  };

  // Clear existing cart and add only this product
  const newCart = [cartItem];
  localStorage.setItem("cart", JSON.stringify(newCart));
  window.dispatchEvent(new Event("cartUpdated"));

  // Navigate to checkout page
  router.push("/ecommerce1/cart/checkout");
};


  const handleWishlistToggle = () => {
    if (!product) return

    const wishlistItem = {
      _id: product._id,
      product_name: product.item_name,
      sku: selectedVariant.sku || product.sku,
      variation: {
        color: selectedVariant.color || '',
        size: selectedVariant.size || '',
      },
    }

    const existingWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
    const isInWishlist = existingWishlist.some(
      (item: any) =>
        item._id === product._id &&
        item.variation.color === wishlistItem.variation.color &&
        item.variation.size === wishlistItem.variation.size
    )

    if (!isInWishlist) {
      const updatedWishlist = [...existingWishlist, wishlistItem]
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist))
      window.dispatchEvent(new Event("wishlistUpdated"))
      setIsWishlisted(true)
      toast.success("Added to wishlist!")
    } else {
      toast.error("This variant is already in wishlist!")
    }
  }

  const relatedProducts = products?.filter(
    (x) =>
      x._id !== product._id &&
      x.categories?.some(
        (cat: { label: string; value: string }) =>
          cat.value === product.categories[0]?.value
      )
  )

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Breadcrumb */}
      <div className="px-4 py-4 text-sm text-gray-500 container mx-auto">
        <span className="hover:text-gray-700 cursor-pointer">Account</span>
        <span className="mx-2">/</span>
        <span className="hover:text-gray-700 cursor-pointer">{product.categories?.[0]?.label || "Category"}</span>
        <span className="mx-2">/</span>
        <span className="text-black">{product.item_name}</span>
      </div>

      <div className="px-4 py-8 container  mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Images */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-4">
            {productImages.map((img:string, i:number) => (
              <div
                key={i}
                onClick={() => setSelectedVariantIndex(i)}
                className={`w-20 h-20 rounded-lg overflow-hidden cursor-pointer border border-gray-300 ${selectedVariantIndex === i ? "ring-2 ring-gray-300" : "hover:ring-2 hover:ring-gray-300"}`}
              >
                <Image src={img} alt={`variant ${i + 1}`} width={80} height={80} className="object-cover w-full h-full" />
              </div>
            ))}
          </div>

          <div className="flex-1 rounded-lg overflow-hidden border border-gray-300 hover:bg-gray-50">
            <Image
              src={productImages[0] || "/placeholder.svg"}
              alt={product.item_name}
              width={500}
              height={500}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Details */}
        <div className="space-y-6">
          <h1 className="text-2xl font-semibold">{product.item_name}</h1>
          <div className="text-2xl">${selectedVariant.offer_price || product.selling_price}</div>
          <div className="text-gray-600 text-sm">{product.item_description}</div>
          {product.item_long_description && (
            <div className="text-gray-600 text-sm">{parse(product.item_long_description)}</div>
          )}

          {/* Colors */}
          {colors.length > 0 && (
            <div className="flex items-center gap-4">
              <span>Colors:</span>
              <div className="flex gap-2">
                {colors.map((c:any) => (
                  <button
                    key={c.index}
                    onClick={() => setSelectedVariantIndex(c.index)}
                    className={`w-5 h-5 rounded-full border-2 transition-all hover:scale-110 ${selectedVariantIndex === c.index ? "ring-2 ring-gray-400" : ""}`}
                    style={{ backgroundColor: c.color }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Buy */}
          <div className="flex gap-4 items-center">
            <div className="flex items-center border border-gray-300 rounded">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-gray-50" disabled={quantity <= 1}>-</button>
              <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 hover:bg-gray-50">+</button>
            </div>

            <button onClick={handleBuyNow} className="flex-1 bg-red-500 text-white py-3 rounded hover:bg-red-600 cursor-pointer">Buy Now</button>
            <button onClick={handleAddToCart} className="flex-1 bg-black text-white py-3 rounded hover:bg-gray-800 cursor-pointer">Add To Cart</button>
            <button onClick={handleWishlistToggle} className={`p-3 border rounded ${isWishlisted ? "border-red-500 bg-red-50 text-red-500" : "border-gray-300 hover:bg-gray-50"}`}>❤️</button>
          </div>
        </div>
      </div>

      <ReletedProducts products={relatedProducts || []} />
    </div>
  )
}
