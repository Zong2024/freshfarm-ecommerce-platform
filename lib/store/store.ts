import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./features/auth/authSlice";
import cartReducer from "./features/cart/cartSlice";
import { authListenerMiddleware } from "./middleware/authListener";
import { baseApi } from "./services/baseApi";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      auth: authReducer,
      cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .prepend(authListenerMiddleware.middleware)
        .concat(baseApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
