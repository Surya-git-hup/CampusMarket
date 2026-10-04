import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Star, Minus, Plus, ShoppingCart, ShoppingBag, ArrowLeft, ShieldCheck, Truck } from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { selectedProduct, addToCart, startCheckout, navigateTo } = useApp();
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  if (!selectedProduct) {
    return (
      <div className="py-20 text-center space-y-4">
        <p className="text-base text-slate-600">Produk tidak ditemukan.</p>
        <button
          onClick={() => navigateTo('products')}
          className="px-4 py-2 text-xs font-semibold text-white bg-[#0066FF] rounded-lg"
        >
          Kembali ke Katalog
        </button>
      </div>
    );
  }

  const gallery =
    selectedProduct.gallery && selectedProduct.gallery.length > 0
      ? selectedProduct.gallery
      : [selectedProduct.image, selectedProduct.image, selectedProduct.image, selectedProduct.image];

  const currentDisplayImage = gallery[activeImageIndex] || selectedProduct.image;

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity);
    startCheckout();
  };

  return (
    <div className="space-y-8 pb-16 pt-2">
      {/* Breadcrumb / Back button */}
      <button
        onClick={() => navigateTo('products')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Semua Produk</span>
      </button>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-start">
        {/* Left Column: Image Gallery */}
        <div className="space-y-4">
          {/* Main Large Image */}
          <div className="relative w-full aspect-square bg-[#F4F5F7] rounded-3xl overflow-hidden p-6 sm:p-10 flex items-center justify-center border border-slate-200/80 shadow-2xs">
            <img
              src={currentDisplayImage}
              alt={selectedProduct.name}
              className="w-full h-full object-contain mix-blend-multiply transition-all duration-300"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* 4 Thumbnails */}
          <div className="grid grid-cols-4 gap-3">
            {gallery.slice(0, 4).map((thumb, index) => {
              const isActive = index === activeImageIndex;
              return (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative aspect-square rounded-xl bg-[#F4F5F7] overflow-hidden p-2 flex items-center justify-center border-2 transition-all ${
                    isActive
                      ? 'border-[#0066FF] ring-2 ring-blue-500/20'
                      : 'border-transparent hover:border-slate-300 opacity-75 hover:opacity-100'
                  }`}
                >
                  <img
                    src={thumb}
                    alt={`${selectedProduct.name} view ${index + 1}`}
                    className="w-full h-full object-contain mix-blend-multiply"
                    referrerPolicy="no-referrer"
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Product Info & Purchase Module */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0066FF]">
              {selectedProduct.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {selectedProduct.name}
            </h1>
            <p className="text-2xl sm:text-3xl font-extrabold text-[#0066FF] tabular-nums pt-1">
              {selectedProduct.formattedPrice}
            </p>

            {/* Rating Stars & Count */}
            <div className="flex items-center gap-2 pt-1">
              <div className="flex items-center text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-slate-700 tabular-nums">
                {selectedProduct.rating}
              </span>
              <span className="text-xs text-slate-400">
                ({selectedProduct.reviewCount} ulasan)
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="border-t border-slate-100 pt-4">
            <p className="text-sm text-slate-600 leading-relaxed">
              {selectedProduct.description}
            </p>
          </div>

          {/* Specifications */}
          <div className="space-y-2 border-t border-slate-100 pt-4">
            <h3 className="text-sm font-bold text-slate-900">Spesifikasi:</h3>
            <ul className="space-y-1 text-xs text-slate-600 list-disc list-inside">
              {selectedProduct.specifications.map((spec, i) => (
                <li key={i} className="leading-relaxed">
                  <span className="font-medium text-slate-700">{spec.key}</span>: {spec.value}
                </li>
              ))}
            </ul>
          </div>

          {/* Quantity Stepper */}
          <div className="border-t border-slate-100 pt-4 flex items-center gap-4">
            <span className="text-sm font-semibold text-slate-700">Jumlah:</span>
            <div className="inline-flex items-center border border-slate-200 rounded-xl bg-slate-50/50 p-1">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-600 hover:bg-white hover:shadow-xs disabled:opacity-30 disabled:pointer-events-none transition-all"
                aria-label="Kurangi jumlah"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-10 text-center text-xs font-bold text-slate-800 tabular-nums">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => Math.min(selectedProduct.stock, q + 1))}
                className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-600 hover:bg-white hover:shadow-xs transition-all"
                aria-label="Tambah jumlah"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            <span className="text-xs text-slate-400">
              Tersisa {selectedProduct.stock} unit
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAddToCart}
              className="flex-1 py-3.5 px-6 text-sm font-semibold text-white bg-[#0066FF] hover:bg-blue-700 active:scale-[0.98] rounded-xl shadow-md shadow-blue-500/20 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Tambah ke Keranjang</span>
            </button>
            <button
              onClick={handleBuyNow}
              className="sm:w-44 py-3.5 px-6 text-sm font-semibold text-[#0066FF] bg-blue-50 hover:bg-blue-100 active:scale-[0.98] rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Beli Sekarang</span>
            </button>
          </div>

          {/* Delivery & Guarantee Trust Notes */}
          <div className="grid grid-cols-2 gap-3 pt-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-[#0066FF] shrink-0" />
              <div className="text-[11px] text-slate-600 leading-tight">
                <span className="font-semibold text-slate-800 block">Antar ke Kos</span>
                Bisa kirim hari yang sama
              </div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="text-[11px] text-slate-600 leading-tight">
                <span className="font-semibold text-slate-800 block">Garansi Produk</span>
                100% Original & Berkualitas
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
