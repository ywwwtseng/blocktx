import { shareURL } from "@telegram-apps/sdk-react";
import { toast } from "react-toastify";
import { useClient } from "../contexts/ClientContext";
import { useI18n } from "../contexts/I18nContext";
import { useMiniApp } from "../contexts/MiniAppContext";
import { bot_mini_app_link } from "../constants";
import { NumberUtils } from "../utils/NumberUtils";

export function useShareUrl() {
  const client = useClient();
  const invite_code = client.user?.invite_code;
  return invite_code
    ? `${bot_mini_app_link}?startapp=r_${NumberUtils.padNumber(invite_code)}`
    : bot_mini_app_link;
} 

export function useShare() {
  const { platform } = useMiniApp();
  const { t } = useI18n();

  const url = useShareUrl();

  const share = () => {
    const isWebOrDesktop = platform?.includes("web")
      || platform === "macos"
      || platform === "tdesktop";
    const text = isWebOrDesktop
      ? `\n${t("messages.share_text")}`
      : t("messages.share_text");

    shareURL(url, text);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast(t("messages.invite_link_copied_to_clipboard"));
    } catch {
      toast.error(t("messages.copy_invite_link_failed"));
    }
  };

  return { share, copy, url };
}
