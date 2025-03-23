import { BottomSheet, BottomSheetTriggerTypeProps } from "@/components/ui/BottomSheet";

export function DepositBottomSheet({ trigger }: BottomSheetTriggerTypeProps) {
  return (
    <BottomSheet
      trigger={trigger}
      title="Deposit"
    >
      <div>Test</div>
    </BottomSheet>
  );
}