import { useEffect, useMemo } from "react";

import {
  useQuery as useTanstackQuery,
  useQueryClient,
  UseQueryOptions as UseTanstackQueryOptions
} from "@tanstack/react-query";
import { useClient } from "@/contexts/ClientContext";
import { URLUtils} from "@/utils/URLUtils";

export interface QueryParams {
  [key: string]: string;
}

export const getQueryKey = (endpoint: string, params?: QueryParams) => {
  return [
    ...endpoint.split("/").filter(Boolean),
    URLUtils.stringify(params || {}),
  ].filter(Boolean)
};

export type UseQueryOptions<T> = Omit<UseTanstackQueryOptions<T, Error>, "queryKey" | "queryFn"> & {
  params?: QueryParams;
  needAuthorized?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
};

export interface UseQueryResult<T> {
  data: T | undefined;
  isPending: boolean;
  queryKey: string[];
}

export function useQuery<T>(endpoint: string, options?: UseQueryOptions<T>): UseQueryResult<T> {
  const client = useClient();
  const queryClient = useQueryClient();
  const queryKey = getQueryKey(endpoint, options?.params);

  const enabled = useMemo(() => {
    if (options?.needAuthorized && !client.authorized) {
      return false;
    }

    return options?.enabled ?? true;
  }, [client, options]);

  const { data, isFetching } = useTanstackQuery<T, Error>({
    queryKey,
    queryFn: async () => {
      try {
        if (options?.needAuthorized) {
          queryClient.setQueryDefaults(queryKey, {
            meta: {
              needAuthorized: true,
            },
          })
        }

        const res = await client.request.get<{ data: T }>(URLUtils.stringifyUrl(endpoint, options?.params));
        const resData = res?.data;
        options?.onSuccess?.(resData);
        return resData;
      } catch (error) {
        options?.onError?.(error as Error);
        throw error;
      }
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    ...options,
    enabled,
  });

  useEffect(() => {
    if (!enabled) {
      queryClient.resetQueries({ queryKey, exact: true });
    }

    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  return {
    data,
    isPending: isFetching,
    queryKey
  };
}