import { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";

import "./_assets/globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "BlockTx",
  description: "A Powerful Tool for Trading and Quantitative Strategies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} ${rajdhani.variable} antialiased select-none`}
      >
        {children}
      </body>
    </html>
  );
}
