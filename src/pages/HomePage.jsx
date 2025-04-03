import { useSearchParams } from "react-router-dom";
import { useProductSearch } from "../hooks/useProductSearch";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
  } = useProductSearch(searchParams);

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <Filters />

      {isError && (
        <div className="text-red-500 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg mb-4">
          {error?.message || "Something went wrong"}
        </div>
      )}

      <ProductList
        pages={data?.pages}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
};

export default HomePage;
