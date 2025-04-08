"use client";

import clsx from "clsx";
import { useMiniApp } from "../../../contexts/MiniAppContext";
import { HStack } from "../../ui/Stack";
import { AvatarCanvas } from "./AvatarCanvas";

export interface AvatarProps {
  size?: number; // in pixels
  border?: boolean;
}

export function Avatar({ size = 24, border = true }: AvatarProps) {
  const { user, avatar } = useMiniApp();

  if (avatar) {
    return (
      <AvatarCanvas size={size} image={avatar} border={border} />
    );
  }

  return (
    <HStack
      className={clsx(border && "border-primary")}
      width={size}
      height={size}
    >
      <span
        className="text-white text-sm font-medium"
        style={{ fontSize: Math.floor(size * 0.4) }}>
        {user?.first_name?.charAt(0).toUpperCase() ?? "?"}
      </span>
    </HStack>
  );
}
