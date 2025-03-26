import clsx from "clsx";
import { useQuery } from "@/hooks/useQuery";
import { useMutation } from "@/hooks/useMutation";
import { useUpdateQueryData } from "@/hooks/useUpdateQueryData";
import { I18nTypography } from "@/components/common/I18nTypography";
import { VStack, HStack } from "@/components/ui/Stack";
import { BaseButton } from "@/components/ui/BaseButton";
import { TonIcon, EnergyIcon } from "@/components/icons";

export default function Earn() {
  const { mutate: bet, isPending } = useMutation("/hash-challenge/bet");
  const updateQueryData = useUpdateQueryData();
  const { data: energy } = useQuery<number>("/energy", {
    needAuthorized: true,
  });

  return (
    <VStack justify="between" className="flex-1 animate-fade-in">
      <I18nTypography
        fontFamily="var(--font-orbitron)"
        size={6}
        weight={700}
        i18n="earn.title"
      />
      <VStack className="flex-1">
        <VStack justify="start" className="pt-12 flex-1">
          <I18nTypography
            className="animate-glow-text"
            fontFamily="var(--font-rajdhani)"
            size={10}
            lineHeight={0.7}
            weight={700}
            i18n="???????"
          />
          <I18nTypography
            fontFamily="var(--font-orbitron)"
            size={1}
            weight={700}
            i18n="earn.label_current_highest"
          />
          <HStack gap={1}>
            <I18nTypography
              fontFamily="var(--font-orbitron)"
              size={1}
              weight={700}
              i18n="earn.label_prize_pool"
            />
            <TonIcon className="w-5 h-5" />
            <I18nTypography
              fontFamily="var(--font-orbitron)"
              size={1}
              weight={700}
              i18n="10 TON"
            />
          </HStack>
          <VStack className="pt-8">
            <I18nTypography
              fontFamily="var(--font-orbitron)"
              size={3}
              weight={700}
              i18n="earn.label_game_rules"
            />
            <VStack className="p-2" width="auto" items="start">
              <I18nTypography
                fontFamily="var(--font-orbitron)"
                size={1}
                weight={700}
                i18n="earn.label_how_to_play_description_1"
              />
              <I18nTypography
                fontFamily="var(--font-orbitron)"
                size={1}
                weight={700}
                i18n="earn.label_how_to_play_description_2"
              />
              <I18nTypography
                fontFamily="var(--font-orbitron)"
                size={1}
                weight={700}
                i18n="earn.label_how_to_play_description_3"
              />
              <I18nTypography
                fontFamily="var(--font-orbitron)"
                size={1}
                weight={700}
                i18n="earn.label_how_to_play_description_4"
              />
              <I18nTypography
                fontFamily="var(--font-orbitron)"
                size={1}
                weight={700}
                i18n="earn.label_how_to_play_description_5"
              />
            </VStack>
          </VStack>
        </VStack>

        <VStack className="py-4" gap={8}>
          <I18nTypography
            fontFamily="var(--font-orbitron)"
            size={3}
            weight={700}
            i18n="earn.label_your_hash"
            params={{ hash: "1234567890" }}
          />
          <BaseButton
            className={clsx("mt-auto flex flex-row items-center justify-center border-2 border-white rounded-full h-24 w-24 :active:scale-120", isPending && "animate-glow-shadow")}
            disabled={isPending}
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
            <EnergyIcon
              className="w-8 h-8"
            />
            <I18nTypography
              fontFamily="var(--font-orbitron)"
              size={5}
              weight={700}
              i18n="35"
            />
          </BaseButton>
        </VStack>
      </VStack>
    </VStack>
  );
}