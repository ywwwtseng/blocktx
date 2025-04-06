import { useBinanceKlineVolume } from "@/hooks/useBinanceService";
import { I18nTypography } from "@/components/common/I18nTypography";
import { HStack, VStack } from "@/components/ui/Stack";
import { Typography } from "@/components/ui/Typography";

export function AnalysisVolume() {
  const vol = useBinanceKlineVolume();

  return (
    <HStack justify="between" items="start" className="py-1 px-2">
      <VStack justify="start" items="start" gap={0.5}>
        <I18nTypography
          size={1}
          i18n="Vol(1m)"
        />
        <Typography
          capitalize
          size={1}
          weight={700}
        >
          {vol["1m"]}
        </Typography>
      </VStack>
      <VStack gap={0.5}>
        <I18nTypography
          size={1}
          i18n="Vol(1h)"
        />
        <Typography
          capitalize
          size={1}
          weight={700}
        >
          {vol["1h"]}
        </Typography>
      </VStack>
      <VStack justify="end" items="end" gap={0.5}>
        <I18nTypography
          size={1}
          i18n="Vol(4h)"
        />
        <Typography
          capitalize
          size={1}
          weight={700}
        >
          {vol["4h"]}
        </Typography>
      </VStack>
    </HStack>
  );
}