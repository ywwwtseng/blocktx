import { BottomSheet } from "@/components/ui/BottomSheet";

interface DepositBottomSheetProps {
  trigger: React.ReactNode;
}

export function DepositBottomSheet({ trigger }: DepositBottomSheetProps) {
  return (
    <BottomSheet
      trigger={trigger}
      title="Deposit"
    >
      <div>Test</div>
    </BottomSheet>
  );
}