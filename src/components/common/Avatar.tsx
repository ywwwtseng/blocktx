"use client";

import Image from "next/image";
import { HStack } from "@/components/ui/Stack";
import { useMiniApp } from "@/contexts/MiniAppContext";

export interface AvatarProps {
  size?: number; // in pixels
}

export function Avatar({ size = 24 }: AvatarProps) {
  const { user } = useMiniApp();

  if (user?.photo_url) {
    return (
      <Image
        className="border-primary"
        src={user.photo_url}
        alt={`${user.first_name}'s avatar`}
        width={size}
        height={size}
      />
    );
  }

  return (
    <HStack 
      className="border-primary"
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
