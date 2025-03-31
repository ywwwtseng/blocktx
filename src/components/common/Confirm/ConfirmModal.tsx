import * as Modal from "@/components/common/Modal";
import { BaseButton } from "@/components/ui/BaseButton";
import { I18nTypography } from "@/components/common/I18nTypography";

export interface ConfirmModalProps {
  title: string;
  description: string;
  cancelTextColor?: string;
  confirmTextColor?: string;
  confirmLabel?: string;
  onClose?: (event?: React.MouseEvent<HTMLDivElement>) => void;
  onConfirm: () => void;
}

export function ConfirmModal({
  title,
  description,
  cancelTextColor = "#E53935",
  confirmTextColor = "#3390EC",
  confirmLabel = "common.ok",
  onConfirm,
  onClose
}: ConfirmModalProps) {
  return (
    <Modal.Root padding="pt-4 px-2" close={onClose}>
      <Modal.Header i18n={title} />
      <Modal.Body>
        <I18nTypography i18n={description} />
      </Modal.Body>
      <Modal.Actions>
        <BaseButton
          className="py-2 flex-1"
          style={{
            color: cancelTextColor
          }}
          onClick={() => {
            onClose?.();
          }}
        >
          <I18nTypography align="center" i18n="common.cancel" />
        </BaseButton>
        <BaseButton
          className="py-2 flex-1"
          style={{
            color: confirmTextColor
          }}
          onClick={() => {
            onConfirm();
            onClose?.();
          }}>
          <I18nTypography align="center" i18n={confirmLabel} />
        </BaseButton>
      </Modal.Actions>
    </Modal.Root>
  );
}