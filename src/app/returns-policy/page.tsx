import React from 'react';
import Link from 'next/link';
import { RotateCcw, ShieldCheck, CheckCircle2, ArrowRight, HelpCircle } from 'lucide-react';

export default function ReturnsPolicyPage() {
  return (
    <div className="w-full bg-white pb-16">
      {/* Header */}
      <div className="border-b border-[#DADADA] bg-gradient-to-r from-[#FFF8E7] via-[#F8F9FA] to-[#E8F5E9] py-10">
        <div className="mx-auto max-w-[1012px] px-4 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F5E9] text-[#208833]">
            <RotateCcw className="h-6 w-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#212121]">
            7-Day Easy Doorstep Returns &amp; Exchanges
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#575757] max-w-lg mx-auto">
            We want every little one to feel happy and completely comfortable. If sizing isn&apos;t right or you aren&apos;t 100% delighted, we will pick it up from your doorstep.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1012px] px-4 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="rounded-md border border-[#DADADA] p-5 text-center bg-[#FDFDFD]">
            <span className="flex h-10 w-10 mx-auto items-center justify-center rounded-full bg-[#E8F5E9] text-xs font-bold text-[#2E7D32] mb-3">
              1
            </span>
            <h3 className="text-sm font-bold text-[#212121] mb-1">Initiate in 1-Click</h3>
            <p className="text-xs text-[#575757]">
              Head to Track Order or WhatsApp our team with your Order ID. Choose Return for refund or Free Size Exchange.
            </p>
          </div>

          <div className="rounded-md border border-[#DADADA] p-5 text-center bg-[#FDFDFD]">
            <span className="flex h-10 w-10 mx-auto items-center justify-center rounded-full bg-[#E8F5E9] text-xs font-bold text-[#2E7D32] mb-3">
              2
            </span>
            <h3 className="text-sm font-bold text-[#212121] mb-1">Doorstep Pickup</h3>
            <p className="text-xs text-[#575757]">
              Our courier executive will arrive within 24-48 hours. No need to print return labels or find a box.
            </p>
          </div>

          <div className="rounded-md border border-[#DADADA] p-5 text-center bg-[#FDFDFD]">
            <span className="flex h-10 w-10 mx-auto items-center justify-center rounded-full bg-[#E8F5E9] text-xs font-bold text-[#2E7D32] mb-3">
              3
            </span>
            <h3 className="text-sm font-bold text-[#212121] mb-1">Instant Refund / Swap</h3>
            <p className="text-xs text-[#575757]">
              Refund is credited directly back to your original payment method or UPI ID within 2-4 hours of pickup.
            </p>
          </div>
        </div>

        {/* Detailed Guidelines */}
        <div className="rounded-md border border-[#DADADA] bg-white p-6 space-y-6 text-xs text-[#575757] leading-relaxed">
          <div>
            <h4 className="text-sm font-bold text-[#212121] mb-2 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#208833]" />
              <span>What items are eligible for Return or Exchange?</span>
            </h4>
            <p>
              All pure cotton frocks, t-shirts, shirts, shorts, sets, and sleepsuits can be returned or exchanged within 7 days of delivery, provided the garment is unused, unwashed, and has its original tags attached.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-[#212121] mb-2 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#FF7043]" />
              <span>Hygiene Policy for Newborn Essentials</span>
            </h4>
            <p>
              For infant hygiene and newborn skin safety, cloth nappies and feeding bibs cannot be returned once their inner hygienic heat seal is broken, unless there is a rare manufacturing defect.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-[#212121] mb-2 flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-[#146AFF]" />
              <span>How does refund work for Cash on Delivery (COD) orders?</span>
            </h4>
            <p>
              For COD orders, our customer care team will message you to collect your preferred UPI ID (Google Pay, PhonePe, Paytm) or bank account details, and funds are transferred instantly.
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/track-order"
            className="inline-flex items-center gap-2 rounded-xs bg-[#6FC341] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#5bb32f] transition-colors"
          >
            <span>Initiate Return / Exchange via Order ID</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
