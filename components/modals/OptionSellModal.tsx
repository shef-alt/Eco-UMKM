'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';

export default function OptionSellModal() {
  const { sellModalOpen, setSellModalOpen, publishListing } = useApp();
  const [method, setMethod] = useState<'internal' | 'external'>('internal');
  const [platform, setPlatform] = useState('shopee');
  const [sellerName, setSellerName] = useState('');
  const [url, setUrl] = useState('');

  const isExternal = method === 'external';
  const close = () => setSellModalOpen(false);

  const submit = () => {
    close();
    publishListing({
      method,
      platform,
      sellerName: sellerName.trim(),
      url: url.trim(),
    });
  };

  return (
    <div className={`modal-overlay ${sellModalOpen ? 'show' : ''}`} id="sell-option-modal">
      <div className="modal-content text-left">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-gray-800 text-sm flex items-center gap-2">
            <i className="fas fa-store text-blue-600"></i> Opsi Penjualan Marketplace
          </h3>
          <button onClick={close} className="text-gray-400 hover:text-gray-600">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <p className="text-xs text-gray-500 mb-3">
          Pilih bagaimana Anda ingin menjual atau memajang barang limbah ini agar pelaku UMKM lain dapat menjangkaunya.
        </p>

        <div className="space-y-2.5 mb-3">
          <label
            className={`block p-3 rounded-xl cursor-pointer transition-all ${
              !isExternal ? 'border-2 border-emerald-500 bg-emerald-50/60' : 'border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center">
              <input
                type="radio"
                name="sell_method"
                value="internal"
                checked={!isExternal}
                onChange={() => setMethod('internal')}
                className="text-emerald-600 focus:ring-emerald-500"
              />
              <div className="ml-2.5">
                <span className="block font-bold text-xs text-gray-800">Jual Langsung di EcoUMKM</span>
                <span className="block text-[10px] text-gray-500">Transaksi langsung via saldo dompet & kurir penjemputan.</span>
              </div>
            </div>
          </label>

          <label
            className={`block p-3 rounded-xl cursor-pointer transition-all ${
              isExternal ? 'border-2 border-blue-500 bg-blue-50/60' : 'border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center">
              <input
                type="radio"
                name="sell_method"
                value="external"
                checked={isExternal}
                onChange={() => setMethod('external')}
                className="text-blue-600 focus:ring-blue-500"
              />
              <div className="ml-2.5">
                <span className="block font-bold text-xs text-gray-800">Tautkan Toko Online (E-Commerce)</span>
                <span className="block text-[10px] text-gray-500">Tautkan barang Anda ke Shopee, Tokopedia, atau Lazada.</span>
              </div>
            </div>
          </label>
        </div>

        {isExternal && (
          <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 mb-3 space-y-2">
            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">Pilih Platform Toko</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg p-2 text-xs outline-none focus:border-blue-500"
              >
                <option value="shopee">Shopee</option>
                <option value="tokopedia">Tokopedia</option>
                <option value="lazada">Lazada</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">Nama Toko / UMKM</label>
              <input
                type="text"
                value={sellerName}
                onChange={(e) => setSellerName(e.target.value)}
                placeholder="Contoh: Toko Berkah Tekstil"
                className="w-full bg-white border border-gray-300 rounded-lg p-2 text-xs outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">Link Produk E-Commerce</label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://shopee.co.id/product/..."
                className="w-full bg-white border border-gray-300 rounded-lg p-2 text-xs outline-none focus:border-blue-500"
              />
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <button onClick={close} className="flex-1 bg-gray-200 text-gray-700 py-2.5 rounded-xl font-bold text-xs">
            Batal
          </button>
          <button onClick={submit} className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl font-bold text-xs shadow hover:bg-blue-700">
            Publikasikan Listing
          </button>
        </div>
      </div>
    </div>
  );
}
