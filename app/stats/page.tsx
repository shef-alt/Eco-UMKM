'use client';

import { useApp } from '@/context/AppContext';
import { formatRupiah } from '@/lib/utils';

export default function StatsPage() {
  const { userEcoXP, totalRecycledKg, totalMarketplaceItemsSold, totalSaldo, navTo } = useApp();

  // Level naik setiap 500 XP
  const currentLevel = Math.floor(userEcoXP / 500) + 1;
  const progressInLevel = ((userEcoXP % 500) / 500) * 100;
  const remainingXP = 500 - (userEcoXP % 500);

  const co2Saved = Math.round(totalRecycledKg * 0.35);
  const treesSaved = (totalRecycledKg * 0.025).toFixed(1);

  return (
    <div className="screen bg-gray-50">
      <div className="bg-teal-600 px-4 py-3.5 flex items-center shadow-sm sticky top-0 z-10 text-white">
        <button onClick={() => navTo('/')} className="p-1 -ml-1 text-white">
          <i className="fas fa-arrow-left"></i>
        </button>
        <h2 className="text-base font-bold ml-2">Dampak & Kontribusi Lingkungan</h2>
      </div>

      <div className="p-5">
        <div className="bg-gradient-to-br from-teal-600 to-emerald-700 text-white rounded-2xl p-5 shadow-md text-center mb-5 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-10 text-8xl text-white">
            <i className="fas fa-leaf"></i>
          </div>
          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-2 text-xl shadow-inner border border-white/30">
            <i className="fas fa-award text-amber-300"></i>
          </div>
          <span className="bg-emerald-800/60 text-emerald-100 text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider inline-block mb-1">
            Status Keberlanjutan
          </span>
          <h3 className="font-bold text-lg">Hero Eco Level {currentLevel}</h3>
          <p className="text-xs text-teal-100 mt-0.5">Skor apresiasi atas komitmen daur ulang UMKM Anda.</p>

          <div className="mt-4 bg-black/20 rounded-full p-1 border border-white/20">
            <div className="bg-amber-400 h-2.5 rounded-full transition-all duration-700" style={{ width: `${progressInLevel}%` }}></div>
          </div>
          <div className="flex justify-between items-center text-[11px] text-teal-100 mt-1.5 px-1 font-medium">
            <span>
              Total Point: <strong className="text-white font-bold">{userEcoXP} XP</strong>
            </span>
            <span>
              {remainingXP} XP lagi ke Level {currentLevel + 1}
            </span>
          </div>
        </div>

        <h3 className="font-bold text-gray-800 mb-3 text-xs flex items-center">
          <i className="fas fa-chart-bar text-teal-600 mr-1.5"></i> Ringkasan Barang Terolah
        </h3>
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-2 text-xs font-bold">
              <i className="fas fa-recycle"></i>
            </div>
            <p className="text-xl font-bold text-emerald-600">
              {totalRecycledKg} <span className="text-xs font-normal text-gray-400">kg</span>
            </p>
            <p className="text-[11px] font-semibold text-gray-700 mt-0.5">Didaur Ulang ke Pengepul</p>
            <p className="text-[9px] text-gray-400 mt-0.5">5 Transaksi Selesai</p>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-2 text-xs font-bold">
              <i className="fas fa-store"></i>
            </div>
            <p className="text-xl font-bold text-blue-600">
              {totalMarketplaceItemsSold} <span className="text-xs font-normal text-gray-400">Item</span>
            </p>
            <p className="text-[11px] font-semibold text-gray-700 mt-0.5">Terjual di Marketplace</p>
            <p className="text-[9px] text-gray-400 mt-0.5">Limbah Tersebar Efektif</p>
          </div>
        </div>

        <h3 className="font-bold text-gray-800 mb-3 text-xs flex items-center">
          <i className="fas fa-globe-americas text-emerald-600 mr-1.5"></i> Estimasi Dampak Ekologis
        </h3>
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-sm">
            <i className="fas fa-cloud text-teal-500 text-lg mb-1.5"></i>
            <p className="text-xl font-bold text-teal-600">
              {co2Saved}
              <span className="text-xs font-normal text-gray-400"> kg</span>
            </p>
            <p className="text-[11px] text-gray-500 mt-0.5">Emisi CO₂ Dicegah</p>
          </div>
          <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-sm">
            <i className="fas fa-tree text-green-500 text-lg mb-1.5"></i>
            <p className="text-xl font-bold text-green-600">
              {treesSaved}
              <span className="text-xs font-normal text-gray-400"> Pohon</span>
            </p>
            <p className="text-[11px] text-gray-500 mt-0.5">Pohon Diselamatkan</p>
          </div>
          <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-sm">
            <i className="fas fa-tint text-blue-400 text-lg mb-1.5"></i>
            <p className="text-xl font-bold text-blue-600">
              185<span className="text-xs font-normal text-gray-400"> Liter</span>
            </p>
            <p className="text-[11px] text-gray-500 mt-0.5">Air Terjaga dari Pencemaran</p>
          </div>
          <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-sm">
            <i className="fas fa-wallet text-amber-500 text-lg mb-1.5"></i>
            <p className="text-base font-bold text-gray-800">{formatRupiah(totalSaldo)}</p>
            <p className="text-[11px] text-gray-500 mt-0.5">Pendapatan Daur Ulang</p>
          </div>
        </div>
      </div>
    </div>
  );
}
