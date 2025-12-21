# NeoPOS V2.0 - Loyiha Standartlari va Arxitektura Tahlili

Ushbu hujjat NeoPOS dasturini ishlab chiqish uchun "Konstitutsiya" vazifasini bajaradi. U V2.0 ga qayta ishlash jarayonida belgilangan barcha arxitektura qarorlari, naqshlari va standartlarini birlashtiradi.
**Barcha kelajakdagi ishlab chiqish izchillik va kengaytirilishni ta'minlash uchun ushbu yo'riqnomlarga AMAL QILISHI SHART.**

---

## 1. Asosiy Arxitektura: Feature-First (Funksiya-Birinchi)
Biz **Feature-Based** (Funksiya-asosli) katalog strukturasidan foydalanamiz. Kod "nima ekanligiga" (komponent/hook) emas, balki "nima qilishiga" (funksiya) qarab tashkil etiladi.

### Katalog Strukturasi Qoidalari
-   `src/features/`: Barcha biznes mantiq sohalarini o'z ichiga oladi.
    -   Misol: `cart/`, `menu/`, `tables/`, `checkout/`, `auth/`.
    -   **Har bir funksiya papkasi MAJBURIY ravishda quyidagilarga ega bo'lishi kerak**:
        -   `components/`: Ushbu funksiyaga xos UI komponentlari.
        -   `api/` (ixtiyoriy): Ushbu funksiyaga xos API chaqiruvlari.
        -   `model/` (ixtiyoriy): Zustand store'lari yoki mantiq.
        -   `types.ts`: Ushbu funksiya uchun barcha TypeScript interfeyslari.
        -   `index.ts`: **Barrel Export**. Faqat bu yerda eksport qilingan elementlar ommaviy.
-   `src/views/`: Yuqori darajadagi sahifa komponentlari (masalan, `HallView`, `CheckoutView`). Bular asosan funksiya komponentlarini yig'ishi kerak.
-   `src/layouts/`: Global sahifa o'rovchilari (`MainLayout`, `AuthLayout`).
-   `src/components/`:
    -   `ui/`: Umumiy, qayta ishlatilishi mumkin bo'lgan primitiv UI elementlari (Button, Input, BackButton). **Bu yerga biznes mantiqni qo'ymang.**
    -   `common/`: Layout primitivlari (NeoAtoms).

---

## 2. NeoAtoms va Layout Strategiyasi
Biz POS terminallari, Planshetlar va Desktop'lar bo'ylab to'g'ri javob berishni ta'minlash uchun maxsus Layout Atomlar to'plamidan foydalanamiz.

### Asosiy Komponentlar (`src/components/common/NeoAtoms.tsx`)
1.  **`<FluidPanel>`**:
    -   **Maqsad**: Standart cheklovlardan chiqadigan asosiy kontent konteyneri.
    -   **Foydalanish**: `HallView` yoki `CheckoutView` kabi ko'rinishlarning asosiy maydonini o'raydi.
    -   **Qoida**: Dinamik, to'liq kenglikdagi kontent maydonlari uchun foydalaning.

2.  **`<PageContainer>`**:
    -   **Maqsad**: Oddiy sahifalar uchun standart cheklangan konteyner.
    -   **Qoida**: Margin/padding kerak bo'lgan sahifalar uchun `MainLayout` ichida foydalaning.

3.  **`<ContentGrid>`**:
    -   **Maqsad**: Kartalar (Stollar yoki Mahsulotlar kabi) uchun javob beruvchi grid o'rovchisi.
    -   **Qoida**: Bolalarda grid klasslarini qattiq kodlamang. `ContentGrid` javob berishni boshqarishiga ruxsat bering.

