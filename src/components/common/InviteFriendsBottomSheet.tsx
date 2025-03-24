import { BottomSheet, BottomSheetTriggerTypeProps } from "@/components/ui/BottomSheet";
import { QRCodeCanvas } from "@/components/common/QRCode";

export function InviteFriendsBottomSheet({ trigger }: BottomSheetTriggerTypeProps) {
  return (
    <BottomSheet
      trigger={trigger}
      title="Invite Friends"
    >
      <QRCodeCanvas url="https://www.google.com" />
    </BottomSheet>
  );
}