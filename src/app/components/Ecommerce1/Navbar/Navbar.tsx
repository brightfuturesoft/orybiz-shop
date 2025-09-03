'use client';

import { Heart, Menu, Search, ShoppingCart, User } from "lucide-react";
import React, { useState, useEffect, useRef } from "react"; // 🆕 useRef import
import MobileMenu from "../MobileMenu/MobileMenu";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { TWorkSpace } from "@/app/types/types";
import Skeleton from "@/app/ui/LogoSkeleton/LogoSkeleton";
import Link from 'next/link';
import AccountMenu from "../AccountMenu/AccountMenu";

export interface NavbarProps {
  workspace: TWorkSpace | null;
  loading?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ workspace, loading }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const accountMenuRef = useRef<HTMLDivElement>(null); // 🆕 Ref for the account menu container
  const pathname = usePathname();

  const links = [
    { label: 'Home', href: '/' },
    { label: 'Contact', href: '/ecommerce1/contact' },
    { label: 'About', href: '/ecommerce1/about' },
    { label: 'Sign Up', href: '/ecommerce1/signup' },
  ];

  useEffect(() => {
    const updateCounts = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setCartCount(cart.length);
      setWishlistCount(wishlist.length);
    };

    updateCounts();
    window.addEventListener("cartUpdated", updateCounts);
    window.addEventListener("wishlistUpdated", updateCounts);

    return () => {
      window.removeEventListener("cartUpdated", updateCounts);
      window.removeEventListener("wishlistUpdated", updateCounts);
    };
  }, []);

  // 🆕 useEffect to handle outside clicks
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // Check if the click is outside the menu and the user icon
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target as Node)
      ) {
        setIsAccountMenuOpen(false);
      }
    };

    if (isAccountMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    // Cleanup the event listener
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isAccountMenuOpen]);

  const toggleAccountMenu = () => {
    setIsAccountMenuOpen(!isAccountMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 py-3 w-full border-b border-gray-300 bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between relative">
          {/* Left Section */}
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

          {/* Center Section: Navigation Links */}
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

          {/* Right Section: Search & Icons */}
          <div className="flex items-center space-x-2">
            {/* Search Box */}
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

            {/* Icons */}
            <div className="flex items-center space-x-2">
              {/* ❤️ Wishlist with Tooltip */}
              <div className="relative group">
                <button className="relative cursor-pointer p-2 rounded-md hover:bg-gray-100 transition-colors">
                  <Heart className="h-6 w-6" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1.5">
                      {wishlistCount}
                    </span>
                  )}
                </button>
                {wishlistCount > 0 && (
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {wishlistCount} item{wishlistCount > 1 ? "s" : ""} in wishlist
                  </div>
                )}
              </div>

              {/* 🛒 Cart with Tooltip */}
              <div className="relative group">
                <button className="relative cursor-pointer p-2 rounded-md hover:bg-gray-100 transition-colors">
                  <Link href={"/ecommerce1/cart"}>
                    <ShoppingCart className="h-6 w-6" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1.5">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </button>
                {cartCount > 0 && (
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {cartCount} item{cartCount > 1 ? "s" : ""} in cart
                  </div>
                )}
              </div>

                 {/* 👤 User with dropdown menu */}
              <div className="relative" ref={accountMenuRef}> {/* 🆕 Ref attached here */}
                <button
                  onClick={toggleAccountMenu}
                  className="p-2 rounded-md hover:bg-gray-100 transition-colors hidden lg:flex items-center justify-center"
                >
                  <User className="h-6 w-6 cursor-pointer" />
                </button>
                {isAccountMenuOpen && <AccountMenu onClose={() => setIsAccountMenuOpen(false)} />}
              </div>



            </div>
          </div>
        </div>
      </div>
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
};

export default Navbar;