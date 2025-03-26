import clsx from "clsx";
import { ConvertDecimal } from "@/libs/prisma";
import { useQuery } from "@/hooks/useQuery";
import { useMutation } from "@/hooks/useMutation";
import { useQuestionMarks } from "@/hooks/useQuestionMarks";
import { useUpdateQueryData } from "@/hooks/useUpdateQueryData";
import { I18nTypography } from "@/components/common/I18nTypography";
import { VStack, HStack } from "@/components/ui/Stack";
import { BaseButton } from "@/components/ui/BaseButton";
import { TonIcon, EnergyIcon } from "@/components/icons";

import { HashChallenge } from "@prisma/client";
import { Maybe } from "@/types";

export default function Earn() {
  const updateQueryData = useUpdateQueryData();
  const { data: energy, isPending: isEnergyPending } = useQuery<number>("/energy", {
    needAuthorized: true,
  });
  const { data: hashChallenge, isPending: isHashChallengePending } = useQuery<{
    highest: Maybe<Partial<ConvertDecimal<HashChallenge>>>;
    current: Maybe<Partial<ConvertDecimal<HashChallenge>>>;
  }>("/hash-challenge", {
    needAuthorized: true,
  });
  const { mutate: bet, isPending: isBetPending } = useMutation("/hash-challenge/bet", {
    onError: () => {
      updateQueryData<number>(
        "/energy",
        (prev: number) => prev + 35
      );
    },
  });
  
  const isPending = isEnergyPending || isBetPending || isHashChallengePending;

  const currentHashNumericPart = useQuestionMarks(
    isBetPending ? undefined : hashChallenge?.current?.hash_numeric_part
  );

  const highestHashNumericPart = useQuestionMarks(hashChallenge?.highest?.hash_numeric_part);

  return (
    <VStack justify="between" className="flex-1 py-2 animate-fade-in">
      <I18nTypography
        size={6}
        weight={700}
        i18n="earn.title"
      />
      <VStack className="flex-1">
        <VStack justify="start" className="pt-8 flex-1">
          <I18nTypography
            className="animate-glow-text"
            fontFamily="var(--font-rajdhani)"
            size={highestHashNumericPart.length > 10 ? 8 : 10}
            lineHeight={0.7}
            weight={700}
            i18n={highestHashNumericPart}
          />
          <I18nTypography
            size={1}
            weight={700}
            i18n="earn.label_current_highest"
          />
          <HStack gap={1}>
            <I18nTypography
              size={1}
              weight={700}
              i18n="earn.label_prize_pool"
            />
            <TonIcon className="w-5 h-5" />
            <I18nTypography
              size={1}
              weight={700}
              i18n="0 TON"
            />
          </HStack>
          <VStack className="pt-8">
            <I18nTypography
              size={3}
              color="var(--text-secondary)"
              weight={700}
              i18n="earn.label_game_rules"
            />
            <VStack className="p-2" width="auto" items="start">
              <I18nTypography
                size={1}
                color="var(--text-secondary)"
                i18n="earn.label_how_to_play_description_1"
              />
              <I18nTypography
                size={1}
                color="var(--text-secondary)"
                i18n="earn.label_how_to_play_description_2"
              />
              <I18nTypography
                size={1}
                color="var(--text-secondary)"
                i18n="earn.label_how_to_play_description_3"
              />
              <I18nTypography
                size={1}
                color="var(--text-secondary)"
                i18n="earn.label_how_to_play_description_4"
              />
              <I18nTypography
                size={1}
                color="var(--text-secondary)"
                i18n="earn.label_how_to_play_description_5"
              />
            </VStack>
          </VStack>
        </VStack>

        <VStack justify="end" className="flex-1 py-2" gap={4}>
          <VStack>
            <I18nTypography
              size={3}
              weight={700}
              color="var(--text-secondary)"
              i18n="earn.label_your_highest_hash"
              params={{ hash: currentHashNumericPart }}
            />
            <I18nTypography
              size={3}
              weight={700}
              i18n={currentHashNumericPart}
            />
          </VStack>
          <BaseButton
            className={clsx(
              "flex flex-row items-center justify-center border-2 border-white rounded-full p-1 h-28 w-28 :active:scale-120",
              isBetPending && "animate-glow-shadow",
              energy && energy < 35 && "opacity-50"
            )}
            disabled={isPending || Boolean(energy && energy < 35)}
            onClick={() => {
              if (energy && energy < 35) {
                return;
              }

              updateQueryData<number>(
                "/energy",
                (prev: number) => prev - 35
              );

              bet();
            }}
          >
            <HStack className="border-6 border-white rounded-full" width="100%" height="100%">
              <EnergyIcon
                className="w-8 h-8"
              />
              <I18nTypography
                size={5}
                weight={700}
                i18n="35"
              />
            </HStack>
          </BaseButton>
        </VStack>
      </VStack>
    </VStack>
  );
}