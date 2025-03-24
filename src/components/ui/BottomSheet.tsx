"use client";

import { Drawer, DialogProps } from "vaul";
import { I18nTypography } from "@/components/common/I18nTypography";

export interface BottomSheetTriggerTypeProps {
  trigger?: React.ReactNode;
}

export type BottomSheetProps = DialogProps & BottomSheetTriggerTypeProps & {
  title: string;
  children: React.ReactNode;
}

export function BottomSheet({ trigger, title, children, ...props }: BottomSheetProps) {
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
          <div className="p-4 rounded-t-[10px] flex-1">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-2" />
            <div className="max-w-md mx-auto flex flex-col items-center gap-2">
              <Drawer.Title className="hidden">
                {title}
              </Drawer.Title>
              <I18nTypography variant="heading" size={4} i18n={title} />
              <Drawer.Description className="hidden" />
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
