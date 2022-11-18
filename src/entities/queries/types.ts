import type {
  QueryFunctionContext,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

type KeyFn = (params: any) => readonly unknown[];

export type Fn<TData extends any, TKeyFn extends KeyFn, TPageParam = any> = (
  context: QueryFunctionContext<ReturnType<TKeyFn>, TPageParam>
) => Promise<TData>;

export type Params<TQueryKeyFn extends KeyFn> = Parameters<TQueryKeyFn>[0];

export type UseFn<
  TFn extends Fn<any, TKeyFn, any>,
  TKeyFn extends KeyFn
> = Parameters<TKeyFn> extends never[]
  ? (
      options?: Options<TFn, TKeyFn>
    ) => UseQueryResult<Awaited<ReturnType<TFn>>, unknown>
  : (
      params: Params<TKeyFn>,
      options?: Options<TFn, TKeyFn>
    ) => UseQueryResult<Awaited<ReturnType<TFn>>, unknown>;

export type Options<TFn extends Fn<any, TKeyFn>, TKeyFn extends KeyFn> = Omit<
  UseQueryOptions<
    Awaited<ReturnType<TFn>>,
    unknown,
    Awaited<ReturnType<TFn>>,
    ReturnType<TKeyFn>
  >,
  "queryKey" | "queryFn" | "initialData"
> & {
  initialData?: () => undefined;
};
