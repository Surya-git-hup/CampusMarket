import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  MapPin,
  Lock,
  Edit3,
  Phone,
  Mail,
  Plus,
  CheckCircle2,
  Trash2,
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const {
    user,
    isAuthenticated,
    openAuthModal,
    setIsEditProfileModalOpen,
    updateAddress,
    addAddress,
    addToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'info' | 'address' | 'password'>('info');

  // Password state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Add address state
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newRecipient, setNewRecipient] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newFullAddress, setNewFullAddress] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newPostal, setNewPostal] = useState('');

  if (!isAuthenticated || !user) {
    return (
      <div className="py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-blue-50 text-[#0066FF] flex items-center justify-center mx-auto">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">
          Silakan Masuk Terlebih Dahulu
        </h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Masuk ke akun Anda untuk melihat profil, mengelola alamat pengiriman, dan riwayat pesanan.
        </p>
        <button
          onClick={() => openAuthModal('login')}
          className="px-6 py-2.5 text-xs font-semibold text-white bg-[#0066FF] hover:bg-blue-700 rounded-xl transition-colors shadow-sm"
        >
          Masuk / Daftar Akun
        </button>
      </div>
    );
  }

  const defaultAddr =
    user.addresses.find((a) => a.isDefault) || user.addresses[0];

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) {
      addToast('Mohon isi kata sandi lama dan baru.', 'error');
      return;
    }
    if (newPassword.length < 6) {
      addToast('Kata sandi baru minimal 6 karakter.', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      addToast('Konfirmasi kata sandi tidak cocok.', 'error');
      return;
    }

    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    addToast('Kata sandi berhasil diperbarui!', 'success');
  };

  const handleAddAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel || !newRecipient || !newPhone || !newFullAddress) {
      addToast('Mohon lengkapi formulir alamat.', 'error');
      return;
    }

    addAddress({
      label: newLabel,
      recipientName: newRecipient,
      phone: newPhone,
      fullAddress: newFullAddress,
      city: newCity || 'Kota Bandung',
      province: 'Jawa Barat',
      postalCode: newPostal || '40123',
      isDefault: user.addresses.length === 0,
    });

    setIsAddingAddress(false);
    setNewLabel('');
    setNewRecipient('');
    setNewPhone('');
    setNewFullAddress('');
    setNewCity('');
    setNewPostal('');
  };

  return (
    <div className="space-y-8 pb-16 pt-2">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Profil Saya
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Kelola informasi profil, alamat tujuan pengiriman, dan keamanan akun Anda
        </p>
      </div>

      {/* Main Grid: Sidebar Menu + Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 items-start">
        {/* Left Sidebar Menu */}
        <aside className="md:col-span-1 space-y-2">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-2 shadow-2xs space-y-1">
            <button
              onClick={() => setActiveTab('info')}
              className={`w-full text-left px-3.5 py-3 text-xs font-semibold rounded-xl transition-all duration-150 flex items-center gap-3 ${
                activeTab === 'info'
                  ? 'bg-blue-50 text-[#0066FF]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Informasi Profil</span>
            </button>

            <button
              onClick={() => setActiveTab('address')}
              className={`w-full text-left px-3.5 py-3 text-xs font-semibold rounded-xl transition-all duration-150 flex items-center gap-3 ${
                activeTab === 'address'
                  ? 'bg-blue-50 text-[#0066FF]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Alamat</span>
            </button>

            <button
              onClick={() => setActiveTab('password')}
              className={`w-full text-left px-3.5 py-3 text-xs font-semibold rounded-xl transition-all duration-150 flex items-center gap-3 ${
                activeTab === 'password'
                  ? 'bg-blue-50 text-[#0066FF]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>Ubah Password</span>
            </button>
          </div>
        </aside>

        {/* Right Main Content */}
        <main className="md:col-span-3 lg:col-span-4">
          {/* TAB 1: INFORMASI PROFIL (matching mockup) */}
          {activeTab === 'info' && (
            <div className="space-y-6">
              {/* Profile Card */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-2xs space-y-8">
                {/* Header User Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {/* Gray circle avatar */}
                    <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 shrink-0">
                      <User className="w-9 h-9" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">
                        {user.name}
                      </h2>
                      <p className="text-xs text-slate-500">{user.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-semibold text-[#0066FF] bg-blue-50 px-2 py-0.5 rounded-md">
                        Mahasiswa Aktif
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsEditProfileModalOpen(true)}
                    className="self-start sm:self-center px-5 py-2 text-xs font-semibold text-white bg-[#0066FF] hover:bg-blue-700 active:scale-[0.98] rounded-xl transition-all shadow-xs flex items-center gap-2"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Profil</span>
                  </button>
                </div>

                {/* Info Fields Grid */}
                <div className="border-t border-slate-100 pt-6 space-y-3 max-w-lg">
                  <div className="grid grid-cols-12 text-xs py-1">
                    <span className="col-span-4 sm:col-span-3 font-semibold text-slate-700">
                      Nama Lengkap
                    </span>
                    <span className="col-span-1 text-slate-400">:</span>
                    <span className="col-span-7 sm:col-span-8 text-slate-800 font-medium">
                      {user.name}
                    </span>
                  </div>

                  <div className="grid grid-cols-12 text-xs py-1">
                    <span className="col-span-4 sm:col-span-3 font-semibold text-slate-700">
                      Email
                    </span>
                    <span className="col-span-1 text-slate-400">:</span>
                    <span className="col-span-7 sm:col-span-8 text-slate-800 font-medium">
                      {user.email}
                    </span>
                  </div>

                  <div className="grid grid-cols-12 text-xs py-1">
                    <span className="col-span-4 sm:col-span-3 font-semibold text-slate-700">
                      No. HP
                    </span>
                    <span className="col-span-1 text-slate-400">:</span>
                    <span className="col-span-7 sm:col-span-8 text-slate-800 font-medium">
                      {user.phone}
                    </span>
                  </div>
                </div>

                {/* Default Address Section */}
                <div className="border-t border-slate-100 pt-6">
                  <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                        <MapPin className="w-4 h-4 text-[#0066FF]" />
                        <span>Alamat Default</span>
                      </div>
                      <button
                        onClick={() => setIsEditProfileModalOpen(true)}
                        className="text-xs font-semibold text-[#0066FF] hover:underline"
                      >
                        Ubah
                      </button>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed pl-6">
                      {defaultAddr
                        ? defaultAddr.fullAddress
                        : 'Belum ada alamat default'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ALAMAT LENGKAP */}
          {activeTab === 'address' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-2xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Daftar Alamat Pengiriman
                  </h3>
                  <p className="text-xs text-slate-500">
                    Atur alamat kosan, rumah, atau kampus untuk pengantaran barang
                  </p>
                </div>
                {!isAddingAddress && (
                  <button
                    onClick={() => setIsAddingAddress(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#0066FF] hover:bg-blue-700 rounded-xl transition-colors shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Alamat</span>
                  </button>
                )}
              </div>

              {isAddingAddress && (
                <form
                  onSubmit={handleAddAddressSubmit}
                  className="bg-blue-50/50 border border-blue-200 rounded-2xl p-5 space-y-4 animate-in fade-in duration-200"
                >
                  <h4 className="text-xs font-bold text-slate-800">
                    Tambah Alamat Baru
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                        Label Alamat (Contoh: Kosan, Rumah)
                      </label>
                      <input
                        type="text"
                        required
                        value={newLabel}
                        onChange={(e) => setNewLabel(e.target.value)}
                        placeholder="Contoh: Kosan Melati"
                        className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#0066FF]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                        Nama Penerima
                      </label>
                      <input
                        type="text"
                        required
                        value={newRecipient}
                        onChange={(e) => setNewRecipient(e.target.value)}
                        placeholder="Nama lengkap penerima"
                        className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#0066FF]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                        Nomor Handphone
                      </label>
                      <input
                        type="text"
                        required
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value)}
                        placeholder="0812xxxxxxx"
                        className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#0066FF]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                        Kota & Kode Pos
                      </label>
                      <input
                        type="text"
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                        placeholder="Kota Bandung, 40123"
                        className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#0066FF]"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                        Alamat Lengkap & Patokan
                      </label>
                      <textarea
                        required
                        rows={2}
                        value={newFullAddress}
                        onChange={(e) => setNewFullAddress(e.target.value)}
                        placeholder="Jalan, nomor rumah/kamar kos, RT/RW, kecamatan"
                        className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#0066FF]"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingAddress(false)}
                      className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs font-semibold text-white bg-[#0066FF] hover:bg-blue-700 rounded-lg shadow-xs"
                    >
                      Simpan Alamat
                    </button>
                  </div>
                </form>
              )}

              {/* Address List */}
              <div className="space-y-3">
                {user.addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={`p-4 rounded-xl border transition-all ${
                      addr.isDefault
                        ? 'border-blue-300 bg-blue-50/20'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-800">
                            {addr.label}
                          </span>
                          {addr.isDefault && (
                            <span className="text-[10px] font-bold text-[#0066FF] bg-blue-100 px-2 py-0.5 rounded-full">
                              Utama
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600">
                          {addr.recipientName} ({addr.phone})
                        </p>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          {addr.fullAddress}
                        </p>
                      </div>

                      {!addr.isDefault && (
                        <button
                          onClick={() => updateAddress({ ...addr, isDefault: true })}
                          className="text-xs font-semibold text-[#0066FF] hover:underline"
                        >
                          Jadikan Utama
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: UBAH PASSWORD */}
          {activeTab === 'password' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-2xs space-y-6 max-w-xl">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Ubah Kata Sandi
                </h3>
                <p className="text-xs text-slate-500">
                  Demi keamanan akun, jangan bagikan kata sandi kepada orang lain
                </p>
              </div>

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Kata Sandi Lama
                  </label>
                  <input
                    type="password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Masukkan kata sandi lama"
                    className="w-full text-xs px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0066FF]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Kata Sandi Baru
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Minimal 6 karakter"
                    className="w-full text-xs px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0066FF]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Konfirmasi Kata Sandi Baru
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Ulangi kata sandi baru"
                    className="w-full text-xs px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0066FF]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-xs font-semibold text-white bg-[#0066FF] hover:bg-blue-700 active:scale-[0.98] rounded-xl transition-all shadow-xs"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
