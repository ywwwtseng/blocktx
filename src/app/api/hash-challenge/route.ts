import { NextRequest } from "next/server";
import { prisma } from "@/libs/prisma";
import { auth } from "@/actions/auth";
import { ResponseUtils } from "@/utils/ResponseUtils";

export async function GET(request: NextRequest) {
  const user = await auth(request, {
    hash_challenge: {
      select: {
        hash: true,
        hash_numeric_part: true,
      },
    },
  });

  const highestHashChallenge = await prisma.hashChallenge.findFirst({
    orderBy: [
      { hash_numeric_part: "desc" },
      { created_at: "asc" },
    ],
    select: {
      hash: true,
      hash_numeric_part: true,
    },
  });

  return ResponseUtils.json({
    data: {
      highest: highestHashChallenge,
      current: user.hash_challenge,
    },
  });
}
