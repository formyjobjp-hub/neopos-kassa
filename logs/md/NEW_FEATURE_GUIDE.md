# NeoPOS - Yangi Funksiya (Feature) Yaratish Qo'llanmasi 🚀

Ushbu qo'llanma loyihada yangi sahifa yoki funksiya qo'shishda **yagona standartni** saqlash uchun mo'ljallangan. 

Bizning arxitektura: **Feature-First + Service Layer + TanStack Query**.

---

## 1-qadam: Papka Tukzilishi (Feature Structure) 📂

`src/features/` ichida yangi papka oching (masalan, `orders`).

```
src/features/orders/
├── api/             # Ma'lumot bilan ishlash (Data Layer)
│   ├── ordersService.ts   # Server/Mock logikasi
│   └── useOrders.ts       # React Query Hook
├── components/      # UI qismlari
│   ├── OrderList.tsx
│   └── OrderCard.tsx
├── model/           # (Ixtiyoriy) Global State (Zustand)
│   └── orderStore.ts
├── types.ts         # TypeScript turlari
└── index.ts         # Tashqariga chiqarish (Export)
```

---

## 2-qadam: Turlarni aniqlash (`types.ts`) 📝

Eng avval ma'lumot qanday ko'rinishda bo'lishini `types.ts` da yozing.

```typescript
// src/features/orders/types.ts
export interface Order {
    id: number;
    tableId: number;
    totalAmount: number;
    status: 'pending' | 'ready' | 'paid';
}
```

---

## 3-qadam: Service Yozish (`api/xxxService.ts`) 🛠

Bu yerda biz **Gibrid (Mock + API)** usulini qo'llaymiz.
`APP_CONFIG.FEATURES.ENABLE_MOCK` orqali boshqaramiz.

```typescript
// src/features/orders/api/ordersService.ts
import { Order } from '../types';
import { APP_CONFIG } from '@/config/constants';
import { apiClient } from '@/services/api';

// Mock ma'lumot (Yoki src/services/mockData.ts dan oling)
const MOCK_ORDERS: Order[] = [
    { id: 1, tableId: 5, totalAmount: 150000, status: 'pending' }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const OrdersService = {
    getAll: async (): Promise<Order[]> => {
        // 1. Mock Mode
        if (APP_CONFIG.FEATURES.ENABLE_MOCK) {
            await delay(500); // Serverni simulyatsiya qilish
            return MOCK_ORDERS;
        }

        // 2. Real API Mode
        const { data } = await apiClient.get<Order[]>('/orders');
        return data;
    }
};
```

---

## 4-qadam: Hook Yaratish (`api/useXxx.ts`) 🎣

UI komponentlar **Service** bilan to'g'ridan-to'g'ri gaplashmaydi. Ular ushbu **Hook** dan foydalanadi.
Bu yerda **Keshlash (Caching)** va **Loading** hal qilinadi.

```typescript
// src/features/orders/api/useOrders.ts
import { useQuery } from '@tanstack/react-query';
import { OrdersService } from './ordersService';

export const useOrders = () => {
    const query = useQuery({
        queryKey: ['orders'],             // Kesh kaliti
        queryFn: OrdersService.getAll,    // Ma'lumot olish funksiyasi
        staleTime: 1000 * 60 * 5,         // 5 daqiqa davomida "yangi" deb hisobla
    });

    return {
        orders: query.data || [],
        isLoading: query.isLoading,
        isError: query.isError,
        refetch: query.refetch
    };
};
```

---

## 5-qadam: UI Komponentda Ishlatish (`components/Xxx.tsx`) 🖼

Endi hammasi tayyor, shunchaki hookni chaqiramiz.

```tsx
// src/features/orders/components/OrderList.tsx
import { useOrders } from '../api/useOrders';

export const OrderList = () => {
    const { orders, isLoading } = useOrders();

    if (isLoading) return <div>Yuklanmoqda...</div>;

    return (
        <div>
            {orders.map(order => (
                <div key={order.id}>Order #{order.id} - {order.totalAmount}</div>
            ))}
        </div>
    );
};
```

---

## 6-qadam: Asosiy Sahifaga Ulashtirish (`views/`) 🌍

Oxirgi bosqich, komponentni `src/features/orders/index.ts` dan eksport qilib, `src/views/` ichidagi sahifaga yoki `App.tsx` ga qo'shish.

---

### Ishlatiladigan Texnologiyalar
1.  **React Query (@tanstack/react-query)**: Ma'lumot olish va keshlash uchun.
2.  **Axios (`apiClient`)**: Real server bilan gaplashish uchun.
3.  **Zustand**: Agar global holat kerak bo'lsa (masalan, Savatcha).
4.  **TypeScript**: Xatosiz kod yozish uchun.
