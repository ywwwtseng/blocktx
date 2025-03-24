"use client";

import { Drawer, DialogProps } from "vaul";
import { I18nTypography } from "@/components/common/I18nTypography";

export type BottomSheetProps = DialogProps & {
  trigger?: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function BottomSheet({ trigger, title, description = "", children, ...props }: BottomSheetProps) {
  return (
    <Drawer.Root {...props}>
      {trigger && (
        <Drawer.Trigger asChild>
          {trigger}
        </Drawer.Trigger>
      )}
      <Drawer.Portal>
        <Drawer.Overlay
          className="fixed inset-0 z-30"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.06)"}}/>
        <Drawer.Content
          className="flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0 z-30"
          style={{ backgroundColor: "#000" }}>
          <div className="pt-4 px-4 pb-8 rounded-t-[10px] flex-1">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-2" />
            <div className="max-w-md mx-auto flex flex-col items-center gap-2">
              <Drawer.Title className="hidden">
                {title}
              </Drawer.Title>
              <Drawer.Description className="hidden">
                {description}
              </Drawer.Description>
              <I18nTypography variant="heading" size={4} i18n={title} />
              {description && (
                <I18nTypography variant="caption" size={2} i18n={description} />
              )}
              <div className="gap-2">
                {children}
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
