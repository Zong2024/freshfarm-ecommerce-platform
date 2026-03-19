import { AuthCheckResponse, LoginRequest, LoginResponse } from "@/types/auth";

import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/admin/signin",
        method: "POST",
        body: credentials,
      }),
      extraOptions: { noApiPath: true },
    }),
    checkAuth: builder.mutation<AuthCheckResponse, void>({
      query: () => ({
        url: "/api/user/check",
        method: "POST",
      }),
      extraOptions: { noApiPath: true },
    }),
  }),
});

export const { useLoginMutation, useCheckAuthMutation } = authApi;
