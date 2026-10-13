'use client';

import { useApp } from '@/context/AppContext';
import { pengepulList } from '@/lib/data';

export default function PengepulPage() {
  const { navTo, requestPickup } = useApp();

  return (
    <div className="screen relative z-30 bg-gray-50">
      <div className="bg-white px-4 py-3.5 flex items-center shadow-sm sticky top-0 z-10 border-b border-gray-100">
        <button onClick={() => navTo('/result')} className="p-2 -ml-2 text-gray-600">
          <i className="fas fa-arrow-left"></i>
        </button>
        <h2 className="text-base font-bold ml-2 text-gray-800">Pilih Mitra Pengepul</h2>
      </div>

      <div className="p-5">
        <p className="text-xs text-gray-500 mb-4">Pengepul terdekat yang siap menjemput dan memproses jenis limbah Anda.</p>

        <div className="space-y-3.5">
          {pengepulList.map((p) => (
            <div
              key={p.name}
              className={`bg-white p-4 rounded-2xl border ${
                p.recommended ? 'border-emerald-500' : 'border-gray-100'
              } shadow-sm relative overflow-hidden`}
            >
              {p.recommended && (
                <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[9px] font-bold px-2.5 py-1 rounded-bl-xl">
                  REKOMENDASI
                </div>
              )}
              <div className="flex items-center mb-3">
                <div className={`w-11 h-11 ${p.iconBox} rounded-2xl mr-3 flex items-center justify-center text-lg shrink-0`}>
                  <i className={`fas ${p.icon}`}></i>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-xs">{p.name}</h3>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    <i className={`fas fa-map-marker-alt ${p.pin}`}></i> {p.distance} • {p.tag}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center bg-gray-50 p-2 rounded-xl mb-3 text-[11px]">
                <span className="text-gray-500">
                  Terima: <strong className="text-gray-700">{p.accepts}</strong>
                </span>
                <span className="text-amber-500 font-bold">
                  <i className="fas fa-star mr-1"></i>
                  {p.rating}
                </span>
              </div>
              <button
                onClick={() => requestPickup(p.requestName)}
                className={`w-full py-2.5 rounded-xl font-semibold text-xs active:scale-95 transition-transform ${
                  p.recommended
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Request Penjemputan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
