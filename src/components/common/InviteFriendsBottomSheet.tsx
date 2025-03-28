import { useShare } from "@/hooks/useShare";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { QRCodeCanvas } from "@/components/common/QRCode";
import { I18nTypography } from "@/components/common/I18nTypography";
import { Button } from "@/components/ui/Button";
import { BaseButton } from "@/components/ui/BaseButton";
import { VStack } from "@/components/ui/Stack";
interface InviteFriendsBottomSheetProps {
  open: boolean;
  onClose: () => void;
}

export function InviteFriendsBottomSheet({ open, onClose }: InviteFriendsBottomSheetProps) {
  const { share, copy, url } = useShare();

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title="invite_friends_bottom_sheet.title"
    >
      <VStack gap={2}>  
        <QRCodeCanvas url={url} />
        <BaseButton className="landscape:hidden" onClick={copy}>
          <I18nTypography
            align="center"
            size={2}
            i18n={url}
          />
        </BaseButton>
        <Button
          className="mt-4 landscape:hidden"
          width="100%"
          text="common.invite_friend"
          onClick={() => {
            onClose?.();
            share();
          }}
        />
      </VStack>
    </BottomSheet>
  );
}