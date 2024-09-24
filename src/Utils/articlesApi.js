// src/Utils/articlesApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api/' }),
  endpoints: (builder) => ({
    fetchArticles: builder.query({
      query: ({ limit = 5, offset = 0 }) => `articles?limit=${limit}&offset=${offset}`,
    }),
  }),
});

export const { useFetchArticlesQuery } = articlesApi;
