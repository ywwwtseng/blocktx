import { NextRequest } from "next/server";
import { ResponseUtils, ErrorInput } from "@/utils/ResponseUtils";
import { ControlFlowUtils } from "@/utils/ControlFlowUtils";
import { auth } from "@/actions/auth";
import { getTransactions } from "@/actions/transactions";

export async function POST(request: NextRequest) {
  try {
    const user = await auth(request);
    await ControlFlowUtils.delay(3000);
    const transactions = await getTransactions({ limit: 1 });

    return ResponseUtils.json({
      data: user ? transactions : [],
    });
  } catch (error) {
    return ResponseUtils.error(error as ErrorInput);
  }
}
