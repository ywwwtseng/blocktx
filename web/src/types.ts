export type Maybe<T> = T | null | undefined;

export enum PremiumTier {
  YEARLY = "yearly",
  MONTHLY = "monthly",
}

export interface FetchTransactionsParams {
  limit?: number;
  account?: string;
  end_lt?: number;
  start_lt?: number;
  start_utime?: number;
  end_utime?: number;
  hash?: string;
  seqno?: number;
  shard?: string;
  offset?: number;
  sort?: string;
  workchain?: number;
}

export interface TransactionAccountState {
  account: string;
  account_state: string;
  balance: string;
  code_hash: string;
  data_hash: string;
  forzen_hash: string;
  hash: string;
}

export interface TransactionOutMsg {
  destination: string;
  value: string;
  fwd_fee: string;
}

export interface Transaction {
  account: string;
  account_friendly: string;
  account_state_after: TransactionAccountState;
  account_state_before: TransactionAccountState;
  account_state_hash_after: string;
  account_state_hash_before: string;
  block_ref: {
    seqno: number;
    shard: string;
    workchain: number;
  };
  description: {
    aborted: boolean;
    action: {
      action_list_hash: string;
      msgs_created: number;
      no_funds: boolean;
      result_code: number;
      skipped_actions: number;
      spec_actions: number;
      state_change: string;
      success: boolean;
      tot_actions: number;
      tot_msg_size: {
        bits: string;
      }
      total_action_fees: string;
      total_fwd_fees: string;
      valid: boolean;
    };
    bounce: {
      type: string;
    };
    compute_ph: {
      account_activated: boolean;
      exit_code: number;
      gas_credit: string;
      gas_fees: string;
      gas_limit: string;
      gas_used: string;
      mode: number;
      mdg_state_used: boolean;
      success: boolean;
      type: string;
      vm_final_state_hash: string;
      vm_init_state_hash: string;
      vm_steps: number;
    };
    credit_first: number;
    credit_ph: {
      credit: string;
      due_fees_collected: string;
    };
    destroyed: boolean;
    storage_ph: {
      state_change: string;
      storage_fees_collected: string;
    };
    type: string;
  };
  end_status: string;
  hash: string;
  in_msg: {
    bounce: boolean;
    bounced: boolean;
    created_at: string;
    created_lt: string;
    destination: string;
    destination_friendly: string;
    fwd_fee: string;
    hash: string;
    ihr_disabled: boolean;
    ihr_fee: string;
    import_fee: string;
    init_state: {
      hash: string;
      body: string;
    };
    message_content: {
      hash: string;
      body: string;
      decoded: null | string;
      opcode: string;
      source: string;
      source_friendly: string;
      value: string;
    }
  };
  lt: number;
  now: number;
  orig_status: string;
  out_msgs: TransactionOutMsg[];
  prev_trans_hash: string;
  prev_trans_lt: number;
  total_fees: number;
  trace_id: null | string; 
}

export interface Article {
  image: string;
  title: string;
  link: string;
  created_at: string;
}

export type Interval = "1m" | "5m" | "15m" | "30m" | "1h" | "4h" | "1d";

export enum TradingPairSymbol {
  BTCUSDT = "BTCUSDT",
  TONUSDT = "TONUSDT",
  SOLUSDT = "SOLUSDT",
  ETHUSDT = "ETHUSDT",
  SUIUSDT = "SUIUSDT",
  BNBUSDT = "BNBUSDT",
}

export enum KlineAttributes {
  Timestamp = "t",
  Open = "o",
  High = "h",
  Low = "l",
  Close = "c",
  Volume = "v",
  End = "x",
  Quantity = "q",
}

export type RawKline = (string | number)[];

export type SocketRawKline = {
  e: string;
  k: {
    [KlineAttributes.Timestamp]: number;
    [KlineAttributes.Open]: number;
    [KlineAttributes.High]: number;
    [KlineAttributes.Low]: number;
    [KlineAttributes.Close]: number;
    [KlineAttributes.Volume]: number;
    [KlineAttributes.Quantity]: number;
    [KlineAttributes.End]: boolean;
  };
}

export type Kline = {
  [KlineAttributes.Timestamp]: number;
  [KlineAttributes.Open]: number;
  [KlineAttributes.High]: number;
  [KlineAttributes.Low]: number;
  [KlineAttributes.Close]: number;
  [KlineAttributes.Volume]: number;
  [KlineAttributes.Quantity]: number;
}

export interface Ticker24hr {
  e: "24hrTicker";      // 事件类型
  E: number;            // 事件时间
  s: TradingPairSymbol; // 交易对
  p: string;            // 24小时价格变化
  P: string;            // 24小时价格变化（百分比）
  w: string;            // 平均价格
  x: string;            // 整整24小时之前，向前数的最后一次成交价格
  c: string;            // 最新成交价格
  Q: string;            // 最新成交交易的成交量
  b: string;            // 目前最高买单价
  B: string;            // 目前最高买单价的挂单量
  a: string;            // 目前最低卖单价
  A: string;            // 目前最低卖单价的挂单量
  o: string;            // 整整24小时前，向后数的第一次成交价格
  h: string;            // 24小时内最高成交价
  l: string;            // 24小时内最低成交加
  v: string;            // 24小时内成交量
  q: string;            // 24小时内成交额
  O: number;            // 统计开始时间
  C: number;            // 统计结束时间
  F: number;            // 24小时内第一笔成交交易ID
  L: number;            // 24小时内最后一笔成交交易ID
  n: number;            // 24小时内成交数
}

export interface MiniTicker24hr {
  e: "24hrMiniTicker";  // 事件类型
  E: number;            // 事件时间
  s: TradingPairSymbol; // 交易对
  c: string;            // 最新成交价格
  h: string;            // 24小时内最高成交价
  l: string;            // 24小时内最低成交加
  o: string;            // 整整24小时前，向后数的第一次成交价格
  q: string;            // 24小时内成交额
  v: string;            // 24小时内成交量
}

export interface BinanceSocketMessage {
  method: string;
  params: string[];
  id: number;
}

export interface BinanceSocketEventMessage {
  stream: string;
  data: SocketRawKline | Ticker24hr[] | MiniTicker24hr[];
}

export interface RawArticle {
  title: string;
  link: string;
  description: string;
  trading_pairs: string[];
  locale: "en" | "zh-CN";
  created_at: string;
}
