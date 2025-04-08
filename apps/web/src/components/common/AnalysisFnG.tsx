import { useFnG } from "@/hooks/useFnG";
import { FnGUtils } from "@/utils/FnGUtils";
import { I18nTypography } from "@/components/common/I18nTypography";
import { HStack, VStack } from "@/components/ui/Stack";
import { Typography } from "@/components/ui/Typography";

export function AnalysisFnG() {
  const { data: fnG } = useFnG();

  return (
    <HStack justify="between" items="start" className="py-1 px-2">
      <VStack justify="start" items="start" gap={0.5}>
        <I18nTypography
          size={1}
          i18n="analysis.fng_today"
        />
        <Typography
          size={1}
          weight={700}
          color={FnGUtils.color(fnG?.today)}
        >
          {fnG?.today || "-"}
        </Typography>
      </VStack>
      <VStack gap={0.5}>
        <I18nTypography
          size={1}
          i18n="analysis.fng_yesterday"
        />
        <Typography
          size={1}
          weight={700}
          color={FnGUtils.color(fnG?.yesterday)}
        >
          {fnG?.yesterday || "-"}
        </Typography>
      </VStack>
      <VStack justify="end" items="end" gap={0.5}>
        <I18nTypography
          size={1}
          i18n="analysis.fng_last_7_days"
        />
        <Typography
          size={1}
          weight={700}
          color={FnGUtils.color(fnG?.last7Days)}
        >
          {fnG?.last7Days || "-"}
        </Typography>
      </VStack>
    </HStack>
  );
}