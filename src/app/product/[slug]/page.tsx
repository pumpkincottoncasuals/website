import React from 'react';
import { notFound } from 'next/navigation';
import { MOCK_PRODUCTS } from '@/data/products';
import { ProductDetailClient } from '@/components/product/product-detail-client';

export function generateStaticParams() {
  return MOCK_PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
