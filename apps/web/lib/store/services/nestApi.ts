import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const NEST_API_URL = process.env.NEXT_PUBLIC_NEST_API_URL || 'http://localhost:3001';

export const nestApi = createApi({
  reducerPath: 'nestApi',
  baseQuery: fetchBaseQuery({
    baseUrl: NEST_API_URL,
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['NestProduct', 'NestOrder', 'NestCart', 'NestAuth'],
  endpoints: () => ({}),
});