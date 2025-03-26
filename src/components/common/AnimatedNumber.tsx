import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
}

export function AnimatedNumber({ value, duration = 0.4 }: AnimatedNumberProps) {
  const numberRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    gsap.to(numberRef.current, {
      innerText: value,       // 目標數值
      duration,               // 動畫時間
      snap: { innerText: 1 }, // 讓數字變整數
      ease: "power1.out",     // 平滑動畫效果
      onUpdate: function () { // 加入千分位
        const currentValue = Math.round(this.targets()[0].innerText);
        numberRef.current!.innerText = currentValue.toLocaleString();
      },
    });
  }, [value]);

  return (
    <span className="text-white transition-all duration-300" ref={numberRef} />
  );
}