import { useEffect, useState } from "react";
import clsx from "clsx";
import { useMiniApp } from "@/contexts/MiniAppContext";
import { PremiumTierBottomSheet } from "@/components/common/PremiumTierBottomSheet";
import { PlusIcon, EnergyIcon } from "@/components/icons";
import { AnimatedNumber } from "@/components/common/AnimatedNumber";
import { BaseButton } from "@/components/ui/BaseButton";
import { HStack } from "@/components/ui/Stack";

interface UserEnergyProps {
  value: number;
}

export function UserEnergy({ value}: UserEnergyProps) {
  const duration = 0.4;
  const [open, setOpen] = useState(false);
  const { tonConnect } = useMiniApp();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (value) {
      setTimeout(() => {
        setIsActive(true);
        setTimeout(() => {
          setIsActive(false);
        }, 200);
      }, duration * 1000);
    }
  }, [value, duration]);

  return (
    <HStack>
      <EnergyIcon className={clsx("w-6 h-6 transition-transform origin-center duration-200", isActive && "scale-130")} />
      <AnimatedNumber value={value} duration={duration} />
      <BaseButton className="ml-1" onClick={() => {
        if (!tonConnect?.connected) {
          tonConnect?.connect();
        } else {
          setOpen(true);
        }
      }}>
        <PlusIcon className="w-5 h-5 -translate-y-[1px]" />
      </BaseButton>
      <PremiumTierBottomSheet
        open={open}
        onClose={() => setOpen(false)}
      />
    </HStack>
  );
}