import { useEffect, useState, useMemo, useRef } from "react";
import clsx from 'clsx';
import Image from "next/image";
import CountUp from 'react-countup';
import { DepositButton } from "@/components/common/DepositButton";

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
      setIsActive(true);
      setTimeout(() => {
        setIsActive(false);
      }, 200);
    }
  }, [value]);

  return (
    <div className="flex items-center gap-1">
      <Image
        className={clsx("w-6 h-6 transition-transform origin-center duration-200", isActive && "scale-130")}
        src="/energy.png"
        alt="energy"
        width={28}
        height={28} />
        <div className="flex flex-col">
          <div className="h-[0px] overflow-hidden">{src}</div>
          <CountUp start={value[0]} end={value[1]} duration={duration}>
            {({ countUpRef }) => (
              <span className="text-white" ref={countUpRef} />
            )}
          </CountUp>
        </div>
      <DepositButton />
    </div>
  );
}