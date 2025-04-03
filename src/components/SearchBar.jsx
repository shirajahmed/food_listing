import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { api } from "../services/api";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const navigate = useNavigate();

  useEffect(() => {
    const isBarcode = /^\d{8,}$/.test(debouncedSearchTerm.trim());

    if (isBarcode) {
      api
        .get(`/api/v0/product/${debouncedSearchTerm.trim()}.json`)
        .then((response) => {
          if (response.data.status === 1) {
            setSearchTerm("");
            navigate(`/product/${debouncedSearchTerm.trim()}`);
          } else {
            updateSearchParams(debouncedSearchTerm);
          }
        })
        .catch(() => {
          updateSearchParams(debouncedSearchTerm);
        });
    } else {
      updateSearchParams(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const updateSearchParams = (term) => {
    const newParams = new URLSearchParams(searchParams);
    if (term) {
      newParams.set("q", term);
    } else {
      newParams.delete("q");
    }
    setSearchParams(newParams);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          placeholder="Search products or enter barcode...."
          className="w-full p-2 pl-10 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-[#db6763]/50 focus:outline-none shadow-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-4 w-4 h-4 text-gray-500 dark:text-gray-400" />
      </div>
      <div className="absolute right-3 top-3 text-xs text-gray-500 dark:text-gray-400">
        {/^\d{8,}$/.test(searchTerm.trim()) ? "Barcode detected" : ""}
      </div>
    </div>
  );
};

export default SearchBar;
