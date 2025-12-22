NeoPOS v2.0 - Kompleks Rivojlantirish Rejasi (Master Roadmap)
📌 Hozirgi Holat (Status Quo)
Loyiha arxitekturasi Feature-Based (Funksional) tizimga muvaffaqiyatli o'tkazildi. Bajarilgan Ishlar:

✅ i18n (Til tizimi): To'liq qayta qurildi va modullashtirildi.
✅ Auth (Xavfsizlik): Yagona ishonchli manba (store) yaratildi.
✅ Cleanup (Tozalash): Keraksiz kodlar va ("spaghetti code") olib tashlandi.
✅ UI Components: 
Button
 va boshqa komponentlar zamonaviy standartlarda (cva + tailwind).
🚀 Rivojlantirish Bosqichlari (Phases)
1-Bosqich: "Mobile First" UX (Moslashuvchanlik)
Hozirgi eng zaif nuqta - mobil qurilmalarda ko'rinish.

 Savat (Cart) Drawer: Mobil telefonda savatni yashirish va pastdan chiquvchi panelga aylantirish.
 Kategoriyalar: Mobilda gorizontal "scroll" (Stories kabi) ko'rinishiga o'tkazish.
 Viewport Fix: 100dvh o'lchov birligini qo'llash (brauzer paneli xalaqit bermasligi uchun).
 Touch Targets: Barcha tugmalarni barmoq bilan bosishga qulay qilish (min 44px).
2-Bosqich: Performance & Data (Tezlik va Ma'lumotlar)
 React Query Optimizations: Kesh (cache) vaqtlarini sozlash (staleTime).
 Lazy Loading: Katta kutubxonalarni (charts, pdf generators) faqat kerak bo'lganda yuklash (React.lazy).
 Virtualization: Agar menyuda 1000+ mahsulot bo'lsa, ro'yxatni "virtually" render qilish (react-window).
3-Bosqich: Yangi Funksiyalar (New Features)
 KDS (Oshxona Ekrani): Oshpazlar uchun buyurtmalarni real vaqtda ko'rsatish tizimi. (WebSocket kerak bo'ladi).
 Waiter Mode: Ofitsiantlar uchun telefon orqali buyurtma olish rejimi (PWA).
 Offline Mode: Internet yo'qolganda ham ishlash (Dexie.js yoki Redux Persist).
 Receipt Printing: Chek chiqarish (Bluetooth/USB printer integratsiyasi).
4-Bosqich: Code Quality (Kod Sifati)
 TypeScript Strictness: tsconfig da "strict mode"ni kuchaytirish.
 Unit Tests: Muhim hisob-kitoblar (Savat jami, chegirmalar) uchun test yozish (Vitest).
 Storybook: UI komponentlar katalogini yaratish.
🛠 Tavsiya Etilgan Keyingi Qadam
Hozir eng muhimi 1-Bosqich (Mobile First). Chunki ofitsiantlar planshet yoki telefondan foydalanishi mumkin. Shundan so'ng Offline Mode (3-Bosqich) savdo to'xtab qolmasligi uchun kerak.