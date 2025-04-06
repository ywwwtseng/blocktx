import { useQuery } from "@tanstack/react-query";

export function useFnG() {
  return useQuery({
    queryKey: ["fnG"],
    queryFn: async () => {
      const res = await fetch("https://api.alternative.me/fng/?limit=8");
      const data = await res.json();
      
      return {
        today: Number(data.data[0].value),
        yesterday: Number(data.data[1].value),
        last7Days: Math.floor(data.data.slice(2).reduce((acc: number, cur: { value: string }) => acc + Number(cur.value), 0) / data.data.slice(2).length),
      };
    },
  });
}