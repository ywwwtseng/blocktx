import { useShare } from "../../hooks/useShare";
import { BottomSheet } from "../ui/BottomSheet";
import { QRCodeCanvas } from "./QRCode";
import { I18nTypography } from "./I18nTypography";
import { Button } from "../ui/Button";
import { BaseButton } from "../ui/BaseButton";
import { VStack } from "../ui/Stack";

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