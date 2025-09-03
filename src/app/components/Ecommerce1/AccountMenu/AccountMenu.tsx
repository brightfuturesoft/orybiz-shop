// src/components/AccountMenu.tsx
import { User, ShoppingBag, XCircle, Star, LogOut } from 'lucide-react';

export interface AccountMenuProps {
  onClose: () => void;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ onClose }) => {
  return (
    <div className="absolute top-full right-0 mt-2 w-72 rounded-md p-4 md:p-6 bg-gradient-to-br from-gray-800 to-purple-950 shadow-2xl">
      <ul className="text-white text-lg space-y-4">
        <li className="flex items-center space-x-4 p-2 rounded-lg cursor-pointer hover:bg-white/10 transition-colors duration-200">
          <User size={20} />
          <span>Manage My Account</span>
        </li>
        <li className="flex items-center space-x-4 p-2 rounded-lg cursor-pointer hover:bg-white/10 transition-colors duration-200">
          <ShoppingBag size={20} />
          <span>My Order</span>
        </li>
        <li className="flex items-center space-x-4 p-2 rounded-lg cursor-pointer hover:bg-white/10 transition-colors duration-200">
          <XCircle size={20} />
          <span>My Cancellations</span>
        </li>
        <li className="flex items-center space-x-4 p-2 rounded-lg cursor-pointer hover:bg-white/10 transition-colors duration-200">
          <Star size={20} />
          <span>My Reviews</span>
        </li>
        <li className="flex items-center space-x-4 p-2 rounded-lg cursor-pointer hover:bg-white/10 transition-colors duration-200">
          <LogOut size={20} />
          <span>Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default AccountMenu;