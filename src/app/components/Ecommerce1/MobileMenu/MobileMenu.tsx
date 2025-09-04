import React from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  return (
    <div className='bg-gray-50'>
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
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold mt-6 ml-5">Exclusive</h2>
            <button onClick={onClose} className="p-2 rounded-md hover:bg-gray-100">
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className='bg-white  w-64 h-screen bg-opacity-90 z-40 md:hidden transition-opacity px-5 border-t border-gray-300'>
            <ul className="flex flex-col space-y-4 text-lg mt-5">
              <li onClick={onClose} className="hover:text-red-500 transition-colors">
                <Link href="/">Home</Link>
              </li>
              <li onClick={onClose} className="hover:text-red-500 transition-colors">
                <Link href="/contact">Contact</Link>
              </li>
              <li onClick={onClose} className="hover:text-red-500 transition-colors">
                <Link href="/about">About</Link>
              </li>
              <li onClick={onClose} className="hover:text-red-500 transition-colors">
                <Link href="/signup">Sign Up</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;