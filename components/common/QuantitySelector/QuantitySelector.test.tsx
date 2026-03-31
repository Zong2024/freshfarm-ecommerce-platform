import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { QuantitySelector } from "./QuantitySelector";

describe("QuantitySelector Component", () => {
  it("應預設顯示最小值", () => {
    render(<QuantitySelector min={2} />);
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("點擊增加按鈕時應更新數量", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<QuantitySelector value={5} onChange={onChange} />);

    const incrementBtn = screen.getByRole("button", { name: /增加數量/ });
    await user.click(incrementBtn);
    expect(onChange).toHaveBeenCalledWith(6);
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("點擊減少按鈕時應更新數量", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<QuantitySelector value={5} onChange={onChange} />);

    const decrementBtn = screen.getByRole("button", { name: /減少數量/ });
    await user.click(decrementBtn);
    expect(onChange).toHaveBeenCalledWith(4);
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("達到最大值時增加按鈕應為禁用狀態", () => {
    render(<QuantitySelector value={10} max={10} onChange={() => {}} />);
    const incrementBtn = screen.getByLabelText("增加數量");
    expect(incrementBtn).toBeDisabled();
  });

  it("達到最小值時減少按鈕應為禁用狀態", () => {
    render(<QuantitySelector value={1} min={1} onChange={() => {}} />);
    const decrementBtn = screen.getByLabelText("減少數量");
    expect(decrementBtn).toBeDisabled();
  });

  it("當整體組件被禁用時，所有按鈕應為禁用狀態", () => {
    render(<QuantitySelector disabled={true} />);
    expect(screen.getByLabelText("增加數量")).toBeDisabled();
    expect(screen.getByLabelText("減少數量")).toBeDisabled();
  });

  it("受控模式下，組件應反應傳入的 value 變化", () => {
    const { rerender } = render(<QuantitySelector value={3} />);
    expect(screen.getByText("3")).toBeInTheDocument();

    rerender(<QuantitySelector value={4} />);
    expect(screen.getByText("4")).toBeInTheDocument();
  });
});
