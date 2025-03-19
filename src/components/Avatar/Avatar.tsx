"use client";

import Image from "next/image";
import { useClient } from "@/context/ClientContext";

export type AvatarProps = {
  size?: number; // in pixels
};

export function Avatar({ size = 36 }: AvatarProps) {
  const { user } = useClient();

  if (!user) {
    return null;
  }

  if (user.photo_url) {
    return (
      <Image
        src={user.photo_url}
        alt={`${user.first_name}'s avatar`}
        width={size}
        height={size}
        className="rounded-full border border-solid border-white/[.145]"
      />
    );
  }

  return (
    <div 
      className="rounded-full flex items-center justify-center text-white text-sm font-medium border border-solid border-white/[.145]"
      style={{
        width: size,
        height: size,
        fontSize: Math.floor(size * 0.4)
      }}
    >
      {user.first_name.charAt(0).toUpperCase()}
    </div>
  );
}
