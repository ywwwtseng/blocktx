import { SVGProps } from "react";
import { BtcIcon, TonIcon, EthIcon, SolIcon, SuiIcon, BnbIcon } from "@/components/icons";
import { TradingPairSymbol } from "@/types";

const icons = {
  [TradingPairSymbol.BTCUSDT]: BtcIcon,
  [TradingPairSymbol.TONUSDT]: TonIcon,
  [TradingPairSymbol.ETHUSDT]: EthIcon,
  [TradingPairSymbol.SOLUSDT]: SolIcon,
  [TradingPairSymbol.SUIUSDT]: SuiIcon,
  [TradingPairSymbol.BNBUSDT]: BnbIcon,
};

export type CryptoIconProps = SVGProps<SVGSVGElement> & {
  symbol: TradingPairSymbol;
};

export function CryptoIcon({ symbol, ...props }: CryptoIconProps) {
  const Icon = icons[symbol];

  if (!Icon) {
    return null;
  }

  return <Icon className="min-w-[26px] min-h-[26px] w-[26px] h-[26px] rounded-full" {...props} />;
}
