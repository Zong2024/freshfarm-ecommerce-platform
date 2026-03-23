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
    restoreAuth: (
      state,
      action: PayloadAction<{ uid: string; token: string }>
    ) => {
      const { uid, token } = action.payload;
      state.user = { uid };
      state.token = token;
      state.isAuthenticated = true;
    },
  },
});

export const { setCredentials, logout, restoreAuth } = authSlice.actions;
export default authSlice.reducer;
