import dynamic from "next/dynamic";

export const Layout = dynamic(
  () => import(".").then(mod => mod.Layout), { ssr: false }
);