### Responsive Qoidalar
-   **Touch Targets**: Minimal 44px (masalan, tugmalar uchun `h-12` yoki `h-14`).
-   **Checkout Layout**:
    -   **Yonma-yon Majburlash**: Planshetlar va undan kattaroqlarda, Order Summary va Payment ni yonma-yon saqlash uchun `grid-cols-2` yoki `grid-cols-3` dan foydalaning.
    -   **POS da Hech Qachon Stack Qilmang**: Keng ekranlarda to'liq kenglikda stack qilishdan saqlaning.

---

## 3. UI Kit va Styling
-   **Framework**: Tailwind CSS.
-   **Komponent Kutubxonasi**: Standart HTML yoki Ant Design primitivlari ustida maxsus override'lar.
-   **Ranglar**: `tailwind.config.js` dan `bg-brand`, `text-brand`, `bg-surface` dan foydalaning. **Komponentlarda `#10B981` kabi hex qiymatlarni qattiq kodlamang.**
-   **Tipografiya**: `font-manrope`. Matn o'lchamlari o'qilishi mumkin bo'lishi kerak (tafsilotlar uchun `text-sm`, sarlavhalar uchun `text-xl`).

### Umumiy UI Komponentlar
-   **`<BackButton />`**: Standart navigatsiya tugmasi. Tugmalarni qo'lda yaratish o'rniga bundan foydalaning.
-   **`<Button />`**: Standart asosiy/ikkilamchi harakat tugmasi.

---

## 4. State Management (Holat Boshqaruvi)
-   **Kutubxona**: `Zustand`.
-   **Naqsh**: Kichik, yo'naltirilgan store'lar yarating (masalan, `useCartStore`, `useAuthStore`).
-   **Persistence**: Cart va Auth uchun persistence middleware'ga ruxsat beriladi.
-   **Redux Yo'q**: Mutlaqo zarur bo'lmasa, global holat uchun Redux yoki Context API ni kiritMANG.

---

## 5. Kodlash Konventsiyalari
1.  **Barrel Exports**: Har doim `index.ts` dan eksport qiling.
    -   *Yomon*: `import { CartSidebar } from '@/features/cart/components/CartSidebar'`
    -   *Yaxshi*: `import { CartSidebar } from '@/features/cart'`
2.  **Qat'iy Turlar**: `any` turi yo'q. Funksiyaning `types.ts` da interfeys'larni belgilang.
3.  **Fayl Nomlari**: React Komponentlar uchun PascalCase (`HallView.tsx`), primitivlar/hook'lar uchun camelCase.

---

## 6. Navigatsiya
-   **Header**: `MainLayout` da joylashgan.
-   **Faol Holat**: Faol navigatsiya elementlari hover qilinganda rangini o'zgartirmasligi kerak. Nofaol elementlar hover effektiga ega bo'lishi kerak.
-   **Route'lar**: Faqat `App.tsx` da belgilangan. Barcha route'lar `MainLayout` yoki `AuthLayout` ga o'ralgan bo'lishi kerak.

---

## 7. Yangi Funksiyalar uchun Tekshirish Ro'yxati
Yangi funksiya qo'shishda (masalan, "Settings"):
1.  [ ] `src/features/settings/` yarating.
2.  [ ] `types.ts` va `index.ts` yarating.
3.  [ ] `components/` da komponentlar yarating.
4.  [ ] `src/views/` da `SettingsView.tsx` yarating.
5.  [ ] `App.tsx` ga route qo'shing.
6.  [ ] `Header.tsx` ga link qo'shing.

---

## 8. Real-Time Arxitektura (WebSockets)
Biz barcha real-time aloqalar uchun **Service-Based Abstraction** dan foydalanamiz.

