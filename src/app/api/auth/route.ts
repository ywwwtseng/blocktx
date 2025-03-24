import { NextRequest } from "next/server";
import { prisma } from "@/libs/prisma";
import { RequestUtils } from "@/utils/RequestUtils";
import { ResponseUtils, ErrorInput } from "@/utils/ResponseUtils";
import { TMAUtils } from "@/utils/TMAUtils";

export async function POST(request: NextRequest) {
  try {
    const ipinfo = await RequestUtils.ipinfo(request);
    const {
      telegram_id,
      nickname,
      photo_url,
      language_code,
      start_param,
    } = TMAUtils.validate(request);

    const user = await prisma.user.upsert({
      where: {
        telegram_id,
      },
      create: {
        telegram_id,
        nickname,
        avatar_url: photo_url || null,
        language_code: language_code || "en",
        energy: {
          create: {
            current: 100,
            max: 100,
          },
        },
        last_login_log: {
          create: {
            ip: ipinfo?.ip || "unknown",
            country: ipinfo?.country || "unknown",
            city: ipinfo?.city || "unknown",
            timezone: ipinfo?.timezone || "unknown",
            user_agent: request.headers.get("user-agent") || "unknown",
          },
        },
      },
      update: {
        nickname,
        last_login_log: {
          update: {
            ip: ipinfo?.ip || "unknown",
            country: ipinfo?.country || "unknown",
            city: ipinfo?.city || "unknown",
            timezone: ipinfo?.timezone || "unknown",
            user_agent: request.headers.get("user-agent") || "unknown",
          },
        },
      },
    });

    if (
      start_param
      && start_param.startsWith("r_")
      && !user.invited_by_id
    ) {
      const invite_code = Number(start_param.replace("r_", ""));

      if (invite_code !== user.invite_code) {
        const invited_by = await prisma.user.findUnique({
          where: {
            invite_code,
          },
        });

        if (invited_by) {
          await prisma.user.update({
            where: {
              telegram_id,
            },
            data: {
              invited_by_id: invited_by.user_id,
            },
          });
        }
      }
    }

    return ResponseUtils.json({
      data: user,
    });
  } catch (error) {
    return ResponseUtils.error(error as ErrorInput);
  }
}