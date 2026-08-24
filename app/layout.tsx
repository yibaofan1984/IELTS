import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '雅思词汇真经 · 默写练习',
  description: '按《雅思词汇真经》单元练习默写，支持发音提示与错词本。',
  openGraph: {
    title: '雅思词汇真经 · 默写练习',
    description: '按 Chapter 默写，提供中文与发音提示，答错自动加入专属错词本。',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: '雅思词汇真经默写练习' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '雅思词汇真经 · 默写练习',
    description: '按 Chapter 默写，提供中文与发音提示，答错自动加入专属错词本。',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN"><body>{children}</body></html>
  );
}
