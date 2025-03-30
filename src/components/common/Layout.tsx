"use client";

import { useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import { useMiniApp } from "@/contexts/MiniAppContext";
import { usePageManagement } from '@/contexts/PageManagementContext';
import {
  ChartIcon,
  SmartToyIcon,
  NewsIcon,
  ReferralIcon,
  ChevronLeftIcon,
} from "@/components/icons";
import { ConnectWalletButton } from "@/components/common/ConnectWalletButton";
import { Avatar } from "@/components/common/Avatar/Avatar";
import { Tab } from "@/components/common/Tab";
import { InviteFriendsBottomSheet } from "@/components/common/InviteFriendsBottomSheet";
import { LaunchScreen } from "@/components/common/LaunchScreen";
import { HStack } from "@/components/ui/Stack";
import { BaseButton } from '@/components/ui/BaseButton';

export function Layout({ children }: { children: React.ReactNode }) {
  const { platform } = useMiniApp();
  const { push, pathname } = usePageManagement();
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
        <Image
          id="logo"
          className={clsx("rounded-md", {
            "hidden": pathname === "/profile",
          })}
          src="/logo.png"
          alt="logo"
          width={32}
          height={32}
        />
        <BaseButton
          className={clsx({
            "hidden": pathname !== "/profile",
          })}
          onClick={() => push("/")}
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </BaseButton>
        <HStack width="auto" gap={2}>
          <ConnectWalletButton />
          <BaseButton onClick={() => push("/profile")}>
            <Avatar size={36} />
          </BaseButton>
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
        <HStack justify="between" className="px-8">
          <Tab href="/" icon={{ element: ChartIcon, color: { active: "#fff", default: "#7C7C7C" } }} i18n="common.analysis" />
          <Tab href="/trade-ai" icon={{ element: SmartToyIcon, color: { active: "#fff", default: "#7C7C7C" } }} i18n="common.tradeai" />
          <Tab href="/news" icon={{ element: NewsIcon, color: { active: "#fff", default: "#7C7C7C" } }} i18n="common.news" />
          <Tab
            onClick={() => {
              setOpenInviteFriendsBottomSheet(true);
            }}
            icon={{ element: ReferralIcon, color: { active: "#fff", default: "#7C7C7C" } }}
            i18n="common.invite"
          />
        </HStack>
      </HStack>
      <LaunchScreen />
      <InviteFriendsBottomSheet
        open={openInviteFriendsBottomSheet}
        onClose={() => {
          setOpenInviteFriendsBottomSheet(false);
        }}
      />
    </main>
  );
}