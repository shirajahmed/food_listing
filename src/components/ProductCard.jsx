import { Link } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext";
import placeholderImage from "../assets/placeholderfood.png";

const ProductCard = ({ product }) => {
  const { darkMode } = useDarkMode();
  const gradeColors = {
    a: "bg-green-500",
    b: "bg-blue-500",
    c: "bg-yellow-500",
    d: "bg-orange-500",
    e: "bg-red-500",
  };

  // Handle both API response formats
  const productName =
    product.product_name || product.product_name_en || "Unnamed Product";
  const imageUrl =
    product.image_url || product.image_front_url || "/placeholder-food.jpg";
  const nutritionGrade =
    product.nutrition_grades || product.nutrition_grade_fr || "N/A";
  const categories =
    product.categories || product.categories_tags?.join(", ") || "";

  return (
    <div
      className={`rounded-lg shadow-xs p-4 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white"
      } transition-all duration-200 hover:shadow-lg h-full flex flex-col`}
    >
      <Link
        to={`/product/${product.code || product._id}`}
        className="flex flex-col h-full"
      >
        <div className="relative mb-4 flex-grow-0">
          <img
            src={
              imageUrl === "/placeholder-food.jpg" ? placeholderImage : imageUrl
            }
            alt="Product"
            className="w-full h-48 object-cover rounded"
          />
          {nutritionGrade && (
            <div
              className={`absolute top-2 right-2 ${
                gradeColors[nutritionGrade.toLowerCase()] || "bg-gray-500"
              } text-white rounded-full px-3 py-1 text-xs font-bold flex items-center justify-center`}
            >
              {nutritionGrade.toUpperCase()}
            </div>
          )}
        </div>

        <div className="flex-grow">
          <h3 className="font-semibold mb-2 truncate">{productName}</h3>

          {categories && (
            <p className="text-sm mb-2 text-gray-500 dark:text-gray-400 truncate">
              {categories.split(",").slice(0, 2).join(", ")}
            </p>
          )}

          {product.ingredients_text && (
            <p className="text-sm mb-4 text-gray-600 dark:text-gray-300 line-clamp-3">
              Ingredients: {product.ingredients_text}
            </p>
          )}
        </div>

        <div className="flex justify-between items-center text-sm mt-auto">
          <span className="text-gray-500 dark:text-gray-400">
            {product.nutriments?.["energy-kj_100g"] ||
            product.nutriments?.energy_kj
              ? `${Math.round(
                  product.nutriments["energy-kj_100g"] ||
                    product.nutriments.energy_kj
                )} kJ`
              : "Energy: N/A"}
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            {product.nutriments?.proteins_100g || product.nutriments?.proteins
              ? `${
                  product.nutriments.proteins_100g ||
                  product.nutriments.proteins
                }g protein`
              : "Protein: N/A"}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
