import dynamic from "next/dynamic";

export const WindowSizeProvider = dynamic(
  () => import(".").then(mod => mod.WindowSizeProvider), { ssr: false }
);

