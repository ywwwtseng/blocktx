import { KlineChart } from "@/components/common/KlineChart";
import { CryptoPrice } from "@/components/common/CryptoPrice";
import { AnalysisFnG } from "@/components/common/AnalysisFnG";
import { Typography } from "@/components/ui/Typography";
import { BaseButton } from "@/components/ui/BaseButton";
import { HStack, VStack } from "@/components/ui/Stack";
import { CaretIcon } from "@/components/icons";
import { TradingPairSymbol } from "@/types";

export default function Analysis() {
  

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
      </VStack>
      <KlineChart symbol={TradingPairSymbol.BTCUSDT} />
    </div>
  );
}