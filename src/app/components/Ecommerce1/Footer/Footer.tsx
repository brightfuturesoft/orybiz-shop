/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon, WhatsAppIcon, YouTubeIcon } from '../CustomIcons/CustomIcons';
import { useWorkspaceStore } from '@/store/workspaceStore';

import toast from 'react-hot-toast';
import { useSubscriptionStore } from "@/store/subscribeStore";

const Footer = () => {
  const workspace = useWorkspaceStore((state) => state.workspace);
  const { postSubscription, loading } = useSubscriptionStore();
  const [email, setEmail] = useState("");
  const handleSubscribe = async () => {
    if (!email) return toast.error("Please enter your email");
    try {
      await postSubscription({ email, workspace_id: workspace?._id });
      toast.success("Subscribed successfully!");
      setEmail("");
    } catch (err: any) {
      toast.error(err?.message || "Failed to subscribe");
    }
  };

  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Exclusive / Subscribe */}
          <div className="space-y-4">
            <Link href="/">  
              <Image
                src={workspace?.image || ""}
                alt={workspace?.name || "Logo"}
                width={150}
                height={150}
                className="transition-transform duration-300 group-hover:scale-110"
              /> 
            </Link>
            <h4 className="font-semibold mb-1 my-2">Subscribe</h4>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-transparent border border-gray-500 rounded-sm py-2 px-4 pr-10 text-white placeholder-gray-500 text-sm focus:outline-none"
              />
              <button
                onClick={handleSubscribe}
                disabled={loading}
                className="absolute right-0 top-0 h-full px-4 bg-red-500 hover:bg-red-600 text-white rounded-r"
              >
                {loading ? "..." : "Subscribe"}
              </button>
            </div>
          </div>

          {/* Column 2: Support */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-2">Support</h3>
            <p className="text-sm text-gray-400">
              {`${workspace?.address_info?.zip_code}, ${workspace?.address_info?.address}, ${workspace?.address_info?.city}, ${workspace?.address_info?.state}, ${workspace?.address_info?.country}.`}
            </p>
            <p className="text-sm text-gray-400">{workspace?.contact_info?.support_email}</p>
            <p className="text-sm text-gray-400">{workspace?.contact_info?.phone_number?.[0]}</p>
          </div>

          {/* Column 3: Account */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-2">Account</h3>
            <Link href="/profile" className="block text-sm text-gray-400 hover:text-white transition-colors">My Account</Link>
            <Link href="/signup" className="block text-sm text-gray-400 hover:text-white transition-colors">Login / Register</Link>
            <Link href="/cart" className="block text-sm text-gray-400 hover:text-white transition-colors">Cart</Link>
            <Link href="/wishlist" className="block text-sm text-gray-400 hover:text-white transition-colors">Wishlist</Link>
          </div>

          {/* Column 4: Quick Link */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-2">Quick Link</h3>
            <Link href="/about" className="block text-sm text-gray-400 hover:text-white transition-colors">About</Link>
            <Link href="/contact" className="block text-sm text-gray-400 hover:text-white transition-colors">Contact</Link>
          </div>
        </div>

        {/* Social Links */}
        <div className='flex justify-center items-center gap-5 mt-5 md:mt-10'>
          <div className="flex space-x-4 pt-2">
            <Link href={`${workspace?.social_info?.facebook}`} aria-label="Facebook"><FacebookIcon className="h-6 w-6 text-white hover:text-gray-400 transition-colors" /></Link>
            <Link href={`${workspace?.social_info?.twitter}`} aria-label="Twitter"><TwitterIcon className="h-6 w-6 text-white hover:text-gray-400 transition-colors" /></Link>
            <Link href={`${workspace?.social_info?.instagram}`} aria-label="Instagram"><InstagramIcon className="h-6 w-6 text-white hover:text-gray-400 transition-colors" /></Link>
            <Link href={`${workspace?.social_info?.linkedin}`} aria-label="LinkedIn"><LinkedinIcon className="h-6 w-6 text-white hover:text-gray-400 transition-colors" /></Link>
            <Link href={`${workspace?.social_info?.whatsapp}`} aria-label="Whatsapp"><WhatsAppIcon className="h-6 w-6 text-white hover:text-gray-400 transition-colors" /></Link>
            <Link href={`${workspace?.social_info?.youtube}`} aria-label="Youtube"><YouTubeIcon className="h-6 w-6 text-white hover:text-gray-400 transition-colors" /></Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500 text-sm">
          &copy; Copyright {workspace?.name} 2022. All right reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
