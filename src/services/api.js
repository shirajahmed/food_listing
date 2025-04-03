import axios from "axios";
import qs from "qs";

export const api = axios.create({
  baseURL: "https://world.openfoodfacts.org",
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
});

// Helper function to get products
export const getProducts = async (page = 1, pageSize = 20) => {
  const response = await api.get("/products.json", {
    params: { page, page_size: pageSize },
  });
  return response.data;
};
