"use client";

import Analysis from "@/app/_routes/Analysis";
import TradeAI from "@/app/_routes/TradeAI";
import News from "@/app/_routes/News";
import { InviteFriendsBottomSheet } from "@/components/common/InviteFriendsBottomSheet";
import Profile from "@/app/_routes/Profile";
import {
  AnalysisIcon,
  SmartToyIcon,
  NewsIcon,
  ReferralIcon,
} from "@/components/icons";

export interface Route {
  type: "default" | "tab" | "overlap";
  icon?: React.ComponentType;
  i18n?: string;
  path?: string;
  page?: React.ComponentType;
  overlap?: React.ComponentType<{ open: boolean; onClose: () => void }>;
}

export const routes: Route[] = [
  {
    type: "tab",
    icon: AnalysisIcon,
    i18n: "common.analysis",
    path: "/",
    page: Analysis,
  },
  {
    type: "tab",
    icon: SmartToyIcon,
    i18n: "common.tradeai",
    path: "/trade-ai",
    page: TradeAI,
  },
  {
    type: "tab",
    icon: NewsIcon,
    i18n: "common.news",
    path: "/news",
    page: News,
  },
  {
    type: "tab",
    icon: ReferralIcon,
    i18n: "common.invite",
    overlap: InviteFriendsBottomSheet,
  },
  {
    type: "default",
    path: "/profile",
    page: Profile,
  },
];
