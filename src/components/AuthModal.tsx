import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, GraduationCap, Lock, Mail, User, Phone, Sparkles } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    login,
    register,
  } = useApp();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('surya@example.com');
  const [loginPass, setLoginPass] = useState('password123');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPass, setRegPass] = useState('');

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(loginEmail, loginPass);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(regName, regEmail, regPhone, regPass);
  };

  const handleQuickDemoLogin = () => {
    login('surya@example.com', 'password123');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={() => setIsAuthModalOpen(false)}
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 p-6 sm:p-8 space-y-6">
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-blue-500 text-white flex items-center justify-center mx-auto shadow-md shadow-blue-500/25">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">
            {authModalMode === 'login' ? 'Masuk ke Akun Anda' : 'Daftar Akun Baru'}
          </h2>
          <p className="text-xs text-slate-500">
            Akses promo mahasiswa, kelola keranjang dan pantau pesanan kampusmu.
          </p>
        </div>

        {/* Mode Switch Tabs */}
        <div className="flex bg-slate-100/80 p-1 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => setAuthModalMode('login')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              authModalMode === 'login'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Masuk
          </button>
          <button
            type="button"
            onClick={() => setAuthModalMode('register')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              authModalMode === 'register'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Daftar
          </button>
        </div>

        {/* 1-Click Demo Login Helper */}
        <div className="bg-blue-50 border border-blue-200/70 rounded-2xl p-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#0066FF] shrink-0" />
            <div className="text-[11px] text-slate-600">
              <span className="font-bold text-slate-900 block">Akun Uji Coba:</span>
              Surya Pratama (surya@example.com)
            </div>
          </div>
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="px-3 py-1.5 text-[11px] font-bold text-white bg-[#0066FF] hover:bg-blue-700 rounded-lg whitespace-nowrap shadow-2xs"
          >
            Masuk Instan
          </button>
        </div>

        {/* Form */}
        {authModalMode === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Alamat Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="nama@kampus.ac.id"
                  className="w-full text-xs pl-9 pr-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0066FF]"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs pl-9 pr-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0066FF]"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 text-xs font-semibold text-white bg-[#0066FF] hover:bg-blue-700 active:scale-[0.98] rounded-xl shadow-md shadow-blue-500/20 transition-all"
            >
              Masuk Sekarang
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Nama Lengkap
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Contoh: Surya Pratama"
                  className="w-full text-xs pl-9 pr-3.5 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0066FF]"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Alamat Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="surya@example.com"
                  className="w-full text-xs pl-9 pr-3.5 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0066FF]"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Nomor WhatsApp / HP
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="0812 3456 7890"
                  className="w-full text-xs pl-9 pr-3.5 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0066FF]"
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={regPass}
                  onChange={(e) => setRegPass(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="w-full text-xs pl-9 pr-3.5 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0066FF]"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 px-4 text-xs font-semibold text-white bg-[#0066FF] hover:bg-blue-700 active:scale-[0.98] rounded-xl shadow-md shadow-blue-500/20 transition-all"
            >
              Buat Akun Mahasiswa
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
