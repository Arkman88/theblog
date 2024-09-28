import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog.kata.academy/api/',
    prepareHeaders: (headers) => {
      const token = JSON.parse(localStorage.getItem('user'))?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchArticles: builder.query({
      query: ({ limit = 5, offset = 0 }) => `articles?limit=${limit}&offset=${offset}`,
    }),
    createUser: builder.mutation({
      query: (userData) => ({
        url: 'users',
        method: 'POST',
        body: { user: { ...userData, image: '' } },
      }),
    }),
    loginUser: builder.mutation({
      query: (loginData) => ({
        url: 'users/login',
        method: 'POST',
        body: { user: loginData },
      }),
    }),
    getUser: builder.query({
      query: () => 'user',
    }),
    updateUser: builder.mutation({
      query: (userData) => ({
        url: 'user',
        method: 'PUT',
        body: { user: userData },
      }),
    }),
  }),
});

export const {
  useFetchArticlesQuery,
  useCreateUserMutation,
  useLoginUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} = articlesApi;
