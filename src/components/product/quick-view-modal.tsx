'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/context/store-context';
import { X, Star, Heart, ShoppingBag, ArrowRight } from 'lucide-react';

export function QuickViewModal() {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsSizeGuideOpen,
  } = useStore();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!quickViewProduct) return null;

  const currentSize = selectedSize || quickViewProduct.sizes[0] || 'Default';
  const currentColor = selectedColor || quickViewProduct.colors[0]?.name || '';
  const wishlisted = isInWishlist(quickViewProduct.id);

  const handleAdd = () => {
    addToCart(quickViewProduct, currentSize, currentColor, quantity);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-md bg-white p-6 shadow-2xl border border-[#DADADA] max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 rounded-full p-1 text-[#757575] hover:bg-[#F8F8F8] hover:text-[#212121]"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Images */}
          <div>
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-md border border-[#E0E0E0] bg-[#F8F8F8]">
              <Image
                src={quickViewProduct.images[selectedImageIndex] || quickViewProduct.images[0]}
                alt={quickViewProduct.name}
                fill
                className="object-cover"
              />
            </div>
            {quickViewProduct.images.length > 1 && (
              <div className="mt-2.5 flex gap-2 overflow-x-auto">
                {quickViewProduct.images.map((img, i) => (
                  <button
                    key={img}
                    onClick={() => setSelectedImageIndex(i)}
                    className={`relative h-14 w-12 shrink-0 overflow-hidden rounded-xs border ${
                      selectedImageIndex === i ? 'border-[#6FC341] ring-1 ring-[#6FC341]' : 'border-[#E0E0E0]'
                    }`}
                  >
                    <Image src={img} alt="Thumb" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-xs font-medium text-[#146AFF]">{quickViewProduct.brand}</p>
              <h3 className="mt-1 text-base font-semibold text-[#212121] leading-snug">
                {quickViewProduct.name}
              </h3>

              {/* Rating */}
              <div className="mt-2 flex items-center gap-1.5 text-xs text-[#FF7043]">
                <div className="flex items-center">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  <span className="ml-1 font-bold">{quickViewProduct.rating.toFixed(1)}</span>
                </div>
                <span className="text-[#757575]">({quickViewProduct.reviewCount} parent reviews)</span>
              </div>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-xl font-bold text-[#212121]">₹{quickViewProduct.price}</span>
                {quickViewProduct.originalPrice > quickViewProduct.price && (
                  <>
                    <span className="text-xs text-[#959595] line-through">
                      MRP ₹{quickViewProduct.originalPrice}
                    </span>
                    <span className="text-xs font-bold text-[#DD5808]">
                      {quickViewProduct.discountPercent}% OFF
                    </span>
                  </>
                )}
              </div>
              <p className="text-[11px] text-[#757575]">Inclusive of all taxes • 100% Pure Cotton</p>

              {/* Color */}
              {quickViewProduct.colors.length > 0 && (
                <div className="mt-4">
                  <span className="text-xs font-medium text-[#484848] block mb-1.5">
                    Color: <strong className="text-[#212121]">{currentColor}</strong>
                  </span>
                  <div className="flex gap-2">
                    {quickViewProduct.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-all ${
                          currentColor === c.name
                            ? 'border-[#212121] bg-[#F8F8F8]'
                            : 'border-[#E0E0E0] hover:border-[#959595]'
                        }`}
                      >
                        <span
                          className="h-3 w-3 rounded-full border border-black/10"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span className="text-[11px]">{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-[#484848]">
                    Select Age / Size: <strong className="text-[#212121]">{currentSize}</strong>
                  </span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-[11px] text-[#146AFF] hover:underline"
                  >
                    Size Chart
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[48px] rounded-[28px] px-3 py-1.5 text-xs font-medium transition-all ${
                        currentSize === size
                          ? 'border border-[#212121] bg-[#212121] text-white'
                          : 'border border-[#DADADA] bg-white text-[#575757] hover:border-[#6FC341]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mt-4 flex items-center gap-3">
                <span className="text-xs font-medium text-[#484848]">Quantity:</span>
                <div className="flex items-center rounded-xs border border-[#D4D4D4]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2.5 py-1 text-xs hover:bg-[#F8F8F8]"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold text-[#212121]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2.5 py-1 text-xs hover:bg-[#F8F8F8]"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-[#F5F5F5] space-y-2.5">
              <div className="flex gap-2">
                <button
                  onClick={handleAdd}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xs bg-[#6FC341] py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#5bb32f] transition-colors"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Add to Bag</span>
                </button>
                <button
                  onClick={() => toggleWishlist(quickViewProduct)}
                  className={`flex items-center justify-center rounded-xs border px-3 py-2.5 transition-colors ${
                    wishlisted
                      ? 'border-[#FC3B3B] bg-[#FFF5F5] text-[#FC3B3B]'
                      : 'border-[#DADADA] text-[#575757] hover:border-[#FC3B3B]'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`h-4 w-4 ${wishlisted ? 'fill-[#FC3B3B]' : ''}`} />
                </button>
              </div>

              <Link
                href={`/product/${quickViewProduct.slug}`}
                onClick={() => setQuickViewProduct(null)}
                className="flex items-center justify-center gap-1 text-xs font-medium text-[#146AFF] hover:underline"
              >
                <span>View Full Product Details & Parent Reviews</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
