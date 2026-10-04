import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  MapPin,
  Truck,
  CreditCard,
  CheckCircle2,
  ShieldCheck,
  ShoppingBag,
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    cart,
    cartTotal,
    user,
    createOrder,
    setIsEditProfileModalOpen,
  } = useApp();

  const [selectedCourier, setSelectedCourier] = useState('Reguler Kampus (1-2 Hari) - Gratis');
  const [courierFee, setCourierFee] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState('Transfer Bank Mandiri');
  const [orderNotes, setOrderNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutModalOpen) return null;

  const defaultAddress =
    user?.addresses.find((a) => a.isDefault) || user?.addresses[0];
  const shippingAddressString = defaultAddress
    ? `${defaultAddress.recipientName} (${defaultAddress.phone}) - ${defaultAddress.fullAddress}`
    : 'JL. Melati No. 10, Kec. Sukamaju, Kota Bandung, Jawa Barat 40123';

  const grandTotal = cartTotal + courierFee;

  const handleCourierChange = (title: string, fee: number) => {
    setSelectedCourier(title);
    setCourierFee(fee);
  };

  const handleConfirmOrder = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      createOrder({
        items: cart,
        shippingAddress: shippingAddressString,
        paymentMethod: selectedPayment,
        courier: selectedCourier,
        notes: orderNotes,
      });
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        onClick={() => !isSubmitting && setIsCheckoutModalOpen(false)}
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#0066FF]" />
            <h2 className="text-base font-bold text-slate-900">
              Konfirmasi Pemesanan
            </h2>
          </div>
          <button
            onClick={() => setIsCheckoutModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Shipping Address */}
          <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <MapPin className="w-4 h-4 text-[#0066FF]" />
                <span>Alamat Pengiriman Kampus / Kosan</span>
              </div>
              <button
                onClick={() => setIsEditProfileModalOpen(true)}
                className="text-xs font-semibold text-[#0066FF] hover:underline"
              >
                Ubah Alamat
              </button>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium pl-6">
              {shippingAddressString}
            </p>
          </div>

          {/* Items Summary list */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Produk Dipesan ({cart.length})
            </h3>
            <div className="space-y-2">
              {cart.map((it) => (
                <div
                  key={it.product.id}
                  className="flex items-center justify-between p-2.5 bg-slate-50/50 rounded-xl border border-slate-100 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={it.product.image}
                      alt={it.product.name}
                      className="w-10 h-10 object-contain rounded-lg bg-white p-1 border border-slate-200"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="font-semibold text-slate-800">
                        {it.product.name}
                      </p>
                      <p className="text-slate-400 text-[11px]">
                        {it.quantity} x Rp {it.product.price.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-slate-900 tabular-nums">
                    Rp {(it.product.price * it.quantity).toLocaleString('id-ID')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Method */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#0066FF]" />
              <span>Metode Pengiriman</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                {
                  id: 'reguler',
                  title: 'Reguler Kampus (1-2 Hari)',
                  subtitle: 'Kurir internal kampus / kosan',
                  fee: 0,
                  feeLabel: 'Gratis',
                },
                {
                  id: 'instant',
                  title: 'Instant Antar Kos (1-3 Jam)',
                  subtitle: 'Siap antar express ke kamar kos',
                  fee: 10000,
                  feeLabel: 'Rp 10.000',
                },
              ].map((c) => {
                const isSelected = selectedCourier.includes(c.title);
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleCourierChange(`${c.title}`, c.fee)}
                    className={`text-left p-3 rounded-xl border text-xs transition-all ${
                      isSelected
                        ? 'border-[#0066FF] bg-blue-50/30'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-800">{c.title}</span>
                      <span
                        className={`font-bold ${
                          c.fee === 0 ? 'text-emerald-600' : 'text-[#0066FF]'
                        }`}
                      >
                        {c.feeLabel}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {c.subtitle}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-[#0066FF]" />
              <span>Metode Pembayaran</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 'transfer', label: 'Transfer Bank Mandiri / BCA' },
                { id: 'qris', label: 'QRIS / GoPay / OVO' },
                { id: 'cod', label: 'COD (Bayar di Tempat)' },
              ].map((p) => {
                const isSelected = selectedPayment === p.label;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPayment(p.label)}
                    className={`text-left p-3 rounded-xl border text-xs font-semibold transition-all ${
                      isSelected
                        ? 'border-[#0066FF] bg-blue-50/30 text-[#0066FF]'
                        : 'border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Order Notes */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Catatan untuk Penjual / Kurir (Opsional)
            </label>
            <input
              type="text"
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
              placeholder="Contoh: Titip di meja resepsionis kos / kabari lewat WhatsApp"
              className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0066FF]"
            />
          </div>

          {/* Price Breakdown */}
          <div className="border-t border-slate-100 pt-4 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal Produk</span>
              <span className="font-semibold text-slate-800 tabular-nums">
                Rp {cartTotal.toLocaleString('id-ID')}
              </span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Biaya Pengiriman</span>
              <span className="font-semibold text-slate-800 tabular-nums">
                {courierFee === 0 ? 'Gratis' : `Rp ${courierFee.toLocaleString('id-ID')}`}
              </span>
            </div>
            <div className="border-t border-slate-100 pt-2 flex justify-between text-base font-extrabold text-slate-900">
              <span>Total Pembayaran</span>
              <span className="text-[#0066FF] tabular-nums">
                Rp {grandTotal.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Transaksi aman & terverifikasi oleh Campus Mart</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setIsCheckoutModalOpen(false)}
              className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Batal
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleConfirmOrder}
              className="flex-1 sm:flex-none px-6 py-2.5 text-xs font-semibold text-white bg-[#0066FF] hover:bg-blue-700 active:scale-[0.98] rounded-xl shadow-md shadow-blue-500/20 transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Memproses Pesanan...' : 'Konfirmasi & Buat Pesanan'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
