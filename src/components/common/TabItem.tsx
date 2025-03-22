"use client";

import { useState } from "react";
import clsx from "clsx";
import { postEvent } from "@telegram-apps/sdk";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { I18nTypography } from "@/components/common/I18nTypography";


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
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();
  const Icon = icon.element;

  return (
    <div
      className="flex items-center justify-center w-[52px] h-[52px] rounded-[4px]"
      onClick={() => {
        if (pathname === href) return;

        postEvent("web_app_trigger_haptic_feedback", {
          type: "impact",
          impact_style: "light",
        });

        setIsActive(true);
        setTimeout(() => {
          setIsActive(false);
        }, 200);
      }}
    >
      <Link
        className="w-[40px] flex flex-col items-center gap-0.5 opacity-100 group duration-150"
        href={href}
      >
        {<Icon className={clsx("w-6 h-6 transition-transform origin-center duration-200", isActive && "scale-110")} color={pathname === href ? icon.color.active : icon.color.default} />}
        <I18nTypography
          variant="text"
          color={pathname === href ? "white" : "#7C7C7C"}
          noWrap
          size={2}
          weight={500}
          i18n={i18n}
        />
      </Link>
    </div>
  );
}
