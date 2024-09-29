import { configureStore } from '@reduxjs/toolkit';
import { articlesApi } from './articlesApi';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    [articlesApi.reducerPath]: articlesApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articlesApi.middleware),
});

export default store;
