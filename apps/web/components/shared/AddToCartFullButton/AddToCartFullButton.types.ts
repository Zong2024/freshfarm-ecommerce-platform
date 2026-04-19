import { CartProduct } from '@freshfarm/types';

export interface AddToCartFullButtonProps {
  product: CartProduct;
  quantity?: number;
  className?: string;
}
