import { useState, useCallback } from "react";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { I18nTypography } from "@/components/common/I18nTypography";
import { CheckIcon } from "@/components/icons";
import { HStack, VStack } from "@/components/ui/Stack";
import { Button } from "@/components/ui/Button";
import { premium_tiers } from "@/constants";

interface PremiumTierBottomSheetProps {
  open: boolean;
  onClose: () => void;
}

export function PremiumTierBottomSheet({ open, onClose }: PremiumTierBottomSheetProps) {
  const [selectedType, setSelectedType] = useState<string>(Object.keys(premium_tiers)[0]);

  const joinPremiumTier = useCallback(() => {
    alert("join premium tier");
  }, []);

  return (
    <BottomSheet
      title="premium_tier_bottom_sheet.title"
      open={open}
      onClose={() => {
        onClose();
        setSelectedType(Object.keys(premium_tiers)[0]);
      }}
    >
      <I18nTypography
        variant="text"
        align="center"
        size={2}
        i18n="premium_tier_bottom_sheet.description"
      />
      <VStack className="gap-1">
        <VStack items="start" width="280px" className="gap-1 pt-4 pb-2">
          <HStack fullWidth={false} className="gap-2">
            <CheckIcon className="w-6 h-6" />
            <I18nTypography variant="text" align="center" size={2} i18n="premium_tier_bottom_sheet.benefit_1" />
          </HStack>
          <HStack fullWidth={false} className="gap-2">
            <CheckIcon className="w-6 h-6" />
            <I18nTypography variant="text" align="center" size={2} i18n="premium_tier_bottom_sheet.benefit_2" />
          </HStack>
          <HStack fullWidth={false} className="gap-2">
            <CheckIcon className="w-6 h-6" />
            <I18nTypography variant="text" align="center" size={2} i18n="premium_tier_bottom_sheet.benefit_3" />
          </HStack>
          <HStack fullWidth={false} className="gap-2">
            <CheckIcon className="w-6 h-6" />
            <I18nTypography variant="text" align="center" size={2} i18n="premium_tier_bottom_sheet.benefit_4" />
          </HStack>
        </VStack>
        <HStack border rounded fullWidth={false} className="mt-2 my-4" width="292px">
          {Object.keys(premium_tiers).map((type) => (
            <Button
              width="50%"
              key={type}
              gradient={selectedType === type}
              onClick={() => setSelectedType(type)}
              text={{ i18n: type, capitalize: true }}
            />
          ))}
        </HStack>
        <VStack justify="start" className="gap-1 h-[56px]">
          <I18nTypography variant="text" align="center" size={6} i18n={`${premium_tiers[selectedType as keyof typeof premium_tiers].price} TON`} />
          <I18nTypography variant="text" align="center" size={1} i18n={`premium_tier_bottom_sheet.${selectedType}_hint`} />
        </VStack>
      </VStack>

      <HStack className="mt-4">
        <Button
          width="100%"
          text={{ i18n: "action.join_premium_tier" }}
          onClick={() => {
            joinPremiumTier();
          }}
        />
      </HStack>
    </BottomSheet>
  );
}