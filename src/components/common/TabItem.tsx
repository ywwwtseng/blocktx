"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Typography } from "@/components/ui/Typography";


interface TabItemProps {
  icon: {
    element: React.ElementType;
    color: {
      active: string;
      default: string;
    };
  };
  href: string;
  i18n: string;
}

export function TabItem({ icon, href, i18n }: TabItemProps) {
  const pathname = usePathname();
  const Icon = icon.element;

  return (
    <div className="flex items-center justify-center w-[52px] h-[52px] rounded-[4px]">

      <Link
        className="w-[40px] flex flex-col items-center gap-0.5 opacity-100 group duration-150"
        href={href}
      >
        {<Icon className="w-6 h-6" color={pathname === href ? icon.color.active : icon.color.default} />}
        <Typography
          color={pathname === href ? "white" : "#7C7C7C"}
          noWrap
          capitalize
          size="2"
          weight={500}
          i18n={i18n} />
      </Link>
    </div>
  );
}
