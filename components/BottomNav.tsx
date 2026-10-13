'use client';

import Link from 'next/link';

const NAV_ITEMS = [
  { href: '/', icon: 'fa-home', label: 'Beranda' },
  { href: '/marketplace', icon: 'fa-store', label: 'Pasar' },
  { href: '/tracking', icon: 'fa-clipboard-list', label: 'Aktivitas' },
  { href: '/stats', icon: 'fa-chart-pie', label: 'Statistik' },
  { href: '/profile', icon: 'fa-user-circle', label: 'Profil' },
];

export const NAV_PATHS = NAV_ITEMS.map((i) => i.href);

export default function BottomNav({ pathname }: { pathname: string }) {
  return (
    <div className="absolute bottom-0 inset-x-0 bg-white border-t border-slate-200 flex justify-around py-2.5 z-50 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex flex-col items-center w-1/5 text-[0.65rem] cursor-pointer transition-colors ${
            pathname === item.href ? 'text-emerald-500 font-bold' : 'text-slate-400 font-medium'
          }`}
        >
          <i className={`fas ${item.icon} text-[1.15rem] mb-0.5`}></i>
          <span>{item.label}</span>
        </Link>
      ))}
    </div>
  );
}
