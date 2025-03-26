import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@/hooks/useQuery";

type UpdateQueryDataUpdaterFunction<TData> = (prev: TData) => TData;

export function useUpdateQueryData() {
  const queryClient = useQueryClient();

  return <TData>(
    endpoint: `${string}`, 
    updater: TData | UpdateQueryDataUpdaterFunction<TData>,
  ) => {
    const queryKey = getQueryKey(endpoint);

    queryClient.setQueryData(
      queryKey,
      (oldData: TData) => {
        if (typeof updater === "function") {
          return (updater as UpdateQueryDataUpdaterFunction<TData>)(oldData);
        }

        return updater;
      }
    );
  };
}
