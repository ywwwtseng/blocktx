"use client";

import QRCode from "qrcode";
import { useEffect } from "react";

interface QRCodeProps {
  url: string;
}

export function QRCodeCanvas({ url }: QRCodeProps) {
  useEffect(() => {
    const drawRoundedRect = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) => {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.fill();
    };

    const drawAppleStyleQR = async (text: string, canvasId: string) => {
      const scale = 0.35;
      const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    
      // 生成 QR Code 但不直接繪製
      const qrData = QRCode.create(text, {
        errorCorrectionLevel: "H",
        version: 3,
      });
      const cellSize = 20; // 每個單元格的大小
      const qrSize = qrData.modules.size;
      const margin = 0; // 外圍留白

      const container = document.getElementById("qrcode-container") as HTMLDivElement;

      container.style.width = `${(qrSize * cellSize + margin * 2) * scale}px`;
      container.style.height = `${(qrSize * cellSize + margin * 2) * scale}px`;
    
      canvas.width = qrSize * cellSize + margin * 2;
      canvas.height = qrSize * cellSize + margin * 2;
      canvas.style.transform = `scale(${scale})`;
    
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    
      ctx.fillStyle = "#EDEDED";
    
      for (let r = 0; r < qrSize; r++) {
        for (let c = 0; c < qrSize; c++) {
          if (qrData.modules.data[r * qrSize + c]) {
            drawRoundedRect(ctx, c * cellSize + margin, r * cellSize + margin, cellSize, cellSize, 12);
          }
        }
      }
    };

    drawAppleStyleQR(url, "qrcode");
  }, [url]);

  return (
    <div id="qrcode-container" className="flex justify-center items-center">
      <canvas id="qrcode" />
    </div>
  );
}