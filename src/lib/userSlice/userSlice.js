import { FORGET_PASSWORD_URL, GET_USER_URL, LOG_IN_URL, OTP_URL, RESET_PASSWORD_URL, SIGN_UP_URL } from "@/constant/endpoints";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@/http";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api` }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => GET_USER_URL,
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: LOG_IN_URL,
        method: "POST",
        body: credentials,
      }),
    }),
    signUpUser: builder.mutation({
      query: (data) => ({
        url: SIGN_UP_URL,
        method: "POST",
        body: data,
      }),
    }),
    forgetPassword: builder.mutation({
      query: (email) => ({
        url: FORGET_PASSWORD_URL,
        method: "POST",
        body: email,
      }),
    }),
    otp: builder.mutation({
      query: (otp) => ({
        url: OTP_URL,
        method: "POST",
        body: otp,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: RESET_PASSWORD_URL,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {useGetUserQuery, useLoginUserMutation, useSignUpUserMutation, useForgetPasswordMutation, useOtpMutation, useResetPasswordMutation } = userApi;
