"use client";

import { useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import { useClient } from "@/contexts/ClientContext";
import { useMiniApp } from "@/contexts/MiniAppContext";
import { usePageManagement } from "@/contexts/PageManagementContext";
import { useMutation } from "@/hooks/useMutation";
import {
  ChartIcon,
  SmartToyIcon,
  NewsIcon,
  ReferralIcon,
  LanguageIcon,
  ChevronLeftIcon,
  EnIcon,
  TwIcon,
} from "@/components/icons";
import { ConnectWalletButton } from "@/components/common/ConnectWalletButton";
import { Avatar } from "@/components/common/Avatar/Avatar";
import { Tab } from "@/components/common/Tab";
import { InviteFriendsBottomSheet } from "@/components/common/InviteFriendsBottomSheet";
import { LaunchScreen } from "@/components/common/LaunchScreen";
import { Dropdown } from "@/components/common/Dropdown";
import { HStack } from "@/components/ui/Stack";
import { BaseButton } from "@/components/ui/BaseButton";
import { Typography } from "@/components/ui/Typography";

export function Layout({ children }: { children: React.ReactNode }) {
  const { setLanguageCode } = useClient();
  const { mutate: updateMe } = useMutation<{ language_code: string; }, { language_code: string; }>("/me", {
    onSuccess: (data) => {
      setLanguageCode(data.language_code);
    },
  });
  const { platform, tonConnect } = useMiniApp();
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
          width={42}
          height={42}
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
          <Dropdown
            menuProps={{
              className: "w-[140px]",
            }}
            trigger={
              <BaseButton className="border-primary">
                <LanguageIcon className="w-9 h-9" color="#eaecef" />
              </BaseButton>
            }
            options={[
              {
                label: (
                  <HStack justify="between" gap={2}>
                    <EnIcon className="min-w-[34px] min-h-[34px] w-[34px] h-[34px]" />
                    <Typography weight={700}>English</Typography>
                  </HStack>
                ),
                key: "en",
              },
              {
                label: (
                  <HStack justify="between" gap={2}>
                    <TwIcon className="min-w-[34px] min-h-[34px] w-[34px] h-[34px]" />
                    <Typography weight={700}>中文</Typography>
                  </HStack>
                ),
                key: "zh",
              },
            ]}
            onSelect={(languageCode) => {
              updateMe({ language_code: languageCode });
              setLanguageCode(languageCode);
            }}
          />
          {tonConnect?.connected ? (
            <BaseButton onClick={() => push("/profile")}>
              <Avatar size={36} />
            </BaseButton>
          ) : (
            <ConnectWalletButton />
          )}
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