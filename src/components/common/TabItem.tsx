"use client";

import { useState } from "react";
import { postEvent } from "@telegram-apps/sdk-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { I18nTypography } from "@/components/common/I18nTypography";
import { BaseButton } from "@/components/ui/BaseButton";

interface TabItemProps {
  icon: {
    element: React.ElementType;
    color: {
      active: string;
      default: string;
    };
  };
  href?: string;
  i18n: string;
  onClick?: () => void;
}

export function TabItem({ icon, href, i18n, onClick }: TabItemProps) {
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();
  const Icon = icon.element;

  const children = (
    <>
      <Icon
        className="w-6 h-6 transition-transform origin-center duration-200"
        color={pathname === href || isActive ? icon.color.active : icon.color.default}
      />
      <I18nTypography
        variant="text"
        color={pathname === href || isActive ? "white" : "#7C7C7C"}
        noWrap size={2}
        weight={500}
        i18n={i18n}
      />
    </>
  );

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
      {href ? (
        <Link
          className="w-[40px] flex flex-col items-center gap-0.5 opacity-100 group duration-150"
          href={href}
        >
          {children}
        </Link>
      ) : (
        <BaseButton
          className="w-[40px] flex flex-col items-center gap-0.5 opacity-100 group duration-150"
          onClick={onClick}
        >
          {children}
        </BaseButton>
      )}
    </div>
  );
}
