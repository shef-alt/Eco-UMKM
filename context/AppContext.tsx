'use client';
import {
  createContext, useCallback, useContext, useEffect, useMemo, useRef, useState,
  type Dispatch, type ReactNode, type SetStateAction,
} from 'react';
import { useRouter } from 'next/navigation';
import {
  DEFAULT_IMAGE,
  aiDataBank,
  defaultProfile,
  initialActivities,
  initialMarketplaceProducts,
  initialTransactions,
} from '@/lib/data';
import { formatRupiah, getNowDateTime, getTodayDate } from '@/lib/utils';
import type {
  Activity, Analysis, CurrentTransaction, FormState, ListingInput, ModalState,
  Platform, Product, Profile, Sample, Transaction,
} from '@/lib/types';

interface AppContextValue {
  // states
  totalSaldo: number;
  userEcoXP: number;
  totalRecycledKg: number;
  totalMarketplaceItemsSold: number;
  userProfile: Profile;
  transactionHistory: Transaction[];
  marketplaceProducts: Product[];
  userActivities: Activity[];
  form: FormState;
  setForm: Dispatch<SetStateAction<FormState>>;
  uploadedImage: string | null;
  setUploadImage: Dispatch<SetStateAction<string | null>>;
  analysis: Analysis | null;
  pendingSample: Sample | null;
  currentTransaction: CurrentTransaction | null;
  marketCategory: string;
  setMarketCategory: Dispatch<SetStateAction<string>>;
  marketSearch: string;
  setMarketSearch: Dispatch<SetStateAction<string>>;
  activitySearch: string;
  setActivitySearch: Dispatch<SetStateAction<string>>;
  modal: ModalState;
  sellModalOpen: boolean;
  setSellModalOpen: Dispatch<SetStateAction<boolean>>;
  editProfileOpen: boolean;
  setEditProfileOpen: Dispatch<SetStateAction<boolean>>;
  detailActivityId: string | null;
  setDetailActivityId: Dispatch<SetStateAction<string | null>>;
  // actions
  navTo: (path: string) => void;
  showModal: (message: ReactNode, title?: string, icon?: string, color?: string, bg?: string) => void;
  closeModal: () => void;
  processAIAnalysis: (category: string, originalPrice: number, imageUrl: string | null, customTitle?: string | null) => void;
  startSampleScan: (sample: Sample) => void;
  clearPendingSample: () => void;
  requestPickup: (pengepulName: string) => void;
  publishListing: (input: ListingInput) => void;
  handleProductClick: (product: Product) => void;
  confirmBuyProduct: (productId: string) => void;
  saveProfile: (values: Profile) => boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('error, useApp harus dipakai di dalam tag <AppProvider>');
  return ctx;
}

const CLOSED_MODAL: ModalState = { open: false, type: 'info', title: 'Informasi', message: '', icon: 'fa-info', color: 'text-emerald-500', bg: 'bg-emerald-100', product: null };

