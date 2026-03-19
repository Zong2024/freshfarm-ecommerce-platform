import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { AuthState, LoginResponse } from "@/types/auth";

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  expired: null,
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
    },
    logout: () => initialState,
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
