"use client";

import { usePathname } from 'next/navigation';
import { routes } from "@/app/_routes";

export const useRoute = () => {
  const pathname = usePathname();
  return routes.find(route => route.path === pathname)!;
};