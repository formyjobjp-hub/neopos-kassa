# NeoPOS Ekotizim Strategiyasi va Arxitektura Qo'llanmasi

Ushbu hujjat **NeoPOS** ni bitta Kassa Terminalidan to'liq Mehmondo'stlik Ekotizimiiga (Oshxona, Ofitsiant, Boshqaruv Paneli) kengaytirish uchun zarur bo'lgan strategik texnik qarorlarni belgilaydi.

## 1. Ekotizim Umumiy Ko'rinishi
Zamonaviy POS tizimi faqat bitta dastur emas; bu markaziy miyaga (Backend) ulangan sinxronlashtirilgan mijozlar to'plami.

*   **NeoPOS (Kassa)**: Boshqaruv markazi. Yuqori unumdorlik, offline-birinchi imkoniyat.
*   **NeoKDS (Oshxona)**: Oshpazlar uchun faqat o'qish rejimidagi displey. Real vaqt yangilanishlari.
*   **NeoWaiter (Ofitsiant)**: Stolda buyurtma qabul qilish uchun mobil-birinchi interfeys.
*   **NeoDash (Admin)**: Tahlillar, Menyu Boshqaruvi, Xodimlar Boshqaruvi.

---

## 2. `neopos-kassa` da HOZIR Nima Qilish Kerak?
Kelajakdagi dasturlarni oson integratsiya qilish uchun, joriy kod bazasida poydevor qo'yishimiz kerak.

### A. Real Vaqt Arxitekturasi (WebSockets)
*   **Muammo**: Ofitsiant buyurtma qo'shganda, Kassa (POS) uni *bir zumda* yangilamasdan ko'rishi kerak. Kassa to'lov qilganda, Oshxona *bir zumda* bilishi kerak.
*   **Yechim**:
    *   Hoziroq **Socket Service** qatlamini amalga oshiring (bo'sh bo'lsa ham).
    *   Faqat `axios.get()` ga tayanmang.
    *   **Tavsiya**: `Socket.io` yoki `Pusher` dan foydalaning.
    *   **Harakat**: Hodisalarga obuna bo'lishni boshqarish uchun `src/services/socket.ts` yarating (`ORDER_CREATED`, `TABLE_UPDATED`).

### B. Kod Almashish (Monorepo vs. Umumiy Turlar)
*   **Muammo**: Buyurtmaning "Shakli" (ID, elementlar, holat) Kassa, Oshxona va Ofitsiant bo'ylab bir xil bo'lishi kerak.
*   **Yechim**:
    *   **Qat'iy Turlar**: Biz yaratayotgan `types.ts` fayllari OLTIN.
    *   **Harakat**: `types` lar toza ekanligiga ishonch hosil qiling (React bog'liqliklari yo'q), shunda ularni keyinchalik backend/boshqa dasturlarga nusxalash yoki almashish mumkin.

### C. "Universal Dastur" Strategiyasi (Ofitsiant Dasturi)
*   **Maslahat**: Ofitsiantlar uchun hali alohida mahalliy dastur YARATMANG.
*   **Strategiya**: Sizning `neopos-kassa` allaqachon React.
    *   Uni **PWA (Progressive Web App)** ga aylantiring.
    *   Agar biz **Responsive Dizayn** ni mukammallashtrsak (hozir qilayotganimiz), *aynan bir xil kod bazasi* Ofitsiant Dasturi sifatida xizmat qilishi mumkin.
    *   **Qanday**: "Ofitsiant Rejimi" rolini qo'shing. Agar Ofitsiant sifatida kirsa -> Mobil Ko'rinishni ko'rsating (Zal va Menyu). Agar Kassir -> Desktop Ko'rinishni ko'rsating (Checkout).
    *   **Foyda**: Ishlab chiqish vaqtining 50% ini tejaydi. bitta kod, ikkita dastur.

### D. Oshxona Displey Tizimi (KDS)
*   **Strategiya**: MVP (Minimal Qobiliyatli Mahsulot) uchun, KDS ni ushbu loyiha ichida oddiy **Route** sifatida yarating.
    *   `localhost:3000/kitchen`
    *   U bir xil store/socket hodisalarini tinglaydi.
    *   Keyinchalik, kerak bo'lsa, uni ajratib olishingiz mumkin.
*   **Foyda**: Yangi loyiha sozlash yo'q. Bir xil `Order` komponentlarini almashadi.

---

## 3. Kelajakdagi Xizmatlar uchun Tavsiya Etilgan Texnologiyalar To'plami

| Xizmat | Texnologiyalar To'plami Tavsiyasi | Nega? |
| :--- | :--- | :--- |
| **Backend** | Node.js (NestJS) yoki Go | WebSockets uchun yuqori bir vaqtda ishlash kerak. |
| **Ma'lumotlar Bazasi** | PostgreSQL | Relyatsion ma'lumotlar (Buyurtmalar Stollarga bog'langan) murakkab. |
| **Dashboard** | React (Alohida Repo) | Admin panellari og'ir. POS ni diagrammalar bilan shishirmang. |
| **KDS** | React (POS Repo Ichida) | Tez bo'lishi va POS bilan UI ni almashishi kerak. |

---

## 4. Siz uchun Zudlik bilan Tekshirish Ro'yxati
1.  **Qat'iy Typedef'lar**: `features/*/types.ts` da turlarni belgilashda davom eting. Bu sizning kelajakdagi API shartnomangiz.
2.  **Xizmat Qatlami**: Komponentlarda to'g'ridan-to'g'ri API ni chaqirmang. `features/menu/api/menuApi.ts` dan foydalaning. Bu "Haqiqiy API" va "Mahalliy Ma'lumotlar Bazasi" ni oson almashtirishga imkon beradi.
3.  **Autentifikatsiya**: `useAuthStore` Rollarni (`admin`, `waiter`, `chef`) qo'llab-quvvatlashiga ishonch hosil qiling. Bizga bu "Universal Dastur" strategiyasi uchun kerak.

*NeoPOS Strategik Rejalashtirish uchun Antigravity Agent tomonidan yaratilgan*
