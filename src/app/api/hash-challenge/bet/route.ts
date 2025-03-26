import { NextRequest } from "next/server";
import { prisma } from "@/libs/prisma";
import { Prisma } from "@prisma/client";
import { ResponseUtils, ErrorInput } from "@/utils/ResponseUtils";
import { ControlFlowUtils } from "@/utils/ControlFlowUtils";
import { auth } from "@/actions/auth";
import { getTransactions } from "@/actions/transactions";
import { Transaction } from "@/types";
import { AppError, ErrorCodes } from "@/errors"

export async function POST(request: NextRequest) {
  try {
    const user = await auth(request, {
      energy: {
        select: {
          current: true,
        },
      },
    });

    if (user.energy!.current < 35) {
      throw new AppError(ErrorCodes.NOT_ENOUGH_ENERGY);
    }

    await ControlFlowUtils.delay(3000);

    const transactions = await ControlFlowUtils.retry<Transaction[]>({
      retries: 3,
      delay_ms: 3000,
      condition: (transactions: Transaction[]) => {
        return transactions.length > 0;
      },
    })(() => getTransactions({ limit: 1 }));

    const transaction = transactions[0];

    if (!transaction) {
      throw new AppError(ErrorCodes.INTERNAL_SERVER_ERROR);
    }

    const energy = user.energy!.current - 35;

    const hash_numeric_part = transaction.hash.match(/\d+/g)?.join("") ?? "0";

    const [hashChallenge] = await prisma.$transaction([
      prisma.hashChallenge.upsert({
        where: {
          user_id: user!.user_id,
        },
        create: {
          user_id: user!.user_id,
          hash: transaction.hash,
          hash_numeric_part: new Prisma.Decimal(hash_numeric_part),
        },
        update: {
          hash: transaction.hash,
          hash_numeric_part: new Prisma.Decimal(hash_numeric_part),
        },
        select: {
          hash: true,
          hash_numeric_part: true,
        },
      }),
      prisma.energy.update({
        where: {
          user_id: user!.user_id,
        },
        data: {
          current: energy,
        },
      }),
    ]);

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
        current: hashChallenge,
      },
      updates: [
        {
          endpoint: "/energy",
          updater: energy,
        },
        {
          endpoint: "/hash-challenge",
          updater: {
            highest: highestHashChallenge,
            current: hashChallenge,
          },
        },
      ],
    });
  } catch (error) {
    return ResponseUtils.error(error as ErrorInput);
  }
}
