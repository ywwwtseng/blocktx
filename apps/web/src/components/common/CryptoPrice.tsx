import { useEffect, useRef } from "react";
import { Typography } from "@/components/ui/Typography";
import { HStack } from "@/components/ui/Stack";
import { useCrypto } from "@/hooks/useCrypto";
import { TradingPairSymbol } from "@/types";

interface CryptoPriceProps {
  symbol: TradingPairSymbol;
}

export function CryptoPrice({ symbol }: CryptoPriceProps) {
  const crypto = useCrypto(symbol);
  const price = crypto?.price;
  const cachedPrice = useRef(price);
  const percentage = crypto?.percentage;
  const change = crypto?.change;

  useEffect(() => {
    cachedPrice.current = price;
  }, [price]);

  return (
    <HStack justify="start" gap={1}>
      <Typography
        variant="heading"
        color={price && Number(price) > Number(cachedPrice.current) ? "var(--text-buy)" : "var(--text-sell)"}
      >
        {price ? Number(price).toFixed(2) : "-"}
      </Typography>
      <Typography
        variant="text"
        size={2}
        color={percentage && Number(percentage) > 0 ? "var(--text-buy)" : "var(--text-sell)"}
      >
        {change || "-"}
      </Typography>
    </HStack>
  );
}
