import { useMemo, useEffect } from "react";
import { Address } from "ton";
import dayjs from "dayjs";
import { useMiniApp } from "@/contexts/MiniAppContext";
import { useClient } from "@/contexts/ClientContext";
import { usePageManagement } from "@/contexts/PageManagementContext";
import { Avatar } from "@/components/common/Avatar/Avatar";
import { StarIcon, ChevronRightIcon } from "@/components/icons";
import { VStack, HStack } from "@/components/ui/Stack";
import { I18nTypography } from "@/components/common/I18nTypography";
import { Confirm } from '@/components/common/Confirm/Confirm';

export default function Profile() {
  const { tonConnect, user: tgUser } = useMiniApp();
  const { user } = useClient();
  const { back } = usePageManagement();
  const rawAddress = tonConnect?.wallet?.account?.address;

  const address = useMemo(() => {
    if (!rawAddress) return null;
    return Address.parse(rawAddress).toString({ bounceable: false, urlSafe: true });
  }, [rawAddress]);

  const maskAddress = useMemo(() => {
    if (!address) return "-";
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  }, [address]);

  useEffect(() => {
    if (!tonConnect?.connected) {
      back();
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tonConnect?.connected]);

  return (
    <VStack justify="start" className="animate-fade-in px-4 py-2 flex-1" gap={4}>
      <VStack>
        <Avatar size={80} border={false} />
        <I18nTypography
            size={2}
            weight={700}
            i18n={`${tgUser?.first_name} ${tgUser?.last_name}`}
          />
      </VStack>
      <VStack justify="start" items="start" className="bg-[var(--bg-2)] px-2 rounded-md">
        <Confirm
          title="disconnect_wallet.title"
          description={maskAddress}
          cancelTextColor="#3390EC"
          confirmTextColor="#E53935"
          confirmLabel="common.disconnect"
          onConfirm={() => tonConnect?.disconnect()}
        >
          <HStack className="p-2.5 pr-0" justify="between" width="100%">
            <I18nTypography
              noWrap
              size={2}
              i18n="profile.connected_wallet"
            />
            <HStack justify="end" gap={1}>
              <I18nTypography
                size={2}
                color="var(--text-secondary)"
                i18n={maskAddress}
              />
              <ChevronRightIcon className="w-6 h-6" color="var(--text-secondary)" />
            </HStack>
          </HStack>
        </Confirm>
        <HStack className="p-2.5 border-t border-white/10" justify="between" width="100%">
          <I18nTypography
            size={2}
            i18n="profile.username"
          />
          <I18nTypography
            size={2}
            color="var(--text-secondary)"
            i18n={tgUser?.username ?? "-"}
          />
        </HStack>
      </VStack>
      <VStack justify="start" items="start" className="bg-[var(--bg-2)] px-2 rounded-md">
        <HStack className="p-2.5" justify="between" width="100%">
          <HStack justify="start" gap={1}>
            <HStack width="auto" height={20}>
              <StarIcon className="w-4 h-4 -translate-y-0.5" />
            </HStack>
            <I18nTypography
              size={2}
              weight={700}
              i18n="Premium"
            />
          </HStack>
          <I18nTypography
            noWrap
            size={2}
            color="var(--text-secondary)"
            i18n={
              user?.premium_ends_at
                ? dayjs(user.premium_ends_at).format("YYYY-MM-DD HH:mm")
                : "-"
            }
          />
        </HStack>
      </VStack>
    </VStack>
  );
}