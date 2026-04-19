import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Order } from '@freshfarm/types';

import { OrderList } from "./OrderList";

// 模擬符合 API 格式的 Mock Data
const mockOrders: Order[] = [
  {
    id: "ORD123",
    create_at: 1711958400, // 2024/04/01
    is_paid: true,
    message: "測試訂單",
    total: 1500,
    num: 1,
    user: {
      address: "台北市",
      email: "test@example.com",
      name: "測試者",
      tel: "0912345678",
    },
    products: [
      {
        id: "item1",
        product_id: "prod1",
        qty: 2,
        total: 1500,
        final_total: 1500,
        product: {
          id: "prod1",
          title: "測試商品",
          price: 750,
          imageUrl: "https://example.com/image.jpg",
        },
      },
    ],
  },
];

describe("OrderList Component", () => {
  it("當訂單列表為空時，應顯示尚無訂單訊息", () => {
    render(<OrderList orders={[]} />);
    expect(screen.getByText("尚無訂單紀錄")).toBeInTheDocument();
  });

  it("應正確渲染訂單編號", () => {
    render(<OrderList orders={mockOrders} />);
    const orderIds = screen.getAllByText(/ORD123/);
    expect(orderIds.length).toBeGreaterThan(0);
  });

  it("應正確渲染訂單金額", () => {
    render(<OrderList orders={mockOrders} />);
    // 檢查是否有渲染出 1,500
    const amounts = screen.getAllByText(/NT\$ 1,500/);
    expect(amounts.length).toBeGreaterThan(0);
  });

  it("應正確顯示付款狀態", () => {
    render(<OrderList orders={mockOrders} />);
    const paidBadges = screen.getAllByText("已付款");
    expect(paidBadges.length).toBeGreaterThan(0);
  });
});
