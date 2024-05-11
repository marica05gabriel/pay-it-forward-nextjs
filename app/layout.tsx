import '@/components/globals.css';
import { Navigation } from '@/components/navigation/Navigation';
import { ThirdWebContextProvider } from '@/utils/context-providers';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pay It Forward',
  description: 'Exhange platform for paper books ;)',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ThirdWebContextProvider>
          <Navigation />
          <div id='page-container'>{children}</div>
        </ThirdWebContextProvider>
      </body>
    </html>
  );
}
