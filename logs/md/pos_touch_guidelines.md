# POS Touch & Hardware Optimization Guidelines

Ushbu hujjat NeoPOS tizimini professional POS-terminallar va sensorli (touch) ekranlarda mukammal ishlashi uchun zarur bo'lgan texnik va dizayn talablarini belgilaydi.

## 1. Touch-Target (Bosish maydoni)
POS terminallarda barmoq bilan ishlash asosiy omil.
- **Minimal o'lcham**: Barcha bosiladigan tugmalar va interaktiv elementlar kamida `44x44px` (ideal holda `48x48px`) maydonga ega bo'lishi kerak.
- **Padding**: Tugmalar bir-biriga juda yaqin bo'lmasligi kerak (kamida `8px` masofa).
- **NeoAtoms**: `NeoAtoms.tsx` dagi tugmalar ushbu standartga javob beradi.

## 2. Hover (Sichqoncha effekti) dan voz kechish
Touch ekranlarda "hover" holati yo'q.
- **Alternativa**: Hover o'rniga "Active" (bosilganda) holatiga e'tibor berish kerak.
- **Vizual javob**: Bosilganda element rangining o'zgarishi yoki kichrayishi (scaling) foydalanuvchiga muvaffaqiyatli bosilganini bildiradi.

## 3. Virtual Klaviatura & Numpad
Sotuvchi doimiy ravishda klaviaturadan foydalana olmaydi.
- **Custom Numpad**: Narx o'zgartirish, miqdor kiritish va PIN kiritish uchun tizimning o'zini raqamlar klaviaturasi bo'lishi shart (LoginView dagi kabi).
- **Input Focus**: Inputlarga fokus tushganda brauzerning avtomatik klaviaturasi ochilib sahifani yopib qo'ymasligini nazorat qilish.

## 4. Scroll (Aylantirish)
- **Overscroll**: Mobil brauzerlardagi "pull-to-refresh" funksiyasini o'chirib qo'yish kerak (CSS: `overscroll-behavior: none`).
- **Scroll Bar**: Scrollbarlar yashirin bo'lishi (`no-scrollbar`), lekin ichidagi kontent aylanishi aniq bildirilishi kerak.

## 5. Hardware Integration (Uskunalar bilan ishlash)
- **Printer**: Chek chiqarish uchun CSS `@media print` qoidalari chek printeri (80mm yoki 58mm) o'lchamlariga moslangan bo'lishi kerak.
- **Scanner**: Shtrix-kod skaneri ishlashi uchun `onKeyDown` hodisalari global darajada ushlanishi shart.

## 6. Performance (Tezkorlik)
- **Kutish vaqti**: Har bir bosishdan keyingi javob (feedback) 100ms dan oshmasligi kerak.
- **React Query**: `staleTime` dan foydalanib, ma'lumotlarni qayta-qayta yuklab turishni kamaytirish.
