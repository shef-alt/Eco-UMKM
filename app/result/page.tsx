'use client';

import { useEffect, useState } from 'react';
import { useApp } from '@/context/AppContext';
import { formatRupiah } from '@/lib/utils';

export default function ResultPage() {
  const { analysis, navTo, setSellModalOpen } = useApp();
  const [dash, setDash] = useState(0);
  const [count, setCount] = useState(0);

  // Tanpa hasil analisis (mis. halaman di-refresh) kembali ke beranda
  useEffect(() => {
    if (!analysis) navTo('/');
  }, [analysis, navTo]);

  // Animasi lingkaran skor + counter
  useEffect(() => {
    if (!analysis) return;
    const score = analysis.data.score;
    setDash(0);
    setCount(0);
    let interval: ReturnType<typeof setInterval> | undefined;
    const t = setTimeout(() => {
      setDash(score);
      let current = 0;
      const increment = score / (800 / 20);
      interval = setInterval(() => {
        current += increment;
        if (current >= score) {
          current = score;
          clearInterval(interval);
        }
        setCount(Math.round(current));
      }, 20);
    }, 150);
    return () => {
      clearTimeout(t);
      clearInterval(interval);
    };
  }, [analysis]);

  if (!analysis) return null;

  const { data, title, originalPrice, finalPrice } = analysis;
  const circleColor =
    data.score >= 70 ? 'text-emerald-500' : data.score >= 60 ? 'text-amber-500' : 'text-red-500';

  return (
    <div className="screen relative z-20 bg-gray-50">
      <div className="bg-white px-4 py-3.5 flex items-center shadow-sm sticky top-0 z-10 border-b border-gray-100">
        <button onClick={() => navTo('/upload')} className="p-2 -ml-2 text-gray-600">
          <i className="fas fa-arrow-left"></i>
        </button>
        <h2 className="text-base font-bold ml-2 text-gray-800">Hasil Analisis AI</h2>
      </div>

      <div className="p-5">
        <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col items-center border border-gray-100 mb-5">
          <div className="relative w-28 h-28 mb-3">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                strokeDasharray="100, 100"
                className="text-gray-100 stroke-current"
                strokeWidth="3.5"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                strokeDasharray={`${dash}, 100`}
                className={`${circleColor} stroke-current transition-all duration-1000 ease-out`}
                strokeWidth="3.5"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-gray-800">{count}</span>
              <span className="text-[10px] text-gray-400">Skor Kelayakan</span>
            </div>
          </div>
          <h3 className="font-bold text-base text-gray-800 text-center">{title}</h3>
          <p className="text-xs text-gray-500 mt-1 text-center">{data.desc}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-sm flex items-center">
            <div className="w-9 h-9 bg-blue-50 text-blue-500 rounded-xl flex justify-center items-center mr-3 shrink-0">
              <i className="fas fa-weight-hanging text-sm"></i>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 leading-tight">Estimasi Berat</p>
              <p className="font-bold text-gray-800 text-xs mt-0.5">{data.weight}</p>
            </div>
          </div>
          <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-sm flex items-center">
            <div className="w-9 h-9 bg-amber-50 text-amber-500 rounded-xl flex justify-center items-center mr-3 shrink-0">
              <i className="fas fa-tag text-sm"></i>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 leading-tight">Est. Harga Beli</p>
              <p className="font-bold text-gray-800 text-xs mt-0.5">{formatRupiah(originalPrice)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-5">
          <h3 className="font-bold text-gray-800 mb-3 text-xs">Komposisi Material Objek</h3>
          <div className="space-y-2.5">
            {data.compo.map((c) => (
              <div key={c.name}>
                <div className="flex justify-between text-[11px] mb-1 font-medium text-gray-700">
                  <span>{c.name}</span>
                  <span>{c.perc}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div className={`${c.color} h-2 rounded-full`} style={{ width: `${c.perc}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 p-4 rounded-2xl mb-5">
          <div className="flex items-start">
            <div className="w-8 h-8 bg-emerald-500 text-white rounded-xl flex items-center justify-center mr-3 shrink-0 text-sm shadow-sm">
              <i className="fas fa-lightbulb"></i>
            </div>
            <div>
              <h4 className="font-bold text-emerald-900 text-xs">{data.action}</h4>
              <p className="text-xs text-emerald-700 mt-0.5">{data.actionDesc}</p>
              <div className="mt-2.5 inline-block bg-white px-3 py-1 rounded-full border border-emerald-200 text-xs font-bold text-emerald-800 shadow-sm">
                Nilai Daur Ulang/Jual: <span className="text-emerald-600">{formatRupiah(finalPrice)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navTo('/pengepul')}
            className="flex-1 bg-gray-900 text-white p-3.5 rounded-xl font-bold shadow-md hover:bg-gray-800 active:scale-95 transition-transform flex items-center justify-center text-xs"
          >
            <i className="fas fa-truck mr-2"></i> Panggil Pengepul
          </button>
          <button
            onClick={() => setSellModalOpen(true)}
            className="flex-1 bg-blue-600 text-white p-3.5 rounded-xl font-bold shadow-md hover:bg-blue-700 active:scale-95 transition-transform flex items-center justify-center text-xs"
          >
            <i className="fas fa-store mr-2"></i> Jual di Marketplace
          </button>
        </div>
      </div>
    </div>
  );
}
