import React from 'react';
import Link from 'next/link';
import { MOCK_PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/product/product-card';
import { Sparkles, ShieldCheck, Heart } from 'lucide-react';

export function generateStaticParams() {
  return [
    { slug: 'new-arrivals-up-to-14y' },
    { slug: 'organic-cotton' },
  ];
}

export default async function BoutiquePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await params;

  return (
    <div className="w-full bg-white pb-16">
      {/* Boutique Header (Per Section 9.2 in design.md) */}
      <div className="border-b border-[#DADADA] bg-gradient-to-r from-[#FFF5F2] via-[#FDFBF7] to-[#F0FDF4] py-8">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <div className="flex items-center gap-1.5 text-xs text-[#757575] mb-2 font-normal">
            <Link href="/" className="hover:text-[#146AFF]">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-[#146AFF]">Boutiques</Link>
            <span>/</span>
            <span className="text-[#363636] font-medium">New Arrivals | Up to 14Y</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-xs bg-[#FF7043] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  Curated Boutique
                </span>
                <span className="text-xs text-[#208833] font-semibold flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" /> 100% Combed & GOTS Cotton
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#212121] mt-2">
                New Arrivals | up to 14Y Casuals
              </h1>
              <p className="text-sm text-[#575757] mt-1 max-w-xl">
                Boutique hand-crafted dresses, tiered frocks, and casual sets in delicate cotton cambric and slub weave for toddlers to teens.
              </p>
            </div>

            <div className="rounded-md border border-[#FFE0B2] bg-[#FFF8E1] p-3 text-xs text-[#5D4037] max-w-xs shadow-2xs">
              <p className="font-semibold text-[#E65100] flex items-center gap-1">
                <Sparkles className="h-4 w-4" /> Boutique Launch Offer
              </p>
              <p className="mt-0.5 text-[11px]">
                Use coupon <strong className="text-[#212121]">COTTON10</strong> at checkout for extra 10% off on all boutique styles!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Boutique Catalogue Grid */}
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 pt-8">
        <div className="flex items-center justify-between border-b border-[#DADADA] pb-3 mb-6 text-xs text-[#575757]">
          <span>
            Showing <strong className="text-[#363636]">{MOCK_PRODUCTS.length}</strong> exclusive boutique pieces
          </span>
          <div className="flex items-center gap-1 text-[#208833] font-medium">
            <Heart className="h-3.5 w-3.5" /> Handpicked by Pumkin Stylists
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
