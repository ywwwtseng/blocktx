import { OverlapTrigger, OverlapTriggerProps } from "@/components/common/OverlapTrigger";
import { ConfirmModal, ConfirmModalProps } from "@/components/common/Confirm/ConfirmModal";

type ConfirmProps = Omit<OverlapTriggerProps<ConfirmModalProps>, "modal">;

export function Confirm({ children, ...confirmModalProps }: ConfirmProps) {
  return (
    <OverlapTrigger modal={ConfirmModal} {...confirmModalProps}>{children}</OverlapTrigger>
  );
}
