/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { BillingForm, Breadcrumb, CouponSection, OrderSummary, PaymentMethods } from "@/app/components/Ecommerce1"
import { BillingDetails, CartItem } from "@/app/types/checkout"
import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/loginStore"
import { useWorkspaceStore } from "@/store/workspaceStore"
import { useUserStore } from "@/store/userStore"


export default function CheckoutPage() {
  const { user, fetchUser } = useUserStore();
  useEffect(() => {
    fetchUser();
  }, []);
  const router = useRouter();
  const workspace = useWorkspaceStore((state) => state.workspace);
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [billingDetails, setBillingDetails] = useState<BillingDetails>({
    full_name: "",
    company_name: "",
    street_address: "",
    apartment: "",
    town_city: "",
    phone_number: "",
    email_address: "",
  })
  const [paymentMethod, setPaymentMethod] = useState("cod")
  const [couponCode, setCouponCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const storeUser = useAuthStore.getState().user;

  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        setCartItems(Array.isArray(parsedCart) ? parsedCart : [])
      } catch {
        setCartItems([])
      }
    }
  }, [])

const calculateSubtotal = () =>
  cartItems.reduce((total, item) => total + (Number(item.order_price) || 0) * item.quantity, 0)
  const subtotal = calculateSubtotal()
  const total = subtotal - discount

  const handleInputChange = (field: keyof BillingDetails, value: string | boolean) => {
    setBillingDetails((prev) => ({ ...prev, [field]: value }))
  }

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === "save10") {
      setDiscount(subtotal * 0.1)
      toast.success("Coupon applied! 10% discount added.")
    } else if (couponCode.toLowerCase() === "free50") {
      setDiscount(50)
       toast.success("Coupon applied! $50 discount added.")
    } else if (couponCode) {
       toast.error("Invalid coupon code.")
    }
  }

const handlePlaceOrder = async () => {
  const required = ["full_name", "street_address", "town_city", "phone_number", "email_address"];
  const missing = required.filter((f) => !billingDetails[f as keyof BillingDetails]);
  if (!user && missing.length) return toast.error(`Please fill in: ${missing.join(", ")}`);
  if (!cartItems.length) return toast.error("Your cart is empty!");

  setIsLoading(true);

  try {
    // Prepare payload for saving cart
    const payload = cartItems.map((item) => ({
      product_id: item._id,
      user_id: user?._id || "",
      user_name: user?.full_name || billingDetails.full_name,
      user_email: user?.email || billingDetails.email_address,
      user_number: billingDetails.phone_number,
      product_name: item.product_name,
      sku: item.sku || "",
      quantity: item.quantity,
      order_price: item.order_price,
      variation: item.variation,
      product_image: item.product_image?.[0] || "/placeholder.svg",
    }));

    // Save cart silently if user exists or not
    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    
    if (!user?._id) {
     return toast.error("User Not Found")
    }

    // Prepare order payload
    const orderPayload = {
      order_type: "ecommerce",
      user_id: user?._id,
      workspace_name: workspace?.name,
      workspace_id: workspace?._id,
      products: payload,
      delivery_address: {
        full_name: storeUser?.full_name || billingDetails.full_name,
        phone_number:  billingDetails.phone_number,
        street: billingDetails.street_address,
        city: billingDetails.town_city,
        state: billingDetails.street_address || "",
        postal_code: "",
        country: "",
      },
      shipping_charge: 0,
      tax_amount: 0,
      discount,
      total_amount: subtotal - discount,
      promo: {
        used: discount > 0,
        promo_id: null,
        discount_amount: discount,
      },
      payment: {
        method: paymentMethod,
        transaction_id: "",
        status: "pending",
      },
      order_status: "pending",
      tracking: [],
    };

    const res = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderPayload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Order failed");
    }

    toast.success("Order placed successfully!");
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cartUpdated"));
    setCartItems([]);
    router.push("/");
  } catch (err: any) {
    toast.error(err.message || "Something went wrong");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-white">
      <Breadcrumb />
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="container mx-auto ">
          <h1 className="text-2xl sm:text-3xl font-medium text-black mb-8">Billing Details</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <BillingForm billingDetails={billingDetails} handleInputChange={handleInputChange} />
            <div className="space-y-6">
              <OrderSummary cartItems={cartItems} subtotal={subtotal} discount={discount} total={total} />
              <PaymentMethods paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
              <CouponSection couponCode={couponCode} setCouponCode={setCouponCode} applyCoupon={applyCoupon} />
              <button
                onClick={handlePlaceOrder}
                disabled={isLoading || cartItems.length === 0}
                className="w-full py-4 bg-red-500 text-white font-medium hover:bg-red-600 transition-colors mt-6 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? "Processing..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
