# Vazifa: NeoPOS Refactoring & Kengaytirish Rejasi (Yo'l Xaritasi)

- [ ] **0-Bosqich: Holatni Tekshirish va Tayyorgarlik (1 soat)**
  - [ ] Repozitoriyni shaxsiy (private) qilish va asosiy (main) branchni himoyalash
  - [ ] Hozirgi stackni ko'rib chiqish (CRA React+TS, Express, PostgreSQL)

- [ ] **1-Bosqich: Poydevor (Monorepo va Har bir Rol uchun alohida ilova) (3-4 kun)**
  - [ ] **1.1 Monorepo O'rnatish**: `pnpm init`, `turbo.json` ko'p ilovalar uchun build quvuri (pipeline) bilan
  - [ ] **1.2 Umumiy Paketlar (Shared Packages)**:
    - `packages/shared-types` (Branch, User, Order, PrinterStation interfeyslari)
    - `packages/shared-api` (RTK konteksti, qayta urinish (retry) bilan baseQuery)
    - `packages/shared-ui` (Dizayn tizimi)
    - `packages/shared-db` (Dexie sxemasi, sinxronizatsiya logikasi)
    - `packages/shared-entities` (Prisma Sxemasi + Zod validatsiya)
    - `packages/shared-config` (ESLint, Tailwind, TSConfig sozlamalari)
  - [ ] **1.3 Ilovalar Tuzilmasi**: `apps/web-pos` (Ofitsiant), `apps/web-kds` (Oshxona), `apps/web-admin` (Bosh ofis), `apps/web-customer` (Onlayn Menyu), `apps/rn-waiter` (Expo/Mobil Ilova) ni ishga tushirish
  - [ ] **1.4 Rivojlantirish Muhiti (Dev Environment)**: `docker-compose.dev.yml` (Postgres, Redis, Adminer)
  - [ ] **1.5 CI Skeleti**: Workspacelar bo'ylab lint/test uchun GitHub Actions

- [ ] **2-Bosqich: Backend Asosi (Modular Monolith -> Microservices) (5-6 kun)**
  - [ ] **2.1 Gateway & Services**: `apps/api` ichida alohida modullar (`order`, `payment`, `inventory`)
  - [ ] **2.2 Multi-Tenant Middleware**: `X-Branch-Id` sarlavhasini tekshirish va Kontekstni ajratib olish
  - [ ] **2.3 Ma'lumotlar Bazasi (Prisma)**: Prisma ORM, Zod generatsiyasi va RLS (Xavfsizlik) ni sozlash
  - [ ] **2.4 Autentifikatsiya Moduli**: `branchId` va `role` (WAITER, CASHIER, KITCHEN) da'volari bilan JWT
  - [ ] **2.5 Printer Xaritasi**: Branch -> Stansiya (IP/Port) xaritasi uchun jadval
  - [ ] **2.6 Asosiy Modullar**: Foydalanuvchilar, Filiallar, Konfiguratsiya
  - [ ] **2.7 Xavfsizlik va Masshtablash**: API Versiyalash (URI) va Global Limitlash (Throttler)
  - [ ] **2.8 Analytics Service**: ClickHouse integratsiyasi uchun tayyorgarlik (Logika)
  - [ ] **2.9 Delivery Service**: Yandex/Uzum webhooklari uchun adapterlar skeleti

- [ ] **3-Bosqich: Frontend Asosi (POS va Umumiy) (4-5 kun)**
  - [ ] **3.1 Vite Migratsiyasi**: `apps/web-pos` ni PWA plagini bilan sozlash
  - [ ] **3.2 Router (Rolga asoslangan)**: Dinamik yo'llar (`/login`, `/tables`, `/cart`)
  - [ ] **3.3 Xususiyat Bayroqlari (Feature Flags)**: "Sodiqlik", "Band qilish" tugmachalari uchun Unleash/Config sozlash
  - [ ] **3.4 Umumiy UI**: `packages/shared-ui` da atom komponentlarini joriy qilish

