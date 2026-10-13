export const DEFAULT_IMAGE =
  '/pakaian.webp';

import type { AiData, Activity, Pengepul, Product, Profile, Sample, TrackingStep, Transaction } from '@/lib/types';

export const aiDataBank: Record<string, AiData> = {
  pakaian: {
    title: 'Pakaian / Kain Bekas',
    desc: 'Kain katun & sintetis yang dapat di-upcycle atau diolah kembali.',
    score: 78,
    weight: '3.5 kg',
    multiplier: 0.3,
    action: 'Daur Ulang / Upcycle',
    actionDesc: 'Dapat dijual ke pengrajin perca atau dibuat kain majun.',
    compo: [
      { name: 'Katun/Serat Alami', perc: 65, color: 'bg-teal-500' },
      { name: 'Polyester/Sintetis', perc: 30, color: 'bg-blue-400' },
      { name: 'Aksesoris/Resleting', perc: 5, color: 'bg-gray-400' },
    ],
  },
  elektronik: {
    title: 'Limbah Elektronik (E-Waste)',
    desc: 'Mesin mati total. Sangat bernilai untuk komponen daur ulang.',
    score: 85,
    weight: '2.5 kg',
    multiplier: 0.25,
    action: 'Daur Ulang Komponen',
    actionDesc: 'Tembaga dan PCB sangat dicari oleh pengepul spesialis e-waste.',
    compo: [
      { name: 'Plastik ABS', perc: 40, color: 'bg-blue-500' },
      { name: 'Tembaga & Logam', perc: 50, color: 'bg-amber-500' },
      { name: 'PCB/Silikon', perc: 10, color: 'bg-purple-500' },
    ],
  },
  plastik: {
    title: 'Limbah Plastik PET',
    desc: 'Botol & kemasan plastik bersih siap cacah.',
    score: 92,
    weight: '1.2 kg',
    multiplier: 0.4,
    action: 'Daur Ulang Cacahan',
    actionDesc: 'Sangat direkomendasikan masuk ke Bank Sampah terdekat.',
    compo: [
      { name: 'Plastik PET', perc: 90, color: 'bg-blue-400' },
      { name: 'Label/Tutup', perc: 10, color: 'bg-gray-400' },
    ],
  },
  kertas: {
    title: 'Kardus & Kertas Bekas',
    desc: 'Kertas kering siap lebur ulang.',
    score: 72,
    weight: '5.0 kg',
    multiplier: 0.2,
    action: 'Daur Ulang Industri',
    actionDesc: 'Permintaan tinggi untuk industri kertas daur ulang.',
    compo: [
      { name: 'Serat Kertas', perc: 95, color: 'bg-amber-600' },
      { name: 'Tinta/Perekat', perc: 5, color: 'bg-gray-400' },
    ],
  },
  default: {
    title: 'Limbah Campuran UMKM',
    desc: 'Dapat diperbaiki sedikit atau di-preteli.',
    score: 60,
    weight: '2.0 kg',
    multiplier: 0.3,
    action: 'Jual Ulang / Sparepart',
    actionDesc: 'Bisa dipajang di marketplace untuk suku cadang bekas.',
    compo: [
      { name: 'Logam', perc: 60, color: 'bg-gray-600' },
      { name: 'Plastik/Lainnya', perc: 40, color: 'bg-blue-500' },
    ],
  },
};

export const sampleItems: Sample[] = [
  {
    category: 'pakaian',
    originalPrice: 120000,
    imageUrl: '/pakaian.webp',
    title: 'Sisa Kain Katun',
    label: 'Sisa Kain Katun',
    estimate: 'Est. Rp 120k',
  },
  {
    category: 'elektronik',
    originalPrice: 350000,
    imageUrl: '/elektronik.webp',
    title: 'PCB & E-Waste',
    label: 'Mesin Elektronik',
    estimate: 'Est. Rp 350k',
  },
  {
    category: 'plastik',
    originalPrice: 50000,
    imageUrl: '/botol_plastik.webp',
    title: 'Botol Plastik PET',
    label: 'Botol Plastik PET',
    estimate: 'Est. Rp 50k',
  },
];

export const categoryOptions: { value: string; label: string }[] = [
  { value: 'auto', label: 'Deteksi Otomatis (AI)' },
  { value: 'pakaian', label: 'Pakaian / Kain Bekas' },
  { value: 'elektronik', label: 'Elektronik Rusak' },
  { value: 'plastik', label: 'Plastik / Botol' },
  { value: 'kertas', label: 'Kertas / Kardus' },
  { value: 'logam', label: 'Logam / Besi Tua' },
  { value: 'organik', label: 'Sisa Organik' },
];

