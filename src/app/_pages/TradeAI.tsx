import { HStack, VStack } from "@/components/ui/Stack";
import { I18nTypography } from "@/components/common/I18nTypography";
import { PeopleIcon, LogoIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";

export default function TradeAI() {
  return (
    <div className="w-full px-4 flex-1 flex flex-col animate-fade-in gap-2">
      <HStack justify="between" gap={2}>
        <LogoIcon className="rounded-lg" width={48} height={48} />
        <VStack justify="start" items="start">
          <I18nTypography
            size={4}
            weight={700}
            i18n="Trade AI"
          />
          <HStack width="auto" justify="start" gap={1} className="bg-[var(--bg-1)] rounded-xs px-1">
            <PeopleIcon className="w-5 h-5" />
            <I18nTypography
              size={2}
              weight={700}
              i18n="0/1000"
            />
          </HStack>
        </VStack>
      </HStack>
      <HStack justify="start" gap={1}>
        <HStack width="auto" justify="start" gap={1} className="bg-[var(--bg-warning)] rounded-xs px-1">
          <I18nTypography
            size={1}
            color="var(--text-warning)"
            i18n="trade_ai.label_5x_to_20x_leverage"
          />
        </HStack>
        <HStack width="auto" justify="start" gap={1} className="bg-[var(--bg-1)] rounded-xs px-1">
          <I18nTypography
            size={1}
            i18n="common.ai_agent"
          />
        </HStack>
        <HStack width="auto" justify="start" gap={1} className="bg-[var(--bg-1)] rounded-xs px-1">
          <I18nTypography
            size={1}
            i18n="trade_ai.solid_growth"
          />
        </HStack>
      </HStack>
      <VStack justify="start" items="start">
        <I18nTypography
          size={1}
          color="var(--text-secondary)"
          i18n="trade_ai.label_90_days_pnl"
        />
        <I18nTypography
          size={4}
          weight={700}
          // color="#2EBD85"
          i18n="+0.00"
        />
      </VStack>
      <HStack justify="between" items="start">
        <VStack justify="start" items="start" gap={0.5}>
          <I18nTypography
            size={1}
            color="var(--text-secondary)"
            i18n="AUM"
          />
          <I18nTypography
            size={1}
            weight={700}
            i18n="0.00"
          />
        </VStack>
        <VStack gap={0.5}>
          <I18nTypography
            size={1}
            color="var(--text-secondary)"
            i18n="trade_ai.label_90_days_mdd"
          />
          <I18nTypography
            size={1}
            weight={700}
            i18n="0.00%"
          />
        </VStack>
        <VStack justify="end" items="end" gap={0.5}>
          <I18nTypography
            size={1}
            color="var(--text-secondary)"
            i18n="trade_ai.label_sharpe_ratio"
          />
          <I18nTypography
            size={1}
            weight={700}
            i18n="0.00"
          />
        </VStack>
      </HStack>
      <VStack justify="between" className="flex-1">
        <HStack className="flex-1 p-2">
          <I18nTypography
            size={1}
            align="center"
            color="var(--text-warning)"
            weight={700}
            i18n="trade_ai.unavailable"
          />
        </HStack>
        <Button
          width="100%"
          disabled
          text="common.copy"
          onClick={() => {
          }}
        />
      </VStack>
    </div>
  );
}