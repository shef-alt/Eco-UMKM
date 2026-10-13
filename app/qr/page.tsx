'use client';

import { QRCodeSVG } from 'qrcode.react';
import { useApp } from '@/context/AppContext';

export default function QrPage() {
  const { currentTransaction: trx, navTo } = useApp();
  const id = trx?.id || 'TRX-0000';
  const qrValue = trx ? `${trx.id}|${trx.title}|${trx.price}` : id;

  return (
    <div className="screen relative z-40 bg-gray-900 text-white">
      <div className="px-4 py-3.5 flex items-center sticky top-0 z-10 border-b border-gray-800 bg-gray-900">
        <button onClick={() => navTo('/')} className="p-2 -ml-2 text-gray-400 hover:text-white">
          <i className="fas fa-times"></i>
        </button>
        <h2 className="text-base font-bold ml-2">Tiket Transaksi QR</h2>
      </div>

      <div className="p-6 flex flex-col items-center justify-center flex-1">
        <div className="bg-white p-6 rounded-3xl w-full max-w-[290px] text-center shadow-2xl relative">
          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-gray-900 shadow">
            <i className="fas fa-qrcode text-white text-sm"></i>
          </div>

          <h3 className="font-bold text-gray-800 text-sm mt-3 mb-1">Siap Di-scan</h3>
          <p className="text-[11px] text-gray-400 mb-5">Tunjukkan ke kurir/pengepul saat penjemputan.</p>

          <div className="bg-gray-50 p-3 rounded-2xl inline-block mb-4 border border-gray-100">
            <QRCodeSVG value={qrValue} size={140} />
          </div>

          <div className="border-t border-dashed border-gray-200 pt-3 mt-1">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">ID Transaksi</p>
            <p className="font-mono font-bold text-gray-800 tracking-widest text-sm">{id}</p>
          </div>
        </div>

        <div className="mt-6 w-full max-w-[290px]">
          <div className="bg-gray-800/80 p-3.5 rounded-2xl flex items-center justify-between mb-4 border border-gray-700">
            <div>
              <p className="text-[10px] text-gray-400">Mitra Pengepul</p>
              <p className="font-semibold text-xs text-white">{trx?.pengepul || '-'}</p>
            </div>
            <a href="tel:08123456789" className="w-9 h-9 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center text-sm">
              <i className="fas fa-phone"></i>
            </a>
          </div>
          <button
            onClick={() => navTo('/tracking')}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-2xl font-bold shadow-lg active:scale-95 transition-transform text-xs"
          >
            Lihat Status Penjemputan <i className="fas fa-arrow-right ml-1"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
