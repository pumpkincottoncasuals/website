'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { useStore } from '@/context/store-context';
import { Heart, Star, ShoppingBag, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { toggleWishlist, isInWishlist, addToCart, setQuickViewProduct } = useStore();
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Default');
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const wishlisted = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedSize);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  return (
    <div
      onMouseEnter={() => {
        setIsHovered(true);
        if (product.images.length > 1) setCurrentImageIndex(1);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImageIndex(0);
      }}
      className="group relative flex flex-col justify-between rounded-[5px] border border-[#DADADA] bg-white p-[6px] pb-[15px] transition-all hover:border-[#6FC341] hover:shadow-xs"
    >
      <div>
        {/* Product Image Container */}
        <div className="relative aspect-4/5 w-full overflow-hidden rounded-[4px] bg-[#F8F8F8]">
          <Link href={`/product/${product.slug}`} className="block h-full w-full">
            <Image
              src={product.images[currentImageIndex] || product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={priority}
              className="object-cover transition-transform duration-400 ease-out group-hover:scale-105"
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 pointer-events-none">
            {product.isOrganic && (
              <span className="rounded-xs bg-[#208833] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                🌱 100% Organic
              </span>
            )}
            {product.isNewArrival && !product.isOrganic && (
              <span className="rounded-xs bg-[#FF7043] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                New
              </span>
            )}
            {product.isBestSeller && (
              <span className="rounded-xs bg-[#07457D] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                Top Rated
              </span>
            )}
          </div>

          {/* Wishlist Heart Icon */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow-xs transition-colors hover:bg-white ${
              wishlisted ? 'text-[#FC3B3B]' : 'text-[#757575] hover:text-[#FC3B3B]'
            }`}
            title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-label="Wishlist"
          >
            <Heart className={`h-4 w-4 ${wishlisted ? 'fill-[#FC3B3B]' : ''}`} />
          </button>

          {/* Quick View Button on Hover */}
          {isHovered && (
            <button
              onClick={handleQuickView}
              className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-xs bg-white/95 px-3 py-1 text-[11px] font-medium text-[#363636] shadow-sm hover:bg-[#212121] hover:text-white transition-all animate-in fade-in duration-200"
            >
              <Eye className="h-3 w-3" /> Quick View
            </button>
          )}
        </div>

        {/* Product Details Section (Per Section 8.6 in design.md) */}
        <div className="mt-2.5 px-1">
          {/* Brand Name (12px SourceSansPro, #757575) */}
          <p className="text-[12px] font-normal leading-[16px] text-[#757575] truncate">
            {product.brand}
          </p>

          {/* Product Title (15px SourceSansPro, #484848) */}
          <Link
            href={`/product/${product.slug}`}
            className="mt-0.5 block text-[14px] sm:text-[15px] font-normal leading-[19px] text-[#484848] line-clamp-2 hover:text-[#146AFF] transition-colors"
            title={product.name}
          >
            {product.name}
          </Link>

          {/* Rating (12px RobotoLR, #FF7043) */}
          <div className="mt-1 flex items-center gap-1 text-[12px] text-[#FF7043]">
            <div className="flex items-center text-[#FF7043]">
              <Star className="h-3 w-3 fill-current" />
              <span className="ml-1 font-semibold text-[#FF7043]">{product.rating.toFixed(1)}</span>
            </div>
            <span className="text-[11px] text-[#959595]">({product.reviewCount})</span>
          </div>

          {/* Price Row (Sale #363636, Original #959595, Discount #DD5808) */}
          <div className="mt-2 flex items-baseline gap-2 flex-wrap">
            <span className="text-[16px] font-bold text-[#363636]">₹{product.price}</span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-[12px] text-[#959595] line-through">
                  ₹{product.originalPrice}
                </span>
                <span className="text-[12px] font-bold text-[#DD5808]">
                  {product.discountPercent}% OFF
                </span>
              </>
            )}
          </div>

          {/* Available Sizes selector chips */}
          <div className="mt-2 flex flex-wrap items-center gap-1">
            <span className="text-[10px] text-[#757575] mr-0.5">Size:</span>
            {product.sizes.slice(0, 4).map((size) => (
              <button
                key={size}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedSize(size);
                }}
                className={`rounded-[3px] px-1.5 py-0.5 text-[10px] font-medium transition-colors ${
                  selectedSize === size
                    ? 'bg-[#363636] text-white'
                    : 'border border-[#DADADA] bg-white text-[#575757] hover:border-[#6FC341]'
                }`}
              >
                {size}
              </button>
            ))}
            {product.sizes.length > 4 && (
              <span className="text-[9px] text-[#959595]">+{product.sizes.length - 4}</span>
            )}
          </div>
        </div>
      </div>

      {/* Add to Cart CTA (12px RobotoLR, #6FC341 green button, per Section 8.6) */}
      <div className="mt-3 px-1">
        <button
          onClick={handleQuickAdd}
          className="flex w-full items-center justify-center gap-1.5 rounded-[4px] bg-[#6FC341] py-2 text-[12px] font-medium text-white transition-colors hover:bg-[#5bb32f] active:scale-[0.98]"
        >
          <ShoppingBag className="h-3.5 w-3.5" />
          <span>Add to Bag ({selectedSize})</span>
        </button>
      </div>
    </div>
  );
}

