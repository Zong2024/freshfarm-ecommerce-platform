"use client";

import { useEffect } from "react";

import { useDispatch } from "react-redux";

import { hydrateLocalCart } from "@/lib/store/features/cart/cartSlice";

export const CartInitializer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("guestCart");
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (parsedCart.length > 0) {
          dispatch(hydrateLocalCart(parsedCart));
        }
      }
    } catch (error) {
      console.error("讀取localStorage失敗", error);
      localStorage.removeItem("guestCart");
    }
  }, [dispatch]);

  return null;
};
