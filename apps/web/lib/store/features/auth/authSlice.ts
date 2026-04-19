import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { AuthState, LoginResponse } from '@freshfarm/types';

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  expired: null,
  isInitialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<LoginResponse>) => {
      const { uid, token, expired } = action.payload;
      state.user = { uid };
      state.token = token;
      state.expired = expired;
      state.isAuthenticated = true;
      state.isInitialized = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.expired = null;
      state.isInitialized = true;
    },
    restoreAuth: (
      state,
      action: PayloadAction<{ uid: string; token: string }>
    ) => {
      const { uid, token } = action.payload;
      state.user = { uid };
      state.token = token;
      state.isAuthenticated = true;
      state.isInitialized = true;
    },
  },
});

export const { setCredentials, logout, restoreAuth } = authSlice.actions;
export default authSlice.reducer;
