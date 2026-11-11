import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Heart, Leaf, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="w-full bg-white pb-16">
      {/* Hero */}
      <div className="border-b border-[#DADADA] bg-gradient-to-r from-[#FFF8E7] via-[#F8F9FA] to-[#E8F5E9] py-12">
        <div className="mx-auto max-w-[1012px] px-4 text-center">
          <span className="rounded-xs bg-[#208833] px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-white">
            Our Brand Philosophy
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#212121]">
            Why Pumkin Cotton Casuals?
          </h1>
          <p className="mt-3 text-sm text-[#575757] max-w-2xl mx-auto leading-relaxed">
            Children explore the world through movement, touch, and play. We believe their clothing should be as gentle as a mother&apos;s touch — 100% pure combed cotton, free from toxic chemicals, scratchy labels, and stiff fabrics.
          </p>
        </div>
      </div>

      {/* 3 Pillars */}
      <div className="mx-auto max-w-[1012px] px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-md border border-[#DADADA] p-6 text-center hover:border-[#6FC341] transition-colors">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#E8F5E9] text-[#208833]">
              <Leaf className="h-7 w-7" />
            </div>
            <h3 className="text-base font-bold text-[#212121] mb-2">100% Pure Combed Cotton</h3>
            <p className="text-xs text-[#575757] leading-relaxed">
              We eliminate short, scratchy fibers through a mechanical combing process, leaving only long-staple cotton threads that feel like clouds against delicate skin.
            </p>
          </div>

          <div className="rounded-md border border-[#DADADA] p-6 text-center hover:border-[#6FC341] transition-colors">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF3E0] text-[#FF7043]">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <h3 className="text-base font-bold text-[#212121] mb-2">Azo-Free Baby-Safe Dyes</h3>
            <p className="text-xs text-[#575757] leading-relaxed">
              All prints and pastel colors are dyed using certified non-toxic water-based organic pigments that will not trigger allergic reactions or skin rashes.
            </p>
          </div>

          <div className="rounded-md border border-[#DADADA] p-6 text-center hover:border-[#6FC341] transition-colors">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#E1F5FE] text-[#146AFF]">
              <Heart className="h-7 w-7" />
            </div>
            <h3 className="text-base font-bold text-[#212121] mb-2">Engineered for Playtime</h3>
            <p className="text-xs text-[#575757] leading-relaxed">
              From tagless necks to soft covered elastics and double-stitched hems, every stitch is crafted to withstand endless playground adventures and machine washes.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="mt-12 rounded-lg border border-[#DADADA] bg-[#FAF8F5] p-6 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF7043]">
                FROM OUR WORKSHOP TO YOUR HOME
              </span>
              <h2 className="text-2xl font-bold text-[#212121] mt-1 mb-3">
                Crafted by Indian Artisans
              </h2>
              <p className="text-xs text-[#575757] leading-relaxed mb-4">
                Pumkin Cotton Casuals was born when two parents found themselves frustrated with synthetic blends, scratchy tags, and dull prints available in ordinary kids stores.
              </p>
              <p className="text-xs text-[#575757] leading-relaxed mb-4">
                We partnered directly with heritage cotton textile mills in Tamil Nadu and Gujarat to weave breathable mulmul, single jersey knits, and durable cotton twills made specifically for tropical climates.
              </p>

              <div className="space-y-2 text-xs text-[#363636]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#208833]" />
                  <span>Proudly Made in India with ethical labor practices</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#208833]" />
                  <span>Plastic-free biodegradable cotton packaging</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#208833]" />
                  <span>7-Day doorstep exchange guarantee across 20,000+ PIN codes</span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 rounded-xs bg-[#6FC341] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#5bb32f] transition-colors"
                >
                  <span>Explore Our Collections</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="relative aspect-4/3 w-full rounded-md overflow-hidden border border-[#DADADA]">
              <Image
                src="https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=800&auto=format&fit=crop&q=80"
                alt="Happy Kids in Cotton"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
