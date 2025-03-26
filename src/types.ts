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