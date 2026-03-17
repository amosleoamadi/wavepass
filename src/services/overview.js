import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const overviewApi = createApi({
  reducerPath: "overview",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // Get token from your user slice
      const token = getState().user?.token;
      console.log(token);

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getOverviewData: builder.query({
      query: (params) => {
        // Convert params object to query string
        const queryString = new URLSearchParams(params).toString();
        return `/organizer/events?${queryString}`;
      },
      transformResponse: (response) => response.data,
    }),
  }),
});

// Export hook for usage in components
export const { useGetOverviewDataQuery } = overviewApi;
