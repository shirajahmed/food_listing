import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import SkeletonLoader from "../components/SkeletonLoader";
import { useDarkMode } from "../context/DarkModeContext";

const ProductDetailPage = () => {
  const { barcode } = useParams();
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", barcode],
    queryFn: async () => {
      const response = await api.get(`/api/v0/product/${barcode}.json`);
      if (response.data.status === 0) {
        throw new Error("Product not found");
      }
      return response.data.product;
    },
    retry: false,
  });

  if (isLoading) return <SkeletonLoader count={1} />;

  if (isError) {
    return (
      <div className="container mx-auto p-4 max-w-4xl text-center">
        <h1 className="text-2xl font-bold mb-4 dark:text-white">
          Product not found
        </h1>
        <p className="mb-4 dark:text-gray-300">
          No product found with barcode: {barcode}
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Search
        </button>
      </div>
    );
  }

  const labels = [
    ...(product.labels_tags || []),
    ...(product.allergens_tags || []),
    ...(product.additives_tags || []),
    ...(product.categories_tags || []),
  ]
    .filter(Boolean)
    .map((tag) => tag.replace(/en:/g, "").replace(/-/g, " "))
    .filter((value, index, self) => self.indexOf(value) === index);

  return (
    <div
      className={`container mx-auto p-4 max-w-4xl ${darkMode ? "dark" : ""}`}
    >
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left column  */}
        <div className="md:w-1/3">
          <img
            src={product.image_url || "/placeholder-food.jpg"}
            alt={product.product_name}
            className="w-full rounded-lg shadow-md"
            onError={(e) => {
              e.target.src = "/placeholder-food.jpg";
            }}
          />
        </div>

        {/* Right column */}
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-4 dark:text-white">
            {product.product_name}
          </h1>

          {/* Product Details */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 dark:text-white">
              Product Details
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium dark:text-gray-300">Brand</p>
                <p className="dark:text-gray-400">
                  {product.brands || "Unknown"}
                </p>
              </div>
              <div>
                <p className="font-medium dark:text-gray-300">Quantity</p>
                <p className="dark:text-gray-400">
                  {product.quantity || "Unknown"}
                </p>
              </div>
              <div>
                <p className="font-medium dark:text-gray-300">Categories</p>
                <p className="dark:text-gray-400">
                  {product.categories?.split(",").join(", ") || "Unknown"}
                </p>
              </div>
              <div>
                <p className="font-medium dark:text-gray-300">
                  Nutrition Grade
                </p>
                <p className="dark:text-gray-400">
                  {product.nutrition_grades?.toUpperCase() || "Unknown"}
                </p>
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 dark:text-white">
              Ingredients
            </h2>
            <p className="dark:text-gray-300">
              {product.ingredients_text ||
                "Ingredients information not available"}
            </p>
          </div>

          {/* Nutrition Facts */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 dark:text-white">
              Nutrition Facts (per 100g)
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                <p className="font-medium dark:text-gray-300">Energy</p>
                <p className="dark:text-gray-400">
                  {product.nutriments?.["energy-kj_100g"]
                    ? `${Math.round(product.nutriments["energy-kj_100g"])} kJ`
                    : "N/A"}
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                <p className="font-medium dark:text-gray-300">Fat</p>
                <p className="dark:text-gray-400">
                  {product.nutriments?.fat_100g
                    ? `${product.nutriments.fat_100g}g`
                    : "N/A"}
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                <p className="font-medium dark:text-gray-300">Carbs</p>
                <p className="dark:text-gray-400">
                  {product.nutriments?.carbohydrates_100g
                    ? `${product.nutriments.carbohydrates_100g}g`
                    : "N/A"}
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                <p className="font-medium dark:text-gray-300">Sugars</p>
                <p className="dark:text-gray-400">
                  {product.nutriments?.sugars_100g
                    ? `${product.nutriments.sugars_100g}g`
                    : "N/A"}
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                <p className="font-medium dark:text-gray-300">Protein</p>
                <p className="dark:text-gray-400">
                  {product.nutriments?.proteins_100g
                    ? `${product.nutriments.proteins_100g}g`
                    : "N/A"}
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                <p className="font-medium dark:text-gray-300">Salt</p>
                <p className="dark:text-gray-400">
                  {product.nutriments?.salt_100g
                    ? `${product.nutriments.salt_100g}g`
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Labels & Tags */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 dark:text-white">
              Labels & Tags
            </h2>
            {labels.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {labels.map((label, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-sm capitalize"
                  >
                    {label}
                  </span>
                ))}
              </div>
            ) : (
              <p className="dark:text-gray-300">No labels or tags available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
