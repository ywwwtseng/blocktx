import { NextRequest } from "next/server";
import { ControlFlowUtils } from "@/utils/ControlFlowUtils";

interface IpInfoRaw {
  ip: string;
  bogon?: boolean;
  hostname?: string;
  city?: string;
  region?: string;
  country?: string;
  loc?: string;
  org?: string;
  timezone?: string;
  readme?: string;
}

interface IpInfo {
  ip: string;
  country: string;
  city: string;
  loc: string;
  timezone: string;
}

export class RequestUtils {
  static ip(request: NextRequest) {
    const xForwardedFor = request.headers.get("x-forwarded-for");
    if (xForwardedFor) {
      return xForwardedFor.split(",")[0]; // 获取第一个 IP 地址
    }
    
    return request.headers.get("x-real-ip") || "127.0.0.1";
  }

  static async ipinfo(request: NextRequest): Promise<IpInfo | null> {
    const ip = RequestUtils.ip(request).replace("::ffff:", "");

    const data = await ControlFlowUtils.retry<IpInfoRaw>({
      retries: 3,
      delay_ms: 1000,
    })(() => fetch(`https://ipinfo.io/${ip}/json`).then((res) => res.json()));

    if (!data) {
      return null;
    }

    if (data.bogon || data.ip === "::1") {
      return null;
    }

    if (!data.ip || !data.country || !data.loc || !data.timezone || !data.city) {
      return null;
    }

    return {
      ip: data.ip,
      country: data.country,
      city: data.city,
      loc: data.loc,
      timezone: data.timezone,
    };
  }
}
