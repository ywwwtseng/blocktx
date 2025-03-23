import { BottomSheet, BottomSheetTriggerTypeProps } from "@/components/ui/BottomSheet";

export function InviteFriendBottomSheet({ trigger }: BottomSheetTriggerTypeProps) {
  return (
    <BottomSheet
      trigger={trigger}
      title="Invite Friend"
    >
      <div>Test</div>
    </BottomSheet>
  );
}