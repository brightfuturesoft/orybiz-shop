"use client"

import Image from "next/image"

interface Props {
  paymentMethod: string
  setPaymentMethod: (method: string) => void
}

export default function PaymentMethods({ paymentMethod, setPaymentMethod }: Props) {
  return (
    <div className="space-y-4 pt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <input
            type="radio"
            id="bank"
            name="payment"
            value="bank"
            checked={paymentMethod === "bank"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-4 h-4 text-red-500 border-gray-300 focus:ring-red-500"
          />
          <label htmlFor="bank" className="text-black">Bank</label>
        </div>
        <div className="flex items-center space-x-2">
          {["image 32.png", "image 30.png", "image 31.png", "image 33.png"].map((img, i) => (
            <Image key={i} src={`/payment-method/${img}`} alt="payment" width={60} height={20} className="w-full rounded" />
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <input
          type="radio"
          id="cod"
          name="payment"
          value="cod"
          checked={paymentMethod === "cod"}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-4 h-4 text-red-500 border-gray-300 focus:ring-red-500"
        />
        <label htmlFor="cod" className="text-black">Cash on delivery</label>
      </div>
    </div>
  )
}
