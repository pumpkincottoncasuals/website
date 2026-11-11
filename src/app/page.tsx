'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MOCK_PRODUCTS, CATEGORIES_LIST, MOCK_REVIEWS } from '@/data/products';
import { ProductCard } from '@/components/product/product-card';
import { useStore } from '@/context/store-context';
import {
  ArrowRight,
  Clock,
  ChevronLeft,
  ChevronRight,
  Star,
  CheckCircle,
} from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 1,
    title: 'Pure Organic Cotton Summer Collection',
    tagline: 'FEATHER-LIGHT • BREATHABLE • ZERO IRRITATION',
    description: 'Designed exclusively for tender baby & kids skin. Made with 100% combed organic cotton to beat the heat.',
    ctaText: 'Explore Collection',
    ctaLink: '/shop?category=girls',
    secondaryCtaText: 'Shop Boys (0-14Y)',
    secondaryCtaLink: '/shop?category=boys',
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=1200&auto=format&fit=crop&q=80',
    badge: 'NEW SUMMER LAUNCH',
    discount: 'UP TO 50% OFF',
  },
  {
    id: 2,
    title: 'Newborn Muslin & Cotton Essentials',
    tagline: 'CLOUD-SOFT GOTS CERTIFIED FABRICS',
    description: 'Envelope necklines, safe snaps, and natural mulmul weave crafted with love for delicate beginnings.',
    ctaText: 'Shop Infant Essentials',
    ctaLink: '/shop?category=baby',
    secondaryCtaText: 'View Organic Sets',
    secondaryCtaLink: '/shop?organic=true',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&auto=format&fit=crop&q=80',
    badge: 'PEDIATRICIAN APPROVED',
    discount: 'PACKS FROM ₹499',
  },
  {
    id: 3,
    title: 'Hand-Block & Festive Cotton Sets',
    tagline: 'TRADITIONAL CHARM WITH MODERN COMFORT',
    description: 'Festive peplum tops, matching palazzos, and crisp mandarin collar shirts crafted in pure cotton slub.',
    ctaText: 'Shop Festive Boutique',
    ctaLink: '/boutique/new-arrivals-up-to-14y',
    secondaryCtaText: 'View Best Sellers',
    secondaryCtaLink: '/shop',
    image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?w=1200&auto=format&fit=crop&q=80',
    badge: 'BOUTIQUE EDITION',
    discount: 'FLAT 40% OFF',
  },
];

