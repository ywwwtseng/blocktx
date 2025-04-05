import { SVGProps } from "react";

export function AnalysisIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M10.765 7.154L14 3.92V2.667H2v5.529L4.996 5.2l.943.943L2 10.08v1.252h12V5.805l-2.292 2.292-.943-.943zm-1.904.944L6.914 6.152l.943-.943 1.946 1.947-.942.942zM5.48 4.722l.942-.943.943.943-.943.943-.943-.943zm4.802 2.909l.943.943-.943.943-.942-.943.942-.943z" fill="currentColor"></path>
      <path d="M2 14h12v-1.334H2V14z" fill="currentColor"></path>
    </svg>
  );
}
