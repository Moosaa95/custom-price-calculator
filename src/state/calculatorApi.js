import { api } from "./api";

export const CalculatorApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/get_products/",
      providesTags: ["Calculator"],
    }),
    calculatePrice: builder.mutation({
      query: (payload) => ({
        url: "/calculate_price/",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useGetProductsQuery, useCalculatePriceMutation } = CalculatorApi;
