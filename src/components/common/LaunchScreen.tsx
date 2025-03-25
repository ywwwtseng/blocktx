import { useEffect, useState } from "react";
import { useClient } from "@/contexts/ClientContext";
import { LogoIcon } from "@/components/icons";
import { Typography } from "@/components/ui/Typography";
import { HStack, VStack } from "@/components/ui/Stack";

  export function LaunchScreen() {
  const { authorized } = useClient();
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (!authorized) {
      return;
    }

    setHide(true);

  }, [authorized]);

  return (
    <HStack
      className="bg-black fixed left-0 right-0 bottom-0 top-0 transition-opacity duration-300"
      style={{
        opacity: hide ? 0 : 1,
        pointerEvents: hide ? "none" : "auto",
      }}>
      <VStack
        className="animate-fade-in"
        gap={2}
        style={{
          transform: "translateY(-27px)",
        }}
      >
        <LogoIcon className="rounded-md" width={78} height={78} />
        <Typography variant="heading" size={5}>BlockTx</Typography>
      </VStack>
    </HStack>
  );
}