import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GraduationCap, Search, ShoppingCart, User, LogOut, ChevronDown, Check } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentPage,
    navigateTo,
    cartCount,
    setIsCartOpen,
    user,
    isAuthenticated,
    openAuthModal,
    logout,
    searchQuery,
    setSearchQuery,
  } = useApp();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPage !== 'products') {
      navigateTo('products');
    }
    setIsSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <button
          onClick={() => navigateTo('home')}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-blue-500 flex items-center justify-center text-white shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-1">
              Campus <span className="text-[#0066FF]">Mart</span>
            </span>
          </div>
        </button>

        {/* Navigation Links Zone */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { id: 'home', label: 'Home' },
            { id: 'products', label: 'Products' },
            { id: 'order', label: 'Order' },
            { id: 'profile', label: 'Profile' },
          ].map((item) => {
            const isActive =
              currentPage === item.id ||
              (item.id === 'products' && currentPage === 'detail');
            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id as any)}
                className={`relative py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-[#0066FF] font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0066FF] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Actions Zone: Search, Cart, Profile */}
        <div className="flex items-center gap-3">
          {/* Quick Search */}
          <div className="relative">
            {isSearchOpen ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <input
                  type="text"
                  autoFocus
                  placeholder="Cari buku, ransel, tumbler..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onBlur={() => {
                    if (!searchQuery) setIsSearchOpen(false);
                  }}
                  className="w-48 sm:w-64 pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </form>
            ) : (
              <button
                onClick={() => {
                  setIsSearchOpen(true);
                  if (currentPage !== 'products') navigateTo('products');
                }}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                aria-label="Cari produk"
                title="Cari produk"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Cart Icon with badge */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
            aria-label="Keranjang belanja"
            title="Keranjang Belanja"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-[#0066FF] text-white text-[10px] font-bold rounded-full px-1 shadow-sm">
              {cartCount}
            </span>
          </button>

          {/* Profile / User Menu */}
          <div className="relative">
            {isAuthenticated ? (
              <div>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-50 transition-colors text-slate-700"
                  aria-label="Menu pengguna"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-semibold text-xs overflow-hidden">
                    {user?.name ? user.name.slice(0, 2).toUpperCase() : <User className="w-4 h-4" />}
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
                </button>

                {isUserMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white border border-slate-100 rounded-xl shadow-lg shadow-slate-200/50 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                    onMouseLeave={() => setIsUserMenuOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-semibold text-slate-900 truncate">
                        {user?.name || 'Surya Pratama'}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">
                        {user?.email || 'surya@example.com'}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        navigateTo('profile');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      Profil Saya
                    </button>
                    <button
                      onClick={() => {
                        navigateTo('order');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <Check className="w-4 h-4 text-slate-400" />
                      Pesanan Saya
                    </button>
                    <div className="border-t border-slate-100 my-1" />
                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4 text-rose-500" />
                      Keluar
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#0066FF] hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
              >
                <User className="w-3.5 h-3.5" />
                <span>Masuk</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Nav Tabs */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-100 bg-white py-1.5 text-xs">
        {[
          { id: 'home', label: 'Home' },
          { id: 'products', label: 'Products' },
          { id: 'order', label: 'Order' },
          { id: 'profile', label: 'Profile' },
        ].map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id as any)}
              className={`px-3 py-1 font-medium transition-colors ${
                isActive ? 'text-[#0066FF] font-bold' : 'text-slate-500'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
