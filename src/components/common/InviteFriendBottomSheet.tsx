import { BottomSheet } from "@/components/ui/BottomSheet";

interface InviteFriendBottomSheetProps {
  trigger: React.ReactNode;
}

export function InviteFriendBottomSheet({ trigger }: InviteFriendBottomSheetProps) {
  return (
    <BottomSheet
      trigger={trigger}
      title="Invite Friend"
    >
      <div>Test</div>
    </BottomSheet>
  );
}