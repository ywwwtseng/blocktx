"use client";

import { InviteFriendsBottomSheet } from "@/components/common/InviteFriendsBottomSheet";
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
  },
  {
    type: "tab",
    icon: SmartToyIcon,
    i18n: "common.tradeai",
    path: "/trade-ai",
  },
  {
    type: "tab",
    icon: NewsIcon,
    i18n: "common.news",
    path: "/news",
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
  },
];
