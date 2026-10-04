/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { ProductsPage } from './components/ProductsPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { OrderPage } from './components/OrderPage';
import { ProfilePage } from './components/ProfilePage';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AuthModal } from './components/AuthModal';
import { OrderDetailModal } from './components/OrderDetailModal';
import { EditProfileModal } from './components/EditProfileModal';
import { ToastContainer } from './components/ToastContainer';

const MainContent: React.FC = () => {
  const { currentPage } = useApp();

  return (
    <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6">
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'products' && <ProductsPage />}
      {currentPage === 'detail' && <ProductDetailPage />}
      {currentPage === 'order' && <OrderPage />}
      {currentPage === 'profile' && <ProfilePage />}
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800 font-['Plus_Jakarta_Sans',sans-serif]">
        <Navbar />
        <MainContent />
        <Footer />

        {/* Drawers and Modals */}
        <CartDrawer />
        <CheckoutModal />
        <AuthModal />
        <OrderDetailModal />
        <EditProfileModal />
        <ToastContainer />
      </div>
    </AppProvider>
  );
}
