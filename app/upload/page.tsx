'use client';

import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { useApp } from '@/context/AppContext';
import { categoryOptions } from '@/lib/data';
import Image from 'next/image';

export default function UploadPage() {
  const {
    form, setForm, navTo, showModal, setUploadImage, processAIAnalysis,
    pendingSample, clearPendingSample,
  } = useApp();

  const [preview, setPreview] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const fileRef = useRef<HTMLInputElement>(null);

  // Bersihkan timer saat halaman ditinggalkan
  useEffect(() => () => clearTimeout(timerRef.current), []);

  // Simulasi cepat dari beranda: tampilkan preview + animasi scan, lalu analisis
  useEffect(() => {
    if (!pendingSample) return;
    const s = pendingSample;
    setPreview(s.imageUrl);
    setScanning(true);
    timerRef.current = setTimeout(() => {
      setScanning(false);
      clearPendingSample();
      processAIAnalysis(s.category, s.originalPrice, s.imageUrl, s.title);
    }, 1500);
    return () => clearTimeout(timerRef.current);
  }, [pendingSample, clearPendingSample, processAIAnalysis]);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const originalPrice = parseFloat(form.price) || 0;
    if (originalPrice <= 0) {
      showModal(
        'Silakan isi Harga Asli / Beli Saat Baru terlebih dahulu sebelum mengambil/mengunggah foto.',
        'Harga Asli Wajib Diisi',
        'fa-exclamation-circle',
        'text-amber-500',
        'bg-amber-100'
      );
      event.target.value = '';
      return;
    }

    const category = form.category;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setUploadImage(dataUrl);
      setPreview(dataUrl);
      setScanning(true);
      timerRef.current = setTimeout(() => {
        setScanning(false);
        processAIAnalysis(category, originalPrice, dataUrl);
      }, 1800);
    };
    reader.readAsDataURL(file);
  };

  const goBack = () => {
    clearTimeout(timerRef.current);
    clearPendingSample();
    navTo('/');
  };

  return (
    <div className="screen bg-gray-900 flex-col h-full absolute top-0 left-0 w-full z-10">
      <div className="p-4 flex items-center text-white border-b border-gray-800">
        <button onClick={goBack} className="p-2 -ml-2 text-gray-300 hover:text-white">
          <i className="fas fa-arrow-left text-lg"></i>
        </button>
        <h2 className="text-base font-semibold ml-2">Foto Objek Limbah</h2>
      </div>

      <div className="px-5 pt-3 pb-1">
        <label className="text-gray-300 text-xs mb-1 font-medium block">
          Harga Asli / Beli Saat Baru (Rp) <span className="text-emerald-400">*</span>
        </label>
        <input
          type="number"
          value={form.price}
          onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
          placeholder="Contoh: 150000"
          className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl p-3 outline-none focus:border-emerald-500 font-semibold mb-3 text-sm"
        />

        <label className="text-gray-300 text-xs mb-1 font-medium block">Pilih Jenis Barang</label>
        <select
          value={form.category}
          onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
          className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl p-3 outline-none focus:border-emerald-500 font-medium text-sm"
        >
          {categoryOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-5 py-2">
        <div className="w-full h-80 mt-8 mb-10 border-2 border-dashed border-gray-600 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center bg-gray-800/80 shadow-inner">
          <i className="fas fa-camera text-2xl text-gray-500 mb-1"></i>
          <p className="text-gray-400 text-[11px] text-center px-4">Ketuk tombol putih di bawah untuk upload/kamera</p>
          {preview && (
            <Image src={preview} fill className="absolute inset-0 w-full h-full object-cover" alt="Preview" />
          )}
          {scanning && (
            <div className="absolute inset-0 bg-emerald-950/60 backdrop-blur-sm">
              <div className="absolute w-full h-1 bg-emerald-500 shadow-[0_0_12px_#10b981] animate-scan"></div>
              <div className="absolute inset-0 flex items-center justify-center flex-col z-10 p-4">
                <i className="fas fa-brain text-emerald-400 text-5xl mb-2 animate-bounce"></i>
                <p className="text-white font-bold animate-pulse text-center text-md">Menganalisis material...</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 flex justify-center pb-20">
        <button
          onClick={() => fileRef.current?.click()}
          className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-[0_0_0_6px_rgba(255,255,255,0.25)] active:scale-95 transition-transform relative z-20"
        >
          <div className="w-10 h-10 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center">
            <i className="fas fa-aperture text-gray-700 text-lg"></i>
          </div>
        </button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
      </div>
    </div>
  );
}
