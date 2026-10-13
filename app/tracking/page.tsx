'use client';

import ActivityCard from '@/components/ActivityCard';
import { useApp } from '@/context/AppContext';

export default function TrackingPage() {
  const { userActivities, activitySearch, setActivitySearch, setDetailActivityId, navTo } = useApp();

  const q = activitySearch.toLowerCase().trim();
  const filtered = userActivities.filter(
    (a) =>
      a.id.toLowerCase().includes(q) ||
      a.title.toLowerCase().includes(q) ||
      a.partner.toLowerCase().includes(q) ||
      a.statusBadge.toLowerCase().includes(q)
  );

  return (
    <div className="screen relative z-50 bg-gray-50">
      <div className="bg-emerald-600 px-4 pt-3.5 pb-3 shadow-md sticky top-0 z-10 text-white">
        <div className="flex items-center mb-2.5">
          <button onClick={() => navTo('/')} className="p-1 -ml-1 text-white">
            <i className="fas fa-arrow-left"></i>
          </button>
          <h2 className="text-base font-bold ml-2">Aktivitas & Pelacakan</h2>
          <div className="ml-auto text-[10px] bg-emerald-700 px-2.5 py-1 rounded-full font-medium">
            <i className="fas fa-sync-alt mr-1"></i> Live Status
          </div>
        </div>
        <div className="relative">
          <input
            type="text"
            value={activitySearch}
            onChange={(e) => setActivitySearch(e.target.value)}
            placeholder="Cari ID transaksi, barang, atau status..."
            className="w-full bg-white/20 text-white placeholder-emerald-200 rounded-xl px-3.5 py-2 pl-9 outline-none text-xs border border-emerald-400/40 focus:bg-white/30"
          />
          <i className="fas fa-search absolute left-3 top-2.5 text-emerald-200 text-xs"></i>
        </div>
      </div>

      <div className="p-4 flex-1">
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12 px-4">
              <div className="w-12 h-12 bg-gray-200 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-2 text-lg">
                <i className="fas fa-search"></i>
              </div>
              <p className="text-xs font-bold text-gray-600">Tidak ada aktivitas ditemukan</p>
              <p className="text-[11px] text-gray-400 mt-0.5">Coba gunakan kata kunci pencarian yang berbeda.</p>
            </div>
          ) : (
            filtered.map((act) => <ActivityCard key={act.id} activity={act} onOpen={setDetailActivityId} />)
          )}
        </div>
      </div>
    </div>
  );
}
