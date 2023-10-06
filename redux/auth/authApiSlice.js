const { apiSlice } = require("../api/apiSlice");

export const authApiAlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (credentials) => ({
        url: "/user/signUp",
        method: "POST",
        body: { ...credentials },
      }),
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: "/user/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),

    verifyOtp: builder.mutation({
      query: (credentials) => ({
        url: "/user/verify-otp",
        method: "POST",
        body: { ...credentials },
      }),
    }),

    resendOtp: builder.mutation({
      query: ({ email }) => ({
        url: "/user/verify-otp",
        method: "POST",
        body: { email },
      }),
    }),
  }),
});

export const { useSignUpMutation, useLoginMutation, useVerifyOtpMutation, useResendOtpMutation } =
  authApiAlice;
