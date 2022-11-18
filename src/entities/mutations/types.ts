import { UseMutationOptions, UseMutationResult } from "@tanstack/react-query";

export type Fn<TData, TVariables> = (variables: TVariables) => Promise<TData>;

export type Options<TFn extends Fn<any, any>> = Omit<
  UseMutationOptions<
    Awaited<ReturnType<TFn>>,
    unknown,
    Parameters<TFn>[0],
    unknown
  >,
  "mutationKey" | "mutationFn"
>;

export type UseFn<TFn extends Fn<any, any>> = (
  options: Options<TFn>
) => UseMutationResult<
  Awaited<ReturnType<TFn>>,
  unknown,
  Parameters<TFn>[0],
  unknown
>;
