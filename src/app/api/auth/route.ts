import { NextRequest } from "next/server";
import { ResponseUtils, ErrorInput } from "@/utils/ResponseUtils";
import { TMAUtils } from "@/utils/TMAUtils";

export async function POST(request: NextRequest) {
  try {
    const user = TMAUtils.validate(request);
    const body = await request.json();

    return ResponseUtils.json({
      data: {
        telegram_id: user.telegram_id,
        language_code: body.language_code,
      },
    });
  } catch (error) {
    return ResponseUtils.error(error as ErrorInput);
  }
}