'use client';

import { useEffect, useState } from 'react';
import { useApp } from '@/context/AppContext';
import type { Profile } from '@/lib/types';

const FIELDS: { key: keyof Profile; label: string; placeholder?: string }[] = [
  { key: 'name', label: 'Nama Pemilik / Pengguna' },
  { key: 'role', label: 'Jabatan / Role', placeholder: 'Contoh: Owner, Manager Operasional' },
  { key: 'company', label: 'Nama Perusahaan / UMKM' },
  { key: 'sector', label: 'Sektor Usaha' },
  { key: 'wasteType', label: 'Jenis Utama Limbah' },
  { key: 'location', label: 'Lokasi / Kota' },
];

export default function ProfileModal() {
  const { editProfileOpen, setEditProfileOpen, userProfile, saveProfile } = useApp();
  const [values, setValues] = useState<Profile>(userProfile);

  // Isi ulang form dengan data profil terbaru setiap modal dibuka
  useEffect(() => {
    if (editProfileOpen) setValues({ ...userProfile, role: userProfile.role || 'Owner' });
  }, [editProfileOpen, userProfile]);

  const close = () => setEditProfileOpen(false);

  return (
    <div className={`modal-overlay ${editProfileOpen ? 'show' : ''}`} id="edit-profile-modal">
      <div className="modal-content text-left">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-gray-800 text-sm flex items-center gap-2">
            <i className="fas fa-user-edit text-emerald-600"></i> Edit Identitas Usaha & Profil
          </h3>
          <button onClick={close} className="text-gray-400 hover:text-gray-600">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="space-y-2.5 mb-4 text-xs">
          {FIELDS.map((f) => (
            <div key={f.key}>
              <label className="block text-gray-700 font-semibold mb-1">{f.label}</label>
              <input
                type="text"
                value={values[f.key] || ''}
                placeholder={f.placeholder}
                onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:border-emerald-500"
              />
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <button onClick={close} className="flex-1 bg-gray-200 text-gray-700 py-2.5 rounded-xl font-bold text-xs">
            Batal
          </button>
          <button
            onClick={() => saveProfile(values)}
            className="flex-1 bg-emerald-600 text-white py-2.5 rounded-xl font-bold text-xs shadow hover:bg-emerald-700"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}
