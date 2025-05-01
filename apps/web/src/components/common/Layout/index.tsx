"use client";

import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useClient } from "@/contexts/ClientContext";
import { useMiniApp } from "@/contexts/MiniAppContext";
import { useBinanceService } from "@/hooks/useBinanceService";
import { useClientOnce } from "@/hooks/useClientOnce";
import { useMutation } from "@/hooks/useMutation";
import { useRoute } from "@/hooks/useRoute";
import {
  LanguageIcon,
  ChevronLeftIcon,
  EnIcon,
  TwIcon,
} from "@/components/icons";
import { ConnectWalletButton } from "@/components/common/ConnectWalletButton";
import { Avatar } from "@/components/common/Avatar/Avatar";
import { Tab } from "@/components/common/Tab";
import { LaunchScreen } from "@/components/common/LaunchScreen";
import { Dropdown } from "@/components/common/Dropdown";
import { OverlapTrigger } from "@/components/common/OverlapTrigger";
import { HStack } from "@/components/ui/Stack";
import { BaseButton } from "@/components/ui/BaseButton";
import { Typography } from "@/components/ui/Typography";
import { routes } from "@/app/_routes";

export function Layout({ children }: { children: React.ReactNode }) {
  const { setLanguageCode } = useClient();
  const router = useRouter();
  const route = useRoute();
  const { mutate: updateMe } = useMutation<{ language_code: string; }, { language_code: string; }>("/me");
  const { platform, tonConnect } = useMiniApp();
  const { init } = useBinanceService();
  const headerHeight = 52;
  const safeAreaBottom = platform === "ios" ? 20 : 12;
  const tabBarHeight = 60 + safeAreaBottom;


  useClientOnce(() => {
    init();
  });

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
            "hidden": route.type === "default",
          })}
          src="/logo.png"
          alt="logo"
          width={42}
          height={42}
        />
        <BaseButton
          className={clsx({
            "hidden": route.type === "tab",
          })}
          onClick={() => router.back()}
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </BaseButton>
        <HStack width="auto" gap={2}>
          <Dropdown
            menuProps={{
              className: "max-h-[200px] mt-2",
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
            <BaseButton onClick={() => router.push("/profile")}>
              <Avatar size={36} />
            </BaseButton>
          ) : (
            <ConnectWalletButton />
          )}
        </HStack>
      </HStack>
      <div className="h-full flex flex-col items-center justify-center">
        {children}
      </div>
      <HStack
        items="start"
        height={tabBarHeight}
        className="box-border fixed left-0 right-0 bottom-0 mx-auto pt-1 border-t border-white/10 bg-[var(--background)]/50 backdrop-blur-[35px]"
      >
        <HStack justify="between" className="px-8">
          {routes
            .filter(route => route.type === "tab")
            .map(route => {
              if (route.path) {
                return (
                  <Tab
                    key={route.i18n}
                    href={route.path}
                    i18n={route.i18n!}
                    icon={route.icon!}
                  />
                  );
                } else {
                  return (
                    <OverlapTrigger
                      key={route.i18n}
                      keepMounted
                      modal={route.overlap!}>
                      <Tab 
                        i18n={route.i18n!}
                        icon={route.icon!}
                      />
                    </OverlapTrigger>
                  )
                }
          })}          
        </HStack>
      </HStack>
      <LaunchScreen />
    </main>
  );
}