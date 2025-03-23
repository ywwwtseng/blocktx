import { useEffect, useRef, useState } from "react";
import { useFadeIn } from "@/hooks/useFadeIn";
import { useClient } from "@/contexts/ClientContext";
import { LogoIcon } from "@/components/icons";
import { Typography } from "@/components/ui/Typography";

interface LaunchScreenProps {
  minDuration?: number;
}

export function LaunchScreen({ minDuration = 1000 }: LaunchScreenProps) {
  const { authorized } = useClient();
  const [hide, setHide] = useState(false);
  const createdAt = useRef(Date.now());

  useFadeIn("#launch-screen");

  useEffect(() => {
    if (!authorized) {
      return;
    }

    const timer = setTimeout(() => {
      setHide(true);
    }, Math.max(minDuration, Date.now() - createdAt.current));

    return () => clearTimeout(timer);
  }, [minDuration, authorized]);

  return (
    <div
      className="fixed left-0 right-0 bottom-0 top-0 flex items-center justify-center transition-opacity duration-300"
      style={{
        backgroundColor: "#000000",
        opacity: hide ? 0 : 1,
        pointerEvents: hide ? "none" : "auto",
      }}>
      <div
        id="launch-screen"
        className="flex flex-col items-center gap-2"
        style={{
          transform: "translateY(-27px)",
        }}
      >
        <LogoIcon className="rounded-md" width={78} height={78} />
        <Typography variant="heading" size={5}>BlockTx</Typography>
      </div>
    </div>
  );
}