import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload));
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('isAuthenticated', 'true');
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
    },
    checkAuthentication: (state) => {
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
      state.isAuthenticated = isAuthenticated;
    },
    initializeUser: (state) => {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData) {
        state.user = userData;
        state.isAuthenticated = true;
      }
    },
  },
});

export const { setUser, clearUser, initializeUser, checkAuthentication } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;

export default userSlice.reducer;
