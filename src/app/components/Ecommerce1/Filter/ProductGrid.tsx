import Image from "next/image";
import StarRating from "./StarRating";

const ProductGrid = ({
  products,
  viewMode,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  products: any[];
  viewMode: "grid" | "list";
}) => {
  if (products.length === 0)
    return (
      <div className="text-center py-12 text-gray-500">No products found.</div>
    );

  return (
    <div
      className={`grid gap-4 ${
        viewMode === "grid"
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          : "grid-cols-1"
      }`}
    >
      {products.map((product) => (
        <div
          key={product.id}
          className={`bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer ${
            viewMode === "list" ? "flex" : ""
          }`}
        >
          <div className={`${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}>
            <div
              className={`${
                viewMode === "list"
                  ? "relative w-full h-32"
                  : "relative w-full h-48"
              }`}
            >
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>
            {product.discount > 0 && (
              <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                -{product.discount}%
              </div>
            )}
          </div>
          <div className="p-4 flex-1">
            <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
              {product.title}
            </h3>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg font-bold text-green-600">
                {product.currentPrice}
              </span>
              <span className="text-sm text-gray-500 line-through">
                {product.originalPrice}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <StarRating rating={product.rating} />
              <span className="text-xs text-gray-500">{product.brand}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ProductGrid;
