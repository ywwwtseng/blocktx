"use client";

import { PropsWithChildren } from "react";
import { HStack, VStack } from "@/components/ui/Stack";
import { I18nTypography, I18nTypographyProps } from "@/components/common/I18nTypography";

interface RootProps extends PropsWithChildren {
  close?: (event?: React.MouseEvent<HTMLDivElement>) => void;
  zIndex?: number;
  width?: string;
  padding?: string;
}

export function Root({ children, zIndex = 40, close, width = "80vw", padding = "py-6 px-4" }: RootProps) {
  return (
    <div
      className="flex flex-col fixed bottom-0 left-0 overflow-hidden w-full h-full bg-white/[0.06]"
      style={{ zIndex }}
      onClick={close}>
      <div
        className={`animate-fade-in shadow-inner bg-black absolute bottom-0 left-0 bottom-0 left-0 top-0 right-0 m-auto max-h-[min-content] rounded-xl flex flex-col items-center ${padding}`}
        style={{ width, maxWidth: "320px" }}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function Header(props: I18nTypographyProps) {
  return (
    <I18nTypography variant="heading" className="mb-2" align="center" size={4} {...props} />
  );
}

export function Body({ children }: PropsWithChildren) {
  return (
    <VStack className="mt-2 px-2">{children}</VStack>
  );
}

export function Actions({ children }: PropsWithChildren) {
  return (
    <HStack gap={1} className="my-2">{children}</HStack>
  );
}

export function Footer({ children }: PropsWithChildren) {
  return (
    <VStack gap={1} className="mt-2">{children}</VStack>
  );
}
