import { useState, useRef } from "react";
import { useMiniApp } from "@/contexts/MiniAppContext";
import { useWindowSize } from "@/contexts/WindowSizeContext";
import {
  useBinanceIsLoading,
  useBinanceSelectedSymbol,
  useBinanceSetSelectedSymbol,
} from "@/hooks/useBinanceService";
import { CryptoPriceChart } from "@/components/common/CryptoPriceChart";
import { CryptoVolumeChart } from "@/components/common/CryptoVolumeChart";
import { CryptoPrice } from "@/components/common/CryptoPrice";
import { AnalysisFnG } from "@/components/common/AnalysisFnG";
import { AnalysisVolume } from "@/components/common/AnalysisVolume";
import { Dropdown } from "@/components/common/Dropdown";
import { Typography } from "@/components/ui/Typography";
import { BaseButton } from "@/components/ui/BaseButton";
import { HStack, VStack } from "@/components/ui/Stack";
import { CaretIcon, LoadingIcon } from "@/components/icons";
import { TradingPairSymbol } from "@/types";

export default function Analysis() {
  const [drawEnd, setDrawEnd] = useState(false);
  const drawEndChartCount = useRef(0);
  const { platform } = useMiniApp();
  const { width, height } = useWindowSize();
  const isLoading = useBinanceIsLoading();
  const selectedSymbol = useBinanceSelectedSymbol();
  const setSelectedSymbol = useBinanceSetSelectedSymbol();

  const onDrawEnd = () => {
    drawEndChartCount.current++;
    if (drawEndChartCount.current === 4) {
      setDrawEnd(true);
    }
  }

  if (!width || !height) {
    return null;
  }

  const restChartHeight = Math.floor((height - 52 - 140 - 230 - 58 - (platform === "ios" ? 20 : 12)) / 2);

  return (
    <div className="animate-fade-in h-full px-4 flex flex-col">
      <VStack items="start" className="py-1">
        <HStack justify="between" className="px-1">
          <Dropdown
            menuProps={{
              className: "max-h-[240px] left-0",
            }}
            spacing={0}
            trigger={
              <BaseButton className="flex items-center gap-1">
              <Typography variant="heading">{selectedSymbol.replace("USDT", "/USDT")}</Typography>
              <CaretIcon
                className="w-1.5 h-2 rotate-180"
                fill="var(--text-primary)"
                />
              </BaseButton>
            }
            options={Object.values(TradingPairSymbol).map((symbol) => ({
              label: <Typography size={2}>{symbol.replace("USDT", "/USDT")}</Typography>,
              key: symbol,
            }))}
            onSelect={(key) => setSelectedSymbol(key as TradingPairSymbol)}
          />
        </HStack>
        <HStack justify="between" className="px-1">
          <CryptoPrice symbol={selectedSymbol} />
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
        onDrawEnd={onDrawEnd}
      />
      <CryptoVolumeChart
        className="border-b border-[#2B3139]"
        interval="4h"
        timeFormat="MM/DD"
        width={width}
        height={restChartHeight}
        onDrawEnd={onDrawEnd}
      />
      <HStack>
        <CryptoPriceChart
          className="border-b border-[#2B3139]"
          interval="1m"
          width={width / 2}
          height={restChartHeight}
          onDrawEnd={onDrawEnd}
        />
        <CryptoVolumeChart
          className="border-b border-l border-[#2B3139]"
          interval="1m"
          width={width / 2}
          height={restChartHeight}
          onDrawEnd={onDrawEnd}
        />
      </HStack>
      {(!drawEnd || isLoading) && (
        <div className="absolute inset-0 flex justify-center items-center">
          <LoadingIcon />
        </div>
      )}
    </div>
  );
}