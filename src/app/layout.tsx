import type { Metadata } from 'next';
import { StoreProvider } from '@/context/store-context';
import { Header } from '@/components/common/header';
import { Footer } from '@/components/common/footer';
import { CartDrawer } from '@/components/common/cart-drawer';
import { LocationModal } from '@/components/common/location-modal';
import { SizeGuideModal } from '@/components/common/size-guide-modal';
import { QuickViewModal } from '@/components/product/quick-view-modal';
import { Toast } from '@/components/common/toast';
import { ClarityAnalytics } from '@/components/analytics/clarity';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pumkin Cotton Casuals | 100% Pure Organic Cotton Kids Clothing',
  description:
    'Shop the finest 100% pure combed cotton children wear inspired by FirstCry design standards. Breathable frocks, rompers, polo sets, and organic infant essentials.',
  keywords:
    'kids clothing, cotton frocks, baby rompers, organic cotton clothes, boys casual sets, childrens fashion, toddler clothing india',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans bg-white text-[#363636]">
        <StoreProvider>
          <Header />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
          <CartDrawer />
          <LocationModal />
          <SizeGuideModal />
          <QuickViewModal />
          <Toast />
          <ClarityAnalytics />
        </StoreProvider>
      </body>
    </html>
  );
}
