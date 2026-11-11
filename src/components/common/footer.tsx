'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/context/store-context';
import {
  MapPin,
  ShieldCheck,
  RotateCcw,
  Truck,
  Heart,
  PhoneCall,
  Mail,
  CheckCircle,
} from 'lucide-react';

export function Footer() {
  const { setLocation, showToast } = useStore();
  const [footerPincode, setFooterPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);

  const handleFooterPincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(footerPincode)) {
      setPincodeStatus('Please enter a valid 6-digit PIN code');
      return;
    }

    setLocation({
      pincode: footerPincode,
      city: 'Local Area',
      state: 'India',
      deliveryDays: '2-3 Business Days',
    });
    setPincodeStatus(`Available! Delivery within 2-3 days to ${footerPincode}`);
    showToast(`Checked delivery for ${footerPincode} - Serviceable!`);
  };

  return (
    <footer className="mt-auto border-t border-[#D4D4D4] bg-[#2E2E2E] text-white">
      {/* Trust Feature Strip */}
      <div className="border-b border-[#3D3D3D] bg-[#242424] py-6">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-4 px-4 sm:grid-cols-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#3D3D3D] text-[#6FC341]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">100% Pure Cotton</p>
              <p className="text-[11px] text-[#BDBDBD]">GOTS-certified non-toxic dyes</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#3D3D3D] text-[#6FC341]">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Free Shipping Over ₹499</p>
              <p className="text-[11px] text-[#BDBDBD]">Across 20,000+ Indian PIN codes</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#3D3D3D] text-[#6FC341]">
              <RotateCcw className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">7 Days Easy Return</p>
              <p className="text-[11px] text-[#BDBDBD]">Doorstep exchange guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#3D3D3D] text-[#6FC341]">
              <Heart className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Trusted by 2.5L+ Moms</p>
              <p className="text-[11px] text-[#BDBDBD]">Softest feel for sensitive skin</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Delivery Service Checker */}
      <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand & Delivery Checker (Section 8.4 from design.md) */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🎃</span>
              <span className="text-base font-bold text-white tracking-wide">
                Pumkin <span className="text-[#FF7043]">Cotton</span> Casuals
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#BDBDBD] max-w-sm mb-4">
              Premium children&apos;s cotton apparel thoughtfully designed for playtime comfort, sensitive baby skin, and durability.
            </p>

            {/* Dark Theme Pincode Input (Section 8.4 in design.md) */}
            <div className="rounded-xs bg-[#242424] p-3.5 border border-[#3D3D3D] max-w-md">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-white mb-2">
                <MapPin className="h-4 w-4 text-[#FF7043]" />
                <span>Check Delivery Availability in Your City</span>
              </div>
              <form onSubmit={handleFooterPincodeCheck} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={footerPincode}
                  onChange={(e) => {
                    setFooterPincode(e.target.value.replace(/\D/g, ''));
                    if (pincodeStatus) setPincodeStatus(null);
                  }}
                  placeholder="Enter 6-digit Pincode"
                  className="w-full rounded-xs bg-[#3D3D3D] border border-[#2D2D2D] px-3 py-1.5 text-xs text-[#BDBDBD] placeholder-[#808080] outline-none focus:border-[#6FC341]"
                />
                <button
                  type="submit"
                  className="rounded-xs bg-[#6FC341] px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white hover:bg-[#5bb32f] transition-colors shrink-0"
                >
                  Check
                </button>
              </form>
              {pincodeStatus && (
                <p className="mt-2 flex items-center gap-1 text-[11px] text-[#6FC341]">
                  <CheckCircle className="h-3 w-3" />
                  {pincodeStatus}
                </p>
              )}
            </div>
          </div>

          {/* Column 1: Shop Collections */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Cotton Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#BDBDBD]">
              <li>
                <Link href="/shop?category=girls" className="hover:text-white hover:underline">
                  Girls Frocks & Dresses
                </Link>
              </li>
              <li>
                <Link href="/shop?category=boys" className="hover:text-white hover:underline">
                  Boys Polo & Shorts Sets
                </Link>
              </li>
              <li>
                <Link href="/shop?category=baby" className="hover:text-white hover:underline">
                  Organic Newborn Rompers
                </Link>
              </li>
              <li>
                <Link href="/shop?organic=true" className="hover:text-white hover:underline">
                  GOTS Certified Basics
                </Link>
              </li>
              <li>
                <Link href="/boutique/new-arrivals-up-to-14y" className="hover:text-white hover:underline">
                  Boutique Collection
                </Link>
              </li>
              <li>
                <Link href="/shop?discount=40" className="hover:text-[#FC3B3B] hover:underline">
                  Clearance Sale (Up to 50% Off)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Customer Assistance */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs text-[#BDBDBD]">
              <li>
                <Link href="/cart" className="hover:text-white hover:underline">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white hover:underline">
                  Returns & Exchange Policy
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white hover:underline">
                  Cotton Care Instructions
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white hover:underline">
                  Fabric Certifications
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white hover:underline">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Help */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Reach Out to Us
            </h4>
            <div className="space-y-2.5 text-xs text-[#BDBDBD]">
              <div className="flex items-start gap-2">
                <PhoneCall className="h-4 w-4 text-[#6FC341] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">1800-PUMPKIN (786-7546)</p>
                  <p className="text-[11px]">Mon-Sat: 9:00 AM - 7:00 PM IST</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#FF7043] shrink-0" />
                <span className="text-white">care@pumkincasuals.com</span>
              </div>
              <div className="pt-2 text-[11px] text-[#9E9E9E]">
                Made with ❤️ in India for kids worldwide.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment icons */}
        <div className="mt-10 border-t border-[#3D3D3D] pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#9E9E9E]">
          <p>© 2026 Pumkin Cotton Casuals. All rights reserved. Designed to specifications.</p>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="rounded-xs bg-[#3D3D3D] px-2 py-1 text-white">Razorpay Secure</span>
            <span className="rounded-xs bg-[#3D3D3D] px-2 py-1 text-white">UPI / GPay</span>
            <span className="rounded-xs bg-[#3D3D3D] px-2 py-1 text-white">Visa & Mastercard</span>
            <span className="rounded-xs bg-[#3D3D3D] px-2 py-1 text-white">Cash on Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
