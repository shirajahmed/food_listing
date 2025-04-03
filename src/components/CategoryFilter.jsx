import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { useSearchParams } from "react-router-dom";
import Select from "react-select";
import { useDarkMode } from "../context/DarkModeContext";

const CategoryFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategories = searchParams.getAll("category");
  const { darkMode } = useDarkMode();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await api.get("facets/categories.json");
      return response.data.tags
        .map((tag) => ({
          value: tag.id,
          label: `${tag.name} (${tag.products})`,
          products: tag.products,
        }))
        .filter((cat) => cat.products > 1000);
    },
  });

  const handleCategoryChange = (selectedOptions) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("category");

    selectedOptions.forEach((option) =>
      newParams.append("category", option.value)
    );
    setSearchParams(newParams);
  };

  if (isLoading) return <p>Loading categories...</p>;
  if (isError) return <p className="text-red-500">Error loading categories</p>;

  return (
    <div className="mb-4 w-auto">
      <h3 className="font-semibold mb-2">Categories</h3>
      <Select
        isMulti
        options={data}
        value={data.filter((cat) => selectedCategories.includes(cat.value))}
        onChange={handleCategoryChange}
        placeholder="Search & select categories..."
        className="dark:text-white dark:bg-gray-800 dark:border-gray-700"
        styles={{
          control: (provided) => ({
            ...provided,
            backgroundColor: darkMode ? "#222937" : "white",
            borderColor: "gray",
          }),
          menu: (provided) => ({
            ...provided,
            backgroundColor: darkMode ? "#222937" : "white",
          }),
        }}
      />
    </div>
  );
};

export default CategoryFilter;
