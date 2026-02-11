import type { Metadata } from 'next';
import { Inter, Noto_Serif_SC, Ma_Shan_Zheng } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const notoSerifSC = Noto_Serif_SC({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-noto-serif-sc',
});

const maShanZheng = Ma_Shan_Zheng({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-ma-shan-zheng',
});

export const metadata: Metadata = {
  title: 'Imlek Greeting Generator - Year of the Fire Horse 2026',
  description: 'Imlek greetings with fire horse',
  keywords: ['Imlek', 'Chinese New Year', 'Fire Horse', 'Greeting Card', '2026'],
  openGraph: {
    type: 'website',
    title: 'Imlek Greeting Generator - Year of the Fire Horse 2026',
    description: 'Create beautiful animated Imlek greetings with fire horse themes.',
    images: ['/favicon.ico'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSerifSC.variable} ${maShanZheng.variable}`}>
      <body className="font-inter antialiased bg-gray-900">{children}</body>
    </html>
  );
}
