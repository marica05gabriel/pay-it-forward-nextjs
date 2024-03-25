import "@/ui/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navigation } from "./ui/navigation/Navigation";
import { SideBar } from "./ui/navigation/sidebar/SideBar";

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
        <Navigation/>
        {children}
      </body>
    </html>
  );
}
