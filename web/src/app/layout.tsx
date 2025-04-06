import { Metadata, Viewport } from "next";
import { Rajdhani } from "next/font/google";

import "./_assets/globals.css";

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "BlockTx",
  description: "A Powerful Tool for Trading and Quantitative Strategies",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${rajdhani.variable} antialiased select-none`}
      >
        {children}
      </body>
    </html>
  );
}
