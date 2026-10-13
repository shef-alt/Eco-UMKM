'use client';

import PlatformBadge from '@/components/PlatformBadge';
import type { Product } from '@/lib/types';
import { formatRupiah } from '@/lib/utils';
import Image from 'next/image';

interface Props {
  product: Product;
  onClick: (product: Product) => void;
}

export default function ProductCard({ product, onClick }: Props) {
  const actionLabel = product.isUserItem
    ? 'Di-Listing'
    : product.platform && product.platform !== 'internal'
    ? 'Buka Link'
    : 'Beli';

  return (
    <div
      onClick={() => onClick(product)}
      className={`bg-white rounded-2xl shadow-sm border ${
        product.isUserItem ? 'border-blue-400 ring-2 ring-blue-100' : 'border-gray-100'
      } overflow-hidden cursor-pointer relative flex flex-col justify-between`}
    >
      {product.isUserItem && (
        <span className="bg-blue-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-md absolute top-1.5 right-1.5 shadow z-10">
          Produk Anda
        </span>
      )}
      <div className="h-28 bg-gray-100 relative overflow-hidden">
        {product.image ? (
          <Image src={product.image} fill className="w-full h-full object-cover" alt={product.title} />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-2xl">
            <i className={`fas ${product.icon}`}></i>
          </div>
        )}
        <div className="absolute bottom-1.5 left-1.5">
          <PlatformBadge platform={product.platform || 'internal'} />
        </div>
      </div>
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-gray-800 text-xs leading-tight mb-1 line-clamp-2">{product.title}</h3>
          <p className="font-bold text-blue-600 text-xs mb-2">{formatRupiah(product.price)}</p>
        </div>
        <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1.5 border-t border-gray-50">
          <span className="truncate max-w-[85px]">
            <i className="fas fa-store mr-1 text-gray-300"></i>
            {product.seller}
          </span>
          <span className="text-blue-600 font-bold hover:underline">{actionLabel}</span>
        </div>
      </div>
    </div>
  );
}
