import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./features/auth/authSlice";
import cartReducer from "./features/cart/cartSlice";
import { authListenerMiddleware } from "./middleware/authListener";
import { cartSyncMiddleware } from "./middleware/cartSyncMiddleware";
import { baseApi } from "./services/baseApi";
import { nestApi } from "./services/nestApi";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      [nestApi.reducerPath]: nestApi.reducer,
      auth: authReducer,
      cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .prepend(authListenerMiddleware.middleware)
        .prepend(cartSyncMiddleware.middleware)
        .concat(baseApi.middleware)
        .concat(nestApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
