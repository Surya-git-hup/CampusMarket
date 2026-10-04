import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/products';
import { ShoppingBag, ChevronLeft, ChevronRight, Search, X } from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const {
    products,
    navigateTo,
    addToCart,
    startCheckout,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
  } = useApp();

  const [currentPageNum, setCurrentPageNum] = useState<number>(1);
  const itemsPerPage = 6;

  // Filter products by category and search query
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === 'Semua' || product.category === activeCategory;
      const matchesSearch =
        searchQuery === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const displayedProducts = filteredProducts.slice(
    (currentPageNum - 1) * itemsPerPage,
    currentPageNum * itemsPerPage
  );

  const handleBuyNow = (e: React.MouseEvent, product: any) => {
    e.stopPropagation();
    addToCart(product, 1);
    startCheckout();
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Semua Produk
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Menampilkan {filteredProducts.length} produk perlengkapan kuliah
          </p>
        </div>

        {/* Search bar inside page for convenience */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Cari produk kuliah..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPageNum(1);
            }}
            className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] shadow-2xs"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Layout: Left Sidebar + Right Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 items-start">
        {/* Left Sidebar Categories */}
        <aside className="md:col-span-1 space-y-2">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-3 shadow-2xs">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 py-2">
              Kategori
            </h3>
            <div className="space-y-1">
              {CATEGORIES.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => {
                      setActiveCategory(category);
                      setCurrentPageNum(1);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 text-xs font-semibold rounded-xl transition-all duration-150 flex items-center justify-between ${
                      isActive
                        ? 'bg-[#0066FF] text-white shadow-sm shadow-blue-500/20'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <span>{category}</span>
                    <span
                      className={`text-[11px] ${
                        isActive ? 'text-white/80' : 'text-slate-400'
                      }`}
                    >
                      {category === 'Semua'
                        ? products.length
                        : products.filter((p) => p.category === category).length}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Right Products Grid */}
        <main className="md:col-span-3 lg:col-span-4 space-y-8">
          {displayedProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center space-y-3">
              <p className="text-sm font-semibold text-slate-700">
                Tidak ada produk ditemukan
              </p>
              <p className="text-xs text-slate-500">
                Coba ubah kata kunci pencarian atau pilih kategori lain.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('Semua');
                }}
                className="inline-flex px-4 py-2 text-xs font-semibold text-[#0066FF] bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayedProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => navigateTo('detail', product.id)}
                  className="group bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs hover:shadow-md hover:border-blue-200 transition-all duration-200 cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Image */}
                    <div className="relative w-full aspect-square rounded-xl bg-[#F4F5F7] overflow-hidden flex items-center justify-center p-3 group-hover:bg-[#EDEFF2] transition-colors">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Metadata */}
                    <div>
                      <h3 className="text-base font-semibold text-slate-800 line-clamp-1 group-hover:text-[#0066FF] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm font-bold text-[#0066FF] mt-1 tabular-nums">
                        {product.formattedPrice}
                      </p>
                    </div>
                  </div>

                  {/* Buy Button */}
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
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <button
                onClick={() => setCurrentPageNum((p) => Math.max(1, p - 1))}
                disabled={currentPageNum === 1}
                className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                aria-label="Halaman sebelumnya"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                const isActive = pageNum === currentPageNum;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPageNum(pageNum)}
                    className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[#0066FF] text-white shadow-xs'
                        : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => setCurrentPageNum((p) => Math.min(totalPages, p + 1))}
                disabled={currentPageNum === totalPages}
                className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                aria-label="Halaman berikutnya"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
