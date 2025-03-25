"use client";

import { ConnectedWallet, TonConnectUI } from "@tonconnect/ui";

import { MockTonConnectUI } from "./MockTonConnectUI";
import { TransactionMessage } from "./types";

interface TonConnectParameters {
  TonConnectUI: typeof TonConnectUI | typeof MockTonConnectUI;
  onStatusChange: (wallet?: ConnectedWallet | null) => void;
}

const DEFAULT_TON_CONNECT_PARAMETERS = {
  TonConnectUI: TonConnectUI,
  onStatusChange: () => {},
};

export { MockTonConnectUI, TonConnectUI };
export type { ConnectedWallet };

export class TonConnect {
  private static _instance: TonConnect;
  public tonConnectUI: TonConnectUI | MockTonConnectUI;

  private constructor({ TonConnectUI, onStatusChange }: TonConnectParameters = DEFAULT_TON_CONNECT_PARAMETERS) {
    this.tonConnectUI = new TonConnectUI({
      manifestUrl: new URL("tonconnect-manifest.json", window.location.href).toString(),
    });

    this.tonConnectUI.onStatusChange(onStatusChange);
  }

  public static getInstance({ TonConnectUI, onStatusChange }: TonConnectParameters = DEFAULT_TON_CONNECT_PARAMETERS): TonConnect {
    if (!this._instance) {
      this._instance = new TonConnect({ TonConnectUI, onStatusChange }); // 如果实例不存在，则创建一个新的实例
    }
    return this._instance; // 返回单例实例
  }

  public async connect() {
    if (!this.connected) {
      // await this.tonConnectUI.openSingleWalletModal("telegram-wallet");
      await this.tonConnectUI.openModal();
    }
  }

  public async disconnect() {
    await this.tonConnectUI.disconnect();
  }

  public async sendTransaction(message: TransactionMessage) {
    try {
      const result = await this.tonConnectUI.sendTransaction({
        validUntil: Math.floor(Date.now() / 1000) + 360, // 360 sec
        messages: [ message ]
      });

      return result;
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  }

  get wallet() {
    return this.tonConnectUI.wallet;
  }

  get connected() {
    return this.tonConnectUI.connected;
  }
}