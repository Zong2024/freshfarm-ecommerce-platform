import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_PATH = process.env.NEXT_PUBLIC_API_PATH;

if (!API_URL && process.env.NODE_ENV === "development") {
  console.warn(
    "⚠️ [RTK Query]: NEXT_PUBLIC_API_URL 未設定。請確認是否已設定 Next.js Rewrites。"
  );
}
if (!API_PATH && process.env.NODE_ENV === "development") {
  console.warn(
    "⚠️ [RTK Query]: NEXT_PUBLIC_API_PATH 未設定。請確認是否已設定 Next.js Rewrites。"
  );
}
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}${API_PATH}`,
  }),
  tagTypes: ["Product"],
  endpoints: () => ({}),
});
