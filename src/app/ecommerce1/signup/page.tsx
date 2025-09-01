import React from 'react'
import Image from 'next/image'

const CreateAccountPage: React.FC = () => {
  return (
    <div className="flex  items-center justify-center  p-4 sm:p-8">
      <div className="flex w-full  flex-col  overflow-hidden  md:flex-row">

        {/* Left Section (Image) */}
        <div className="relative hidden w-full rounded-l-xl   md:block md:w-1/2">
          <div className="flex h-full items-center ">
            <Image 
              src="/auth/dl.beatsnoop 1.png" 
              alt="Shopping cart, bags, and smartphone" 
              width={500}
              height={500}
              className="h-auto w-full max-h-[70vh] object-contain"
            />
          </div>
        </div>

        {/* Right Section (Form) */}
        <div className="flex max-w-2xl flex-col justify-center p-8 md:w-1/2 lg:p-16">
          <h1 className="mb-2 text-2xl font-semibold text-gray-800 lg:text-3xl">
            Create an account
          </h1>
          <p className="mb-8 text-sm text-gray-500">
            Enter your details below
          </p>

          <form className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Name"
                className="w-full rounded-md border-b border-gray-300 px-4 py-3 text-sm focus:border-red-500 focus:outline-none"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email or Phone Number"
                className="w-full rounded-md border-b border-gray-300 px-4 py-3 text-sm focus:border-red-500 focus:outline-none"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full rounded-md border-b border-gray-300 px-4 py-3 text-sm focus:border-red-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded cursor-pointer bg-red-500 py-3 text-sm  text-white transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Create Account
            </button>
          </form>

          <div className="my-4 flex items-center justify-center">
            <div className="h-px w-full bg-gray-300"></div>
            <span className="mx-2 text-xs text-gray-400">or</span>
            <div className="h-px w-full bg-gray-300"></div>
          </div>
          
          {/* Sign up with Google Button */}
          <button className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white py-2 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2">
            {/* You can use an SVG icon for Google here */}
            <svg 
              className="mr-2 h-5 w-5" 
              viewBox="0 0 48 48" 
              xmlns="http://www.w3.org/2000/svg"
            >
                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.083 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 8.067 3.018l5.657-5.657A23.904 23.904 0 0024 0C10.745 0 0 10.745 0 24s10.745 24 24 24c12.9 0 23.6-9.147 23.6-24 0-1.638-.192-3.238-.52-4.764z"/>
                <path fill="#FF3D00" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.083 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 8.067 3.018l5.657-5.657A23.904 23.904 0 0024 0C10.745 0 0 10.745 0 24s10.745 24 24 24c12.9 0 23.6-9.147 23.6-24 0-1.638-.192-3.238-.52-4.764z"/>
            </svg>
            Sign up with Google
          </button>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            Already have account? <a href="/ecommerce1/login" className="font-semibold text-red-500 hover:text-red-600 ">Log in</a>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CreateAccountPage