export const marketCategories: { value: string; label: string }[] = [
  { value: 'all', label: 'Semua Kategori' },
  { value: 'pakaian', label: 'Kain/Tekstil' },
  { value: 'plastik', label: 'Plastik & Botol' },
  { value: 'elektronik', label: 'Elektronik Rusak' },
  { value: 'kertas', label: 'Kertas & Kardus' },
];

export const pengepulList: Pengepul[] = [
  {
    name: 'Bank Sampah Suryo Resik',
    requestName: 'Bank Sampah Suryo Resik',
    icon: 'fa-recycle',
    iconBox: 'bg-emerald-100 text-emerald-600',
    pin: 'text-emerald-500',
    distance: '1.2 km',
    tag: 'Respon Cepat',
    accepts: 'Tekstil, Plastik, Kertas',
    rating: '4.9',
    recommended: true,
  },
  {
    name: 'PT Daur Ulang Mandiri',
    requestName: 'PT Daur Ulang Mandiri',
    icon: 'fa-truck-pickup',
    iconBox: 'bg-blue-100 text-blue-600',
    pin: 'text-blue-500',
    distance: '3.5 km',
    tag: 'Spesialis Industri',
    accepts: 'Logam, Elektronik',
    rating: '4.7',
    recommended: false,
  },
];

export const defaultProfile: Profile = {
  name: 'Bagas Prabowo',
  company: 'CV Maju Jaya Tekstil',
  role: 'Owner',
  sector: 'Konveksi & Tekstil',
  wasteType: 'Kain Perca, Plastik, Kardus',
  location: 'Yogyakarta, Indonesia',
};

export const initialMarketplaceProducts: Product[] = [
  {
    id: 'p1',
    title: 'Kain Perca Katun (10kg) Bersih',
    price: 45000,
    seller: 'UMKM Konveksi Jaya',
    icon: 'fa-tshirt',
    category: 'pakaian',
    image: '/pakaian.webp',
    isUserItem: false,
    platform: 'tokopedia',
    platformUrl: 'https://www.tokopedia.com',
  },
  {
    id: 'p2',
    title: 'Motor Dinamo Mesin Cuci Bekas',
    price: 85000,
    seller: 'Servis Elektronik Pak Jo',
    icon: 'fa-microchip',
    category: 'elektronik',
    image: '/elektronik.webp',
    isUserItem: false,
    platform: 'shopee',
    platformUrl: 'https://shopee.co.id',
  },
  {
    id: 'p3',
    title: 'Kardus Bekas Ukuran Besar (50kg)',
    price: 25000,
    seller: 'Gudang Grosir Maju',
    icon: 'fa-box',
    category: 'kertas',
    image: '/kardus.webp',
    isUserItem: false,
    platform: 'lazada',
    platformUrl: 'https://www.lazada.co.id',
  },
];

export const initialTransactions: Transaction[] = [
  {
    title: 'Kain Perca Katun',
    date: '10 Okt 2026',
    price: 25000,
    isDebit: false,
    icon: 'fa-tshirt',
    color: 'text-emerald-500',
    bg: 'bg-emerald-100',
  },
];

export const initialActivities: Activity[] = [
  {
    id: 'TRX-882103',
    title: 'Sisa Kain Katun Batik',
    type: 'pengepul',
    partner: 'Bank Sampah Suryo Resik',
    price: 36000,
    date: '12 Okt 2026 14:20',
    step: 4,
    statusBadge: 'Selesai',
    badgeClass: 'bg-emerald-100 text-emerald-700',
    icon: 'fa-truck',
  },
  {
    id: 'MKP-401923',
    title: 'Kardus Packing Tebal Bekas',
    type: 'marketplace',
    partner: 'Marketplace Eco-UMKM',
    price: 20000,
    date: '13 Okt 2026 09:15',
    step: 4,
    statusBadge: 'Terjual',
    badgeClass: 'bg-blue-100 text-blue-700',
    icon: 'fa-store',
  },
];

/* Teks tahapan timeline berdasarkan tipe aktivitas */
export const trackingSteps: Record<'marketplace' | 'pengepul', TrackingStep[]> = {
  marketplace: [
    { title: 'Listing Dibuat', desc: 'Barang tampil di marketplace.' },
    { title: 'Dilihat Pembeli', desc: 'Calon pembeli tertarik dengan barang.' },
    { title: 'Pembelian & Kurir', desc: 'Pembeli membayar, barang siap dikirim.' },
    { title: 'Dana Diterima', desc: 'Saldo hasil penjualan diterima.' },
  ],
  pengepul: [
    { title: 'Request Penjemputan', desc: 'Menunggu konfirmasi pengepul.' },
    { title: 'Menuju Lokasi', desc: 'Kurir pengepul dalam perjalanan.' },
    { title: 'Proses Penimbangan', desc: 'Memverifikasi berat & kondisi material.' },
    { title: 'Transaksi Selesai', desc: 'Saldo masuk ke dompet Anda.' },
  ],
};
