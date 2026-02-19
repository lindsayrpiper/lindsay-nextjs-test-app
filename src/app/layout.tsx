import type { Metadata } from "next";
import { Lora, Nunito } from "next/font/google";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Horse Yearbook",
  description: "Happy Year of the Horse! Add your horse to the yearbook.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lora.variable} ${nunito.variable} antialiased`}
      >
        <header className="w-full py-4 text-center border-b-2 border-[var(--accent)]">
          <a href="/">
            <h1 className="text-3xl font-bold tracking-wide text-[var(--brand)]">
              Horse Yearbook
            </h1>
          </a>
        </header>
        <main className="flex flex-col items-center justify-center min-h-[calc(100vh-73px)] px-4">
          {children}
        </main>
      </body>
    </html>
  );
}
