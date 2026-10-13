'use client';

import { useApp } from '@/context/AppContext';

export default function ProfilePage() {
  const { userProfile: p, navTo, setEditProfileOpen, showModal } = useApp();

  const initials =
    p.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase() || 'UM';

  return (
    <div className="screen bg-gray-50">
      <div className="bg-slate-900 px-4 pt-5 pb-6 text-white text-center rounded-b-3xl shadow-md relative">
        <div className="relative w-20 h-20 mx-auto mb-3">
          <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg border-2 border-emerald-300">
            {initials}
          </div>
          <span
            className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full text-[10px] w-6 h-6 flex items-center justify-center border-2 border-slate-900"
            title="Terverifikasi"
          >
            <i className="fas fa-check"></i>
          </span>
        </div>
        <h2 className="font-bold text-base">{p.name}</h2>
        <p className="text-emerald-400 text-xs font-semibold mt-0.5">
          {p.role || 'Owner'} • {p.company}
        </p>
        <div className="mt-3 inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-[10px] text-gray-200 backdrop-blur-sm border border-white/15">
          <i className="fas fa-map-marker-alt text-red-400"></i> <span>{p.location}</span>
        </div>
      </div>

      <div className="p-5">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
          <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-50">
            <h3 className="font-bold text-xs text-gray-800 flex items-center">
              <i className="fas fa-building text-emerald-600 mr-2"></i> Identitas Usaha & UMKM
            </h3>
            <span className="text-[10px] text-blue-600 font-semibold cursor-pointer hover:underline" onClick={() => setEditProfileOpen(true)}>
              Edit
            </span>
          </div>
          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400">Nama Badan Usaha:</span>
              <span className="font-semibold text-gray-800">{p.company}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Sektor Usaha:</span>
              <span className="font-semibold text-gray-800">{p.sector}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Jenis Utama Limbah:</span>
              <span className="font-semibold text-gray-800">{p.wasteType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Status Verifikasi:</span>
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <i className="fas fa-shield-alt"></i> Terverifikasi Eco-UMKM
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-5">
          <h3 className="font-bold text-xs text-gray-800 mb-3 flex items-center">
            <i className="fas fa-medal text-amber-500 mr-2"></i> Lencana & Apresiasi Daur Ulang
          </h3>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-100">
              <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-1 text-xs">
                <i className="fas fa-leaf"></i>
              </div>
              <p className="font-bold text-[10px] text-emerald-900 leading-tight">Pelopor Hijau</p>
            </div>
            <div className="bg-blue-50 p-2.5 rounded-xl border border-blue-100">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-1 text-xs">
                <i className="fas fa-handshake"></i>
              </div>
              <p className="font-bold text-[10px] text-blue-900 leading-tight">Mitra B2B Aktif</p>
            </div>
            <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-100">
              <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center mx-auto mb-1 text-xs">
                <i className="fas fa-dumpster"></i>
              </div>
              <p className="font-bold text-[10px] text-amber-900 leading-tight">100+ kg Bebas TPA</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden space-y-px">
          <div onClick={() => navTo('/stats')} className="p-3.5 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center text-xs text-gray-700">
              <i className="fas fa-chart-line text-teal-600 w-6 text-center mr-2"></i> Laporan Dampak Lingkungan
            </div>
            <i className="fas fa-chevron-right text-xs text-gray-300"></i>
          </div>
          <div
            onClick={() =>
              showModal('Pusat Bantuan & Layanan Pelanggan EcoUMKM aktif 24/7.', 'Pusat Bantuan', 'fa-headset', 'text-blue-500', 'bg-blue-100')
            }
            className="p-3.5 flex items-center justify-between hover:bg-gray-50 cursor-pointer border-t border-gray-50"
          >
            <div className="flex items-center text-xs text-gray-700">
              <i className="fas fa-question-circle text-blue-500 w-6 text-center mr-2"></i> Bantuan & Layanan
            </div>
            <i className="fas fa-chevron-right text-xs text-gray-300"></i>
          </div>
          <div onClick={() => setEditProfileOpen(true)} className="p-3.5 flex items-center justify-between hover:bg-gray-50 cursor-pointer border-t border-gray-50">
            <div className="flex items-center text-xs text-gray-700">
              <i className="fas fa-cog text-gray-500 w-6 text-center mr-2"></i> Pengaturan & Edit Profil
            </div>
            <i className="fas fa-chevron-right text-xs text-gray-300"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
