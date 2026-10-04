import React from 'react';
import { useApp } from '../context/AppContext';
import { HERO_IMAGE } from '../data/products';
import { ArrowRight, ShoppingBag } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { products, navigateTo, addToCart, startCheckout } = useApp();

  const popularProducts = products.filter((p) => p.isPopular).slice(0, 4);

  const handleBuyNow = (e: React.MouseEvent, product: any) => {
    e.stopPropagation();
    addToCart(product, 1);
    startCheckout();
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#EAF3FF] via-[#EFF6FF] to-[#DDEBFF] rounded-3xl mt-4 sm:mt-6 border border-blue-100/60 shadow-[0_4px_24px_rgba(0,102,255,0.06)]">
        {/* Soft decorative background circles */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6 sm:px-10 py-10 sm:py-16 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          {/* Left Column: Copy & CTA */}
          <div className="space-y-5 z-10">
            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Campus <span className="text-[#0066FF]">Mart</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-md">
              Belanja kebutuhan kampus lebih mudah, cepat dan hemat!
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigateTo('products')}
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-[#0066FF] hover:bg-blue-700 active:scale-[0.98] rounded-xl shadow-md shadow-blue-500/25 transition-all duration-200"
              >
                Jelajahi Produk
              </button>
            </div>
          </div>

          {/* Right Column: Hero Showcase Image */}
          <div className="relative flex justify-center items-center">
            <div className="relative w-full max-w-[420px] aspect-[4/3] rounded-2xl overflow-hidden shadow-sm bg-white/40 backdrop-blur-sm border border-white/60">
              <img
                src={HERO_IMAGE}
                alt="Campus Mart Gear: Tas Ransel, Buku Tulis, Tumbler, Laptop"
                className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Produk Populer
          </h2>
          <button
            onClick={() => navigateTo('products')}
            className="group inline-flex items-center gap-1 text-sm font-semibold text-[#0066FF] hover:text-blue-700 transition-colors"
          >
            <span>Lihat Semua</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {popularProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => navigateTo('detail', product.id)}
              className="group bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Image Box */}
                <div className="relative w-full aspect-square rounded-xl bg-[#F4F5F7] overflow-hidden flex items-center justify-center p-3 group-hover:bg-[#EDEFF2] transition-colors">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Info */}
                <div>
                  <h3 className="text-base font-semibold text-slate-800 line-clamp-1 group-hover:text-[#0066FF] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm font-bold text-[#0066FF] mt-1 tabular-nums">
                    {product.formattedPrice}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-1">
                <button
                  onClick={(e) => handleBuyNow(e, product)}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#0066FF] hover:bg-blue-700 active:scale-[0.98] rounded-xl transition-colors shadow-xs flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Beli Sekarang</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Campus Value Props banner */}
      <section className="bg-slate-50/80 rounded-2xl border border-slate-200/60 p-6 sm:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-800">
              Antar Cepat ke Kos & Kampus
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Pengiriman instan dan reguler langsung ke alamat kosan atau gedung kampus.
            </p>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-800">
              Harga Mahasiswa Ramah Kantong
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Diskon khusus perlengkapan kuliah, alat tulis, dan aksesoris setiap hari.
            </p>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-800">
              Pembayaran Fleksibel (COD & QRIS)
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Bisa bayar langsung saat barang sampai di kos atau lewat GoPay, OVO, dan transfer.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
