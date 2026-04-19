import { CartItem } from '@freshfarm/types';

export interface CartTableProps {
  cartItems?: CartItem[];
  onUpdate: (id: string, product_id: string, qty: number) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}
