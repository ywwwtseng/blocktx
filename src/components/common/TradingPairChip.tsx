import { useBinanceMiniTicker } from "@/hooks/useBinanceService";
import { MiniTickerUtils } from "@/utils/MiniTickerUtils";
import { HStack } from "@/components/ui/Stack";
import { Typography } from "@/components/ui/Typography";
import { TradingPairSymbol } from "@/types";

export function TradingPairChip({ pair }: { pair: string }) {
  const miniTicker = useBinanceMiniTicker();
  const rawTicker = miniTicker[`${pair}USDT` as TradingPairSymbol];

  if (!rawTicker) {
    return null;
  }

  const ticker = MiniTickerUtils.format(rawTicker);

  return (
    <HStack gap={1} width="auto" className="bg-[var(--bg-2)] px-1 py-0.5 rounded-xs">
      <Typography size={1} weight={400}>{pair}</Typography>
      <Typography size={1} weight={700} color={ticker?.color}>{ticker?.label}</Typography>
    </HStack>
  )
}