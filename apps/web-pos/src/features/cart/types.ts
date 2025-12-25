import { Product } from '@/features/menu/types';

export interface CartItem extends Product {
    quantity: number;
}
