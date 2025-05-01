"use client";

import { useState } from "react";
import { postEvent } from "@telegram-apps/sdk-react";
import { usePathname, useRouter } from "next/navigation";
import { useClientOnce } from "@/hooks/useClientOnce";

import { I18nTypography } from "./I18nTypography";
import { BaseButton } from "../ui/BaseButton";

interface TabProps {
  icon: React.ElementType;
  i18n: string;
  href?: string;
  onClick?: () => void
}

export function Tab({ icon: Icon, i18n, href, onClick }: TabProps) {
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useClientOnce(() => {
    if (href) {
      router.prefetch(href);
    }
  });

  return (
    <BaseButton
      className="w-[52px] h-[52px] flex flex-col items-center gap-0.5 opacity-100 group duration-150"
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

        if (href) {
          router.push(href);
        } else {
          onClick?.();
        }
      }}
    >
      <Icon
        className="w-6 h-6 transition-transform origin-center duration-200"
        color={pathname === href || isActive ? "white" : "#7c7c7c"}
      />
      <I18nTypography
        variant="text"
        color={pathname === href || isActive ? "white" : "#7c7c7c"}
        noWrap size={2}
        weight={500}
        i18n={i18n}
      />
    </BaseButton>
  );
}
