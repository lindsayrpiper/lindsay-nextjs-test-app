import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Build-a-Horse",
  description: "Create your dream horse",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="w-full py-4 text-center border-b-2 border-[var(--accent)]">
          <h1 className="text-3xl font-bold tracking-wide text-[var(--brand)]">
            Build-a-Horse
          </h1>
        </header>
        <main className="flex flex-col items-center justify-center min-h-[calc(100vh-73px)] px-4">
          {children}
        </main>
      </body>
    </html>
  );
}
