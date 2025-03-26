import { NextRequest } from "next/server";
import { auth } from "@/actions/auth";
import { ResponseUtils, ErrorInput } from "@/utils/ResponseUtils";

export async function GET(request: NextRequest) {
  try {
    const user = await auth(request, {
      energy: {
        select: {
          current: true,
        },
      },
    });

    return ResponseUtils.json({
      data: user.energy!.current,
    });
  } catch (error) {
    return ResponseUtils.error(error as ErrorInput);
  }
}
