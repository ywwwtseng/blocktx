import { NextResponse } from "next/server";

import { AppError } from "@/errors";

import npmPackage from "../../package.json";

export type ErrorInput = string | Error | AppError;

export const no_cache = {
  headers: {
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate", // 確保不會緩存響應
    "Pragma": "no-cache", "Expires": "0", // 兼容老的 HTTP/1.0 客戶端
    "Surrogate-Control": "no-store", // 告訴代理伺服器不要緩存
  }
};

export class ResponseUtils {
  static send(message: string) {
    return new NextResponse(message, {
      status: 200,
      headers: {
        "X-App-Version": npmPackage.version
      }
    });
  }

  static json = <T>(data: T, init?: ResponseInit) => {
    return NextResponse.json(data, {
      ...init,
      headers: {
        ...init?.headers,
        "X-App-Version": npmPackage.version
      }
    });
  }

  static buffer(buffer: Buffer) {
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Length": `${buffer.length}`,
        "X-App-Version": npmPackage.version
      },
    });
  }

  static svg(svg: string) {
    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "X-App-Version": npmPackage.version
      },
    });
  }

  static error(input: ErrorInput) {
    let status = 500;
    let code: number | undefined;

    let error = input || new Error("Unknown error");

    if (typeof error === "string") {
      error = new Error(error);
    }

    if (error instanceof AppError) {
      status = error.status;
      code = error.cause.code;
    }

    const errorName = error.name || "Error";
    const errorMessage = error.message || "Unknown error";

    let message = `${errorName}\n`;

    message += errorMessage;

    if (error instanceof AppError && error.status !== 401 && error.status !== 403) {
      console.log("Error:", {
        name: errorName,
        message: errorMessage,
        stack: error.stack
      });
    }

    return NextResponse.json(
      {
        message,
        ...(code ? { code } : {})
      },
      {
        status,
        headers: { "X-App-Version": npmPackage.version }
      }
    );
  }
}
