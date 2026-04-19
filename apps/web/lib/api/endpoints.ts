export const API_ENDPOINTS = {
  health: "/health",
  products: {
    list: "/products",
    all: "/products/all",
    detail: (id: string) => `/products/${id}`,
  },
  auth: {
    login: "/auth/login",
    profile: "/auth/profile",
  },
  orders: {
    list: "/orders",
    detail: (id: string) => `/orders/${id}`,
  },
  cart: {
    list: "/cart",
    add: "/cart/add",
    update: (id: string) => `/cart/${id}`,
    remove: (id: string) => `/cart/${id}`,
  },
} as const;