- [ ] **4-Bosqich: Mahsulot va Ombor (Cloud-First) (5-6 kun)**
  - [ ] **4.1 Mahsulot/Ombor API**: Filial izolyatsiyasi bilan CRUD
  - [ ] **4.2 Ombor Sinxronizatsiyasi**: Global va mahalliy omborni sinxronlash strategiyasi
  - [ ] **4.3 Chegirmalar**: `OrderService` da tranzaksiyaviy chegirma logikasi

- [ ] **5-Bosqich: Offline-First Buyurtma Navbati (6-7 kun)**
  - [ ] **5.1 IndexedDB Skeleti**: `shared-db` da `LocalOrder` sxemasi
  - [ ] **5.2 Orqa Fon Sinxronizatsiyasi**: Service Worker `sync` hodisasini tinglovchi
  - [ ] **5.3 Ziddiyatlarni Hal Qilish**: "Oxirgi yozgan yutadi" server logikasi + Optimistik UI
  - [ ] **5.4 Outbox Pattern**: Muvaffaqiyatsiz so'rovlar uchun navbat

- [ ] **6-Bosqich: Oshxona Ekrani (Mustaqil KDS) (4-5 kun)**
  - [ ] **6.1 KDS Ilovasi**: `apps/web-kds` joriy etish (Yengil build)
  - [ ] **6.2 Socket Xonalari**: `room:branch:{id}:kitchen` ga qo'shilish
  - [ ] **6.3 Stansiyani Filtrlash**: So'rov parametri strategiyasi (`?station=HOT`)

- [ ] **7-Bosqich: Printer va Qurilmalar Integratsiyasi (3-4 kun)**
  - [ ] **7.1 Printer Marshrutlash**: Printer Xaritasi jadvali asosida chop etish ishlarini yo'naltirish
  - [ ] **7.2 Navbat**: Chop etish ishonchliligi uchun BullMQ
  - [ ] **7.3 Hardware Adapters**:
    - **Thermal Printer**: TCP 9100 / ESC/POS protokoli
    - **Fiscal Printer**: Serial/TCP (OFD integratsiyasi)
    - **Cash Drawer**: Printer orqali avtomatik ochish (RJ12)
    - **Scales**: RS-232 port orqali vazn o'lchash
    - **Payment Terminal**: TCP 8888 (Payme/Click terminali)

- [ ] **8-Bosqich: Admin va Hisobotlar (3-4 kun)**
  - [ ] **8.1 Admin Paneli**: **AdminJS** ni NestJS bilan integratsiya qilish (Avtomatik yaratilgan UI)
  - [ ] **8.2 Hisobotlar**: Jamlangan hisobotlar (Filial va Kompaniya ko'rinishi)

- [ ] **9-Bosqich: CI/CD va Deploy (Deploy) (2-3 kun)**
  - [ ] **9.1 Ko'p Ilovali Build**: Aniq ilovalarni (`web-pos`, `web-kds`) qurish uchun Turbo quvuri
  - [ ] **9.2 Docker**: Har bir ilova uchun optimallashtirilgan Dockerfilelar
  - [ ] **9.3 Kuzatuvchanlik (Observability)**: Sentry (Xatolarni kuzatish) va Prometheus/Grafana (Metrikalar) ni o'rnatish
  - [ ] **9.4 E2E Testlar**: Asosiy jarayonlar (Order Flow) uchun Cypress/Playwright testi
  - [ ] **9.3 Compose Prod**: Orkestratsiya sozlamalari
  - [ ] **9.4 Nginx**: Teskari proksi konfiguratsiyasi
  - [ ] **9.5 SSL**: Certbot integratsiyasi
  - [ ] **9.6 Xizmat Ko'rsatish**: Yangilanishlar uchun Watchtower
  - [ ] **9.7 Zaxira Nusxalari (Backups)**: Avtomatlashtirilgan S3 zaxira nusxalari

- [ ] **10-Bosqich: MVP dan Keyin**
  - [ ] Yetkazib berish integratsiyalari (Yandex/Uzum)
  - [ ] Telegram Bot
  - [ ] Sodiqlik Tizimi (Loyalty System)
