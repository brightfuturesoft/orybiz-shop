'use client';

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { User, Heart, ShoppingCart, Search, Menu } from "lucide-react";
import MobileMenu from "../MobileMenu/MobileMenu";
import AccountMenu from "../AccountMenu/AccountMenu";
import Skeleton from "@/app/ui/LogoSkeleton/LogoSkeleton";
import { TWorkSpace } from "@/app/types/types";
import { useAuthStore } from "@/store/loginStore";
import CryptoJS from "crypto-js";

const SECRET_KEY = "bright-erp-secret";

interface NavbarProps {
  workspace: TWorkSpace | null;
  loading?: boolean;
}

export default function Navbar({ workspace, loading }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const accountMenuRef = useRef<HTMLDivElement>(null);
  const storeUser = useAuthStore((state) => state.user);

 useEffect(() => {
    if (storeUser) {
      setUser(storeUser);
      return;
    }
    if (typeof window === "undefined") return;
    const cookies = document.cookie.split("; ");
    const userCookie = cookies.find((c) => c.endsWith(".user_info"));
    if (!userCookie) return;
    const value = userCookie.split("=")[1];
    try {
      const bytes = CryptoJS.AES.decrypt(value, SECRET_KEY);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      setUser(JSON.parse(decrypted));
    } catch (err) {
      console.error("Cookie decryption failed", err);
    }
  }, [storeUser]);

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
  const links = [
    { label: "Home", href: "/" },
    { label: "Contact", href: "/ecommerce1/contact" },
    { label: "About", href: "/ecommerce1/about" },
    ...(user ? [] : [{ label: "Sign Up", href: "/ecommerce1/signup" }]),
  ];

  return (
    <header className="sticky top-0 z-50 py-3 w-full border-b border-gray-300 bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between relative">
          {/* Left */}
          <div className="flex items-center space-x-4 md:space-x-8">
            <button onClick={() => setIsMenuOpen(true)} className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors">
              <Menu className="h-6 w-6" />
            </button>
            {loading ? (
              <Skeleton width={150} height={50} />
            ) : (
              workspace?.image && <Image src={workspace.image} alt={workspace.name || "Logo"} width={150} height={50} className="object-contain" />
            )}
          </div>

          {/* Center */}
          <nav className="hidden md:flex flex-grow justify-center">
            <ul className="flex items-center space-x-8 lg:space-x-12">
              {links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={`relative cursor-pointer text-black hover:text-red-500 transition-colors`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right */}
          <div className="flex items-center space-x-2">
            <div className="relative hidden md:block w-48 lg:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search products..." className="w-full pl-10 pr-4 py-2 rounded-md border-transparent bg-gray-100 text-sm focus:outline-none focus:bg-white focus:border-gray-300 transition-colors" />
            </div>

            <div className="flex items-center space-x-2">
              {/* Wishlist */}
              <div className="relative group">

                <Link href="/ecommerce1/wishlist">
                  <Heart className="h-6 w-6" />
                {wishlistCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1.5">{wishlistCount}</span>}
                
                </Link>
              </div>
              {/* Cart */}
              <div className="relative group">
                <Link href="/ecommerce1/cart">
                  <ShoppingCart className="h-6 w-6" />
                  {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1.5">{cartCount}</span>}
                </Link>
              </div>

              {/* User */}
              {user && (
                <div className="relative" ref={accountMenuRef}>
                  <button onClick={toggleAccountMenu} className="p-2 rounded-md hover:bg-gray-100 transition-colors hidden lg:flex items-center justify-center">
                    <User className="h-6 w-6 cursor-pointer" />
                  </button>
                  {isAccountMenuOpen && <AccountMenu onClose={() => setIsAccountMenuOpen(false)} />}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
}
