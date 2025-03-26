"use server";

import { prisma } from "@/libs/prisma";
import { isSameDay, isBefore } from "@/libs/dayjs";

export const getRestoreEnergy = async (telegram_id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      telegram_id,
    },
    include: {
      last_login_log: true,
      energy: true,
    },
  });

  if (!user) {
    return {
      enabled: false,
      value: 100,
    };
  }

  const lastLoginAt = user.last_login_log!.updated_at;
  const timezone = user.timezone as string;
  const enabled = !isSameDay(lastLoginAt, new Date(), timezone);

  const isPremium = user.premium_ends_at && isBefore(user.premium_ends_at, new Date(), timezone);

  const currentEnergy = user.energy!.current || 100;
  const maxEnergy = user.energy!.max || 100;

  return {
    enabled,
    value: isPremium
      ? maxEnergy
      : Math.min(currentEnergy + 10, maxEnergy),
  };
};
