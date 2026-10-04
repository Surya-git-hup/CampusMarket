import React from 'react';
import { useApp } from '../context/AppContext';
import { Order, OrderStatus } from '../types';
import { Package, Eye, ShoppingBag, Clock } from 'lucide-react';

export const OrderPage: React.FC = () => {
  const { orders, viewOrderDetail, navigateTo } = useApp();

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Dikirim':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
            Dikirim
          </span>
        );
      case 'Diproses':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
            Diproses
          </span>
        );
      case 'Selesai':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-[#0066FF]">
            Selesai
          </span>
        );
      case 'Dibatalkan':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800">
            Dibatalkan
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
            {status}
          </span>
        );
    }
  };

  const totalSpent = orders.reduce((sum, ord) => sum + ord.totalAmount, 0);

  return (
    <div className="space-y-8 pb-16 pt-2">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Pesanan Saya
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Pantau status pengiriman dan riwayat transaksi belanja kampus Anda
        </p>
      </div>

      {/* Orders Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Package className="w-12 h-12 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold text-slate-700">
              Belum ada pesanan
            </p>
            <p className="text-xs text-slate-500">
              Mulai belanja kebutuhan kuliah Anda sekarang!
            </p>
            <button
              onClick={() => navigateTo('products')}
              className="mt-2 inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#0066FF] hover:bg-blue-700 rounded-xl transition-colors shadow-xs"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Mulai Belanja</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                  <th className="py-4 px-6 text-center w-16">No</th>
                  <th className="py-4 px-6">Tanggal</th>
                  <th className="py-4 px-6">Produk</th>
                  <th className="py-4 px-6 text-center">Jumlah</th>
                  <th className="py-4 px-6">Total</th>
                  <th className="py-4 px-6 text-center">Status</th>
                  <th className="py-4 px-6 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {orders.map((order: Order, index: number) => {
                  const firstItem = order.items[0];
                  const additionalCount = order.items.length - 1;

                  return (
                    <tr
                      key={order.id}
                      className="hover:bg-slate-50/60 transition-colors"
                    >
                      {/* No */}
                      <td className="py-4 px-6 text-center font-medium text-slate-500 tabular-nums">
                        {index + 1}
                      </td>

                      {/* Tanggal */}
                      <td className="py-4 px-6 font-medium text-slate-700 whitespace-nowrap">
                        {order.date}
                      </td>

                      {/* Produk */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-[#F4F5F7] p-1.5 flex items-center justify-center shrink-0 border border-slate-100">
                            {firstItem?.image ? (
                              <img
                                src={firstItem.image}
                                alt={firstItem.name}
                                className="w-full h-full object-contain mix-blend-multiply"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <Package className="w-5 h-5 text-slate-400" />
                            )}
                          </div>
                          <div>
                            <span className="font-semibold text-slate-800 line-clamp-1">
                              {firstItem?.name || 'Produk Kampus'}
                            </span>
                            {additionalCount > 0 && (
                              <span className="text-[11px] text-slate-400 block">
                                +{additionalCount} produk lainnya
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Jumlah */}
                      <td className="py-4 px-6 text-center font-semibold text-slate-700 tabular-nums">
                        {order.itemCount}
                      </td>

                      {/* Total */}
                      <td className="py-4 px-6 font-bold text-slate-900 tabular-nums whitespace-nowrap">
                        Rp {order.totalAmount.toLocaleString('id-ID')}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6 text-center whitespace-nowrap">
                        {getStatusBadge(order.status)}
                      </td>

                      {/* Aksi */}
                      <td className="py-4 px-6 text-center whitespace-nowrap">
                        <button
                          onClick={() => viewOrderDetail(order)}
                          className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-[#0066FF] hover:bg-blue-700 rounded-lg transition-colors shadow-2xs"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Lihat</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Bottom Summary Box matching mockup */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          {/* Box 3D Icon */}
          <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0066FF] shrink-0">
            <Package className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Total Pesanan</p>
            <p className="text-xl sm:text-2xl font-extrabold text-slate-900 tabular-nums">
              Rp {totalSpent.toLocaleString('id-ID')}
            </p>
            <p className="text-xs text-slate-400">
              {orders.length} pesanan terdaftar
            </p>
          </div>
        </div>

        <button
          onClick={() => navigateTo('products')}
          className="w-full sm:w-auto px-6 py-3 text-xs font-semibold text-white bg-[#0066FF] hover:bg-blue-700 active:scale-[0.98] rounded-xl transition-all shadow-sm shadow-blue-500/20 text-center"
        >
          Lihat Semua Produk
        </button>
      </div>
    </div>
  );
};
