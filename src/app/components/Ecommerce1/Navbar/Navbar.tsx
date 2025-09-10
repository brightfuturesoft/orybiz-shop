'use client';

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, ShoppingCart, Search, Menu, Truck, TruckElectric } from "lucide-react";
import MobileMenu from "../MobileMenu/MobileMenu";
import AccountMenu from "../AccountMenu/AccountMenu";
import Skeleton from "@/app/ui/LogoSkeleton/LogoSkeleton";
import { TWorkSpace } from "@/app/types/types";
import { useUserStore } from "@/store/userStore";
import NavbarSearch from "../NavbarSearch/NavbarSearch";

interface NavbarProps {
  workspace: TWorkSpace | null;
  loading?: boolean;
}

export default function Navbar({ workspace, loading }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const { user, fetchUser } = useUserStore(); 
  const accountMenuRef = useRef<HTMLDivElement>(null);

  // Fetch user on mount
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // Cart & Wishlist counts
  useEffect(() => {
    const updateCounts = () => {
      setCartCount(JSON.parse(localStorage.getItem("cart") || "[]").length);
      setWishlistCount(JSON.parse(localStorage.getItem("wishlist") || "[]").length);
    };
    updateCounts();
    window.addEventListener("cartUpdated", updateCounts);
    window.addEventListener("wishlistUpdated", updateCounts);
    return () => {
      window.removeEventListener("cartUpdated", updateCounts);
      window.removeEventListener("wishlistUpdated", updateCounts);
    };
  }, []);

  // Close account menu on outside click
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
      <div className="container mx-auto ">
        <div className="flex h-16 items-center justify-between relative">
          {/* Left */}
          <div className="flex items-center space-x-4 md:space-x-8">
            <button onClick={() => setIsMenuOpen(true)} className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors">
              <Menu className="h-6 w-6" />
            </button>
            {loading ? (
              <Skeleton width={150} height={50} />
            ) : (
              workspace?.image && ( <Link href="/"><Image src={workspace.image} alt={workspace.name || "Logo"} width={150} height={50} className="object-contain" />  </Link> )
            )}
          </div>

          {/* Center */}
          <nav className="hidden md:flex flex-grow justify-center">
           <NavbarSearch/>
          </nav>

          {/* Right */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              {/* Wishlist */}
              {/* <div className="relative group">
                <Link href="/ecommerce1/wishlist">
                  <Heart className="h-6 w-6" />
                  {wishlistCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1.5">{wishlistCount}</span>}
                </Link>
              </div> */}

                <div className="relative group">
                <Link className="flex items-center gap-1" href="/ecommerce1/wishlist">
                  <TruckElectric className="h-6 w-6 " /> <span className="font-semibold">Track Oder</span>
            
                </Link>
              </div>


              {/* Cart */}
              <div className="relative group">
                <Link className="flex gap-1" href="/ecommerce1/cart">
                  {cartCount > 0 && <span className="absolute  -top-2 right-15 bg-red-500 text-white text-xs font-bold rounded-full px-1.5">{cartCount}</span>}
                  <ShoppingCart className="h-6 w-6" /><span className="font-semibold">My Cart</span>
                
                </Link>
              </div>

              {/* User */}
              <div className="relative" ref={accountMenuRef}>
                <button
                  onClick={toggleAccountMenu}
                  className="p-2 rounded-md hover:bg-gray-100 transition-colors hidden lg:flex items-center justify-center gap-1"
                >
                  <User className="h-6 w-6 cursor-pointer" /><span className="font-semibold">Accopunt</span>
                </button>

                {isAccountMenuOpen && (
                  <>
                    {user ? (
                      <AccountMenu onClose={() => setIsAccountMenuOpen(false)} />
                    ) : (
                      <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg p-2 z-50">
                        <Link href="/ecommerce1/login" className="block px-3 py-2 rounded-md hover:bg-gray-100">
                          Login
                        </Link>
                        <Link href="/ecommerce1/signup" className="block px-3 py-2 rounded-md hover:bg-gray-100">
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
      </div>
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
}
