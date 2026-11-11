'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product, CartItem, WishlistItem, Coupon } from '@/types';
import { AVAILABLE_COUPONS } from '@/data/products';

interface LocationInfo {
  pincode: string;
  city: string;
  state: string;
  deliveryDays: string;
}

interface StoreContextType {
  cart: CartItem[];
  wishlist: WishlistItem[];
  addToCart: (product: Product, size: string, color?: string, quantity?: number) => void;
  updateCartQuantity: (productId: string, size: string, quantity: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => boolean;
  isInWishlist: (productId: string) => boolean;
  
  // Location
  location: LocationInfo;
  setLocation: (loc: LocationInfo) => void;
  isLocationModalOpen: boolean;
  setIsLocationModalOpen: (open: boolean) => void;

  // Coupon
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Drawers & Modals
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Computed Totals
  cartCount: number;
  cartSubtotal: number;
  cartOriginalTotal: number;
  cartDiscount: number;
  couponDiscount: number;
  deliveryFee: number;
  totalPayable: number;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const DEFAULT_LOCATION: LocationInfo = {
  pincode: '400001',
  city: 'Mumbai',
  state: 'Maharashtra',
  deliveryDays: '2-3 Business Days',
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('pumkin_cart');
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('pumkin_wishlist');
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  const [location, setLocationState] = useState<LocationInfo>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('pumkin_location');
        return saved ? JSON.parse(saved) : DEFAULT_LOCATION;
      } catch {
        return DEFAULT_LOCATION;
      }
    }
    return DEFAULT_LOCATION;
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('pumkin_coupon');
        return saved ? JSON.parse(saved) : null;
      } catch {
        return null;
      }
    }
    return null;
  });

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('pumkin_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('pumkin_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const setLocation = (loc: LocationInfo) => {
    setLocationState(loc);
    try {
      localStorage.setItem('pumkin_location', JSON.stringify(loc));
    } catch (e) {
      console.error(e);
    }
    showToast(`Delivery location updated to ${loc.city} (${loc.pincode})`);
  };

  const addToCart = (product: Product, size: string, color?: string, quantity: number = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            product,
            selectedSize: size,
            selectedColor: color || product.colors[0]?.name,
            quantity,
          },
        ];
      }
    });

    showToast(`Added "${product.name.slice(0, 30)}..." (${size}) to bag!`);
  };

  const updateCartQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId && item.selectedSize === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.product.id === productId && item.selectedSize === size)
      )
    );
    showToast('Item removed from your bag');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    try {
      localStorage.removeItem('pumkin_cart');
      localStorage.removeItem('pumkin_coupon');
    } catch (e) {
      console.error(e);
    }
  };

  const toggleWishlist = (product: Product): boolean => {
    const exists = wishlist.some((item) => item.product.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.product.id !== product.id));
      showToast('Removed from your Wishlist');
      return false;
    } else {
      setWishlist((prev) => [
        ...prev,
        { product, addedAt: 'recently' },
      ]);
      showToast('Saved to your Wishlist ❤️');
      return true;
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.product.id === productId);
  };

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = AVAILABLE_COUPONS.find((c) => c.code === cleanCode);

    if (!found) {
      return { success: false, message: 'Invalid coupon code. Try FIRSTPUMPKIN or COTTON10' };
    }

    if (cartSubtotal < found.minOrderValue) {
      return {
        success: false,
        message: `Min order value of ₹${found.minOrderValue} required for this coupon`,
      };
    }

    setAppliedCoupon(found);
    try {
      localStorage.setItem('pumkin_coupon', JSON.stringify(found));
    } catch (e) {
      console.error(e);
    }
    showToast(`Coupon ${found.code} applied successfully!`);
    return { success: true, message: `Coupon ${found.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    try {
      localStorage.removeItem('pumkin_coupon');
    } catch (e) {
      console.error(e);
    }
    showToast('Coupon removed');
  };

  // Calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartSubtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const cartOriginalTotal = cart.reduce(
    (total, item) => total + item.product.originalPrice * item.quantity,
    0
  );

  const cartDiscount = cartOriginalTotal - cartSubtotal;

  let couponDiscount = 0;
  if (appliedCoupon && cartSubtotal >= appliedCoupon.minOrderValue) {
    if (appliedCoupon.discountType === 'percentage') {
      couponDiscount = Math.round((cartSubtotal * appliedCoupon.discountValue) / 100);
    } else {
      couponDiscount = appliedCoupon.discountValue;
    }
  }

  // Free shipping above ₹499
  const deliveryFee = cartSubtotal > 499 || cartSubtotal === 0 ? 0 : 49;
  const totalPayable = Math.max(0, cartSubtotal - couponDiscount + deliveryFee);

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isInWishlist,
        location,
        setLocation,
        isLocationModalOpen,
        setIsLocationModalOpen,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        quickViewProduct,
        setQuickViewProduct,
        cartCount,
        cartSubtotal,
        cartOriginalTotal,
        cartDiscount,
        couponDiscount,
        deliveryFee,
        totalPayable,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
