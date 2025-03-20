"use client";

import Image from "next/image";
import { useMiniApp } from "@/contexts/MiniAppContext";

export interface AvatarProps {
  size?: number; // in pixels
}

export function Avatar({ size = 36 }: AvatarProps) {
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
    <div 
      className="text-white text-sm font-medium flex items-center justify-center border-primary"
      style={{
        width: size,
        height: size,
        fontSize: Math.floor(size * 0.4)
      }}
    >
      {user?.first_name?.charAt(0).toUpperCase() ?? "?"}
    </div>
  );
}
