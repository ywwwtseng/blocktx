import { NextRequest } from "next/server";
import { ResponseUtils, TError } from "@/utils/ResponseUtils";
import { TimeUtils } from "@/utils/TimeUtils";
import { Article } from "@prisma/client";
import { prisma } from "@/libs/prisma";
import { send_message } from "@/actions/bot";
import { RawArticle } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rawArticles = body.data;

    await prisma.article.deleteMany({
      where: {
        created_at: {
          lt: new Date(Date.now() - TimeUtils.ms("14d")),
        },
      },
    });

    const exists = await prisma.article.findMany({
      where: {
        OR: [
          {
            link: {
              in: rawArticles.map((article: RawArticle) => article.link),
            },
          },
          {
            title: {
              in: rawArticles.map((article: RawArticle) => article.title),
            },
          },
        ],
        created_at: {
          gte: new Date(Date.now() - TimeUtils.ms("1d")),
        },
      },
    });

    const notExists = rawArticles
      .filter(
        (article: RawArticle) => !exists.some((e: Article) => e.link === article.link || e.title === article.title)
      );

    // const latestArticleEn = await prisma.article.findFirst({
    //   where: {
    //     locale: "en",
    //   },
    //   orderBy: {
    //     created_at: "desc",
    //   },
    // });

    // const latestArticleZh = await prisma.article.findFirst({
    //   where: {
    //     locale: "zh-CN",
    //   },
    //   orderBy: {
    //     created_at: "desc",
    //   },
    // });
    // const startImageIndexEn = latestArticleEn ? parseInt(latestArticleEn.image.split("-")[1]) + 1 : 0;
    // const startImageIndexZh = latestArticleZh ? parseInt(latestArticleZh.image.split("-")[1]) + 1 : 0;

    const data = [
      ...notExists
        .filter((article: RawArticle) => article.locale === "en")
        .reverse()
        .map((article: RawArticle,) => ({
        // .map((article: RawArticle, index: number) => ({
          ...article,
          description: article.description.slice(0, 4096),
          image: `https://blocktx.vercel.app/binance-0.webp`,
          // image: `https://blocktx.vercel.app/crypto-${(startImageIndexEn + index) % 20}.webp`,
          created_at: new Date(article.created_at),
          ...(article.trading_pairs.length > 0 ? { trading_pairs: article.trading_pairs } : {}),
        })),
      ...notExists
        .filter((article: RawArticle) => article.locale === "zh-CN")
        .reverse()
        .map((article: RawArticle) => ({
        // .map((article: RawArticle, index: number) => ({
          ...article,
          description: article.description.slice(0, 4096),
          image: `https://blocktx.vercel.app/binance-0.webp`,
          // image: `https://blocktx.vercel.app/crypto-${(startImageIndexZh + index) % 20}.webp`,
          created_at: new Date(article.created_at),
          ...(article.trading_pairs.length > 0 ? { trading_pairs: article.trading_pairs } : {}),
        })),
    ];

    await prisma.article.createMany({
      data,
    });

    for (const article of data) {
      if (new Date(article.created_at) > new Date(Date.now() - 1000 * 60 * 15)) {
        const relatedTradingPairs = article.trading_pairs.length > 0 ? `【${article.trading_pairs.join(", ")}】` : "";
        const description = article.description.length > 200 ? `${article.description.slice(0, 200)}...` : article.description;

        await send_message({
          chat_id: "5699547696",
          message: `${relatedTradingPairs}${article.title}\n\n${description}`,
          photo_url: article.image,
          lang_code: article.locale === "zh-CN" ? "zh" : "en",
          link: article.link,
        });
      }
    }

    return ResponseUtils.json({
      data: `Created ${notExists.length} articles`,
    });
  } catch (error) {
    console.error(error);
    return ResponseUtils.error(error as TError);
  }
}