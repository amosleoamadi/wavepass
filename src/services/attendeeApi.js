import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const attendeeApi = createApi({
  reducerPath: "attendeeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: ({ price, date, category, pageNumber = 1, pageSize = 6 }) => {
        const params = new URLSearchParams();
        if (price) params.append("price", price);
        if (date) params.append("date", date);
        if (category) params.append("category", category);
        params.append("pageNumber", pageNumber);
        params.append("pageSize", pageSize);
        return `/events?${params.toString()}`;
      },
    }),

    getEventDetails: builder.query({
      query: (id) => `/event/${id}`,
    }),

    checkoutTicket: builder.mutation({
      query: ({ eventId, ...body }) => ({
        url: `/ticket/${eventId}`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetEventDetailsQuery,
  useCheckoutTicketMutation,
} = attendeeApi;
