import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GET_PRODUCTS_URL,
  GET_PRODUCT_DETAILS_URL,
  SEARCH_PRODUCT_URL,
} from "@/constant/endpoints";
import { BASE_URL } from "@/http";

export const getProductsApi = createApi({
  reducerPath: "productApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api`,
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => GET_PRODUCTS_URL,
    }),
    getProductById: builder.query({
      query: (id) => `${GET_PRODUCT_DETAILS_URL}/${id}`,
    }),
    searchProducts: builder.query({
      query: (query) => `${SEARCH_PRODUCT_URL}?query=${query}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery, useSearchProductsQuery } = getProductsApi;
