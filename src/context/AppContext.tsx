import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, UserProfile, UserAddress } from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_USER } from '../data/products';

export type AppPage = 'home' | 'products' | 'detail' | 'order' | 'profile';

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  // Navigation & view
  currentPage: AppPage;
  navigateTo: (page: AppPage, productId?: string) => void;
  selectedProductId: string;
  selectedProduct: Product | undefined;

  // Products & Filtering
  products: Product[];
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Cart
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;

  // Orders
  orders: Order[];
  selectedOrder: Order | null;
  setSelectedOrder: (order: Order | null) => void;
  isOrderDetailModalOpen: boolean;
  setIsOrderDetailModalOpen: (open: boolean) => void;
  viewOrderDetail: (order: Order) => void;
  createOrder: (orderData: {
    items: CartItem[];
    shippingAddress: string;
    paymentMethod: string;
    courier?: string;
    notes?: string;
  }) => Order;

  // Auth & Profile
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'register';
  setAuthModalMode: (mode: 'login' | 'register') => void;
  openAuthModal: (mode?: 'login' | 'register') => void;
  login: (email: string, pass: string) => boolean;
  register: (name: string, email: string, phone: string, pass: string) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  updateAddress: (updatedAddress: UserAddress) => void;
  addAddress: (address: Omit<UserAddress, 'id'>) => void;

  // Checkout modal
  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (open: boolean) => void;
  startCheckout: () => void;

  // Edit Profile modal
  isEditProfileModalOpen: boolean;
  setIsEditProfileModalOpen: (open: boolean) => void;

  // Toast
  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CART: 'campusmart_cart_v1',
  ORDERS: 'campusmart_orders_v1',
  USER: 'campusmart_user_v1',
  AUTH: 'campusmart_auth_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('prod-tas-ransel');
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderDetailModalOpen, setIsOrderDetailModalOpen] = useState(false);

  // User state
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AUTH);
      return saved !== null ? JSON.parse(saved) : true; // Default logged in for fast review
    } catch {
      return true;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      }
    } catch {
      // ignore
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(isAuthenticated));
    } catch {
      // ignore
    }
  }, [isAuthenticated]);

  const products = INITIAL_PRODUCTS;
  const selectedProduct = products.find((p) => p.id === selectedProductId) || products[0];

  const navigateTo = (page: AppPage, productId?: string) => {
    if (productId) {
      setSelectedProductId(productId);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    addToast(`${product.name} berhasil ditambahkan ke keranjang!`, 'success');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    addToast('Item dihapus dari keranjang', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const login = (email: string, _pass: string) => {
    const defaultUser: UserProfile = {
      id: 'usr-surya',
      name: email.split('@')[0] ? (email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)) : 'Surya Pratama',
      email: email || 'surya@example.com',
      phone: '0812 3456 7890',
      role: 'student',
      campus: 'Universitas Indonesia',
      addresses: INITIAL_USER.addresses,
    };
    setUser(defaultUser);
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
    addToast(`Selamat datang kembali, ${defaultUser.name}!`, 'success');
    return true;
  };

  const register = (name: string, email: string, phone: string, _pass: string) => {
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: name || 'Mahasiswa Baru',
      email: email || 'user@example.com',
      phone: phone || '0812 3456 7890',
      role: 'student',
      campus: 'Kampus Merdeka',
      addresses: [
        {
          id: `addr-${Date.now()}`,
          label: 'Alamat Kosan',
          recipientName: name || 'Mahasiswa Baru',
          phone: phone || '0812 3456 7890',
          fullAddress: 'JL. Kampus No. 12, Lingkar Kampus',
          city: 'Kota Pelajar',
          province: 'Jawa Barat',
          postalCode: '40123',
          isDefault: true,
        },
      ],
    };
    setUser(newUser);
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
    addToast(`Pendaftaran berhasil! Halo ${newUser.name}`, 'success');
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    addToast('Anda telah keluar akun.', 'info');
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    addToast('Profil berhasil diperbarui!', 'success');
  };

  const updateAddress = (updatedAddress: UserAddress) => {
    if (!user) return;
    const updatedList = user.addresses.map((addr) =>
      addr.id === updatedAddress.id ? updatedAddress : updatedAddress.isDefault ? { ...addr, isDefault: false } : addr
    );
    setUser({ ...user, addresses: updatedList });
    addToast('Alamat berhasil diperbarui!', 'success');
  };

  const addAddress = (newAddrData: Omit<UserAddress, 'id'>) => {
    if (!user) return;
    const newAddr: UserAddress = {
      ...newAddrData,
      id: `addr-${Date.now()}`,
    };
    let updatedList = [...user.addresses];
    if (newAddr.isDefault) {
      updatedList = updatedList.map((a) => ({ ...a, isDefault: false }));
    }
    updatedList.push(newAddr);
    setUser({ ...user, addresses: updatedList });
    addToast('Alamat baru berhasil ditambahkan!', 'success');
  };

  const startCheckout = () => {
    if (cart.length === 0) {
      addToast('Keranjang belanja Anda masih kosong!', 'error');
      return;
    }
    if (!isAuthenticated) {
      addToast('Silakan masuk terlebih dahulu untuk membuat pesanan.', 'info');
      openAuthModal('login');
      return;
    }
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
  };

  const createOrder = (orderData: {
    items: CartItem[];
    shippingAddress: string;
    paymentMethod: string;
    courier?: string;
    notes?: string;
  }) => {
    const now = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const dateFormatted = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
    const orderNum = `ORD-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;

    const orderItems = orderData.items.map((it) => ({
      productId: it.product.id,
      name: it.product.name,
      image: it.product.image,
      price: it.product.price,
      quantity: it.quantity,
      subtotal: it.product.price * it.quantity,
    }));

    const total = orderItems.reduce((acc, it) => acc + it.subtotal, 0);

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      date: dateFormatted,
      items: orderItems,
      itemCount: orderItems.reduce((acc, it) => acc + it.quantity, 0),
      totalAmount: total,
      status: 'Diproses',
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod,
      courier: orderData.courier || 'Campus Instant Courier',
      trackingNumber: `TRK-${Math.floor(10000000 + Math.random() * 90000000)}`,
      notes: orderData.notes,
      createdAt: now.toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setIsCheckoutModalOpen(false);
    addToast('Pesanan berhasil dibuat! Sedang diproses.', 'success');
    navigateTo('order');
    return newOrder;
  };

  const viewOrderDetail = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderDetailModalOpen(true);
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        navigateTo,
        selectedProductId,
        selectedProduct,
        products,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        cart,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        orders,
        selectedOrder,
        setSelectedOrder,
        isOrderDetailModalOpen,
        setIsOrderDetailModalOpen,
        viewOrderDetail,
        createOrder,
        user,
        isAuthenticated,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        openAuthModal,
        login,
        register,
        logout,
        updateProfile,
        updateAddress,
        addAddress,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        startCheckout,
        isEditProfileModalOpen,
        setIsEditProfileModalOpen,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
