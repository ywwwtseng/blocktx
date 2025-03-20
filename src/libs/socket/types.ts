export interface SocketOptions {
  url: string;
  autoReconnect?: boolean;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
}

export interface SocketMessage {
  method: string;
  params: string[];
  id: number;
}
