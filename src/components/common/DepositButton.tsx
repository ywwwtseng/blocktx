import { BaseButton } from "@/components/ui/BaseButton";
import { PlusIcon } from "@/components/icons";

export function DepositButton() {
  return (
    <BaseButton>
      <PlusIcon className="w-5 h-5 -translate-y-[1px]" />
    </BaseButton>
  )
}