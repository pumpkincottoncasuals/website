'use client';

import React, { Suspense, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { MOCK_PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/product/product-card';
import {
  Filter,
  X,
  RotateCcw,
  Sparkles,
  Grid3X3,
  LayoutGrid,
} from 'lucide-react';

function CatalogueContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialQuery = searchParams.get('q') || '';
  const initialOrganic = searchParams.get('organic') === 'true';
  const initialDiscount = Number(searchParams.get('discount')) || 0;

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(1600);
  const [minDiscount, setMinDiscount] = useState<number>(initialDiscount);
  const [inStockOnly, setInStockOnly] = useState<boolean>(true);
  const [onlyOrganic, setOnlyOrganic] = useState<boolean>(initialOrganic);
  const [sortBy, setSortBy] = useState<string>('popular');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);
  const [gridColumns, setGridColumns] = useState<3 | 4>(4);

  // Available filter choices
  const ALL_SIZES = ['0-3M', '3-6M', '6-12M', '1-2Y', '2-3Y', '3-4Y', '4-5Y', '5-6Y', '7-8Y', '9-10Y', '11-12Y', '13-14Y'];
  const ALL_FABRICS = [
    '100% Breathable Combed Cotton',
    '100% GOTS Certified Organic Cotton',
    '100% Cotton Cambric',
    '100% Cotton Pique',
    '100% Muslin Cotton',
  ];
  const ALL_COLORS = [
    { name: 'Coral', hex: '#FF7043' },
    { name: 'Yellow', hex: '#FDD835' },
    { name: 'Navy & Blue', hex: '#1E3A8A' },
    { name: 'Forest Green', hex: '#2E7D32' },
    { name: 'Cotton White', hex: '#FFFFFF' },
    { name: 'Teal & Pastel', hex: '#80CBC4' },
  ];

  // Filter logic
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      // Search query
      if (initialQuery) {
        const q = initialQuery.toLowerCase();
        const matchesQuery =
          product.name.toLowerCase().includes(q) ||
          product.brand.toLowerCase().includes(q) ||
          product.subcategory.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      // Category
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Organic only
      if (onlyOrganic && !product.isOrganic) {
        return false;
      }

      // Stock
      if (inStockOnly && !product.inStock) {
        return false;
      }

      // Price
      if (product.price > maxPrice) {
        return false;
      }

      // Discount
      if (product.discountPercent < minDiscount) {
        return false;
      }

      // Sizes
      if (selectedSizes.length > 0) {
        const hasMatchingSize = product.sizes.some((s) => selectedSizes.includes(s));
        if (!hasMatchingSize) return false;
      }

      // Colors
      if (selectedColors.length > 0) {
        const hasMatchingColor = product.colors.some((c) =>
          selectedColors.some((sc) => c.name.toLowerCase().includes(sc.toLowerCase()))
        );
        if (!hasMatchingColor) return false;
      }

      // Fabrics
      if (selectedFabrics.length > 0) {
        const hasMatchingFabric = selectedFabrics.some((f) =>
          product.fabric.toLowerCase().includes(f.toLowerCase().replace('100%', '').trim())
        );
        if (!hasMatchingFabric) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return b.reviewCount - a.reviewCount; // 'popular'
    });
  }, [
    initialQuery,
    selectedCategory,
    onlyOrganic,
    inStockOnly,
    maxPrice,
    minDiscount,
    selectedSizes,
    selectedColors,
    selectedFabrics,
    sortBy,
  ]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedFabrics([]);
    setMaxPrice(1600);
    setMinDiscount(0);
    setInStockOnly(false);
    setOnlyOrganic(false);
    setSortBy('popular');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedSizes.length > 0 ||
    selectedColors.length > 0 ||
    selectedFabrics.length > 0 ||
    maxPrice < 1600 ||
    minDiscount > 0 ||
    onlyOrganic;

  return (
    <div className="w-full bg-white pb-16">
      {/* 1. BOUTIQUE / CATALOGUE HEADER (Per Section 9.2 in design.md) */}
      <div className="border-b border-[#DADADA] bg-gradient-to-r from-[#FFF8E7] via-[#F8F9FA] to-[#E8F5E9] py-5">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-[12px] text-[#757575] mb-2 font-normal">
            <Link href="/" className="hover:text-[#146AFF]">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-[#146AFF]">Kids Wear</Link>
            <span>/</span>
            <span className="text-[#363636] font-medium capitalize">
              {initialQuery
                ? `Search: "${initialQuery}"`
                : selectedCategory === 'all'
                ? 'All Pure Cotton Casuals'
                : `${selectedCategory} Collection`}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-[20px] sm:text-[24px] font-bold text-[#212121] leading-[30px]">
                  {selectedCategory === 'girls'
                    ? "Girls Cotton Frocks & Sets (0-14Y)"
                    : selectedCategory === 'boys'
                    ? "Boys Cotton Casuals & Polo Sets (0-14Y)"
                    : selectedCategory === 'baby'
                    ? "Infant Pure Mulmul Rompers & Bodysuits"
                    : "Pumkin Cotton Casuals Catalogue"}
                </h1>
                <span className="rounded-xs bg-[#6FC341] px-2 py-0.5 text-[11px] font-bold text-white">
                  100% Pure Cotton
                </span>
              </div>
              <p className="text-[13px] text-[#575757] mt-1">
                Showing <strong className="text-[#363636]">{filteredProducts.length}</strong> styles • GOTS certified organic & combed cotton
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#757575]">
              <Sparkles className="h-4 w-4 text-[#FF7043]" />
              <span>Free Delivery on orders over ₹499</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CATALOGUE MAIN BODY (Sidebar Filters + Products Grid) */}
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 pt-6">
        {/* Mobile Filter Toggle & Sort Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#DADADA] pb-3 mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 rounded-xs border border-[#DADADA] bg-white px-3 py-1.5 text-xs font-medium text-[#363636] hover:bg-[#F8F8F8]"
            >
              <Filter className="h-3.5 w-3.5 text-[#FF7043]" />
              <span>Filters {hasActiveFilters && '• Active'}</span>
            </button>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-xs text-[#FC3B3B] hover:underline"
              >
                <RotateCcw className="h-3 w-3" /> Clear All Filters
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Grid density buttons */}
            <div className="hidden sm:flex items-center gap-1 border border-[#DADADA] rounded-xs p-0.5">
              <button
                onClick={() => setGridColumns(3)}
                className={`p-1 rounded-2xs ${gridColumns === 3 ? 'bg-[#363636] text-white' : 'text-[#757575]'}`}
                title="3 Columns"
              >
                <Grid3X3 className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setGridColumns(4)}
                className={`p-1 rounded-2xs ${gridColumns === 4 ? 'bg-[#363636] text-white' : 'text-[#757575]'}`}
                title="4 Columns"
              >
                <LayoutGrid className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Sort Bar (Per Section 9.2 in design.md) */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#757575] font-medium hidden sm:inline">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-xs border border-[#DADADA] bg-white px-2.5 py-1.5 text-xs text-[#363636] font-medium outline-none focus:border-[#146AFF]"
              >
                <option value="popular">Popularity</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="discount">Discount Percentage</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Layout Grid: 1/4 Sidebar + 3/4 Product Grid */}
        <div className="flex gap-8">
          {/* DESKTOP FILTER SIDEBAR (Section 9.2 in design.md) */}
          <aside className="hidden lg:block w-64 shrink-0 space-y-6 divide-y divide-[#F5F5F5] text-xs">
            {/* Category Filter */}
            <div className="pt-0">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#363636] mb-3">
                Category
              </h3>
              <div className="space-y-1.5">
                {[
                  { id: 'all', label: 'All Outfits' },
                  { id: 'girls', label: 'Girls Fashion (0-14Y)' },
                  { id: 'boys', label: 'Boys Casuals (0-14Y)' },
                  { id: 'baby', label: 'Infants & Toddlers' },
                  { id: 'unisex', label: 'Unisex Essentials' },
                ].map((cat) => (
                  <label
                    key={cat.id}
                    className="flex items-center gap-2 cursor-pointer text-[#575757] hover:text-[#363636]"
                  >
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat.id}
                      onChange={() => setSelectedCategory(cat.id)}
                      className="accent-[#6FC341]"
                    />
                    <span>{cat.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Special Badges Filter */}
            <div className="pt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#363636] mb-3">
                Fabric & Purity
              </h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer text-[#208833] font-medium">
                  <input
                    type="checkbox"
                    checked={onlyOrganic}
                    onChange={(e) => setOnlyOrganic(e.target.checked)}
                    className="accent-[#208833] rounded-xs"
                  />
                  <span>🌱 100% GOTS Organic Cotton Only</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-[#575757]">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="accent-[#6FC341] rounded-xs"
                  />
                  <span>In-Stock Only</span>
                </label>
              </div>

              {/* Fabric Type */}
              <div className="mt-3 pt-2 border-t border-[#F5F5F5] space-y-1.5">
                <span className="text-[11px] font-semibold text-[#757575] block mb-1">
                  Weave & Texture:
                </span>
                {ALL_FABRICS.map((fabric) => {
                  const isChecked = selectedFabrics.includes(fabric);
                  return (
                    <label key={fabric} className="flex items-center gap-2 cursor-pointer text-[11px] text-[#575757]">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          setSelectedFabrics((prev) =>
                            isChecked ? prev.filter((f) => f !== fabric) : [...prev, fabric]
                          );
                        }}
                        className="accent-[#6FC341] rounded-xs"
                      />
                      <span>{fabric}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Size / Age Filter */}
            <div className="pt-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#363636]">
                  Age & Size
                </h3>
                {selectedSizes.length > 0 && (
                  <button
                    onClick={() => setSelectedSizes([])}
                    className="text-[11px] text-[#FC3B3B] hover:underline"
                  >
                    Reset
                  </button>
                )}
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {ALL_SIZES.map((size) => {
                  const isChecked = selectedSizes.includes(size);
                  return (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSizes((prev) =>
                          isChecked ? prev.filter((s) => s !== size) : [...prev, size]
                        );
                      }}
                      className={`rounded-xs border py-1.5 text-center text-xs font-medium transition-all ${
                        isChecked
                          ? 'border-[#363636] bg-[#363636] text-white'
                          : 'border-[#DADADA] bg-white text-[#575757] hover:border-[#6FC341]'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Slider */}
            <div className="pt-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#363636]">
                  Max Price
                </h3>
                <span className="font-bold text-[#212121]">₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min={399}
                max={1600}
                step={50}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#6FC341]"
              />
              <div className="flex justify-between text-[11px] text-[#9E9E9E] mt-1">
                <span>₹399</span>
                <span>₹1,600+</span>
              </div>
            </div>

            {/* Discount Filter */}
            <div className="pt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#363636] mb-3">
                Discount
              </h3>
              <div className="space-y-1.5">
                {[
                  { value: 0, label: 'All Discounts' },
                  { value: 30, label: '30% & Above' },
                  { value: 40, label: '40% & Above' },
                  { value: 50, label: '50% & Above' },
                ].map((disc) => (
                  <label
                    key={disc.value}
                    className="flex items-center gap-2 cursor-pointer text-[#575757] hover:text-[#363636]"
                  >
                    <input
                      type="radio"
                      name="discount"
                      checked={minDiscount === disc.value}
                      onChange={() => setMinDiscount(disc.value)}
                      className="accent-[#DD5808]"
                    />
                    <span>{disc.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="pt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#363636] mb-3">
                Color
              </h3>
              <div className="flex flex-wrap gap-2">
                {ALL_COLORS.map((col) => {
                  const isSelected = selectedColors.includes(col.name);
                  return (
                    <button
                      key={col.name}
                      onClick={() => {
                        setSelectedColors((prev) =>
                          isSelected ? prev.filter((c) => c !== col.name) : [...prev, col.name]
                        );
                      }}
                      className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] transition-all ${
                        isSelected
                          ? 'border-[#363636] bg-[#363636] text-white'
                          : 'border-[#DADADA] bg-white text-[#575757] hover:border-[#6FC341]'
                      }`}
                    >
                      <span
                        className="h-2.5 w-2.5 rounded-full border border-black/10"
                        style={{ backgroundColor: col.hex }}
                      />
                      <span>{col.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* PRODUCT GRID CONTAINER */}
          <main className="flex-1 min-w-0">
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-md border border-dashed border-[#DADADA] p-12 text-center">
                <p className="text-base font-semibold text-[#363636]">No outfits match your filters</p>
                <p className="mt-1 text-xs text-[#757575] max-w-sm">
                  Try clearing some filter criteria like size or price to view more pure cotton styles.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-4 rounded-xs bg-[#6FC341] px-5 py-2 text-xs font-semibold text-white hover:bg-[#5bb32f]"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid grid-cols-2 ${
                  gridColumns === 3 ? 'md:grid-cols-3' : 'md:grid-cols-3 xl:grid-cols-4'
                } gap-4`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* MOBILE FILTER MODAL DRAWER */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 lg:hidden" onClick={() => setMobileFilterOpen(false)}>
          <div
            className="h-full w-full max-w-xs bg-white p-5 shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#E0E0E0] pb-3 mb-4">
              <h3 className="text-sm font-bold text-[#212121]">Refine Products</h3>
              <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-[#757575]">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile filter controls */}
            <div className="space-y-5 text-xs">
              <div>
                <h4 className="font-bold text-[#363636] uppercase mb-2">Category</h4>
                <div className="space-y-1.5">
                  {['all', 'girls', 'boys', 'baby'].map((c) => (
                    <label key={c} className="flex items-center gap-2">
                      <input
                        type="radio"
                        checked={selectedCategory === c}
                        onChange={() => setSelectedCategory(c)}
                        className="accent-[#6FC341]"
                      />
                      <span className="capitalize">{c}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[#363636] uppercase mb-2">Organic Purity</h4>
                <label className="flex items-center gap-2 text-[#208833]">
                  <input
                    type="checkbox"
                    checked={onlyOrganic}
                    onChange={(e) => setOnlyOrganic(e.target.checked)}
                    className="accent-[#208833]"
                  />
                  <span>100% GOTS Organic Cotton Only</span>
                </label>
              </div>

              <div className="pt-4 border-t border-[#F5F5F5] flex gap-2">
                <button
                  onClick={resetFilters}
                  className="flex-1 rounded-xs border border-[#DADADA] py-2 text-xs font-semibold text-[#575757]"
                >
                  Reset
                </button>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="flex-1 rounded-xs bg-[#6FC341] py-2 text-xs font-semibold text-white"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-64 w-full items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#6FC341] border-t-transparent" />
        </div>
      }
    >
      <CatalogueContent />
    </Suspense>
  );
}
