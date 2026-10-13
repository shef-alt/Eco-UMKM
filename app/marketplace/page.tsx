'use client';

import ProductCard from '@/components/ProductCard';
import { useApp } from '@/context/AppContext';
import { marketCategories } from '@/lib/data';

export default function MarketplacePage() {
  const {
    marketplaceProducts, marketCategory, setMarketCategory, marketSearch, setMarketSearch,
    handleProductClick, navTo,
  } = useApp();

  const q = marketSearch.toLowerCase().trim();
  const filtered = marketplaceProducts.filter((prod) => {
    const matchSearch = prod.title.toLowerCase().includes(q) || prod.seller.toLowerCase().includes(q);

    let matchCat = marketCategory === 'all';
    if (!matchCat) {
      if (prod.category && prod.category === marketCategory) matchCat = true;
      else if (marketCategory === 'pakaian' && prod.icon === 'fa-tshirt') matchCat = true;
      else if (marketCategory === 'elektronik' && prod.icon === 'fa-microchip') matchCat = true;
      else if (marketCategory === 'kertas' && prod.icon === 'fa-box') matchCat = true;
      else if (
        marketCategory === 'plastik' &&
        (prod.icon === 'fa-wine-bottle' || prod.title.toLowerCase().includes('plastik'))
      )
        matchCat = true;
    }
    return matchSearch && matchCat;
  });

  return (
    <div className="screen bg-gray-50">
      <div className="bg-blue-600 px-4 pt-3.5 pb-3 shadow-md sticky top-0 z-10 text-white">
        <div className="flex items-center mb-2.5">
          <button onClick={() => navTo('/')} className="p-1 -ml-1 text-white">
            <i className="fas fa-arrow-left"></i>
          </button>
          <h2 className="text-base font-bold ml-2">Marketplace Eco-UMKM</h2>
          <div className="ml-auto text-xs bg-blue-500 px-2.5 py-1 rounded-full border border-blue-400">
            <i className="fas fa-store mr-1"></i> B2B Limbah
          </div>
        </div>
        <div className="relative">
          <input
            type="text"
            value={marketSearch}
            onChange={(e) => setMarketSearch(e.target.value)}
            placeholder="Cari limbah kain, e-waste, kardus, atau nama toko..."
            className="w-full bg-white/15 text-white placeholder-blue-200 rounded-xl px-3.5 py-2 pl-9 outline-none text-xs border border-blue-400/50 focus:bg-white/25"
          />
          <i className="fas fa-search absolute left-3 top-2.5 text-blue-200 text-xs"></i>
        </div>
      </div>

      <div className="bg-white px-4 py-2 flex gap-4 overflow-x-auto border-b border-gray-100 text-xs whitespace-nowrap">
        {marketCategories.map((c) => (
          <div
            key={c.value}
            onClick={() => setMarketCategory(c.value)}
            className={
              marketCategory === c.value
                ? 'font-bold text-blue-600 border-b-2 border-blue-600 pb-1.5 cursor-pointer'
                : 'text-gray-500 pb-1.5 cursor-pointer hover:text-gray-700'
            }
          >
            {c.label}
          </div>
        ))}
      </div>

      <div className="p-4 grid grid-cols-2 gap-3">
        {filtered.length === 0 ? (
          <div className="col-span-2 text-center text-gray-400 text-xs py-10">
            <i className="fas fa-box-open text-3xl mb-2 text-gray-300"></i>
            <p className="font-medium text-gray-600">Barang tidak ditemukan</p>
            <p className="text-[10px] text-gray-400 mt-0.5">Coba gunakan filter atau kata kunci lain.</p>
          </div>
        ) : (
          filtered.map((prod) => <ProductCard key={prod.id} product={prod} onClick={handleProductClick} />)
        )}
      </div>

      <div className="p-4 pt-0">
        <button
          onClick={() => navTo('/upload')}
          className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 p-3 rounded-xl font-bold shadow-sm flex items-center justify-center border border-blue-200 text-xs"
        >
          <i className="fas fa-plus-circle mr-2"></i> Jual / Tautkan Barang Daur Ulang
        </button>
      </div>
    </div>
  );
}
