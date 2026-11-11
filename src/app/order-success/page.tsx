'use client';

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  CheckCircle2,
  ArrowRight,
  Download,
} from 'lucide-react';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'PUM-849201';
  const [orderAmount] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('last_order_amount');
      return saved ? `₹${saved}` : '₹1,198';
    }
    return '₹1,198';
  });

  return (
    <div className="w-full bg-[#FAFAFA] py-12">
      <div className="mx-auto max-w-[800px] px-4">
        {/* Main Card */}
        <div className="rounded-md border border-[#DADADA] bg-white p-6 sm:p-10 shadow-xs text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F5E9] text-[#208833]">
            <CheckCircle2 className="h-10 w-10" />
          </div>

          <span className="rounded-xs bg-[#E8F5E9] px-2.5 py-0.5 text-xs font-bold text-[#2E7D32]">
            Order Successfully Placed
          </span>

          <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#212121]">
            Thank You for Shopping Pumkin Cotton!
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-[#575757] max-w-md mx-auto">
            We have received your order. A confirmation SMS with live courier tracking details has been sent to your mobile.
          </p>

          {/* Details Box */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 rounded-xs border border-[#E0E0E0] bg-[#F8F8F8] p-4 text-xs text-left">
            <div>
              <span className="text-[#757575] block">Order Number</span>
              <strong className="text-sm font-bold text-[#212121] font-mono">{orderId}</strong>
            </div>
            <div>
              <span className="text-[#757575] block">Estimated Delivery</span>
              <strong className="text-sm font-bold text-[#208833]">Within 2-3 Days</strong>
            </div>
            <div>
              <span className="text-[#757575] block">Total Amount Paid</span>
              <strong className="text-sm font-bold text-[#212121]">{orderAmount}</strong>
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-8 border-t border-[#F5F5F5] pt-6 text-left">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#363636] mb-4">
              Order Fulfillment Journey
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="rounded-xs border border-[#C8E6C9] bg-[#F1F8E9] p-3">
                <span className="text-[10px] font-bold text-[#2E7D32] block">STEP 1</span>
                <p className="font-semibold text-[#212121]">Order Placed</p>
                <p className="text-[11px] text-[#757575]">Verified &amp; confirmed</p>
              </div>

              <div className="rounded-xs border border-[#E0E0E0] bg-white p-3">
                <span className="text-[10px] font-bold text-[#757575] block">STEP 2</span>
                <p className="font-semibold text-[#212121]">Cotton Quality Check</p>
                <p className="text-[11px] text-[#757575]">Sanitised &amp; hand-packed</p>
              </div>

              <div className="rounded-xs border border-[#E0E0E0] bg-white p-3">
                <span className="text-[10px] font-bold text-[#757575] block">STEP 3</span>
                <p className="font-semibold text-[#212121]">Dispatched</p>
                <p className="text-[11px] text-[#757575]">Air Express Courier</p>
              </div>

              <div className="rounded-xs border border-[#E0E0E0] bg-white p-3">
                <span className="text-[10px] font-bold text-[#757575] block">STEP 4</span>
                <p className="font-semibold text-[#212121]">Doorstep Delivery</p>
                <p className="text-[11px] text-[#757575]">Delivered to little one</p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/shop"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xs bg-[#6FC341] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#5bb32f] transition-colors"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              onClick={() => alert(`Downloading Invoice for ${orderId}...`)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xs border border-[#DADADA] bg-white px-5 py-2.5 text-xs font-semibold text-[#363636] hover:bg-[#F8F8F8]"
            >
              <Download className="h-4 w-4" />
              <span>Download Invoice</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-64 w-full items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#6FC341] border-t-transparent" />
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
