import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import CategoryFilter from "./CategoryFilter";
import Select from "react-select";
import { useDarkMode } from "../context/DarkModeContext";

const nutrientOptions = [
  { id: "sugar", label: "Sugar (g)", field: "sugars_100g" },
  { id: "fat", label: "Fat (g)", field: "fat_100g" },
  { id: "salt", label: "Salt (g)", field: "salt_100g" },
  { id: "proteins", label: "Proteins (g)", field: "proteins_100g" },
  { id: "energy", label: "Energy (kJ)", field: "energy-kj_100g" },
];

const sortOptions = [
  { value: "product_name", label: "Name (A-Z)" },
  { value: "-product_name", label: "Name (Z-A)" },
  { value: "nutrition_grade", label: "Nutrition Grade (Asc)" },
  { value: "-nutrition_grade", label: "Nutrition Grade (Desc)" },
  { value: "nutriments.energy-kj_100g", label: "Energy (Low to High)" },
  { value: "-nutriments.energy-kj_100g", label: "Energy (High to Low)" },
];

const Filters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [nutrientFilters, setNutrientFilters] = useState(
    JSON.parse(searchParams.get("nutrientFilters") || "[]")
  );
  const [showAdvanced, setShowAdvanced] = useState(false);
  const { darkMode } = useDarkMode();

  const updateUrlParams = (newFilters) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("nutrientFilters", JSON.stringify(newFilters));
    setSearchParams(newParams);
  };

  const addNutrientFilter = () => {
    const newFilters = [
      ...nutrientFilters,
      { nutrient: "", compare: "<=", value: "" },
    ];
    setNutrientFilters(newFilters);
    updateUrlParams(newFilters);
  };

  const updateNutrientFilter = (index, field, value) => {
    const newFilters = [...nutrientFilters];
    newFilters[index][field] = value;
    setNutrientFilters(newFilters);
    updateUrlParams(newFilters);
  };

  const removeNutrientFilter = (index) => {
    const newFilters = nutrientFilters.filter((_, i) => i !== index);
    setNutrientFilters(newFilters);
    updateUrlParams(newFilters);
  };

  const handleSortChange = (selectedOption) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", selectedOption.value);
    setSearchParams(newParams);
  };

  return (
    <div className="mb-8 p-4 border rounded-lg shadow-md dark:bg-gray-900 dark:border-gray-800">
      {/* 🔹 Short Filters (Category Filter) */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex-1">
          <CategoryFilter />
        </div>

        <div className="w-1/4 mb-4">
          <h3 className="font-semibold mb-2">Sort By</h3>
          <Select
            options={sortOptions}
            value={sortOptions.find(
              (opt) => opt.value === searchParams.get("sort_by")
            )}
            onChange={handleSortChange}
            className="dark:text-white dark:bg-gray-800 dark:border-gray-700"
            styles={{
              control: (provided) => ({
                ...provided,
                backgroundColor: darkMode ? "#222937" : "white",
                borderColor: "gray",
                color: darkMode ? "white" : "black",
              }),
              menu: (provided) => ({
                ...provided,
                backgroundColor: darkMode ? "#222937" : "white",
                color: darkMode ? "white" : "black",
              }),
              singleValue: (provided) => ({
                ...provided,
                color: darkMode ? "white" : "black",
              }),
            }}
          />
        </div>
      </div>

      {/* 🔹 Advanced Search Toggle */}
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="w-full text-left font-semibold py-2 text-blue-500 hover:text-blue-700"
      >
        {showAdvanced ? "▼ Hide Advanced Search" : "▶ Show Advanced Search"}
      </button>

      {showAdvanced && (
        <div className="mt-4 space-y-6">
          {/* 🔹 Nutrient Filters */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-4">Advanced Filters</h3>

            <div className="space-y-3">
              {nutrientFilters.map((filter, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <select
                    value={filter.nutrient}
                    onChange={(e) =>
                      updateNutrientFilter(index, "nutrient", e.target.value)
                    }
                    className="p-2 border rounded flex-1 dark:bg-gray-800 dark:border-gray-700"
                  >
                    <option value="">Select Nutrient</option>
                    {nutrientOptions.map((opt) => (
                      <option key={opt.id} value={opt.field}>
                        {opt.label}
                      </option>
                    ))}
                  </select>

                  <select
                    value={filter.compare}
                    onChange={(e) =>
                      updateNutrientFilter(index, "compare", e.target.value)
                    }
                    className="p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
                  >
                    <option value="<=">≤</option>
                    <option value=">=">≥</option>
                  </select>

                  <input
                    type="number"
                    placeholder="Value"
                    value={filter.value}
                    onChange={(e) =>
                      updateNutrientFilter(index, "value", e.target.value)
                    }
                    className="p-2 border rounded w-24 dark:bg-gray-800 dark:border-gray-700"
                  />

                  <button
                    onClick={() => removeNutrientFilter(index)}
                    className="text-red-500 hover:text-red-700 font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}

              <button
                onClick={addNutrientFilter}
                className="text-blue-500 hover:text-blue-700 text-sm"
              >
                + Add Nutrient Filter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;
