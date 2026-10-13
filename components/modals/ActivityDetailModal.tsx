'use client';

import { useApp } from '@/context/AppContext';
import { trackingSteps } from '@/lib/data';
import { formatRupiah } from '@/lib/utils';

export default function ActivityDetailModal() {
  const { userActivities, detailActivityId, setDetailActivityId } = useApp();
  const act = userActivities.find((a) => a.id === detailActivityId);
  const close = () => setDetailActivityId(null);
  const steps = trackingSteps[act?.type === 'marketplace' ? 'marketplace' : 'pengepul'];

  return (
    <div className={`modal-overlay ${act ? 'show' : ''}`} id="activity-detail-modal">
      <div className="modal-content text-left max-h-[85vh] flex flex-col p-0 overflow-hidden">
        <div className="bg-emerald-600 text-white p-4 flex justify-between items-center">
          <div>
            <p className="text-[10px] text-emerald-200">Detail Pelacakan ID</p>
            <h3 className="font-mono font-bold text-sm">{act?.id || 'TRX-000000'}</h3>
          </div>
          <button onClick={close} className="text-white opacity-80 hover:opacity-100 p-1">
            <i className="fas fa-times text-base"></i>
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-1">
          <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 mb-4 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-xs text-gray-800">{act?.title || 'Barang Limbah'}</h4>
              <p className="text-[10px] text-gray-400">{act ? 'Mitra: ' + act.partner : 'Pengepul'}</p>
            </div>
            <span className="font-bold text-emerald-600 text-xs">{formatRupiah(act?.price || 0)}</span>
          </div>

          <div className="relative border-l-2 border-emerald-200 ml-3 space-y-5 pb-2">
            {steps.map((s, i) => {
              const done = act ? i + 1 <= act.step : i === 0;
              return (
                <div key={i} className={`relative pl-5 transition-opacity duration-300 ${done ? '' : 'opacity-40'}`}>
                  <div
                    className={`absolute -left-[9px] top-0.5 w-4 h-4 rounded-full ${
                      done ? 'bg-emerald-500' : 'bg-gray-300'
                    } border-2 border-white shadow`}
                  ></div>
                  <h4 className="font-bold text-gray-800 text-xs">{s.title}</h4>
                  <p className="text-[10px] text-gray-500 mt-0.5">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-3 bg-gray-50 border-t border-gray-100 text-right">
          <button onClick={close} className="w-full bg-gray-900 text-white py-2 rounded-xl font-bold text-xs">
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
