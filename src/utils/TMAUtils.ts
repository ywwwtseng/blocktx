import { NextRequest } from "next/server";

import { validate } from "@telegram-apps/init-data-node";

import { JsonUtils } from "@/utils/JsonUtils";
import { AppError, ErrorCodes } from "@/errors";

export type InitDataUser<T> = T & { first_name: string; last_name: string; nickname: string };

export class TMAUtils {
  static validate(request: NextRequest) {
    const authorization = request.headers.get("Authorization");

    if (!authorization || !authorization.includes("tma")) {
      throw new AppError(ErrorCodes.INVALID_CREDENTIALS, "Authorization header is missing or invalid");
    }

    const initData = new URLSearchParams(authorization.replace("tma ", ""));

    try {
      if (process.env.NODE_ENV === "production") {
        validate(initData, process.env.TELEGRAM_BOT_TOKEN!);
      }

      const user = JsonUtils.parse(initData.get("user")!);

      if (!user) {
        throw new AppError(ErrorCodes.INVALID_CREDENTIALS, "User not found");
      }

      return {
        telegram_id: String(user.id),
        nickname: user.nickname || "",
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        photo_url: user.photo_url || null,
        language_code: user.language_code || null,
        start_param: initData.get("start_param") || null,
      };
    } catch {
      throw new AppError(ErrorCodes.INVALID_CREDENTIALS, process.env.TELEGRAM_BOT_TOKEN!);
    }
  }
}
