export interface SocketOptions {
  url: string;
  autoReconnect?: boolean;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
}

export interface SocketMessage<T = any> {
  type: string;
  payload?: T;
}
