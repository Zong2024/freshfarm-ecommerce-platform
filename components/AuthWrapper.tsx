"use client";

import { useEffect } from "react";

import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

import {
  logout,
  restoreAuth,
  setCredentials,
} from "@/lib/store/features/auth/authSlice";
import { useCheckAuthMutation } from "@/lib/store/services/authApi";

export const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const [checkAuth] = useCheckAuthMutation();
  useEffect(() => {
    const verifyUser = async () => {
      const token = Cookies.get("token");
      const uid = Cookies.get("uid");
      if (!token) {
        dispatch(logout());
        return;
      }
      try {
        const response = await checkAuth().unwrap();
        if (response.success === true) {
          dispatch(restoreAuth({ uid: response.uid || uid || "", token }));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        dispatch(logout());
      }
    };
    verifyUser();
  }, [checkAuth, dispatch]);
  return <>{children}</>;
};
