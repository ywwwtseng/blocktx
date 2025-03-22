import { useEffect, useState, useMemo, useRef } from "react";
import clsx from 'clsx';
import Image from "next/image";
import CountUp from 'react-countup';
import { DepositBottomSheet } from "@/components/common/DepositBottomSheet";
import { PlusIcon } from "@/components/icons";
import { BaseButton } from "@/components/ui/BaseButton";

interface UserEnergyProps {
  value: number;
  duration?: number;
}

export function UserEnergy({ value: src, duration = 1 }: UserEnergyProps) {
  const cacheValue =useRef(src ? Math.max(src - 100, 0) : 0);
  const [isActive, setIsActive] = useState(false);
  const value = useMemo(() => {
    const oldValue = cacheValue.current;
    cacheValue.current = src;
    return [oldValue, src];
  }, [src]);

  useEffect(() => {
    if (value[0] !== value[1]) {
      setTimeout(() => {
        setIsActive(true);
        setTimeout(() => {
          setIsActive(false);
        }, 200);
      }, duration * 1000);
    }
  }, [value, duration]);

  return (
    <div className="flex items-center gap-1">
      <Image
        className={clsx("w-6 h-6 transition-transform origin-center duration-200", isActive && "scale-130")}
        src="/energy.png"
        alt="energy"
        width={28}
        height={28} />
        {JSON.stringify(value)}
        <div className="flex flex-col">
          <CountUp start={value[0]} end={value[1]} duration={duration}>
            {({ countUpRef }) => (
              <span className="text-white" ref={countUpRef} />
            )}
          </CountUp>
        </div>
        <DepositBottomSheet
          trigger={
            <BaseButton>
              <PlusIcon className="w-5 h-5 -translate-y-[1px]" />
            </BaseButton>
          }
        />
    </div>
  );
}