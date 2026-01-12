import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'أدعية رمضان – 30 يوم',
  description: 'مساحة هادئة للتأمل والدعاء والمشاركة',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cairo:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-cairo bg-background text-foreground antialiased overflow-x-hidden" suppressHydrationWarning>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
