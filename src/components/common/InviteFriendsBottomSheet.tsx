import { useShare } from "@/hooks/useShare";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { QRCodeCanvas } from "@/components/common/QRCode";
import { I18nTypography } from "@/components/common/I18nTypography";
import { Button } from "@/components/ui/Button";
import { CopyIcon } from "@/components/icons";
import { HStack, VStack } from "@/components/ui/Stack";
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
        <I18nTypography className="landscape:hidden" variant="text" size={2} i18n="invite_friends_bottom_sheet.description" />
        <HStack gap={3} className="pt-4 landscape:hidden">
          <Button
            text={{ i18n: "action.invite_friend" }}
            onClick={() => {
              onClose?.();
              share();
            }}
          />
          <Button icon={<CopyIcon className="w-5 h-5" />} onClick={copy} />
        </HStack>
      </VStack>
    </BottomSheet>
  );
}