import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import PublicLayout from '@/components/PublicLayout';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Kantor Hukum FIGE & Rekan | Advokat & Konsultan Hukum',
  description: 'Kantor Hukum FIGE & Rekan (GERI SH, MH) memberikan layanan hukum profesional, terpercaya, dan berdedikasi untuk melindungi hak-hak Anda.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable}`}>
        <Providers>
          <PublicLayout>
            {children}
          </PublicLayout>
        </Providers>
      </body>
    </html>
  );
}
