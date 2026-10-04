import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Package,
  Calendar,
  MapPin,
  CreditCard,
  Truck,
  CheckCircle,
  Clock,
} from 'lucide-react';

export const OrderDetailModal: React.FC = () => {
  const {
    isOrderDetailModalOpen,
    setIsOrderDetailModalOpen,
    selectedOrder,
  } = useApp();

  if (!isOrderDetailModalOpen || !selectedOrder) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={() => setIsOrderDetailModalOpen(false)}
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
      />

      {/* Modal */}
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-[#0066FF]" />
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Detail Pesanan
              </h2>
              <p className="text-[11px] text-slate-400 font-mono">
                {selectedOrder.orderNumber}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOrderDetailModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-xs">
          {/* Status & Date Bar */}
          <div className="flex items-center justify-between p-3.5 bg-blue-50/50 rounded-2xl border border-blue-100">
            <div className="space-y-0.5">
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Tanggal Transaksi
              </span>
              <span className="font-semibold text-slate-800">
                {selectedOrder.date}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-slate-500 block">Status Saat Ini</span>
              <span className="inline-block mt-0.5 px-3 py-0.5 rounded-full font-bold bg-[#0066FF] text-white">
                {selectedOrder.status}
              </span>
            </div>
          </div>

          {/* Delivery & Tracking */}
          <div className="space-y-2 border border-slate-200/80 rounded-2xl p-4 bg-slate-50/40">
            <div className="flex items-center gap-2 font-bold text-slate-800">
              <Truck className="w-4 h-4 text-[#0066FF]" />
              <span>Informasi Pengiriman</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-slate-600 pt-1">
              <div>
                <span className="text-slate-400 block text-[11px]">Kurir</span>
                <span className="font-semibold text-slate-800">
                  {selectedOrder.courier || 'Campus Delivery Express'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">No. Resi</span>
                <span className="font-semibold font-mono text-slate-800">
                  {selectedOrder.trackingNumber || 'TRK-88291029'}
                </span>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-200/60">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#0066FF] shrink-0 mt-0.5" />
                <p className="text-slate-600 leading-relaxed">
                  {selectedOrder.shippingAddress}
                </p>
              </div>
            </div>
          </div>

          {/* Product Items */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Daftar Barang
            </h3>
            <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden">
              {selectedOrder.items.map((item, idx) => (
                <div key={idx} className="p-3.5 flex items-center justify-between bg-white">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 p-1 border border-slate-200/60 flex items-center justify-center shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain mix-blend-multiply"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{item.name}</p>
                      <p className="text-slate-400 text-[11px]">
                        {item.quantity} x Rp {item.price.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-slate-900 tabular-nums">
                    Rp {item.subtotal.toLocaleString('id-ID')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment & Total breakdown */}
          <div className="border-t border-slate-100 pt-4 space-y-2">
            <div className="flex justify-between text-slate-500">
              <span>Metode Pembayaran</span>
              <span className="font-semibold text-slate-800">
                {selectedOrder.paymentMethod}
              </span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Ongkos Kirim</span>
              <span className="font-semibold text-emerald-600">Gratis</span>
            </div>
            <div className="border-t border-slate-100 pt-2 flex justify-between text-sm font-extrabold text-slate-900">
              <span>Total Pembayaran</span>
              <span className="text-[#0066FF] tabular-nums">
                Rp {selectedOrder.totalAmount.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={() => setIsOrderDetailModalOpen(false)}
            className="px-5 py-2 text-xs font-semibold text-white bg-[#0066FF] hover:bg-blue-700 rounded-xl transition-colors shadow-xs"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
