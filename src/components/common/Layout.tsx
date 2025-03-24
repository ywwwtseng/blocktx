"use client";

import Image from "next/image";
import { useMiniApp } from "@/contexts/MiniAppContext";
import {
  ChartIcon,
  SmartToyIcon,
  // GameIcon,
  EarnIcon,
  ReferralIcon
} from "@/components/icons";
import { UserEnergy } from "@/components/common/UserEnergy";
import { ConnectWalletButton } from "@/components/common/ConnectWalletButton";
import { Avatar } from "@/components/common/Avatar";
import { TabItem } from "@/components/common/TabItem";
import { InviteFriendsBottomSheet } from "@/components/common/InviteFriendsBottomSheet";
import { LaunchScreen } from "@/components/common/LaunchScreen";

export function Layout({ children }: { children: React.ReactNode }) {
  const { platform } = useMiniApp();
  const headerHeight = 52;
  const safeAreaBottom = platform === "ios" ? 20 : 12;
  const tabBarHeight = 60 + safeAreaBottom;

  return (
    <main
      className="flex flex-col w-full h-screen overflow-hidden"
      style={{
        paddingTop: headerHeight,
        paddingBottom: tabBarHeight,
      }}
    >
      <div
        className="fixed w-full px-4 flex items-center justify-between left-0 top-0 bg-[var(--background)]/50 backdrop-blur-[160px]"
        style={{ height: headerHeight }}
      >
        <Image className="rounded-md" src="/logo.png" alt="logo" width={28} height={28} />
        <div className="flex items-center gap-2">
          <div className="py-[3px] px-1 rounded-full border border-white/15 gap-1.5 flex items-center">
            <UserEnergy value={1000} />
          </div>
          <ConnectWalletButton />
          <Avatar />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {children}
      </div>
      <div
        className="box-border fixed left-0 right-0 bottom-0 w-full flex justify-center items-start mx-auto border-t border-white/10 bg-[var(--background)]/50 backdrop-blur-[35px] pt-1"
        style={{ height: tabBarHeight }}
      >
        <div className="flex items-center justify-between w-full px-8">
          <TabItem href="/" icon={{ element: ChartIcon, color: { active: "#fff", default: "#7C7C7C" } }} i18n="common.analysis" />
          <TabItem href="/trade-ai" icon={{ element: SmartToyIcon, color: { active: "#fff", default: "#7C7C7C" } }} i18n="common.tradeai" />
          {/* <TabItem href="/game" icon={{ element: GameIcon, color: { active: "url(#linear-gradient)", default: "#7C7C7C" } }} i18n="Game" /> */}
          <TabItem href="/earn" icon={{ element: EarnIcon, color: { active: "#fff", default: "#7C7C7C" } }} i18n="common.earn" />
          <InviteFriendsBottomSheet trigger={
            <TabItem onClick={() => {}} icon={{ element: ReferralIcon, color: { active: "#fff", default: "#7C7C7C" } }} i18n="common.invite" />
          } />
        </div>
      </div>
      <LaunchScreen />
    </main>
  );
}