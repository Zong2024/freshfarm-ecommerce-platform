import { useCart } from "@/hooks/useCart";
import { act, renderHook } from "@testing-library/react";
import Cookies from "js-cookie";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { CustomToast } from "@/components/common/CustomToast";

import {
  addToLocalCart,
  clearLocalCart,
  deleteFromLocalCart,
  updateLocalCart,
} from "@/lib/store/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  useDeleteCartMutation,
  useGetCartQuery,
  usePostCartMutation,
  useUpdateCartMutation,
} from "@/lib/store/services/cartApi";
import { RootState } from "@/lib/store/store";

import { CartProduct } from "@/types/product";

vi.mock("js-cookie");
vi.mock("@/components/common/CustomToast");
vi.mock("@/lib/store/hooks");
vi.mock("@/lib/store/services/cartApi");
vi.mock("@/hooks/useHasHydrated", () => ({
  useHasHydrated: () => true,
}));

const mockedUseAppDispatch = vi.mocked(useAppDispatch);
const mockedUseAppSelector = vi.mocked(useAppSelector);
const mockedUsePostCartMutation = vi.mocked(usePostCartMutation);
const mockedUseDeleteCartMutation = vi.mocked(useDeleteCartMutation);
const mockedUseUpdateCartMutation = vi.mocked(useUpdateCartMutation);
const mockedUseGetCartQuery = vi.mocked(useGetCartQuery);
const mockedCookiesGet = vi.mocked(Cookies.get);
const mockedCustomToast = vi.mocked(CustomToast);

