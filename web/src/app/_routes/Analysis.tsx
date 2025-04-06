import { useWindowSize } from "@/contexts/WindowSizeContext";
import { CryptoPriceChart } from "@/components/common/CryptoPriceChart";
import { CryptoVolumeChart } from "@/components/common/CryptoVolumeChart";
import { CryptoPrice } from "@/components/common/CryptoPrice";
import { AnalysisFnG } from "@/components/common/AnalysisFnG";
import { AnalysisVolume } from "@/components/common/AnalysisVolume";
import { Typography } from "@/components/ui/Typography";
import { BaseButton } from "@/components/ui/BaseButton";
import { HStack, VStack } from "@/components/ui/Stack";
import { CaretIcon } from "@/components/icons";
import { TradingPairSymbol } from "@/types";

export default function Analysis() {
  const { width, height } = useWindowSize();

  if (!width || !height) {
    return null;
  }

  const restChartHeight = Math.floor((height - 52 - 140 - 230 - 78) / 2);

  return (
    <div className="animate-fade-in h-full px-4 pb-2 flex flex-col">
      <VStack items="start" className="py-1">
        <HStack justify="between" className="px-1">
          <BaseButton className="flex items-center gap-1">
            <Typography variant="heading">BTC/USDT</Typography>
            <CaretIcon
              className="w-1.5 h-2 rotate-180"
              fill="var(--text-primary)"
            />
          </BaseButton>
        </HStack>
        <HStack justify="between" className="px-1">
          <CryptoPrice symbol={TradingPairSymbol.BTCUSDT} />
        </HStack>
        <AnalysisFnG />
        <AnalysisVolume />
      </VStack>
      <CryptoPriceChart
        className="border-t border-b border-[#2B3139]"
        hideBottomAxis
        interval="4h"
        type="kline"
        width={width}
        height={230}
      />
      <CryptoVolumeChart
        className="border-b border-[#2B3139]"
        interval="4h"
        timeFormat="MM/DD"
        width={width}
        height={restChartHeight}
      />
      <HStack>
        <CryptoPriceChart
          className="border-b border-[#2B3139]"
          interval="1m"
          width={width / 2}
          height={restChartHeight}
        />
        <CryptoVolumeChart
          className="border-b border-l border-[#2B3139]"
          interval="1m"
          width={width / 2}
          height={restChartHeight}
        />
      </HStack>
    </div>
  );
}