import type { Platform } from '@/lib/types';

export default function PlatformBadge({ platform = 'internal' }: { platform?: Platform }) {
  const base = 'text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm';
  switch (platform) {
    case 'tokopedia':
      return <span className={`bg-emerald-600 ${base}`}><i className="fas fa-shopping-bag"></i> Tokopedia</span>;
    case 'shopee':
      return <span className={`bg-orange-500 ${base}`}><i className="fas fa-store"></i> Shopee</span>;
    case 'lazada':
      return <span className={`bg-blue-600 ${base}`}><i className="fas fa-shopping-cart"></i> Lazada</span>;
    default:
      return <span className={`bg-teal-600 ${base}`}><i className="fas fa-leaf"></i> EcoUMKM</span>;
  }
}
