import { Prisma, PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient({
  // log: process.env.NODE_ENV === "production" ? [] : ["query", "info", "warn", "error"],
});

globalForPrisma.prisma = prisma;

export type ConvertDecimal<T> = {
  [K in keyof T]: T[K] extends Prisma.Decimal | null
    ? string | null
    : T[K] extends Prisma.Decimal
      ? string
      : T[K];
};