describe("useCart Hook 測試", () => {
  const dispatch = vi.fn();
  const postCart = vi.fn();
  const deleteCart = vi.fn();
  const updateCart = vi.fn();

  const mockProduct: CartProduct = {
    id: "prod-1",
    title: "測試商品",
    price: 100,
    imageUrl: "test-image.jpg",
  };

  // 輔助函式：建立模擬狀態
  const createMockState = (overrides: Partial<RootState> = {}): RootState => {
    return {
      auth: {
        isAuthenticated: false,
        isInitialized: true,
        user: null,
        token: null,
        expired: null,
        ...overrides.auth,
      },
      cart: {
        items: [],
        isHydrated: true,
        ...overrides.cart,
      },
      // 模擬 api 狀態
      api: {} as RootState["api"],
      ...overrides,
    } as RootState;
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseAppDispatch.mockReturnValue(dispatch);

    mockedUsePostCartMutation.mockReturnValue([
      postCart,
    ] as unknown as ReturnType<typeof usePostCartMutation>);
    mockedUseDeleteCartMutation.mockReturnValue([
      deleteCart,
    ] as unknown as ReturnType<typeof useDeleteCartMutation>);
    mockedUseUpdateCartMutation.mockReturnValue([
      updateCart,
    ] as unknown as ReturnType<typeof useUpdateCartMutation>);

    // Query 預設
    mockedUseGetCartQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
    } as unknown as ReturnType<typeof useGetCartQuery>);

    mockedCookiesGet.mockImplementation(
      (() => undefined) as unknown as typeof Cookies.get
    );
  });

  describe("未登入狀態 (本地購物車)", () => {
    beforeEach(() => {
      mockedUseAppSelector.mockImplementation((selector) =>
        selector(createMockState())
      );
    });

    it("不具備身份驗證時應回傳本地購物車項目", () => {
      const mockLocalItems = [
        {
          id: "local-1",
          product_id: "prod-1",
          qty: 2,
          total: 200,
          final_total: 200,
          product: mockProduct,
        },
      ];
      mockedUseAppSelector.mockImplementation((selector) =>
        selector(
          createMockState({ cart: { items: mockLocalItems, isHydrated: true } })
        )
      );

      const { result } = renderHook(() => useCart());
      expect(result.current.cartItems).toEqual(mockLocalItems);
      expect(result.current.cartTotalQty).toBe(2);
    });

    it("呼叫 addToCart 時應正確派發 addToLocalCart 行動", async () => {
      const { result } = renderHook(() => useCart());

      await act(async () => {
        await result.current.addToCart(mockProduct, 1);
      });

      expect(dispatch).toHaveBeenCalledWith(
        addToLocalCart({ product: mockProduct, qty: 1 })
      );
      expect(mockedCustomToast).toHaveBeenCalledWith(
        "success",
        "加入購物車成功"
      );
    });

    it("呼叫 handleDelete 時應正確派發 deleteFromLocalCart 行動", async () => {
      const { result } = renderHook(() => useCart());

      await act(async () => {
        await result.current.handleDelete("local-1");
      });

      expect(dispatch).toHaveBeenCalledWith(deleteFromLocalCart("local-1"));
      expect(mockedCustomToast).toHaveBeenCalledWith("success", "移除商品成功");
    });

    it("呼叫 handleUpdate 時應正確派發 updateLocalCart 行動", async () => {
      const { result } = renderHook(() => useCart());

      await act(async () => {
        await result.current.handleUpdate("id-not-used", "prod-1", 5);
      });

      expect(dispatch).toHaveBeenCalledWith(
        updateLocalCart({ product_id: "prod-1", qty: 5 })
      );
      expect(mockedCustomToast).toHaveBeenCalledWith("success", "更新數量成功");
    });
  });

  describe("已登入狀態 (API 購物車)", () => {
    const mockApiCartData = {
      carts: [
        {
          id: "api-1",
          product_id: "prod-1",
          qty: 3,
          total: 300,
          final_total: 300,
          product: mockProduct,
        },
      ],
    };

    beforeEach(() => {
      mockedUseAppSelector.mockImplementation((selector) =>
        selector(
          createMockState({
            auth: {
              isAuthenticated: true,
              isInitialized: true,
              user: { uid: "123" },
              token: "abc",
              expired: 0,
            },
          })
        )
      );

      mockedUseGetCartQuery.mockReturnValue({
        data: mockApiCartData,
        isLoading: false,
        isError: false,
      } as unknown as ReturnType<typeof useGetCartQuery>);

      postCart.mockReturnValue({ unwrap: () => Promise.resolve() });
      deleteCart.mockReturnValue({ unwrap: () => Promise.resolve() });
      updateCart.mockReturnValue({ unwrap: () => Promise.resolve() });
    });

    it("具備身份驗證時應回傳來自 API 的購物車項目", () => {
      const { result } = renderHook(() => useCart());
      expect(result.current.cartItems).toEqual(mockApiCartData.carts);
      expect(result.current.cartTotalQty).toBe(3);
    });

    it("呼叫 addToCart 時應發送 postCart Mutation 請求", async () => {
      const { result } = renderHook(() => useCart());

      await act(async () => {
        await result.current.addToCart(mockProduct, 2);
      });

      expect(postCart).toHaveBeenCalledWith({ product_id: "prod-1", qty: 2 });
      expect(mockedCustomToast).toHaveBeenCalledWith(
        "success",
        "加入購物車成功"
      );
    });

    it("呼叫 handleDelete 時應發送 deleteCart Mutation 請求", async () => {
      const { result } = renderHook(() => useCart());

      await act(async () => {
        await result.current.handleDelete("api-1");
      });

      expect(deleteCart).toHaveBeenCalledWith("api-1");
      expect(mockedCustomToast).toHaveBeenCalledWith("success", "移除商品成功");
    });

    it("呼叫 handleUpdate 時應發送 updateCart Mutation 請求", async () => {
      const { result } = renderHook(() => useCart());

      await act(async () => {
        await result.current.handleUpdate("api-1", "prod-1", 10);
      });

      expect(updateCart).toHaveBeenCalledWith({
        id: "api-1",
        product_id: "prod-1",
        qty: 10,
      });
      expect(mockedCustomToast).toHaveBeenCalledWith("success", "更新數量成功");
    });

    it("當 API 請求失敗時應彈出警告提示", async () => {
      postCart.mockReturnValue({
        unwrap: () => Promise.reject(new Error("API 錯誤")),
      });
      const { result } = renderHook(() => useCart());

      await act(async () => {
        await result.current.addToCart(mockProduct, 1);
      });

      expect(mockedCustomToast).toHaveBeenCalledWith(
        "warning",
        "加入失敗，請稍後再試。"
      );
    });
  });

  describe("購物車合併功能 (mergeCart)", () => {
    it("登入後應正確遍歷本地商品並發送 API 請求且清空本地購物車", async () => {
      const mockLocalItems = [
        {
          id: "local-1",
          product_id: "prod-1",
          qty: 1,
          total: 100,
          final_total: 100,
          product: mockProduct,
        },
        {
          id: "local-2",
          product_id: "prod-2",
          qty: 2,
          total: 200,
          final_total: 200,
          product: mockProduct,
        },
      ];

      mockedUseAppSelector.mockImplementation((selector) =>
        selector(
          createMockState({
            auth: {
              isAuthenticated: true,
              isInitialized: true,
              user: { uid: "123" },
              token: "abc",
              expired: 0,
            },
            cart: { items: mockLocalItems, isHydrated: true },
          })
        )
      );

      postCart.mockReturnValue({ unwrap: () => Promise.resolve() });

      const { result } = renderHook(() => useCart());

      await act(async () => {
        await result.current.mergeCart();
      });

      expect(postCart).toHaveBeenCalledTimes(2);
      expect(postCart).toHaveBeenCalledWith({ product_id: "prod-1", qty: 1 });
      expect(postCart).toHaveBeenCalledWith({ product_id: "prod-2", qty: 2 });
      expect(dispatch).toHaveBeenCalledWith(clearLocalCart());
    });
  });
});
