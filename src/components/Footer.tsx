import React from 'react';
import { useApp } from '../context/AppContext';
import { GraduationCap } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="border-t border-slate-200/80 bg-white mt-16 text-slate-600">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#0066FF] text-white flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-slate-900 tracking-tight">
                Campus <span className="text-[#0066FF]">Mart</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              Platform e-commerce resmi kebutuhan mahasiswa: tas kuliah, buku catatan, tumbler ramah lingkungan, sleeve laptop, dan perlengkapan perkuliahan hemat dan berkualitas.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="hover:text-[#0066FF] transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('products')}
                  className="hover:text-[#0066FF] transition-colors"
                >
                  Semua Produk
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('order')}
                  className="hover:text-[#0066FF] transition-colors"
                >
                  Status Pesanan
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('profile')}
                  className="hover:text-[#0066FF] transition-colors"
                >
                  Profil Mahasiswa
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service / Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Layanan Kampus
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Dukungan pengantaran langsung ke asrama & kosan mahasiswa.
            </p>
            <p className="text-xs font-semibold text-slate-700">
              WhatsApp Support: +62 812-3456-7890
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-100 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 Campus Mart. Solusi Belanja Mahasiswa Cerdas.</p>
          <div className="flex items-center gap-4">
            <span>Privasi</span>
            <span>·</span>
            <span>Syarat & Ketentuan</span>
            <span>·</span>
            <span>Bantuan</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
