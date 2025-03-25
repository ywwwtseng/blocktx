import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useMiniApp } from "@/contexts/MiniAppContext";
import { PremiumTierBottomSheet } from "@/components/common/PremiumTierBottomSheet";
import { PlusIcon } from "@/components/icons";
import { BaseButton } from "@/components/ui/BaseButton";
import { HStack } from "@/components/ui/Stack";

interface UserEnergyProps {
  value: number;
  duration?: number;
}

export function UserEnergy({ value, duration = 0.4 }: UserEnergyProps) {
  const [open, setOpen] = useState(false);
  const { tonConnect } = useMiniApp();
  const countUpRef = useRef<HTMLSpanElement>(null);
  const [isActive, setIsActive] = useState(false);

  useGSAP(() => {
    gsap.to(countUpRef.current, {
      innerText: value,       // 目標數值
      duration,               // 動畫時間
      snap: { innerText: 1 }, // 讓數字變整數
      ease: "power1.out",     // 平滑動畫效果
      onUpdate: function () { // 加入千分位
        const currentValue = Math.round(this.targets()[0].innerText);
        countUpRef.current!.innerText = currentValue.toLocaleString();
      },
    });
  }, [value]);

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
      <Image
        className={clsx("w-6 h-6 transition-transform origin-center duration-200", isActive && "scale-130")}
        src="/energy.png"
        alt="energy"
        width={28}
        height={28} />
        <span className="text-white transition-all duration-300" ref={countUpRef} />
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