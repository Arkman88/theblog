import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog-platform.kata.academy/api/',
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
    getArticle: builder.query({
      query: (slug) => `articles/${slug}`,
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
    likeArticle: builder.mutation({
      query: ({ slug, method }) => ({
        url: `articles/${slug}/favorite`,
        method,
        body: {},
      }),
    }),
    createArticle: builder.mutation({
      query: (articleData) => ({
        url: 'articles',
        method: 'POST',
        body: { article: articleData },
      }),
    }),
    deleteArticle: builder.mutation({
      query: (slug) => ({
        url: `articles/${slug}`,
        method: 'DELETE',
      }),
    }),
    updateArticle: builder.mutation({
      query: ({ slug, articleData }) => ({
        url: `articles/${slug}`,
        method: 'PUT',
        body: { article: articleData },
      }),
    }),
  }),
});

export const {
  useFetchArticlesQuery,
  useGetArticleQuery,
  useCreateUserMutation,
  useLoginUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
  useLikeArticleMutation,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
} = articlesApi;
