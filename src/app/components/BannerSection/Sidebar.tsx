// components/Sidebar.tsx

import { ChevronRightIcon } from "lucide-react";


const categories = [
  {
    name: "Woman's Fashion",
    subCategories: [
      'Dresses',
      'Tops',
      'Bottoms',
      'Accessories'
    ]
  },
  {
    name: "Men's Fashion",
    subCategories: [
      'Shirts',
      'Pants',
      'Jackets',
      'Shoes'
    ]
  },
  {
    name: 'Electronics',
    subCategories: [
      'Laptops',
      'Smartphones',
      'Cameras',
      'Headphones'
    ]
  },
  { name: 'Home & Lifestyle' },
  { name: 'Medicine' },
  { name: 'Sports & Outdoor' },
  { name: "Baby's & Toys" },
  { name: 'Groceries & Pets' },
  { name: 'Health & Beauty' },
];

const Sidebar = () => {
  return (
    <div className="md:w-64 flex-shrink-0 bg-white border-r border-gray-200 relative z-10">
      <ul className="py-4">
        {categories.map((category, index) => (
          <li key={index} className="relative group">
            <a href="#" className="flex justify-between items-center py-2 px-6 text-gray-700 hover:text-red-500 transition-colors">
              <span>{category.name}</span>
              {category.subCategories && (
                <ChevronRightIcon className="h-4 w-4 text-gray-400 group-hover:text-red-500 group-hover:rotate-90 transition-all duration-300" />
              )}
            </a>
            {/* Nested Categories on Hover */}
            {category.subCategories && (
              <div className="hidden group-hover:block absolute left-full top-0 w-64 bg-white border border-gray-200 shadow-lg py-2">
                <ul className="list-none m-0 p-0">
                  {category.subCategories.map((subCat, subIndex) => (
                    <li key={subIndex}>
                      <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-100 transition-colors">
                        {subCat}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;