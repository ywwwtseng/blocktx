import { useState, useCallback } from "react";
import { BottomSheet } from "../ui/BottomSheet";
import { I18nTypography } from "./I18nTypography";
import { CheckIcon } from "../icons";
import { HStack, VStack } from "../ui/Stack";
import { Button } from "../ui/Button";
import { premium_tiers } from "../../constants";
import { PremiumTier } from "../../types";

interface PremiumTierBottomSheetProps {
  open: boolean;
  onClose: () => void;
}

export function PremiumTierBottomSheet({ open, onClose }: PremiumTierBottomSheetProps) {
  const [selectedType, setSelectedType] = useState<PremiumTier>(PremiumTier.YEARLY);

  const joinPremiumTier = useCallback(() => {
    alert("join premium tier");
  }, []);

  return (
    <BottomSheet
      title="premium_tier_bottom_sheet.title"
      open={open}
      onClose={() => {
        onClose();
        setSelectedType(PremiumTier.YEARLY);
      }}
    >
      <I18nTypography
        variant="text"
        align="center"
        color="var(--text-secondary)"
        size={2}
        i18n="premium_tier_bottom_sheet.description"
      />
      <VStack gap={1}>
        <VStack items="start" width="280px" gap={0.25} className="pt-4 pb-2">
          <HStack width="auto" gap={2}>
            <CheckIcon className="w-6 h-6"  />
            <I18nTypography
              variant="text"
              align="center"
              size={2}
              i18n="premium_tier_bottom_sheet.benefit_1"
            />
          </HStack>
          <HStack width="auto" gap={2}>
            <CheckIcon className="w-6 h-6" />
            <I18nTypography
              variant="text"
              align="center"
              size={2}
              i18n="premium_tier_bottom_sheet.benefit_2"
            />
          </HStack>
          <HStack width="auto" gap={2}>
            <CheckIcon className="w-6 h-6" />
            <I18nTypography
              variant="text"
              align="center"
              size={2}
              i18n="premium_tier_bottom_sheet.benefit_3"
            />
          </HStack>
          <HStack width="auto" gap={2}>
            <CheckIcon className="w-6 h-6" />
            <I18nTypography
              variant="text"
              align="center"
              size={2}
              i18n="premium_tier_bottom_sheet.benefit_4"
            />
          </HStack>
        </VStack>
        <HStack
          className="mt-2 my-4 border border-white/20 rounded-full"
          width="292px">
          {Object.keys(premium_tiers).map((type) => (
            <Button
              width="50%"
              key={type}
              gradient={selectedType === type}
              onClick={() => setSelectedType(type as PremiumTier)}
              text={{ i18n: type, capitalize: true }}
            />
          ))}
        </HStack>
        <VStack justify="start" height={56} gap={1}>
          <I18nTypography
            variant="text"
            align="center"
            size={6}
            i18n={`${premium_tiers[selectedType as keyof typeof premium_tiers].price} TON`}
          />
          <I18nTypography
            variant="text"
            align="center"
            size={1}
            color="var(--text-secondary)"
            i18n={`premium_tier_bottom_sheet.${selectedType}_hint`}
          />
        </VStack>
      </VStack>
      <HStack className="mt-4">
        <Button
          width="100%"
          text="common.join_premium_tier"
          onClick={() => {
            joinPremiumTier();
          }}
        />
      </HStack>
    </BottomSheet>
  );
}