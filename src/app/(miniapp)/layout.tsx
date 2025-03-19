"use client";

import { useLaunchParams } from "@/hooks/useLaunchParams";

export default function MiniAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lp = useLaunchParams();

  console.log(lp);

  return (
    <div>{children}</div>
  );
}
