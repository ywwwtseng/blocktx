import { NextRequest } from "next/server";
import { prisma } from "@/libs/prisma";
import { ResponseUtils, TError } from "@/utils/ResponseUtils";

interface Params {
  locale: string;
}

export async function GET(req: NextRequest, props: {params: Promise<Params>}) {
  try {
    // await prisma.article.deleteMany();
    const params = await props.params;
    const locale = params.locale === "zh-CN" ? "zh-CN" : "en";

    const news = await prisma.article.findMany({
      where: {
        locale,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return ResponseUtils.json({
      data: news,
    });
  } catch (error) {
    console.error(error);
    return ResponseUtils.error(error as TError);
  }
}