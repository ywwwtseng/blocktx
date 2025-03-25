"use client";

import { useState } from "react";
import Image from "next/image";
import { Energy } from "@prisma/client";
import { useMiniApp } from "@/contexts/MiniAppContext";
import { useQuery } from "@/hooks/useQuery";
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
import { HStack } from "@/components/ui/Stack";


export function Layout({ children }: { children: React.ReactNode }) {
  const { platform } = useMiniApp();
  const { data: energy } = useQuery<Partial<Energy>>("/api/energy", {
    needAuthorized: true,
  });
  const [openInviteFriendsBottomSheet, setOpenInviteFriendsBottomSheet] = useState(false);
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
      <HStack
        className="fixed px-4 left-0 top-0 bg-[var(--background)]/50 backdrop-blur-[160px]"
        justify="between"
        height={headerHeight}
      >
        <Image className="rounded-md" src="/logo.png" alt="logo" width={28} height={28} />
        <HStack width="auto" gap={1}>
          <div className="py-[3px] px-1 rounded-full border border-white/15 gap-1.5 flex items-center">
            <UserEnergy value={energy?.current || 0} />
          </div>
          <ConnectWalletButton />
          <Avatar />
        </HStack>
      </HStack>
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {children}
      </div>
      <HStack
        items="start"
        height={tabBarHeight}
        className="box-border fixed left-0 right-0 bottom-0 mx-auto pt-1 border-t border-white/10 bg-[var(--background)]/50 backdrop-blur-[35px]"
      >
        <HStack justify="between" className="px-4">
          <TabItem href="/" icon={{ element: ChartIcon, color: { active: "#fff", default: "#7C7C7C" } }} i18n="common.analytics" />
          <TabItem href="/trade-ai" icon={{ element: SmartToyIcon, color: { active: "#fff", default: "#7C7C7C" } }} i18n="common.tradeai" />
          {/* <TabItem href="/game" icon={{ element: GameIcon, color: { active: "url(#linear-gradient)", default: "#7C7C7C" } }} i18n="Game" /> */}
          <TabItem href="/earn" icon={{ element: EarnIcon, color: { active: "#fff", default: "#7C7C7C" } }} i18n="common.earn" />
          <TabItem
            onClick={() => {
              setOpenInviteFriendsBottomSheet(true);
            }}
            icon={{ element: ReferralIcon, color: { active: "#fff", default: "#7C7C7C" } }}
            i18n="common.invite"
          />
          <InviteFriendsBottomSheet
            open={openInviteFriendsBottomSheet}
            onClose={() => {
              setOpenInviteFriendsBottomSheet(false);
            }}
          />
        </HStack>
      </HStack>
      <LaunchScreen />
    </main>
  );
}