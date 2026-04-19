import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toast } from "sonner";
import { describe, expect, it, vi } from "vitest";

import { ToastContent } from "./CustomToast";
import { CustomToastProps } from "./CustomToast.types";

vi.mock("sonner", () => ({
  toast: {
    dismiss: vi.fn(),
  },
}));

describe("sonner Toast 組件測試", () => {
  const defaultProps: CustomToastProps = {
    type: "success",
    message: "成功",
    toastId: "test-id-1",
  };

  it("當success時,應render正確文字", () => {
    render(<ToastContent {...defaultProps} />);
    expect(screen.getByText("成功")).toBeInTheDocument();
  });

  it("當warning時 ,應render正確文字", () => {
    render(<ToastContent {...defaultProps} type="warning" message="失敗" />);
    expect(screen.getByText("失敗")).toBeInTheDocument();
  });

  it("當點擊關閉按鈕時，應呼叫 toast.dismiss 並傳入正確的 ID", async () => {
    const user = userEvent.setup();
    render(<ToastContent {...defaultProps} />);

    const closeBtn = screen.getByRole("button", {
      name: /關閉提示/i,
    });

    await user.click(closeBtn);

    expect(toast.dismiss).toHaveBeenCalledWith("test-id-1");
  });
});
