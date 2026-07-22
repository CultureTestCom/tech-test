import type { Metadata } from "next";
import { Geist, Libre_Baskerville } from "next/font/google";
import "./globals.css";

const GeistFont = Geist({ subsets: ["latin"], variable: "--font-geist" });
const LibreBaskervilleFont = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre-baskerville",
});

export const metadata: Metadata = {
  title: "CultureTest",
  description: "Behavioural screen results",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={`antialiased ${GeistFont.variable} ${LibreBaskervilleFont.variable}`}>
      <body className='min-h-screen bg-neutral-50 font-sans text-neutral-800'>{children}</body>
    </html>
  );
}
