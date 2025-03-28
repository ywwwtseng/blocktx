import { useBinanceMiniTicker } from "@/hooks/useBinanceService";
import { Typography } from "@/components/ui/Typography";
import { HStack, VStack } from "@/components/ui/Stack";
import { MiniTickerUtils } from "@/utils/MiniTickerUtils";

export function NewsMarquee() {
  const miniTicker = useBinanceMiniTicker();
  const width = 762;

  const content = (
    <HStack gap={20} className="px-[30px]">
      {Object.values(miniTicker).map((item) => {
        const ticker = MiniTickerUtils.format(item);

        return (
          <HStack width="auto" key={ticker.symbol}>
            <VStack items="start">
              <Typography>{ticker.symbol}</Typography>
              <Typography size={2} weight={700}>{ticker.price}</Typography>
            </VStack>
          </HStack>
        )
      })}
    </HStack>
  );

  return (
    <div className="marquee">
      <style>
        {`
          @keyframes marquee {
            0% { left: 0; }
            100% { left: -${width}px; }
          }

          .marquee {
            height: 38px;
            min-height: 38px;
            overflow: hidden;
            position: relative;
            
          }

          .marquee .marquee-content {
            display: block;
            width: ${width * 2}px;
            height: 38px;
            position: absolute;
            overflow: hidden;
            animation: marquee 20s linear infinite;
            display: flex;
            align-items: center;
          }

          .marquee .marquee-content > * {
            float: left;
            width: 50%;
          }
        `}
      </style>
      <div className="marquee-content">
        {content}
        {content}
      </div>
    </div>
  );
}