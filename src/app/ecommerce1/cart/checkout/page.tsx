"use client"

import { BillingForm, Breadcrumb, CouponSection, OrderSummary, PaymentMethods } from "@/app/components/Ecommerce1"
import { BillingDetails, CartItem } from "@/app/types/checkout"
import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation";


export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [billingDetails, setBillingDetails] = useState<BillingDetails>({
    firstName: "",
    companyName: "",
    streetAddress: "",
    apartment: "",
    townCity: "",
    phoneNumber: "",
    emailAddress: "",
    saveInfo: false,
  })
  const [paymentMethod, setPaymentMethod] = useState("cod")
  const [couponCode, setCouponCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

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

  const calculateSubtotal = () => cartItems.reduce((total, item) => total + (parseFloat(item.selling_price) || 0) * item.quantity, 0)
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

 const handlePlaceOrder = () => {
  const required = ["firstName", "streetAddress", "townCity", "phoneNumber", "emailAddress"];
  const missing = required.filter((f) => !billingDetails[f as keyof BillingDetails]);
  if (missing.length) return toast.error(`Please fill in: ${missing.join(", ")}`);
  if (!cartItems.length) return toast.error("Your cart is empty!");
  setIsLoading(true);
  setTimeout(() => {
    toast.success("Order placed successfully!");
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cartUpdated"));
    setCartItems([]);
    setIsLoading(false);
    router.push("/ecommerce1"); 
  }, 2000);
};

  return (
    <div className="min-h-screen bg-white">
      <Breadcrumb />
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
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
