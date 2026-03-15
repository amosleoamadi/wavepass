import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (formData) => ({
        url: "/login",
        method: "POST",
        body: formData,
      }),
    }),

    register: builder.mutation({
      query: (information) => ({
        url: "/register",
        method: "POST",
        body: information,
      }),
    }),

    verifyEmail: builder.mutation({
      query: (verificationCode) => ({
        url: "/verify",
        method: "POST",
        body: verificationCode,
      }),
    }),

    resendCode: builder.mutation({
      query: (email) => ({
        url: "/resend",
        method: "POST",
        body: email,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (info) => ({
        url: "/forget",
        method: "POST",
        body: info,
      }),
    }),

    resetPassword: builder.mutation({
      query: (payload) => ({
        url: "/reset",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyEmailMutation,
  useResendCodeMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
