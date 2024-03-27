import "@/components/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navigation } from "@/components/navigation/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pay It Forward",
  description: "Exhange platform for paper books ;)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
