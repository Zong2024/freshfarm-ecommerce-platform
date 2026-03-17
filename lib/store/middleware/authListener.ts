import { createListenerMiddleware } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

import { logout, setCredentials } from "../features/auth/authSlice";

export const authListenerMiddleware = createListenerMiddleware();

authListenerMiddleware.startListening({
  actionCreator: setCredentials,
  effect: (action) => {
    const { token, uid, expired } = action.payload;
    const expiresDate = new Date(expired);
    Cookies.set("token", token, { expires: expiresDate });
    Cookies.set("uid", uid, { expires: expiresDate });
    console.log("Middleware 攔截Token");
  },
});
authListenerMiddleware.startListening({
  actionCreator: logout,
  effect: () => {
    Cookies.remove("token");
    Cookies.remove("uid");
    console.log("Middleware 攔截登出");
  },
});
