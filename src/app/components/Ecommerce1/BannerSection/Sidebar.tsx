
import { ChevronRightIcon } from "lucide-react";

interface Category {
  _id: string;
  name: string;
  children?: Category[];
}

interface Props {
  categories: Category[];
}

// Recursive component
const SidebarItem = ({ category }: { category: Category }) => {
  const hasChildren = category.children && category.children.length > 0;

  return (
    <li className="relative group">
      <a
        href="#"
        className="flex justify-between items-center py-2 px-6 text-gray-700 hover:text-red-500 transition-colors"
      >
        <span>{category.name}</span>
        {hasChildren && (
          <ChevronRightIcon className="h-4 w-4 text-gray-400 group-hover:text-red-500 group-hover:rotate-90 transition-all duration-300" />
        )}
      </a>

      {hasChildren && (
        <div className="hidden group-hover:block absolute left-full top-0 w-64 bg-white border border-gray-200 shadow-lg py-2">
          <ul className="list-none m-0 p-0">
            {category.children!.map(child => (
              <SidebarItem key={child._id} category={child} />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

const Sidebar = ({ categories }: Props) => {
  return (
    <div className="md:w-64 flex-shrink-0 bg-white border-r border-gray-200 relative z-10">
      <ul className="py-4">
        {categories.map(cat => (
          <SidebarItem key={cat._id} category={cat} />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
