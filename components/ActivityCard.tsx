'use client';

import type { Activity } from '@/lib/types';
import { formatRupiah } from '@/lib/utils';

interface Props {
  activity: Activity;
  onOpen: (id: string) => void;
}

export default function ActivityCard({ activity: act, onOpen }: Props) {
  const isPengepul = act.type === 'pengepul';
  return (
    <div
      className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:border-emerald-300 transition-all cursor-pointer"
      onClick={() => onOpen(act.id)}
    >
      <div className="flex justify-between items-center mb-2.5 border-b border-gray-50 pb-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] font-bold text-gray-800">{act.id}</span>
          <span
            className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md font-semibold ${
              isPengepul ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'
            }`}
          >
            {isPengepul ? 'Penjemputan' : 'Marketplace'}
          </span>
        </div>
        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${act.badgeClass}`}>{act.statusBadge}</span>
      </div>

      <div className="flex items-center mb-3">
        <div
          className={`w-10 h-10 ${
            isPengepul ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
          } rounded-xl flex items-center justify-center text-sm mr-3 shrink-0`}
        >
          <i className={`fas ${act.icon}`}></i>
        </div>
        <div className="flex-1 min-w-0 pr-2">
          <h4 className="font-bold text-xs text-gray-800 truncate">{act.title}</h4>
          <p className="text-[10px] text-gray-400 truncate">
            <i className="fas fa-user-friends mr-1"></i>
            {act.partner}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-xs font-bold text-gray-800">{formatRupiah(act.price)}</p>
          <p className="text-[9px] text-gray-400">{act.date}</p>
        </div>
      </div>

      <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden flex">
        <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${(act.step / 4) * 100}%` }}></div>
      </div>
      <div className="flex justify-between items-center text-[9px] text-gray-400 mt-1.5">
        <span>Tahap {act.step} dari 4</span>
        <span className="text-emerald-600 font-semibold flex items-center">
          Lihat Timeline <i className="fas fa-chevron-right ml-1 text-[8px]"></i>
        </span>
      </div>
    </div>
  );
}