export function AppProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  // states
  const [totalSaldo, setTotalSaldo] = useState(25000);
  const [userEcoXP, setUserEcoXP] = useState(1450);
  const [totalRecycledKg, setTotalRecycledKg] = useState(142);
  const [totalMarketplaceItemsSold, setTotalMarketplaceItemsSold] = useState(8);
  const [userProfile, setUserProfile] = useState<Profile>(defaultProfile);
  const [transactionHistory, setTransactionHistory] = useState<Transaction[]>(initialTransactions);
  const [marketplaceProducts, setMarketplaceProducts] = useState<Product[]>(initialMarketplaceProducts);
  const [userActivities, setUserActivities] = useState<Activity[]>(initialActivities);
  const [form, setForm] = useState<FormState>({ price: '', category: 'auto' });
  const [uploadedImage, setUploadImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [pendingSample, setPendingSample] = useState<Sample | null>(null);
  const [currentTransaction, setCurrentTransaction] = useState<CurrentTransaction | null>(null);
  const [marketCategory, setMarketCategory] = useState('all');
  const [marketSearch, setMarketSearch] = useState('');
  const [activitySearch, setActivitySearch] = useState('');
  const [modal, setModal] = useState<ModalState>(CLOSED_MODAL);
  const [sellModalOpen, setSellModalOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [detailActivityId, setDetailActivityId] = useState<string | null>(null);

  // ref
  const trackingTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const activeListingIdRef = useRef<string | null>(null);

  useEffect(() => () => clearTimeout(trackingTimerRef.current), []);

  // navigation
  const navTo = useCallback((path: string) => router.push(path), [router]);

  // Modal Helpers
  const showModal = useCallback(
    (message: ReactNode, title = 'Informasi', icon = 'fa-info', color = 'text-emerald-500', bg = 'bg-emerald-100') => {
      setModal({ open: true, type: 'info', title, message, icon, color, bg, product: null });
    },
    []
  );
  const closeModal = useCallback(() => setModal((m) => ({ ...m, open: false })), []);
  const openExternalModal = useCallback((product: Product) => {
    setModal({ ...CLOSED_MODAL, open: true, type: 'external', product });
  }, []);
  const openBuyModal = useCallback((product: Product) => {
    setModal({ ...CLOSED_MODAL, open: true, type: 'buy', product });
  }, []);

  // Analisis AI 
  const processAIAnalysis = useCallback(
    (category: string, originalPrice: number, imageUrl: string | null, customTitle: string | null = null) => {
      let key = category;
      if (category === 'auto') {
        const keys = ['pakaian', 'elektronik', 'plastik', 'kertas'];
        key = keys[Math.floor(Math.random() * keys.length)];
      }
      const data = aiDataBank[key] || aiDataBank.default;
      setAnalysis({
        key,
        data,
        title: customTitle || data.title,
        originalPrice,
        finalPrice: Math.round(originalPrice * data.multiplier),
      });
      router.push('/result');
    },
    [router]
  );

  const startSampleScan = useCallback(
    (sample: Sample) => {
      setUploadImage(sample.imageUrl);
      setForm({ price: String(sample.originalPrice), category: sample.category });
      setPendingSample(sample);
      router.push('/upload');
    },
    [router]
  );
  const clearPendingSample = useCallback(() => setPendingSample(null), []);

  //  Simulasi tracking  
  const startTrackingSimulation = useCallback((activity: Activity) => {
    if (trackingTimerRef.current) clearTimeout(trackingTimerRef.current);

    let currentStep = 1;
    const patch = (changes: Partial<Activity>) =>
      setUserActivities((prev) => prev.map((a) => (a.id === activity.id ? { ...a, ...changes } : a)));

    const run = () => {
      if (currentStep < 4) {
        currentStep++;
        const changes: Partial<Activity> = { step: currentStep };
        if (currentStep === 2) {
          changes.statusBadge = activity.type === 'marketplace' ? 'Dilihat' : 'Proses Kurir';
          changes.badgeClass = 'bg-blue-100 text-blue-700';
        } else if (currentStep === 3) {
          changes.statusBadge = activity.type === 'marketplace' ? 'Dibeli' : 'Penimbangan';
          changes.badgeClass = 'bg-purple-100 text-purple-700';
        }
        patch(changes);
        trackingTimerRef.current = setTimeout(run, 3500);
        return;
      }

      // Tahap akhir: transaksi selesai
      patch({
        step: 4,
        statusBadge: activity.type === 'marketplace' ? 'Terjual' : 'Selesai',
        badgeClass: 'bg-emerald-100 text-emerald-700',
      });

      if (activity.type === 'marketplace' && activeListingIdRef.current) {
        const listingId = activeListingIdRef.current;
        activeListingIdRef.current = null;
        setMarketplaceProducts((prev) => prev.filter((p) => p.id !== listingId));
        setTotalMarketplaceItemsSold((n) => n + 1);
      } else if (activity.type === 'pengepul') {
        setTotalRecycledKg((kg) => kg + 3);
      }

      setUserEcoXP((xp) => xp + 150);
      setTransactionHistory((prev) => [
        {
          title: activity.title,
          date: getTodayDate(),
          price: activity.price,
          isDebit: false,
          icon: activity.icon,
          color: activity.type === 'marketplace' ? 'text-blue-500' : 'text-emerald-500',
          bg: activity.type === 'marketplace' ? 'bg-blue-100' : 'bg-emerald-100',
        },
        ...prev,
      ]);
      setTotalSaldo((s) => s + activity.price);

      setTimeout(() => {
        showModal(
          <>
            Transaksi untuk <strong>{activity.title}</strong> telah selesai!
            <br />
            <br />
            Saldo sebesar <strong className="text-emerald-600">{formatRupiah(activity.price)}</strong> telah otomatis ditambahkan ke dompet anda.
            <br />
            <br />
            <span className="inline-block bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs px-3 py-1.5 rounded-xl font-bold">
              <i className="fas fa-award text-amber-500 mr-1"></i> +150 Eco XP Poin Lingkungan diperoleh!
            </span>
          </>,
          'Transaksi Selesai & Berhasil!',
          'fa-check-circle',
          'text-emerald-500',
          'bg-emerald-100'
        );
      }, 300);
    };

    trackingTimerRef.current = setTimeout(run, 3500);
  }, [showModal]);

  //  request penjemputan pengepul 
  const requestPickup = useCallback(
    (pengepulName: string) => {
      if (!analysis) return;
      const id = 'TRX-' + Math.floor(100000 + Math.random() * 900000);
      setCurrentTransaction({ id, title: analysis.title, price: analysis.finalPrice, pengepul: pengepulName });

      const newAct: Activity = {
        id,
        title: analysis.title,
        type: 'pengepul',
        partner: pengepulName,
        price: analysis.finalPrice,
        date: getNowDateTime(),
        step: 1,
        statusBadge: 'Requesting',
        badgeClass: 'bg-orange-100 text-orange-700',
        icon: 'fa-truck',
      };
      setUserActivities((prev) => [newAct, ...prev]);
      startTrackingSimulation(newAct);
      router.push('/qr');
    },
    [analysis, router, startTrackingSimulation]
  );

  //  Listing marketplace  
  const publishListing = useCallback(
    ({ method, platform, sellerName, url }: ListingInput) => {
      if (!analysis) return;
      const { title, finalPrice: price } = analysis;
      const base = {
        id: 'p-' + Date.now(),
        title,
        price,
        category: form.category,
        image: uploadedImage || DEFAULT_IMAGE,
        isUserItem: true,
      };

      if (method === 'external') {
        const newProd: Product = {
          ...base,
          seller: sellerName || 'UMKM Maju Jaya',
          icon: 'fa-box',
          platform: platform as Platform,
          platformUrl: url || 'https://shopee.co.id',
        };
        setMarketplaceProducts((prev) => [newProd, ...prev]);
        activeListingIdRef.current = newProd.id;

        showModal(
          <>
            Barang <strong>{title}</strong> berhasil ditautkan dengan link e-commerce ({platform.toUpperCase()}) ke Marketplace EcoUMKM!
          </>,
          'Berhasil Dipublikasikan',
          'fa-check-circle',
          'text-blue-500',
          'bg-blue-100'
        );
      } else {
        const newProd: Product = { ...base, seller: 'UMKM Anda (Direct)', icon: 'fa-store', platform: 'internal' };
        setMarketplaceProducts((prev) => [newProd, ...prev]);
        activeListingIdRef.current = newProd.id;

        const newAct: Activity = {
          id: 'MKP-' + Math.floor(100000 + Math.random() * 900000),
          title,
          type: 'marketplace',
          partner: 'Marketplace EcoUMKM',
          price,
          date: getNowDateTime(),
          step: 1,
          statusBadge: 'Di-Listing',
          badgeClass: 'bg-blue-100 text-blue-700',
          icon: 'fa-store',
        };
        setUserActivities((prev) => [newAct, ...prev]);
        startTrackingSimulation(newAct);

        showModal(
          <>
            Barang <strong>{title}</strong> dipajang di Marketplace EcoUMKM seharga <strong>{formatRupiah(price)}</strong>! anda dapat memantau statusnya di tab Aktivitas.
          </>,
          'Listing Berhasil',
          'fa-check-circle',
          'text-emerald-500',
          'bg-emerald-100'
        );
      }
      router.push('/marketplace');
    },
    [analysis, form.category, uploadedImage, router, showModal, startTrackingSimulation]
  );

  //  Pembelian di marketplace  
  const handleProductClick = useCallback(
    (product: Product) => {
      if (product.isUserItem && product.platform === 'internal') {
        showModal(
          'Ini adalah barang jualan anda yang sedang di-listing langsung di EcoUMKM. Barang ini akan dibeli oleh pelaku UMKM lain secara langsung.',
          'Barang Jualan anda',
          'fa-store',
          'text-blue-500',
          'bg-blue-100'
        );
        return;
      }
      if (product.platform && product.platform !== 'internal') {
        openExternalModal(product);
        return;
      }
      openBuyModal(product);
    },
    [showModal, openExternalModal, openBuyModal]
  );

  const confirmBuyProduct = useCallback(
    (productId: string) => {
      closeModal();
      const prod = marketplaceProducts.find((p) => p.id === productId);
      if (!prod) return;

      if (totalSaldo < prod.price) {
        setTimeout(() => {
          showModal(
            'Saldo dompet anda tidak mencukupi untuk membeli barang ini.',
            'Saldo Tidak Cukup',
            'fa-exclamation-triangle',
            'text-red-500',
            'bg-red-100'
          );
        }, 200);
        return;
      }

      setTotalSaldo((s) => s - prod.price);
      setTransactionHistory((prev) => [
        {
          title: 'Beli: ' + prod.title,
          date: getTodayDate(),
          price: prod.price,
          isDebit: true,
          icon: prod.icon || 'fa-shopping-bag',
          color: 'text-red-500',
          bg: 'bg-red-100',
        },
        ...prev,
      ]);
      setMarketplaceProducts((prev) => prev.filter((p) => p.id !== productId));

      setTimeout(() => {
        showModal(
          `Berhasil membeli "${prod.title}"! Saldo anda dipotong ${formatRupiah(prod.price)}.`,
          'Pembelian Sukses!',
          'fa-check-circle',
          'text-emerald-500',
          'bg-emerald-100'
        );
      }, 200);
    },
    [closeModal, marketplaceProducts, totalSaldo, showModal]
  );

  //  Profil  
  const saveProfile = useCallback(
    ({ name, role, company, sector, wasteType, location }: Profile): boolean => {
      const n = name.trim();
      const c = company.trim();
      if (!n || !c) {
        showModal('Nama Pemilik dan Nama Perusahaan tidak boleh kosong.', 'Peringatan', 'fa-exclamation-triangle', 'text-amber-500', 'bg-amber-100');
        return false;
      }
      setUserProfile({
        name: n,
        role: role.trim() || 'Owner',
        company: c,
        sector: sector.trim() || 'Konveksi & Tekstil',
        wasteType: wasteType.trim() || 'Limbah Campuran',
        location: location.trim() || 'Indonesia',
      });
      setEditProfileOpen(false);
      showModal('Identitas usaha dan profil anda berhasil diperbarui!', 'Berhasil Disimpan', 'fa-check-circle', 'text-emerald-500', 'bg-emerald-100');
      return true;
    },
    [showModal]
  );

  const value = useMemo(
    () => ({
      // states
      totalSaldo, userEcoXP, totalRecycledKg, totalMarketplaceItemsSold, userProfile,
      transactionHistory, marketplaceProducts, userActivities,
      form, setForm, uploadedImage, setUploadImage, analysis, pendingSample, currentTransaction,
      marketCategory, setMarketCategory, marketSearch, setMarketSearch, activitySearch, setActivitySearch,
      modal, sellModalOpen, setSellModalOpen, editProfileOpen, setEditProfileOpen,
      detailActivityId, setDetailActivityId,
      // actions
      navTo, showModal, closeModal, processAIAnalysis, startSampleScan, clearPendingSample,
      requestPickup, publishListing, handleProductClick, confirmBuyProduct, saveProfile,
    }),
    [
      totalSaldo, userEcoXP, totalRecycledKg, totalMarketplaceItemsSold, userProfile,
      transactionHistory, marketplaceProducts, userActivities, form, uploadedImage, analysis,
      pendingSample, currentTransaction, marketCategory, marketSearch, activitySearch, modal,
      sellModalOpen, editProfileOpen, detailActivityId, navTo, showModal, closeModal,
      processAIAnalysis, startSampleScan, clearPendingSample, requestPickup, publishListing,
      handleProductClick, confirmBuyProduct, saveProfile,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
