"use server";

import { Prisma } from "@prisma/client";
import { prisma } from "@/libs/prisma";
import { NextRequest } from "next/server";
import { validate } from "@/actions/tma";
import { AppError, ErrorCodes } from "@/errors";

export const auth = async (request: NextRequest, include: Prisma.UserInclude = {}) => {
  const { telegram_id } = await validate(request);

  const user = await prisma.user.findUnique({
    where: {
      telegram_id,
    },
    include,
  });

  if (!user) {
    throw new AppError(ErrorCodes.INVALID_TOKEN);
  }

  return user;
};