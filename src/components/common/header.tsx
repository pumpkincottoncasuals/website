'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useStore } from '@/context/store-context';
import { MOCK_PRODUCTS } from '@/data/products';
import {
  MapPin,
  Search,
  ShoppingBag,
  Heart,
  User,
  ChevronDown,
  Sparkles,
  PhoneCall,
  RotateCcw,
  ShieldCheck,
  Menu,
  X,
} from 'lucide-react';

export function Header() {
  const router = useRouter();
  const {
    cartCount,
    wishlist,
    location,
    setIsLocationModalOpen,
    setIsCartDrawerOpen,
    setIsSizeGuideOpen,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = searchQuery.trim().length > 1
    ? MOCK_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchFocused(false);
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-xs">
      {/* 1. TOP ANNOUNCEMENT / UTILITY BAR */}
      <div className="border-b border-[#F5F5F5] bg-[#F8F8F8] text-[12px] text-[#575757]">
        <div className="mx-auto flex h-8 max-w-[1280px] items-center justify-between px-4 sm:px-6">
          {/* Left: Location Selector */}
          <div className="flex items-center">
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="group flex items-center gap-1 border-r border-[#D4D4D4] px-1.5 py-1 text-[12px] font-normal leading-[12px] text-[#575757] hover:text-[#363636]"
              title="Change Delivery Location"
            >
              <MapPin className="h-3.5 w-3.5 text-[#FF7043] group-hover:scale-110 transition-transform" />
              <span>
                Deliver to: <strong className="text-[#363636] font-medium">{location.city} ({location.pincode})</strong>
              </span>
              <ChevronDown className="h-3 w-3 text-[#9E9E9E]" />
            </button>
            <div className="hidden md:flex items-center gap-2 pl-3 text-[#616161]">
              <span className="flex items-center gap-1 text-[#208833]">
                <ShieldCheck className="h-3.5 w-3.5" /> 100% GOTS Pure Cotton
              </span>
            </div>
          </div>

          {/* Right: Quick Links */}
          <div className="flex items-center gap-4 text-[12px]">
            <button
              onClick={() => setIsSizeGuideOpen(true)}
              className="hidden sm:inline-block text-[#575757] hover:text-[#146AFF]"
            >
              📏 Sizing Chart
            </button>
            <Link
              href="/boutique/new-arrivals-up-to-14y"
              className="flex items-center gap-1 text-[#DD5808] font-medium hover:underline"
            >
              <Sparkles className="h-3 w-3" /> Boutique Edition
            </Link>
            <Link href="/about" className="hidden lg:inline text-[#575757] hover:text-[#363636]">
              Our Story
            </Link>
            <span className="hidden sm:inline border-r border-[#D4D4D4] h-3"></span>
            <div className="flex items-center gap-1 text-[#575757]">
              <PhoneCall className="h-3 w-3 text-[#6FC341]" />
              <span className="hidden sm:inline">Support:</span>
              <span className="font-medium text-[#363636]">1800-PUMPKIN</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN BRAND HEADER */}
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-1.5 text-[#363636]"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF7043] text-white font-bold text-lg shadow-xs">
            🎃
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-lg sm:text-xl font-bold tracking-tight text-[#363636] leading-none">
              Pumkin <span className="text-[#FF7043]">Cotton</span> Casuals
            </span>
            <span className="text-[10px] uppercase tracking-wider text-[#757575] font-medium mt-0.5">
              100% Pure Combed Cotton for Little Ones
            </span>
          </div>
        </Link>

        {/* Global Search Bar (adhering to Section 8.1 in design.md) */}
        <div ref={searchRef} className="relative hidden md:flex flex-1 max-w-xl mx-4">
          <form
            onSubmit={handleSearchSubmit}
            className="flex w-full items-center rounded-sm border border-[#DADADA] bg-white transition-all focus-within:border-[#146AFF] focus-within:shadow-xs"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Search for pure cotton frocks, rompers, polo tees, shorts..."
              className="inline-block w-full rounded-sm bg-white text-[13px] font-normal leading-[30px] text-[#363636] placeholder-[#959595] px-3.5 py-1 outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="p-1 text-[#9E9E9E] hover:text-[#363636]"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <button
              type="submit"
              className="m-1 flex items-center justify-center rounded-xs bg-[#6FC341] px-4 py-1.5 text-[11px] font-medium text-white transition-colors hover:bg-[#5bb32f]"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>

          {/* Autocomplete Dropdown */}
          {isSearchFocused && (
            <div className="absolute top-full left-0 mt-1 w-full rounded-sm border border-[#DADADA] bg-white p-2 shadow-lg z-50">
              {searchResults.length > 0 ? (
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#757575] px-2 py-1 block">
                    Product Matches
                  </span>
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      onClick={() => setIsSearchFocused(false)}
                      className="flex items-center gap-3 p-2 rounded-xs hover:bg-[#F8F8F8] transition-colors"
                    >
                      <div className="relative h-10 w-8 shrink-0 overflow-hidden rounded-xs border border-[#E0E0E0]">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-[#363636] truncate">{product.name}</p>
                        <p className="text-[11px] text-[#757575]">
                          {product.category.toUpperCase()} • ₹{product.price}{' '}
                          <span className="line-through text-[#959595]">₹{product.originalPrice}</span>
                        </p>
                      </div>
                      <span className="text-[10px] font-bold text-[#DD5808]">
                        {product.discountPercent}% OFF
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-3 text-xs text-[#757575]">
                  <p className="font-medium text-[#363636] mb-2">Popular Searches:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {['Floral Frock', 'Organic Romper', 'Polo & Shorts Set', 'Muslin Nightsuit', 'Baby Jhabla'].map(
                      (tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => {
                            setSearchQuery(tag);
                            router.push(`/shop?q=${encodeURIComponent(tag)}`);
                            setIsSearchFocused(false);
                          }}
                          className="rounded-xs bg-[#F8F8F8] px-2.5 py-1 text-[11px] text-[#484848] hover:bg-[#D9F3F4] hover:text-[#07457D] transition-colors"
                        >
                          {tag}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons: Wishlist, Cart, Account */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="relative flex flex-col items-center justify-center p-1 text-[#575757] hover:text-[#FC3B3B] transition-colors"
            title="Wishlist"
          >
            <div className="relative">
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#FC3B3B] text-[10px] font-bold text-white">
                  {wishlist.length}
                </span>
              )}
            </div>
            <span className="hidden sm:inline text-[11px] mt-0.5">Wishlist</span>
          </Link>

          {/* Cart Bag */}
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            className="relative flex flex-col items-center justify-center p-1 text-[#575757] hover:text-[#6FC341] transition-colors"
            title="Shopping Cart"
          >
            <div className="relative">
              <ShoppingBag className="h-5 w-5 text-[#363636]" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2.5 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-[#6FC341] text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline text-[11px] mt-0.5 font-medium text-[#363636]">Bag</span>
          </button>

          {/* User Account / Profile */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-1.5 p-1 text-[#575757] hover:text-[#363636] transition-colors"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F8F8F8] border border-[#DADADA]">
                <User className="h-4 w-4 text-[#575757]" />
              </div>
              <span className="hidden md:inline text-[12px] font-medium text-[#363636]">Account</span>
              <ChevronDown className="h-3 w-3 text-[#757575] hidden md:inline" />
            </button>

            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-sm border border-[#DADADA] bg-white py-1 shadow-lg z-50">
                <div className="border-b border-[#F5F5F5] px-4 py-2">
                  <p className="text-xs font-semibold text-[#212121]">Hello Parent! 👋</p>
                  <p className="text-[11px] text-[#757575]">Manage your orders &amp; kids&apos; profiles</p>
                </div>
                <Link
                  href="/cart"
                  onClick={() => setUserDropdownOpen(false)}
                  className="block px-4 py-2 text-xs text-[#575757] hover:bg-[#F8F8F8] hover:text-[#146AFF]"
                >
                  Shopping Bag
                </Link>
                <Link
                  href="/wishlist"
                  onClick={() => setUserDropdownOpen(false)}
                  className="block px-4 py-2 text-xs text-[#575757] hover:bg-[#F8F8F8] hover:text-[#146AFF]"
                >
                  My Wishlist ({wishlist.length})
                </Link>
                <Link
                  href="/shop"
                  onClick={() => setUserDropdownOpen(false)}
                  className="block px-4 py-2 text-xs text-[#575757] hover:bg-[#F8F8F8] hover:text-[#146AFF]"
                >
                  Order History & Tracking
                </Link>
                <button
                  onClick={() => {
                    setUserDropdownOpen(false);
                    setIsLocationModalOpen(true);
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-[#575757] hover:bg-[#F8F8F8] hover:text-[#146AFF]"
                >
                  Delivery Address ({location.pincode})
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search input */}
      <div className="px-4 pb-2.5 md:hidden">
        <form onSubmit={handleSearchSubmit} className="flex items-center rounded-sm border border-[#DADADA] bg-white">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search kids cotton wear..."
            className="w-full rounded-sm px-3 py-1.5 text-xs text-[#363636] outline-none"
          />
          <button type="submit" className="px-3 text-[#6FC341]">
            <Search className="h-4 w-4" />
          </button>
        </form>
      </div>

      {/* 3. MEGA CATEGORY NAVIGATION BAR */}
      <nav className="border-t border-[#D4D4D4] border-b border-[#D4D4D4] bg-white text-[13px] font-medium text-[#363636]">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 sm:px-6">
          <div className="flex items-center overflow-x-auto no-scrollbar py-0.5">
            <Link
              href="/shop"
              className="whitespace-nowrap px-3.5 py-2.5 text-[#363636] hover:text-[#FF7043] border-b-2 border-transparent hover:border-[#FF7043] transition-colors"
            >
              All Catalogue
            </Link>
            <Link
              href="/shop?category=girls"
              className="whitespace-nowrap px-3.5 py-2.5 text-[#363636] hover:text-[#FF7043] border-b-2 border-transparent hover:border-[#FF7043] transition-colors"
            >
              Girls (0-14Y)
            </Link>
            <Link
              href="/shop?category=boys"
              className="whitespace-nowrap px-3.5 py-2.5 text-[#363636] hover:text-[#FF7043] border-b-2 border-transparent hover:border-[#FF7043] transition-colors"
            >
              Boys (0-14Y)
            </Link>
            <Link
              href="/shop?category=baby"
              className="whitespace-nowrap px-3.5 py-2.5 text-[#363636] hover:text-[#FF7043] border-b-2 border-transparent hover:border-[#FF7043] transition-colors"
            >
              Infants & Baby (0-2Y)
            </Link>
            <Link
              href="/shop?organic=true"
              className="whitespace-nowrap px-3.5 py-2.5 text-[#208833] font-semibold hover:text-[#186a27] border-b-2 border-transparent hover:border-[#208833] transition-colors"
            >
              🌱 100% Organic Cotton
            </Link>
            <Link
              href="/boutique/new-arrivals-up-to-14y"
              className="whitespace-nowrap px-3.5 py-2.5 text-[#363636] hover:text-[#FF7043] border-b-2 border-transparent hover:border-[#FF7043] transition-colors"
            >
              Boutique Casuals
            </Link>
            <Link
              href="/shop?discount=40"
              className="flex items-center gap-1 whitespace-nowrap px-3.5 py-2.5 text-[#FC3B3B] font-bold hover:text-[#d32f2f] border-b-2 border-transparent hover:border-[#FC3B3B] transition-colors"
            >
              <span>Offers & Deals</span>
              <span className="rounded-xs bg-[#FC3B3B] px-1 py-0.2 text-[9px] uppercase tracking-wider text-white">
                Up to 50%
              </span>
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs text-[#757575]">
            <RotateCcw className="h-3.5 w-3.5 text-[#FF7043]" />
            <span>7-Day Easy Returns</span>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[110px] z-50 bg-black/40 lg:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="h-full w-4/5 max-w-sm bg-white p-5 shadow-lg overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <p className="text-xs font-bold uppercase tracking-wider text-[#9E9E9E] mb-3">Shop Categories</p>
            <div className="space-y-1">
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-xs p-2 text-sm font-medium text-[#363636] hover:bg-[#F8F8F8]"
              >
                All Cotton Casuals
              </Link>
              <Link
                href="/shop?category=girls"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-xs p-2 text-sm font-medium text-[#363636] hover:bg-[#F8F8F8]"
              >
                Girls Fashion (0-14Y)
              </Link>
              <Link
                href="/shop?category=boys"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-xs p-2 text-sm font-medium text-[#363636] hover:bg-[#F8F8F8]"
              >
                Boys Casuals (0-14Y)
              </Link>
              <Link
                href="/shop?category=baby"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-xs p-2 text-sm font-medium text-[#363636] hover:bg-[#F8F8F8]"
              >
                Infant & Baby Essentials (0-2Y)
              </Link>
              <Link
                href="/shop?organic=true"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-xs p-2 text-sm font-medium text-[#208833] hover:bg-[#F8F8F8]"
              >
                🌱 100% Pure Organic Cotton
              </Link>
              <Link
                href="/boutique/new-arrivals-up-to-14y"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-xs p-2 text-sm font-medium text-[#DD5808] hover:bg-[#F8F8F8]"
              >
                Boutique New Arrivals (Up to 14Y)
              </Link>
              <Link
                href="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-xs p-2 text-sm font-medium text-[#FC3B3B] hover:bg-[#F8F8F8]"
              >
                My Wishlist ({wishlist.length})
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-xs p-2 text-sm font-medium text-[#575757] hover:bg-[#F8F8F8]"
              >
                About Pumkin Cotton
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
