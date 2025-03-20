import clsx from "clsx";
import { useMiniApp } from "@/contexts/MiniAppContext";
import { BaseButton } from "@/components/ui/BaseButton";
import { WalletIcon } from "@/components/icons";

export function ConnectWalletButton() {
  const { tonConnect } = useMiniApp();

  if (!tonConnect) {
    return null;
  }

  return (
    <BaseButton
      className={clsx("p-[5px] rounded-full flex items-center justify-center transition-all duration-300 rounded-full border border-white/15", {
        "bg-[#31A6F5]": !tonConnect.connected,
        "bg-transparent": tonConnect.connected
      })}
      onClick={() => {
        if (!tonConnect.connected) {
          tonConnect.connect();
        } else {
          tonConnect.disconnect();
        }
      }}
    >
      <WalletIcon className="w-6 h-6" color="white" />
    </BaseButton>
  );
}