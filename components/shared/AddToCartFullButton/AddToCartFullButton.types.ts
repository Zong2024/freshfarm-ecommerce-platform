import { CartProduct } from "@/types/product";

export interface AddToCartFullButtonProps {
  product: CartProduct;
  quantity?: number;
  className?: string;
}
