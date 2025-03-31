import { NextRequest } from "next/server";
import { prisma } from "@/libs/prisma";
import { ResponseUtils, ErrorInput } from "@/utils/ResponseUtils";
import { validate } from "@/actions/tma";

export async function POST(request: NextRequest) {
  try {
    const { telegram_id } = await validate(request);
    const body = await request.json();

    const user = await prisma.user.update({
      where: {
        telegram_id,
      },
      data: {
        language_code: body.language_code,
      },
      select: {
        language_code: true,
      },
    });

    return ResponseUtils.json({
      data: user,
    });

  } catch (error) {
    console.error(error);
    return ResponseUtils.error(error as ErrorInput);
  }
}

