'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/context/store-context';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';

export function CartDrawer() {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateCartQuantity,
    removeFromCart,
    cartCount,
    cartSubtotal,
    deliveryFee,
    totalPayable,
  } = useStore();

  if (!isCartDrawerOpen) return null;

  const freeDeliveryThreshold = 499;
  const progressPercent = Math.min(100, (cartSubtotal / freeDeliveryThreshold) * 100);
  const remainingForFree = Math.max(0, freeDeliveryThreshold - cartSubtotal);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="flex h-full w-full max-w-md flex-col bg-white shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E0E0E0] px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-[#6FC341]" />
            <h2 className="text-base font-semibold text-[#212121]">
              Shopping Bag ({cartCount} {cartCount === 1 ? 'item' : 'items'})
            </h2>
          </div>
          <button
            onClick={() => setIsCartDrawerOpen(false)}
            className="rounded-full p-1.5 text-[#757575] hover:bg-[#F8F8F8] hover:text-[#212121]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="border-b border-[#F5F5F5] bg-[#F8F8F8] px-5 py-3 text-xs">
          {remainingForFree > 0 ? (
            <div>
              <p className="text-[#484848] mb-1.5 font-medium">
                Add <span className="font-semibold text-[#FF7043]">₹{remainingForFree}</span> more to unlock <span className="text-[#208833] font-semibold">FREE Delivery</span>!
              </p>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#E0E0E0]">
                <div
                  className="h-full bg-[#6FC341] transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          ) : (
            <p className="text-[#208833] font-semibold flex items-center gap-1.5">
              <span>🎉 Congratulations! You have unlocked FREE Delivery!</span>
            </p>
          )}
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto px-5 py-3 divide-y divide-[#F5F5F5]">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center py-12">
              <div className="mb-3 rounded-full bg-[#F8F8F8] p-5 text-[#9E9E9E]">
                <ShoppingBag className="h-10 w-10 text-[#BDBDBD]" />
              </div>
              <h3 className="text-base font-medium text-[#212121]">Your bag is empty</h3>
              <p className="mt-1 text-xs text-[#757575] max-w-xs">
                Explore our pure cotton collections for girls, boys, and newborns.
              </p>
              <button
                onClick={() => setIsCartDrawerOpen(false)}
                className="mt-5 rounded-xs bg-[#6FC341] px-5 py-2 text-xs font-medium text-white hover:bg-[#5bb32f]"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={`${item.product.id}-${item.selectedSize}`} className="py-3 flex gap-3.5">
                <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-xs border border-[#E0E0E0] bg-white">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <Link
                        href={`/product/${item.product.slug}`}
                        onClick={() => setIsCartDrawerOpen(false)}
                        className="text-xs font-medium text-[#363636] hover:text-[#146AFF] line-clamp-1"
                      >
                        {item.product.name}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                        className="text-[#9E9E9E] hover:text-[#FC3B3B] p-0.5"
                        title="Remove"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-[11px] text-[#757575]">
                      <span className="rounded-xs bg-[#F8F8F8] px-1.5 py-0.5 border border-[#E0E0E0]">
                        Size: <strong className="text-[#363636]">{item.selectedSize}</strong>
                      </span>
                      {item.selectedColor && (
                        <span>• {item.selectedColor}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    {/* Quantity Selector */}
                    <div className="flex items-center rounded-xs border border-[#D4D4D4] bg-white">
                      <button
                        onClick={() =>
                          updateCartQuantity(item.product.id, item.selectedSize, item.quantity - 1)
                        }
                        className="px-2 py-0.5 text-xs text-[#575757] hover:bg-[#F8F8F8]"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-semibold text-[#212121]">
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

                    {/* Price */}
                    <div className="text-right">
                      <span className="text-xs font-bold text-[#212121]">
                        ₹{item.product.price * item.quantity}
                      </span>
                      {item.product.originalPrice > item.product.price && (
                        <span className="ml-1.5 text-[11px] text-[#959595] line-through">
                          ₹{item.product.originalPrice * item.quantity}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Checkout CTA */}
        {cart.length > 0 && (
          <div className="border-t border-[#E0E0E0] bg-[#FFFFFF] p-5 shadow-inner">
            <div className="space-y-1.5 text-xs text-[#575757] mb-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-[#212121]">₹{cartSubtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>
                  {deliveryFee === 0 ? (
                    <span className="text-[#208833] font-semibold">FREE</span>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between border-t border-[#F5F5F5] pt-2 text-sm font-bold text-[#212121]">
                <span>Total Amount</span>
                <span>₹{totalPayable}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Link
                href="/checkout"
                onClick={() => setIsCartDrawerOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xs bg-[#6FC341] py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs hover:bg-[#5bb32f] transition-colors"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/cart"
                onClick={() => setIsCartDrawerOpen(false)}
                className="flex items-center justify-center rounded-xs border border-[#D4D4D4] py-2 text-xs font-medium text-[#575757] hover:bg-[#F8F8F8]"
              >
                View Full Bag & Apply Coupons
              </Link>
            </div>

            <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-[#757575]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#208833]" />
              <span>100% Cotton Guarantee • 7 Days Easy Returns</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

