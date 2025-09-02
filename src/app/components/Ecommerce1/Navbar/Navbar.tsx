'use client';

import { Heart, Menu, Search, ShoppingCart, User } from "lucide-react";
import React, { useState } from "react";
import MobileMenu from "../MobileMenu/MobileMenu";
import Link from "next/link";
import { usePathname } from "next/navigation"; 
import Image from "next/image";
import { TWorkSpace } from "@/app/types/types";
import Skeleton from "@/app/ui/LogoSkeleton/LogoSkeleton";


export interface NavbarProps {
  workspace: TWorkSpace | null; 
  loading?: boolean; // optional loading prop
}

const Navbar: React.FC<NavbarProps> = ({ workspace, loading }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { label: 'Home', href: '/' },
    { label: 'Contact', href: '/ecommerce1/contact' },
    { label: 'About', href: '/ecommerce1/about' },
    { label: 'Sign Up', href: '/ecommerce1/signup' },
  ];

  return (
    <header className="sticky top-0 z-50 py-3 w-full border-b border-gray-300 bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between relative">
          <div className="flex items-center space-x-4 md:space-x-8">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
            {loading ? (
              <Skeleton width={150} height={50} />
            ) : (
              workspace?.image && (
                <Image
                  src={workspace.image}
                  alt={workspace.name || "Logo"}
                  width={150}
                  height={50}
                  className="object-contain"
                />
              )
            )}
          </div>

          {/* Center Section: Navigation Links (Desktop) */}
          <nav className="hidden md:flex flex-grow justify-center">
            <ul className="flex items-center space-x-8 lg:space-x-12">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={`relative cursor-pointer text-black hover:text-red-500 transition-colors
            ${isActive ? "font-semibold" : ""}
            after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full
            ${isActive ? "after:w-full" : ""}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right Section: Search and Action Buttons */}
          <div className="flex items-center space-x-2">
            <div className="relative hidden md:block w-48 lg:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 rounded-md border-transparent bg-gray-100 text-sm focus:outline-none focus:bg-white focus:border-gray-300 transition-colors"
              />
            </div>

            <button className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors">
              <Search className="h-6 w-6" />
            </button>

            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-md hover:bg-gray-100 transition-colors hidden lg:flex items-center justify-center">
                <Heart className="h-6 w-6" />
              </button>
              <button className="p-2 rounded-md hover:bg-gray-100 transition-colors hidden lg:flex items-center justify-center">
                <User className="h-6 w-6" />
              </button>
              <button className="relative p-2 rounded-md hover:bg-gray-100 transition-colors">
                <ShoppingCart className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
};

export default Navbar;
