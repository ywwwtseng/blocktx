"use client";

import dynamic from "next/dynamic";

import { useMiniApp } from "@/contexts/MiniAppContext";
import {
  WalletIcon,
  ChartIcon,
  GameIcon,
  EarnIcon,
  ReferralIcon
} from "@/components/icons";
import * as Typography from "@/components/ui/Typography";
import { TabItem } from "@/components/common/TabItem";
const Avatar = dynamic(() => import("@/components/common/Avatar").then(mod => mod.Avatar), { ssr: false });

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { safeArea, platform } = useMiniApp();
  const translate = platform === "ios" ? -8 : 0;

  if (!safeArea) {
    return null;
  }

  return (
    <main className="flex flex-col w-full h-screen overflow-hidden pt-12" style={{ paddingBottom: safeArea.bottom + 60 + translate }}>
      <div className="fixed w-full px-4 py-2 flex items-center justify-between left-0 top-0 bg-black/50 backdrop-blur-[160px] z-40">
        <Typography.Heading>Trade</Typography.Heading>
        <div className="flex items-center gap-2">
          <WalletIcon className="w-7 h-7" />
          <Avatar />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar px-4">
        {platform}
        {children}
      </div>
      <div 
        className="fixed left-0 right-0 w-full z-40 flex justify-center items-center mx-auto"
        style={{ bottom: translate }}
      >
        <div
          className="flex justify-between w-full border-t px-8 pt-1 border-white/10 bg-black/50 backdrop-blur-[35px]"
          style={{ paddingBottom: Math.max(safeArea.bottom, 8) }}
        >
          <TabItem href="/" icon={{ element: ChartIcon, color: { active: "#fff", default: "#7C7C7C" } }} i18n="trade" />
          <TabItem href="/game" icon={{ element: GameIcon, color: { active: "url(#linear-gradient)", default: "#7C7C7C" } }} i18n="game" />
          <TabItem href="/earn" icon={{ element: EarnIcon, color: { active: "#fff", default: "#7C7C7C" } }} i18n="earn" />
          <TabItem href="/invite" icon={{ element: ReferralIcon, color: { active: "#fff", default: "#7C7C7C" } }} i18n="invite" />
        </div>
      </div>
    </main>
  );
}