"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { useCategoryStore } from "@/store/categoriesStore";
import { useProductStore } from "@/store/productStore";
import { Product } from "@/app/types/product";


export default function NavbarSearch() {
  const workspace = useWorkspaceStore((state) => state.workspace);
  const { categories, fetchCategories } = useCategoryStore();
  console.log(categories)
  const { products, fetchProducts } = useProductStore();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "");
  const [suggestions, setSuggestions] = useState<Product[]>([]);

  useEffect(() => {
    if (workspace?._id) {
      fetchCategories(workspace._id);
      fetchProducts(workspace._id);
    }
  }, [workspace, fetchCategories, fetchProducts]);

  // Update suggestions as user types
  useEffect(() => {
    if (!searchTerm) {
      setSuggestions([]);
      return;
    }
    const term = searchTerm.toLowerCase();
    const filtered = products?.filter((p) =>
      p.item_name.toLowerCase().includes(term)
    );
    setSuggestions(filtered || []);
  }, [searchTerm, products]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedTerm = searchTerm.trim();
    if (!trimmedTerm) return;
    router.replace(`/products?query=${encodeURIComponent(trimmedTerm)}`);
  };

  const handleSuggestionClick = (productId: string) => {
    router.push(`/products/${productId}`);
  };

  return (
    <div className="relative w-48 lg:w-[400px]">
      <form onSubmit={handleSearch}>
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-4 rounded-md border-transparent bg-gray-100 text-sm focus:outline-none focus:bg-white focus:border-gray-300 transition-colors"
        />
      </form>

      {/* Suggestions dropdown */}
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg">
          {suggestions.map((product) => (
            <li
              key={product._id}
              onClick={() => handleSuggestionClick(product._id)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
            >
              <span className="font-medium">{product.item_name}</span>{" "}
              <span className="text-gray-500 text-xs ml-1">({product.sku})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
