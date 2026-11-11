'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Package, Truck, CheckCircle2, Clock, MapPin, ArrowRight } from 'lucide-react';

export default function TrackOrderPage() {
  const [orderQuery, setOrderQuery] = useState('PUM-849201');
  const [phoneQuery, setPhoneQuery] = useState('9876543210');
  const [hasSearched, setHasSearched] = useState(true);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderQuery.trim()) return;
    setHasSearched(true);
  };

  return (
    <div className="w-full bg-[#FAFAFA] py-10">
      <div className="mx-auto max-w-[1012px] px-4">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="rounded-xs bg-[#E8F5E9] px-2.5 py-0.5 text-xs font-bold text-[#208833] uppercase">
            Live Shipment Status
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#212121] mt-2">
            Track Your Pumkin Cotton Order
          </h1>
          <p className="text-xs text-[#757575] mt-1">
            Enter your Order ID (starts with PUM-) or 10-digit mobile number used at checkout.
          </p>
        </div>

        {/* Search Box */}
        <div className="mx-auto max-w-md rounded-md border border-[#DADADA] bg-white p-5 shadow-xs mb-8">
          <form onSubmit={handleTrack} className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-[#484848] block mb-1">
                Order ID / Reference Number
              </label>
              <input
                type="text"
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value.toUpperCase())}
                placeholder="e.g. PUM-849201"
                className="w-full rounded-xs border border-[#E0E0E0] px-3 py-2 text-xs uppercase text-[#212121] outline-none focus:border-[#146AFF]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#484848] block mb-1">
                Registered Mobile Number
              </label>
              <input
                type="tel"
                maxLength={10}
                value={phoneQuery}
                onChange={(e) => setPhoneQuery(e.target.value.replace(/\D/g, ''))}
                placeholder="10-digit phone number"
                className="w-full rounded-xs border border-[#E0E0E0] px-3 py-2 text-xs text-[#212121] outline-none focus:border-[#146AFF]"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xs bg-[#6FC341] py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#5bb32f] transition-colors"
            >
              <Search className="h-4 w-4" />
              <span>Track Order</span>
            </button>
          </form>
        </div>

        {/* Live Result View */}
        {hasSearched && (
          <div className="rounded-md border border-[#DADADA] bg-white p-6 shadow-xs animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#F5F5F5] pb-4 mb-6 gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[#212121] font-mono">{orderQuery}</span>
                  <span className="rounded-xs bg-[#E8F5E9] px-2 py-0.5 text-[11px] font-bold text-[#208833]">
                    In Transit
                  </span>
                </div>
                <p className="text-xs text-[#757575] mt-0.5">
                  Courier Partner: <strong className="text-[#363636]">BlueDart Express (AWB: 9812450123)</strong>
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[11px] text-[#757575] block">Expected Delivery:</span>
                <strong className="text-sm font-bold text-[#208833]">Friday, 14 Nov by 6:00 PM</strong>
              </div>
            </div>

            {/* Tracking Milestones */}
            <div className="space-y-6 max-w-2xl mx-auto py-2">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6FC341] text-white">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div className="h-12 w-0.5 bg-[#6FC341]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#212121]">Order Verified &amp; Packed</p>
                  <p className="text-[11px] text-[#757575]">Cotton quality inspection passed at Mumbai Central Fulfillment Hub</p>
                  <span className="text-[10px] text-[#9E9E9E]">11 Nov, 08:30 PM</span>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6FC341] text-white">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div className="h-12 w-0.5 bg-[#6FC341]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#212121]">Dispatched via Air Courier</p>
                  <p className="text-[11px] text-[#757575]">Departed from Mumbai sorting facility. En route to regional distribution center</p>
                  <span className="text-[10px] text-[#9E9E9E]">12 Nov, 04:15 AM</span>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF7043] text-white animate-pulse">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div className="h-12 w-0.5 bg-[#E0E0E0]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#212121]">Arrived at Local Delivery Hub</p>
                  <p className="text-[11px] text-[#757575]">Bag sorting in progress at Destination Delivery Station</p>
                  <span className="text-[10px] text-[#FF7043] font-semibold">Expected: Tomorrow, 09:00 AM</span>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F5F5F5] text-[#9E9E9E] border border-[#DADADA]">
                    <MapPin className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#9E9E9E]">Out for Delivery &amp; Handover</p>
                  <p className="text-[11px] text-[#9E9E9E]">Delivery executive will contact via SMS/Call</p>
                </div>
              </div>
            </div>

            {/* Need Help Strip */}
            <div className="mt-8 border-t border-[#F5F5F5] pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-[#575757] gap-3">
              <span>Have questions about this package?</span>
              <div className="flex items-center gap-3">
                <Link href="/contact" className="text-[#146AFF] font-medium hover:underline">
                  Contact Support
                </Link>
                <span>•</span>
                <Link href="/returns-policy" className="text-[#146AFF] font-medium hover:underline">
                  Initiate Return / Exchange
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
