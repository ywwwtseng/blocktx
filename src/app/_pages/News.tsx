import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@/hooks/useQuery";
import { I18nTypography } from "@/components/common/I18nTypography";
import { TickerTape } from "@/components/common/TickerTape";
import { LoadingIcon } from "@/components/icons";
import { HStack, VStack } from "@/components/ui/Stack";
import { Article } from "@/types";

export default function News() {
  const { data: news, isPending } = useQuery<Article[]>("/news");

  if (isPending || !news) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingIcon />
      </div>
    );
  }

  return (
    <div className="h-full w-full px-4 py-2 flex flex-col">
      <TickerTape />
      <div className="mt-1 flex-1 flex flex-col overflow-y-auto no-scrollbar">
        {news.map((item: Article, index: number) => (
          <Link href={item.link} key={index} className="py-2 border-b border-b-border-1 border-[#333] last:border-b-0">
            <HStack gap={2}>
              <Image
                className="animate-fade-in w-[135px] h-[75px]"
                src={item.image}
                alt={item.title}
                width={135}
                height={75}
                />
              <VStack items="start" gap={0.5}>
                <I18nTypography lineClamp={3} i18n={item.title} size={2} weight={700} />
                <I18nTypography
                color="var(--text-secondary)"
                i18n={item.created_at} size={1} weight={400} />
            </VStack>
          </HStack>
          </Link>
          
        ))}
      </div>
    </div>
  );
}