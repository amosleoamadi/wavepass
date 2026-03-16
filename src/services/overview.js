import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query";

export const overviewApi = createApi({
  reducerPath: "overview",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    overviewData: builder.query(),
  }),
});
