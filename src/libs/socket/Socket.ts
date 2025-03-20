import { SocketOptions, SocketMessage } from "./types";

/**
 * WebSocket 客戶端封裝類，提供自動重連、錯誤處理和狀態管理功能。
 * 
 * @example
 * ```typescript
 * const socket = new Socket({
 *   url: 'wss://example.com',
 *   autoReconnect: true,
 *   reconnectInterval: 3000,
 *   maxReconnectAttempts: 5
 * });
 * 
 * socket.connect();
 * 
 * // 監聽授權錯誤
 * window.addEventListener('websocket:auth_error', (event: CustomEvent) => {
 *   console.log('Auth error:', event.detail.reason);
 * });
 * ```
 */
export class Socket {
  private readonly options: Required<SocketOptions>;
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private networkListener = false;
  private rateLimitDelay = 30000; // 預設 30 秒
  private visibilityListener = false;
  private isManualClose = false;
  private isAuthError = false;  // 新增授權錯誤標記

  public onOpen: (() => void) | null = null;

  /**
   * 建立新的 WebSocket 客戶端實例
   * @param options - WebSocket 連接配置選項
   */
  constructor(options: SocketOptions) {
    this.options = {
      autoReconnect: true,
      reconnectInterval: 3000,
      maxReconnectAttempts: 5,
      ...options
    };
  }

  /**
   * 是否可以進行重連
   */
  get canReconnect(): boolean {
    return !this.isManualClose && !this.isAuthError && navigator.onLine;
  }

  /**
   * 建立 WebSocket 連接
   * 如果已經連接或之前發生授權錯誤，則不會重新連接
   */
  connect(): void {
    if (this.isConnected()) return;
    
    // 重置狀態
    this.isManualClose = false;
    this.isAuthError = false;

    try {
      this.ws = new WebSocket(this.options.url);
      
      this.bindEvents();
      this.bindNetworkEvents();
      this.bindVisibilityEvents();
    } catch (error) {
      console.error("WebSocket connection error:", error);
      if (this.canReconnect) {
        this.handleReconnect();
      }
    }
  }

  /**
   * 綁定網絡狀態事件監聽器
   * 處理在線/離線狀態變化
   * @private
   */
  private bindNetworkEvents(): void {
    if (this.networkListener) return;
    
    window.addEventListener("online", () => {
      console.log("🌐 Network is back online");
      if (this.canReconnect) {
        this.reconnectAttempts = 0;
        this.connect();
      }
    });

    window.addEventListener("offline", () => {
      console.log("🔌 Network is offline");
      this.disconnect();
    });

    this.networkListener = true;
  }