### Asosiy Qoidalar
-   **To'g'ridan-to'g'ri Kirish Yo'q**: Komponentlar HECH QACHON `socket.io-client` yoki `WebSocket` dan to'g'ridan-to'g'ri foydalanmasligi kerak.
-   **Singleton Service**: Ulanishni boshqarish uchun `src/services/socket/socketService.ts` dan foydalaning.
-   **Hook'lar**: Yangilanishlarni tinglash uchun `useSocketEvent('event:name', handler)` dan foydalaning.
-   **Qat'iy Typing**: Barcha hodisalar `src/services/socket/types.ts` da belgilanishi kerak.
    -   `ServerToClientEvents`: Backend'dan KELADIGAN hodisalar.
    -   `ClientToServerEvents`: Backend'ga YUBORILADIGAN hodisalar.

---

## 9. API Service Layer
Barcha backend bilan aloqalar markazlashtirilgan API service orqali amalga oshiriladi.

### Asosiy Qoidalar
-   **Base Client**: `src/services/api/client.ts` - Axios instance with interceptors
-   **Feature API'lar**: Har bir feature uchun alohida API modul (`features/*/api/`)
-   **No Direct Axios**: Komponentlarda to'g'ridan-to'g'ri `axios` chaqirmang
-   **Error Handling**: API client avtomatik ravishda 401, 403, 500 xatolarni boshqaradi
-   **Auth Token**: Har bir so'rovga avtomatik ravishda token qo'shiladi

### Misol
```typescript
// features/menu/api/menuApi.ts
export const menuApi = {
  getProducts: async (): Promise<Product[]> => {
    const { data } = await apiClient.get('/products');
    return data;
  }
};
```

---

## 10. Environment Configuration
Turli muhitlar (Development, Production) uchun alohida sozlamalar.

### Asosiy Qoidalar
-   **Env Files**: `.env.development`, `.env.production`, `.env.example`
-   **Vite Env**: `import.meta.env.VITE_*` orqali kirish
-   **Constants**: `src/config/constants.ts` da markazlashtirilgan
-   **No Hardcode**: Kodda URL yoki API endpoint'larni qattiq kodlamang

### Environment Variables
-   `VITE_API_URL` - Backend API manzili
-   `VITE_SOCKET_URL` - WebSocket server manzili
-   `VITE_ENABLE_MOCK` - Mock data rejimi

---

## 11. PWA (Progressive Web App)
Dastur telefonda o'rnatilishi va offline ishlashi mumkin.

### Asosiy Qoidalar
-   **Plugin**: `vite-plugin-pwa` ishlatiladi
-   **Manifest**: `public/manifest.json` - Dastur metadata'si
-   **Service Worker**: Avtomatik yaratiladi (Workbox)
-   **Icons**: Kamida 192x192 va 512x512 o'lchamdagi ikonkalar kerak
-   **Caching Strategy**: 
    -   Static assets: Cache-first
    -   API calls: Network-first

### Meta Tags
`index.html` da PWA meta tag'lari majburiy:
-   `theme-color`
-   `apple-mobile-web-app-capable`
-   `manifest` link

---

## 12. Error Handling
Barcha xatolar markazlashtirilgan tarzda boshqariladi.

### Asosiy Qoidalar
-   **Service**: `src/services/error/errorService.ts`
-   **User Messages**: Xatolar o'zbek tilida ko'rsatiladi
-   **Logging**: Development'da console, Production'da monitoring service
-   **Toast Notifications**: `react-hot-toast` orqali foydalanuvchiga xabar

### Foydalanish
```typescript
try {
  await someApiCall();
} catch (error) {
  ErrorService.handle(error, 'MenuView');
}
```

### Xato Tarjimalari
-   Network errors → "Internet bilan bog'lanishda xatolik"
-   401 → "Tizimga kirish muddati tugagan"
-   403 → "Sizda ruxsat yo'q"
-   500 → "Server xatosi"

---

## 13. Role-Based Authentication
Har bir foydalanuvchi roli bo'yicha turli interfeys ko'radi.

### Rollar
-   `admin` - Barcha huquqlar
-   `cashier` - Checkout, Orders
-   `waiter` - Hall, Menu, Orders
-   `chef` - Kitchen Display

