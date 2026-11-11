'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/context/store-context';
import { AVAILABLE_COUPONS } from '@/data/products';
import {
  Trash2,
  Heart,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag,
  Check,
  Truck,
  Sparkles,
} from 'lucide-react';

export default function CartPage() {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    toggleWishlist,
    isInWishlist,
    cartCount,
    cartSubtotal,
    cartOriginalTotal,
    cartDiscount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    couponDiscount,
    deliveryFee,
    totalPayable,
    location,
    setIsLocationModalOpen,
  } = useStore();

  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ text: string; isError: boolean } | null>(
    null
  );

  const handleApplyCoupon = (e?: React.FormEvent, customCode?: string) => {
    if (e) e.preventDefault();
    const codeToUse = customCode || couponCodeInput;
    if (!codeToUse.trim()) return;

    const result = applyCoupon(codeToUse);
    setCouponMessage({ text: result.message, isError: !result.success });
    if (result.success) {
      setCouponCodeInput('');
    }
  };

  const freeDeliveryThreshold = 499;
  const remainingForFree = Math.max(0, freeDeliveryThreshold - cartSubtotal);

  if (cart.length === 0) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-[1012px] flex-col items-center justify-center px-4 py-16 text-center">
        <div className="mb-4 rounded-full bg-[#F8F8F8] p-6 border border-[#DADADA]">
          <ShoppingBag className="h-12 w-12 text-[#9E9E9E]" />
        </div>
        <h1 className="text-2xl font-bold text-[#212121]">Your Shopping Bag is Empty</h1>
        <p className="mt-2 text-xs sm:text-sm text-[#757575] max-w-sm">
          There are no outfits in your bag yet. Explore pure cotton frocks, rompers, and comfortable playwear for kids.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-flex items-center gap-2 rounded-xs bg-[#6FC341] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#5bb32f] transition-colors"
        >
          <span>Explore Cotton Catalogue</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#FAFAFA] py-8">
      <div className="mx-auto max-w-[1012px] px-4">
        {/* Page Heading & Delivery Pin Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#DADADA] pb-4 mb-6 gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#212121]">
              Shopping Bag ({cartCount} {cartCount === 1 ? 'Item' : 'Items'})
            </h1>
            <p className="text-xs text-[#757575] mt-0.5">
              100% Pure Combed Cotton Outfits for Little Ones
            </p>
          </div>

          {/* Delivery Pin Strip */}
          <div className="flex items-center gap-2 rounded-xs border border-[#DADADA] bg-white px-3 py-1.5 text-xs">
            <span className="text-[#575757]">Deliver to:</span>
            <strong className="text-[#212121]">{location.city} - {location.pincode}</strong>
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="text-[#146AFF] font-medium hover:underline ml-1"
            >
              Change
            </button>
          </div>
        </div>

        {/* Free Delivery Bar */}
        {remainingForFree > 0 ? (
          <div className="mb-6 rounded-md border border-[#FFE082] bg-[#FFF8E1] p-3 text-xs text-[#5D4037]">
            <p className="font-semibold text-[#D84315] flex items-center gap-1.5">
              <Truck className="h-4 w-4" />
              <span>
                Add ₹{remainingForFree} more pure cotton clothes to enjoy <strong>FREE Shipping</strong>!
              </span>
            </p>
          </div>
        ) : (
          <div className="mb-6 rounded-md border border-[#C8E6C9] bg-[#E8F5E9] p-3 text-xs text-[#2E7D32] flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#208833]" />
            <span className="font-semibold">Yay! Your order qualifies for FREE Delivery!</span>
          </div>
        )}

        {/* Two-Column Grid: Bag Items (60%) + Price Summary (40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Items in Bag (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-md border border-[#DADADA] bg-white divide-y divide-[#F5F5F5]">
              {cart.map((item) => {
                const wishlisted = isInWishlist(item.product.id);
                return (
                  <div
                    key={`${item.product.id}-${item.selectedSize}`}
                    className="p-4 flex gap-4 transition-colors hover:bg-[#FDFDFD]"
                  >
                    {/* Image */}
                    <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-xs border border-[#E0E0E0] bg-[#F8F8F8]">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[11px] font-semibold text-[#146AFF]">
                              {item.product.brand}
                            </span>
                            <Link
                              href={`/product/${item.product.slug}`}
                              className="block text-xs sm:text-sm font-semibold text-[#363636] hover:text-[#146AFF] line-clamp-1"
                            >
                              {item.product.name}
                            </Link>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                            className="text-[#9E9E9E] hover:text-[#FC3B3B] p-1"
                            title="Remove from bag"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="mt-1 flex items-center gap-3 text-xs text-[#757575]">
                          <span className="rounded-xs bg-[#F8F8F8] px-2 py-0.5 border border-[#E0E0E0]">
                            Size: <strong className="text-[#212121]">{item.selectedSize}</strong>
                          </span>
                          {item.selectedColor && (
                            <span>Color: <strong>{item.selectedColor}</strong></span>
                          )}
                        </div>

                        <div className="mt-2 flex items-baseline gap-2">
                          <span className="text-sm font-bold text-[#212121]">
                            ₹{item.product.price * item.quantity}
                          </span>
                          {item.product.originalPrice > item.product.price && (
                            <>
                              <span className="text-xs text-[#959595] line-through">
                                ₹{item.product.originalPrice * item.quantity}
                              </span>
                              <span className="text-[11px] font-bold text-[#DD5808]">
                                {item.product.discountPercent}% OFF
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Stepper & Move to Wishlist */}
                      <div className="mt-3 flex items-center justify-between border-t border-[#F5F5F5] pt-2.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-[#757575]">Qty:</span>
                          <div className="flex items-center rounded-xs border border-[#D4D4D4] bg-white">
                            <button
                              onClick={() =>
                                updateCartQuantity(item.product.id, item.selectedSize, item.quantity - 1)
                              }
                              className="px-2 py-0.5 text-xs text-[#575757] hover:bg-[#F8F8F8]"
                            >
                              -
                            </button>
                            <span className="px-3 text-xs font-bold text-[#212121]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateCartQuantity(item.product.id, item.selectedSize, item.quantity + 1)
                              }
                              className="px-2 py-0.5 text-xs text-[#575757] hover:bg-[#F8F8F8]"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            toggleWishlist(item.product);
                          }}
                          className={`flex items-center gap-1 text-xs transition-colors ${
                            wishlisted ? 'text-[#FC3B3B]' : 'text-[#757575] hover:text-[#FC3B3B]'
                          }`}
                        >
                          <Heart className={`h-3.5 w-3.5 ${wishlisted ? 'fill-[#FC3B3B]' : ''}`} />
                          <span>{wishlisted ? 'Saved in Wishlist' : 'Move to Wishlist'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cotton Guarantee Card */}
            <div className="rounded-md border border-[#E0E0E0] bg-white p-4 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F5E9] text-[#208833]">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-[#212121]">Pumkin 100% Pure Cotton Promise</p>
                <p className="text-[#757575] mt-0.5">
                  Every garment is made with combed cotton and azo-free safe dyes. If your child feels even slight irritation, return within 7 days for full refund.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Order Summary & Coupons (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Coupons Card */}
            <div className="rounded-md border border-[#DADADA] bg-white p-4">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#363636] mb-3">
                <Tag className="h-4 w-4 text-[#FF7043]" />
                <span>Apply Coupons & Promo Codes</span>
              </div>

              {appliedCoupon ? (
                <div className="flex items-center justify-between rounded-xs border border-[#C8E6C9] bg-[#E8F5E9] p-3 text-xs">
                  <div>
                    <p className="font-bold text-[#2E7D32] flex items-center gap-1">
                      <Check className="h-3.5 w-3.5" />
                      <span>{appliedCoupon.code} Applied</span>
                    </p>
                    <p className="text-[11px] text-[#558B2F]">
                      You saved ₹{couponDiscount} with this code!
                    </p>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs font-semibold text-[#FC3B3B] hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCodeInput}
                    onChange={(e) => setCouponCodeInput(e.target.value.toUpperCase())}
                    placeholder="Enter Coupon Code (e.g. FIRSTPUMPKIN)"
                    className="w-full rounded-xs border border-[#E0E0E0] px-3 py-2 text-xs uppercase text-[#363636] placeholder-[#959595] outline-none focus:border-[#146AFF]"
                  />
                  <button
                    type="submit"
                    className="rounded-xs bg-[#6FC341] px-4 py-2 text-xs font-bold uppercase text-white hover:bg-[#5bb32f] transition-colors shrink-0"
                  >
                    Apply
                  </button>
                </form>
              )}

              {couponMessage && (
                <p
                  className={`mt-2 text-xs font-medium ${
                    couponMessage.isError ? 'text-[#FC3B3B]' : 'text-[#208833]'
                  }`}
                >
                  {couponMessage.text}
                </p>
              )}

              {/* Clickable Quick Coupon suggestions */}
              <div className="mt-4 pt-3 border-t border-[#F5F5F5] space-y-2">
                <span className="text-[11px] font-semibold text-[#757575] block">
                  Available Offers for You:
                </span>
                {AVAILABLE_COUPONS.map((c) => (
                  <div
                    key={c.code}
                    onClick={() => handleApplyCoupon(undefined, c.code)}
                    className="flex items-center justify-between p-2 rounded-xs border border-dashed border-[#DADADA] bg-[#FAF8F5] cursor-pointer hover:border-[#6FC341] transition-all"
                  >
                    <div>
                      <span className="font-bold text-xs text-[#212121]">{c.code}</span>
                      <p className="text-[11px] text-[#757575]">{c.description}</p>
                    </div>
                    <span className="text-[11px] font-bold text-[#6FC341]">APPLY</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Details Card */}
            <div className="rounded-md border border-[#DADADA] bg-white p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#363636] mb-4 pb-2 border-b border-[#F5F5F5]">
                Price Details ({cartCount} {cartCount === 1 ? 'Item' : 'Items'})
              </h3>

              <div className="space-y-2.5 text-xs text-[#575757]">
                <div className="flex justify-between">
                  <span>Total MRP</span>
                  <span>₹{cartOriginalTotal}</span>
                </div>

                <div className="flex justify-between text-[#208833]">
                  <span>Product Discount</span>
                  <span>- ₹{cartDiscount}</span>
                </div>

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-[#208833]">
                    <span>Coupon Savings ({appliedCoupon?.code})</span>
                    <span>- ₹{couponDiscount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <span className="text-[#208833] font-semibold">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>

                <div className="border-t border-[#DADADA] pt-3 flex justify-between text-base font-bold text-[#212121]">
                  <span>Total Amount Payable</span>
                  <span>₹{totalPayable}</span>
                </div>
              </div>

              <div className="mt-3 rounded-xs bg-[#E8F5E9] p-2 text-center text-xs font-semibold text-[#2E7D32]">
                You are saving ₹{cartDiscount + couponDiscount} on this pure cotton order!
              </div>

              <Link
                href="/checkout"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xs bg-[#6FC341] py-3 text-xs font-bold uppercase tracking-wider text-white shadow-xs hover:bg-[#5bb32f] transition-colors"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
