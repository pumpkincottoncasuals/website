'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Product } from '@/types';
import { MOCK_REVIEWS, MOCK_PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/product/product-card';
import { useStore } from '@/context/store-context';
import {
  Star,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Ruler,
  Check,
  ShoppingBag,
  Zap,
  Tag,
  ChevronRight,
} from 'lucide-react';

export function ProductDetailClient({ product }: { product: Product }) {
  const router = useRouter();

  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsSizeGuideOpen,
    location,
    setLocation,
    showToast,
  } = useStore();

  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || '2-3Y');
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors[0]?.name || 'Standard'
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [pincodeInput, setPincodeInput] = useState<string>(location.pincode);
  const [deliveryEstimate, setDeliveryEstimate] = useState<string | null>(
    `Delivery by Friday to ${location.city} (${location.pincode}) | Free Delivery`
  );
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'care' | 'reviews'>('details');

  const wishlisted = isInWishlist(product.id);

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincodeInput)) {
      showToast('Please enter a valid 6-digit Indian PIN code');
      return;
    }
    setLocation({
      pincode: pincodeInput,
      city: 'Local Area',
      state: 'India',
      deliveryDays: '2-3 Days',
    });
    setDeliveryEstimate(`Delivery within 2-3 business days to ${pincodeInput} | Free Delivery`);
    showToast(`Delivery available for ${pincodeInput}!`);
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    router.push('/checkout');
  };

  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.isOrganic)
  ).slice(0, 4);

  return (
    <div className="w-full bg-white pb-16">
      {/* Breadcrumbs (Per Section 9.3 in design.md — 12px RobotoLR) */}
      <div className="border-b border-[#F5F5F5] bg-[#F8F8F8] py-2.5">
        <div className="mx-auto w-full max-w-[1012px] px-4">
          <nav className="flex items-center gap-1.5 text-[12px] text-[#757575] font-normal leading-[12px]">
            <Link href="/" className="hover:text-[#146AFF]">Home</Link>
            <ChevronRight className="h-3 w-3 text-[#9E9E9E]" />
            <Link href="/shop" className="hover:text-[#146AFF]">Catalogue</Link>
            <ChevronRight className="h-3 w-3 text-[#9E9E9E]" />
            <Link href={`/shop?category=${product.category}`} className="hover:text-[#146AFF] capitalize">
              {product.category}
            </Link>
            <ChevronRight className="h-3 w-3 text-[#9E9E9E]" />
            <span className="text-[#363636] font-medium truncate max-w-xs">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Two-Column Layout (Section 9.3 — total: 1012px, 506px columns) */}
      <div className="mx-auto w-full max-w-[1012px] px-4 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
          {/* LEFT COLUMN (506px): Product Images & Gallery */}
          <div className="w-full lg:w-[506px] lg:pr-6">
            {/* Main Image (radius: 12px per Section 5 & 9.3) */}
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-[12px] border border-[#DADADA] bg-[#F8F8F8]">
              <Image
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                fill
                priority
                className="object-cover transition-transform duration-300 hover:scale-105"
              />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                {product.isOrganic && (
                  <span className="rounded-xs bg-[#208833] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-2xs">
                    🌱 100% Organic Cotton
                  </span>
                )}
                {product.isBestSeller && (
                  <span className="rounded-xs bg-[#FF7043] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-2xs">
                    Best Seller
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-xs transition-colors hover:bg-white ${
                  wishlisted ? 'text-[#FC3B3B]' : 'text-[#757575] hover:text-[#FC3B3B]'
                }`}
                title={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart className={`h-4.5 w-4.5 ${wishlisted ? 'fill-[#FC3B3B]' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="mt-3 flex gap-2.5 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={img}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative h-20 w-16 shrink-0 overflow-hidden rounded-[6px] border transition-all ${
                      selectedImage === idx
                        ? 'border-[#6FC341] ring-2 ring-[#6FC341]/30'
                        : 'border-[#DADADA] opacity-75 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt={`Thumb ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Trust highlights below image */}
            <div className="mt-6 rounded-[6px] border border-[#F5F5F5] bg-[#F8F8F8] p-4 text-xs text-[#575757]">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#208833] shrink-0" />
                  <span>100% Breathable Combed Cotton</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="h-4 w-4 text-[#FF7043] shrink-0" />
                  <span>7 Days Easy Doorstep Return</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-[#146AFF] shrink-0" />
                  <span>Free Shipping on Orders &gt; ₹499</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#208833] shrink-0" />
                  <span>Azo-free Baby Safe Dyes</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (506px, 483px inner content per Section 9.3) */}
          <div className="w-full lg:w-[506px] lg:pl-6 flex flex-col justify-between">
            <div className="max-w-[483px]">
              {/* Brand link (Per Section 9.3 — #146AFF) */}
              <Link
                href="/shop"
                className="text-[13px] font-semibold text-[#146AFF] hover:underline"
              >
                {product.brand}
              </Link>

              {/* Title (Per Section 3.2 & 9.3 — 14-16px Jakarta-Medium, #212121) */}
              <h1 className="mt-1 text-[16px] sm:text-[18px] font-semibold leading-[24px] text-[#212121]">
                {product.name}
              </h1>

              {/* Rating & Review Summary */}
              <div className="mt-2 flex items-center gap-2 text-xs">
                <div className="flex items-center rounded-xs bg-[#FF7043] px-2 py-0.5 text-white font-bold">
                  <Star className="h-3 w-3 fill-current mr-1" />
                  <span>{product.rating.toFixed(1)}</span>
                </div>
                <span className="text-[#146AFF] hover:underline cursor-pointer">
                  {product.reviewCount} Verified Parent Ratings
                </span>
                <span className="text-[#D4D4D4]">•</span>
                <span className="text-[#208833] font-semibold">In Stock</span>
              </div>

              {/* Price Block (Per Section 8.7 & 9.3) */}
              <div className="mt-4 border-y border-[#F5F5F5] py-3">
                <div className="flex items-baseline gap-3">
                  <span className="text-[24px] font-bold text-[#212121] leading-none">
                    ₹{product.price}
                  </span>
                  {product.originalPrice > product.price && (
                    <>
                      <span className="text-[14px] text-[#959595] line-through">
                        MRP ₹{product.originalPrice}
                      </span>
                      <span className="text-[14px] font-bold text-[#E03400]">
                        {product.discountPercent}% OFF
                      </span>
                    </>
                  )}
                </div>
                <p className="mt-1 text-[11px] text-[#757575]">
                  Inclusive of all taxes • 100% Pure Organic Cotton
                </p>
              </div>

              {/* Color Selection */}
              {product.colors.length > 0 && (
                <div className="mt-4">
                  <span className="text-xs font-semibold text-[#363636] block mb-1.5">
                    Select Color: <strong className="text-[#212121] font-bold">{selectedColor}</strong>
                  </span>
                  <div className="flex gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-all ${
                          selectedColor === c.name
                            ? 'border-[#212121] bg-[#F8F8F8] font-semibold text-[#212121]'
                            : 'border-[#DADADA] text-[#575757] hover:border-[#6FC341]'
                        }`}
                      >
                        <span
                          className="h-3 w-3 rounded-full border border-black/10"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Age / Size Selector Pills (Per Section 5 & 9.3 — radius: 28px pills) */}
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#363636]">
                    Select Age / Size: <strong className="text-[#212121]">{selectedSize}</strong>
                  </span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="flex items-center gap-1 text-[12px] font-semibold text-[#146AFF] hover:underline"
                  >
                    <Ruler className="h-3.5 w-3.5" />
                    <span>Size Guide</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[56px] rounded-[28px] border px-4 py-2 text-xs font-semibold transition-all ${
                        selectedSize === size
                          ? 'border-[#212121] bg-[#212121] text-white shadow-xs'
                          : 'border-[#DADADA] bg-white text-[#484848] hover:border-[#6FC341]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mt-4 flex items-center gap-3">
                <span className="text-xs font-semibold text-[#363636]">Quantity:</span>
                <div className="flex items-center rounded-xs border border-[#D4D4D4] bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2.5 py-1 text-xs text-[#575757] hover:bg-[#F8F8F8]"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold text-[#212121]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2.5 py-1 text-xs text-[#575757] hover:bg-[#F8F8F8]"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action CTA Buttons (Section 9.3: Add to Cart #6FC341, Buy Now #FF5924) */}
              <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xs bg-[#6FC341] py-3 text-xs font-bold uppercase tracking-wider text-white shadow-xs hover:bg-[#5bb32f] transition-colors"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>ADD TO CART</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xs bg-[#FF5924] py-3 text-xs font-bold uppercase tracking-wider text-white shadow-xs hover:bg-[#e64714] transition-colors"
                >
                  <Zap className="h-4 w-4" />
                  <span>BUY NOW</span>
                </button>
              </div>

              {/* Delivery Estimation / Pincode Checker (Per Section 8.5 in design.md) */}
              <div className="mt-6 rounded-md border border-[#E0E0E0] bg-white p-3.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#363636] block mb-2">
                  Delivery Options & COD
                </span>
                <form onSubmit={handlePincodeCheck} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={pincodeInput}
                    onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter Pincode"
                    className="flex-1 rounded-[6px] border border-[#E0E0E0] px-4 py-1.5 text-sm text-[#424242] font-[var(--font-heading)] leading-[21px] outline-none focus:border-[#146AFF]"
                  />
                  <button
                    type="submit"
                    className="rounded-xs bg-[#363636] px-4 py-1.5 text-xs font-semibold text-white hover:bg-black transition-colors shrink-0"
                  >
                    Check
                  </button>
                </form>

                {deliveryEstimate && (
                  <div className="mt-3 space-y-1 text-xs">
                    <p className="flex items-center gap-1.5 text-[#208833] font-semibold">
                      <Check className="h-3.5 w-3.5" />
                      <span>{deliveryEstimate}</span>
                    </p>
                    <p className="text-[11px] text-[#757575] pl-5">
                      • Cash on Delivery is available for this PIN code
                    </p>
                  </div>
                )}
              </div>

              {/* Special Offers Box */}
              <div className="mt-4 rounded-md border border-[#FFE082] bg-[#FFFDE7] p-3 text-xs text-[#575757]">
                <p className="font-bold text-[#E65100] flex items-center gap-1.5 mb-1">
                  <Tag className="h-3.5 w-3.5" /> Available Offers
                </p>
                <ul className="space-y-1 text-[11px]">
                  <li>
                    • Use coupon <strong className="text-[#212121]">FIRSTPUMPKIN</strong> for 15% off on first order.
                  </li>
                  <li>
                    • Extra 10% off with coupon <strong className="text-[#212121]">COTTON10</strong> on orders above ₹799.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* DETAILS, SPECIFICATIONS & REVIEWS TABS (Section 9.3 — 483px inner, padding: 20px 0) */}
        <div className="mt-12 border-t border-[#DADADA] pt-8">
          <div className="flex border-b border-[#DADADA] gap-6 text-sm font-semibold">
            {[
              { id: 'details', label: 'Product Description' },
              { id: 'specs', label: 'Specifications & Fabric' },
              { id: 'care', label: 'Wash & Care Instructions' },
              { id: 'reviews', label: `Customer Reviews (${product.reviewCount})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`pb-3 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#6FC341] text-[#212121]'
                    : 'border-transparent text-[#757575] hover:text-[#363636]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="py-6 text-xs text-[#575757] leading-relaxed">
            {activeTab === 'details' && (
              <div className="max-w-2xl space-y-4">
                <p className="text-sm text-[#363636] leading-relaxed">{product.description}</p>
                <div>
                  <h4 className="font-bold text-[#212121] mb-2 text-xs uppercase tracking-wider">
                    Key Features for Parents:
                  </h4>
                  <ul className="space-y-1.5">
                    {product.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 text-[#208833] shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="max-w-2xl">
                <table className="w-full text-left text-xs border border-[#F5F5F5]">
                  <tbody className="divide-y divide-[#F5F5F5]">
                    <tr className="bg-[#F8F8F8]">
                      <td className="p-3 font-semibold text-[#363636] w-1/3">Fabric Composition</td>
                      <td className="p-3 text-[#575757]">{product.fabric}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-[#363636]">Category</td>
                      <td className="p-3 text-[#575757] capitalize">{product.category} — {product.subcategory}</td>
                    </tr>
                    <tr className="bg-[#F8F8F8]">
                      <td className="p-3 font-semibold text-[#363636]">Season / Collection</td>
                      <td className="p-3 text-[#575757]">{product.season || 'All Season'}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-[#363636]">GOTS Certified Organic</td>
                      <td className="p-3 text-[#208833] font-medium">{product.isOrganic ? 'Yes, Certified' : 'Standard 100% Combed Cotton'}</td>
                    </tr>
                    <tr className="bg-[#F8F8F8]">
                      <td className="p-3 font-semibold text-[#363636]">SKU Number</td>
                      <td className="p-3 text-[#757575] font-mono">{product.sku}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-[#363636]">Country of Origin</td>
                      <td className="p-3 text-[#575757]">Made with pride in India</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="max-w-2xl space-y-3">
                <p className="text-xs font-semibold text-[#363636]">
                  Preserving Pure Cotton Softness:
                </p>
                <ul className="space-y-2">
                  {product.careInstructions.map((c, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E8F5E9] text-[11px] text-[#208833] font-bold">
                        {i + 1}
                      </span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {MOCK_REVIEWS.map((rev) => (
                    <div key={rev.id} className="rounded-md border border-[#DADADA] bg-[#F8F8F8] p-4">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex text-[#FF7043]">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3.5 w-3.5 ${
                                i < rev.rating ? 'fill-current' : 'text-[#D4D4D4]'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] text-[#757575]">{rev.date}</span>
                      </div>
                      <h5 className="font-bold text-[#212121] mb-1">{rev.title}</h5>
                      <p className="text-xs text-[#575757] leading-relaxed mb-3">&ldquo;{rev.comment}&rdquo;</p>
                      <div className="flex items-center justify-between text-[11px] text-[#757575] border-t border-[#E0E0E0] pt-2">
                        <span>{rev.author}</span>
                        <span className="text-[#208833] font-medium">✓ Verified Purchase</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RELATED PRODUCTS CAROUSEL (Section 9.3) */}
        <div className="mt-12 border-t border-[#DADADA] pt-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF7043]">
                SIMILAR FAVORITES
              </span>
              <h3 className="text-xl font-bold text-[#212121] mt-0.5">
                More in {product.category.toUpperCase()} & Organic Cotton
              </h3>
            </div>
            <Link href="/shop" className="text-xs font-semibold text-[#146AFF] hover:underline">
              See All Catalogue
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

