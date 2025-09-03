"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useWorkspaceStore } from '@/store/workspaceStore';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';

const CreateAccountPage: React.FC = () => {
  const workspace = useWorkspaceStore((state) => state.workspace);
  const { signup, loading, error } = useAuthStore();
  const router = useRouter();
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup({
      full_name,
      email,
      password,
      workspace_id: workspace?._id || undefined,
    });

    if (!error) {
      toast.success("Signup successful! Please login.");
      router.push("/ecommerce1/login");
    } else if (error) {
      toast.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center p-4 sm:p-8">
      <div className="flex w-full flex-col overflow-hidden md:flex-row">
        {/* Left Section (Image) */}
        <div className="relative hidden w-full rounded-l-xl md:block md:w-1/2">
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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Name"
                value={full_name}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full rounded-md border-b border-gray-300 px-4 py-3 text-sm focus:border-red-500 focus:outline-none"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-md border-b border-gray-300 px-4 py-3 text-sm focus:border-red-500 focus:outline-none"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-md border-b border-gray-300 px-4 py-3 text-sm focus:border-red-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded cursor-pointer bg-red-500 py-3 text-sm text-white transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              {loading ? "Signing up..." : "Create Account"}
            </button>
            <div className='flex gap-1'>
              <p>Already if you have an account. Please</p>
              <Link className='text-red-500 cursor-pointer' href={"/ecommerce1/login"}> Login</Link>
            </div>

            {error && <p className="text-red-500">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateAccountPage;
