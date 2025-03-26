import { useClient } from "@/contexts/ClientContext";
import {
  useMutation as useTanstackMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient
} from "@tanstack/react-query";
import { toast } from "react-toastify";

import { getQueryKey } from "./useQuery";

export type MutationOptions<TVariables, TData> = Omit<
  UseMutationOptions<TData, unknown, TVariables | undefined>,
  "mutationFn" | "onSuccess"
> & {
  onSuccess?: (
    data: TData, 
    variables: TVariables | undefined, 
    context: unknown
  ) => string | Promise<string> | void;
  exact?: boolean;
  invalidate?: string[];
};

export function useMutation<TVariables = void, TData = unknown>(
  endpoint: string, 
  customOptions?: MutationOptions<TVariables, TData>
): UseMutationResult<TData, unknown, TVariables | undefined> {
  const { exact = false, invalidate, ...options } = customOptions || { exact: false };
  const client = useClient();
  const queryClient = useQueryClient();
  
  return useTanstackMutation({
    mutationFn: async (variables?: TVariables): Promise<TData> => {
      const response = await client.request.post(endpoint, variables, {
        headers: {
          "Content-Type": variables instanceof FormData 
            ? "multipart/form-data" 
            : "application/json; charset=utf-8",
        },
      });
      return response as TData;
    },
    ...options,
    onSuccess: async (
      data: TData, 
      variables: TVariables | undefined, 
      context: unknown
    ) => {
      const message = await options?.onSuccess?.(data, variables, context);

      if (message) {
        toast(message);
      }
      
      let queryKey = getQueryKey(endpoint);

      if (!exact) {
        queryKey = [queryKey[0]];
      }
      
      if (data) {
        queryClient.invalidateQueries({
          queryKey,
          refetchType: "all",
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