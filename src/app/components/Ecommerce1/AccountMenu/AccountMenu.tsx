
import { User, ShoppingBag, Star, LogOut } from 'lucide-react';
 import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import Link from 'next/link';


export interface AccountMenuProps {
  onClose: () => void;
}

const AccountMenu: React.FC<AccountMenuProps> = () => {



const handleLogout = () => {
  const cookies = document.cookie.split('; ');
  cookies.forEach(c => {
    const name = c.split('=')[0];
    if (name.endsWith('.user_info')) Cookies.remove(name);
  });
  toast.success('Logged out successfully');
  window.location.reload();
};


  return (
    <div className="absolute top-full right-0 mt-2 w-72 rounded-md p-4 md:p-6 bg-gradient-to-br from-gray-800 to-purple-950 shadow-2xl z-50">
      <ul className="text-white text-lg space-y-4">
        <li className="flex items-center space-x-4 p-2 rounded-lg cursor-pointer hover:bg-white/10 transition-colors duration-200">
          <Link href={"/profile"} className='flex items-center gap-2' ><User size={20} />
          <span>Manage My Account</span>
          </Link>
        </li>
        <li  className="flex items-center space-x-4 p-2 rounded-lg cursor-pointer hover:bg-white/10 transition-colors duration-200">
       <Link href={"/profile?section=My Orders"} className='flex items-center gap-2' >
          <ShoppingBag size={20} />
          <span>My Order</span>
       </Link>
        </li>

        <li  className="flex items-center space-x-4 p-2 rounded-lg cursor-pointer hover:bg-white/10 transition-colors duration-200">
       <Link href={"/profile?section=My Reviews"} className='flex items-center gap-2' >
          <Star size={20} />
          <span>My Reviews</span>
       </Link>
        </li>
        <li
          onClick={handleLogout}
          className="flex items-center space-x-4 p-2 rounded-lg cursor-pointer hover:bg-white/10 transition-colors duration-200"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default AccountMenu;
