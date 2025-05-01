import clsx from "clsx";
import { useRouter } from 'next/navigation';
import { useMiniApp } from "../../contexts/MiniAppContext";
import { BaseButton } from "../ui/BaseButton";
import { WalletIcon } from "../icons";

export function ConnectWalletButton() {
  const { tonConnect } = useMiniApp();
  const router = useRouter();

  if (!tonConnect) {
    return null;
  }

  return (
    <BaseButton
      className={clsx("p-[6px] rounded-full flex items-center justify-center transition-all duration-300 rounded-full border border-white/15", {
        "bg-[#31A6F5]": !tonConnect.connected,
        "bg-transparent": tonConnect.connected
      })}
      onClick={() => {
        if (!tonConnect.connected) {
          tonConnect.connect();
        } else {
          router.push("/profile");
        }
      }}
    >
      <WalletIcon className="w-6 h-6" color="white" />
    </BaseButton>
  );
}