import { CartItem } from '@freshfarm/types';

export interface CartCardProps {
  cartItems?: CartItem[];
  className?: string;
  onUpdate: (id: string, product_id: string, qty: number) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}