export default function Home() {
  const { showToast } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState<'all' | 'girls' | 'boys' | 'baby' | 'organic'>('all');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Flash sale countdown timer simulation
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 48 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Slide carousel auto-rotation
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(slideInterval);
  }, []);

  const filteredProducts = activeTab === 'all'
    ? MOCK_PRODUCTS
    : activeTab === 'organic'
    ? MOCK_PRODUCTS.filter((p) => p.isOrganic)
    : MOCK_PRODUCTS.filter((p) => p.category === activeTab);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address');
      return;
    }
    setIsSubscribed(true);
    showToast('🎉 Thank you! Check your inbox for 15% discount code FIRSTPUMPKIN');
  };

  return (
    <div className="flex flex-col w-full bg-white">
      {/* 1. HERO BANNER CAROUSEL (0.4s ease transitions per Section 7.1) */}
      <section className="relative w-full overflow-hidden bg-[#F8F8F8] border-b border-[#DADADA]">
        <div className="relative mx-auto max-w-[1280px]">
          {HERO_SLIDES.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={slide.id}
                className={`transition-opacity duration-400 ease ${
                  isActive ? 'block opacity-100' : 'hidden opacity-0'
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 items-center min-h-[380px] sm:min-h-[440px] px-6 lg:px-12 py-8 gap-8">
                  {/* Left Content */}
                  <div className="flex flex-col items-start z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="rounded-xs bg-[#FF7043] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                        {slide.badge}
                      </span>
                      <span className="text-[11px] font-bold text-[#DD5808]">
                        {slide.discount}
                      </span>
                    </div>

                    <span className="text-xs font-bold uppercase tracking-wider text-[#757575] mb-1">
                      {slide.tagline}
                    </span>

                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#212121] leading-tight tracking-tight mb-3">
                      {slide.title}
                    </h1>

                    <p className="text-sm text-[#575757] leading-relaxed max-w-md mb-6">
                      {slide.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                      <Link
                        href={slide.ctaLink}
                        className="inline-flex items-center gap-2 rounded-xs bg-[#6FC341] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs hover:bg-[#5bb32f] transition-colors"
                      >
                        <span>{slide.ctaText}</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href={slide.secondaryCtaLink}
                        className="inline-flex items-center rounded-xs border border-[#363636] bg-transparent px-4 py-2.5 text-xs font-semibold text-[#363636] hover:bg-white transition-colors"
                      >
                        {slide.secondaryCtaText}
                      </Link>
                    </div>
                  </div>

                  {/* Right Image */}
                  <div className="relative h-[280px] sm:h-[360px] w-full rounded-md overflow-hidden border border-[#DADADA] shadow-xs">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      priority={index === 0}
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            );
          })}

          {/* Carousel navigation arrows */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-[#363636] shadow-sm hover:bg-white transition-all"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-[#363636] shadow-sm hover:bg-white transition-all"
            aria-label="Next Slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Carousel dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2 rounded-full transition-all ${
                  i === currentSlide ? 'w-6 bg-[#6FC341]' : 'w-2 bg-[#D4D4D4]'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. CIRCULAR CATEGORY GRID (Section 9.1 in design.md — 50% radius icons, 24px subheading) */}
      <section className="py-8 bg-white border-b border-[#F5F5F5]">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-6 pb-2 border-b border-[#F5F5F5]">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF7043]">
                DISCOVER COLLECTIONS
              </span>
              <h2 className="text-[24px] font-normal text-[#363636] leading-[28px] mt-0.5">
                Shop by Children&apos;s Category
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs font-semibold text-[#146AFF] hover:underline flex items-center gap-1 mt-2 sm:mt-0"
            >
              <span>Explore All Categories</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-6">
            {CATEGORIES_LIST.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.id}`}
                className="group flex flex-col items-center text-center"
              >
                {/* 50% radius circular icon container per Section 5 */}
                <div className="relative h-20 w-20 sm:h-28 sm:w-28 overflow-hidden rounded-full border-2 border-[#DADADA] bg-[#F8F8F8] p-1 transition-all duration-300 group-hover:border-[#6FC341] group-hover:scale-105">
                  <div className="relative h-full w-full overflow-hidden rounded-full">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <span className="mt-2.5 text-[14px] font-medium text-[#363636] group-hover:text-[#146AFF] transition-colors leading-tight">
                  {cat.name}
                </span>
                <span className="text-[11px] text-[#757575] mt-0.5">{cat.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FLASH DEAL OF THE DAY COUNTDOWN BANNER */}
      <section className="bg-gradient-to-r from-[#FFF3E0] via-[#FFE0B2] to-[#FFCCBC] py-4 border-y border-[#FFE082]">
        <div className="mx-auto flex max-w-[1280px] flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF7043] text-white">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#D84315] uppercase tracking-wide">
                  ⚡ Deal of the Day
                </span>
                <span className="rounded-xs bg-[#FC3B3B] px-1.5 py-0.2 text-[10px] font-bold text-white">
                  Limited Time
                </span>
              </div>
              <p className="text-xs text-[#575757]">
                Extra 15% OFF on pure organic cotton sets with code <strong className="text-[#212121]">FIRSTPUMPKIN</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-[#212121]">
            <span className="text-[11px] uppercase tracking-wider text-[#757575]">Ends in:</span>
            <div className="flex items-center gap-1">
              <span className="rounded-xs bg-[#212121] px-2 py-1 text-white font-mono">
                {String(timeLeft.hours).padStart(2, '0')}h
              </span>
              <span>:</span>
              <span className="rounded-xs bg-[#212121] px-2 py-1 text-white font-mono">
                {String(timeLeft.minutes).padStart(2, '0')}m
              </span>
              <span>:</span>
              <span className="rounded-xs bg-[#212121] px-2 py-1 text-white font-mono text-[#FF7043]">
                {String(timeLeft.seconds).padStart(2, '0')}s
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS & TABS SECTION (Section 9.1 — 15px SourceSansPro body) */}
      <section className="py-10 bg-white">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 pb-3 border-b border-[#D4D4D4] gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#208833]">
                HANDPICKED FOR COMFORT
              </span>
              <h2 className="text-[24px] font-normal text-[#363636] leading-[28px] mt-0.5">
                Featured Cotton Casuals
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              {[
                { id: 'all', label: 'All Items' },
                { id: 'girls', label: 'Girls Frocks' },
                { id: 'boys', label: 'Boys Sets' },
                { id: 'baby', label: 'Infant Rompers' },
                { id: 'organic', label: '🌱 100% Organic' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`rounded-xs px-3.5 py-1.5 font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#363636] text-white shadow-xs'
                      : 'border border-[#DADADA] bg-white text-[#575757] hover:border-[#6FC341]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4-column product grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.slice(0, 8).map((product, idx) => (
              <ProductCard key={product.id} product={product} priority={idx < 4} />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-xs border border-[#363636] bg-white px-8 py-2.5 text-xs font-bold uppercase tracking-wider text-[#363636] hover:bg-[#363636] hover:text-white transition-colors"
            >
              <span>View Full Catalogue ({MOCK_PRODUCTS.length} Outfits)</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. BOUTIQUE SPOTLIGHT BANNER */}
      <section className="bg-[#FAF8F5] py-10 border-y border-[#DADADA]">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-16/10 w-full overflow-hidden rounded-md border border-[#DADADA]">
              <Image
                src="https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=900&auto=format&fit=crop&q=80"
                alt="Boutique Fashion"
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4 rounded-xs bg-[#FF7043] px-2.5 py-1 text-xs font-bold text-white uppercase">
                Boutique Exclusive
              </div>
            </div>

            <div className="flex flex-col items-start">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#07457D]">
                PREMIUM FABRIC STANDARD
              </span>
              <h3 className="mt-1 text-2xl font-bold text-[#212121]">
                Boutique Cotton Arrivals Up to 14 Years
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#575757]">
                Experience high-thread count combed cotton spun from long-staple Indian cotton.
                Engineered for zero lint, skin breathability, and vibrant wash-fast organic botanical dyes.
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3 w-full text-xs text-[#363636]">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#208833] shrink-0" />
                  <span>Azo-free skin-safe dyes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#208833] shrink-0" />
                  <span>Double-needle hem stitch</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#208833] shrink-0" />
                  <span>Preshrunk cotton fabric</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#208833] shrink-0" />
                  <span>Zero scratching tagless neck</span>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <Link
                  href="/boutique/new-arrivals-up-to-14y"
                  className="rounded-xs bg-[#6FC341] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#5bb32f] transition-colors"
                >
                  Explore Boutique
                </Link>
                <Link
                  href="/about"
                  className="text-xs font-semibold text-[#146AFF] hover:underline"
                >
                  Learn About Our Cotton →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PARENT REVIEWS & TESTIMONIALS */}
      <section className="py-10 bg-white border-b border-[#F5F5F5]">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF7043]">
              LOVED BY FAMILIES
            </span>
            <h2 className="text-[24px] font-normal text-[#363636] leading-[28px] mt-0.5">
              Verified Parent Reviews
            </h2>
            <p className="text-xs text-[#757575] mt-1">
              Over 2,50,000+ satisfied mothers & fathers across India trust Pumkin Cotton Casuals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {MOCK_REVIEWS.map((review) => (
              <div
                key={review.id}
                className="flex flex-col justify-between rounded-[5px] border border-[#DADADA] bg-[#FFFFFF] p-4 text-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex text-[#FF7043]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${
                            i < review.rating ? 'fill-current' : 'text-[#D4D4D4]'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-[#208833] font-semibold">✓ Verified Buyer</span>
                  </div>
                  <h4 className="font-semibold text-[#212121] mb-1 leading-snug">{review.title}</h4>
                  <p className="text-[#575757] leading-relaxed text-[11px] line-clamp-4">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F5F5F5]">
                  <p className="font-medium text-[#363636]">{review.author}</p>
                  <p className="text-[10px] text-[#959595]">{review.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. NEWSLETTER SIGNUP BANNER (Section 8.3 & Section 9.1 — bg: #D9F3F4, Green CTA button) */}
      <section className="bg-[#D9F3F4] py-8 border-t border-[#B2EBF2]">
        <div className="mx-auto max-w-[1012px] px-4 text-center">
          <span className="rounded-xs bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#07457D] shadow-2xs">
            Join The Pumkin Club
          </span>
          <h3 className="mt-2 text-xl font-bold text-[#212121]">
            Get 15% OFF on Your First Pure Cotton Order
          </h3>
          <p className="mt-1 text-xs text-[#484848] max-w-md mx-auto">
            Subscribe for secret flash sales, pediatric-safe fabric tips, and new seasonal arrivals.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="mt-4 flex max-w-md mx-auto gap-2">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full rounded-[3px] border border-white bg-white px-3 py-2 text-xs text-[#363636] outline-none placeholder-[#959595] focus:border-[#146AFF]"
              disabled={isSubscribed}
            />
            {/* Green Subscribe button per Section 8.3 in design.md */}
            <button
              type="submit"
              disabled={isSubscribed}
              className="inline-block rounded-xs bg-[#6FC341] px-5 py-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-white border-none hover:bg-[#5fb535] transition-colors shrink-0 disabled:bg-[#9E9E9E]"
            >
              {isSubscribed ? 'Subscribed!' : 'Subscribe'}
            </button>
          </form>

          {isSubscribed && (
            <p className="mt-2 text-xs text-[#208833] font-medium">
              ✓ Promo code <strong className="font-bold">FIRSTPUMPKIN</strong> has been activated for your bag!
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
