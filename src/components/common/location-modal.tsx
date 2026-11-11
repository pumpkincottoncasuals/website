'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/store-context';
import { MapPin, X, Check, Truck } from 'lucide-react';

const POPULAR_CITIES = [
  { city: 'Mumbai', pincode: '400001', state: 'Maharashtra', days: '1-2 Days' },
  { city: 'New Delhi', pincode: '110001', state: 'Delhi', days: '2-3 Days' },
  { city: 'Bengaluru', pincode: '560001', state: 'Karnataka', days: '2 Days' },
  { city: 'Hyderabad', pincode: '500001', state: 'Telangana', days: '2-3 Days' },
  { city: 'Pune', pincode: '411001', state: 'Maharashtra', days: '1-2 Days' },
  { city: 'Chennai', pincode: '600001', state: 'Tamil Nadu', days: '2-3 Days' },
  { city: 'Kolkata', pincode: '700001', state: 'West Bengal', days: '3-4 Days' },
  { city: 'Ahmedabad', pincode: '380001', state: 'Gujarat', days: '2 Days' },
];

export function LocationModal() {
  const { isLocationModalOpen, setIsLocationModalOpen, location, setLocation } = useStore();
  const [inputPincode, setInputPincode] = useState('');
  const [error, setError] = useState('');

  if (!isLocationModalOpen) return null;

  const handleApplyPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(inputPincode)) {
      setError('Please enter a valid 6-digit Indian PIN code');
      return;
    }
    setError('');
    setLocation({
      pincode: inputPincode,
      city: 'Local Delivery Area',
      state: 'India',
      deliveryDays: '2-4 Business Days',
    });
    setIsLocationModalOpen(false);
  };

  const handleSelectCity = (c: typeof POPULAR_CITIES[0]) => {
    setLocation({
      pincode: c.pincode,
      city: c.city,
      state: c.state,
      deliveryDays: c.days,
    });
    setIsLocationModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-md bg-white p-6 shadow-xl border border-[#DADADA]">
        <div className="flex items-center justify-between border-b border-[#F5F5F5] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-[#FF7043]" />
            <h3 className="text-base font-semibold text-[#212121]">Choose Your Delivery Location</h3>
          </div>
          <button
            onClick={() => setIsLocationModalOpen(false)}
            className="rounded-full p-1 text-[#757575] hover:bg-[#F8F8F8] hover:text-[#212121]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="text-[13px] text-[#575757] mb-4">
          Enter your 6-digit PIN code to check delivery speed, cod availability, and local offers for Pumkin Cotton Casuals.
        </p>

        <form onSubmit={handleApplyPincode} className="mb-5">
          <div className="flex gap-2">
            <input
              type="text"
              maxLength={6}
              value={inputPincode}
              onChange={(e) => {
                setInputPincode(e.target.value.replace(/\D/g, ''));
                if (error) setError('');
              }}
              placeholder="Enter 6-digit PIN code"
              className="flex-1 rounded-sm border border-[#E0E0E0] px-3 py-2 text-sm text-[#363636] focus:border-[#146AFF] focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-xs bg-[#6FC341] px-5 py-2 text-xs font-medium text-white transition-colors hover:bg-[#5bb32f]"
            >
              Apply
            </button>
          </div>
          {error && <p className="mt-1.5 text-xs text-[#FC3B3B]">{error}</p>}
        </form>

        <div className="border-t border-[#F5F5F5] pt-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#757575] mb-2.5 block">
            Popular Metro Cities
          </span>
          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
            {POPULAR_CITIES.map((c) => {
              const isSelected = location.pincode === c.pincode;
              return (
                <button
                  key={c.pincode}
                  onClick={() => handleSelectCity(c)}
                  className={`flex flex-col items-start p-2.5 rounded-sm border text-left transition-all ${
                    isSelected
                      ? 'border-[#6FC341] bg-[#F1F8E9]'
                      : 'border-[#E0E0E0] hover:border-[#6FC341] hover:bg-[#F8F8F8]'
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="text-[13px] font-medium text-[#363636]">{c.city}</span>
                    {isSelected && <Check className="h-3.5 w-3.5 text-[#208833]" />}
                  </div>
                  <span className="text-[11px] text-[#757575]">{c.pincode} • {c.days}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2 rounded-sm bg-[#D9F3F4] px-3 py-2 text-[12px] text-[#07457D]">
          <Truck className="h-4 w-4 shrink-0 text-[#208833]" />
          <span>Free Standard Delivery applies to all orders above ₹499</span>
        </div>
      </div>
    </div>
  );
}

