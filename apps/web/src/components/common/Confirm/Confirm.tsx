import { OverlapTrigger, OverlapTriggerProps } from "../OverlapTrigger";
import { ConfirmModal, ConfirmModalProps } from "./ConfirmModal";

type ConfirmProps = Omit<OverlapTriggerProps<ConfirmModalProps>, "modal">;

export function Confirm({ children, ...confirmModalProps }: ConfirmProps) {
  return (
    <OverlapTrigger modal={ConfirmModal} {...confirmModalProps}>{children}</OverlapTrigger>
  );
}
