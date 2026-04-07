export type ToastType = "success" | "warning";

export interface CustomToastProps {
  type: ToastType;
  message: string;
  toastId: string | number;
}
