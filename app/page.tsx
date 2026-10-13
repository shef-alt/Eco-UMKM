'use client';

import { useApp } from '@/context/AppContext';
import { sampleItems } from '@/lib/data';
import { formatRupiah } from '@/lib/utils';
import Image from 'next/image';

export default function HomePage() {
  const { totalRecycledKg, totalSaldo, transactionHistory, navTo, startSampleScan } = useApp();

  return (
    <div className="screen">
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-6 rounded-b-3xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-xl font-bold">Halo, UMKM Maju!</h1>
            <p className="text-emerald-100 text-xs mt-0.5">Mari daur ulang & manfaatkan limbah usaha.</p>
          </div>
          <div className="w-10 h-10 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white font-bold text-sm shadow">
            UM
          </div>
        </div>
        <div className="bg-white/15 p-4 rounded-2xl backdrop-blur-md border border-white/20">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <p className="text-[11px] text-emerald-100 mb-0.5">Limbah Terproses</p>
              <p className="text-xl font-bold tracking-tight">
                <span>{totalRecycledKg}</span> <span className="text-xs font-normal opacity-80">kg</span>
              </p>
            </div>
            <div className="w-px h-9 bg-emerald-300/40 mx-3"></div>
            <div className="flex-1">
              <p className="text-[11px] text-emerald-100 mb-0.5">Saldo Dompet Eco</p>
              <p className="text-xl font-bold tracking-tight">{formatRupiah(totalSaldo)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5">
        <h2 className="font-bold text-gray-800 text-sm mb-3">Mulai Tindakan</h2>
        <button
          onClick={() => navTo('/upload')}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white p-4 rounded-2xl flex items-center shadow-md active:scale-95 transition-all mb-5"
        >
          <div className="bg-white/20 p-3 rounded-xl mr-4 flex items-center justify-center shrink-0">
            <i className="fas fa-camera text-xl"></i>
          </div>
          <div className="text-left flex-1">
            <h3 className="font-bold text-sm">Scan Barang / Limbah</h3>
            <p className="text-[11px] text-emerald-100">AI akan mendeteksi kelayakan & estimasi nilai</p>
            <p className="text-[11px] text-amber-400">*Masih dalam tahap simulasi</p>
          </div>
          <i className="fas fa-chevron-right ml-2 text-emerald-200"></i>
        </button>

        <div className="flex justify-between items-center mb-2">
          <h2 className="font-bold text-gray-800 text-sm flex items-center">
          Atau Pilih Sampel Simulasi
          </h2>
          <span className="text-[11px] text-emerald-600 font-medium">Ketuk untuk coba</span>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 mb-5 -mx-1 px-1">
          {sampleItems.map((s) => (
            <div
              key={s.label}
              onClick={() => startSampleScan(s)}
              className="flex-shrink-0 w-36 bg-white p-2.5 rounded-2xl border border-gray-100 shadow-sm cursor-pointer hover:border-emerald-500 active:scale-95 transition-all"
            >
              <Image src={s.imageUrl} width={600} height={600} className="w-full h-20 object-cover rounded-xl mb-2" alt={s.label} />
              <p className="font-bold text-xs text-gray-800 truncate">{s.label}</p>
              <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">{s.estimate}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div
            className="bg-white p-3.5 rounded-2xl shadow-sm border border-gray-100 flex items-center cursor-pointer hover:bg-gray-50 active:scale-95 transition-all"
            onClick={() => navTo('/marketplace')}
          >
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mr-3 shrink-0">
              <i className="fas fa-store"></i>
            </div>
            <div>
              <h3 className="font-bold text-xs text-gray-800">Marketplace</h3>
              <p className="text-[10px] text-gray-400">Jual & Beli Bahan</p>
            </div>
          </div>
          <div
            className="bg-white p-3.5 rounded-2xl shadow-sm border border-gray-100 flex items-center cursor-pointer hover:bg-gray-50 active:scale-95 transition-all"
            onClick={() => navTo('/tracking')}
          >
            <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mr-3 shrink-0">
              <i className="fas fa-truck"></i>
            </div>
            <div>
              <h3 className="font-bold text-xs text-gray-800">Aktivitas</h3>
              <p className="text-[10px] text-gray-400">Status Penjemputan</p>
            </div>
          </div>
        </div>

        <h2 className="font-bold text-gray-800 text-sm mb-3">Transaksi Terakhir</h2>
        <div className="space-y-2.5">
          {transactionHistory.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-4">Belum ada riwayat transaksi.</p>
          ) : (
            transactionHistory.map((trx, i) => {
              const badge = trx.isDebit ? 'text-red-500 bg-red-50' : 'text-emerald-600 bg-emerald-50';
              return (
                <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3.5 flex items-center">
                  <div className={`w-10 h-10 ${trx.bg} rounded-xl flex items-center justify-center ${trx.color} mr-3 shrink-0 text-sm`}>
                    <i className={`fas ${trx.icon}`}></i>
                  </div>
                  <div className="flex-1 min-w-0 pr-2">
                    <h4 className="font-bold text-xs text-gray-800 truncate">{trx.title}</h4>
                    <p className="text-[10px] text-gray-400">Selesai • {trx.date}</p>
                  </div>
                  <span className={`text-xs font-bold ${badge} px-2.5 py-1 rounded-lg shrink-0`}>
                    {trx.isDebit ? '-' : '+'}
                    {formatRupiah(Math.abs(trx.price))}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
