import React, { useEffect } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { TWorkSpace } from "@/app/types/types";
import Image from "next/image";
import { useUserStore } from "@/store/userStore";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  workspace: TWorkSpace;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  workspace,
  isOpen,
  onClose,
}) => {
  const { user, fetchUser } = useUserStore();
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleLogout = () => {
    const cookies = document.cookie.split("; ");
    cookies.forEach((c) => {
      const name = c.split("=")[0];
      if (name.endsWith(".user_info")) Cookies.remove(name);
    });
    toast.success("Logged out successfully");
    window.location.reload();
  };

  return (
    <div className="bg-gray-50">
      {/* Backdrop for the transparent overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-white bg-opacity-90 z-40 md:hidden transition-opacity duration-300 w-full "
          onClick={onClose}
        ></div>
      )}

      {/* Full-screen menu panel */}
      <div
        className={`fixed top-0 left-0 h-full  w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="">
          <div className="flex justify-between items-center mb-6">
            <Link className="mt-2" href="/">
              <Image
                src={workspace?.image}
                alt={workspace?.name || "Logo"}
                width={120}
                height={40}
                className="object-contain"
              />
            </Link>
            <button
              onClick={onClose}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="bg-white  w-64 h-screen bg-opacity-90 z-40 md:hidden transition-opacity px-5 border-t border-gray-300">
            <ul className="flex flex-col space-y-4 text-lg mt-5">
              <li
                onClick={onClose}
                className="hover:text-red-500 transition-colors"
              >
                <Link href="/">Home</Link>
              </li>
              <li
                onClick={onClose}
                className="hover:text-red-500 transition-colors"
              >
                <Link href="/ecommerce1/wishlist">My WishList</Link>
              </li>
              <li
                onClick={onClose}
                className="hover:text-red-500 transition-colors"
              >
                <Link href="/about">Track Order</Link>
              </li>
              {user ? (
                <Link
                  href={"/ecommerce1/profile"}
                  className="flex items-center gap-2 hover:text-red-500 transition-colors"
                >
                  <span>Manage My Account</span>
                </Link>
              ) : (
                <li
                  onClick={onClose}
                  className="hover:text-red-500 transition-colors"
                >
                  <Link href="/ecommerce1/signup">Sign Up</Link>
                </li>
              )}

              <li
                onClick={handleLogout}
                className="cursor-pointer hover:text-red-500 transition-colors"
              >
                <span>Logout</span>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
