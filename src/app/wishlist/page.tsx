'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/context/store-context';
import { Heart, Trash2, ShoppingBag, ArrowRight, Star } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});

  const handleMoveToBag = (product: typeof wishlist[0]['product']) => {
    const size = selectedSizes[product.id] || product.sizes[0] || 'Default';
    addToCart(product, size);
  };

  if (wishlist.length === 0) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-[1012px] flex-col items-center justify-center px-4 py-16 text-center">
        <div className="mb-4 rounded-full bg-[#FFF5F5] p-6 border border-[#FFCDD2]">
          <Heart className="h-12 w-12 text-[#FC3B3B]" />
        </div>
        <h1 className="text-2xl font-bold text-[#212121]">Your Wishlist is Empty</h1>
        <p className="mt-2 text-xs sm:text-sm text-[#757575] max-w-sm">
          Save your favorite pure cotton frocks, rompers, and play sets to buy later or track when they go on offer.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-flex items-center gap-2 rounded-xs bg-[#6FC341] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#5bb32f] transition-colors"
        >
          <span>Explore Cotton Catalogue</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-white py-8">
      <div className="mx-auto max-w-[1012px] px-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#DADADA] pb-4 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#212121]">
              My Wishlist ({wishlist.length} {wishlist.length === 1 ? 'Item' : 'Items'})
            </h1>
            <p className="text-xs text-[#757575] mt-0.5">
              Saved items are synced with your shopping bag
            </p>
          </div>
          <Link
            href="/shop"
            className="text-xs font-semibold text-[#146AFF] hover:underline flex items-center gap-1"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlist.map(({ product }) => {
            const currentSize = selectedSizes[product.id] || product.sizes[0] || 'Default';
            return (
              <div
                key={product.id}
                className="group relative flex flex-col justify-between rounded-[5px] border border-[#DADADA] bg-white p-[6px] pb-[12px] transition-all hover:border-[#6FC341]"
              >
                <div>
                  {/* Image */}
                  <div className="relative aspect-4/5 w-full overflow-hidden rounded-[4px] bg-[#F8F8F8]">
                    <Link href={`/product/${product.slug}`} className="block h-full w-full">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </Link>

                    {/* Remove Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow-xs text-[#FC3B3B] hover:bg-white"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="mt-2.5 px-1">
                    <p className="text-[12px] text-[#757575] truncate">{product.brand}</p>
                    <Link
                      href={`/product/${product.slug}`}
                      className="mt-0.5 block text-xs sm:text-sm font-semibold text-[#363636] hover:text-[#146AFF] line-clamp-1"
                    >
                      {product.name}
                    </Link>

                    <div className="mt-1 flex items-center gap-1 text-[11px] text-[#FF7043]">
                      <Star className="h-3 w-3 fill-current" />
                      <span className="font-semibold">{product.rating.toFixed(1)}</span>
                      <span className="text-[#959595]">({product.reviewCount})</span>
                    </div>

                    <div className="mt-1.5 flex items-baseline gap-2">
                      <span className="text-sm font-bold text-[#363636]">₹{product.price}</span>
                      {product.originalPrice > product.price && (
                        <>
                          <span className="text-xs text-[#959595] line-through">
                            ₹{product.originalPrice}
                          </span>
                          <span className="text-[11px] font-bold text-[#DD5808]">
                            {product.discountPercent}% OFF
                          </span>
                        </>
                      )}
                    </div>

                    {/* Size Selector */}
                    <div className="mt-2 flex items-center gap-1 overflow-x-auto">
                      <span className="text-[10px] text-[#757575] mr-1">Size:</span>
                      {product.sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedSizes({ ...selectedSizes, [product.id]: s })}
                          className={`rounded-xs px-1.5 py-0.5 text-[10px] font-medium transition-colors ${
                            currentSize === s
                              ? 'bg-[#363636] text-white'
                              : 'border border-[#DADADA] text-[#575757] hover:border-[#6FC341]'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Move to Cart */}
                <div className="mt-3 px-1">
                  <button
                    onClick={() => handleMoveToBag(product)}
                    className="flex w-full items-center justify-center gap-1.5 rounded-xs bg-[#6FC341] py-2 text-xs font-bold uppercase text-white hover:bg-[#5bb32f] transition-colors"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" />
                    <span>Move to Bag ({currentSize})</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

