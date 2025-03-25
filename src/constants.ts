import { PremiumTier } from "@/types";

export const bot_mini_app_link = "https://t.me/blocktx_bot/start";

export const official_addresses = {
  non_bounceable: "UQAHnZpnoYXQNQ9xw-NGnhgD3F8uE9lw7m36A6EzW2I5sWS2",
  bounceable: "EQAHnZpnoYXQNQ9xw-NGnhgD3F8uE9lw7m36A6EzW2I5sTlz",
};

export const official_address = official_addresses.non_bounceable;

export const premium_tiers = {
  [PremiumTier.YEARLY]: {
    price: 30,
  },
  [PremiumTier.MONTHLY]: {
    price: 5,
  },
};
