import { NextRequest } from "next/server";
import { TimeUtils } from "@/utils/TimeUtils";
import { prisma } from "@/libs/prisma";
import { ResponseUtils, TError } from "@/utils/ResponseUtils";

interface Params {
  locale: string;
}

export async function GET(req: NextRequest, props: {params: Promise<Params>}) {
  try {
    await prisma.article.deleteMany({
      where: {
        created_at: {
          lt: new Date(Date.now() - TimeUtils.ms("14d")),
        },
      },
    });

    const params = await props.params;
    const locale = params.locale === "zh-CN" ? "zh-CN" : "en";

    const news = await prisma.article.findMany({
      where: {
        locale,
      },
      orderBy: {
        created_at: "desc",
      },
      take: 20,
    });

    return ResponseUtils.json({
      data: news,
    });
  } catch (error) {
    console.error(error);
    return ResponseUtils.error(error as TError);
  }
}