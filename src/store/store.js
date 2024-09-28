import { configureStore } from '@reduxjs/toolkit';
import { articlesApi } from '../Utils/articlesApi';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    [articlesApi.reducerPath]: articlesApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articlesApi.middleware),
});

export default store;
