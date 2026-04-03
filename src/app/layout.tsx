import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import { AppProvider } from "@/lib/store";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "TeamUp | Найди свою команду за секунды",
  description: "TeamUp — платформа для поиска тиммейтов и общения в любимых играх",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <AppProvider>
          <div className="fixed inset-0 bg-[#050505] -z-10">
            <div className="absolute inset-0 neon-grid opacity-20"></div>
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-neon-purple opacity-10 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-neon-green opacity-10 blur-[120px] rounded-full"></div>
          </div>
          <Header />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
