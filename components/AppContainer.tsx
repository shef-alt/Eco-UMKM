'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import BottomNav, { NAV_PATHS } from '@/components/BottomNav';
import ActivityDetailModal from '@/components/modals/ActivityDetailModal';
import OptionSellModal from '@/components/modals/OptionSellModal';
import ProfileModal from '@/components/modals/ProfileModal';
import GlobalModal from '@/components/modals/GlobalModal';

export default function AppContainer({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <>
      <div className="w-full max-w-md h-dvh bg-slate-50 relative overflow-hidden flex flex-col shadow-[0_0_30px_rgba(0,0,0,0.4)]">
        {children}
        {NAV_PATHS.includes(pathname) && <BottomNav pathname={pathname} />}
      </div>
      <ActivityDetailModal />
      <OptionSellModal />
      <ProfileModal />
      <GlobalModal />
    </>
  );
}
