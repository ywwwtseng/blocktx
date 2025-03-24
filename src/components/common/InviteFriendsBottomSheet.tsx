import { useShare } from "@/hooks/useShare";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { QRCodeCanvas } from "@/components/common/QRCode";
import { I18nTypography } from "@/components/common/I18nTypography";
import { Button } from "@/components/ui/Button";
import { CopyIcon } from "@/components/icons";

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
      <div className="flex flex-col items-center gap-2">  
        <QRCodeCanvas url={url} />
        <I18nTypography className="landscape:hidden" variant="text" size={2} i18n="invite_friends_bottom_sheet.description" />
        <div className="flex items-center gap-2 p-4 landscape:hidden">
          <Button
            text={{ i18n: "invite_friends_bottom_sheet.action" }}
            onClick={() => {
              onClose?.();
              share();
            }}
          />
          <Button icon={<CopyIcon className="w-5 h-5" />} onClick={copy} />
        </div>
      </div>
    </BottomSheet>
  );
}