'use client';

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, ShoppingCart, Menu, TruckElectric } from "lucide-react";
import MobileMenu from "../MobileMenu/MobileMenu";
import AccountMenu from "../AccountMenu/AccountMenu";
import Skeleton from "@/app/ui/LogoSkeleton/LogoSkeleton";
import { TWorkSpace } from "@/app/types/types";
import { useUserStore } from "@/store/userStore";
import NavbarSearch from "../NavbarSearch/NavbarSearch";

interface NavbarProps {
  workspace: TWorkSpace ;
  loading?: boolean;
}

export default function Navbar({ workspace, loading }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { user, fetchUser } = useUserStore();
  const accountMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    const updateCounts = () => {
      setCartCount(JSON.parse(localStorage.getItem("cart") || "[]").length);
    };
    updateCounts();
    window.addEventListener("cartUpdated", updateCounts);
    return () => window.removeEventListener("cartUpdated", updateCounts);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(e.target as Node)) {
        setIsAccountMenuOpen(false);
      }
    };
    if (isAccountMenuOpen) document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isAccountMenuOpen]);

  const toggleAccountMenu = () => setIsAccountMenuOpen(!isAccountMenuOpen);

  return (
    <header className="sticky top-0 z-50 py-3 w-full border-b border-gray-300 bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between relative">
          {/* Left */}
          <div className="flex items-center space-x-4 md:space-x-8">
            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Logo */}
            {loading ? (
              <Skeleton width={120} height={40} />
            ) : (
              workspace?.image && (
                <Link href="/">
                  <Image
                    src={workspace.image}
                    alt={workspace.name || "Logo"}
                    width={120}
                    height={40}
                    className="object-contain"
                  />
                </Link>
              )
            )}
          </div>

          {/* Center - Search */}
          <div className="hidden md:flex flex-grow justify-center">
            <NavbarSearch />
          </div>

          {/* Right */}
          <div className="flex items-center space-x-3 md:space-x-4">
            {/* Track Order */}
            <Link
              href="/wishlist"
              className="hidden md:flex items-center gap-1 px-2 py-1 hover:text-red-500 transition-colors"
            >
              <TruckElectric className="h-5 w-5" />
              <span className="font-medium text-sm md:text-base">Track Order</span>
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex items-center gap-1 px-2 py-1 hover:text-red-500 transition-colors"
            >
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5">
                  {cartCount}
                </span>
              )}
              <ShoppingCart className="h-6 w-6" />
              <span className="font-medium text-sm md:text-base">My Cart</span>
            </Link>

            {/* Account Menu */}
            <div className="relative" ref={accountMenuRef}>
              <button
                onClick={toggleAccountMenu}
                className="hidden lg:flex items-center gap-1 px-2 py-1 hover:text-red-500 transition-colors rounded-md"
              >
                <User className="h-6 w-6" />
                <span className="font-medium text-sm md:text-base">Account</span>
              </button>

              {isAccountMenuOpen && (
                <>
                  {user ? (
                    <AccountMenu onClose={() => setIsAccountMenuOpen(false)} />
                  ) : (
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg p-2 z-50">
                      <Link
                        href="/login"
                        className="block px-3 py-2 rounded-md hover:bg-gray-100"
                      >
                        Login
                      </Link>
                      <Link
                        href="/signup"
                        className="block px-3 py-2 rounded-md hover:bg-gray-100"
                      >
                        Sign Up
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu workspace={workspace} isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
}
