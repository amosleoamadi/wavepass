import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const overviewApi = createApi({
  reducerPath: "overview",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // Get token from your user slice
      const token = getState().user?.token;

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
      transformResponse: (response) => response,
    }),
    createEvent: builder.mutation({
      query: (data) => ({
        url: "/create",
        method: "POST",
        body: data,
      }),
    }),
    getEventByOrganizer: builder.query({
      query: (id, params) => {
        const queryString = new URLSearchParams(params).toString();
        return `/organizer/event/${id}?${queryString}`;
      },
    }),
    checkinAttendee: builder.mutation({
      query: ({ code, eventId }) => ({
        url: `/check-in/${eventId}`,
        method: "POST",
        body: { code },
      }),
    }),
    getAttendeeByCode: builder.query({
      query: ({ code, id }) => `/attendee/${id}?code=${code}`,
    }),
    endTicketSales: builder.query({
      query: (id) => `/sale/${id}`,
    }),
    startTicketSales: builder.query({
      query: (id) => `/sold/${id}`,
    }),
  }),
});

// Export hook for usage in components
export const {
  useGetOverviewDataQuery,
  useCreateEventMutation,
  useGetEventByOrganizerQuery,
  useCheckinAttendeeMutation,
  useGetAttendeeByCodeQuery,
  useEndTicketSalesQuery,
  useStartTicketSalesQuery,
} = overviewApi;