### Mock PIN'lar (Development)
-   `9999` - Admin
-   `5460` - Kassir
-   `1234` - Ofitsiant
-   `7777` - Oshpaz

### Route Himoyasi
```tsx
<ProtectedRoute requiredRole="cashier">
  <CheckoutView />
</ProtectedRoute>
```

### Permission Tekshirish
```typescript
const { hasAccess } = usePermission('admin');
if (hasAccess) {
  // Show admin features
}
```

---

## 14. Design System Centralization (Markazlashtirilgan Dizayn Tizimi)
Barcha dizayn qiymatlari `tailwind.config.js` da markazlashtirilgan. Kodda qattiq qiymatlar ishlatmang.

### Spacing (Bo'shliqlar)
Komponent-specific spacing token'lari:
-   `p-card-sm` / `m-card-sm` - 16px (Kichik kartalar)
-   `p-card` / `m-card` - 24px (Standart kartalar)
-   `p-card-lg` / `m-card-lg` - 32px (Katta kartalar)
-   `p-section` / `m-section` - 40px (Bo'limlar orasidagi bo'shliq)
-   `p-page` / `m-page` - 48px (Sahifa padding'i)
-   `h-touch` / `w-touch` - 44px (Minimal touch target)

**Yomon:**
```tsx
<div className="p-6">  {/* Qattiq qiymat */}
```

**Yaxshi:**
```tsx
<div className="p-card">  {/* Token */}
```

### Typography (Tipografiya)
Role-based typography token'lari:
-   `text-label` - 10px, bold, uppercase (Label'lar, badge'lar)
-   `text-caption` - 12px, semibold (Kichik matnlar)
-   `text-body-sm` - 13px (Kichik body matn)
-   `text-body` - 14px (Standart body matn)
-   `text-body-lg` - 16px (Katta body matn)
-   `text-heading-sm` - 18px, bold (Kichik sarlavhalar)
-   `text-heading` - 24px, extrabold (Standart sarlavhalar)
-   `text-heading-lg` - 32px, black (Katta sarlavhalar)
-   `text-display` - 40px, black (Display matnlar)

**Yomon:**
```tsx
<h1 className="text-2xl font-bold">  {/* Qattiq qiymat */}
```

**Yaxshi:**
```tsx
<h1 className="text-heading">  {/* Token - avtomatik font-weight bilan */}
```

### Z-Index (Qatlam Ierarxiyasi)
Qatlam ierarxiyasi token'lari:
-   `z-base` - 0 (Asosiy qatlam)
-   `z-sidebar` - 10 (Sidebar'lar)
-   `z-header` - 20 (Header, sticky elementlar)
-   `z-dropdown` - 30 (Dropdown'lar)
-   `z-overlay` - 40 (Overlay'lar)
-   `z-modal` - 50 (Modal'lar)
-   `z-toast` - 60 (Toast notification'lar)
-   `z-tooltip` - 70 (Tooltip'lar)

**Yomon:**
```tsx
<div className="z-50">  {/* Qattiq qiymat */}
```

**Yaxshi:**
```tsx
<div className="z-modal">  {/* Token */}
```

### Component Variants (CVA)
Komponent variant'lari uchun `class-variance-authority` ishlatiladi.

**Misol:**
```tsx
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'base-classes',
  {
    variants: {
      variant: {
        primary: 'bg-brand text-white',
        secondary: 'bg-gray-100 text-gray-800',
      },
      size: {
        sm: 'h-10 px-4',
        md: 'h-12 px-6',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);
```

### Utility Function
Class'larni birlashtirish uchun `cn()` funksiyasi:
```tsx
import { cn } from '@/lib/utils';

<div className={cn('base-class', isActive && 'active-class')} />
```

---
*Antigravity Agent tomonidan yaratilgan - 2025*
*Oxirgi yangilanish: Dizayn Tizimi Markazlashtirildi (Spacing, Typography, Z-Index, CVA)*