  /**
   * 綁定頁面可見性事件監聽器
   * 處理頁面切換到前台/後台
   * @private
   */
  private bindVisibilityEvents(): void {
    if (this.visibilityListener) return;
    
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible" && this.canReconnect) {
        console.log("👁 App is visible, checking connection...");
        if (!this.isConnected()) {
          this.reconnectAttempts = 0;
          this.connect();
        }
      } else {
        console.log("💤 App is hidden");
      }
    });

    this.visibilityListener = true;
  }

  /**
   * 綁定 WebSocket 事件處理器
   * 包括連接、斷開、錯誤和消息接收
   * @private
   */
  private bindEvents(): void {
    if (!this.ws) return;

    this.ws.onopen = () => {
      console.log("WebSocket connected");
      this.reconnectAttempts = 0;
      this.rateLimitDelay = 30000;
      this.onOpen?.();
    };

    this.ws.onclose = (event) => {
      console.log("WebSocket disconnected", event.code, event.reason);
      
      // 檢查是否為授權錯誤
      if (event.code === 1008) {
        const reason = event?.reason?.toLowerCase();

        const isAuthError =
          reason.includes("auth")
          || reason.includes("unauthorized")
          || reason.includes("forbidden");
        
        if (isAuthError) {
          this.handleAuthError(event.reason);
          return;
        }
      }

      // 特定錯誤代碼處理
      switch (event.code) {
        case 1006: // 異常關閉
        case 1012: // 服務器重啟
          if (this.canReconnect) {
            this.handleServerRestart();
          }
          break;
        case 1008: // Policy violation (rate limit)
        case 1013: // Try again later
          if (!this.isAuthError) {
            this.handleRateLimit(event.reason);
          }
          break;
        case 4001: // 自定義授權錯誤代碼
        case 4003: // 自定義權限錯誤代碼
          this.handleAuthError(event.reason);
          break;
        default:
          if (this.canReconnect) {
            this.handleReconnect();
          }
      }
    };

    this.ws.onerror = (error: Event) => {
      if (error instanceof ErrorEvent) {
        console.error("WebSocket error:", error.message);

        // 檢查是否為 HTTP 錯誤響應
        if (error.message?.includes("429")) {
          this.handleRateLimit("Too Many Requests");
        }
      }
    };

    this.ws.onmessage = (event) => {
      try {
        const message: SocketMessage = JSON.parse(event.data);
        this.handleMessage(message);
      } catch (error) {
        console.error("Failed to parse message:", error);
      }
    };
  }

  /**
   * 處理速率限制錯誤
   * 使用指數退避算法延遲重試
   * @param reason - 限制原因
   * @private
   */
  private handleRateLimit(reason: string): void {
    console.log(`⚠️ Rate limited: ${reason}, will retry in ${this.rateLimitDelay/1000} seconds`);

    setTimeout(() => {
      if (!navigator.onLine) {
        console.log("Network is offline, skipping reconnect");
        return;
      }

      // 指數增加延遲時間，但最多不超過 5 分鐘
      this.rateLimitDelay = Math.min(this.rateLimitDelay * 2, 300000);
      this.reconnectAttempts = 0; // 重置重連次數
      this.connect();
    }, this.rateLimitDelay);
  }

  /**
   * 處理服務器重啟情況
   * 使用隨機延遲避免重連風暴
   * @private
   */
  private handleServerRestart(): void {
    if (!this.options.autoReconnect) return;
    
    const randomDelay = Math.floor(Math.random() * 4000) + 1000;
    
    console.log(`🔄 Server might be restarting, will retry in ${randomDelay/1000} seconds`);
    
    setTimeout(() => {
      if (!navigator.onLine) {
        console.log("Network is offline, skipping reconnect");
        return;
      }

      this.reconnectAttempts = 0;
      this.connect();
    }, randomDelay);
  }

  /**
   * 處理一般重連邏輯
   * 使用指數退避和抖動算法
   * @private
   */
  private handleReconnect(): void {
    if (!this.options.autoReconnect) return;

    if (this.reconnectAttempts >= this.options.maxReconnectAttempts) {
      console.error("Max reconnection attempts reached");
      return;
    }

    const backoffInterval = Math.min(
      this.options.reconnectInterval * Math.pow(2, this.reconnectAttempts),
      30000
    );
    const jitter = Math.random() * 1000;
    const finalInterval = backoffInterval + jitter;

    setTimeout(() => {
      if (!navigator.onLine) {
        console.log("Network is offline, skipping reconnect");
        return;
      }

      console.log(`Reconnecting... Attempt ${this.reconnectAttempts + 1}`);
      this.reconnectAttempts++;
      this.connect();
    }, finalInterval);
  }

  /**
   * 處理收到的 WebSocket 消息
   * @param message - 接收到的消息物件
   * @private
   */
  private handleMessage(message: SocketMessage): void {
    console.log("Received message:", message);
  }

  /**
   * 發送消息到 WebSocket 服務器
   * @param message - 要發送的消息物件
   */
  send(message: SocketMessage): void {
    console.log(message,  this.ws?.readyState)
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not connected");
      return;
    }

    try {
      this.ws.send(JSON.stringify(message));
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  }

  /**
   * 斷開 WebSocket 連接並清理相關資源
   */
  disconnect(): void {
    if (!this.ws) return;
    
    if (this.networkListener) {
      window.removeEventListener("online", this.connect);
      window.removeEventListener("offline", this.disconnect);
      this.networkListener = false;
    }

    if (this.visibilityListener) {
      document.removeEventListener("visibilitychange", this.connect);
      this.visibilityListener = false;
    }

    this.ws.close();
    this.ws = null;
  }

  /**
   * 檢查 WebSocket 是否處於已連接狀態
   * @returns 如果 WebSocket 已連接並處於開啟狀態則返回 true
   */
  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  /**
   * 手動斷開 WebSocket 連接
   * 不會觸發自動重連機制
   */
  manualDisconnect(): void {
    console.log("🔴 Manual disconnect requested");
    this.isManualClose = true;
    this.disconnect();
  }

  /**
   * 處理授權相關錯誤
   * 觸發自定義事件通知外部處理
   * @param reason - 授權錯誤原因
   * @private
   */
  private handleAuthError(reason: string): void {
    console.error(`⛔ Authentication failed: ${reason}`);
    this.isAuthError = true;
    
    // 觸發授權錯誤事件
    const event = new CustomEvent("websocket:auth_error", {
      detail: { reason }
    });
    window.dispatchEvent(event);
  }

  /**
   * 重置授權錯誤狀態
   * 通常在重新獲得授權後調用
   */
  resetAuthState(): void {
    this.isAuthError = false;
  }
}
