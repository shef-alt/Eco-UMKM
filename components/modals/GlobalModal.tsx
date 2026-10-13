'use client';

import { useApp } from '@/context/AppContext';
import { formatRupiah } from '@/lib/utils';

export default function GlobalModal() {
  const { modal, closeModal, totalSaldo, confirmBuyProduct } = useApp();
  const { open, type, product } = modal;

  let title = modal.title;
  let icon = modal.icon;
  let iconClass = `${modal.bg} ${modal.color}`;
  let body = modal.message;
  let actions = (
    <button onClick={closeModal} className="w-full bg-gray-900 text-white py-2.5 rounded-xl font-bold text-xs">
      Tutup
    </button>
  );

  if (type === 'external' && product) {
    const platformName = product.platform.charAt(0).toUpperCase() + product.platform.slice(1);
    title = `Beli di ${platformName}`;
    icon = 'fa-external-link-alt';
    iconClass = 'bg-orange-100 text-orange-600';
    body = (
      <>
        Barang <strong className="text-gray-800">{product.title}</strong> dijual oleh{' '}
        <strong className="text-gray-700">{product.seller}</strong> di platform <strong>{platformName}</strong>.
        <br />
        <br />
        Apakah Anda ingin mengunjungi link toko tersebut?
      </>
    );
    actions = (
      <div className="flex gap-2">
        <button onClick={closeModal} className="flex-1 bg-gray-200 text-gray-700 py-2.5 rounded-xl font-bold text-xs">
          Batal
        </button>
        <a
          href={product.platformUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeModal}
          className="flex-1 bg-gradient-to-r from-orange-500 to-amber-600 text-white py-2.5 rounded-xl font-bold text-xs shadow text-center flex items-center justify-center"
        >
          Buka {platformName} <i className="fas fa-arrow-right ml-1"></i>
        </a>
      </div>
    );
  } else if (type === 'buy' && product) {
    title = 'Beli Bahan Daur Ulang?';
    icon = 'fa-shopping-cart';
    iconClass = 'bg-blue-100 text-blue-600';
    body = (
      <>
        Anda akan membeli <strong className="text-gray-800">{product.title}</strong> seharga{' '}
        <strong className="text-blue-600">{formatRupiah(product.price)}</strong> dari{' '}
        <span className="text-gray-700">{product.seller}</span>.
        <br />
        <br />
        Saldo saat ini: <strong>{formatRupiah(totalSaldo)}</strong>
      </>
    );
    actions = (
      <div className="flex gap-2">
        <button onClick={closeModal} className="flex-1 bg-gray-200 text-gray-700 py-2.5 rounded-xl font-bold text-xs">
          Batal
        </button>
        <button
          onClick={() => confirmBuyProduct(product.id)}
          className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl font-bold text-xs shadow hover:bg-blue-700"
        >
          Ya, Beli
        </button>
      </div>
    );
  }

  return (
    <div className={`modal-overlay ${open ? 'show' : ''}`} id="global-modal">
      <div className="modal-content">
        <div className={`w-14 h-14 ${iconClass} rounded-full flex items-center justify-center mx-auto mb-3 text-xl`}>
          <i className={`fas ${icon}`}></i>
        </div>
        <h3 className="font-bold text-gray-800 text-sm mb-1">{title}</h3>
        <div className="text-xs text-gray-600 mb-5">{body}</div>
        <div>{actions}</div>
      </div>
    </div>
  );
}
