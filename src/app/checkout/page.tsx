'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@/context/store-context';
import {
  ShieldCheck,
  CreditCard,
  Wallet,
  Banknote,
  ArrowRight,
  Lock,
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cart,
    clearCart,
    cartCount,
    cartOriginalTotal,
    cartDiscount,
    couponDiscount,
    appliedCoupon,
    deliveryFee,
    totalPayable,
    location,
    showToast,
  } = useStore();

  // Form State
  const [formData, setFormData] = useState({
    fullName: 'Priya Sharma',
    mobile: '9876543210',
    pincode: location.pincode,
    houseNo: 'Flat 402, Sunshine Heights',
    street: 'Bandra West, Linking Road',
    landmark: 'Near National College',
    city: location.city,
    state: location.state,
    addressType: 'home',
  });

  const [deliverySpeed, setDeliverySpeed] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('priyasharma@oksbi');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const finalDeliveryFee = deliverySpeed === 'express' ? deliveryFee + 99 : deliveryFee;
  const finalTotal = Math.max(0, totalPayable + (deliverySpeed === 'express' ? 99 : 0));

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.mobile || !formData.houseNo || !formData.pincode) {
      showToast('Please complete all required shipping fields');
      return;
    }

    setIsSubmitting(true);
    // Simulate order placement
    setTimeout(() => {
      const orderId = `PUM-${Math.floor(100000 + Math.random() * 900000)}`;
      localStorage.setItem('last_order_id', orderId);
      localStorage.setItem('last_order_amount', String(finalTotal));
      clearCart();
      router.push(`/order-success?orderId=${orderId}`);
    }, 1200);
  };

  if (cart.length === 0) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-[1012px] flex-col items-center justify-center px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-[#212121]">No items in checkout</h2>
        <p className="mt-2 text-xs text-[#757575]">Your bag is currently empty.</p>
        <Link
          href="/shop"
          className="mt-4 rounded-xs bg-[#6FC341] px-6 py-2 text-xs font-bold uppercase text-white"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#FAFAFA] py-8">
      <div className="mx-auto max-w-[1012px] px-4">
        {/* Checkout Header */}
        <div className="flex items-center justify-between border-b border-[#DADADA] pb-4 mb-6">
          <div>
            <h1 className="text-xl font-bold text-[#212121]">Express Secure Checkout</h1>
            <p className="text-xs text-[#757575]">Order reference: 100% Pure Combed Cotton Outfits</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#208833] font-semibold">
            <Lock className="h-4 w-4" />
            <span>256-Bit SSL Encrypted</span>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT: Steps 1, 2, 3 (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* STEP 1: Shipping Address */}
              <div className="rounded-md border border-[#DADADA] bg-white p-5">
                <div className="flex items-center justify-between mb-4 border-b border-[#F5F5F5] pb-2.5">
                  <h3 className="text-sm font-bold text-[#212121] flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#363636] text-[11px] text-white">
                      1
                    </span>
                    <span>Shipping Address</span>
                  </h3>
                  <span className="text-[11px] text-[#757575]">* All fields required</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="font-semibold text-[#484848] block mb-1">Parent Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full rounded-xs border border-[#E0E0E0] px-3 py-2 text-xs outline-none focus:border-[#146AFF]"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#484848] block mb-1">Mobile (for Delivery SMS)</label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '') })}
                      className="w-full rounded-xs border border-[#E0E0E0] px-3 py-2 text-xs outline-none focus:border-[#146AFF]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-semibold text-[#484848] block mb-1">House / Flat / Block No.</label>
                    <input
                      type="text"
                      required
                      value={formData.houseNo}
                      onChange={(e) => setFormData({ ...formData, houseNo: e.target.value })}
                      className="w-full rounded-xs border border-[#E0E0E0] px-3 py-2 text-xs outline-none focus:border-[#146AFF]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-semibold text-[#484848] block mb-1">Street / Colony / Area</label>
                    <input
                      type="text"
                      required
                      value={formData.street}
                      onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                      className="w-full rounded-xs border border-[#E0E0E0] px-3 py-2 text-xs outline-none focus:border-[#146AFF]"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#484848] block mb-1">Landmark (Optional)</label>
                    <input
                      type="text"
                      value={formData.landmark}
                      onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                      className="w-full rounded-xs border border-[#E0E0E0] px-3 py-2 text-xs outline-none focus:border-[#146AFF]"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#484848] block mb-1">6-Digit PIN Code</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '') })}
                      className="w-full rounded-xs border border-[#E0E0E0] px-3 py-2 text-xs outline-none focus:border-[#146AFF]"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#484848] block mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full rounded-xs border border-[#E0E0E0] px-3 py-2 text-xs outline-none focus:border-[#146AFF]"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#484848] block mb-1">State</label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full rounded-xs border border-[#E0E0E0] px-3 py-2 text-xs outline-none focus:border-[#146AFF]"
                    />
                  </div>
                </div>

                {/* Address Type */}
                <div className="mt-4 pt-3 border-t border-[#F5F5F5] flex items-center gap-4 text-xs">
                  <span className="font-semibold text-[#484848]">Address Type:</span>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="addrType"
                      checked={formData.addressType === 'home'}
                      onChange={() => setFormData({ ...formData, addressType: 'home' })}
                      className="accent-[#6FC341]"
                    />
                    <span>Home (All Day Delivery)</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="addrType"
                      checked={formData.addressType === 'work'}
                      onChange={() => setFormData({ ...formData, addressType: 'work' })}
                      className="accent-[#6FC341]"
                    />
                    <span>Office / Work (10 AM - 6 PM)</span>
                  </label>
                </div>
              </div>

              {/* STEP 2: Delivery Speed */}
              <div className="rounded-md border border-[#DADADA] bg-white p-5">
                <h3 className="text-sm font-bold text-[#212121] flex items-center gap-2 mb-4 border-b border-[#F5F5F5] pb-2.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#363636] text-[11px] text-white">
                    2
                  </span>
                  <span>Delivery Speed</span>
                </h3>

                <div className="space-y-3">
                  <label
                    className={`flex items-start justify-between p-3.5 rounded-xs border cursor-pointer transition-all ${
                      deliverySpeed === 'standard'
                        ? 'border-[#6FC341] bg-[#F1F8E9]'
                        : 'border-[#E0E0E0] hover:bg-[#F8F8F8]'
                    }`}
                  >
                    <div className="flex gap-3">
                      <input
                        type="radio"
                        name="speed"
                        checked={deliverySpeed === 'standard'}
                        onChange={() => setDeliverySpeed('standard')}
                        className="accent-[#6FC341] mt-0.5"
                      />
                      <div>
                        <p className="text-xs font-bold text-[#212121]">Standard Delivery</p>
                        <p className="text-[11px] text-[#575757]">
                          Delivered in 2-3 business days via BlueDart / Delhivery
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#208833]">
                      {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                    </span>
                  </label>

                  <label
                    className={`flex items-start justify-between p-3.5 rounded-xs border cursor-pointer transition-all ${
                      deliverySpeed === 'express'
                        ? 'border-[#6FC341] bg-[#F1F8E9]'
                        : 'border-[#E0E0E0] hover:bg-[#F8F8F8]'
                    }`}
                  >
                    <div className="flex gap-3">
                      <input
                        type="radio"
                        name="speed"
                        checked={deliverySpeed === 'express'}
                        onChange={() => setDeliverySpeed('express')}
                        className="accent-[#6FC341] mt-0.5"
                      />
                      <div>
                        <p className="text-xs font-bold text-[#212121]">Express Priority Dispatch</p>
                        <p className="text-[11px] text-[#575757]">
                          Dispatched within 4 hours. Delivered next day across metro cities.
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#212121]">₹99</span>
                  </label>
                </div>
              </div>

              {/* STEP 3: Payment Method */}
              <div className="rounded-md border border-[#DADADA] bg-white p-5">
                <h3 className="text-sm font-bold text-[#212121] flex items-center gap-2 mb-4 border-b border-[#F5F5F5] pb-2.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#363636] text-[11px] text-white">
                    3
                  </span>
                  <span>Payment Method</span>
                </h3>

                <div className="space-y-3">
                  {/* UPI */}
                  <div
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3.5 rounded-xs border cursor-pointer transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-[#6FC341] bg-[#F1F8E9]'
                        : 'border-[#E0E0E0] hover:bg-[#F8F8F8]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Wallet className="h-4 w-4 text-[#208833]" />
                        <span className="text-xs font-bold text-[#212121]">UPI (Google Pay, PhonePe, Paytm)</span>
                      </div>
                      <span className="rounded-xs bg-[#E8F5E9] px-1.5 py-0.2 text-[10px] font-bold text-[#2E7D32]">
                        Instant 0% Fee
                      </span>
                    </div>

                    {paymentMethod === 'upi' && (
                      <div className="mt-3 pt-3 border-t border-[#C8E6C9] flex gap-2">
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="yourname@upi"
                          className="flex-1 rounded-xs border border-[#DADADA] bg-white px-3 py-1.5 text-xs text-[#212121] outline-none"
                        />
                        <span className="rounded-xs bg-[#208833] px-3 py-1.5 text-xs font-semibold text-white">
                          Verified
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Credit / Debit Card */}
                  <div
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3.5 rounded-xs border cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#6FC341] bg-[#F1F8E9]'
                        : 'border-[#E0E0E0] hover:bg-[#F8F8F8]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <CreditCard className="h-4 w-4 text-[#146AFF]" />
                      <span className="text-xs font-bold text-[#212121]">Credit / Debit Card (Visa, MasterCard, RuPay)</span>
                    </div>
                  </div>

                  {/* Cash on Delivery */}
                  <div
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3.5 rounded-xs border cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-[#6FC341] bg-[#F1F8E9]'
                        : 'border-[#E0E0E0] hover:bg-[#F8F8F8]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Banknote className="h-4 w-4 text-[#FF7043]" />
                        <span className="text-xs font-bold text-[#212121]">Cash on Delivery (Pay at Doorstep)</span>
                      </div>
                      <span className="text-[11px] text-[#208833] font-semibold">Available for your PIN</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Order Summary & Confirm (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-md border border-[#DADADA] bg-white p-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#363636] mb-4 pb-2 border-b border-[#F5F5F5]">
                  Order Items ({cartCount})
                </h3>

                <div className="max-h-48 overflow-y-auto space-y-3 pr-1 divide-y divide-[#F5F5F5]">
                  {cart.map((item) => (
                    <div key={`${item.product.id}-${item.selectedSize}`} className="pt-2 flex gap-3 text-xs">
                      <div className="relative h-14 w-12 shrink-0 overflow-hidden rounded-xs border border-[#E0E0E0]">
                        <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[#212121] truncate">{item.product.name}</p>
                        <p className="text-[11px] text-[#757575]">
                          Size: {item.selectedSize} • Qty: {item.quantity}
                        </p>
                        <p className="text-xs font-bold text-[#212121] mt-0.5">
                          ₹{item.product.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="mt-4 border-t border-[#DADADA] pt-3 space-y-2 text-xs text-[#575757]">
                  <div className="flex justify-between">
                    <span>MRP Total</span>
                    <span>₹{cartOriginalTotal}</span>
                  </div>
                  <div className="flex justify-between text-[#208833]">
                    <span>Product Savings</span>
                    <span>- ₹{cartDiscount}</span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-[#208833]">
                      <span>Coupon Savings ({appliedCoupon?.code})</span>
                      <span>- ₹{couponDiscount}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>{finalDeliveryFee === 0 ? 'FREE' : `₹${finalDeliveryFee}`}</span>
                  </div>
                  <div className="border-t border-[#DADADA] pt-2 flex justify-between text-base font-bold text-[#212121]">
                    <span>Total Amount Payable</span>
                    <span>₹{finalTotal}</span>
                  </div>
                </div>

                {/* Confirm & Place Order CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xs bg-[#6FC341] py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs hover:bg-[#5bb32f] transition-colors disabled:bg-[#9E9E9E]"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>Processing Order...</span>
                    </div>
                  ) : (
                    <>
                      <span>CONFIRM & PLACE ORDER (₹{finalTotal})</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>

                <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-[#757575]">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#208833]" />
                  <span>100% Cotton Guarantee • 7 Days Easy Return</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
