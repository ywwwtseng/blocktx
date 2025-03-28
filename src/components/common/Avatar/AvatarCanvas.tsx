"use client";

import clsx from "clsx";
import { useEffect, useRef } from "react";

export interface AvatarProps {
  image: HTMLImageElement;
  size?: number;
  border?: boolean;
}

export function AvatarCanvas({ image, size = 24, border = true }: AvatarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (image) {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");

        if (ctx) {
          ctx.drawImage(image, 0, 0, size, size);
        }
      }
    }
  }, [image]);

  return (
    <canvas
      className={clsx(border && "border-primary")}
      ref={canvasRef}
      width={size}
      height={size}
    />
  );
}
