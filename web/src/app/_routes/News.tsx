import Image from "next/image";
import Link from "next/link";
import { Article } from "@prisma/client";
import { formatDurationShort } from "../../libs/dayjs";
import { useClient } from "../../contexts/ClientContext";
import { useQuery } from "../../hooks/useQuery";
import { I18nTypography } from "../../components/common/I18nTypography";
import { TradingPairChip } from "../../components/common/TradingPairChip";
import { TickerTape } from "../../components/common/TickerTape";
import { HStack, VStack } from "../../components/ui/Stack";
import { LoadingIcon } from "../../components/icons";

export default function News() {
  const { languageCode } = useClient();
  const { data: news, isPending } = useQuery<Article[]>(`/news/${languageCode === "en" ? "en" : "zh-CN"}`, {
    needAuthorized: true,
  });

  if (!news ||isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingIcon />
      </div>
    );
  }

  return (
    <div className="animate-fade-in h-full w-full flex flex-col">
      <TickerTape />
      <div className="flex-1 px-4 pb-2 flex flex-col overflow-y-auto no-scrollbar">
        {news.map((article: Article) => (
          <Link 
            key={article.id}
            href={article.link}
            target="_blank"
            className="py-2 border-b border-b-border-1 border-[#333] last:border-b-0">
            <HStack gap={1} height={80}>
              {article.trading_pairs.length <= 2 && (
                <Image
                  className="animate-fade-in min-w-[135px] w-[135px] h-[75px]"
                  src={article.image.replace("https://blocktx.vercel.app", "")}
                  alt={article.title}
                  width={135}
                  height={75}
                />
              )}
              <VStack items="start" justify="between" height="100%" gap={0.5}>
                <I18nTypography className="pl-1" lineClamp={3} i18n={article.title} size={2} weight={700} />
                <HStack justify="between" width="100%">
                  <HStack gap={1} justify="start">
                    {article.trading_pairs.map((pair) => <TradingPairChip key={pair} pair={pair} />)}
                  </HStack>
                  <I18nTypography
                    noWrap
                    className="mt-auto"
                    color="var(--text-secondary)"
                    i18n={formatDurationShort(article.created_at, languageCode === "en" ? "en" : "zh-CN")}
                    size={languageCode === "en" ? 2 : 1}
                    weight={400}
                  />
                </HStack>
              </VStack>
            </HStack>
          </Link>
        ))}
      </div>
    </div>
  );
}