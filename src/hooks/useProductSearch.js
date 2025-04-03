import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../services/api";

export const useProductSearch = (searchParams) => {
  return useInfiniteQuery({
    queryKey: ["products", Object.fromEntries(searchParams)],
    queryFn: async ({ pageParam = 1 }) => {
      // If no search terms or filters, use the basic products endpoint
      if (!searchParams.get("q") && !searchParams.getAll("category").length) {
        const response = await api.get(`/products.json`, {
          params: {
            page: pageParam,
            page_size: 20,
          },
        });
        return {
          products: response.data.products,
          page: response.data.page,
          page_count: response.data.page_count,
        };
      }

      //  use the advanced search
      const params = {
        search_terms: searchParams.get("q") || "",
        categories_tags: searchParams.getAll("category"),
        sort_by: searchParams.get("sort_by") || "product_name",
        page: pageParam,
        json: 1,
        page_size: 20,
      };

      JSON.parse(searchParams.get("nutrientFilters") || "[]").forEach(
        (filter, index) => {
          params[`nutriment_${index}`] = filter.nutrient;
          params[`nutriment_${index}_compare`] = filter.compare;
          params[`nutriment_${index}_value`] = filter.value;
        }
      );

      const response = await api.get("/cgi/search.pl", { params });
      return response.data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.page_count
        ? lastPage.page + 1
        : undefined;
    },
    keepPreviousData: true,
  });
};
