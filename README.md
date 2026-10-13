# Eco-UMKM Mobile App

Eco-UMKM merupakan platform daur ulang & marketplace limbah UMKM. Framework menggunakan Next.js 14 + Tailwind CSS.

## Cara Run Program

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # mode production
```

## Struktur

```
app/
  layout.tsx            Root/Main layout 
  globals.css           Global css + Tailwind
  page.tsx              Home Page          /
  upload/page.tsx       Scan / upload foto /upload
  result/page.tsx       Hasil analisis AI  /result
  pengepul/page.tsx     Pilih pengepul     /pengepul
  qr/page.tsx           Tiket Barcode QR   /qr
  tracking/page.tsx     Aktivitas track    /tracking
  marketplace/page.tsx  Marketplace        /marketplace
  stats/page.tsx        Statistik          /stats
  profile/page.tsx      Profil UMKM        /profile
components/
  AppShell.tsx          Container + bottom nav + semua modal
  modals/               All modal components: OptionSellModal, ProfileModal,  ActivityDetailModal, GlobalModal
context/AppContext.tsx  All states & actions (saldo, xp, aktivitas, marketplace, simulasi tracking)
lib/data.ts             Data bank sampah, produk awal, aktivitas awal, daftar pengepul
lib/types.ts            Semua tipe/interface TypeScript
lib/utils.ts            formatRupiah, getTodayDate, dll.
```
