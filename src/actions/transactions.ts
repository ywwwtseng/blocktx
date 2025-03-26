"use server";

import { FetchTransactionsParams, Transaction } from "@/types";

export const getTransactions = async (params?: FetchTransactionsParams) => {
  const res = await fetch(`https://mainnet-rpc.tonxapi.com/v2/json-rpc/${process.env.TONX_API_KEY}`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      id: 1,
      jsonrpc: "2.0",
      method: "getTransactions",
      params: {
        ...params,
        limit: params?.limit || 10,
      },
    })
  });

  const data = await res.json();

  return (data.result || []) as Transaction[];
};