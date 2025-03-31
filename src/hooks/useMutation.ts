import { useClient } from "@/contexts/ClientContext";
import {
  useMutation as useTanstackMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient
} from "@tanstack/react-query";
import { toast } from "react-toastify";

import { getQueryKey } from "./useQuery";

interface WithUpdates {
  updates?: {
    endpoint: string;
    updater: unknown;
  }[];
}

export type MutationOptions<TVariables, TData> = Omit<
  UseMutationOptions<TData, unknown, TVariables | undefined>,
  "mutationFn" | "onSuccess"
> & {
  onSuccess?: (
    data: TData & WithUpdates, 
    variables: TVariables | undefined, 
    context: unknown
  ) => string | Promise<string> | void;
  exact?: boolean;
  invalidate?: string[];
  autoInvalidate?: boolean;
};

export function useMutation<TVariables = void, TData = unknown>(
  endpoint: string,
  customOptions?: MutationOptions<TVariables, TData>
): UseMutationResult<TData, unknown, TVariables | undefined> {
  const { exact = false, invalidate, autoInvalidate = false, ...options } = customOptions || { exact: false, autoInvalidate: false };
  const client = useClient();
  const queryClient = useQueryClient();
  
  return useTanstackMutation({
    mutationFn: async (variables?: TVariables): Promise<TData & WithUpdates> => {
      const response = await client.request.post(endpoint, variables, {
        headers: {
          "Content-Type": variables instanceof FormData 
            ? "multipart/form-data" 
            : "application/json; charset=utf-8",
        },
      });
      const data = response as { data: TData & WithUpdates };

      return data.data;
    },
    ...options,
    onSuccess: async (
      data: TData & WithUpdates, 
      variables: TVariables | undefined, 
      context: unknown
    ) => {
      const message = await options?.onSuccess?.(data, variables, context);

      if (message) {
        toast(message);
      }

      if (autoInvalidate) {
        let queryKey = getQueryKey(endpoint);

        if (!exact) {
          queryKey = [queryKey[0]];
        }

        queryClient.invalidateQueries({
          queryKey,
          refetchType: "all",
        });
      }

      if (data?.updates) {
        data.updates.forEach((update) => {
          queryClient.setQueryData(getQueryKey(update.endpoint), update.updater);
        });
      }

      invalidate?.forEach((endpoint: string) => {
        queryClient.invalidateQueries({
          queryKey: getQueryKey(endpoint),
          refetchType: "all",
        });
      });
    },
  });
}