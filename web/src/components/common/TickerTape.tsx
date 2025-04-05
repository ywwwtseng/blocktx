import clsx from "clsx";
import { useBinanceMiniTicker } from "../../hooks/useBinanceService";
import { Typography } from "../ui/Typography";
import { HStack, VStack } from "../ui/Stack";
import { CryptoIcon } from "./CryptoIcon";
import { CaretIcon } from "../icons";
import { MiniTickerUtils } from "../../utils/MiniTickerUtils";

export function TickerTape() {
  const miniTicker = useBinanceMiniTicker();

  const renderItems = (type: "original" | "cloned") => (
    <HStack gap={3} className="pr-3">
      {Object.values(miniTicker).map((item) => {
        const ticker = MiniTickerUtils.format(item);

        if (!ticker || !ticker.symbol || !ticker.price || !ticker.label) {
          return null;
        }

        return (
          <HStack gap={2} key={`${ticker.symbol}-${type}`}>
            <CryptoIcon symbol={ticker.symbol} />
            <VStack items="start">
              <Typography size={1} color="var(--text-secondary)">{ticker.symbol}</Typography>
              <HStack
                justify="start"
                gap={2}
                style={{
                  width: `${(ticker.price.length + ticker.label.length) * 8 + 20}px`,
                }}
              >
                <Typography size={1} weight={700}>${ticker.price}</Typography>
                <HStack
                  justify="start"
                  gap={1}
                >
                  <CaretIcon
                    className={clsx("w-1.5 h-2", {
                      "rotate-180": ticker.percentage < 0,
                    })}
                    fill={ticker.color}
                  />
                  <Typography size={1} weight={700} color={ticker.color}>{ticker.label}</Typography>
                </HStack>
              </HStack>
            </VStack>
          </HStack>
        );
      })}
    </HStack>
  );

  return (
    <div className="ticker-tape">
      <style>
        {`
          @keyframes marquee {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
          }

          .ticker-tape {
            height: 38px;
            min-height: 38px;
            overflow: hidden;
            position: relative;
            z-index: -1;
            
          }

          .ticker-tape .ticker-tape-list {
            display: block;
            height: 38px;
            position: absolute;
            overflow: hidden;
            animation: marquee 20s linear infinite;
            display: flex;
            align-items: center;
          }

          .ticker-tape .ticker-tape-list > * {
            float: left;
            width: 50%;
          }
        `}
      </style>
      <div className="ticker-tape-list">
        {renderItems("original")}
        {renderItems("cloned")}
      </div>
    </div>
  );
}