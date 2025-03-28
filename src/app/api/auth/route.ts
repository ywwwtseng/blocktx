import { NextRequest } from "next/server";
import { prisma } from "@/libs/prisma";
import { RequestUtils } from "@/utils/RequestUtils";
import { ResponseUtils, ErrorInput } from "@/utils/ResponseUtils";
import { StartParamType } from "@/utils/TMAUtils";
import { validate } from "@/actions/tma";

export async function POST(request: NextRequest) {
  try {
    const ipinfo = await RequestUtils.ipinfo(request);

    const {
      telegram_id,
      nickname,
      photo_url,
      language_code,
      start_param,
    } = await validate(request);

    const user = await prisma.user.upsert({
      where: {
        telegram_id,
      },
      create: {
        telegram_id,
        nickname,
        timezone: ipinfo.timezone,
        avatar_url: photo_url || null,
        language_code: language_code || "en",
      },
      update: {
        nickname,
        timezone: ipinfo.timezone,
        last_login_log: {
          update: {
            ip: ipinfo.ip,
            country: ipinfo.country,
            city: ipinfo.city,
            timezone: ipinfo.timezone,
            user_agent: request.headers.get("user-agent") || "unknown",
          },
        },
      },
    });

    if (
      start_param.type === StartParamType.REFERRAL
      && !user.invited_by_id
    ) {
      const invite_code = start_param.value as number;

      if (invite_code && invite_code !== user.invite_code) {
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
    console.error(error);
    return ResponseUtils.error(error as ErrorInput);
  }
}