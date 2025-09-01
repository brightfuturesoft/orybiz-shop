import React from "react";
import Image from "next/image";

const LoginPage: React.FC = () => {
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
            Log in to Exclusive
          </h1>
          <p className="mb-8 text-sm text-gray-500">Enter your details below</p>

          <form className="space-y-6">
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

         <div className="flex justify-between items-center md:flex-row flex-col">
               <button
              type="submit"
              className=" cursor-pointer rounded px-16  bg-red-500 py-3 text-sm  text-white transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Log In
            </button>
            <a
              href="#"
              className="text-[#DB4444] font-poppins text-base font-normal leading-6 hover:underline"
            >
              Forget Password?
            </a>
         </div>
          </form>

          {/* <div className="my-4 flex items-center justify-center">
            <div className="h-px w-full bg-gray-300"></div>
            <span className="mx-2 text-xs text-gray-400">or</span>
            <div className="h-px w-full bg-gray-300"></div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
