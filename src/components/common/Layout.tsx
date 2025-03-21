"use client";

import Image from "next/image";
import { useMiniApp } from "@/contexts/MiniAppContext";
import {
  ChartIcon,
  SmartToyIcon,
  GameIcon,
  EarnIcon,
  ReferralIcon
} from "@/components/icons";
import * as Typography from "@/components/ui/Typography";
import { TabItem } from "@/components/common/TabItem";
import { DepositButton } from "@/components/common/DepositButton";
import { ConnectWalletButton } from "@/components/common/ConnectWalletButton";
import { Avatar } from "@/components/common/Avatar";

export function Layout({ children }: { children: React.ReactNode }) {
  const { platform } = useMiniApp();
  const safeAreaBottom = platform === "ios" ? 20 : 12;

  return (
    <main className="flex flex-col w-full h-screen overflow-hidden pt-12" style={{ paddingBottom: 60 + safeAreaBottom }}>
      <div className="fixed w-full px-4 py-2 flex items-center justify-between left-0 top-0 bg-[var(--background)]/50 backdrop-blur-[160px] z-40">
        <Image className="rounded-md" src="/logo.png" alt="logo" width={28} height={28} />
        <div className="flex items-center gap-2">
          <div className="py-[3px] px-1 rounded-full border border-white/15 gap-1.5 flex items-center">
            <div className="flex items-center gap-1">
              <Image src="/energy.png" alt="energy" width={28} height={28} />
              <Typography.Text weight={700}>100</Typography.Text>
              <DepositButton />
            </div>
          </div>
          <ConnectWalletButton />
          <Avatar />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar px-4">
        {children}
      </div>
      <div className="fixed left-0 right-0 bottom-0 w-full z-40 flex justify-center items-center mx-auto">
        <div
          className="flex justify-between w-full border-t px-4 pt-1 border-white/10 bg-[var(--background)]/50 backdrop-blur-[35px]"
          style={{ paddingBottom: safeAreaBottom }}
        >
          <TabItem href="/" icon={{ element: ChartIcon, color: { active: "#fff", default: "#7C7C7C" } }} i18n="Analysis" />
          <TabItem href="/trade-ai" icon={{ element: SmartToyIcon, color: { active: "#fff", default: "#7C7C7C" } }} i18n="Trade AI" />
          <TabItem href="/game" icon={{ element: GameIcon, color: { active: "url(#linear-gradient)", default: "#7C7C7C" } }} i18n="Game" />
          <TabItem href="/earn" icon={{ element: EarnIcon, color: { active: "#fff", default: "#7C7C7C" } }} i18n="Earn" />
          <TabItem href="/invite" icon={{ element: ReferralIcon, color: { active: "#fff", default: "#7C7C7C" } }} i18n="Invite" />
        </div>
      </div>
    </main>
  );
}